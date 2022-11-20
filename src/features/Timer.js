import React, { useState } from 'react'; // UseState allows to use variables
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/countdown'; //Countdown object from components
import { RoundedButton } from '../components/RoundedButton'; //RoundedButton object from components
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
// Code from vibration - react native
import { Timing } from './Timing';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd}) => {
  useKeepAwake(); //When the timer works the phone will stay awake
  const [isStarted, setIsStarted] = useState(false); //Statements with false as default
  const [progress, setProgress] = useState(1); //Empieza en 1 (Completo)
  const [minutes, setMinutes] = useState(0.1); //Minutos con un valor default de 0.1

   const onEnd = (reset) => {
     Vibration.vibrate(PATTERN);
     setIsStarted(false);
     setProgress(1);
     reset();
     onTimerEnd(focusSubject);
   };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}> Focusing on: </Text>
          <Text style={styles.task}> {focusSubject} </Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progc}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style = {styles.clearSubWrapper}>
        <RoundedButton size = {50} title = 'clear' onPress = {clearSubject}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Funciona como una clase con varios objetos. Tipo css
  container: {
    flex: 1, // Abarca toda la pantalla
  },
  countdown: {
    flex: 0.5, //Abarca la mitad de la pantalla
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  clearSubWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
