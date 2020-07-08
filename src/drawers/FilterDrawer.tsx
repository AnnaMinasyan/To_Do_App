import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';

import MenuDrawer from './MenuDrawer';
import FilterDrawerContent from './FilterDrawerContent';

interface Props {}

const styles = StyleSheet.create({
  container: {
    width: '89%',
  },
});

const Drawer = createDrawerNavigator();

const FilterDrawer: React.FunctionComponent<Props> = () => (
  <Drawer.Navigator
    drawerStyle={styles.container}
    drawerPosition="right"
    edgeWidth={0}
    // @ts-ignore
    drawerContent={(props) => <FilterDrawerContent {...props} />}>
    <Drawer.Screen name="MenuDrawer" component={MenuDrawer} />
  </Drawer.Navigator>
);

export default FilterDrawer;
