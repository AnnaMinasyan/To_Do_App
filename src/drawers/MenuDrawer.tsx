import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MenuDrawerContent from './MenuDrawerContent';
import ScreensNavigator from '../screens/ScreensNavigator';

interface Props {}

const styles = StyleSheet.create({
  container: {
    width: '89%',
  },
});

const Drawer = createDrawerNavigator();

const MenuDrawer: React.FunctionComponent<Props> = () => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.container}
      drawerPosition="left"
      edgeWidth={0}
      // @ts-ignore
      drawerContent={(props) => <MenuDrawerContent {...props} />}>
      <Drawer.Screen name="ScreensNavigator" component={ScreensNavigator} />
    </Drawer.Navigator>
  );
};

export default MenuDrawer;
