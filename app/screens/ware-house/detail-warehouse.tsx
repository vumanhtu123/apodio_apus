import { StackScreenProps } from "@react-navigation/stack";
import { FC, useEffect, useState } from "react";
import { NavigatorParamList } from "../../navigators";
import { observer } from "mobx-react-lite";
import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Images } from "../../../assets";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../theme";
import { Header, Text } from "../../components";
import { Styles } from "./style";
import { values } from "mobx";
import ViewInfo from "../dashboard/component/view-info";
import { useStores } from "../../models";
import data from "../../components/svg-icon/data";
import DataDetailWarehouse from "../../models/warehouse-store/detail-warehouse-model"


export const DetailWarehouseScreen: FC<StackScreenProps<NavigatorParamList, 'detailWarehouse'>> = observer(
    function DetailWarehouse(props) {

        const [myData, setMyData] = useState(DataDetailWarehouse);
        const [box1, setBox1] = useState(true)
        const [box2, setBox2] = useState(true)

        const getAPI = useStores()


        const { id } = props.route.params
        // console.log('====================================');
        // console.log('data id', id);
        // console.log('====================================');
        const idNumber = Number(id)

        const getDataDetail = () => {
            getAPI.warehouseStore.getDetailWarehouse(idNumber).then((data) => {
                // console.log('data cua toi ', data?.data?.conditionStorage?.standardTemperature);
                const dataDetailWarehouse = data?.data

                setMyData(dataDetailWarehouse)
            })
        }


        useEffect(() => {
            getDataDetail()
        }, [props.navigation])

        return (
            <View
                style={{ flex: 1 }}
            >
                <Header
                    LeftIcon={Images.back}
                    style={{ height: scaleHeight(52) }}
                    leftText="wareHouse.detailWarehouse"
                    RightIcon1={Images.ic_pen_white}
                    RightIcon2={Images.ic_bin_white}
                    RightIcon={Images.icon_copy}
                    onLeftPress={() => props.navigation.goBack()}

                    onRightPress={() => props.navigation.navigate("warehouse", {
                        name: myData?.name,
                        code: myData?.code,
                        companyId: myData?.companyId,
                        branchId: myData?.branchId,
                        sourceProductType: myData?.sourceProductType,
                        address: myData?.address,
                        areaCode: myData?.areaCode,
                        hasAdditionalInfo: myData?.hasAdditionalInfo,
                        additionalInfo: {
                            latitude: myData?.additionalInfo?.latitude,
                            longitude: myData?.additionalInfo?.longitude,
                            height: myData?.additionalInfo?.height,
                            heightUom: {
                                id: 0,
                                name: "string",
                            },
                            length: myData?.additionalInfo?.length,
                            lengthUom: {
                                id: 0,
                                name: "string",
                            },
                            width: myData?.additionalInfo?.width,
                            widthUom: {
                                id: 0,
                                name: "string",
                            },
                            weightCapacity: myData?.additionalInfo?.weightCapacity,
                            weightCapacityUom: {
                                id: 0,
                                name: "string",
                            },
                            scene: myData?.additionalInfo?.scene,
                        },
                        hasConditionStorage: myData?.hasConditionStorage,
                        conditionStorage: {
                            standardTemperature: myData?.conditionStorage.standardTemperature,
                            minTemperature: myData?.conditionStorage.minTemperature,
                            standardHumidity: myData?.conditionStorage.standardHumidity,
                        },
                        action: "CREATE",
                        note: "string",
                        isMobile: true,
                        status: "UPDATE",
                        id: idNumber,
                    })}

                />
                <ScrollView style={{ flex: 1 }}>
                    <View style={Styles.box}>
                        <Text tx="wareHouse.generalInformation" style={{ marginBottom: scaleWidth(25) }} />

                        <View style={Styles.flexRow}>
                            <Text tx="wareHouse.codeWarehouse" style={Styles.label} />
                            <Text style={Styles.value}>{myData.code}</Text>
                        </View>
                        <View style={[Styles.flexRow, { marginVertical: scaleHeight(12) }]}>
                            <Text tx="wareHouse.nameWarehouse" style={Styles.label} />
                            <Text style={Styles.value}>{myData.name}</Text>
                        </View>
                        <View style={[Styles.flexRow]}>
                            <Text tx="wareHouse.address" style={[Styles.label, { flex: 1 }]} />
                            <Text style={[{ flex: 1, textAlign: 'right', fontSize: fontSize.size12 }]}>{myData?.address}</Text>
                        </View>
                        <View style={[Styles.flexRow, { marginTop: scaleHeight(12) }]} >
                            <Text tx="wareHouse.status" style={Styles.label} />
                            <Text style={[{ fontSize: fontSize.size12, color: colors.palette.navyBlue }]}> {myData?.state} </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[Styles.box2,]}
                        onPress={() => setBox1(!box1)}
                    >
                        <Text
                            style={{ fontSize: fontSize.size12, color: colors.palette.navyBlue, marginRight: scaleWidth(6) }}
                            tx="wareHouse.storageConditions"
                        />
                        <Images.icon_caretUp style={{ transform: [{ rotate: box1 ? '180deg' : '0deg' }] }} />
                    </TouchableOpacity>
                    {
                        box1 ?
                            <View
                                style={{
                                    paddingHorizontal: scaleHeight(16), backgroundColor: '#FFF'
                                }}
                            >


                                <View
                                >
                                    <Text tx="wareHouse.standardStorageTemperature" style={Styles.value} />
                                    <Text
                                        style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                    >
                                        {myData.conditionStorage?.standardTemperature}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginVertical: scaleHeight(20)
                                    }}
                                >
                                    <Text tx="wareHouse.minimumStorageTemperature" style={Styles.value} />
                                    <Text
                                        style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                    >
                                        {myData.conditionStorage?.minTemperature}
                                    </Text>
                                </View>
                                <View
                                >
                                    <Text tx="wareHouse.standardHumidity" style={Styles.value} />
                                    <Text
                                        style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                    >
                                        {myData.conditionStorage?.standardHumidity}
                                    </Text>
                                </View>
                            </View> : <></>
                    }



                    <TouchableOpacity
                        style={[Styles.box2]}
                        onPress={() => setBox2(!box2)}
                    >
                        <Text
                            style={{ fontSize: fontSize.size12, color: colors.palette.navyBlue, marginRight: scaleWidth(6) }}
                            tx="wareHouse.additionalInformation"
                        />
                        <Images.icon_caretUp style={{ transform: [{ rotate: box2 ? '180deg' : '0deg' }] }} />
                    </TouchableOpacity>
                    {
                        box2 ? <View
                            style={{
                                paddingHorizontal: scaleHeight(16),
                                backgroundColor: '#FFF'

                            }}
                        >
                            <View
                            >
                                <Text tx="wareHouse.longitude" style={Styles.value} />
                                <Text
                                    style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                >
                                    {myData.additionalInfo?.longitude}
                                </Text>
                            </View>

                            <View
                                style={{ marginVertical: scaleHeight(20) }}
                            >
                                <Text tx="wareHouse.Latitude" style={Styles.value} />
                                <Text
                                    style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                >
                                    {myData.additionalInfo?.latitude}
                                </Text>
                            </View>
                            <View
                            >
                                <Text tx="wareHouse.length" style={Styles.value} />
                                <Text
                                    style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                >
                                    {myData.additionalInfo?.length}
                                </Text>
                            </View>
                            <View
                                style={{ marginVertical: scaleHeight(20) }}
                            >
                                <Text tx="wareHouse.width" style={Styles.value} />
                                <Text
                                    style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                >
                                    {myData.additionalInfo?.width}
                                </Text>
                            </View>
                            <View
                            >
                                <Text tx="wareHouse.height" style={Styles.value} />
                                <Text
                                    style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                >
                                    {myData.additionalInfo?.height}
                                </Text>
                            </View>
                            <View
                                style={{ marginVertical: scaleHeight(20) }}
                            >
                                <Text tx="wareHouse.backgroundLoad" style={Styles.value} />
                                <Text
                                    style={[Styles.label, { marginTop: scaleHeight(12) }]}
                                >
                                    {myData.additionalInfo?.longitude}
                                </Text>
                            </View>

                        </View>
                            :
                            <></>
                    }

                </ScrollView >



            </View >
        )
    }
)