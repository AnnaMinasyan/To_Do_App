import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from './SignupScreen';
import StartScreen from './StartScreen';
import PaidRequestScreen from './PaidRequestScreen';
import RequestScreen from './RequestScreen';
import ResolveProblemScreen from './ResolveProblemScreen';

import EndingScreen from './EndingScreen';
import StartScreenHeader from '../components/StartScreenHeader';
import ResolveProblemScreenHeader from '../components/ResolveProblemScreenHeader';
import PaidRequestHeaderRight from '../components/PaidRequestHeaderRight';
import {DayReview} from "../screens/dayReview"
const Stack = createStackNavigator();

const ScreensNavigator: React.FunctionComponent = () => (
  <Stack.Navigator initialRouteName="StartScreen">
    
    <Stack.Screen
      name="StartScreen"
      component={StartScreen}
      options={{header: StartScreenHeader, headerTransparent: true}}
    />
      
      <Stack.Screen
      name="DayReview"
      component={DayReview}
      options={{header: StartScreenHeader, headerTransparent: true}}
    />
    <Stack.Screen
      name="ResolveProblemScreen"
      component={ResolveProblemScreen}
      options={{header: ResolveProblemScreenHeader}}
    />
    <Stack.Screen
      name="PaidRequestScreen"
      component={PaidRequestScreen}
      options={({route}) => ({
        // @ts-ignore
        title: route.params.title,
        headerTitleStyle: {
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 56,
        },
        headerRight: () => <PaidRequestHeaderRight />,
      })}
    />
    <Stack.Screen
      name="RequestScreen"
      component={RequestScreen}
      options={({route}) => ({
        // @ts-ignore
        title: route.params.title,
        headerTitleStyle: {
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 56,
        },
      })}
    />
    <Stack.Screen
      name="EndingScreen"
      component={EndingScreen}
      options={{
        title: 'Завершение',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
          lineHeight: 56,
          alignSelf: 'center',
        },
        headerTintColor: '#000',
        headerStyle: {
          height: 56,
        },
      }}
    />
  </Stack.Navigator>
);

export default ScreensNavigator;
