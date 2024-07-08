import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface CustomKeyboardModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
  onKeyPress: (key: string) => void;
}

const CustomKeyboard: React.FC<CustomKeyboardModalProps> = ({
  isVisible,
  setIsVisible,
  onKeyPress,
}) => {
  const keys = [
    { label: '1', value: '1', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '2', value: '2', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '3', value: '3', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '-', value: '-', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '4', value: '4', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '5', value: '5', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '6', value: '6', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '\u2423', value: '', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '7', value: '7', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '8', value: '8', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '9', value: '9', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '\u232B', value: 'Del', customStyle: { backgroundColor: '#383838', color: 'blue' } },
    { label: '.', value: '.', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '0', value: '0', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: ',', value: ',', customStyle: { backgroundColor: '#383838', color: 'white' } },
    { label: '\u2713', value: 'Enter', customStyle: { backgroundColor: '#383838', color: 'green' } },
  ];

  const handleKeyPress = (key: string) => {
    onKeyPress(key);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={setIsVisible}
      style={{ margin: 0 }}
    >
      <TouchableWithoutFeedback onPress={setIsVisible}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.keyboardContainer}>
              {keys.map((key, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleKeyPress(key.value)}
                  style={[styles.key, key.customStyle]}
                >
                  <Text style={[styles.keyText, key.customStyle]}>{key.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardContainer: {
    backgroundColor: '#1b1b1b',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    height: 40,
    width: '23%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomKeyboard;
