import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StandardTrainings } from '@/constants/StandardTrainings'
import { router, useLocalSearchParams } from 'expo-router'
import { TimerContext } from "@/context/TimerContext";
import { StandardCombos } from '@/constants/StandardCombos'

const Training = () => {

    const { training } = useLocalSearchParams();

    const currentTraining = (StandardTrainings.filter((trainings) => trainings.name === training)[0])

    const [remainingTime, setRemainingTime] = React.useState(0)
    const [rounds, setRounds] = React.useState(0)
    const [currentRound, setCurrentRound] = React.useState(0)
    const [started, setStarted] = React.useState(false)
    const [resting, setResting] = React.useState(false)
    const { duration: secondsRemaining, setDuration } = useContext(TimerContext);
    const [currentSession, setCurrentSession] = React.useState('Training')
    const posibleCombos = getPosibleCombos();

    function getPosibleCombos() {
        let result = [];
        for(let i = 0; i < StandardCombos.length; i++) {
            if(StandardCombos[i].difficulty >= currentTraining['min-dificulty'] && StandardCombos[i].difficulty <= currentTraining['max-dificulty']) {
                result.push(StandardCombos[i])
            }
        }
        return result;
    }

    function getRandomCombo() {
        return posibleCombos[Math.floor(Math.random() * posibleCombos.length)].Technics;
    }

    function playComboTts(combo:number[]) {
        console.log(combo)
        for(let i = 0; i < combo.length; i++) {

        }
    }
    
    function startTraining() {
        setStarted(true)
        setRemainingTime(currentTraining['round-duration'])
        setRounds(currentTraining.rounds)
        setCurrentRound(1)
    }

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if(!started) {
            return;
        }

        if(remainingTime != 0 && remainingTime % 5 === 0) {
            playComboTts(getRandomCombo())
        }

        // Exit early when we reach 0
        if (remainingTime === 0 && !resting && started) {
            if(rounds === currentRound) {
                setStarted(false)
                console.log('Training finished')
                router.navigate('/')
                return;
            }
            setResting(true);
            setCurrentSession('Resting');
            setRemainingTime(currentTraining['rest-duration']);
            return;
        }
        if (remainingTime === 0 && resting) {
            setResting(false);
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
                <Text className='flex text-3xl text-blue-500 text-center py-10'> Training </Text>


                {
                    !started ? <Button title={`Start ${currentTraining.name}`}  onPress={() => {startTraining()}} /> : null
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