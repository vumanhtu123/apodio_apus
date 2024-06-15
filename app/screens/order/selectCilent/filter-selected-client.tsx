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
        const [sort, setSort] = useState<any>()
        const { orderStore } = useStores()

        // console.log('====================================');
        // console.log('tessss', newOrOld);
        // console.log('====================================');
        // console.log('====================================');
        // console.log('tessss2', aToz);
        // console.log('====================================');






        const handleSort = () => {
            orderStore.setSortCreateClient(sort)
            // console.log("sorttttttt", orderStore.sortCreateClient);
            // console.log('====================================');
            // console.log("2222");
            // console.log('====================================');
            props.navigation.navigate('selectClient')
        }


        // console.log("keqqqqqqqq", newOrOld);
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
                            <TouchableOpacity style={[sort == "createdAt,desc" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect, { marginRight: 12 }]}
                                onPress={() => {
                                    setSort('createdAt,desc')

                                }}
                            >
                                <Text tx="selectClient.new" style={{ color: sort == "createdAt,desc" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={sort == "createdAt,asc" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect}
                                onPress={() => setSort('createdAt,asc')}
                            >
                                <Text tx="selectClient.old" style={{ color: sort == "createdAt,asc" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>
                        </View>
                    </View>






                    <View style={{ marginBottom: 20 }}>
                        <Text tx="selectClient.followName" style={Styles.stylesTitle} />
                        <View style={Styles.flexRow}>
                            <TouchableOpacity style={[sort == "name,asc" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect, { marginRight: 12 }]}
                                onPress={() => {
                                    setSort('name,asc')

                                }}
                            >
                                <Text tx="selectClient.aToz" style={{ color: sort == "name,asc" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={sort == "name,desc" ? Styles.stylesBTNSelect : Styles.stylesBTNUnSelect}
                                onPress={() => {
                                    setSort('name,desc')

                                }}
                            >
                                <Text tx="selectClient.zToa" style={{ color: sort == "name,desc" ? colors.palette.navyBlue : colors.palette.dolphin }} />
                            </TouchableOpacity>
                        </View>
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
                            handleSort()

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