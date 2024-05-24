import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, Text as TextRN, View } from 'react-native';
import { SvgIcon } from '../../../components/svg-icon/index';
import { scaleHeight, scaleWidth } from '../../../theme';
import { navigate } from '../../../navigators';
import { useNavigation } from '@react-navigation/native';

const RadioButton = ({ selected, onPress }: any) => (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
        {selected && <View style={styles.radioButtonSelected} />}
    </TouchableOpacity>
);
const SelectFilterModal = (props: any) => {
    const { isVisible, setType, setIsVisible } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigation = useNavigation();

    const data = [
        { type: 'new', label: 'Mới nhất' },
        { type: 'bestSeller', label: 'Sản phẩm bán chạy' },
        { type: 'hightToLow', label: 'Còn hàng từ cao -> thấp' },
        { type: 'lowToHight', label: 'Còn hàng từ thấp -> cao' },
        { type: 'aToZ', label: 'Từ A -> Z' },
        { type: 'zToA', label: 'Từ Z -> A' },
        { type: 'highPriceToLow', label: 'Giá từ cao đến thấp' },
        { type: 'lowPriceToHigh', label: 'Giá từ thấp đến cao' },
        { type: 'custom', label: 'Tuỳ chỉnh' },
    ];

    // type SortType = 'new' | 'bestSeller' | 'hightToLow' | 'lowToHight' | 'aToZ' | 'zToA' | 'highPriceToLow' | 'lowPriceToHigh' | 'custom';

    const handleSelectOption = (index: number) => {
        setSelectedIndex(index);
    };

    const handleSort = () => {
        const selectedType = data[selectedIndex].type;
        setType(selectedType);
        navigation.navigate("arrangeProduct" as never, { selectedType });
        setIsVisible(false);
    };
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleSort} style={{ position: 'absolute', borderWidth: 1, bottom: 15, right: 40, zIndex: 1, width: scaleWidth(55), height: scaleHeight(24), alignItems: 'center', justifyContent: 'center', borderColor: '#0078d4', borderRadius: 5 }}>
                    <Text style={{ color: '#0078d4' }}> Sắp xếp </Text>
                </TouchableOpacity>
                <View style={styles.modalView}>
                    <TextRN style={styles.modalText} />
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Sắp xếp</Text>
                        <TouchableOpacity onPress={() => setIsVisible(false)}>
                            <Text style={styles.headerButton}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={item.type}
                            style={styles.optionItem}
                            onPress={() => handleSelectOption(index, item.type)}
                        >
                            <RadioButton
                                selected={selectedIndex === index}
                                onPress={() => handleSelectOption(index, item.type)}
                            />
                            <Text style={styles.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
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
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 5,
        marginHorizontal: 16
    },
    modalText: {
        textAlign: 'center',
        width: scaleWidth(68),
        height: scaleHeight(5),
        backgroundColor: '#C7C7C7',
        borderRadius: 8,
        alignSelf: 'center',
        // marginBottom : 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerButton: {
        fontSize: 16,
        color: 'red',
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    radioButtonSelected: {
        width: 14,
        height: 14,
        borderRadius: 6,
        backgroundColor: '#0078d4',
    },
});

export default SelectFilterModal;