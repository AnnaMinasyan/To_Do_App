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

const AllTasksScreen: React.FunctionComponent<Props> = () => {
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
      category: 'lights',
      text: 'Неисправное освещение в подъезде',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '08.06.2019',
      price: 0,
      deadline: '18.06.2019',
      isResolved: false,
      reworkings: 0,
    },
    {
      id: 5602483,
      category: 'lights',
      text: 'Сломался кран',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '08.06.2019',
      price: 0,
      deadline: '18.06.2019',
      isResolved: false,
      reworkings: 0,
    },
    {
      category: 'garbage',
      id: 5602484,
      text: 'Неубранный мусор',
      location: 'г. Тула, Приупская ул, д. 9а',
      distance: 200,
      date: '16.06.2019',
      price: 0,
      deadline: '18.06.2019',
      isResolved: true,
      reworkings: 2,
      rating: 5,
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
            rating={item.rating}
          />
        )}
      />
    </View>
  );
};

export default AllTasksScreen;
