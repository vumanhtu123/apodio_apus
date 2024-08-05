import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppContext } from '../app-context/AppContext';

const AppB: React.FC = () => {
  const { setCurrentApp } = useAppContext();

  return (
    <View>
      <Text>App B</Text>
      <Button
        title="Open App C"
        onPress={() => setCurrentApp('appC')}
      />
      <Button
        title="Open App A"
        onPress={() => setCurrentApp('AppPurchase')}
      />
    </View>
  );
};

export default AppB;
