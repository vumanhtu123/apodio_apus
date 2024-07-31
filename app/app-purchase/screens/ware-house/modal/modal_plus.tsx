import React, { FC } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { scaleWidth, padding, scaleHeight, colors } from "../../../theme";
import { Text, TextField } from "../../../../components";
import { Controller, useForm } from "react-hook-form";
import { validatePhoneStartsWith } from "../../../utils/validate";
import { Svgs } from "../../../../../assets/svgs";
import { styles } from "../../account_security/styles";

interface ModalCreateGroup {
  //   isVisible?: any;
  setIsVisible?: any;
}

const Modal_Plus: FC<ModalCreateGroup> = (setIsVisible) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Modal animationType="slide" visible={false} transparent={true}>
      <View style={Styles.container}>
        <View
          style={{ alignSelf: "flex-end", marginBottom: 10, marginRight: 6 }}>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <Text tx="wareHouse.createOder" style={[Styles.styleTxT]} />
            <Images.ic_createOder />
          </View> */}

          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <Text tx="wareHouse.createProduct" style={[Styles.styleTxT]} />
            <Images.ic_createProduct />
          </View> */}

          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <Text tx="wareHouse.createBatchProduct" style={[Styles.styleTxT]} />
            <Images.ic_createBatchProduct />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            onPress={() => setIsVisible(!isVisible)}>
            <Images.ic_multifly />
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

export default Modal_Plus;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  // modalView: {
  //     borderRadius: 8,
  //     alignSelf:'flex-end',
  //     paddingEnd:scaleWidth(16),
  //     marginBottom:scaleHeight(12),
  // },
  btnPlus: {
    borderRadius: scaleWidth(40),
    height: scaleWidth(40),
    width: scaleWidth(40),
    backgroundColor: colors.palette.navyBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FFF",
  },

  styleTxT: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#FFF",
    fontSize: scaleWidth(12),
  },
});
