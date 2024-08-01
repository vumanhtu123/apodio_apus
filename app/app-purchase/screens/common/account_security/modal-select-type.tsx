import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Svgs } from '../../../../../assets/svgs';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme';

// import IconSelected from '../../assets/icons/icon_selected.svg'
const { width, height } = Dimensions.get('screen');

interface DialogSelectType {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  setType: (value: string) => void;
}

const SelectTypeModal = (props: DialogSelectType) => {
  const { isVisible, setType, setIsVisible } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const data = [
    {
      type: '2_minutes',
      isSelect: '',
    },
    {
      type: '3_minutes',
      isSelect: '',
    },
    {
      type: '4_minutes',
      isSelect: '',
    },
    {
      type: '5_minutes',
      isSelect: '',
    },
    {
      type: '10_minutes',
      isSelect: '',
    },
    {
      type: '15_minutes',
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
                  <Text style={styles.selectType} tx="security.select_type"></Text>
                  <Text
                    style={styles.cancel}
                    onPress={() => setIsVisible(!isVisible)} tx="security.cancel"></Text>
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
                          {item.type === '2_minutes'
                            ? '2 minutes'
                            : item.type === '3_minutes'
                              ? '3 minutes'
                              : item.type === '4_minutes'
                                ? '4 minutes'
                                : item.type === '5_minutes'
                                  ? '5 minutes'
                                  : item.type === '10_minutes'
                                    ? '10 minutes'
                                    : item.type === '15_minutes'
                                      ? '15 minutes'
                                      : ''}
                        </Text>
                        {selectedIndex === index ? (
                          <Svgs.icon_check
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                          />
                        ) : (
                          <Text style={styles.cancel}></Text>
                        )}
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
    bottom: scaleHeight(15),
    alignSelf: 'center',
  },

  modalView: {
    width: scaleWidth(343),
    height: scaleHeight(414),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    marginHorizontal: 14,
    marginBottom: 23,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.yellow,
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
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
  row: {
    marginHorizontal: scaleWidth(16),
  },
  row1: {
    marginTop: scaleHeight(38),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectType: {
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.nightRider1,
    fontWeight: '700',
  },
  cancel: {
    fontSize: fontSize.size14,
    color: colors.red,
    fontWeight: '700',
    lineHeight: scaleHeight(24),
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
    alignItems: 'center',
  },
});
export default SelectTypeModal;
