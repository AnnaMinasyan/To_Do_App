import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddTask from "./AddTask"
import StartScreenHeader from '../components/StartScreenHeader';
import DayReview from "./DayReview"
import MainTasks from './MainTasks';
import ToDoTask from "./ToDoTask"
import EditTask from "./EditTask"
const Stack = createStackNavigator();
const HomeNavigator: React.FunctionComponent = () => (
  <Stack.Navigator initialRouteName="ToDoTask">
    <Stack.Screen
      name="MainTasks"
      component={MainTasks}
      options={{ header: StartScreenHeader, headerTransparent: true, }}
    />
    <Stack.Screen
      name="ToDoTask"
      component={ToDoTask}
      options={{ header: StartScreenHeader, headerTransparent: true, }}
    />
    <Stack.Screen
      name="DayReview"
      component={DayReview}
      options={{ header: StartScreenHeader, headerTransparent: true }}
    />
    <Stack.Screen
      name="AddTask"
      component={AddTask}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditTask"
      component={EditTask}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
export default HomeNavigator;
