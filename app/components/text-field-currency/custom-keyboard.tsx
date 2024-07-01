import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface CustomKeyboardModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
  title?: string;
  onKeyPress: (key: string) => void;
}

const CustomKeyboard = (props: CustomKeyboardModalProps) => {
  const { isVisible, setIsVisible, title, onKeyPress } = props;

  const keys = [
    { label: '1', value: '1', customStyle: { backgroundColor: 'lightblue' } },
    { label: '2', value: '2', customStyle: { backgroundColor: 'lightblue' } },
    { label: '3', value: '3', customStyle: { backgroundColor: 'lightblue' } },
    { label: '-', value: '-', customStyle: { backgroundColor: 'lightblue' } },
    { label: '4', value: '4', customStyle: { backgroundColor: 'lightblue' } },
    { label: '5', value: '5', customStyle: { backgroundColor: 'lightblue' } },
    { label: '6', value: '6', customStyle: { backgroundColor: 'lightblue' } },
    { label: '+', value: '+', customStyle: { backgroundColor: 'lightblue' } },
    { label: '7', value: '7', customStyle: { backgroundColor: 'lightblue' } },
    { label: '8', value: '8', customStyle: { backgroundColor: 'lightblue' } },
    { label: '9', value: '9', customStyle: { backgroundColor: 'lightblue' } },
    { label: '\u232B', value: 'Del', customStyle: { backgroundColor: 'lightgray', width: '18%' } },
    { label: ',', value: ',', customStyle: { backgroundColor: 'lightblue' } },
    { label: '0', value: '0', customStyle: { backgroundColor: 'lightblue' } },
    { label: '.', value: '.', customStyle: { backgroundColor: 'lightblue' } },
    { label: '✓', value: '✓', customStyle: { backgroundColor: 'lightblue', width: '18%', color: 'white' } },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={setIsVisible}
      style={{ margin: 0 }}
    >
      <TouchableWithoutFeedback onPress={setIsVisible}>
        <View style={styles.overlay}>
          <View style={styles.keyboardContainer}>
            {keys.map((key, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onKeyPress(key.value)}
                style={[styles.key, key.customStyle]}
              >
                <Text style={styles.keyText}>{key.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    width: '18%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5%',
    borderRadius: 10,
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomKeyboard;
