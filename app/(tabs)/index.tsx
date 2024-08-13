import{ Button, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StandardTrainings } from '@/constants/StandardTrainings';
import { Collapsible } from '@/components/Collapsible';
import React, { Component } from 'react';
import { router } from 'expo-router';

function formatTechnics(technics: number[]): string {
    return technics.join(', ');
  }
  
  function calculateTrainingDuration(rounds: number, roundDuration: number, restDuration:number): number {
    return rounds * (roundDuration + restDuration) - restDuration;
  }

export default function Home() {
  return (
    <View className='flex-1 bg-gray-800'>
        <SafeAreaView className='flex-1 bg-gray-800'>
            <Text className='flex text-3xl text-blue-500 text-center'>
                Welcome to the Boxing Trainer app!
            </Text>
            <Text className='flex text-xl text-blue-300 text-left py-10'>
                Your Trainingprogramms:
            </Text>
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
                        <Button title={`Start ${training.name}`} onPress={() => {}} />
                            </>
                    </Collapsible>
                ))
            }
        </SafeAreaView>
    </View>
  );
}