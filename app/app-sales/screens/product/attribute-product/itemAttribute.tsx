import { memo, useState } from 'react';
import React, { Dimensions, FlatList, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Switch, Text } from '../../../../app-purchase/components';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { Svgs } from '../../../../../assets/svgs';
import { translate } from '../../../i18n';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../../../models';
import { Controller, useFormContext } from 'react-hook-form';
import { ALERT_TYPE, Toast } from '../../../../app-purchase/components/dialog-notification';

interface ItemAttribute {
    selectedItems: any;
    arrSelect: any;
    selectedGroup: any;
    onPressCaret: ({ }: any, itemId: any, id: any) => void;
    setIdAttributeModal: (id: any) => void;
    setSelectedItems: (item: any) => void;
    handleItemSelect: (item: any) => void;
    deleteLineAttribute: (item: any) => void;
    filteredData: any;
    onCancelModal: () => void;
    onConfirmModal: () => void;
    screen: string;
}

export const ItemAttribute = memo(
    function ItemAttribute(props: ItemAttribute) {
        const navigation = useNavigation()
        const [showModal, setShowModal] = useState(false);
        const [titleModal, setTitleModal] = useState("");
        const { attributeStore } = useStores()
        const { control } = useFormContext()

        const renderItem = ({ item }: any) => {
            const isSelected = props.arrSelect.some(
                (selectedItem: { value: any; idAttribute: any }) =>
                    selectedItem.value === item.value &&
                    selectedItem.idAttribute === item.idAttribute
            );
            return (
                <View>
                    <View style={{ height: scaleHeight(1), backgroundColor: colors.solitude2 }} />
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            flexDirection: "row",
                        }}
                        onPress={() => props.handleItemSelect(item)}
                    >
                        <View style={styles.viewItemFlatListModal}>
                            {isSelected && (
                                <Svgs.icon_checkBox
                                // width={scaleWidth(16)}
                                // height={scaleHeight(16)}
                                />
                            )}
                        </View>
                        <Text
                            style={{
                                fontSize: fontSize.size14,
                            }}
                        >
                            {item.value}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        };
        return (
            <View>
                <ScrollView>
                    {props.selectedGroup.map((item: any, index: any) => {
                        return (
                            <View key={index}>
                                <View>
                                    <Text text={item.name} style={styles.textNero600} />
                                </View>
                                <FlatList
                                    data={item.attributeOutputList}
                                    scrollEnabled={false}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={(items) => {
                                        return (
                                            <View style={styles.viewItemAttribute}>
                                                {props.screen === "editAttributeByEdit" ? null :
                                                    <TouchableOpacity
                                                        style={styles.viewIconDeleteLine}
                                                        onPress={() => props.deleteLineAttribute(items)}
                                                    >
                                                        <Svgs.icon_minusCircle />
                                                    </TouchableOpacity>}
                                                <Text
                                                    text={items.item.name}
                                                    style={[
                                                        styles.textAttribute,
                                                        {
                                                            width: "30%",
                                                            marginLeft: scaleWidth(2),
                                                        },
                                                    ]}
                                                />
                                                {props.screen === "editAttributeByEdit" ?
                                                    <View style={{ height: scaleHeight(20), width: scaleWidth(20) }} /> :
                                                    null}
                                                {items.item.displayType === "CHECKBOX" ? (
                                                    <View
                                                        style={{
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {props.selectedItems.some(
                                                            (item: any) =>
                                                                item.productAttributeId === items.item.id
                                                        ) ? (
                                                            <ScrollView
                                                                horizontal
                                                                showsHorizontalScrollIndicator={false}
                                                                style={{
                                                                    maxWidth:
                                                                        (Dimensions.get("screen").width -
                                                                            scaleWidth(45)) *
                                                                        0.6,
                                                                }}
                                                            >
                                                                {props.selectedItems.map((item: any) => {
                                                                    if (
                                                                        item.productAttributeId === items.item.id
                                                                    ) {
                                                                        return (
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    if (item.isUsing === true) {
                                                                                        Toast.show({
                                                                                            type: ALERT_TYPE.DANGER,
                                                                                            title: "",
                                                                                            textBody: translate(
                                                                                                "txtToats.attribute_is_using"
                                                                                            ),
                                                                                        });
                                                                                    } else {
                                                                                        const newArr = props.selectedItems.slice();
                                                                                        const a = newArr.filter(
                                                                                            (items: any) => items.id !== item.id
                                                                                        );
                                                                                        props.setSelectedItems(a);
                                                                                    }
                                                                                }}
                                                                                style={styles.viewDataAttribute}
                                                                                key={item.index}
                                                                            >
                                                                                <Text
                                                                                    text={item.value}
                                                                                    style={[
                                                                                        styles.textAttribute,
                                                                                        { marginRight: scaleWidth(4) },
                                                                                    ]}
                                                                                />
                                                                                <Svgs.icon_delete2
                                                                                    width={scaleWidth(10)}
                                                                                    height={scaleHeight(10)}
                                                                                />
                                                                            </TouchableOpacity>
                                                                        );
                                                                    }
                                                                })}
                                                            </ScrollView>
                                                        ) : (
                                                            <View
                                                                style={{
                                                                    width:
                                                                        (Dimensions.get("screen").width -
                                                                            scaleWidth(45)) *
                                                                        0.6,
                                                                }}
                                                            >
                                                                <Text
                                                                    tx="addAttribute.selectedValue"
                                                                    style={{
                                                                        color: colors.palette.dolphin,
                                                                        fontSize: fontSize.size12,
                                                                    }}
                                                                />
                                                            </View>
                                                        )}
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                props.onPressCaret(
                                                                    items.item.productAttributeValue,
                                                                    items.item.id,
                                                                    item.id
                                                                );
                                                                setShowModal(true)
                                                                setTitleModal(items.item.name);
                                                                props.setIdAttributeModal(items.item.id);
                                                            }}
                                                        >
                                                            <Svgs.icon_caretRightDown />
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <View>
                                                        {props.screen === "editAttributeByEdit" ?
                                                            (props.selectedItems.some(
                                                                (item: any) =>
                                                                    item.productAttributeId === items.item.id
                                                            ) ? (
                                                                <View>
                                                                    {props.selectedItems.map((dto: any) => {
                                                                        if (
                                                                            dto.productAttributeId ===
                                                                            items.item.id &&
                                                                            dto.isUsing === true
                                                                        ) {
                                                                            return (
                                                                                <Text text={dto.value} style={styles.textNero400} />
                                                                            );
                                                                        }
                                                                    })}
                                                                </View>
                                                            ) : null)
                                                            : (props.selectedItems.some(
                                                                (item: any) =>
                                                                    item.productAttributeId === items.item.id
                                                            ) ? (
                                                                <View>
                                                                    {props.selectedItems.map((dto: any) => {
                                                                        if (
                                                                            dto.productAttributeId === items.item.id
                                                                        ) {
                                                                            return (
                                                                                <TextInput
                                                                                    style={{
                                                                                        width: "60%",
                                                                                        paddingVertical:
                                                                                            Platform.OS === "ios"
                                                                                                ? scaleHeight(4)
                                                                                                : 0,
                                                                                    }}
                                                                                    placeholder={translate(
                                                                                        "productScreen.enterValue"
                                                                                    )}
                                                                                    placeholderTextColor={
                                                                                        colors.palette.dolphin
                                                                                    }
                                                                                    defaultValue={dto.value}
                                                                                    onChangeText={(text) => {
                                                                                        const newItem = {
                                                                                            productAttributeId: items.item.id,
                                                                                            value: text,
                                                                                            idGroup: item.id,
                                                                                        };
                                                                                        var indexArr =
                                                                                            props.selectedItems.findIndex(
                                                                                                (selectedItem: {
                                                                                                    productAttributeId: any;
                                                                                                }) =>
                                                                                                    selectedItem.productAttributeId ===
                                                                                                    items.item.id
                                                                                            );
                                                                                        if (indexArr === -1) {
                                                                                            let a =
                                                                                                props.selectedItems.concat(newItem);
                                                                                            props.setSelectedItems(a);
                                                                                        } else {
                                                                                            let b = props.selectedItems.slice();
                                                                                            b.splice(indexArr, 1, newItem);
                                                                                            props.setSelectedItems(b);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            );
                                                                        }
                                                                    })}
                                                                </View>
                                                            ) : (
                                                                <TextInput
                                                                    style={{
                                                                        width: "60%",
                                                                        paddingVertical:
                                                                            Platform.OS === "ios" ? scaleHeight(4) : 0,
                                                                    }}
                                                                    placeholder={translate(
                                                                        "productScreen.enterValue"
                                                                    )}
                                                                    placeholderTextColor={colors.palette.dolphin}
                                                                    onChangeText={(text) => {
                                                                        const newItem = {
                                                                            productAttributeId: items.item.id,
                                                                            value: text,
                                                                            idGroup: item.id,
                                                                        };
                                                                        var indexArr = props.selectedItems.findIndex(
                                                                            (item: any) =>
                                                                                item.productAttributeId === items.item.id
                                                                        );
                                                                        if (indexArr === -1) {
                                                                            let a = props.selectedItems.concat(newItem);
                                                                            props.setSelectedItems(a);
                                                                        } else {
                                                                            let b = props.selectedItems.slice();
                                                                            b.splice(indexArr, 1, newItem);
                                                                            props.setSelectedItems(b);
                                                                        }
                                                                    }}
                                                                />
                                                            ))}
                                                    </View>
                                                )}
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        );
                    })}
                    {props.screen === "addAttribute" ?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("newAttribute" as never);
                                attributeStore.setIdNewAttribute([]);
                            }}
                            style={{ flexDirection: "row", marginVertical: scaleHeight(10) }}
                        >
                            <Svgs.icon_add />
                            <Text tx="addAttribute.addAttribute" style={styles.textNavy600} />
                        </TouchableOpacity>
                        : null}
                    {props.screen === "editAttributeByEdit" ? null :
                        <View style={styles.viewLineSwitchUnit}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <Switch
                                        value={value}
                                        onToggle={() => {
                                            onChange(!value);
                                        }}
                                    />
                                )}
                                name="valueSwitch"
                            />
                            <Text
                                tx={"addAttribute.allowsCreatingAttribute"}
                                style={styles.textWeight400Dolphin}
                            />
                        </View>}
                </ScrollView>
                <Modal isVisible={showModal} style={{ margin: 0 }}>
                    <View style={styles.viewModal}>
                        <Text
                            text={titleModal}
                            style={[
                                styles.textButtonCancel,
                                {
                                    marginVertical: scaleHeight(18),
                                    marginLeft: scaleWidth(9),
                                    color: colors.palette.nero,
                                },
                            ]}
                        />
                        <FlatList
                            data={props.filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={styles.groupButtonModal}>
                            <Button
                                onPress={() => {
                                    props.onCancelModal()
                                    setShowModal(false)
                                }}
                                tx={"productScreen.cancel"}
                                style={[
                                    styles.viewButtonCancel,
                                    { width: "48%", marginRight: 0 },
                                ]}
                                textStyle={styles.textButtonCancel}
                            />
                            <Button
                                tx={"productScreen.BtnNotificationAccept"}
                                style={[styles.viewButtonConfirm, { width: "48%" }]}
                                textStyle={[
                                    styles.textButtonCancel,
                                    { color: colors.palette.neutral100 },
                                ]}
                                onPress={() => {
                                    props.onConfirmModal()
                                    setShowModal(false)
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    })
const styles = StyleSheet.create({
    viewItemFlatListModal: {
        width: scaleWidth(16),
        height: scaleHeight(16),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.veryLightGrey2,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: scaleWidth(6),
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
        width: "48%",
        borderRadius: 8,
        marginRight: "4%",
    },
    viewButtonConfirm: {
        height: scaleHeight(48),
        backgroundColor: colors.palette.navyBlue,
        width: "48%",
        borderRadius: 8,
    },
    viewModal: {
        height: Dimensions.get("screen").height * 0.4,
        backgroundColor: colors.palette.neutral100,
        borderRadius: 8,
        paddingVertical: scaleHeight(padding.padding_12),
        paddingHorizontal: scaleWidth(padding.padding_16),
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    viewItemAttribute: {
        flexDirection: "row",
        alignItems: "center",
        height: scaleHeight(34),
        borderBottomWidth: 1,
        borderBottomColor: colors.solitude2,
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
    textNero400: {
        fontWeight: "400",
        fontSize: fontSize.size10,
        color: colors.palette.nero,
        lineHeight: scaleHeight(12.1),
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
    viewLineSwitchUnit: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: scaleHeight(8),
        marginBottom: scaleHeight(15),
    },
    textWeight400Dolphin: {
        fontSize: fontSize.size13,
        fontWeight: "400",
        marginLeft: scaleWidth(8),

        color: "black",
    },
    textNero600: {
        fontWeight: "600",
        fontSize: fontSize.size12,
        color: colors.palette.nero,
        marginTop: scaleHeight(15),
    },
    viewIconDeleteLine: {
        height: scaleHeight(20),
        width: scaleWidth(20),
        justifyContent: "center",
        alignItems: "center",
    },
    textNavy600: {
        marginLeft: scaleWidth(6),
        fontWeight: "600",
        fontSize: fontSize.size12,
        color: colors.palette.navyBlue,
    },
    groupButtonModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: scaleHeight(margin.margin_10),
    },
});
