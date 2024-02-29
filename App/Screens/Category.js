import { View, Text , Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../Shared/Colors'
import { useNavigation } from '@react-navigation/native';

export default function Category() {

  const navigation = useNavigation();

  return (
    <View>
    <TouchableOpacity onPress={() => navigation.navigate('QuizHome')}>
      <View style={style.graphStyle}>
        <Text style={style.textStyle}>Writing Task</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('VoiceQuizApp')}>
      <View style={style.graphStyle}>
        <Text style={style.textStyle}>Voice Task</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Quizes')}>
      <View style={style.graphStyle}>
        <Text style={style.textStyle}>Quizes</Text>
      </View>
    </TouchableOpacity>
  </View>
  )
}

const style = StyleSheet.create({
  graphStyle:{
    height:110,
    width: 200,
    backgroundColor: Colors.white,
    marginLeft: 85,
    marginBottom:10,
    borderRadius: 15,
    marginTop:10
  },
  textStyle: {
    fontFamily:'outfi-bold-extra',
    color: Colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 45, // Adjust this value for proper spacing
},
})