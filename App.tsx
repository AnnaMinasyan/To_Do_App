import React from 'react';
import { enableScreens } from 'react-native-screens';
import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './src/Navigator';
import { createDndContext } from "react-native-easy-dnd";

const { Provider, Droppable, Draggable } = createDndContext();
enableScreens();

export const App: React.FunctionComponent = () => {
  return (
    <Provider>
      <MenuProvider>
        <Navigator />
      </MenuProvider>
    </Provider>
  );
};

export default App;
