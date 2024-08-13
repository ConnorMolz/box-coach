import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StandardTrainings } from '@/constants/StandardTrainings';
import { Collapsible } from '@/components/Collapsible';
import { StandardCombos } from '@/constants/StandardCombos';

function formatTechnics(technics: number[]): string {
    let formattedTechnics = technics.join(', ');
    formattedTechnics = formattedTechnics.replaceAll('7', 'Dodge');
    formattedTechnics = formattedTechnics.replaceAll('8', 'Block');
    return formattedTechnics;
  }
function technicNames(technics: number[]): string {
    let formattedTechnics = technics.join(', ');
    formattedTechnics = formattedTechnics.replaceAll('1', 'Jab');
    formattedTechnics = formattedTechnics.replaceAll('2', 'Cross');
    formattedTechnics = formattedTechnics.replaceAll('3', 'Jab-Hook');
    formattedTechnics = formattedTechnics.replaceAll('4', 'Cross-Hook');
    formattedTechnics = formattedTechnics.replaceAll('5', 'Jab-Uppercut');
    formattedTechnics = formattedTechnics.replaceAll('6', 'Cross-Uppercut');
    formattedTechnics = formattedTechnics.replaceAll('7', 'Dodge');
    formattedTechnics = formattedTechnics.replaceAll('8', 'Block');
    return formattedTechnics;
  }

const combos = () => {
  return (
    <View className='flex-1 bg-gray-800'>
        <SafeAreaView className='flex-1 bg-gray-800'>
            <Text className='flex text-3xl text-blue-500 text-center py-10'>combos</Text>
            {
                StandardCombos.map((combo, index:number) => (
                    <Collapsible title={formatTechnics(combo.Technics)} key={index}>
                        <>
                        <Text className='flex text text-blue-300 text-left py-2'>{technicNames(combo.Technics)}</Text>
                        <Text className='flex text text-blue-300 text-left py-2'>Difficulty: {combo.difficulty}</Text>
                            </>
                    </Collapsible>
                ))
            }

        </SafeAreaView>
    </View>
  )
}

export default combos