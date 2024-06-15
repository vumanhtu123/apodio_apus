import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Header, Screen, Text, TextField } from "../../../components";
import { Images } from "../../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    colors,
    fontSize,
    margin,
    padding,
    scaleHeight,
    scaleWidth,
} from "../../../theme";
import { styles } from "./styles";
import { InputSelect } from "../../../components/input-select/inputSelect";
// import AddProduct from "../components/itemListProduct";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AutoHeightImage from "react-native-auto-height-image";
import { Positions } from "react-native-calendars/src/expandableCalendar";
import { Controller, useForm } from "react-hook-form";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import {
    MediaType,
    launchCamera,
    launchImageLibrary,
} from "react-native-image-picker";
import Modal from "react-native-modal";
import { translate } from "../../../i18n";
import moment from "moment";
import CustomCalendar from "../../../components/calendar";
import { MakeResult } from "mobx/dist/internal";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../components/dialog-notification";
import ProductAttribute from "../../product/component/productAttribute";

export const NewInvoice: FC = observer(function NewInvoice(props) {
    const navigation = useNavigation();
    const paddingTop = useSafeAreaInsets().top;
    const heightScroll =
        Dimensions.get("window").height -
        scaleHeight(120) -
        scaleHeight(52) -
        paddingTop;
    const route = useRoute();
    const {
        control,
        formState: { errors },
    } = useForm();

    const [minDateS, setMinDateS] = useState("")
    const [minDateE, setMinDateE] = useState("")
    const [choiseCalendar, setChoiseCalendar] = useState(0)
    const [arrProduct, setArrProduct] = useState<{}[]>([]);
    const [isDeposit, setIsDeposit] = useState(false);
    const [modalImage, setModalImage] = useState(false);
    const [isSortByDate, setIsSortByDate] = useState(false);
    const [isReset, setIReset] = useState<boolean>(false);
    const [imagesNote, setImagesNote] = useState("");
    const [markedDatesS, setMarkedDatesS] = useState("");
    const [markedDatesE, setMarkedDatesE] = useState("");
    const [deposit, setDeposit] = useState<number>(0);
    const [payment, setPayment] = useState({ label: "" });;
    const toggleModalDate = () => {
        setIsSortByDate(!isSortByDate);
    };

    const handleIncrease = (id: any) => {
        let newArr = arrProduct!.map((item) => {
            if (item.id === id) {
                return { ...item, qty: item.qty + 1 };
            }
            return item;
        });
        setArrProduct(newArr);
    };

    const handleDecrease = (id: any) => {
        let newArr = arrProduct!
            .map((item) => {
                if (item.id === id) {
                    return { ...item, qty: item.qty - 1 };
                }
                return item;
            })
            .filter((item) => item.qty > 0);
        setArrProduct(newArr);
        console.log(arrProduct);
    };

    const deleteItemProduct = (id: any) => {
        const newArr = arrProduct.filter((item) => item.id !== id);
        setArrProduct(newArr);
    };
    useEffect(() => {
        console.log('first', moment(
            markedDatesS === "" ? new Date() : markedDatesS
        ).format("DD/MM/YYYY"))
    })
    const promotions = [
        {
            images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: "Gạch 1566CB503 60x60 - Hộp",
            amount: 1,
            cost: "28.000.000",
            id: 1,
        },
        {
            images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: "Gạch 1566CB503 60x60 - Hộp",
            amount: 1,
            cost: "28.000.000",
            id: 2,
        },
        {
            images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: "Gạch 1566CB503 60x60 - Hộp",
            amount: 1,
            cost: "28.000.000",
            id: 3,
        },
        {
            images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: "Gạch 1566CB503 60x60 - Hộp",
            amount: 1,
            cost: "28.000.000",
            id: 4,
        },
    ]
    const arrPayment = [
        {
            id: 1,
            label: "Payment on delivery",
        },
        {
            id: 2,
            label: "Pay immediately",
        },
        {
            id: 3,
            label: "Debt",
        },
    ];

    const arrProducts = [
        {
            images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: "Gạch 1566CB503 60x60 wrw asfsada ads",
            unit: "Hop",
            qty: 1,
            cost: "28.000.000",
            price: "28.000.000",
            id: 1,
        },
        {
            images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: "Gạch 1566CB503 60x60",
            unit: "Hop",
            qty: 2,
            cost: "28.000.000",
            price: "28.000.000",
            id: 2,
        },
        {
            images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
            name: "Gạch 1566CB503 60x60",
            unit: "Hop",
            qty: 2,
            cost: "28.000.000",
            price: "28.000.000",
            id: 3,
        },
    ];

    useEffect(() => {
        setArrProduct(arrProducts);
    }, []);

    return (
        <View style={{ backgroundColor: colors.palette.white, flex: 1 }}>
            <Header
                LeftIcon={Images.back}
                onLeftPress={() => navigation.goBack()}
                style={{ height: scaleHeight(52) }}
                headerTx={"order.confirm"}
                titleStyle={styles.textTitle}
            />
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        bounces={false}
                        style={[
                            styles.viewScrollVertical,
                            {
                                height:
                                    isDeposit === true
                                        ? heightScroll - scaleHeight(64)
                                        : heightScroll,
                            },
                        ]}>
                        <View style={{ marginTop: scaleHeight(20), marginBottom: scaleHeight(15) }}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextField
                                        // maxLength={maxLenngthPhoneNumber}
                                        keyboardType={null}
                                        labelTx={"order.invoiceCode"}
                                        style={{
                                            // marginBottom: scaleHeight(10),
                                            marginBottom: scaleHeight(5),
                                            justifyContent: 'center',
                                        }}
                                        inputStyle={{ fontSize: fontSize.size16, fontWeight: '500' }}
                                        value={value}
                                        onBlur={onBlur}
                                        RightIconClear={Images.icon_delete2}
                                        error={errors?.invoiceCode?.message}
                                        onClearText={() => onChange('')}
                                        onChangeText={value => onChange(value)}
                                        placeholderTx={"order.invoiceCode"}
                                    />
                                )}
                                // defaultValue={''}
                                name="invoiceCode"
                                rules={{
                                    required: translate('ruleController.emptyText'),
                                }}
                            />
                        </View>
                        <Text tx="ClientScreen.client" style={{ fontSize: fontSize.size12, color: '#747475' }} />
                        <Text text="Nguyễn Hoàng Minh" style={{ fontSize: fontSize.size16, fontWeight: '600' }} />
                        <View style={{ marginVertical: scaleHeight(15) }}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextField
                                        // maxLength={maxLenngthPhoneNumber}
                                        isImportant
                                        editable= {false}
                                        keyboardType={null}
                                        labelTx={"order.invoiceDate"}
                                        style={{
                                            // marginBottom: scaleHeight(10),
                                            marginBottom: scaleHeight(5),
                                            justifyContent: 'center',
                                        }}
                                        inputStyle={{ fontSize: fontSize.size16, fontWeight: '500' , color : '#000000' }}
                                        value={value}
                                        valueInput={moment(minDateS === "" ? new Date() : minDateS).format("DD/MM/YYYY")}
                                        pressRightIcon={() => {
                                            toggleModalDate(),
                                            setChoiseCalendar(1)
                                        }  
                                        }
                                        onBlur={onBlur}
                                        // RightIconClear={Images.icon_delete2}/
                                        RightIcon={Images.icon_CalenderBlank}
                                        error={errors?.invoiceCode?.message}
                                        onClearText={() => onChange('')}
                                        onChangeText={value => onChange(value)}
                                        placeholderTx={"order.placeholderDate"}
                                    />
                                )}
                                // defaultValue={''}
                                name="invoiceDate"
                                rules={{
                                    required: translate('ruleController.emptyText'),
                                }}
                            />
                        </View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextField
                                    // maxLength={maxLenngthPhoneNumber}
                                    editable={false}
                                    keyboardType={null}
                                    labelTx={"order.invoiceDateExpiration"}
                                    style={{
                                        // marginBottom: scaleHeight(10),
                                        marginBottom: scaleHeight(5),
                                        justifyContent: 'center',
                                    }}
                                    inputStyle={{ fontSize: fontSize.size16, fontWeight: '500', color: '#000000' }}
                                    valueInput={moment(minDateE === "" ? new Date() : minDateE).format("DD/MM/YYYY")}
                                    onBlur={onBlur}
                                    // RightIconClear={Images.icon_delete2}/
                                    RightIcon={Images.icon_CalenderBlank}
                                    pressRightIcon={() => {
                                        toggleModalDate(),
                                        setChoiseCalendar(2)
                                    }}
                                    error={errors?.invoiceCode?.message}
                                    onClearText={() => onChange('')}
                                    // onChangeText={onChange}
                                    placeholderTx={"order.placeholderDate"}
                                />
                            )}
                            // defaultValue={''}
                            name="invoiceCode"
                            rules={{
                                required: translate('ruleController.emptyText'),
                            }}
                        />
                        <View style={{ marginVertical: scaleHeight(15) }}>
                            <InputSelect
                                // required={true}
                                hintTx={"order.termsOfPayment"}
                                titleTx={"order.placeholderTermsOfPayment"}
                                arrData={arrPayment}
                                onPressChoice={(item) => {
                                    setPayment(item);
                                }}
                                dataDefault={payment.label}
                            />
                        </View>
                        <InputSelect
                            required={true}
                            hintTx={"order.accountingBook"}
                            titleTx={"order.placeholderAccountingBook"}
                            arrData={arrPayment}
                            onPressChoice={(item) => {
                                setPayment(item);
                            }}
                            dataDefault={payment.label}
                        />
                        <Text style={{ fontSize: fontSize.size12, fontWeight: '600', marginVertical: scaleHeight(15) }}>Thông tin hoá đơn</Text>
                        <View style={{ borderRadius: 8, backgroundColor: colors.palette.neutral100 }}>
                            {
                                promotions.map((item) => {
                                    return (
                                        <TouchableOpacity onPress={() => { }} style={styles.viewItemListProduct}>
                                            <AutoHeightImage width={48} height={48}
                                                style={styles.viewImageListProduct}
                                                source={{ uri: item.images }} />
                                            <View style={{ flex: 1 }}>
                                                <View style={{ width: (Dimensions.get('screen').width - 64) * 0.45 }}>
                                                    <Text text={item.name} style={styles.textListProduct} />
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text text="SL: " style={[styles.textContent, { fontSize: fontSize.size12 }]} />
                                                    <Text text={item.amount.toString()} style={styles.textListProduct} />
                                                </View>
                                            </View>
                                            <View>
                                                <Text text={item.cost} style={styles.textListProduct} />
                                                <Text text={item.cost} style={styles.priceOriginal} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(12), marginTop: scaleHeight(15) }}>
                            <Text tx="order.provisional" style={{ fontSize: fontSize.size12, fontWeight: '600', marginBottom: scaleHeight(12) }} />
                            <ProductAttribute
                                labelTx="order.totalPrice"
                                value='84.000.000'
                            />
                            <ProductAttribute
                                labelTx="tranSacTionHistory.fee"
                                value='84.000.000'
                            />
                            <ProductAttribute
                                labelTx="order.totalInvoice"
                                value='84.000.000'
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

            <View
                style={[
                    styles.viewButtonOrder,
                ]}>
                <Button
                    onPress={() => { }}
                    tx={"order.order"}
                    style={styles.buttonOrder}
                    textStyle={styles.textButtonOrder}
                />
            </View>

            <CustomCalendar
                isReset={isReset}
                minDate={minDateS}
                maxDate={minDateE}
                handleReset={() => setIReset(!isReset)}
                handleShort={() => {
                    toggleModalDate();
                    choiseCalendar == 1 ?  setMinDateS(markedDatesS) : setMinDateE(markedDatesS)
                }}
                onMarkedDatesChangeS={(markedDatesS: React.SetStateAction<string>) => {
                    setMarkedDatesS(markedDatesS);
                }}
                onMarkedDatesChangeE={(markedDatesE: React.SetStateAction<string>) => {
                    setMarkedDatesE(markedDatesE);
                }}
                isShowTabs={false}
                isSortByDate={isSortByDate}
                isOneDate={true}
                toggleModalDate={toggleModalDate}
            />
        </View>
    );
});
