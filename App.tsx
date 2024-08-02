import { View } from 'react-native';
import AppPurchase from './app/app-purchase/app';
import AppSales from './app/app-sales/app';
import AppB from './app/app-warehouse/App'
import React, { useState } from 'react';
import { AppContext } from './app/AppContext';


function IgniteApp() {

  const [currentApp, setCurrentApp] = useState<string>('AppPurchase');

  const renderApp = () => {
    switch (currentApp) {
      case 'AppPurchase':
        return <AppPurchase />;
      case 'appSales':
        return <AppSales />;
      case 'appWarehouse':
        return <AppB />;
      default:
        return <AppPurchase />;
    }
  };

  return (
    <AppContext.Provider value={{ setCurrentApp }}>
      <View style={{ flex: 1 }}>
        {renderApp()}
      </View>
    </AppContext.Provider>
  );
  
  // return <App hideSplashScreen={() => Promise.resolve(true)} />;
}

export default IgniteApp;