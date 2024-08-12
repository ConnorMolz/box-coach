import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StandardCombos } from '@/constants/StandardCombos';

function formattechnics(technics: number[]): string {
  return technics.join(', ');
}

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="book" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Combos</ThemedText>
      </ThemedView>
      {
        StandardCombos.map((combo, index:number) => (
          <Collapsible title={formattechnics(combo.Technics)}>
            <ThemedText>Difficulty: {combo.difficulty}</ThemedText>
          </Collapsible>
          
        ))
      }
      {
        Platform.OS === 'web' && (
          <ExternalLink href="https://reactnative.dev/docs/getting-started">
            Learn more about React Native
          </ExternalLink>
        )
      }
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
