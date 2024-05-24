import React, { FC, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, Text as TextRN, View } from 'react-native';
import { SvgIcon } from '../../../components/svg-icon/index';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { navigate } from '../../../navigators';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../../assets';
import ModalCreateClientFromNumber from './modal-create-clientFromPhone';
import { load } from '../../../utils/storage';
import { se } from 'date-fns/locale/se';
import { RectButton } from 'react-native-gesture-handler';
import { boolean } from 'mobx-state-tree/dist/internal';

interface ModalProps {
    isVisible?: boolean;
    setIsVisible?: () => void;
    openCreateClientPhoneNumber?: boolean;
    setIsVisibleCreateClientPhoneNumber?: () => void;
}

const RadioButton = ({ selected, onPress }: any) => (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
        {selected && <Images.icon_check
            width={scaleWidth(16)}
            height={scaleHeight(16)}
        />}
    </TouchableOpacity>
);
const SelectFilterModal: FC<ModalProps> = ({ isVisible, setIsVisible, openCreateClientPhoneNumber }) => {

    const navigation = useNavigation();
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [isVisibleCreateOnPhone, setisVisibleCreateOnphone] = useState(false);

    const sortOptions = [
        { type: 'alphabetAsc', label: 'Theo tên từ A - Z' },
        { type: 'alphabetDesc', label: 'Theo tên từ Z - A' },
        { type: 'createdDateNCC', label: 'Theo ngày tạo NCC' },
    ];

    const groupOptions = [
        { type: 'clientBad', label: 'Khách hàng hay hoàn' },
        { type: 'clientGoood', label: 'Khách hàng tiềm năng' },

    ];

    const fromClient = [
        { type: 'fromOnApp', lable: 'Tạo trên app' },
        { type: 'fromPhoneBook', lable: 'Danh bạ điện thoại' },
    ]
    // type SortType = 'new' | 'bestSeller' | 'hightToLow' | 'lowToHight' | 'aToZ' | 'zToA' | 'highPriceToLow' | 'lowPriceToHigh' | 'custom';

    const [showSortOption, setShowSortOption] = useState(true);
    const toggleShowSortOption = () => {
        setShowSortOption(!showSortOption);
    };
    const [showGroupOption, setShowGroupOption] = useState(true);

    const toggleShowGroupOption = () => {
        setShowGroupOption(!showGroupOption);
    };

    const [showClient, setshowClient] = useState(true);

    const toggleShowGroupClient = () => {
        setshowClient(!showClient);
    }

    const [selectedIndexes, setSelectedIndexes] = useState<number[][]>([[], []]);

    const handleSelectOption = (groupIndex: number, optionIndex: number, type: string) => {

        let newSelectedIndexes: number[][] = [...selectedIndexes];

        const isSelected = newSelectedIndexes[groupIndex].includes(optionIndex);
        console.log('nn', groupIndex)
        console.log("aa", optionIndex)
        if (isSelected) {
            // Nếu tùy chọn đã được chọn, thì loại bỏ optionIndex khỏi mảng con groupIndex bằng cách sử dụng phương thức filter.

            newSelectedIndexes[groupIndex] = newSelectedIndexes[groupIndex].filter(
                (index) => index !== optionIndex
            );
        } else {
            newSelectedIndexes[groupIndex].push(optionIndex);
        }

        console.log(newSelectedIndexes);

        setSelectedIndexes(newSelectedIndexes);
    };
    // const handleSort = () => {
    //     const selectedTypes = data.map((group, groupIndex) => group.options[selectedIndex[groupIndex]].type);
    //     setType(selectedTypes);
    //     // navigation.navigate("arrangeProduct" as never, { selectedTypes });
    //     setIsVisible(false);
    // };
    const setOpenDialog2 = () => { 
        
    }

  

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <TextRN style={styles.modalText} />
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Bộ lọc</Text>
                        <TouchableOpacity onPress={setIsVisible}>
                            <Text style={styles.headerButton}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={toggleShowSortOption}>
                            <Text style={styles.groupTitle}>Sắp xếp theo</Text>
                            <Images.dropDown width={scaleWidth(14)} height={scaleHeight(14)} style={{ transform: [{ rotate: showSortOption ? '180deg' : '0deg' }], }} />
                        </TouchableOpacity>
                        {showSortOption && (
                            <>

                                {sortOptions.map((item, optionIndex) => (
                                    <TouchableOpacity
                                        key={item.type}
                                        style={styles.optionItem}
                                        onPress={() => setSelectedOptionIndex(optionIndex)}
                                    >
                                        <Text style={styles.optionText}>{item.label}</Text>
                                        {selectedOptionIndex === optionIndex ? (
                                            <Images.icon_check
                                                width={scaleWidth(16)}
                                                height={scaleHeight(16)}
                                            />
                                        ) : (
                                            <Text style={styles.cancel}></Text>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}
                    </View>

                    <View>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={toggleShowGroupClient}>
                            <Text style={styles.groupTitle}>Khách hàng từ</Text>
                            <Images.dropDown width={scaleWidth(14)} height={scaleHeight(14)} style={{ transform: [{ rotate: showClient ? '180deg' : '0deg' }], }} />
                        </TouchableOpacity>
                        {
                            showClient && (
                                <View style={{ flexDirection: 'row', }}>
                                    {fromClient.map((item, lable) => (

                                        <TouchableOpacity
                                            style={styles.styleBtnClientFrom}
                                            key={item.type}
                                            onPress={() => {
                                                if (lable === 0) {

                                                } else if (lable === 1) {
                                                    setisVisibleCreateOnphone(!isVisibleCreateOnPhone)
                                                }

                                            }}
                                        >
                                            <Text style={{ textAlign: 'center' }}>
                                                {item.lable}
                                            </Text>
                                        </TouchableOpacity>

                                    ))}

                                </View>
                            )
                        }
                    </View>

                    <View>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={toggleShowGroupOption}>
                            <Text style={styles.groupTitle}>Nhãn khách hàng</Text>
                            <Images.dropDown width={scaleWidth(14)} height={scaleHeight(14)} style={{ transform: [{ rotate: showGroupOption ? '180deg' : '0deg' }], }} />
                        </TouchableOpacity>
                        {showGroupOption && (
                            <>
                                {groupOptions.map((item, optionIndex) => (
                                    <TouchableOpacity
                                        key={item.type}
                                        style={styles.optionItem}
                                        onPress={() => handleSelectOption(1, optionIndex, item.type)}
                                    >
                                        <Text style={styles.optionText}>{item.label}</Text>
                                        <RadioButton
                                            selected={selectedIndexes[1].includes(optionIndex)}
                                            onPress={() => handleSelectOption(1, optionIndex, item.type)}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: scaleHeight(15) }}>
                        <TouchableOpacity style={{ width: scaleWidth(150), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginRight: scaleWidth(12), borderRadius: 10, borderColor: '#c8c8c8' }}>
                            <Text style={{ fontSize: fontSize.size14 }}>Thiết lập lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: scaleWidth(150), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#0078d4' }}>
                            <Text style={{ fontSize: fontSize.size14, color: 'white' }}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <ModalCreateClientFromNumber
                isVisible={isVisibleCreateOnPhone}
                setIsVisible={setisVisibleCreateOnphone}
            />

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingTop: scaleHeight(8),
        // paddingBottom: 5,
        marginHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(15),
        padding: scaleWidth(15),
    },
    modalText: {
        textAlign: 'center',
        width: scaleWidth(68),
        height: scaleHeight(5),
        backgroundColor: '#C7C7C7',
        borderRadius: 8,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 8
    },
    headerButton: {
        fontSize: 16,
        color: 'red',
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
    },
    radioButton: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10
    },
    radioButtonSelected: {
        width: 14,
        height: 14,
        borderRadius: 6,
        backgroundColor: '#0078d4',
    },
    groupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: 'black'
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#E7EFFF',
        marginTop: scaleHeight(18),
        // marginBottom: 18,
    },
    cancel: {
        fontSize: fontSize.size14,
        color: '#FF0000',
        fontWeight: '700',
        lineHeight: scaleHeight(24),
    },
    styleBtnClientFrom: {
        marginRight: scaleWidth(12),
        width: scaleHeight(150),
        height: scaleHeight(38),
        borderRadius: 8,
        backgroundColor: '#F6F7F9',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SelectFilterModal;