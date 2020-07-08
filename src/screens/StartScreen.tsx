import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MainTasks} from './MainTasks';
import TasksMapScreen from './tasks/TasksMap';

const Nav = createStackNavigator();

interface Props {}

const StartScreen: React.FunctionComponent<Props> = () => {
  return (
    <Nav.Navigator initialRouteName="MainTasks">
      <Nav.Screen
        name="MainTasks"
        component={MainTasks}
        options={{headerShown: false}}
      />
      <Nav.Screen
        name="TasksMap"
        component={TasksMapScreen}
        options={{headerShown: false}}
      />
    </Nav.Navigator>
  );
};

export default StartScreen;
