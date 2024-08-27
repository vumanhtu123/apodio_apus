import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { NavigatorParamList } from "../../../navigators";
import { FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import { Header, Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../../theme";
import { Styles } from "./styles";
import { useStores } from "../../../models";


export const FilterSelectScreen: FC<StackScreenProps<NavigatorParamList, "filterSelectScreen">> = observer(
    function filterSelect(props) {
        const [onClick, setOnClick] = useState('successfully')
        const [sort, setSort] = useState<any>()
        const [MyDataTag, setMyDataTag] = useState<any>()
        const [selectedTagId, setSelectedTagId] = useState<any>([])
        const { orderStore } = useStores()

        const getDataTag = () => {
            orderStore.getListTagClient(true).then((data) => {
                const MyDataTag = data?.content.map((item) => {
                    return {
                        id: item.id,
                        name: item.name
                    }
                })
                setMyDataTag(MyDataTag)
            })
        }

        useEffect(() => {
            getDataTag()
        }, [props.navigation])

        const handleItemTagPress = (id: number) => {
            setSelectedTagId((prevSelectedIds: any) => {
                if (prevSelectedIds.includes(id)) {
                    // Nếu ID đã được chọn, loại bỏ nó khỏi mảng
                    return prevSelectedIds.filter((itemId: any) => itemId !== id);
                } else {
                    // Nếu ID chưa được chọn, thêm nó vào mảng
                    return [...prevSelectedIds, id];
                }
            });
        };

        const handleSort = () => {
            orderStore.setSortCreateClient(sort)
            props.navigation.navigate({ name: 'selectClient', params: { myTag: selectedTagId } } as never)
        }

        console.log("arr data item tag", selectedTagId);
        return (
            <View style={{ flex: 1 }}>
                <Header
                    headerTx="selectClient.filter"
                    LeftIcon={Svgs.back}
                    onLeftPress={() => props.navigation.goBack()}
                />
                <View
                    style={{ padding: scaleHeight(16), }}
                >
                    <View style={{ marginBottom: scaleWidth(20) }}>
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
                    <View style={{ marginBottom: scaleWidth(20) }}>
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
                    <View>
                        <Text tx="selectClient.tag" style={Styles.stylesTitle} />
                        <FlatList
                            // horizontal={true}
                            data={MyDataTag}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{
                                        width: scaleWidth(109),
                                        height: scaleHeight(38),
                                        borderRadius: 8,
                                        backgroundColor: selectedTagId.includes(item.id) ? colors.palette.aliceBlue2 : colors.aliceBlue,
                                        borderWidth: 1,
                                        borderColor: selectedTagId.includes(item.id) ? colors.palette.navyBlue : colors.aliceBlue,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: scaleWidth(8),
                                        marginBottom: scaleHeight(8)
                                    }}
                                        onPress={() => {
                                            handleItemTagPress(item.id)
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "400",
                                                fontSize: fontSize.size10,
                                                color: colors.palette.dolphin
                                            }}
                                        >{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={3}
                        />
                    </View>
                </View>
                <View style={[Styles.stylesBtnBottom, { position: 'absolute', bottom: 0 }]}>
                    <TouchableOpacity
                        style={[onClick === 'save' ? Styles.btnSuccessfully : Styles.btnSave, { marginRight: 13 }]}
                        onPress={() => props.navigation.goBack()}
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