import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import FilterDrawer from './drawers/FilterDrawer';

const Navigator: React.FunctionComponent = () => (
  <NavigationContainer>
    <FilterDrawer />
  </NavigationContainer>
);

export default Navigator;
