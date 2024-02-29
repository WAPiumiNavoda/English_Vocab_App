import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import DrawingScreen from '../../HandWriting/DrawingScreen';
import VocabWordPage from '../../HandWriting/VocabWordPage';
import WritingHomePage from '../../HandWriting/WritingHomePage';
import MainScreenWriting from '../../HandWriting/Screens/MainScreenWriting';
import WritingTaskLevel from '../../HandWriting/Screens/WritingTaskLevel';
import PlayGround from '../../HandWriting/Quiz/PlayGround';

import TaskMainPage from '../../VoicePages/TaskMainPage';
import VoiceTaskPage from '../../VoicePages/VoiceTaskPage';
import VoiceMainPage from '../../VoicePages/VoiceMainPage';
import VoiceQuizApp from '../../VoicePages/VoiceQuizApp';
import { WrongAnswersProvider } from '../../VoicePages/VoiceDashBoard/WrongAnswersProvider';
import LeaderBoard from '../Screens/LeaderBoard';
import QuizHome from '../../HandWriting/Quiz/QuizHome';


const Stack = createStackNavigator();

export default function HomeScreenNavigation() {
  return (
  
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        {/* voice */}
        
        <Stack.Screen name="VoiceTaskPage" component={VoiceTaskPage} />
        <Stack.Screen name="TaskMainPage" component={TaskMainPage} />
        <Stack.Screen name="VoiceMainPage" component={VoiceMainPage} />
        <Stack.Screen name="VoiceQuizApp" component={VoiceQuizApp} />
        {/* Writing */}
        <Stack.Screen name="DrawingScreen" component={DrawingScreen} />
        <Stack.Screen name="VocabWordPage" component={VocabWordPage} />
        <Stack.Screen name="WritingHomePage" component={WritingHomePage} />
        <Stack.Screen name="MainScreenWriting" component={MainScreenWriting} />
        <Stack.Screen name="WritingTaskLevel" component={WritingTaskLevel} />
        <Stack.Screen name="PlayGround" component={PlayGround} />
        <Stack.Screen name="QuizHome" component={QuizHome} />
        
      </Stack.Navigator>

  )
}
