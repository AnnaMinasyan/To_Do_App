import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NewTasksScreen from './NewTasks';
import PerformedTasksScreen from './PerformedTasks';
import AllTasksScreen from './AllTasks';

const Tab = createMaterialTopTabNavigator();
interface Props {}

const TasksList: React.FunctionComponent<Props> = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        // scrollEnabled: true,
        indicatorStyle: {
          backgroundColor: '#445566',
          height: 1,
        },
        tabStyle: {
          paddingTop: 15,
          paddingBottom: 13,
          height: 48,
          flexGrow: 1,
        },
        labelStyle: {
          color: '#000',
          fontSize: 16,
          fontWeight: '400',
          lineHeight: 20,
          textTransform: 'none',
        },
        style: {
          marginTop: 56,
          backgroundColor: 'rgba(241, 245, 249, 0.48)',
          borderTopWidth: 2,
          borderColor: '#e9edf1',
          shadowOffset: {height: 0, width: 0},
          shadowColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen name="Новые" component={NewTasksScreen} />
      <Tab.Screen name="На исполнении" component={PerformedTasksScreen} />
      <Tab.Screen name="Все" component={AllTasksScreen} />
    </Tab.Navigator>
  );
};

export default TasksList;
