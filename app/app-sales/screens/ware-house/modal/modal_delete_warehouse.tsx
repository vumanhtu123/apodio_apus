import React from "react"
import { TouchableOpacity, View } from "react-native"
import { CustomModal } from "../../../../app-purchase/components/custom-modal"
import { Text } from "../../../../app-purchase/components"
import { colors, fontSize, padding, scaleHeight, scaleWidth } from "../../../theme"
import { Styles } from "../style"
import en from "../../../i18n/en"
import { useStores } from "../../../models"
import { Dialog } from "../../../../app-purchase/components/dialog-notification"
import { translate } from "../../../i18n"


interface Props {
    isVisible: boolean,
    setIsVisible: any,
    dataCodeWarehouse: string,
    idDetailWarehouse: number,
    handleBack: () => void
}

export const ModalDeleteWareHouse = (props: Props) => {

    const getAPI = useStores()

    const cancel = () => {
        props.setIsVisible(!props.isVisible)
    }

    const accepter = () => {
        getAPI.warehouseStore.deleteWarehouse(props.idDetailWarehouse).then((data: any) => {
            console.log('dataDelete', data?.message);
            if (data?.message === 'Success') {
                Dialog.show({
                    title: translate("txtDialog.txt_title_dialog"),
                    button: '',
                    button2: translate("common.ok"),
                    textBody: en.wareHouse.messengerSucces,
                    closeOnOverlayTap: false,
                    onPressButton: () => {
                        console.log('doantesttt');
                        Dialog.hide();
                        props.handleBack()
                    }
                })
            } else {
                Dialog.show({
                    title: translate("productScreen.Notification"),
                    button: translate("common.ok"),
                    textBody: data?.message + en.wareHouse.messengerFail,
                    closeOnOverlayTap: false
                })
            }

        })

    }

    console.log('dataCode', props.idDetailWarehouse);

    return (
        <CustomModal
            isVisible={props.isVisible}
            setIsVisible={() => props.setIsVisible}
        >
            <View
                style={{}}
            >
                <Text
                    style={{ fontSize: fontSize.size18, fontWeight: '700', alignSelf: 'center' }}
                    tx="wareHouse.confirm"
                ></Text>
                <Text
                    style={{
                        fontSize: fontSize.size14,
                        marginVertical: scaleHeight(10),
                        alignSelf: 'center'
                    }}
                >{en.wareHouse.titleConfirm} {props.dataCodeWarehouse} {en.wareHouse.this} </Text>

                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: fontSize.size10,
                        color: colors.palette.dolphin,
                        marginBottom: scaleHeight(23)
                    }}
                    tx="wareHouse.warning"
                >

                </Text>
                <View
                    style={{ flexDirection: 'row' }}
                >
                    <TouchableOpacity
                        style={Styles.styleBtnCancel}
                        onPress={() => cancel()}
                    >
                        <Text tx="common.cancel"
                            style={{ color: colors.palette.dolphin, fontWeight: '500' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Styles.styleBtnConfirm}
                        onPress={() => accepter()}
                    >
                        <Text tx="productScreen.BtnNotificationDeleteFail"
                            style={{ fontWeight: '700', color: colors.palette.white }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </CustomModal>
    )
}