import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { AppStackParamList } from '../../../navigators';
import { observer } from 'mobx-react-lite';
import { Header } from '../../../components';
import { Images } from '../../../../assets';
import { padding, scaleHeight, scaleWidth } from '../../../theme';
import { Text } from '../../../components';
import { FlashList } from '@shopify/flash-list';
import { Styles } from './styles';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import CategoryModal from './modal-directory';
import ArrangeModal from './modal-arrange';
import { fi } from 'date-fns/locale';



const ResquestExample: FC<StackScreenProps<AppStackParamList, "resquestEample">> = observer(

    function resquestExample(props) {

        // const [clickIteam, setclickItem] = useState(null)

        const dataResquestExample = [
            {
                id: 1,
                img: 'https://showroomviglacera.vn/wp-content/uploads/2019/10/gach-granite-la-gi-2.jpg',
                name: "gach 36815",
                price: "35.000.000",
                quantity: 500
            },
            {
                id: 2,
                img: 'https://showroomviglacera.vn/wp-content/uploads/2019/10/gach-granite-la-gi-2.jpg',
                name: "gach 36815",
                price: "35.000.000",
                quantity: 500
            },
            {
                id: 3,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jdPf0oxoMId9-7JhknUWcaCgS_4cxa7Uk-scKhybcw&s',
                name: "gach 36815",
                price: "35.000.000",
                quantity: 500
            },
            {
                id: 4,
                img: 'https://thietbivesinhviet.com/wp-content/uploads/2022/08/gach-do-viglacera-40x40-ha-long.jpg',
                name: "gach 36815",
                price: "35.000.000",
                quantity: 500
            },
            {
                id: 5,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jdPf0oxoMId9-7JhknUWcaCgS_4cxa7Uk-scKhybcw&s',
                name: "gach 36815",
                price: "35.000.000",
                quantity: 500
            },
            {
                id: 6,
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jdPf0oxoMId9-7JhknUWcaCgS_4cxa7Uk-scKhybcw&s',
                name: "gach 36815",
                price: "35.000.000",
                quantity: 500
            }
        ]


        const [newData, setnewData] = useState([]);

        console.log(newData);
        const [openDirectory, setopenDirectory] = useState(false);
        const [openArrange, setOpenArrange] = useState(false);



        const RenderItem = ({ item }) => {

            var [dataIndex, setdataIndex] = useState([item.id]);
            var team;
            const [isValueInArray, setisValueInArray] = useState('');
            const [count, setCount] = useState(0);
            // console.log(dataIndex)
            // useRef

            // if (count === 0){
            //     Alert.alert('ok')
            // }

            return (


                <TouchableOpacity style={Styles.item}

                    onPress={() => {

                        // setclickItem(item)
                        // console.log(item.id)
                        team = item.id
                        const issValueInArray = dataIndex.includes(team); // true
                        setCount(count + 1)
                        setisValueInArray(issValueInArray)

                        console.log(isValueInArray)


                    }}
                >

                    {
                        isValueInArray ?
                            <View style={{}}>
                                <ImageBackground
                                    source={{ uri: item.img }}
                                    style={{ width: scaleWidth(107), height: scaleHeight(50), alignItems: 'center' }}
                                    borderTopLeftRadius={10}
                                    borderTopRightRadius={10}
                                >
                                    {
                                        count != 0 ?
                                            <View style={{
                                                backgroundColor: '#FFFFFF',
                                                marginHorizontal: scaleWidth(5),
                                                marginTop: scaleHeight(5),
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly',
                                                alignItems: 'center',
                                                borderRadius: 8
                                            }}>

                                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                                    onPress={() => setCount(count - 1)}
                                                >
                                                    <Images.ic_minus />
                                                </TouchableOpacity>
                                                <Text
                                                    style={{ width: scaleWidth(50), height: scaleHeight(24), textAlign: 'center' }}
                                                // value={selectedItem.name}


                                                >
                                                    {count}
                                                </Text>
                                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                                    onPress={() => {
                                                        var dataObj = [{
                                                            ...item,
                                                            count
                                                        }]
                                                        var arrNew = dataResquestExample.map((item) => {
                                                            return{
                                                                dataObj
                                                            }
                                                        })
                                                        console.log(arrNew)
                                                        return (
                                                         
                                                            // đang lấy id để so sánh nhưng chưa lấy đc
                                                            // setnewData(dataObj),
                                                            setCount(count + 1)
                                                        )
                                                    }}
                                                >
                                                    <Images.ic_plus_green

                                                    />

                                                </TouchableOpacity>
                                            </View>
                                            :
                                            null
                                    }
                                    {count != 0 ?

                                        <Text style={{ fontSize: 10, color: "#FFFFFF", fontWeight: '400' }}>Còn: {item.quantity}</Text>
                                        :
                                        null
                                    }

                                </ImageBackground>
                            </View>


                            :
                            <ImageBackground
                                source={{ uri: item.img }}
                                style={{ width: scaleWidth(107), height: scaleHeight(50) }}
                                borderTopLeftRadius={10}
                                borderTopRightRadius={10}
                            >

                            </ImageBackground>

                    }

                    <View style={{
                        width: scaleWidth(107),
                        height: scaleHeight(50),
                        padding: 10,
                        backgroundColor: '#FFFFFF',
                        alignItems: 'center',
                        borderBottomStartRadius: 10,
                        borderBottomEndRadius: 10
                    }}>

                        <Text style={{ fontSize: 10, color: '#747475' }}>{item.name}</Text>
                        <Text style={{ fontSize: 10, fontWeight: '600' }}>{item.price}</Text>
                    </View>

                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <Header
                    LeftIcon={Images.back}
                    headerTx='inforMerchant.ResquestExample'
                    titleStyle={{ alignSelf: 'flex-start' }}
                    headerInput={true}
                    style={{ height: 60 }}
                    RightIcon1={Images.ic_arrange}
                    RightIcon2={Images.ic_gridLayout}
                    onRightPress1={() => setOpenArrange(!openArrange)}
                    widthRightIcon={16}
                    heightRightIcon={16}
                    onLeftPress={() => props.navigation.goBack()}
                />
                <View style={{ flex: 1, padding: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => setopenDirectory(!openDirectory)}
                        >
                            <Images.ic_category />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{

                                borderWidth: 1,
                                paddingHorizontal: scaleWidth(8),
                                paddingVertical: scaleHeight(6),
                                borderRadius: 4,
                                borderBlockColor: '#0078D4',
                                marginHorizontal: scaleWidth(8)
                            }}
                        >
                            <Text
                                style={{ fontSize: 10 }}
                                tx='inforMerchant.btnAll'
                            />


                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{

                                borderWidth: 1,
                                paddingHorizontal: scaleWidth(8),
                                paddingVertical: scaleHeight(6),
                                borderRadius: 4,
                                borderBlockColor: '#0078D4',
                                marginHorizontal: scaleWidth(8)
                            }}
                        >
                            <Text
                                style={{ fontSize: 10 }}
                                tx='inforMerchant.Apodio'
                            />

                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, marginTop: 12 }}>

                        <FlashList
                            data={dataResquestExample}
                            numColumns={3}
                            renderItem={({ item, index }) => {
                                return (
                                    <RenderItem item={item} />
                                )
                            }}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>


                    <TouchableOpacity
                        style={Styles.btnContinue}
                    >
                        <Text
                            style={Styles.txtBtn}
                            tx='ExampleScreen.btnContinue'
                        />
                    </TouchableOpacity>







                </View>


                <CategoryModal
                    isVisible={openDirectory}
                    setIsVisible={() => setopenDirectory(!openDirectory)}
                />
                <ArrangeModal
                    isVisible={openArrange}
                    setIsVisible={() => setOpenArrange(!openArrange)}
                />


            </View>

        )
    }
)

export default ResquestExample;