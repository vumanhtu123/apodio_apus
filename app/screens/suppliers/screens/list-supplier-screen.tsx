import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, RefreshControl, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Images } from "../../../../assets/index";
import { Header } from "../../../components/header/header";
import { Text } from "../../../components/text/text";
import {
    colors,
    fontSize,
    padding,
    scaleHeight,
    scaleWidth,
} from "../../../theme";
import { styles } from "../styles/styles";
import { dataSuppliers } from "../styles/data";
import { ScrollView } from "react-native-gesture-handler";
import SelectFilterModal from "../../product/component/modal-select-filter";
import ModalCreateSuppliers from "../component/modal-create-supplier";
import { RenderItemSupplierGrid, RenderItemSupplierList } from "../component/item-list-supplier";
import { useStores } from "../../../models";
import { UserStatus } from "../../../utils/const";

interface PROPS {
    valueSearch: string
}

const ListSupplierScreen = (props: PROPS) => {
    const navigation = useNavigation();
    const [statusHidden, setStatusHidden] = useState(true)
    const [valueIsLoadMore, setValueIsLoadMore] = useState(false)
    const [isLoadMore, setIsLoadMore] = useState<boolean>()
    const [valuerSearch, setValuerSearch] = useState(props.valueSearch)
    const { supplierStore } = useStores();
    const [myDataSupplier, setMyDataSupplier] = useState<{}[]>([])
    const [myDataSupplierGroup, setMyDataSupplierGroup] = useState<{}[]>([])


    const totalPage = useRef<number | undefined>()
    const totalElement = useRef<number>()
    const [isRefreshing, setIsRefreshing] = useState(false)


    const pageSupplier = useRef(0)
    const sizeSupplier = useRef(13)

    const getListSupplier = async () => {
        const ListSupplier = await supplierStore.getListSupplier(pageSupplier.current, sizeSupplier.current, valuerSearch, valueIsLoadMore)

        console.log('333333333', ListSupplier?.data.content);

        if (ListSupplier != null) {
            if (pageSupplier.current == 0) {
                setMyDataSupplier(ListSupplier.data.content)
            } else {
                setMyDataSupplier((data) => [
                    ...data,
                    ...ListSupplier.data.content
                ])
            }

            totalPage.current = ListSupplier.data.totalPages
        }

    }
    useEffect(() => {
        // console.log("length data ", myDataSupplier.length);

        if (myDataSupplierGroup.length == totalElement.current) {
            setIsLoadMore(false)

        } else {
            setIsLoadMore(false)
        }

    }, [myDataSupplierGroup.length])

    // useEffect(() => {
    //     getListSupplier()
    // }, [pageSupplier.current])


    useEffect(() => {
        setIsRefreshing(false)
    }, [myDataSupplierGroup, myDataSupplier])

    useEffect(() => {
        getListSupplier()
        // setDataCategory(data);
    }, []);

    const handleRefreshSupplier = () => {
        try {
            setIsRefreshing(true)
            pageSupplier.current = 0
            getListSupplier()
        } catch (error) {
            console.log("Refresh Supplier Error ", error);
        }

    }
    console.log("page ", pageSupplier.current, "total page", totalPage.current);

    const handleLoadMoreSupplier = () => {
        console.log("dang load more");

        setValueIsLoadMore(true)
        setIsLoadMore(true)
        try {
            if (pageSupplier.current < Number(totalPage.current)) {

                pageSupplier.current = pageSupplier.current + 1

                getListSupplier()
            }
        } catch (error) {
            console.log("Load more error", error);

        } finally {
            setIsLoadMore(false)
        }
    }

    return (
        <View style={{ flex: 1, }}>
            <FlatList

                data={myDataSupplier}
                showsVerticalScrollIndicator={false}
                // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
                keyExtractor={(item, index) => item.id.toString() + index}
                // onEndReached={handleEndReached}
                // ListFooterComponent={renderFooter}
                numColumns={statusHidden ? 1 : 2}
                key={statusHidden ? 'grid' : 'list'}
                columnWrapperStyle={null}
                renderItem={({ item }) => statusHidden ? <RenderItemSupplierList item={item} /> : <RenderItemSupplierGrid item={item} />}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefreshSupplier} />}
                ListFooterComponent={() => {
                    return (
                        <View>
                            {
                                isLoadMore ? null
                                    : <ActivityIndicator />
                            }
                        </View>
                    )
                }}
                onEndReached={() => handleLoadMoreSupplier()}
                onEndReachedThreshold={0.5}
                initialNumToRender={13}
                maxToRenderPerBatch={13}
                windowSize={5}
            />

        </View>
    )
}

export default ListSupplierScreen