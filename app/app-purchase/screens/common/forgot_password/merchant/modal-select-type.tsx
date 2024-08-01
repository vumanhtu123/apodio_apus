import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors } from '../../../../theme';
// import IconSelected from '../../assets/icons/icon_selected.svg'
const {width, height} = Dimensions.get('screen');

interface DialogSelectType {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  setType: (value: string) => void;
}

const SelectTypeModal = (props: DialogSelectType) => {
  const {isVisible, setType, setIsVisible} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const data = [
    {
      type: 'BI_CARD',
      isSelect: '',
    },
    {
      type: 'PASSPORT',
      isSelect: '',
    },
    {
      type: 'ELECTORAL_CARD',
      isSelect: '',
    },
  ];
  const setVisible = (isShowM: boolean) => {
    setIsVisible(isShowM);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(!isVisible)}>
      <TouchableWithoutFeedback>
        <View style={styles.main}>
          <View style={styles.content}>
            <View style={styles.modalView}>
              <View style={styles.row}>
                <View style={styles.row1}>
                  <Text style={styles.selectType}>Select type</Text>
                  <Text
                    style={styles.cancel}
                    onPress={() => setIsVisible(!isVisible)}>
                    Cancel
                  </Text>
                </View>
                <View style={styles.horizontalLine} />
                {data.map((item, index) => {
                  const isEnd = index === data.length - 1;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedIndex(index);
                        setType(item.type);
                        setVisible(false);
                      }}>
                      <View style={styles.row2}>
                        <Text style={styles.text}>
                          {item.type === 'BI_CARD'
                            ? 'BI Card'
                            : item.type === 'PASSPORT'
                            ? 'Passport'
                            : 'Eletoral Card'}
                        </Text>
                        {
                          // selectedIndex === index ? <SvgIcon name={'ic_selected'} width={16} height={16} /> : <Text style={styles.cancel}></Text>
                        }
                      </View>
                      {isEnd ? null : <View style={styles.horizontalLine} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
    width: width,
    height: height,
    flex: 1,
  },
  content: {
    position: 'absolute',
    bottom: 42,
    alignSelf: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  centeredView: {
    width: width - 32,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  modalView: {
    width: width - 32,
    height: 246,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  button: {
    marginHorizontal: 14,
    marginBottom: 23,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.yellow,
  },
  textButton: {
    fontSize: 14,
    color: 'white',
    paddingVertical: 12,
    alignSelf: 'center',
  },
  buttonClose: {
    backgroundColor: colors.dodgerBlue1,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 10,
    textAlign: 'center',
    width: 68, // Kích thước chiều rộng 68dp
    height: 5, // Kích thước chiều cao 5dp
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 37,
    marginBottom: 24,
  },
  text: {
    alignSelf: 'center',
    color: colors.nightRider1,
  },
  row: {
    marginHorizontal: 16,
  },
  row1: {
    marginTop: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectType: {
    fontSize: 14,
    color: colors.nightRider1,
    fontFamily: 'Arial',
    fontWeight: '700',
  },
  // text: {
  //     fontSize: 14,
  //     color: colors.nightRider1,
  // },
  cancel: {
    fontSize: 14,
    color: colors.red,
    fontFamily: 'Arial',
    fontWeight: '700',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.solitude2,
    marginTop: 18,
    marginBottom: 14,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default SelectTypeModal;
