import { Observer, observer } from "mobx-react-lite";
import { FC } from "react";
import React, { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Header, Text } from "../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { useNavigation } from "@react-navigation/native";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "./styles";
import Modal from "react-native-modal"
import { useStores } from "../../../models";
import { InputSelect } from "../../../components/input-select/inputSelect";

export const OrderTracking: FC = observer(
    function OrderTracking(props) {
        const { orderStore } = useStores()
        const navigation = useNavigation()
        const data: any = [
            {
                date: "29/05",
                time: "11:07",
                status: "Đang vận chuyển",
                information: 'Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại'
            },
            {
                date: "29/05",
                time: "1:06",
                status: null,
                information: 'Đơn hàng đã đến trạm giao hàng 20-HNI Tu Liem Hub'
            },
            {
                date: "25/03",
                time: "18:44",
                status: null,
                information: 'Đơn hàng đã rời kho phân loại'
            },
            {
                date: "25/03",
                time: "17:18",
                status: null,
                information: 'Đơn hàng đã đến kho phân loại BN B Mega SOC'
            },
            {
                date: "25/03",
                time: "15:40",
                status: null,
                information: 'Đơn hàng đã rời bưu cục',
            },
            {
                date: "25/03",
                time: "14:48",
                status: null,
                information: 'Đã lấy hàng',
            },
            {
                date: "25/03",
                time: "14:44",
                status: null,
                information: 'Đơn vị vận chuyển lấy hàng thành công',
            },
            {
                date: "25/03",
                time: "10:32",
                status: "Chờ lấy hàng",
                information: 'Ngừơi gửi đang chuẩn bị hàng',
            },
            {
                date: "25/03",
                time: "09:59",
                status: 'Đặt hàng',
                information: 'Đơn hàng đã được đặt',
            },
        ]
        const dataInputSelect = [
            { id: '1', label: 'item 1' },
            { id: '2', label: 'item 2' },
            { id: '3', label: 'item 3' },
            { id: '4', label: 'item 4' },
            { id: '5', label: 'item 5' },
            { id: '6', label: 'item 6' },
        ]

        const renderItem = ({ item, index }: any) => {
            return (
                <View key={index} style={styles.viewItemRender}>
                    <View style={{
                        width: '21%', alignItems: 'flex-end', paddingBottom: scaleHeight(15),
                    }}>
                        <Text text={item.date} style={index === 0 ? styles.textInformation : styles.textDate} />
                        <Text text={item.time} style={index === 0 ? styles.textInformation : styles.textDate} />
                    </View>
                    <View style={{ width: '12%', justifyContent: 'center', alignItems: 'center' }}>
                        {index === 0 ? <View style={{ width: scaleWidth(1), height: '20%' }} /> : <View style={{ width: scaleWidth(1), backgroundColor: colors.quartz1, height: '10%' }} />}
                        {item.status === null ? (index === 0 ? <Svgs.icon_ellipse_tracking_blue /> : <Svgs.icon_ellipse_tracking />) :
                            item.status === "Đặt hàng" ? (index === 0 ? <Svgs.icon_order_success_blue /> : <Svgs.icon_order_success />) :
                                item.status === "Chờ lấy hàng" ? (index === 0 ? <Svgs.icon_pickup_blue /> : <Svgs.icon_pickup />) :
                                    (index === 0 ? <Svgs.icon_deliveryBlue /> : <Svgs.icon_delivery />)
                        }
                        {index === data.length - 1 ? <View style={{ width: scaleWidth(1), height: '75%' }} /> : <View style={{ width: scaleWidth(1), backgroundColor: colors.quartz1, height: '75%' }} />}
                    </View>
                    <View style={{
                        width: '67%', paddingBottom: scaleHeight(15),
                    }}>
                        {item.status !== null ? <Text text={item.status} style={index === 0 ? styles.textStatusBlue : styles.textStatus} /> : null}
                        <Text text={item.information} style={index === 0 ? styles.textInformationBlue : styles.textInformation} />
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.ROOT}>
                <Header
                    headerTx={'order.orderTracking'}
                    style={{ height: scaleHeight(52) }}
                    LeftIcon={Svgs.back}
                    onLeftPress={() => navigation.goBack()}
                />
                <View style={styles.viewTitle}>
                    <Text tx={'order.time'} style={[styles.textTitle, { width: '21%', marginRight: '12%', textAlign: 'right' }]} />
                    <Text tx={'order.shipping_status'} style={[styles.textTitle, { width: '67%' }]} />
                </View>
                <FlatList
                    data={data}
                    // keyExtractor={index=>index.toString}
                    renderItem={renderItem}
                />
                <Button
                    tx={"order.update_status"}
                    style={styles.viewButton}
                    textStyle={styles.textButton}
                    onPress={() => orderStore.openModalTracking()}
                />
                <Modal isVisible={orderStore.isModalTracking} style={{ justifyContent: 'flex-end' }} >
                    <View style={styles.viewModal}>
                        <View style={styles.viewTitleModal}>
                            <Text tx={'order.update_shipping_status'} style={styles.textTitleModal} />
                            <TouchableOpacity style={styles.viewIconDelete} onPress={() => orderStore.closeModalTracking()}>
                                <Svgs.ic_close />
                            </TouchableOpacity>
                        </View>
                        <InputSelect
                            arrData={dataInputSelect}
                            required={true}
                            titleTx={'order.father_status'}
                            hintTx={"order.select_father_status"}
                            dataDefault={orderStore.fatherStatus.label}
                            onPressChoice={(item) => orderStore.setFatherStatus(item)}
                            styleView={{ marginHorizontal: scaleWidth(16), marginBottom: scaleHeight(15) }}
                        />
                        <InputSelect
                            arrData={dataInputSelect}
                            titleTx={'order.child_status'}
                            hintTx={'order.select_child_status'}
                            dataDefault={orderStore.childStatus.label}
                            onPressChoice={(item) => orderStore.setChildStatus(item)}
                            styleView={{ marginHorizontal: scaleWidth(16), marginBottom: scaleHeight(15) }}
                        />
                        <View style={styles.viewGroupBtn}>
                            <TouchableOpacity
                                onPress={() =>{ orderStore.closeModalTracking()
                                    orderStore.setFatherStatus({id: '', label: ''})
                                    orderStore.setChildStatus({id: '', label: ''})
                                }}
                                style={styles.viewBtnCancel}>
                                <Text tx={"order.back"} style={styles.textBtnCancel} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {orderStore.closeModalTracking()
                                    orderStore.setFatherStatus({id: '', label: ''})
                                    orderStore.setChildStatus({id: '', label: ''})
                                }}
                                style={styles.viewBtnConfirm}>
                                <Text tx={"common.confirm"} style={styles.textBtnConfirm} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    })
