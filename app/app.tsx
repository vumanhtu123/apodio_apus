
if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require('./devtools/ReactotronConfig.ts');
}
import 'react-native-gesture-handler';
import './i18n';
import './utils/ignoreWarnings';
import React, { useEffect, useRef, useState } from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {RootStore, RootStoreProvider, setupRootStore} from './models';
import {AppNavigator, useNavigationPersistence} from './navigators';
import * as storage from './utils/storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ViewStyle, Linking} from 'react-native';
import Config from "react-native-config";
import {setDialog, setLoading, setToast} from './utils/toast';
import Loading from './components/loading/loading';
import Toast from 'react-native-toast-message';
import CustomDialog from './components/dialog/custom_dialog';
export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

// Web linking configuration
const prefix = Linking.canOpenURL('/');
const config = {
  screens: {
    Login: {
      path: '',
    },
    Welcome: 'welcome',
    Demo: {
      screens: {
        DemoShowroom: {
          path: 'showroom/:queryIndex?/:itemIndex?',
        },
        DemoDebug: 'debug',
        DemoPodcastList: 'podcast',
        DemoCommunity: 'community',
      },
    },
  },
};

interface AppProps {
  hideSplashScreen: () => Promise<boolean>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const {hideSplashScreen} = props;
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const linking = {
    prefixes: [prefix],
    config,
  };
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      setToast(Toast);
      setupRootStore().then(setRootStore);
      const lang = await storage.getCurrentLanguage();
    })();
  }, []);

  if (!rootStore || !isNavigationStateRestored) return null;

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* <ErrorBoundary catchErrors={Config.catchErrors}> */}
      <GestureHandlerRootView style={$container}>
        <AppNavigator
          linking={linking}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </GestureHandlerRootView>
      <Loading ref={_ref => _ref && setLoading(_ref)} />
      <Toast/>
      <CustomDialog ref={_refDialog => _refDialog && setDialog(_refDialog)} />
      {/* </ErrorBoundary> */}
    </SafeAreaProvider>
    </RootStoreProvider>
  );
}

export default App;

const $container: ViewStyle = {
  flex: 1,
};
