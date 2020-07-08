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
      category: 'lights',
      id: 5602481,
      text: 'Неисправное освещение в подъезде',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '08.06.2019',
      price: 300,
      isResolved: false,
      reworkings: 0,
    },
    {
      category: 'lights',
      id: 5602482,
      text: 'Неисправное освещение в подъезде',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '08.06.2019',
      price: 300,
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
            reworkings={item.reworkings}
            isResolved={item.isResolved}
          />
        )}
      />
    </View>
  );
};

export default NewTasksScreen;
