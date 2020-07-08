import React from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import TaskItem from '../../components/TaskItem';
interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
});

const NewTasksScreen: React.FunctionComponent<Props> = () => {
  const tasks = [
    {
      id: 5602481,
      category: 'lights',
      text: 'Неисправное освещение в подъезде',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '08.06.2019',
      price: 300,
      isResolved: false,
      reworkings: 0,
    },
    {
      id: 5602482,
      category: 'garbage',
      text: 'Неубранный мусор на придомовой площадке',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '08.06.2019',
      price: 0,
      deadline: '18.06.2019',
      isResolved: false,
      reworkings: 0,
      isOverdue: true,
    },
    {
      id: 5602483,
      category: 'garbage',
      text: 'Неубранный мусор на придомовой площадке',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '08.06.2019',
      price: 0,
      deadline: '18.06.2019',
      isResolved: false,
      reworkings: 0,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TaskItem
            id={item.id}
            category={item.category}
            text={item.text}
            location={item.location}
            distance={item.distance}
            date={item.date}
            price={item.price}
            deadline={item.deadline}
            isResolved={item.isResolved}
            reworkings={item.reworkings}
            isOverdue={item.isOverdue}
          />
        )}
      />
    </View>
  );
};

export default NewTasksScreen;
