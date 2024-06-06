import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { NavigatorParamList } from "../../../navigators";
import { FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import { Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { colors, scaleHeight } from "../../../theme";
import { Styles } from "./styles";
import { useStores } from "../../../models";


export const FilterSelectScreen: FC<StackScreenProps<NavigatorParamList, "filterSelectScreen">> = observer(
    function filterSelect(props) {
        const [onClick, setOnClick] = useState('successfully')
        const [newOrOld, setnewOrOld] = useState('')
        const [aToz, setaToz] = useState('')
        const [indexTag, setIndexTag] = useState(0)
        const { vendorStore } = useStores()
        const [dataTag, setData] = useState([]);
        const [selectNewOrOld, setselectNewOrOld] = useState(vendorStore.sort[1])

        console.log('====================================');
        console.log('tessss', newOrOld);
        console.log('====================================');




        const handleNewOrOld = () => {
            vendorStore.setSort(newOrOld)
            console.log("sorttttttt", vendorStore.sort);
            props.navigation.navigate('selectClient')
            // initData()
        }


        // console.log("keqqqqqqqq", newOrOld);


        const dataBrick = [
            { name: "selectClient.floorTiles" },
            { name: "selectClient.wallTiles" },
            { name: "selectClient.brick40x40" },
            { name: "selectClient.brick60x60" },
            { name: "selectClient.brick80x80" },


        ]
        return (
            <View style={{ flex: 1 }}>
                <Header
                    headerTx="selectClient.filter"
                    LeftIcon={Images.back}
                    onLeftPress={() => props.navigation.goBack()}

                />

                <View
                    style={{ padding: scaleHeight(16), }}
                >
                    <View style={{ marginBottom: 20 }}>
                        <Text tx="selectClient.timeCreate" style={Styles.stylesTitle} />
                        <View style={Styles.flexRow}>
                            <TouchableOpacity style={[newOrOld == "name,desc" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect, { marginRight: 12 }]}
                                onPress={() => setnewOrOld('name,desc')}
                            >
                                <Text tx="selectClient.new" style={{ color: newOrOld == "name,desc" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={newOrOld == "name,asc" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect}
                                onPress={() => setnewOrOld('name,asc')}
                            >
                                <Text tx="selectClient.old" style={{ color: newOrOld == "name.asc" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text tx="selectClient.followName" style={Styles.stylesTitle} />
                        <View style={Styles.flexRow}>
                            <TouchableOpacity style={[aToz == "aTOz" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect, { marginRight: 12 }]}
                                onPress={() => setaToz('aTOz')}
                            >
                                <Text tx="selectClient.aToz" style={{ color: aToz == "aTOz" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={aToz == "zTOa" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect}
                                onPress={() => setaToz('zTOa')}
                            >
                                <Text tx="selectClient.zToa" style={{ color: aToz == "zTOa" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text tx="selectClient.tag" style={Styles.stylesTitle} />
                        <FlatList
                            data={dataBrick}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={[
                                        indexTag == index ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect,
                                        { margin: scaleHeight(4) }]}

                                        onPress={() => setIndexTag(index)}
                                    >
                                        <Text tx={item.name}
                                            style={{ color: indexTag == index ? colors.palette.navyBlue : colors.palette.dolphin }}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={3}

                        // columnWrapperStyle={{
                        //     flexWrap: 'wrap',
                        //     alignItems: 'flex-start', // Căn trái các item
                        // }}

                        />

                    </View>


                </View>

                <View style={[Styles.stylesBtnBottom, { position: 'absolute', bottom: 0 }]}>
                    <TouchableOpacity
                        style={[onClick === 'save' ? Styles.btnSuccessfully : Styles.btnSave, { marginRight: 13 }]}

                    >
                        <Text
                            style={{ color: onClick === 'save' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="common.cancel"
                        >

                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={onClick === 'successfully' ? Styles.btnSuccessfully : Styles.btnSave}
                        onPress={() => {
                            handleNewOrOld()

                        }}

                    >
                        <Text
                            style={{ color: onClick === 'successfully' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="common.confirm"
                        >
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
)