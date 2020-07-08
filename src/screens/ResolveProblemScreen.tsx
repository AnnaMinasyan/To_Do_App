import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NewTasksScreen from './tasks/NewTasks';
import CompletedTasksScreen from './tasks/CompletedTasks';

const Tab = createMaterialTopTabNavigator();
interface Props {}

const ResolveProblemScreen: React.FunctionComponent<Props> = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: '#445566',
          height: 1,
        },
        tabStyle: {
          paddingTop: 15,
          paddingBottom: 13,
          height: 48,
          flex: 1,
        },
        labelStyle: {
          color: '#000',
          fontSize: 16,
          fontWeight: '400',
          lineHeight: 20,
          textTransform: 'none',
        },
        style: {
          backgroundColor: 'rgba(241, 245, 249, 0.48)',
          shadowOffset: {height: 0, width: 0},
          shadowColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen name="Новые" component={NewTasksScreen} />
      <Tab.Screen name="Завершенные" component={CompletedTasksScreen} />
    </Tab.Navigator>
  );
};

export default ResolveProblemScreen;
