import { observer, useLocalStore } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import {Dimensions, FlatList, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Header, Text } from "../../components";
import { Images } from "../../../assets";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../theme";
import DropdownModal from "./componet/multiSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from 'react-native-modal';
import { useStores } from "../../models";
import ItemlistUnpaid from "../client/Item/Item-list-unpaid";
import { AttributeResult } from "../../models/attribute-store/list-attribute-model";
import { AttributeDataResult } from "../../models/attribute-store/data-attribute-model";
import { translate } from "../../i18n/translate";
import { showDialog } from "../../utils/toast";

export const EditAttribute: FC = observer(
    function EditAttribute(props) {
        const navigation = useNavigation()
        const paddingTop = useSafeAreaInsets().top
        const route = useRoute()
        const { dataAttribute, dropdownSelected, editScreen }: any = route?.params

        const [attributeData, setAttributeData] = useState<{}[]>([]);
        const [selectedGroup, setSelectedGroup] = useState<{}[]>([]);
        const [selectedItems, setSelectedItems] = useState([]);
        const [idAttributeCategory, setIdAttributeCategory] = useState([])
        const [showModal, setShowModal] = useState(false)
        const [arrData, setArrData] = useState([])
        const [filteredData, setFilteredData] = useState(arrData);
        const [titleModal, setTitleModal] = useState('')
        const [arrSelect, setArrSelect] = useState([])
        const [arrSelectDrop, setArrSelectDrop] = useState([])
        const [idAttributeModal, setIdAttributeModal] = useState('')
        const [inputText, setInputText] = useState<{}[]>([])
        const [page, setPage] = useState(0)
        const { attributeStore } = useStores()

        const getListAttribute = async () => {
            try {
                const response = await attributeStore.getListAttribute(page, 50, true);
                if (response && response.kind === 'ok') {
                    if (page === 0) {
                        console.log('getListAttribute---------------------', JSON.stringify(response.response.data))
                        const newArr = response.response.data.content
                        const formatArr = newArr.map((item: any) =>
                        ({
                            text: item.name,
                            value: item.id,
                        })
                        )
                        setAttributeData(formatArr)
                    } else {
                        console.log('getListAttribute---------------------', JSON.stringify(response.response.data))
                        const newArr = response.response.data.content
                        const formatArr = newArr.map((item: any) =>
                        ({
                            text: item.name,
                            value: item.id,
                        })
                        )
                        const endArr = attributeData.concat(formatArr)
                        setAttributeData(endArr)
                    }
                } else {
                    console.error('Failed to fetch categories:', response);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        const getListDataAttribute = async () => {
            try {
                const response = await attributeStore.getListDataAttribute(idAttributeCategory);
                if (response && response.kind === 'ok') {
                    setSelectedGroup(response.response.data)
                    const newArr = response.response.data.map(items => {
                        items.attributeOutputList?.map(item => {
                            if (item.displayType === 'TEXTFIELD') {
                                const newItem = { value: '', productAttributeId: item.id }
                                const newArr = [...inputText, newItem]
                                return newArr
                            }
                        })
                    })
                    setInputText(newArr)
                } else {
                    console.error('Failed to fetch categories:', response);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        useEffect(() => {
            getListAttribute()
        }, [page])

        useEffect(() => {
            if (idAttributeCategory.length > 0) {
                getListDataAttribute()
            }
        }, [idAttributeCategory])

        useEffect(() => {
            if (dataAttribute !== undefined) {
                const newArr = dropdownSelected.map(item => { return item.value })
                setIdAttributeCategory(newArr)
                setSelectedItems(dataAttribute)
                getListDataAttribute()
                setArrSelectDrop(dropdownSelected)
            }
        }, [dropdownSelected])


        const deleteLineAttribute = (items: any) => {
            const newArr = selectedGroup.map(item => {
                if (item.id === items.item.attributeCategoryId) {
                    const arr = item.attributeOutputList.slice()
                    arr.splice(items.index, 1)
                    return { ...item, attributeOutputList: arr };
                } else { return item }
            })
            const newArr1 = newArr.filter(item => item.attributeOutputList.length !== 0)
            const newArr2 = selectedItems.filter(item => item.productAttributeId !== items.item.id)
            setSelectedItems(newArr2)
            setSelectedGroup(newArr1)
        }

        const handleSelect = (items: any) => {
            const newArr = items.map((item) => (item.value))
            const newArr2 = newArr.map(item => {
                const a = selectedItems.map(items => {
                    if (item === items.idGroup) {
                        return items
                    }
                })
                return a
            })
            const newArr3 = newArr2.flatMap(items => items.filter(item => item !== undefined))
            setSelectedItems(newArr3)
            setArrSelectDrop(items)
            if (newArr.length === 0) {
                setSelectedGroup([])
            }
            setIdAttributeCategory(newArr)
        };
        const handleRemove = () => {

        }

        const onPressCaret = (item: any, id: any, idGroup: any) => {
            const a = selectedItems.filter(item => item.productAttributeId === id)
            const newArray = item.map((items: any) => ({ ...items, idGroup: idGroup }));
            setShowModal(true)
            setArrData(newArray)
            setFilteredData(newArray)
            setArrSelect(a)
        }

        const handleItemSelect = (item: any) => {
            var indexArr = arrSelect.findIndex((selectedItem: { value: any, id: any }) => selectedItem.value === item.value && selectedItem.id === item.id)
            if (indexArr === -1) {
                let a = arrSelect.concat(item)
                setArrSelect(a)
            } else {
                let b = arrSelect.slice()
                b.splice(indexArr, 1)
                setArrSelect(b)
            }
        };

        const onConfirm = () => {
            showDialog(translate("txtDialog.txt_title_dialog"), 'danger', translate("txtDialog.attribute_deletion_warning"), translate("common.cancel"), translate("common.ok"), () => {
                if (editScreen === true) {
                    navigation.navigate('ProductEditScreen' as never, { check: true, attributeArr: selectedItems, dropdownSelected: arrSelectDrop })
                } else {
                    navigation.navigate('ProductCreateScreen' as never, { check: true, attributeArr: selectedItems, dropdownSelected: arrSelectDrop, resetData: false })
                }
            })
        }

        const onCancel = () => {
            if (selectedItems.length === 0) {
                navigation.goBack()
            } else {

                showDialog(translate("txtDialog.txt_title_dialog"), 'danger', translate("txtDialog.confirm_edit_attribute"), translate("common.cancel"), translate("common.ok"), () => {
                    navigation.goBack()
                })
            }
        }

        const onCancelModal = () => {
            setShowModal(false)
            setArrSelect([])
        }

        const onConfirmModal = async () => {
            const a = selectedItems.filter(item => item.productAttributeId !== idAttributeModal)
            setSelectedItems(a.concat(arrSelect))
            setShowModal(false)
            setArrSelect([])
        }

        const renderItem = ({ item }: any) => {
            const isSelected = arrSelect.some((selectedItem: { value: any, idAttribute: any }) => selectedItem.value === item.value && selectedItem.idAttribute === item.idAttribute);
            return (
                <View>
                    <View style={{ height: scaleHeight(1), backgroundColor: '#E7EFFF' }} />
                    <TouchableOpacity style={{
                        paddingVertical: 10,
                        flexDirection: 'row',
                    }} onPress={() => handleItemSelect(item)}>
                        <View style={styles.viewItemFlatListModal} >
                            {isSelected && <Images.icon_checkBox
                                width={scaleWidth(16)}
                                height={scaleHeight(16)}
                            />}
                        </View>
                        <Text style={{
                            fontSize: fontSize.size14,
                        }}>{item.value}</Text>
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <View style={styles.ROOT}>
                <Header
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    headerText="Sửa thuộc tính"
                    style={{ height: scaleHeight(52) }}
                />
                <View style={[styles.viewBody, { top: scaleHeight(52) + scaleHeight(paddingTop), }]}>
                    <DropdownModal
                        required
                        arrData={attributeData}
                        onPressChoice={handleSelect}
                        onRemove={handleRemove}
                        titleText="Nhóm thuộc tính"
                        hintText="Chọn nhóm thuộc tính"
                        dataEdit={dropdownSelected}
                        loadMore={()=> setPage(page+ 1)}
                    />
                    <ScrollView>
                        {selectedGroup.map((item: any, index: any) => {
                            return (
                                <View key={index}>
                                    <View >
                                        <Text text={item.name} style={{
                                            fontWeight: '600', fontSize: fontSize.size12,
                                            color: colors.palette.nero, marginTop: scaleHeight(15)
                                        }} />
                                    </View>
                                    <FlatList
                                        data={item.attributeOutputList}
                                        scrollEnabled={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={(items) => {
                                            return (
                                                <View style={styles.viewItemAttribute}>
                                                    <TouchableOpacity onPress={() => deleteLineAttribute(items)}>
                                                        <Images.icon_minusCircle />
                                                    </TouchableOpacity>
                                                    <Text text={items.item.name} style={[styles.textAttribute,
                                                    { width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.3, marginLeft: scaleWidth(2), }]} />
                                                    {items.item.displayType === 'CHECKBOX' ?
                                                        <View style={{ flexDirection: 'row', }}>
                                                            {selectedItems.some(item => item.productAttributeId === items.item.id) ? <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                                                style={{ maxWidth: (Dimensions.get('screen').width - scaleWidth(32)) * 0.6 }}>
                                                                {selectedItems.map((item) => {
                                                                    if (item.productAttributeId === items.item.id) {
                                                                        return (
                                                                            <TouchableOpacity onPress={() => {
                                                                                const newArr = selectedItems.slice()
                                                                                const a = newArr.filter(items => items.id !== item.id)
                                                                                setSelectedItems(a)
                                                                            }} style={styles.viewDataAttribute} key={item.index}>
                                                                                <Text text={item.value} style={[styles.textAttribute, {
                                                                                    marginRight: scaleWidth(4),
                                                                                }]} />
                                                                                <Images.icon_delete2 width={scaleWidth(10)} height={scaleHeight(10)} />
                                                                            </TouchableOpacity>
                                                                        )
                                                                    }
                                                                })}
                                                            </ScrollView> :
                                                                <View style={{ width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.6, }}>
                                                                    <Text text="Chọn giá trị" style={{ color: colors.palette.dolphin, fontSize: fontSize.size12 }} />
                                                                </View>}
                                                            <TouchableOpacity onPress={() => {
                                                                onPressCaret(items.item.productAttributeValue, items.item.id, item.id)
                                                                setTitleModal(items.item.name)
                                                                setIdAttributeModal(items.item.id)
                                                            }}>
                                                                <Images.icon_caretRightDown />
                                                            </TouchableOpacity>
                                                        </View> :
                                                        <View>
                                                            {selectedItems.some(item => item.productAttributeId === items.item.id) ? <View>
                                                                {
                                                                    selectedItems.map((dto) => {
                                                                        if (dto.productAttributeId === items.item.id) {
                                                                            return (
                                                                                <TextInput
                                                                                    style={{
                                                                                        width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.6,
                                                                                        paddingVertical: Platform.OS === 'ios' ? scaleHeight(4) : 0
                                                                                    }}
                                                                                    placeholder="Nhập giá trị"
                                                                                    placeholderTextColor={colors.palette.dolphin}
                                                                                    defaultValue={dto.value}
                                                                                    onChangeText={(text) => {
                                                                                        const newItem = { productAttributeId: items.item.id, value: text, idGroup: item.id }
                                                                                        var indexArr = selectedItems.findIndex((selectedItem: { productAttributeId: any }) => selectedItem.productAttributeId === items.item.id)
                                                                                        if (indexArr === -1) {
                                                                                            let a = selectedItems.concat(newItem)
                                                                                            setSelectedItems(a)
                                                                                        } else {
                                                                                            let b = selectedItems.slice()
                                                                                            b.splice(indexArr, 1, newItem)
                                                                                            setSelectedItems(b)
                                                                                        }
                                                                                    }} />
                                                                            )
                                                                        }
                                                                    })
                                                                }</View> : <TextInput
                                                                style={{
                                                                    width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.6,
                                                                    paddingVertical: Platform.OS === 'ios' ? scaleHeight(4) : 0
                                                                }}
                                                                placeholder="Nhập giá trị"
                                                                placeholderTextColor={colors.palette.dolphin}
                                                                onChangeText={(text) => {
                                                                    const newItem = { productAttributeId: items.item.id, value: text, idGroup: item.id }
                                                                    var indexArr = selectedItems.findIndex((item) => item.productAttributeId === items.item.id)
                                                                    if (indexArr === -1) {
                                                                        let a = selectedItems.concat(newItem)
                                                                        setSelectedItems(a)
                                                                    } else {
                                                                        let b = selectedItems.slice()
                                                                        b.splice(indexArr, 1, newItem)
                                                                        setSelectedItems(b)
                                                                    }
                                                                }} />}
                                                        </View>
                                                    }
                                                </View>
                                            )
                                        }
                                        }
                                    />
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.viewGroupButton}>
                    <Button onPress={() => onCancel()}
                        tx={'productScreen.cancel'} style={styles.viewButtonCancel}
                        textStyle={styles.textButtonCancel} />
                    <Button tx={'productScreen.save'} style={styles.viewButtonConfirm}
                        textStyle={[styles.textButtonCancel, { color: colors.palette.neutral100, }]}
                        onPress={() => onConfirm()}
                    />
                </View>
                <Modal isVisible={showModal}>
                    <View style={styles.viewModal}>
                        <Text text={titleModal} style={[styles.textButtonCancel, {
                            marginVertical: scaleHeight(18),
                            marginLeft: scaleWidth(9), color: colors.palette.nero
                        }]} />
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginBottom: scaleHeight(margin.margin_10)
                        }}>
                            <Button onPress={() => onCancelModal()}
                                tx={'productScreen.cancel'} style={[styles.viewButtonCancel,
                                {
                                    width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.48,
                                    marginRight: 0
                                }]}
                                textStyle={styles.textButtonCancel} />
                            <Button tx={'productScreen.BtnNotificationAccept'} style={[styles.viewButtonConfirm,
                            { width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.48, }]}
                                textStyle={[styles.textButtonCancel, { color: colors.palette.neutral100, }]}
                                onPress={(idAttributeModal) => onConfirmModal()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
)

const styles = StyleSheet.create({
    viewItemFlatListModal: {
        width: scaleWidth(16),
        height: scaleHeight(16),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: scaleWidth(6),
    },
    ROOT: { flex: 1, backgroundColor: colors.palette.neutral100 },
    viewBody: {
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(16),
        position: "absolute",
        left: 0,
        right: 0,
        bottom: scaleHeight(54),
    },
    viewGroupButton: {
        position: "absolute",
        bottom: scaleHeight(20),
        marginHorizontal: scaleWidth(margin.margin_16),
        flexDirection: "row",
        // justifyContent: 'space-between',
    },
    viewButtonCancel: {
        height: scaleHeight(48),
        backgroundColor: colors.palette.neutral100,
        borderWidth: 1,
        borderColor: colors.palette.veryLightGrey,
        width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
        borderRadius: 8,
        marginRight: (Dimensions.get("screen").width - scaleWidth(32)) * 0.04,
    },
    viewButtonConfirm: {
        height: scaleHeight(48),
        backgroundColor: colors.palette.navyBlue,
        width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
        borderRadius: 8,
    },
    viewModal: {
        height: Dimensions.get("screen").height * 0.4,
        backgroundColor: colors.palette.neutral100,
        borderRadius: 8,
        paddingVertical: scaleHeight(padding.padding_12),
        paddingHorizontal: scaleWidth(padding.padding_16),
        position: "absolute",
        bottom: 16,
        left: 0,
        right: 0,
    },
    viewItemAttribute: {
        flexDirection: "row",
        alignItems: "center",
        height: scaleHeight(34),
        borderBottomWidth: 1,
        borderBottomColor: "#E7EFFF",
    },
    viewDataAttribute: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 4,
        paddingVertical: scaleHeight(6),
        paddingHorizontal: scaleWidth(8),
        backgroundColor: colors.palette.aliceBlue,
        marginRight: scaleWidth(8),
    },
    textButtonCancel: {
        color: colors.palette.dolphin,
        fontWeight: "700",
        fontSize: fontSize.size14,
        lineHeight: scaleHeight(24),
    },
    textAttribute: {
        fontWeight: "400",
        fontSize: fontSize.size10,
        color: colors.palette.dolphin,
    },
});
