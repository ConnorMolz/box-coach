import { View, Text, Button, ScrollView, StyleSheet, TextInput} from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const addCombo = () => {
    const [combo, setCombo] = React.useState<number[]>([]);
    const [difficulty, setDifficulty] = React.useState('0');
    const [comboAsText, setComboAsText] = React.useState('');
    
    function technicNames(technics: number[]) {
        let formattedTechnics = technics.join(', ');
        formattedTechnics = formattedTechnics.replaceAll('1', 'Jab');
        formattedTechnics = formattedTechnics.replaceAll('2', 'Cross');
        formattedTechnics = formattedTechnics.replaceAll('3', 'Jab-Hook');
        formattedTechnics = formattedTechnics.replaceAll('4', 'Cross-Hook');
        formattedTechnics = formattedTechnics.replaceAll('5', 'Jab-Uppercut');
        formattedTechnics = formattedTechnics.replaceAll('6', 'Cross-Uppercut');
        formattedTechnics = formattedTechnics.replaceAll('7', 'Dodge');
        formattedTechnics = formattedTechnics.replaceAll('8', 'Block');
        setComboAsText(formattedTechnics);
      }
        
    
    function addTechnic(technic: number) {
        const currentCombo: number[] = combo;
        currentCombo.push(technic);
        console.log(currentCombo);
        setCombo(currentCombo);
        technicNames(combo);
    }

    function removeLast() {
        const currentCombo: number[] = combo;
        currentCombo.pop();
        setCombo(currentCombo);
        console.log(currentCombo);
        technicNames(combo);
    }

    return (
        <ScrollView className='flex-1 bg-gray-800'>
            <SafeAreaView>
                <Text className='flex text-3xl text-blue-500 text-center py-10 bg-gray-900'>Add a new Combo</Text>

                <View>
                    <Text className="flex text-xl text-blue-300 text-left py-2">Technics:</Text>
                    <Text className="flex text-xl text-blue-300 text-left py-2 justify-center">{comboAsText}</Text>
                    <Button title='Remove' onPress={() => {removeLast()}}></Button>
                </View>

                <View>
                    <Button title='Add Jab' onPress={() => {addTechnic(1)}}></Button>
                    <Button title='Add Cross' onPress={() => {addTechnic(2)}}></Button>
                    <Button title='Add Jab-Hook' onPress={() => {addTechnic(3)}}></Button>
                    <Button title='Add Cross-Hook' onPress={() => {addTechnic(4)}}></Button>
                    <Button title='Add Jab-Uppercut' onPress={() => {addTechnic(5)}}></Button>
                    <Button title='Add Cross-Uppercut' onPress={() => {addTechnic(6)}}></Button>
                    <Button title='Add Dodge' onPress={() => {addTechnic(7)}}></Button>
                    <Button title='Add Block' onPress={() => {addTechnic(8)}}></Button>
                </View>

                <View>
                    <Text className="flex text-xl text-blue-300 text-left py-2">
                        Difficulty:  
                    </Text> 
                    <TextInput
                            style={styles.input}
                            onChangeText={setDifficulty}
                            value={difficulty}
                            keyboardType='numeric'
                            maxLength={1}
                        />
                </View>
                <View>
                    <Button title="Cancle" onPress={() => {router.navigate("/(tabs)/combos")}}></Button>
                    <Button title="Save" onPress={() => {}}></Button>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: 'white',
    },
  });

export default addCombo