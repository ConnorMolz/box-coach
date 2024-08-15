import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StandardTrainings } from '@/constants/StandardTrainings'
import { router, useLocalSearchParams } from 'expo-router'
import { TimerContext } from "@/context/TimerContext";
import { StandardCombos } from '@/constants/StandardCombos'
import { Audio } from 'expo-av'
import * as SQLite from 'expo-sqlite'


const Training = () => {

    const { training } = useLocalSearchParams();

    const currentTraining = getTraining(String(training));

    const [remainingTime, setRemainingTime] = React.useState(0)
    const [rounds, setRounds] = React.useState(0)
    const [currentRound, setCurrentRound] = React.useState(0)
    const [started, setStarted] = React.useState(false)
    const [resting, setResting] = React.useState(false)
    const { duration: secondsRemaining, setDuration } = useContext(TimerContext);
    const [currentSession, setCurrentSession] = React.useState('Training')
    const posibleCombos = getPosibleCombos();
    const [language, setLanguage] = React.useState('en')
    const [sounds, setSounds] = React.useState<any[]>([])
    const [loadedSounds, setLoadedSounds] = React.useState<any[]>([])
    
    function getTraining(name: string) {
        let id = 0;
        for (let i = 0; i < StandardTrainings.length; i++) {
            if (StandardTrainings[i].name === name) {
                id = StandardTrainings[i].id;
                break;
            }
            id = 0;
        }
        if(id < 0) {
            return(StandardTrainings.filter((trainings) => trainings.name === training)[0])
        }

        const db = SQLite.openDatabaseSync('box-coach');

        const allRows: {
            training_id: number,
            round_duration: number,
            rounds: number,
            name: string,
            rest_duration: number,
            min_difficulty: number,
            max_difficulty: number,
        }[] = db.getAllSync('SELECT * FROM trainings WHERE name = ?', [name]);

        return {
            "round-duration": allRows[0].round_duration,
            "rounds": allRows[0].rounds,
            "rest-duration": allRows[0].rest_duration,
            "name": allRows[0].name,
            "min-dificulty": allRows[0].min_difficulty,
            "max-dificulty": allRows[0].max_difficulty,
            "id": allRows[0].training_id
        }
    
    }

    useEffect(() => {
        const getSounds = async() => {
            await setLanguage('en')
            console.log(language)
            if (language === 'en') {
                await setSounds(
                    [
                        require('@/assets/Sounds/en/one.mp3'),
                        require('@/assets/Sounds/en/two.mp3'),
                        require('@/assets/Sounds/en/three.mp3'),
                        require('@/assets/Sounds/en/four.mp3'),
                        require('@/assets/Sounds/en/five.mp3'),
                        require('@/assets/Sounds/en/six.mp3'),
                        require('@/assets/Sounds/en/dodge.mp3'),
                        require('@/assets/Sounds/en/block.mp3'),
                    ]
                );
                console.log(sounds)
                
                return
            }
            setSounds(
                [
                    require('@/assets/Sounds/en/one.mp3'),
                    require('@/assets/Sounds/en/two.mp3'),
                    require('@/assets/Sounds/en/three.mp3'),
                    require('@/assets/Sounds/en/four.mp3'),
                    require('@/assets/Sounds/en/five.mp3'),
                    require('@/assets/Sounds/en/six.mp3'),
                    require('@/assets/Sounds/en/dodge.mp3'),
                    require('@/assets/Sounds/en/block.mp3'),
                ]
            );
            console.log(sounds)

        };
        getSounds();

    },[language]);

    useEffect(() => {
        const loadSounds = async () => {
            setLoadedSounds(
                [
                    await Audio.Sound.createAsync(sounds[0]),
                    await Audio.Sound.createAsync(sounds[1]),
                    await Audio.Sound.createAsync(sounds[2]),
                    await Audio.Sound.createAsync(sounds[3]),
                    await Audio.Sound.createAsync(sounds[4]),
                    await Audio.Sound.createAsync(sounds[5]),
                    await Audio.Sound.createAsync(sounds[6]),
                    await Audio.Sound.createAsync(sounds[7]),
                ]
            );
        }
        loadSounds();
    },[sounds]);

    const playSoundsInSequence = async (ids:number[]) => {
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
      
          if (id < 0 || id > 7) {
            console.error('Invalid sound ID. Please provide an ID between 0 and 7.');
            continue;
          }
      
          try {
            const { sound } = loadedSounds[id - 1];
            await sound.replayAsync();
      
            // Wait for the sound to finish before continuing to the next sound
            await sound.setOnPlaybackStatusUpdate(async (status:any) => {
              if (status.didJustFinish) {
                // Unload the sound from memory when done

              }
            });
      
            // Ensure we wait until the sound is unloaded before moving to the next sound
            await new Promise(resolve => setTimeout(resolve, 600));
          } catch (error) {
            console.error('Error playing sound', error);
            let currentLanguage = language;
            setLanguage('');
            setLanguage(currentLanguage);
          }
        }
      };

    function getPosibleCombos() {
        let result = [];
        for(let i = 0; i < StandardCombos.length; i++) {
            if(StandardCombos[i].difficulty >= currentTraining['min-dificulty'] && StandardCombos[i].difficulty <= currentTraining['max-dificulty']) {
                result.push(StandardCombos[i])
            }
        }
        const db = SQLite.openDatabaseSync('box-coach');
        const allRows: { id: number, technics:string, difficulty:number}[] = db.getAllSync('SELECT * FROM combos WHERE difficulty >= ? AND difficulty <= ?', [currentTraining['min-dificulty'], currentTraining['max-dificulty']]);
        for (let i = 0; i < allRows.length; i++) {
            const technics = allRows[i].technics.split(',').map((x) => parseInt(x));
            result.push({"id": allRows[i].id, "Technics": technics, "difficulty": allRows[i].difficulty});
        }
        return result;
    }

    function getRandomCombo() {
        return posibleCombos[Math.floor(Math.random() * posibleCombos.length)].Technics;
    }

    async function playComboTts(combo:number[]) {
        console.log(combo)
        playSoundsInSequence(combo)
    }

     
    
    async function startTraining() {
        setLanguage(language);
        setStarted(true)
        setRemainingTime(currentTraining['round-duration'])
        setRounds(currentTraining.rounds)
        setCurrentRound(1)
        const { sound } = await Audio.Sound.createAsync(require('@/assets/Sounds/en/start.mp3'));
        await sound.playAsync();
        await sound.setOnPlaybackStatusUpdate(async (status) => {
            // @ts-ignore
            if (status.didJustFinish) {
                await sound.unloadAsync();
            }
        })
    }

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if(!started) {
            return;
        }

        if(remainingTime != 0 && remainingTime % 5 === 0 && !resting && remainingTime != currentTraining['round-duration']) {
            playComboTts(getRandomCombo())
        }

        // Exit early when we reach 0
        if (remainingTime === 0 && !resting && started) {
            if(rounds === currentRound) {
                const play = async () => {
                    const { sound } = await Audio.Sound.createAsync(require('@/assets/Sounds/en/end.mp3'));
                    await sound.playAsync();
                    await sound.setOnPlaybackStatusUpdate(async (status) => {
                        // @ts-ignore
                        if (status.didJustFinish) {
                        await sound.unloadAsync();
                        }
                    })
                }
                play()
                setStarted(false)
                console.log('Training finished')
                router.navigate('/')
                return;
            }
            setResting(true);
            const play = async () => {
                const { sound } = await Audio.Sound.createAsync(require('@/assets/Sounds/en/rest.mp3'));
                await sound.playAsync();
                await sound.setOnPlaybackStatusUpdate(async (status) => {
                    // @ts-ignore
                    if (status.didJustFinish) {
                    await sound.unloadAsync();
                    }
                })
            }
            play()
            setCurrentSession('Resting');
            setRemainingTime(currentTraining['rest-duration']);
            return;
        }
        if (remainingTime === 0 && resting) {
            setResting(false);
            const play = async () => {
                const { sound } = await Audio.Sound.createAsync(require('@/assets/Sounds/en/start.mp3'));
                await sound.playAsync();
                await sound.setOnPlaybackStatusUpdate(async (status) => {
                    // @ts-ignore
                    if (status.didJustFinish) {
                    await sound.unloadAsync();
                    }
                })
            }
            play()
            setCurrentSession('Training');
            setCurrentRound(currentRound + 1);
            setRemainingTime(currentTraining['round-duration']);
            return;
        }
        // Save the interval ID to clear it when the component unmounts
        timerId = setTimeout(() => {
            setDuration(remainingTime - 1);
            console.log(remainingTime)
            setRemainingTime(remainingTime - 1);
        }, 1000);

        // Clear timeout if the component is unmounted or the time left changes
        return () => {
            clearTimeout(timerId);
        };
    }, [remainingTime, resting]);
    

    return (
        <View className='flex-1 bg-gray-800'>
            <SafeAreaView className='flex-1 bg-gray-800'>
                <Text className='flex text-3xl text-blue-500 text-center py-10 bg-gray-900'> Training </Text>


                {
                    !started ? 
                    <View className=' text-white text-center justyfy-center flex w-max align-middle place-content-center py-52'>
                        <Button 
                            title={`Start ${currentTraining.name}`}  
                            onPress={() => {startTraining()}} 
                            />
                    </View> 
                        : 
                        null
                }

                {
                    started ?
                    <View>
                        <Text className='flex text-3xl text-blue-500 text-center py-20'>Round {currentRound} / {rounds} </Text>
                        <View className="flex-1 justify-center py-10">
                            <View className="mx-auto bg-neutral-200 rounded-full w-52 h-44 justify-center items-center">
                                <Text className="text-4xl text-blue-800 ">
                                    {remainingTime} seconds
                                </Text>
                            </View>  
                        </View>
                        <Text className='flex text-3xl text-blue-500 text-center py-20'>{currentSession}</Text>
                    </View>
                    :
                    null
                }
            </SafeAreaView>
        </View>
    )
}

export default Training