import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import { Images } from "../../../../assets";
import { Button, Header, Text, TextField } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";
import {
    colors,
    fontSize,
    scaleHeight,
    scaleWidth
} from "../../../theme";
import { styles } from "./styles";
// import AddProduct from "../components/itemListProduct";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomCalendar from "../../../components/calendar";
import { ALERT_TYPE, Dialog, Toast } from "../../../components/dialog-notification";
import { translate } from "../../../i18n";
import { useStores } from "../../../models";
import { calculateTotalPrice, calculateTotalUnitPrice, formatCurrency } from "../../../utils/validate";
import ProductAttribute from "../../product/component/productAttribute";

export const NewInvoice: FC = observer(function NewInvoice(props) {
    const navigation = useNavigation();
    const paddingTop = useSafeAreaInsets().top;
    const heightScroll =
        Dimensions.get("window").height -
        scaleHeight(120) -
        scaleHeight(52) -
        paddingTop;
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [minDateS, setMinDateS] = useState("")
    const [minDateE, setMinDateE] = useState("")
    const [choiseCalendar, setChoiseCalendar] = useState(0)
    const [isDeposit, setIsDeposit] = useState(false);
    const [isSortByDate, setIsSortByDate] = useState(false);
    const [isSortByDateEnd, setIsSortByDateEnd] = useState(false);
    const [isReset, setIReset] = useState<boolean>(false);
    const [markedDatesS, setMarkedDatesS] = useState("");
    const [markedDatesE, setMarkedDatesE] = useState("");
    const [payment, setPayment] = useState({ label: "" })
    const [invoiceTypeLabel, setInvoiceTypeLabel] = useState({ label: "" })
    const [invoiceType, setInvoiceType] = useState('')
    const [data, setData] = useState<any>([])
    const [dataPayment, setDataPayment] = useState<any>([])
    const { orderStore } = useStores();
    const { orderId } = orderStore;
    const [invoiceCode, setInvoiceCode] = useState('')
    const toggleModalDate = () => {
        setIsSortByDate(!isSortByDate);
    };
    const toggleModalDateEnd = () => {
        setIsSortByDateEnd(!isSortByDateEnd);
    };
    useEffect(() => {
        console.log('first', moment(
            markedDatesS === "" ? new Date() : markedDatesS
        ).format("DD/MM/YYYY"))
    })
    const handleGetDetailOrder = async () => {
        try {
            const response = await orderStore.getDetailOrder(orderId);
            console.log("productId", orderId);
            if (response && response.kind === "ok") {
                const data = response.response.data;
                console.log('dataDetail', JSON.stringify(data))
                setData(data);
            } else {
                console.error("Failed to fetch detail:", response);
            }
        } catch (error) {
            console.error("Error fetching detail:", error);
        }
    };
    const handleGetPayment = async () => {
        try {
            const response = await orderStore.getPayment(0, 50);
            // console.log("productId", orderId);
            if (response && response.kind === "ok") {
                const data = response.response.data;
                console.log('dataPayment', JSON.stringify(data))
                setDataPayment(data.content);
            } else {
                console.error("Failed to fetch detail:", response);
            }
        } catch (error) {
            console.error("Error fetching detail:", error);
        }
    };
    const submitAdd = async () => {
        const dataSubmit = ({
            code: invoiceCode,
            paymentStatus: "NOT_PAYMENT",
            state: "POSTED",
            scopeType: data.scopeType,
            paymentTerm: null,
            partner: { id: data.partner?.id },
            incomeExpense: null,
            date: minDateS, // ngày tạo
            dueDate: minDateE, // ngày hết hạn
            accountingDate: minDateS,
            accountJournal: null,
            purchaseOrderId: null, // Set to null if not applicable
            returnPurchaseOrderId: null, // Set to null if not applicable
            saleOrderId: data.id,
            returnSaleOrderId: null, // Set to null if not applicable
            amountUntaxed: 0,
            amountTotal: 0,
            policyId: null, // Consider setting to null if there's no policy
            currency: null,
            isPolicyException: null,
            isAnotherBook: null,
            isCreateAnotherBook: null,
            invoiceLines: data.saleOrderLines?.map((saleOrderLine: any, index: any,) => ({
                sequence: saleOrderLine?.sequence,
                product: {
                    id: saleOrderLine.productInfo?.id,
                    name: saleOrderLine.productInfo?.name,
                    sku: saleOrderLine.productInfo?.sku,
                    upc: saleOrderLine.productInfo?.upc,
                    productImage: saleOrderLine.productInfo?.productImage || [],
                    uomId: saleOrderLine.productInfo?.uomId,
                    uomCode: saleOrderLine.productInfo?.uomCode,
                    uomName: saleOrderLine.productInfo?.uomName,
                    brandName: saleOrderLine.productInfo?.brand?.name || null,
                    checkingType: null,
                    productTemplate: saleOrderLine.productInfo,
                    quantity: saleOrderLine.productInfo?.quantityInventory,
                    uomGroup: {
                        id: saleOrderLine.productInfo?.uomGroup?.id,
                        code: saleOrderLine.productInfo?.uomGroup?.code,
                        name: saleOrderLine.productInfo?.uomGroup?.name,
                        uomOriginId: saleOrderLine.productInfo?.uomGroup?.uomOriginId,
                        uomOriginName: saleOrderLine.productInfo?.uomGroup?.uomOriginName,
                        uomGroupLineItems: saleOrderLine.productInfo?.uomGroup?.uomGroupLineItems?.map((item: any) => ({
                            uomId: item.uomId,
                            uomName: item.uomName,
                            conversionRate: item.conversionRate,
                            accuracy: item.accuracy,
                            uomLineType: item.uomLineType
                        }))
                    },
                    saleUom: {
                        id: saleOrderLine.productInfo?.saleUom?.id,
                        name: saleOrderLine.productInfo?.saleUom?.name
                    },
                    purchaseUom: {
                        id: saleOrderLine.productInfo?.purchaseUom?.id,
                        name: saleOrderLine.productInfo?.purchaseUom?.name
                    },
                    brand: {
                        id: saleOrderLine.productInfo?.brand?.id,
                        name: saleOrderLine.productInfo?.brand?.name
                    },
                    baseProductPackingLine: saleOrderLine.productInfo?.baseProductPackingLine
                        ? {
                            id: saleOrderLine.productInfo?.baseProductPackingLine?.id,
                            uomId: saleOrderLine.productInfo?.baseProductPackingLine?.uomId,
                            uomName: saleOrderLine.productInfo?.baseProductPackingLine?.uomName || "",
                            uomGroupLineId: saleOrderLine?.productInfo?.baseProductPackingLine?.uomGroupLineId,
                            productId: saleOrderLine.productInfo?.baseProductPackingLine?.productId,
                            amount: saleOrderLine.productInfo?.baseProductPackingLine?.amount,
                            uomLineType: saleOrderLine.productInfo?.baseProductPackingLine?.uomLineType,
                            length: saleOrderLine.productInfo?.baseProductPackingLine?.length,
                            high: saleOrderLine.productInfo?.baseProductPackingLine?.high,
                            wide: saleOrderLine.productInfo?.baseProductPackingLine?.wide,
                            weight: saleOrderLine.productInfo?.baseProductPackingLine?.weight,
                            volume: saleOrderLine.productInfo?.baseProductPackingLine?.volume
                        }
                        : null,
                    productPackingLines: saleOrderLine.productInfo?.productPackingLines?.length > 0 // Check if productPackingLines exist and have data
                        ? saleOrderLine.productInfo?.productPackingLines?.map((packingLine: any) => ({
                            id: packingLine.id,
                            uomId: packingLine.uomId,
                            uomName: packingLine.uomName,
                            uomGroupLineId: packingLine.uomGroupLineId,
                            productId: packingLine.productId,
                            amount: packingLine.amount,
                            uomLineType: packingLine.uomLineType,
                            length: packingLine.length,
                            high: packingLine.high,
                            wide: packingLine.wide,
                            weight: packingLine.weight,
                            volume: packingLine.volume,
                        })) : null,
                },
                quantity: saleOrderLine.quantity || null,
                uom: {
                    id: saleOrderLine.uomId,
                },
                unitPrice: saleOrderLine.unitPrice,
                amountUntaxed: saleOrderLine.amountUntaxed,
                amountTotal: saleOrderLine.amountTotal,
                discount: saleOrderLine.discount || 0,
                displayType: "PRODUCT",
                note: saleOrderLine.note || "",
                taxes:
                    saleOrderLine.taxes,
                taxNames: [],
                accountMoveId: 0,
                // taxInfo: [],
                importTax: 0,
                specialConsumptionTax: 0,
                environmentalResourceTax: 0,
                vat: 0,
                warehouseType: null,
                warehouse: null,
            })),
            moveLines: [],
            ledgerRefs: [],
            accountLedger: null,
            moveType: "OUT_INVOICE",
            saleType: 'B2C',
            type: "EXTERNAL",
            isWithInvoice: true,
            isWithDeliveryNote: false,
            isTakePricePolicy: false,
            priceList: { id: data.priceList?.id },
            warehouse: { id: data.warehouse?.id },
            deliveryAddress: { id: data.deliveryAddress?.id },
            codeInvoice: null,
            invoiceFormNumber: invoiceType,
            symbol: "string",
            invoiceDate: minDateS,
            paymentMethod: data.paymentMethod == 'BANK_TRANSFER' ? 'BANK' : data.paymentMethod,
            bankAccountPartner: { id: data?.bankAccountPartner?.id },
            bankAccount: { id: data?.bankAccount?.id },
            pickingCode: "",
            applyDate: null,
            isOptionPrice: data?.isOptionPrice,
            isPrepayment: null,
        });
        try {
            const submit = await orderStore.createInvoice(dataSubmit);
            if (submit.kind === "ok") {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: '',
                    textBody: translate('txtToats.create_success'),
                })
                navigation.navigate("orderDetails", { idInvoices: submit.response.data.id })
                // Perform any success actions here (e.g., navigation)
            } else {
                console.log('first', JSON.stringify(submit.response.errorCodes))
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: translate("txtDialog.txt_title_dialog"),
                    textBody: submit.response.errorCodes[0].message,
                    button: translate("common.ok"),
                    closeOnOverlayTap: false
                })
            }
        } catch (error) {
            console.error("Error creating invoice:", error);
        }
    };
    useEffect(() => {
        handleGetDetailOrder()
        handleGetPayment();
    }, [orderId])
    const arrPayment = dataPayment.map((item: any) => {
        return { label: item.name, id: item.id }
    })
    const scopeTypeOptions = [
        { id: 1, value: 'ELECTRONIC_BILL', label: 'Hóa đơn giá trị gia tăng (HĐ điện tử)' },
        { id: 2, value: 'VAT_BILL', label: 'Hóa đơn giá trị gia tăng' },
        { id: 3, value: 'SALE_BILL', label: 'Hóa đơn bán hàng (HĐ điện tử)' },
    ];
    const calculateTotalUnTaxPrice = () => {
        let totalPrice = 0;
        data.saleOrderLines?.forEach((item: any) => {
            const itemTotal = item.amountUntaxed;
            totalPrice += itemTotal;
        });
        return totalPrice;
    }
    const validateDate = (value: any) => {
        if (!value) {
            return "Ngày không được để trống";
        }

        return true;
    };


    function groupTaxValues(dataTax: any[] | undefined) {
        if (dataTax === undefined) {
            return [];
        }

        const groupedTaxValues = dataTax.reduce((acc: { [x: string]: { taxName: any; taxId: any; amount: any; }; }, curr: { items: any[]; }) => {
            curr.items.forEach((item: { taxId: any; amount: any; taxName: any; }) => {
                const key = item.taxId;
                if (acc[key]) {
                    acc[key].amount += item.amount;
                } else {
                    acc[key] = {
                        taxName: item.taxName,
                        taxId: key,
                        amount: item.amount
                    };
                }
            });
            return acc;
        }, {});

        return Object.values(groupedTaxValues);
    }

    // console.log('-----groupTaxValues2222-----', groupTaxValues(data.computeTaxInfo?.taxLines))

    return (
        <View style={{ backgroundColor: colors.palette.white, flex: 1 }}>
            <Header
                LeftIcon={Images.back}
                onLeftPress={() => navigation.goBack()}
                style={{ height: scaleHeight(52) }}
                headerTx={"order.sendInvoice"}
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
                                        onChangeText={value => { onChange(value), setInvoiceCode(value) }}
                                        placeholderTx={"order.invoiceCode"}
                                    />
                                )}
                                // defaultValue={''}
                                name="invoiceCode"
                            // rules={{
                            //     required: translate('ruleController.emptyText'),
                            // }}
                            />
                        </View>
                        <Text tx="ClientScreen.client" style={{ fontSize: fontSize.size12, color: '#747475' }} />
                        <Text text={data.partner?.name} style={{ fontSize: fontSize.size16, fontWeight: '600' }} />
                        <View style={{ marginVertical: scaleHeight(15) }}>
                            <InputSelect
                                // required={true}
                                hintTx={"order.invoiceType"}
                                titleTx={"order.invoiceType"}
                                arrData={scopeTypeOptions}
                                onPressChoice={(item: any) => {
                                    setInvoiceTypeLabel(item);
                                    setInvoiceType(item.value)
                                }}
                                dataDefault={invoiceTypeLabel.label}
                            />
                        </View>
                        <View style={{}}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextField
                                        // maxLength={maxLenngthPhoneNumber}
                                        keyboardType={null}
                                        labelTx={"order.symbol"}
                                        style={{
                                            // marginBottom: scaleHeight(10),
                                            marginBottom: scaleHeight(5),
                                            justifyContent: 'center',
                                        }}
                                        inputStyle={{ fontSize: fontSize.size16, fontWeight: '500' }}
                                        value={value}
                                        onBlur={onBlur}
                                        RightIconClear={Images.icon_delete2}
                                        error={errors?.symbol?.message}
                                        onClearText={() => onChange('')}
                                        onChangeText={value => onChange(value)}
                                        placeholderTx={"order.symbol"}
                                    />
                                )}
                                // defaultValue={''}
                                name="symbol"
                            // rules={{
                            //     required: translate('ruleController.emptyText'),
                            // }}
                            />
                        </View>
                        <View style={{ marginVertical: scaleHeight(15) }}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextField
                                        // maxLength={maxLenngthPhoneNumber}
                                        isImportant
                                        editable={false}
                                        keyboardType={null}
                                        labelTx={"order.invoiceDate"}
                                        style={{
                                            // marginBottom: scaleHeight(10),
                                            marginBottom: scaleHeight(5),
                                            justifyContent: 'center',
                                        }}
                                        inputStyle={{ fontSize: fontSize.size16, fontWeight: '500', color: '#000000' }}
                                        value={value}
                                        valueInput={minDateS ? moment(minDateS).format("DD/MM/YYYY") : ''}
                                        pressRightIcon={() => {
                                            toggleModalDate(),
                                                setChoiseCalendar(1)
                                        }
                                        }
                                        onBlur={onBlur}
                                        // RightIconClear={Images.icon_delete2}/
                                        RightIcon={Images.icon_CalenderBlank}
                                        error={errors?.invoiceCreateDate?.message}
                                        onClearText={() => onChange('')}
                                        onChangeText={value => onChange(value)}
                                        placeholderTx={"order.placeholderDate"}
                                    />
                                )}
                                // defaultValue={''}
                                name="invoiceCreateDate"
                                rules={{
                                    required: translate('ruleController.emptyText'),
                                    validate: validateDate
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
                                        marginBottom: scaleHeight(5),
                                        justifyContent: 'center',
                                    }}
                                    inputStyle={{ fontSize: fontSize.size16, fontWeight: '500', color: '#000000' }}
                                    valueInput={minDateE ? moment(minDateE).format("DD/MM/YYYY") : ''}
                                    onBlur={onBlur}
                                    value={value}
                                    // RightIconClear={Images.icon_delete2}/
                                    RightIcon={Images.icon_CalenderBlank}
                                    pressRightIcon={() => {
                                        toggleModalDateEnd(),
                                            setChoiseCalendar(2)
                                    }}
                                    error={errors?.invoiceEndDate?.message}
                                    onClearText={() => onChange('')}
                                    placeholderTx={"order.placeholderDate"}
                                />
                            )}
                            defaultValue={''}
                            name="invoiceEndDate"
                        // rules={{
                        //     required: translate('ruleController.emptyText'),
                        // }}
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
                        <Text style={{ fontSize: fontSize.size12, fontWeight: '600', marginVertical: scaleHeight(15) }}>Thông tin hoá đơn</Text>
                        <View style={{ borderRadius: 8, backgroundColor: colors.palette.neutral100 }}>
                            {
                                data.saleOrderLines?.map((item: any) => {
                                    return (
                                        <TouchableOpacity onPress={() => { }} style={styles.viewItemListProduct}>
                                            <ImageBackground
                                                style={{ width: scaleWidth(48), height: scaleHeight(48), marginRight: scaleWidth(10) }}
                                                imageStyle={{
                                                    borderRadius: 16
                                                }}
                                                source={require("../../../../assets/Images/no_images.png")}>
                                                <FastImage
                                                    style={{
                                                        width: scaleWidth(48),
                                                        height: scaleHeight(48),
                                                        borderRadius: 16
                                                    }}
                                                    source={{
                                                        uri: `${item.productInfo?.productImage ?? ""}`,
                                                        cache: FastImage.cacheControl.immutable,
                                                    }}
                                                    defaultSource={require("../../../../assets/Images/no_images.png")}
                                                />
                                            </ImageBackground>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ width: (Dimensions.get('screen').width - 64) * 0.45 }}>
                                                    <Text text={item.productInfo?.name} style={styles.textListProduct} />
                                                    <Text text={`- ${item.productInfo?.uomName}`} style={styles.textUomName} />
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {/* <Text text="SL: " style={[styles.textContent, { fontSize: fontSize.size12 }]} /> */}
                                                    <Text text={formatCurrency(item.amountUntaxed)} style={styles.textListProduct} />

                                                </View>
                                            </View>
                                            <View>
                                                <Text text={item.quantity} style={styles.textListProduct} />
                                                {/* <Text text={formatCurrency(item.amountUntaxed)} style={styles.priceOriginal} /> */}
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
                                value={formatCurrency(calculateTotalUnTaxPrice())}
                            />
                            {groupTaxValues(data.computeTaxInfo?.taxLines).map((item: any) => (

                                <ProductAttribute
                                    label={item.taxName}
                                    value={formatCurrency(item.amount)}
                                />

                            ))}
                            <ProductAttribute
                                labelTx="order.totalInvoice"
                                value={formatCurrency(data.totalPrice)}
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
                    onPress={submitAdd}
                    tx={"order.sendInvoice"}
                    style={styles.buttonOrder}
                    textStyle={styles.textButtonOrder}
                />
            </View>

            <CustomCalendar
                isReset={isReset}
                // minDate={minDateS}
                maxDate={minDateE}
                handleReset={() => setIReset(!isReset)}
                handleShort={() => {
                    toggleModalDate();
                    // choiseCalendar == 1 ? setMinDateS(markedDatesS) : setMinDateE(markedDatesS)
                    setMinDateS(markedDatesS)

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
            <CustomCalendar
                isReset={isReset}
                minDate={minDateS}
                // maxDate={minDateE}
                handleReset={() => { setIReset(!isReset) }}
                handleShort={() => {
                    toggleModalDateEnd();
                    // choiseCalendar == 1 ? setMinDateS(markedDatesS) : 
                    setMinDateE(markedDatesS)
                }}
                onMarkedDatesChangeS={(markedDatesS: React.SetStateAction<string>) => {
                    setMarkedDatesS(markedDatesS);
                }}
                onMarkedDatesChangeE={(markedDatesE: React.SetStateAction<string>) => {
                    setMarkedDatesE(markedDatesE);
                }}
                isShowTabs={false}
                isSortByDate={isSortByDateEnd}
                isOneDate={true}
                toggleModalDate={toggleModalDateEnd}
            />
        </View>
    );
});
