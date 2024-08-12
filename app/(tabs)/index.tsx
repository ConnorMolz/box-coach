import { Image, StyleSheet, Platform, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StandardCombos } from '@/constants/StandardCombos';
import { StandardTrainings } from '@/constants/StandardTrainings';
import { Collapsible } from '@/components/Collapsible';
import React from 'react';

function formatTechnics(technics: number[]): string {
  return technics.join(', ');
}

function calculateTrainingDuration(rounds: number, roundDuration: number, restDuration:number): number {
  return rounds * (roundDuration + restDuration) - restDuration;
}

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to the Box Coach App</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {
          StandardTrainings.map((training, index:number) => (
            <Collapsible title={training.name}>
              <ThemedText>Duration: {calculateTrainingDuration(
                training.rounds,
                training['round-duration'],
                training['rest-duration'],
              )} seconds
              </ThemedText>
              <ThemedText>
                Diffculty: {training['min-dificulty']} - {training['max-dificulty']}
              </ThemedText>  
              <ThemedText>
                Number of rounds: {training.rounds}
              </ThemedText>
              <ThemedText>
                Round duration: {training['round-duration']} seconds
              </ThemedText>
              <ThemedText>
                Rest duration: {training['rest-duration']} seconds
              </ThemedText>
              <Button title="Start training" onPress={() => {}} />

            </Collapsible>
          ))
        }
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
