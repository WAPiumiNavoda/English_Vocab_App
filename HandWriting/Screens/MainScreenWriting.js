import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import SlideShowScreenWriting from "./SlideShowScreenWriting";
import Colors from "../../App/Shared/Colors";
import { useWrongAnswers } from "../../VoicePages/VoiceDashBoard/WrongAnswersProvider";
import { saveWrongAnswersToFirebase } from "../../App/Services/config";
import { useAuth } from "../../Auth/AuthProvider";


export default function MainScreenWriting({ navigation, route }) {
  const answers = ["dataset\\rat", "dataset\\wow", "dataset\\go"];
  //const { answers } = route.params;

  const [words, setWords] = useState(Array(answers.length).fill(0));
  const [predictedValues, setPredictedValues] = useState(Array(answers.length).fill(''));
  const [lastPressedIndex, setLastPressedIndex] = useState(null);
  const { userId } = useAuth();

  console.log("answers: " + answers);
  console.log(answers.length);

  const handleMicPress = (index, predictedKeyword) => {
    console.log("Index" + index);
    const newWords = [...words];
    newWords[index] = predictedKeyword;
    setWords(newWords);

    const newPredictedValues = [...predictedValues];
    newPredictedValues[index] = predictedKeyword;
    setPredictedValues(newPredictedValues);

    setLastPressedIndex(index); // Store the index of the last pressed mic button

    console.log("Predicted values:", newPredictedValues);
    console.log("Navigating to TaskMainPage");
    navigation.navigate("TaskMainPage", { predictedKeyword });
  };

  useEffect(() => {
    if (route.params?.predictedKeyword !== undefined && lastPressedIndex !== null) {
      const newWords = [...words];
      newWords[lastPressedIndex] = route.params.predictedKeyword;
      setWords(newWords);

      const newPredictedValues = [...predictedValues];
      newPredictedValues[lastPressedIndex] = route.params.predictedKeyword;
      setPredictedValues(newPredictedValues);
    }
  }, [route.params?.predictedKeyword]);

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      if (predictedValues.includes(answers[i])) {
        score++;
      }
    }
    return score;
  };

 

  const handleDonePress = () => {
    const score = calculateScore();
    const totalQuestions = answers.length;
    const scoreMessage = `Your score is ${score} out of ${totalQuestions}.`;
  
    const wrongAnswers = answers.filter((answer, index) => !predictedValues.includes(answer));
    saveWrongAnswersToFirebase(wrongAnswers,userId); // Save wrong answers to Firebase
  
    // Display the score message in an alert
    Alert.alert(
      "Quiz Result",
      scoreMessage,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  
    // Reset the state
    handleReset();
    // navigation.navigate('LeaderBoard');
  };

  const handleReset = () => {
    setWords(Array(answers.length).fill(0));
    setPredictedValues(Array(answers.length).fill(''));
  };


  return (
    <View>
      <SlideShowScreenWriting />
      {/* Render mic buttons for each word */}
      <View style={{ paddingTop: 200, paddingHorizontal: 40 }}>
        {words.map((word, index) => (
          <View key={index} style={styles.row}>
            <TouchableOpacity onPress={() => handleMicPress(index, route.params?.predictedKeyword)}>
              <View style={styles.box}>
                <Text style={styles.word}>{word || "Press Mic"}</Text>
                <Feather
                  name="mic"
                  size={24}
                  color={Colors.primary}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={handleDonePress}>
          <View style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.doneButton}>
          <Text style={styles.doneButtonText}>predictedValues: {predictedValues}</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft:30,
    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: Colors.gray,
    shadowOpacity: 3,
    elevation: 2,
    marginHorizontal: 5,
  },
  word: {
    marginLeft: 20,
    fontFamily:'outfit'
  },
  icon: {
    marginLeft: "auto",
  },
  doneButton: {
    marginTop: 20,
    padding:10,
    width:'60%',
    borderRadius: 10,
    alignItems: "center",
    marginLeft:60,
    backgroundColor:Colors.primary
  },
  doneButtonText: {
    fontSize: 18,
    color: Colors.white
  },
});


