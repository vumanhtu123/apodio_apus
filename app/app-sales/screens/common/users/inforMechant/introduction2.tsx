import { StackActionType, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "./index";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Header } from "../../../../../components/header/header";
import { Svgs } from "../../../../../../assets/svgs";
import { Text } from "../../../../../components/text/text"
import ReactNativeModal from "react-native-modal";
import ModelSenSuccess from "../comment/ModelSendSuccess";
import { Modal } from "react-native";
import store from "../comment/comment";
import { useStores } from "../../../../models";
import React from "react";
import StarRating from "react-native-star-rating-widget";
import { NavigatorParamList } from "../../../../navigators";
import { colors } from "../../../../theme";




export const IntroductionScreen2: FC<StackScreenProps<NavigatorParamList, "Introduce">> = observer(

    function Introduction2(props) {

 
        const myStore = useStores()
        const data = props.route.params;
        // console.log("aaaaaaaaa",data);

        // const valueOpenModalSen = props.route.params.dataOpen;
        // console.log("aaaaaaa" + valueOpenModalSen);
        // const dataOpen = navigation ;
        // console.log(dataOpen);
        // console.log('openDialogSuccess',valueOpenModalSen);
        const close = store.close();



        // console.log('tuvm'+myStore.loginStore.show)

        const open = store.valueShow;

        //    if(open == true){
        //     setTimeout(() => {
        //         close
        //     }, 3000);
        //    } 
        console.log("momooooo" + open);





        const [visible, setVisible] = useState(false);
        const [defaultRating, setdefaultRating] = useState(0);
        const [dialogSend, setDialogSend] = useState(false);
        const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

        //useState nay sử dụng cho thư viện StarRating
        const [rating, setRating] = useState(0);

        console.log(rating)
        // const [openDialogSuccessSend, setOpenDialogSuccessSend] = useState(valueOpenModalSen);

        // console.log("doan"+openDialogSuccessSend)
        // console.log("doan"+ defaultRating) 

        //    useEffect(() => {
        //     console.log('xx')
        //         setOpenDialogSuccessSend(valueOpenModalSen);
        //    }, [valueOpenModalSen])


        // console.log(props.route.params.dataOpen);

        // useEffect(() => {
        //   setOpenDialogSuccessSend(valueOpenModalSen)
        // }, [])



        const temStar = Array.from(Array(defaultRating));
        // console.log(temStar);   

        const CustomeRating = () => {

            return (

                // <View style={{ flexDirection: 'row' }}>
                //     {
                //         maxRating.map((item, key) => {
                //             return (
                //                 <TouchableOpacity
                //                     key={item}
                //                     onPress={() => {

                //                         setdefaultRating(item)

                //                     }}
                //                     style={{ marginHorizontal: 10 }}
                //                 >
                //                     {
                //                         item <= defaultRating
                //                             ?

                //                             <Images.ic_starInclick />
                //                             :
                //                             <Images.ic_starUnclick />
                //                     }

                //                 </TouchableOpacity>
                //             )
                //         })
                //     }
                // </View>
                <StarRating
                    rating={rating}
                    onChange={setRating}
                    enableHalfStar={true}
                    enableSwiping={true}
                />
            )
        }

        const RatingAfterSen = () => {
            return (
                // const mapStatr = defaultRating;

                <View style={{ flexDirection: 'row' }}>
                    {
                        temStar.map((item, key) => {
                            return (
                                <View
                                    key={item}
                                >

                                    <Svgs.ic_starSuccess />

                                </View>
                            )
                        })
                    }
                </View>
            )
        }

        const textData = [
            {
                title: 'inforMerchant.introductionbody',
                icon: Svgs.ic_introduction2,
                onPress: () => props.navigation.navigate('termsAndAgreement')

            },
            {
                title: 'inforMerchant.feedback',
                icon: Svgs.ic_star,
                onPress: () => setVisible(true)
            },
            {
                title: 'inforMerchant.question',
                icon: Svgs.ic_question,
                onPress: () => props.navigation.navigate('faqscren')
            }
        ]

        return (
            <View style={styles.main}>
                <Header
                    style={{ height: 52 }}
                    LeftIcon={Svgs.back}
                    headerTx="inforMerchant.introduction"
                    onLeftPress={() => props.navigation.goBack()}
                />

                <View style={styles.body}>
                    {
                        textData.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={item.onPress}
                                >
                                    <View style={styles.leftContent}>
                                        <View style={{ padding: 6 }}>
                                            <item.icon style={{ alignSelf: 'center' }} width={18} height={18} />
                                        </View>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text tx={item.title} />
                                        </View>
                                    </View>
                                    <Svgs.ic_right />
                                </TouchableOpacity>
                                <View style={styles.divider}></View>
                            </View>
                        ))
                    }
                </View>

                <ReactNativeModal
                    isVisible={visible}
                    onBackdropPress={() => {
                        setVisible(!visible)
                        setdefaultRating(0)
                        if (dialogSend) {
                            setDialogSend(!dialogSend)
                        }

                    }}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ width: 269, height: 273, backgroundColor: colors.gray, borderRadius: 8, padding: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Svgs.ic_modalFeedBack />

                        {dialogSend ?

                            <Text
                                tx="inforMerchant.titleAfterFeedBack"
                            />
                            :
                            <Text
                                tx="inforMerchant.titleFeedBackInModal"
                            />

                        }

                        {dialogSend ?
                            <View style={{ alignItems: 'center' }}>
                                <Text
                                    style={{ textAlign: 'center' }}
                                    tx="inforMerchant.contentAfterFeeBack"
                                />
                                <RatingAfterSen />
                            </View>


                            :
                            <Text
                                style={{ textAlign: 'center' }}
                                tx="inforMerchant.contentFeedBackInModal"
                            />
                        }
                     {/* //Đây là Phần đánh giá sao */}
                        <View style={{ width: '100%', }}>
                           

                            <View style={{ width: '100%', padding: 10, borderTopColor: colors.gainsboro1, borderBottomColor: colors.gainsboro1, borderTopWidth: 1, alignItems: 'center', borderBottomWidth: 1, }}>

                                {dialogSend ?
                                    <TouchableOpacity>
                                        <Text
                                            style={{ color: colors.dodgerBlue }}
                                            tx="inforMerchant.comment"
                                            onPress={() => props.navigation.navigate('comment', { defaultRating: rating, })}

                                        />
                                    </TouchableOpacity>
                                    :
                                    <CustomeRating />
                                }

                            </View>

                            {rating !== 0

                                ?
                                // Đây là hai nút hủy và nút gửi
                                <View
                                    style={{ width: '100%'}}
                                >
                                    {
                                        dialogSend ?
                                            <TouchableOpacity
                                                style={{ width: '100%', paddingVertical: 11, alignItems: 'center' }}

                                                onPress={() => {

                                                    setDialogSend(!dialogSend)
                                                    setVisible(!visible)

                                                }}
                                            >
                                                <Text
                                                    style={{ color: colors.dodgerBlue }}
                                                    tx="inforMerchant.ok"
                                                />
                                            </TouchableOpacity>
                                            :
                                            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    style={{ width: '50%', alignItems: 'center' }}
                                                    onPress={() => {
                                                        setVisible(!visible)
                                                        setRating(0)
                                                    }}
                                                >
                                                    <Text
                                                        style={{ color: colors.dodgerBlue }}
                                                        tx="inforMerchant.cancel"
                                                    />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ width: '50%', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: colors.gainsboro1 }}
                                                    onPress={() => {
                                                        setDialogSend(!dialogSend)
                                                    }}
                                                >
                                                    <Text
                                                        style={{ margin: 11, color: colors.dodgerBlue }}
                                                        tx="inforMerchant.btnSen"

                                                    />
                                                </TouchableOpacity>
                                            </View>
                                    }

                                </View>
                                :
                                <TouchableOpacity
                                    style={{ width: '100%', alignItems: 'center', padding: 11 }}
                                    onPress={() => {
                                        setVisible(!visible)
                                        setdefaultRating(0)
                                    }}
                                >
                                    <Text
                                        tx="inforMerchant.btnCancel"
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </ReactNativeModal>

                {/* <ReactNativeModal
                    animationType="slide"
                    transparent={true}
                    visible={myStore.loginStore.show}
                    onBackdropPress={myStore.loginStore.showDialog2}
                    style={{ position:'absolute', marginTop:80, marginStart:82  }}
                    >
                 

                            <View style={styles.modalView}>
                            
                                <Images.ic_paperPlane/>
                                <Text
                                    tx="inforMerchant.send"
                                    
                                />
                                <Text
                                    tx="inforMerchant.thankYou"
                                />
                                {/* <TouchableOpacity onPress={() => setOpenDialogSuccessSend(!openDialogSuccessSend)} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
             
                    </ReactNativeModal> */}



            </View>

        )

    }



)
