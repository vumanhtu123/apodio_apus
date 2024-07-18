import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import { NavigatorParamList } from "../../navigators";
import { observer } from "mobx-react-lite";
import { ScrollView, View } from "react-native";
import React from "react";
import { Images } from "../../../assets";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../theme";
import { Header, Text } from "../../components";
import { Styles } from "./style";
import { values } from "mobx";
import ViewInfo from "../dashboard/component/view-info";



export const DetailWarehouseScreen: FC<StackScreenProps<NavigatorParamList, 'detailWarehouse'>> = observer(
    function DetailWarehouse(props) {
        return (
            <View
                style={{ flex: 1 }}
            >
                <Header
                    LeftIcon={Images.back}
                    style={{ height: scaleHeight(52) }}
                    leftText="wareHouse.wareHouse"
                    RightIcon1={Images.ic_QR}
                    RightIcon2={Images.icon_search}
                    RightIcon={Images.icon_funnel}
                    onLeftPress={() => props.navigation.goBack()}
                />
                <ScrollView style={{ flex: 1 }}>
                    <View style={Styles.box}>
                        <Text tx="wareHouse.generalInformation" style={{ marginBottom: scaleWidth(25) }} />

                        <View style={Styles.flexRow}>
                            <Text tx="wareHouse.codeWarehouse" style={Styles.label} />
                            <Text style={Styles.value}>KTP1</Text>
                        </View>
                        <View style={[Styles.flexRow, { marginVertical: scaleHeight(12) }]}>
                            <Text tx="wareHouse.nameWarehouse" style={Styles.label} />
                            <Text style={Styles.value}>Kho thành phần 1</Text>
                        </View>
                        <View style={[Styles.flexRow]}>
                            <Text tx="wareHouse.address" style={[Styles.label, { flex: 1 }]} />
                            <Text style={[{ flex: 1, textAlign: 'right', fontSize: fontSize.size12 }]}>Số 388 Nguyễn Trãi, Phường Võ Cường, Thành phố Bắc Ninh</Text>
                        </View>
                        <View style={[Styles.flexRow, { marginTop: scaleHeight(12) }]} >
                            <Text tx="wareHouse.status" style={Styles.label} />
                            <Text style={[{ fontSize: fontSize.size12, color: colors.palette.navyBlue }]}> Đang hoạt động </Text>
                        </View>
                    </View>

                    <View
                        style={Styles.box2}
                    >
                        <View
                            style={{ flexDirection: 'row', marginBottom: scaleHeight(20) }}
                        >
                            <Text
                                style={{ fontSize: fontSize.size12, color: colors.palette.navyBlue, marginRight: scaleWidth(6) }}
                            >
                                Điều kiện bảo quản
                            </Text>
                            <Images.icon_caretUp />
                        </View>

                        <View
                        >
                            <Text tx="wareHouse.standardStorageTemperature" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
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
                                30
                            </Text>
                        </View>
                        <View
                        >
                            <Text tx="wareHouse.standardHumidity" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[Styles.box2, { marginTop: scaleHeight(12) }]}
                    >
                        <View
                            style={{ flexDirection: 'row', marginBottom: scaleHeight(20) }}
                        >
                            <Text
                                style={{ fontSize: fontSize.size12, color: colors.palette.navyBlue, marginRight: scaleWidth(6) }}
                            >
                                Thông tin bổ sung
                            </Text>
                            <Images.icon_caretUp />
                        </View>

                        <View
                        >
                            <Text tx="wareHouse.longitude" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
                            </Text>
                        </View>

                        <View
                            style={{ marginVertical: scaleHeight(20) }}
                        >
                            <Text tx="wareHouse.Latitude" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
                            </Text>
                        </View>
                        <View
                        >
                            <Text tx="wareHouse.Latitude" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
                            </Text>
                        </View>
                        <View
                            style={{ marginVertical: scaleHeight(20) }}
                        >
                            <Text tx="wareHouse.Latitude" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
                            </Text>
                        </View>
                        <View
                        >
                            <Text tx="wareHouse.Latitude" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
                            </Text>
                        </View>
                        <View
                            style={{ marginVertical: scaleHeight(20) }}
                        >
                            <Text tx="wareHouse.Latitude" style={Styles.value} />
                            <Text
                                style={[Styles.label, { marginTop: scaleHeight(12) }]}
                            >
                                30
                            </Text>
                        </View>

                    </View>
                </ScrollView>



            </View>
        )
    }
)