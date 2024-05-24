import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React from "react";
import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScreenProps } from "react-native-screens";
import { NavigatorParamList } from "../../../navigators";
import { Header, Text } from "../../../components";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";


export const DetailExportGoods: FC<StackScreenProps<NavigatorParamList, "detaiExampleGoods">> = observer(
    function detaiExportGoods(props) {
        interface DateItem {

            id: string,
            time: string,
            date: string,
            status: string,
            total: String
        }
        const dataListGoodsDeliveryBook: DateItem[] = [
            {
                id: "#PXH00001",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
                total: '0'
            },
            {
                id: "#PXH00003",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
                total: '2'
            },
            {
                id: "#PXH00001",
                time: "13:56",
                date: "26/4/2024",
                status: "Đã thanh toán",
                total: '5'
            },
            {
                id: "#PXH00011",
                time: "13:56",
                date: "24/4/2024",
                status: "Đã thanh toán",
                total: '1'
            },
            {
                id: "#PXH00002",
                time: "13:56",
                date: "26/3/2024",
                status: "Đã thanh toán",
                total: '3'
            },
            {
                id: "#PXH00004",
                time: "13:56",
                date: "26/3/2024",
                status: "Chưa thanh toán",
                total: '2'
            },
            {
                id: "#PXH00044",
                time: "13:56",
                date: "25/3/2024",
                status: "Chưa thanh toán",
                total: '8'
            }
        ]

        const ItemListDetailExprort = ({item: item}:{item:DateItem} ) => {
            <TouchableOpacity style={Styles.bodyItem}
                onPress={() => props.navigation.navigate('detaiExampleGoods')}

            >
                <View style={{

                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}

                >
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#333' }}>{item.id}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={Styles.stylesTextTime} >{item.time} </Text>
                            <Text style={Styles.stylesTextTime}> {item.date}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: item.status === 'Đã thanh toán' ? '#DAFBDF' : '#FFEFF0', height: 14, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 8, color: item.status === 'Đã thanh toán' ? '#00CC6A' : 'red' }}>
                            {item.status}
                        </Text>

                    </View>

                </View>
               
            </TouchableOpacity>
        }

        return (
            <View>
                <Header
                    RightIcon1={Images.avatar}
                    LeftIcon={Images.back}
                    btnRightStyle={{ width: 30, height: 30 }}
                    headerTx="DetailExportGoods.detailExportGoods"
                    style={{ height: scaleWidth(52) }}
                />
                <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>

                </View>
            </View>
            
        )

    }
)
const Styles = StyleSheet.create ({
    bodyItem: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(16),
        marginBottom: scaleWidth(15)
    },
    stylesTextTime: {
        fontSize: 10
    },
    
})
export default Styles