import App from './app/app';
import React from 'react';


function IgniteApp() {
  return <App hideSplashScreen={() => Promise.resolve(true)} />;
}

export default IgniteApp;