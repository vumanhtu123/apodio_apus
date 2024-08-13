import { memo, useEffect, useState } from "react";
import React, { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "../../../../components";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { ALERT_TYPE, Dialog } from "../../../../components/dialog-notification";
import { translate } from "../../../../i18n";
import { useNavigation } from "@react-navigation/native";
import { useStores } from "../../../models";
import moment from "moment";
import CustomCalendar from "../../../../components/calendar";
import { ShowNote } from "./note-new-order-component";

interface MorInformation {
    note: boolean
    price: any
    isDeposit: boolean
    desiredDate: boolean
    handleNamMethod: string
    handleDebt: () => void
    addDataNote: (note: string, image: []) => void
    onChangeDate: (date: string) => void
    valueNote: string
    imageNote: string[]
    valueDate: string
    onChangeIsDeposit: () => void
}

export const MoreInformation = memo((props: MorInformation) => {
    const navigation = useNavigation()
    const { orderStore } = useStores()
    const [isSortByDate, setIsSortByDate] = useState(false);
    const [isReset, setIReset] = useState<boolean>(false);

    const [note, setNote] = useState(props.note);
    const [desiredDate, setDesiredDate] = useState(props.desiredDate);
    const [isDeposit, setIsDeposit] = useState(props.isDeposit);

    const [markedDatesS, setMarkedDatesS] = useState("");
    const [desiredDay, setDesiredDay] = useState(moment().format("YYYY-MM-DD"))

    const toggleModalDate = () => {
        setIsSortByDate(!isSortByDate);
    };
    useEffect(()=>{
        setIsDeposit(props.isDeposit)
    }, [props.isDeposit])

    useEffect(() => {
        if (props.valueDate !== "") {
            setDesiredDay(props.valueDate)
        }
    }, [props.valueDate])

    return (
        <View>
            <ShowNote
                dataNote={props.valueNote}
                imageNote={props.imageNote}
                note={note}
                setNoteData={function (note: string, arr: []): void { props.addDataNote(note, arr) }}
            />
            {desiredDate === true ? (
                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: margin.margin_15,
                        alignItems: "center",
                    }}>
                    <TouchableOpacity onPress={() => setDesiredDate(false)}>
                        <Svgs.icon_deleteDolphin />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsSortByDate(true)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: scaleWidth(margin.margin_8),
                        }}>
                        <Svgs.icon_calendar />
                        <Text
                            style={[
                                styles.textDate,
                                { marginHorizontal: scaleWidth(margin.margin_4) },
                            ]}>
                            {translate("order.desiredDate") +
                                ": " +
                                moment(
                                    desiredDay === "" ? new Date() : desiredDay
                                ).format("MMMM DD, YYYY")}
                        </Text>
                        <Svgs.icon_caretDownBlue />
                    </TouchableOpacity>
                </View>
            ) : null}
            <Text
                tx={"order.moreInformation"}
                style={[
                    styles.textTotal,
                    {
                        color: colors.palette.neutral900,
                        marginVertical: scaleHeight(15),
                    },
                ]}
            />
            <View style={styles.viewMoreInformation}>
                <Svgs.icon_gear
                    style={{ marginRight: scaleWidth(margin.margin_4) }}
                />
                {note === false || isDeposit === false || desiredDate === false ? (
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {note === false ? (
                            <Button
                                tx={"order.note"}
                                onPress={() => setNote(true)}
                                style={styles.buttonFeature}
                                textStyle={[
                                    styles.textVoucher,
                                    { color: colors.palette.navyBlue },
                                ]}
                            />
                        ) : null}
                        {isDeposit === false ? (
                            <Button
                                tx={"order.deposit"}
                                onPress={() => {
                                    if (props.handleNamMethod == "") {
                                        return Dialog.show({
                                            type: ALERT_TYPE.INFO,
                                            title: translate("productScreen.Notification"),
                                            textBody: "productScreen.youNeedSelectPaymentMethods",
                                            button2: translate(
                                                "productScreen.BtnNotificationAccept"
                                            ),
                                            closeOnOverlayTap: false,
                                            onPressButton: () => {
                                                Dialog.hide();
                                            },
                                        });
                                    }
                                    props.handleDebt();
                                    navigation.navigate({
                                        name: "paymentBuy", params: {
                                            params: {
                                                type:
                                                    props.handleNamMethod == "DEDUCTION_OF_LIABILITIES"
                                                        ? false
                                                        : true,
                                                price: props.price,
                                                warning: false,
                                                debtAmount:
                                                    props.handleNamMethod == "DEDUCTION_OF_LIABILITIES"
                                                        ? Number(Math.max(0, (Number(
                                                            orderStore.dataDebtLimit.debtAmount
                                                        ) -
                                                            Number(
                                                                orderStore.dataDebtLimit.amountOwed ?? 0
                                                            ))))
                                                        : 0,
                                            },
                                        }
                                    } as never);
                                    props.onChangeIsDeposit
                                    // setIsDeposit(true)
                                }}
                                style={styles.buttonFeature}
                                textStyle={[
                                    styles.textVoucher,
                                    { color: colors.palette.navyBlue },
                                ]}
                            />
                        ) : null}
                        {desiredDate === false ? (
                            <Button
                                tx={"order.desiredDate"}
                                onPress={() => setDesiredDate(true)}
                                style={styles.buttonFeature}
                                textStyle={[
                                    styles.textVoucher,
                                    { color: colors.palette.navyBlue },
                                ]}
                            />
                        ) : null}
                    </ScrollView>
                ) : (
                    <Text tx={"order.noMoreInformation"} style={styles.textVoucher} />
                )}
            </View>
            <CustomCalendar
                isReset={isReset}
                handleReset={() => setIReset(!isReset)}
                handleShort={() => {
                    // handleOrderMerchant()
                    setDesiredDay(markedDatesS)
                    props.onChangeDate(markedDatesS)
                    toggleModalDate();
                }}
                onMarkedDatesChangeS={(markedDatesS: any) => {
                    setMarkedDatesS(markedDatesS);
                }}

                onMarkedDatesChangeE={(markedDatesE: any) => {
                    console.log(markedDatesE)
                }}
                isShowTabs={false}
                dateS={desiredDay}

                isSortByDate={isSortByDate}
                isOneDate={true}
                toggleModalDate={() => {
                    toggleModalDate()
                }}
                minDate={new Date()}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    viewMoreInformation: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(40),
    },
    buttonFeature: {
        marginHorizontal: scaleWidth(margin.margin_4),
        paddingHorizontal: scaleWidth(padding.padding_8),
        paddingVertical: scaleHeight(padding.padding_6),
        borderRadius: 4,
        backgroundColor: colors.palette.neutral100,
        borderWidth: 1,
        borderColor: colors.palette.navyBlue,
    },
    textTotal: {
        fontWeight: "600",
        fontSize: fontSize.size12,
        color: colors.palette.nero,
    },
    textVoucher: {
        fontWeight: "400",
        fontSize: fontSize.size10,
        lineHeight: scaleHeight(12),
        color: colors.palette.dolphin,
    },
    textDate: {
        fontWeight: "400",
        fontSize: fontSize.size12,
        lineHeight: scaleHeight(24),
        color: colors.palette.navyBlue,
    },
})