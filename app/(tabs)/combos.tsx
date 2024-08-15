import { View, Text, Button, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StandardTrainings } from '@/constants/StandardTrainings';
import { Collapsible } from '@/components/Collapsible';
import { StandardCombos } from '@/constants/StandardCombos';
import { router } from 'expo-router';
import * as SQLite from 'expo-sqlite';

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

 function getUserCombos() {
    let userCombos:any = [];
    // Get user combos from storage
    // If no user combos, return empty array
    const db = SQLite.openDatabaseSync('box-coach');
    const allRows: { id: number, technics:string, difficulty:number}[] = db.getAllSync('SELECT * FROM combos');
        for (let i = 0; i < allRows.length; i++) {
            const technics = allRows[i].technics.split(',').map((x) => parseInt(x));
            userCombos.push({ "Technics": technics, "difficulty": allRows[i].difficulty});
        }

    return userCombos;
}

const combos = () => {
  const userCombos = getUserCombos();
  return (
    <ScrollView className='flex-1 bg-gray-800'>
        <SafeAreaView className='flex-1 bg-gray-800'>
            <Text className='flex text-3xl text-blue-500 text-center py-10 bg-gray-900'>combos</Text>
            <View>
              <Text className='text-blue-300 text-xl py-2'>Your combos: </Text>
              {
                    userCombos.map((combo:any, index:number) => (
                        <Collapsible title={formatTechnics(combo.Technics)} key={index}>
                            <>
                            <Text className='flex text text-blue-300 text-left py-2'>{technicNames(combo.Technics)}</Text>
                            <Text className='flex text text-blue-300 text-left py-2'>Difficulty: {combo.difficulty}</Text>
                                </>
                        </Collapsible>
                    ))
                }
            </View>
            <View className='py-10' />
            <View>
              <Collapsible title="Standard Combos">
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
              </Collapsible>
            </View>
            <Button title="Add Combo" onPress={() => router.navigate("/addCombo")} />
        </SafeAreaView>
    </ScrollView>
  )
}

export default combos