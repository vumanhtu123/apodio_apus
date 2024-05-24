import { StackActionType, useRoute } from "@react-navigation/native";
import { AppStackParamList } from "../../../navigators";
import { TabScreenProps } from "../../../navigators/BottomTabNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { StatusBar, View, Image, FlatList } from "react-native";
import { Header, Text } from "../../../components";

import { Images } from "../../../../assets";
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "./styles";
import { TouchEventType } from "react-native-gesture-handler/lib/typescript/TouchEventType";
import ItemProducHasResquested from "./ItemProducHasResquested";
import React from "react";



export const detailExample: FC<StackScreenProps<AppStackParamList,"detailExample">> = observer(


    

    function DetailExple(props) {

            const route = useRoute();
            const data = route?.params?.data;

            

            const dataUser = [
                {
                    img: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
                    name: "Nguyen Van A",
                    status: "Phe Duyet" 
                }
            ]

            const dataProduct = [
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                },
                {
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZw-JGYmb3JN8hDgvqzg93Xk2FwVyzWnU3Lg0VXhn8g&s",
                    name: "Gạch 1566CB502 60x60 - Hộp",
                    quantity: 1,
                }

            ]
        return(
            <View
                style={styles.ROOT}
            >
                
                <Header
                    headerTx="inforMerchant.DetailExample"
                    LeftIcon={Images.back}
                    style={{height: scaleHeight(52)}}
                    onLeftPress={() => props.navigation.goBack()}
                />
                <View style={styles.body}>
                    <View style={styles.btn1}>
                        <View style={{flexDirection:'row', justifyContent:'space-between',}}>
                            <Text >YCM_{data.id}</Text>
                            <Text 
                                style={{
                                color: data.status ==='Đã giao' ? colors.palette.textExDoing 
                                : data.status ==='Đang giao' 
                                ?  colors.palette.textExDone
                                :  colors.palette.textExCancle,
                                backgroundColor: 
                                 data.status ==='Đã giao' ? colors.palette.blueExDG 
                                : data.status ==='Đang giao' 
                                ?  colors.palette.yallowExDG
                                :  colors.palette.redExDG,
                                justifyContent:'center',
                                borderRadius:8,
                                paddingHorizontal: scaleWidth(padding.padding_8),
                                paddingVertical:scaleHeight(padding.padding_2)
                                }}
                            
                            >{data.status}</Text>
                        </View>
                        <View>
                            <Text>{data.date}</Text>
                        </View>
                    </View>
                    <View style={[styles.btn1, {justifyContent:'center'}]}>
                        
                          {
                            dataUser.map((item,key) =>(
                                // <>
                                //     <Image 
                                    
                                //     source={{uri:item.img}}
                                //     style={{width:32, height: 32}}
                                //     />
                                //     <Text> {item.name} </Text>
                                    
                                // </>
                                 <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <View>
                                        <Image 
                                            source={{uri: item.img}}
                                            style={{width: 40, height: 40}}
                                        />
                                    </View>
                                    
                                    <View>
                                        <Text style={{
                                            fontSize : 15,
                                            fontWeight:'600'

                                        }}>{item.name}</Text>
                                        <Text
                                         style={{color:'#747475'}}
                                        >{item.status}</Text>
                                    </View> 
                                 </View>   
                               
                            ))
                          }          
                              
                    </View>
                    
                    <Text
                        tx="inforMerchant.DetailTitleExample"
                        style={styles.tetxTitle}
                        
                    />
                    <FlatList
                    style={styles.ListProduct}
                    data={dataProduct}
                    renderItem={({item} : {item: dataProduct}) =>(
                        <ItemProducHasResquested item={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }
)