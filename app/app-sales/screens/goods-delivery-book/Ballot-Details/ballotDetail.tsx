import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import { NavigatorParamList, navigate } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Header, Text } from "../../../../app-purchase/components";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import ReactNativeModal from "react-native-modal";



export const BallotDetail: FC<StackScreenProps<NavigatorParamList, "ballotDetail">> = observer(
    function ballotDetail(props) {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Svgs.back}
                    headerTx="detailPallot.ballotDetail"
                    style={{ height: scaleHeight(52) }}
                    onLeftPress={() => props.navigation.goBack()}
                    RightIconAndTextBelow={Svgs.ic_dowload}
                    // titleMiddleStyle={{backgroundColor:'blue'}}
                    widthRightIcon={scaleWidth(15)}
                    heightRightIcon={scaleHeight(15)}
                    textBelowIconRight={"Tải phiếu"}

                />
                <View
                    style={{ paddingHorizontal: 16, flex: 1, }}
                >
                    <View style={{ marginTop: scaleHeight(30), marginBottom: scaleHeight(15) }}>
                        <Text style={{ textAlign: 'center', fontFamily: "Inter-Bold", fontSize: scaleWidth(16) }} tx="detailPallot.DeliveryNote" />
                        <Text style={{ textAlign: 'center' }}>XH2</Text>
                    </View>

                    <View>
                        <Text>Người tạo: Nguyễn Thành An</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Ngày xuất: 12/03/2023</Text>
                            <Text>Giờ: 17:28</Text>
                        </View>
                    </View>
                    <Text>..............................................................................................</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleHeight(20) }}>
                        <Text style={{ fontFamily: "Inter-Bold", }} tx="detailPallot.name"></Text>
                        <Text style={{ fontFamily: "Inter-Bold", }} > SL</Text>
                    </View>
                    <Text style={{ fontFamily: "Inter-Bold", }}>Sản Phẩm (1)</Text>
                    <ScrollView style={{ height: scaleHeight(340) }}>
                        <Text style={{ fontSize: 12 }}>1. Gạch 12312414 60x60</Text>


                    </ScrollView>


                    <Text>..............................................................................................</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                        <Text tx="detailPallot.total">  </Text>
                        <Text style={{ fontFamily: "Inter-Bold" }} >1</Text>
                    </View>

                    <View style={{ flex: 1, marginBottom: 10, justifyContent: 'flex-end' }}>
                        <View style={[Styles.flexRow,]}>

                            <TouchableOpacity
                                style={[Styles.styleBtn, { borderColor: colors.palette.navyBlue }]}
                            >
                                <Svgs.ic_PaperPlaneTilt />
                                <Text tx="GoodsExportBook.submitBallot" style={{ marginLeft: 4, color: colors.palette.navyBlue, fontWeight: "600" }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[Styles.styleBtn, { borderColor: colors.palette.navyBlue, backgroundColor: colors.palette.navyBlue }]}
                            >
                                <Svgs.ic_In />
                                <Text tx="detailPallot.inPallot" style={{ marginLeft: 4, color: colors.palette.white, fontWeight: "600" }} />
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>
                <ReactNativeModal

                    animationIn={"bounceInUp"}
                    isVisible={false}
                >
                    <View
                        style={{ alignItems: 'center', backgroundColor: colors.white, borderRadius: scaleWidth(8), padding: 17 }}
                    >
                        <Text style={{ marginBottom: scaleWidth(15), fontSize: scaleWidth(18), fontFamily: "Inter-Bold" }} tx="detailPallot.printerIsNotConnected" />
                        <Text style={{ textAlign: 'center', fontSize: scaleWidth(14), marginBottom: 15 }} tx="validate.printerNotConnect"></Text>

                        <View style={[Styles.flexRow,]}>

                            <TouchableOpacity
                                style={[Styles.styleBtnModal, { borderColor: colors.palette.navyBlue, marginRight: 9 }]}
                            >

                                <Text tx="detailPallot.later" style={{ marginLeft: 4, color: colors.palette.navyBlue, fontWeight: "600" }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[Styles.styleBtnModal, { borderColor: colors.palette.navyBlue, backgroundColor: colors.palette.navyBlue }]}
                            >

                                <Text tx="detailPallot.settingPrinter" style={{ marginLeft: 4, color: colors.palette.white, fontWeight: "600" }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ReactNativeModal>
            </View>

        )

    }
)

const Styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    styleBtn: {

        borderWidth: 1,
        padding: scaleWidth(8),
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleWidth(165)
    },
    styleBtnModal: {

        borderWidth: 1,
        padding: scaleWidth(8),
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleWidth(143),

    },
})
