import ParallaxScrollView from "@/components/ParallaxScrollView";
import RoundTimer from "@/components/RoundTimer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StandardTrainings } from "@/constants/StandardTrainings";
import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"


const Page = () => {

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

    const { trainingName } = useLocalSearchParams();
    const training = StandardTrainings.filter((training) => training.name === trainingName);

    const [remainingRounds, setRemainingRounds] = useState(training[0]?.rounds);

    const [reaminingRoundDuration, setRemainingRoundDuration] = useState(-1);
    const [roundDuration, setRoundDuration] = useState(training[0]?.['round-duration']);

    const [remainingRestDuration, setRemainingRestDuration] = useState(-1);
    const [restDuration, setRestDuration] = useState(training[0]?.['rest-duration']);

    const [currentRound, setCurrentRound] = useState(0);
    
    const [isResting, setIsResting] = useState(false);
    const [isTraining, setIsTraining] = useState(false);


    useEffect(() => {
        console.log(training);
    }, [training]);

    return (
        <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Entypo size={310} name="circular-graph" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{training[0].name}</ThemedText>
      </ThemedView>
      
      
    </ParallaxScrollView>
    );
    
}



export default Page;