import RoundTimer from "@/components/RoundTimer";
import { StandardTrainings } from "@/constants/StandardTrainings";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native"

const Page = () => {

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
    }, []);

    return (
        <View className="flex-1">
            <Text>{trainingName}</Text>
            <RoundTimer duration={roundDuration} />
        </View>
    );
}