import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Home from '../screen/Home';
import Secound from '../screen/Secound';
import SplashScreen from '../screen/SplashScreen';
import Dashbord from '../screen/Dashbord';



const RootStack = createStackNavigator(
    {

    
      SplashScreen,
      Secound,
      // Dashbord,
      Home

      
    },
    {
      initialRouteName: 'Home',
    }
  );

  const AppContainer = createAppContainer(RootStack);

  export default class Navi extends React.Component {
    render() {
      return <AppContainer />;
    }
  }