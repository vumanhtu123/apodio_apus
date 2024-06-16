import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Header, Switch, Text, TextField } from "../../../../app/components";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../../app/theme";
import { Images } from "../../../../assets/index";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { translate } from "../../../i18n";
import { formatDateTime } from "../../../utils/formatDate";
import { formatCurrency } from "../../../utils/validate";
import ItemOrder from "../components/item-order";
import { styles } from "./styles";
import { ALERT_TYPE, Dialog } from "../../../components/dialog-notification";
import { useStores } from "../../../models";
import FastImage from "react-native-fast-image";
export const OrderDetails: FC = observer(
    function OrderDetails(props) {
        const { control, reset, handleSubmit, formState: { errors } } = useForm();

        const navigation = useNavigation();
        const [valueSwitch, setValueSwitch] = useState(false)
        const [showCancelOrder, setShowCancelOrder] = useState(false)
        const [showAddress, setShowAddress] = useState(false)
        const [showAddAddress, setShowAddAddress] = useState(false)
        const [reason, setReason] = useState({ label: '' })
        const [city, setCity] = useState({})
        const [district, setDistrict] = useState({})
        const [wards, setWards] = useState({})
        const [phone, setPhone] = useState('')
        const [addressChange, setAddressChange] = useState('')
        const { orderStore } = useStores();
        const { orderId } = orderStore;
        const [data, setData] = useState<any>([]);
        const [dataPayment, setDataPayment] = useState<any>([]);

        useEffect(() => {
            console.log('id', orderId)
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
        const handleGetDetailInvoice = async () => {
            try {
                const response = await orderStore.getDetailInvoice(328);
                if (response && response.kind === "ok") {
                    const data = response.response.data;
                    console.log('dataDetailInvoice', JSON.stringify(data))
                    setDataPayment(data);
                } else {
                    console.error("Failed to fetch detail:", response);
                }
            } catch (error) {
                console.error("Error fetching detail:", error);
            }
        };
        const cancelOrder = async () => {
            const result = await orderStore.cancelOrder(orderId);
            console.log('//////////', result)
            if (result.kind === "ok") {
                console.log("Xoá danh mục thành công", result.response);
            } else {
                console.log(
                    "Xoá danh mục thất bại",
                    result.response.errorCodes[0].message
                );
            }
        }
        //   useEffect(()=>{
        //     handleGetDetailOrder()
        //   },[])
        useEffect(() => {
            handleGetDetailOrder()
            handleGetDetailInvoice()
        }, [orderId]);

        useEffect(() => {
            console.log("---------useEffect---------reload------------------");
            const unsubscribe = navigation.addListener('focus', () => {
                handleGetDetailOrder()
            });

            return unsubscribe;
        }, [navigation]);
        const arrData = [
            {
                id: 1,
                label: "thich huy"
            },
            {
                id: 2,
                label: "ko thich dat"
            },
            {
                id: 3,
                label: "thich huy"
            },
            {
                id: 4,
                label: "Ly do khac"
            },
        ]

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

        const addressChoice = {
            name: 'Công ty TNHH Mặt Trời Hồng',
            phone: '02468876656',
            address: "85 Hàng Bài, Hoàn Kiếm, Hà Nội",
            default: false,
            id: 1
        }

        const userAddress = [
            {
                id: 1,
                phone: '02468876656',
                address: "85 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
            {
                id: 2,
                phone: '02468876658',
                address: "Số 945 đường Nguyễn Công Trứ, phố Phúc Thịnh, Phường Bích Đào, Thành phố Ninh Bình, Ninh Bình",
                default: true,
            },
            {
                id: 3,
                phone: '02468876657',
                default: false,
                address: "87 Hàng Bài, Hoàn Kiếm, Hà Nội"
            },
            {
                id: 5,
                phone: '02468876656',
                default: false,
                address: "Số 945 đường Nguyễn Công Trứ, phố Phúc Thịnh, Phường Bích Đào, Thành phố Ninh Bình, Ninh Bình"
            },
            {
                id: 6,
                phone: '02468876656',
                address: "87 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
            {
                id: 4,
                phone: '02468876656',
                address: "88 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
        ]

        const arrTest = [
            {
                "name": "An Giang",
                "slug": "an-giang",
                "type": "tinh",
                "name_with_type": "Tỉnh An Giang",
                "code": "89",
            },
            {
                "name": "Kon Tum",
                "slug": "kon-tum",
                "type": "tinh",
                "name_with_type": "Tỉnh Kon Tum",
                "code": "62",
            },
            {
                "name": "Đắk Nông",
                "slug": "dak-nong",
                "type": "tinh",
                "name_with_type": "Tỉnh Đắk Nông",
                "code": "67",
            },
            {
                "name": "Sóc Trăng",
                "slug": "soc-trang",
                "type": "tinh",
                "name_with_type": "Tỉnh Sóc Trăng",
                "code": "94",
            },
            {
                "name": "Bình Phước",
                "slug": "binh-phuoc",
                "type": "tinh",
                "name_with_type": "Tỉnh Bình Phước",
                "code": "70",
            },
            {
                "name": "Hưng Yên",
                "slug": "hung-yen",
                "type": "tinh",
                "name_with_type": "Tỉnh Hưng Yên",
                "code": "33",
            },
            {
                "name": "Thanh Hóa",
                "slug": "thanh-hoa",
                "type": "tinh",
                "name_with_type": "Tỉnh Thanh Hóa",
                "code": "38",
            },
            {
                "name": "Quảng Trị",
                "slug": "quang-tri",
                "type": "tinh",
                "name_with_type": "Tỉnh Quảng Trị",
                "code": "45",
            },
        ]
        const arrCity = arrTest.map((item) => {
            return { label: item.name, id: item.code }
        })

        function handleConfirm(data: any) {
            console.log(reason)
            console.log(data.reasonText)
            setShowCancelOrder(false)
        }
        const dataStatus = [
            { status: 'Chờ lấy hàng', complete: true },
            { status: 'Đã lấy hàng', complete: true },
            { status: 'Đang vận chuyển', complete: true },
            { status: 'Đã giao thành công', complete: false },
        ];

        const OrderStatusItem = ({ item, isFirstStep, isLastStep }: any) => {
            return (
                <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: scaleHeight(12) }}>
                    {/* Replace Images component with Image */}
                    <View style={{}}>
                        {item.complete ? <Images.icon_checkGreen width={scaleWidth(13)} height={scaleHeight(13)} /> :
                            <View style={{ width: scaleWidth(13), height: scaleHeight(13), alignItems: 'center', justifyContent: 'center' }}>

                                <Images.ic_dot width={scaleWidth(5)} height={scaleHeight(5)} />
                            </View>
                        }
                    </View>
                    {/* <View style={{ height: 1, width: 48, backgroundColor: '#858992' }} /> */}
                    <Text style={{ fontSize: fontSize.size10, width: scaleWidth(70), textAlign: 'center', paddingTop: scaleHeight(5) }}>{item.status}</Text>
                    {/* {!isFirstStep && <View style={styles.leftBar} />} */}
                    {!isLastStep && <View style={styles.rightBar} />}
                </View>
            );
        };
        return (
            // <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
            //     colors={[colors.palette.navyBlue, colors.palette.malibu]}
            //     style={{ flex: 1 }}
            // >
            //     <View style={[styles.viewHeader, {
            //         marginTop: scaleHeight(paddingTop),
            //         marginRight: scaleWidth(margin.margin_16)
            //     }]}>
            //         <TouchableOpacity onPress={() => navigation.goBack()}
            //             style={{ marginLeft: scaleWidth(margin.margin_16) }} >
            //             <Images.back width={20} height={20} />
            //         </TouchableOpacity>
            //         <View style={{
            //             marginLeft: scaleWidth(margin.margin_2),
            //             flex: 1, marginBottom: scaleHeight(margin.margin_2)
            //         }}>
            //             <Text tx={'order.orderDetail'}
            //                 style={styles.textHeader} />
            //         </View>
            //         {/* {data.status === "Đã gửi YC" || data.status === "Trả hàng" ? null : */}
            //             <TouchableOpacity style={{ alignItems: 'center' }}
            //             // onPress={() => navigation.navigate('orderCopy' as any, { data: promotions })}
            //             >
            //                 <Images.icon_copy height={16} width={16} />
            //                 <Text tx={'order.copy'} style={styles.textButtonHeader} />
            //             </TouchableOpacity>
            //             {/* } */}
            //         {/* {data.status === "Đã giao" ? */}
            //             <TouchableOpacity style={{ marginLeft: scaleWidth(margin.margin_6), alignItems: 'center' }}>
            //                 <Images.icon_clipboard height={16} width={16} />
            //                 <Text tx={'order.return'} style={styles.textButtonHeader} />
            //             </TouchableOpacity>
            //             {/* : null
            //         } */}
            //         {/* {data.status === "Hủy đơn" ? */}
            //             <TouchableOpacity style={{ marginLeft: scaleWidth(margin.margin_6), alignItems: 'center' }}>
            //                 <Images.icon_printer height={16} width={16} />
            //                 <Text tx={'order.printInvoice'} style={styles.textButtonHeader} />
            //             </TouchableOpacity>
            //             {/* : null
            //         } */}
            //         <View style={styles.logoHeader}>
            //             <Images.icon_Logo />
            //         </View>
            //     </View>

            // </LinearGradient>
            <View style={{ flex: 1 }}>
                <Header
                    type={"AntDesign"}
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    colorIcon={colors.text}
                    headerTx={'order.orderDetail'}
                    RightIcon1={Images.icon_copy}
                    TitleIcon1="order.copy"
                    RightIcon={Images.icon_editWhite}
                    TitleIcon="common.edit"
                    RightIcon2={Images.icon_printer}
                    TitleIcon2="order.printInvoice"
                    onRightPress2={() => navigation.navigate('printInvoiceScreen' as never)}
                    btnRightStyle={{ marginRight: scaleWidth(3), width: scaleWidth(40) }}
                    onRightPress1={() => {
                        navigation.navigate('newAndEditOrder' as never, { newData: data, screen: 'copy' })
                        orderStore.setCheckRenderList(true)
                    }}
                    onRightPress={() => {
                        navigation.navigate('newAndEditOrder' as never, { newData: data, screen: 'edit' })
                        orderStore.setCheckRenderList(true)
                    }}
                    // RightIcon2={activeTab === "product" ? isGridView ? Images.ic_squareFour : Images.ic_grid : null}
                    // onRightPress={handleOpenSearch}
                    // onRightPress2={toggleView}
                    // RightIcon={openSearch ? Images.icon_close : Images.search}
                    // headerInput={openSearch}
                    // searchValue={activeTab === "product" ? searchValue : searchCategory}
                    // onSearchValueChange={
                    //     activeTab === "product"
                    //         ? handleSearchValueChange
                    //         : handleSearchCategoryChange
                    // }
                    // handleOnSubmitSearch={
                    //     activeTab === "product"
                    //         ? handleSubmitSearch
                    //         : handleSubmitSearchCategory
                    // }
                    titleMiddleStyle={styles.titleHeader}
                    widthRightIcon={20}
                    heightRightIcon={20}
                    style={{ height: scaleHeight(54), }}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.viewScrollView}>
                    <View style={styles.viewCode}>
                        <View style={styles.viewContentCode}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ flex: 1 }}>
                                    <Text text={data?.code} style={styles.textListProduct} />
                                </View>
                                <View style={[styles.viewStatus,
                                {
                                    backgroundColor: data.state === 'SALE' ? colors.palette.solitude
                                        : data.state === 'SENT' ? colors.palette.floralWhite :
                                            data.state === 'CANCEL' ? colors.palette.amour :
                                                data.state === 'DONE' ? colors.palette.mintCream : ''
                                }]}>
                                    <Text style={
                                        [styles.textStatus, {

                                            color: data.state === 'SALE' ? colors.palette.metallicBlue
                                                : data.state === 'SENT' ? colors.palette.yellow :
                                                    data.state === 'CANCEL' ? colors.palette.radicalRed :
                                                        data.state === 'DONE' ? colors.palette.malachite : ''
                                        }]
                                    } tx={
                                        data.state === 'SENT' ? 'orderDetailScreen.sent' :
                                            data.state === 'SALE' ? 'orderDetailScreen.sale' :
                                                data.state === 'DONE' ? 'orderDetailScreen.done' :
                                                    data.state === 'CANCEL' ? 'orderDetailScreen.cancel' : ''
                                    } />
                                </View>
                            </View>
                            <Text text={formatDateTime(data?.orderDate)}
                                style={styles.textContent}
                            />
                        </View>
                        <View style={styles.viewLine} />
                        <View style={{
                            marginVertical: scaleHeight(margin.margin_12),
                            marginHorizontal: scaleWidth(margin.margin_16)
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }} >
                                    <Text text={formatCurrency(data.amountTotal)} />
                                </View>
                                <Button tx={'order.sendInvoice'}
                                    onPress={() => { navigation.navigate('newInvoice' as never) }}
                                    style={styles.buttonSend} />
                            </View>
                            <Text text={data.payStatus} style={styles.textPayStatus} />
                        </View>
                    </View>
                    <View style={styles.viewName}>
                        <View style={styles.viewImageName}>
                            <AutoHeightImage
                                width={scaleWidth(32)} height={scaleHeight(32)} style={{ borderRadius: 16 }}
                                source={{ uri: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg" }}
                                fallbackSource={Images.avatarError}
                            />
                        </View>
                        <View >
                            <Text text={data?.partner?.name} style={styles.textListProduct} />
                        </View>
                        {/* <TouchableOpacity>
                            <Images.icon_copy2 style={{ marginLeft: scaleWidth(margin.margin_4) }} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.viewAddress}>
                        <View>
                            <Text tx={'order.deliveryAddress'} style={styles.textListProduct} />
                            <View style={{ marginTop: scaleHeight(margin.margin_15) }}>
                                <Text text={addressChoice.name} style={[styles.textMoney2, {
                                    lineHeight: scaleHeight(14.52),
                                    marginBottom: scaleHeight(margin.margin_8)
                                }]} />
                                <Text text={addressChoice.phone} style={[styles.textMoney2, {
                                    lineHeight: scaleHeight(14.52),
                                    marginBottom: scaleHeight(margin.margin_8)
                                }]} />
                                <Text text={addressChoice.address} style={[styles.textMoney2, {
                                    lineHeight: scaleHeight(14.52),
                                    marginBottom: scaleHeight(margin.margin_8)
                                }]} />
                            </View>
                        </View>
                    </View>


                    <View style={{ borderRadius: 8, backgroundColor: colors.palette.neutral100 }}>
                        {
                            data.saleOrderLines?.map((item) => {
                                return (
                                    <TouchableOpacity onPress={() => { }} style={styles.viewItemListProduct}>
                                        {/* <FastImage
                                            style={{
                                                width: scaleWidth(48),
                                                height: scaleHeight(48),
                                            }}
                                            source={{
                                                uri: item.productInfo?.productImage,
                                                cache: FastImage.cacheControl.immutable,
                                            }}
                                            defaultSource={require("../../../../assets/Images/no_images.png")}
                                        /> */}
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
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text text="SL: " style={[styles.textContent, { fontSize: fontSize.size12 }]} />
                                                <Text text={item.quantity} style={styles.textListProduct} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text text={formatCurrency(item.amountTotal)} style={styles.textListProduct} />
                                            <Text text={formatCurrency(item.amountUntaxed)} style={styles.priceOriginal} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {/* {data.status === "Hủy đơn" || data.status === "Trả hàng" ? null :
                        <View style={styles.viewPay}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text tx={'order.paymentMethods'} style={[styles.textListProduct,
                                {
                                    paddingBottom: scaleHeight(padding.padding_20),
                                    flex: 1,
                                }]} />
                                {data.status === "Đã giao" ? <Images.icon_checkCircle /> : null}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text text="Thanh toán luôn" style={[styles.textMoney2, {
                                    flex: 1,
                                    lineHeight: scaleHeight(14.52),
                                }]} />
                                {data.status === "Đã giao" ? <TouchableOpacity onPress={() => setShowPay(!showPay)} >
                                    <Images.icon_caretRightDown />
                                </TouchableOpacity> : null}
                            </View>
                            {showPay === false ? null :
                                <View style={{ marginTop: scaleHeight(margin.margin_15) }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text tx={'order.payer'} style={[styles.textContent, {
                                            flex: 1,
                                            marginBottom: scaleHeight(margin.margin_12)
                                        }]} />
                                        <Text text="Nguyễn Ngọc Long" style={styles.textMoney} />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text tx={'order.timePay'} style={[styles.textContent, {
                                            flex: 1,
                                            marginBottom: scaleHeight(margin.margin_12)
                                        }]} />
                                        <Text text="12:00 04/09/2023" style={styles.textMoney} />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text tx={'order.paymentAmount'} style={[styles.textContent, {
                                            flex: 1,
                                            marginBottom: scaleHeight(margin.margin_12)
                                        }]} />
                                        <Text text="84.000.000" style={styles.textMoney} />
                                    </View>
                                </View>
                            }
                        </View>} */}
                    <ItemOrder
                        money={formatCurrency(data?.totalPrice)}
                        // totalTax={formatCurrency(data.computeTaxInfo?.taxLines?.[0]?.amount)}
                        discount={data?.amountDiscount}
                        totalAmount={formatCurrency(data?.amountTotal)}
                        weight={data?.weight}
                        // payStatus={data?.payStatus}
                        dataTax={data.computeTaxInfo?.taxLines?.[0]?.items}
                        styleViewItemOrder={{
                            marginTop: scaleHeight(15),
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                        }}
                    />
                    {/* {data.status === "Hủy đơn" ?
                        <View style={styles.viewDateMoney}>
                            <Text tx={'order.reasonForCancellation'} style={styles.textDateMoney} />
                        </View>
                        : data.status === "Đang xử lỹ" || data.status === "Đã giao" ? */}
                    <View style={styles.viewDateMoney}>
                        <Text tx={'order.sellerConfirm'} style={[styles.textDateMoney, { flex: 1 }]} />
                        <Text text="Đã thanh toán" style={styles.textPayStatus2} />
                    </View>
                    {/* :
                            <View style={styles.viewDateMoney}>
                                <View style={{ flex: 1 }}>
                                    <Text tx={'order.date'} style={styles.textDateMoney} />
                                </View>
                                <Text tx={'order.money'} style={styles.textDateMoney} />
                            </View>} */}


                    {/* 2 thẻ giống nhau data trả về thì viết riêng component */}
                    <View style={styles.viewCash}>
                        {/* <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewPayStatus}>
                                <Text text={data.payStatus} style={styles.textPayStatus3} />
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View> */}
                        {dataPayment.paymentResponses?.map((item: any) => (
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                marginBottom: scaleHeight(margin.margin_15)
                            }}>
                                <View style={{ width: (Dimensions.get('screen').width - 64) * 0.2 }}>
                                    <Text text={item.timePayment} style={styles.textContent} />
                                </View>
                                <View style={styles.viewLineCash}>
                                    <Images.icon_ellipse />
                                </View>
                                <View style={styles.viewTextCash}>
                                    <Text text={item.paymentPopUpResponse?.paymentMethod} style={[styles.textContent, { flex: 1 }]} />
                                    <Text text={formatCurrency(item.amount)} />
                                </View>
                            </View>
                        ))}
                        {/* <View style={{ flexDirection: 'row' }}>
                            <View style={styles.viewPayStatus}>
                                <Text text={data.payStatus} style={styles.textPayStatus3} />
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View> */}
                        {/* <View style={{
                            flexDirection: 'row', alignItems: 'center',
                            // marginBottom: scaleHeight(margin.margin_15)
                        }}>
                            <View style={{ width: (Dimensions.get('screen').width - 64) * 0.2 }}>
                                <Text text={"02/03/2024 13:56"} style={styles.textContent} />
                            </View>
                            <View style={styles.viewLineCash}>
                                <Images.icon_ellipse />
                            </View>
                            <View style={styles.viewTextCash}>
                                <Text tx={'order.cash'} style={[styles.textContent, { flex: 1 }]} />
                                <Text text="56.000.000" />
                            </View>
                        </View> */}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('orderTracking' as never)} style={{
                        paddingHorizontal: scaleWidth(padding.padding_16),
                        backgroundColor: colors.palette.neutral100,
                        // backgroundColor : 'red' , 
                        paddingVertical: scaleHeight(padding.padding_12),
                        borderRadius: 8,
                        marginBottom: scaleHeight(margin.margin_20),
                        alignItems: 'center',
                        // flexDirection: 'row'
                    }}>
                        {/* <View style={{}}>
                            <View style={{flexDirection:'row'}}>
                                <Images.icon_checkGreen width={13} height={10} />
                                <View style={{ height: scaleHeight(1), width: scaleWidth(48), backgroundColor: '#858992' }}>
                                </View>
                            </View>
                            <Text tx="order.waitingPickup" style={{ fontSize: fontSize.size10 }} />
                        </View> */}
                        {/* <ProgressSteps>
                            <ProgressStep label="First Step" >
                            </ProgressStep>
                            <ProgressStep label="Second Step"  >
                            </ProgressStep>
                            <ProgressStep label="Third Step" removeBtnRow = {true}>
                            </ProgressStep>
                            <ProgressStep label="Third Step" removeBtnRow = {true}>
                            </ProgressStep>
                        </ProgressSteps> */}
                        <View style={{ flexDirection: 'row' }}>
                            {dataStatus.map((item, index) => (
                                <OrderStatusItem key={item.status} item={item} isFirstStep={index === 0}
                                    isLastStep={index === dataStatus.length - 1} />
                            ))}
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                {/* {data.status === 'Đang xử lý' ?
                    <View style={styles.viewButtonCancel}>
                        <Button tx={'order.requestCancellation'}
                            onPress={() => setShowCancelOrder(true)}
                            style={styles.buttonCancel}
                            textStyle={styles.textButtonCancel} />
                    </View>
                    : data.status === 'Đã gửi YC' ?
                        <View style={styles.viewButtonCancel}>
                            <Button tx={'order.cancelOrder'}
                                onPress={() => setShowCancelOrder(true)}
                                style={[styles.buttonCancel, {
                                    marginBottom: scaleHeight(margin.margin_8),
                                }]}
                                textStyle={styles.textButtonCancel} />
                        </View> : null
                } */}
                <Modal isVisible={showCancelOrder}
                    onBackdropPress={() => setShowCancelOrder(false)}>
                    <View style={styles.viewModal}>
                        <View style={{ marginBottom: scaleHeight(margin.margin_30) }}>
                            <Text tx={'order.textOrderCancel'}
                                style={styles.textTitleModal} />
                        </View>
                        <InputSelect
                            titleTx={'order.reasonForCancellation'}
                            hintTx={'order.selectReason'}
                            required={true}
                            arrData={arrData}
                            dataDefault={reason.label}
                            onPressChoice={(item) => {
                                setReason(item)
                            }}
                        />
                        {reason.id === 4 ?
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value, onBlur } }) => (
                                        <TextField
                                            keyboardType={null}
                                            labelTx={"order.reason"}
                                            // label={"order.reason"}
                                            style={[styles.viewTextField, {
                                                height: scaleHeight(120)
                                            }]}
                                            inputStyle={{ marginVertical: scaleHeight(padding.padding_8) }}
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            onClearText={() => onChange('')}
                                            RightIconClear={Images.icon_delete2}
                                            multiline={true}
                                            isImportant={true}
                                            placeholderTx={'order.placeholderReason'}
                                            error={errors?.reasonText?.message}
                                        />)}
                                    defaultValue={''}
                                    name="reasonText"
                                    rules={{ required: "Reason is required" }}
                                />
                            </KeyboardAvoidingView> : null}
                        <View style={{
                            flexDirection: 'row',
                            marginTop: scaleHeight(margin.margin_30),
                            justifyContent: 'space-between'
                        }}>
                            <Button style={styles.buttonCancelModal}
                                tx={'common.cancel'}
                                textStyle={{ color: colors.palette.navyBlue }}
                                onPress={() => setShowCancelOrder(false)}
                            />
                            <Button
                                onPress={handleSubmit(handleConfirm)}
                                style={styles.buttonConfirmModal}
                                tx={'order.confirm'}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
);