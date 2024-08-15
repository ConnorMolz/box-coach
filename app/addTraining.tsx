import { View, Text, Button, ScrollView, StyleSheet, TextInput} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite';



const AddTraining = () => {

    function addTrainingToDB() {
        const db = SQLite.openDatabaseSync('box-coach');
        //db.execSync('DROP TABLE IF EXISTS trainings');

        db.execSync(
            'CREATE TABLE IF NOT EXISTS trainings(training_id INTEGER PRIMARY KEY AUTOINCREMENT, round_duration INTEGER, rounds INTEGER, rest_duration INTEGER, name VARCHAR(255), min_difficulty INTEGER, max_difficulty INTEGER)'
        );

        const statement = db.prepareSync('INSERT INTO trainings (round_duration, rounds, rest_duration, name, min_difficulty, max_difficulty) VALUES (?,?,?,?,?,?)');

        statement.executeSync([parseInt(roundDuration), parseInt(rounds), parseInt(restDuration), name, parseInt(minDifficulty), parseInt(maxDifficulty)]);
        
        router.back();
    }

    const [name, setName] = React.useState('');
    const [rounds, setRounds] = React.useState('0');
    const [roundDuration, setRoundDuration] = React.useState('0');
    const [restDuration, setRestDuration] = React.useState('0');
    const [minDifficulty, setMinDifficulty] = React.useState('0');
    const [maxDifficulty, setMaxDifficulty] = React.useState('0');

  return (
    <ScrollView className='flex-1 bg-gray-800'>
      <SafeAreaView className='flex-1 bg-gray-800'>
          <Text className='flex text-3xl text-blue-500 text-center py-10 bg-gray-900'>Add Training</Text>
          <View>
                <Text className="flex text-xl text-blue-300 text-left py-2">
                    Name:
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    keyboardType='default'
                    maxLength={255}
                />
          </View>
            <View>
                    <Text className="flex text-xl text-blue-300 text-left py-2">
                        Number of rounds:
                    </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setRounds}
                    value={rounds}
                    keyboardType='numeric'
                    maxLength={3}
                    />
            </View>
            <View>
                    <Text className="flex text-xl text-blue-300 text-left py-2">
                        Round duration:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setRoundDuration}
                        value={roundDuration}
                        keyboardType='numeric'
                        maxLength={3}
                    />
            </View>
            <View>
                    <Text className="flex text-xl text-blue-300 text-left py-2">
                        Rest duration:
                    </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setRestDuration}
                        value={restDuration}
                        keyboardType='numeric'
                        maxLength={3}
                    />
            </View>
            <View>
                    <Text className="flex text-xl text-blue-300 text-left py-2">
                        Minimum difficulty:
                    </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setMinDifficulty}
                        value={minDifficulty}
                        keyboardType='numeric'
                        maxLength={1}
                    />
            </View>
            <View>
                    <Text className="flex text-xl text-blue-300 text-left py-2">
                        Maximum difficulty:
                    </Text>
                    <TextInput  
                        style={styles.input}
                        onChangeText={setMaxDifficulty}
                        value={maxDifficulty}
                        keyboardType='numeric'
                        maxLength={1}
                    />
            </View>
            <Button title="Save" onPress={() => {addTrainingToDB()}}></Button>
            <Button title="Cancle" onPress={() => {router.back()}}></Button>
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

export default AddTraining