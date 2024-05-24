import App from './app/app';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';


function IgniteApp() {
  return <App hideSplashScreen={() => Promise.resolve(true)} />;
}

export default IgniteApp;