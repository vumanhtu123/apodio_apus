
import React from "react"
import { FC, } from "react"
import Modal from 'react-native-modal'
import { Styles } from "../screen/styles"
import { margin, scaleHeight, scaleWidth } from "../../../theme"
import { View, FlatList } from "react-native"
import { ItemListExChange } from "./ItemListExChange"
import { Text } from "../../../components"


interface propModal {
    isVisible?: boolean,
    setIsVisible: () => void
}

export const ModalExchange: FC<propModal> = ({ isVisible, setIsVisible }) => {
    const dataExchangeFake = [
        {
            id: "1",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2E8SKxvKGS9RRCBV8jJexC-tKbiQeGu_Eyw&s",
            name: "Nguyễn Thị Lan",
            timeCreate: " 14 phút trước",
            content: "That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback."
        },
        {
            id: "2",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2dj-B66E69sCgb-EZae-xo5yhQJ4Jr1L-w&s",
            name: "Phạm Thị Hồng",
            timeCreate: " 16 phút trước",
            content: "That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback."
        },
        {
            id: "3",
            avatar: "https://khunganhonline.com/uploads/worigin/2023/08/16/khung-anh-avatar-tet-202464dc708b3fc79_7b0a90420475b9bc85075a4824484f8d.jpg",
            name: "Cao Văn Minh",
            timeCreate: " 20 phút trước",
            content: "That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback."
        }

    ]



    return (
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={750}
            isVisible={isVisible}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            avoidKeyboard={true}
            onBackdropPress={() => setIsVisible}
        >
            <View style={Styles.modalView}>

                <View style={{
                    width: scaleWidth(68),
                    height: scaleHeight(5),
                    backgroundColor: '#C7C7C7',
                    borderRadius: margin.margin_8,
                    marginBottom: scaleWidth(25),
                    alignSelf: 'center'
                }} />

                <FlatList
                    data={dataExchangeFake}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        )
                    }}
                />



            </View>

        </Modal>
    )
}