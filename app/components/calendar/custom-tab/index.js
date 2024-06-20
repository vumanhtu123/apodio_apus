import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { Text } from '../../text/text';

const CustomTabs = ({
  titles,
  selectedIndex,
  activeColor,
  inactiveColor,
  tintColor,
  inactiveTintColor,
  seperatorColor,
  style,
  textStyle,
  onPress,
}) => {
  const renderTabItem = (item, index) => {
    const onPressTab = () => onPress(index);

    const seperatorShouldHide =
      selectedIndex === index || selectedIndex === index - 1 || index === 0;

    return (
      <View key={index} style={styles.tabItemContainer}>
        <View
          style={[
            styles.seperator,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: seperatorShouldHide
                ? 'transparent'
                : seperatorColor,
            },
          ]}
        />
        <TouchableOpacity
          style={[
            styles.touchContainer,
            {
              backgroundColor:
                selectedIndex === index ? activeColor : inactiveColor,
            },
          ]}
          onPress={onPressTab}>
          <Text
            style={[
              styles.tabItemText,
              textStyle,
              {
                color: selectedIndex === index ? tintColor : inactiveTintColor,
              },
            ]}
            tx={item}
            numberOfLines={1}>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[styles.tabContainer, {backgroundColor: inactiveColor}, style]}>
      {titles.map(renderTabItem)}
    </View>
  );
};

CustomTabs.defaultProps = {
  selectedIndex: 0,
  activeColor: 'white',
  inactiveColor: '#E4E5F0',
  tintColor: 'black',
  inactiveTintColor: '#82869E',
  seperatorColor: '#BCBFD6',
};

export default CustomTabs;

const styles = StyleSheet.create({
  tabItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seperator: {
    width: 1,
    height: 20,
  },
  touchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 7,
    margin: 2,
    marginRight: 3,
    flex: 1,
    justifyContent: 'center',
  },
  tabItemText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  tabContainer: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
