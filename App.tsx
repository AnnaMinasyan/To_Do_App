import React, { Fragment, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './src/Navigator';
import {Platform,StatusBar } from 'react-native'
import { createDndContext } from "react-native-easy-dnd";
import SplashScreen from 'react-native-splash-screen'
const { Provider, Droppable, Draggable } = createDndContext();
enableScreens();

export const App: React.FunctionComponent = () => {
  useEffect(()=>{
    console.log(";wewjrfyhewo");
    
    SplashScreen.hide()
  },[])
  return (
   
    <Provider>
      <MenuProvider>
        <Navigator />
      </MenuProvider>
    </Provider>
   
  );
};

export default App;
