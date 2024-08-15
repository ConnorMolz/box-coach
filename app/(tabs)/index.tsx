import{ Button, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StandardTrainings } from '@/constants/StandardTrainings';
import { Collapsible } from '@/components/Collapsible';
import React from 'react';
import { router } from 'expo-router';
import * as SQLite from 'expo-sqlite';
  
  function calculateTrainingDuration(rounds: number, roundDuration: number, restDuration:number): number {
    return rounds * (roundDuration + restDuration) - restDuration;
  }

  function getUserTrainings() {
    let trainings:any = [];

    const db = SQLite.openDatabaseSync('box-coach');

    const allRows: {
        training_id: number,
        round_duration: number,
        rounds: number,
        name: string,
        rest_duration: number,
        min_difficulty: number,
        max_difficulty: number,
    }[] = db.getAllSync('SELECT * FROM trainings');

    for (let i = 0; i < allRows.length; i++) {
        console.log(allRows[i].training_id, allRows[i].round_duration, allRows[i].rounds, allRows[i].rest_duration, allRows[i].name, allRows[i].min_difficulty, allRows[i].max_difficulty);
        trainings.push({
            "id": allRows[i].training_id,
            "round-duration": allRows[i].round_duration,
            "rounds": allRows[i].rounds,
            "rest-duration": allRows[i].rest_duration,
            "name": allRows[i].name,
            "min-dificulty": allRows[i].min_difficulty,
            "max-dificulty": allRows[i].max_difficulty,
    });
    }

    return trainings;
  }
function deleteTraining(id:number) {
    const db = SQLite.openDatabaseSync('box-coach');
    db.runSync('DELETE FROM trainings WHERE training_id = ?', [id]);
    router.navigate('/');
}


export default function Home() {
    const userTrainings = getUserTrainings();
  return (
    <ScrollView className='flex-1 bg-gray-800'>
        <SafeAreaView className='flex-1 bg-gray-800'>
            <Text className='flex text-3xl text-blue-500 text-center bg-gray-900'>
                Welcome to the Boxing Trainer app!
            </Text>
            <Text className='flex text-xl text-blue-300 text-left py-10'>
                Your Trainingprogramms:
            </Text>
            {
                    userTrainings.map((training:any) => (
                        <Collapsible title={training.name} key={training.name}>
                            <>
                            <Text className='flex text text-blue-300 text-left py-2'>Duration: {calculateTrainingDuration(
                                    training.rounds,
                                    training['round-duration'],
                                    training['rest-duration'],
                                )} seconds
                            </Text>
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Diffculty: {training['min-dificulty']} - {training['max-dificulty']}
                            </Text>  
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Number of rounds: {training.rounds}
                            </Text>
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Round duration: {training['round-duration']} seconds
                            </Text>
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Rest duration: {training['rest-duration']} seconds
                            </Text>
                            <Button title={`Start ${training.name}`} onPress={() => {router.navigate(`/${training.name}`)}} />
                            <Button title="Delete" onPress={() => {deleteTraining(training.id)}} />
                                </>
                        </Collapsible>
                    ))
                }
            <Collapsible title='Standard Trainings'>
                {
                    StandardTrainings.map((training) => (
                        <Collapsible title={training.name} key={training.name}>
                            <>
                            <Text className='flex text text-blue-300 text-left py-2'>Duration: {calculateTrainingDuration(
                                    training.rounds,
                                    training['round-duration'],
                                    training['rest-duration'],
                                )} seconds
                            </Text>
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Diffculty: {training['min-dificulty']} - {training['max-dificulty']}
                            </Text>  
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Number of rounds: {training.rounds}
                            </Text>
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Round duration: {training['round-duration']} seconds
                            </Text>
                            <Text className='flex text text-blue-300 text-left py-2'>
                                Rest duration: {training['rest-duration']} seconds
                            </Text>
                            <Button title={`Start ${training.name}`} onPress={() => {router.navigate(`/${training.name}`)}} />
                                </>
                        </Collapsible>
                    ))
                }
                </Collapsible>
            <Button title='Add new Training' onPress={() => {router.navigate('/addTraining')}} />
        </SafeAreaView>
    </ScrollView>
  );
}