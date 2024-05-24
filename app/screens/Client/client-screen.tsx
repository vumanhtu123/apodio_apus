import { useNavigation } from "@react-navigation/native"
import React, { FC, useState } from "react"
import { FlatList, Platform, TouchableOpacity, View } from "react-native"
import { Images } from "../../../assets/index"
import { Header } from '../../components/header/header'
import { Text } from "../../components/text/text"
import { colors, fontSize, padding, scaleHeight, scaleWidth } from "../../theme"
import { Screen } from "../../components/screen/screen"
// import SelectFilterModal from "./modal-select-filter"
import { styles } from "./styles"
import { dataSuppliers } from "./data"
import SelectFilterModal from "./modal/modal-select-filter"
import ModalCreateSuppliers from "./modal/modal-create-supplier"
import { ScrollView } from "react-native-gesture-handler"
import ModalCreateClientFromNumber from "./modal/modal-create-clientFromPhone"
import ModalCreateClientGroup from "./modal/modal-create-clientGroup"
import { set } from "date-fns"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators/app-navigator"
import { observer } from "mobx-react-lite"

export const ClientScreen: FC<StackScreenProps<NavigatorParamList, 'clientScreen'>> = observer(

    function client({ route }) {

        const navigation = useNavigation()
        const [typeNoti, setTypeNoti] = useState(['Tất cả', 'Hà Nội'])
        const [indexItem, setIndexItem] = useState(0)
        const [btnTab, setBtnTab] = useState(['ClientScreen.groupClient', 'ClientScreen.btnAddClient'])
        const [activeTab, setActiveTab] = useState('client');
        const [isVisible, setIsVisible] = useState(false);
        const [typeFilter, setTypeFilter] = useState('');
        const [OpenCreateGroup, setOpenCreateGroup] = useState(false)


        // console.log(btnTab,'doandev');


        const handleTabPress = (tab: any) => {
            setActiveTab(tab);
        };
        const [openSearch, setOpenSearch] = useState(false);
        const handleOpenSearch = () => {
            setOpenSearch(!openSearch);
        }
        const openTypeFilter = () => {
            setIsVisible(true)
        }

        const goBack = () => {
            navigation.goBack()
        }
        // const {dataOpen} = route.params;
        // console.log(dataOpen);

        // const [isVisibleCreateOnPhone, setisVisibleCreateOnphone] = useState(dataOpen);

        // console.log(isVisibleCreateOnPhone,'bbbb');
        const renderKHItem = ({ item }: any) => {
            return (
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: scaleWidth(375), height: scaleHeight(56), paddingHorizontal: 16, backgroundColor: 'white', marginBottom: 1.5, justifyContent: 'space-between' }}
                    onPress={() => navigation.navigate('detailClient')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: 40, height: 40, backgroundColor: '#EFF8FF', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: fontSize.size10, color: '#0078D4' }}>{item.code}</Text>
                        </View>
                        <View style={{ marginHorizontal: 6 }}>
                            <Text style={{ fontSize: fontSize.size10 }}>{item.name}</Text>
                            <Text style={{ fontSize: fontSize.size10, color: '#747475' }}>{item.phone}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Images.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} />
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }

        const renderItemNKH = ({ item }: any) => {
            return (
                <TouchableOpacity
                    style={{ padding: scaleWidth(padding.padding_10), backgroundColor: '#FFF', marginBottom: 10 }}
                    onPress={() => navigation.navigate('addClientToGroup', { dataItem: item })}
                >
                    <Text>{item.nameGroup}</Text>
                    <Text>{item.quantityClient}</Text>
                </TouchableOpacity>
            )
        }
        const dataClientGroup = [
            {
                id: '1',
                nameGroup: "Nhóm Hà Nội",
                quantityClient: "3 Khách hàng"
            },
            {
                id: '2',
                nameGroup: "Nhóm Hồ Chí Minh",
                quantityClient: "1 Khách hàng"
            },
            {
                id: '3',
                nameGroup: "Nhóm Hải Phòng",
                quantityClient: "2 Khách hàng"
            }
        ]
        return (
            <View style={styles.ROOT}>
                <Header
                    type={"AntDesign"}
                    LeftIcon={Images.back}
                    onLeftPress={goBack}
                    colorIcon={colors.text}
                    headerTx="ClientScreen.client"
                    RightIcon={Images.icon_funnel}
                    RightIcon1={openSearch ? Images.icon_close : Images.search}
                    headerInput={openSearch}
                    onRightPress={openTypeFilter}
                    onRightPress1={handleOpenSearch}
                    widthRightIcon={scaleWidth(16)}
                    heightRightIcon={scaleHeight(16)}
                    style={{ height: scaleHeight(54) }}
                    titleMiddleStyle={{ paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }}
                    titleStyle={{ fontSize: fontSize.size16, fontWeight: '700' }}
                />
                <View style={styles.ROOT}>
                    <View style={styles.rowBtnTab}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: '#E6E7EA',
                            borderRadius: 8,
                            padding: 2,
                            marginTop: 20
                            // justifyContent : 'center', alignItems:'center',
                            // width : scaleWidth(169),
                            // height : scaleHeight(29)
                        }} >
                            {btnTab.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleTabPress(index === 0 ? 'client' : 'groupClient')}
                                        key={index}
                                        style={[
                                            styles.buttonProduct,
                                            activeTab === (index === 0 ? 'client' : 'groupClient') && styles.activeButton,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                activeTab === (index === 0 ? 'client' : 'groupClient') && styles.activeButtonText,
                                            ]}
                                            tx={item}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    {openSearch &&
                        <View style={styles.rowNotiType}>
                            <TouchableOpacity onPress={() => console.log('ok')} style={{ marginRight: scaleWidth(8) }}>
                                <Images.squaresFour width={20} height={20} />
                            </TouchableOpacity>
                            {typeNoti.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIndexItem(index)
                                        }}
                                        key={index}
                                        style={{
                                            backgroundColor: index == indexItem ? '#FFFfff' : '#F4F4F4',
                                            borderRadius: 8,
                                            paddingHorizontal: 8,
                                            paddingVertical: 8,
                                            marginRight: 10,
                                            borderWidth: 1,
                                            borderColor: index == indexItem ? '#0078D4' : '#c8c8c8'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: index == indexItem ? '#0078D4' : '#747475',
                                                textAlign: 'center',
                                                fontWeight: '700',
                                                fontSize: fontSize.size10,
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    }
                    {
                        activeTab === 'client' ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={dataSuppliers}
                                    showsVerticalScrollIndicator={false}
                                    // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
                                    keyExtractor={(item) => item.id.toString()}
                                    // onEndReached={handleEndReached}
                                    onEndReachedThreshold={0.8}
                                    // ListFooterComponent={renderFooter}
                                    numColumns={1}
                                    columnWrapperStyle={null}
                                    renderItem={renderKHItem}
                                />
                                <TouchableOpacity style={{
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 30, position: 'absolute', paddingHorizontal: scaleWidth(18),
                                    paddingVertical: scaleHeight(8),
                                    backgroundColor: colors.palette.navyBlue,
                                    bottom: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(5),
                                    right: scaleWidth(16)
                                }}>
                                    <Images.icon_plus width={scaleWidth(16)} height={scaleHeight(16)} style={{ marginRight: 6, marginTop: 2 }} />
                                    <Text style={{ color: 'white', fontSize: fontSize.size14 }}>Thêm khách hàng</Text>
                                </TouchableOpacity>
                            </View>


                            :

                            <View style={{ flex: 1, }}>
                                <FlatList
                                    data={dataClientGroup}
                                    renderItem={renderItemNKH}
                                    numColumns={1}
                                />

                                <TouchableOpacity style={{
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 30, position: 'absolute', paddingHorizontal: scaleWidth(18),
                                    paddingVertical: scaleHeight(8),
                                    backgroundColor: colors.palette.navyBlue,
                                    bottom: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(5),
                                    right: scaleWidth(16)
                                }}
                                    onPress={() => setOpenCreateGroup(!OpenCreateGroup)}
                                >
                                    <Images.icon_plus width={scaleWidth(16)} height={scaleHeight(16)} style={{ marginRight: 6, marginTop: 2 }} />
                                    <Text style={{ color: 'white', fontSize: fontSize.size14 }}>Tạo nhóm</Text>
                                </TouchableOpacity>
                            </View>

                    }

                </View>



                {/* 
                {
                    isVisibleCreateOnPhone ? */}
                <SelectFilterModal
                    isVisible={isVisible}
                    setIsVisible={() => {
                        console.log(isVisible);
                        setIsVisible(!isVisible)
                    }}

                />
                <ModalCreateClientGroup
                    isVisible={OpenCreateGroup}
                    setIsVisible={() => setOpenCreateGroup(!OpenCreateGroup)}
                />
                {/* :
                    <ModalCreateClientFromNumber
                    isVisible={isVisibleCreateOnPhone}
                    setIsVisible={setisVisibleCreateOnphone}
                    />
    
                }
                 */}


                {/* <ModalCreateClientFromNumber
                    isVisible= {}
                    setactiveSlide={}
                /> */}
                {/* <ModalCreateSuppliers
                    isVisible = {true}
    
                /> */}
            </View >
        )
    }

)