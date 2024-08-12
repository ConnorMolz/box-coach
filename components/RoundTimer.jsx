import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-svg-circular-progress';

const RoundTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  const fill = (timeLeft / duration) * 100;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={12}
        fill={fill}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <Text style={styles.timerText}>
            {timeLeft}s
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  timerText: {
    fontSize: 40,
    color: '#333',
    position: 'absolute',
    textAlign: 'center',
  },
});

export default RoundTimer;