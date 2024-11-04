import { StatusBar } from "expo-status-bar";
import {

  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native";
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

import darkSix from "./assets/dark/dice-six-faces-six.png";
import darkFive from "./assets/dark/dice-six-faces-five.png";
import darkFour from "./assets/dark/dice-six-faces-four.png";
import darkThree from "./assets/dark/dice-six-faces-three.png";
import darkTwo from "./assets/dark/dice-six-faces-two.png";
import darkOne from "./assets/dark/dice-six-faces-one.png";
import { useState,useEffect } from "react";






export default function App() {








  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/dice.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);











  const [index, setIndex] = useState<number>(0);
  const diceCollections = [
    darkOne,
    darkTwo,
    darkThree,
    darkFour,
    darkFive,
    darkSix,
  ];
  const diceSelector = () => {
    const index1 = Math.floor(Math.random() * 6);

    setIndex(index1);
  };
  console.log(index);

  return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} source={diceCollections[index]} />
      <StatusBar style="auto" />
      <View style={styles.button}>
        <TouchableOpacity onPress={diceSelector} onPressOut={playSound} 
          onPressIn={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
          }>
          <Text style={styles.buttonText}>Roll</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 150,
    width: 150,
  },
  button: {
    backgroundColor:"#000000",
    borderRadius:6,
    padding:8,
    marginTop:30,

  },
  buttonText: {
    fontSize: 30,
    color: '#ffffff',
  },
});
