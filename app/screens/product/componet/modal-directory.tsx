import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, FlatList, TextInput } from 'react-native';
import { stylesItem } from '../styles';
import { Images } from '../../../../assets/index';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';

const { width, height } = Dimensions.get('screen');

interface CategoryModalProps {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
    onSelectCategory: (category: string) => void;
}

const CategoryModal = (props: CategoryModalProps) => {
    const { isVisible, onSelectCategory, setIsVisible } = props;
    const [searchText, setSearchText] = useState('');

    const categories = [
        { id: '1', name: 'Gạch lát sàn'},
        { id: '2', name: 'Gạch ốp tường'},
        { id: '3', name: 'Gạch ốp tường'},

        // Thêm các danh mục khác vào đây
    ];

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const renderCategoryItem = ({ item }: any) => (

        <TouchableOpacity
            onPress={() => {
                onSelectCategory(item.name);
                setIsVisible(false);
            }}
            style={[styles.categoryItem]}
        >
            <View>
                <Images.logoChangePass width={50} height={50} />
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Danh mục</Text>
                            <Text style={styles.modalClose} onPress={() => setIsVisible(false)}>Đóng</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Tìm tên danh mục"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                            <FlatList
                                data={filteredCategories}
                                renderItem={renderCategoryItem}
                                keyExtractor={item => item.id}
                                // key={`${filteredCategories.length}-${3}`}
                                numColumns={3}
                                columnWrapperStyle={styles.columnWrapper}
                                // style = {{backgroundColor: 'red'}}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: width,
        maxHeight: height - 100,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E7EFFF',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalClose: {
        fontSize: 14,
        color: '#FF0000',
    },
    modalBody: {
        padding: scaleHeight(32),
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#E7EFFF',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    categoryItem: {
     
        alignItems: 'center',
        width: scaleWidth(100),
        height: scaleHeight(67),
        // backgroundColor : 'red',
        marginRight : 11
    },
    columnWrapper: {
        // justifyContent: 'space-between',
    },
    separator: {
        height: 1,
        backgroundColor: '#E7EFFF',
    },
    titleView: {
        alignItems: "center",

    },
    title: {
        color: '#242426',
        fontSize: fontSize.size12,
        fontWeight: '400',
    },
});

export default CategoryModal;