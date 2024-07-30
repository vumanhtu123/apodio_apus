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
import ListSupplierScreen from "./list-supplier-screen";
const ListSuppliersGroupScreen = () => {
    const navigation = useNavigation();

    const [statusHidden, setStatusHidden] = useState(true)
    const [valueIsLoadMore, setValueIsLoadMore] = useState(false)
    const [isLoadMore, setIsLoadMore] = useState<boolean>()

    const [valuerSearch, setValuerSearch] = useState('')
    const { supplierStore } = useStores();
    const [myDataSupplier, setMyDataSupplier] = useState<{}[]>([])
    const [myDataSupplierGroup, setMyDataSupplierGroup] = useState<{}[]>([])


    const page = useRef(0)
    const size = useRef(13)
    const totalPage = useRef<number | undefined>()
    const totalElement = useRef<number>()
    const [isRefreshing, setIsRefreshing] = useState(false)


    const pageSupplier = useRef(0)
    const sizeSupplier = useRef(13)

    const getListSupplierGroup = async () => {
        const ListSupplierGroup = await supplierStore.getListSupplierGroup(size.current, page.current, valuerSearch, valueIsLoadMore)

        if (ListSupplierGroup?.content != null) {
            if (page.current == 0) {
                setMyDataSupplierGroup(ListSupplierGroup.content)
            } else {
                setMyDataSupplierGroup((data) =>
                    [...data,
                    ...ListSupplierGroup.content]
                )
            }
            totalPage.current = ListSupplierGroup.totalPages
            totalElement.current = ListSupplierGroup.totalElements
        }

    }

    const handleLoadMore = () => {
        setValueIsLoadMore(true)
        setIsLoadMore(true)
        try {
            if (page.current < Number(totalPage.current)) {

                page.current = page.current + 1

                getListSupplierGroup()
            }
        } catch (error) {
            console.log("Load more error", error);

        } finally {
            // setIsLoadMore(false)
        }
    }


    const handleRefresh = () => {
        try {
            setIsRefreshing(true)
            page.current = 0
            getListSupplierGroup()
        } catch (error) {
            console.log("Refresh Error", error);
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

    useEffect(() => {
        setIsRefreshing(false)
    }, [myDataSupplierGroup, myDataSupplier])

    useEffect(() => {
        getListSupplierGroup()

        // setDataCategory(data);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList

                data={myDataSupplierGroup}
                showsVerticalScrollIndicator={false}
                // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
                keyExtractor={(item, index) => item.id.toString() + index}
                // onEndReached={handleEndReached}
                // ListFooterComponent={renderFooter}
                numColumns={statusHidden ? 1 : 2}
                key={statusHidden ? 'grid' : 'list'}
                columnWrapperStyle={null}
                renderItem={({ item }) => statusHidden ? <RenderItemSupplierList item={item} /> : <RenderItemSupplierGrid item={item} />}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
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
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}

            />
        </View>
    )
}

export default ListSuppliersGroupScreen