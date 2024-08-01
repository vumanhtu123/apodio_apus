import React, { useState } from "react";
import {
  View,
  Text as TextRN,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { styles } from "./modal-create-supplier";
import { Text, TextField } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { InputSelect } from "../../../../components/input-select/inputSelect";
import { Controller, useForm } from "react-hook-form";
import { id } from "date-fns/locale";
import Images from "../../../../../assets/index";

interface ModalAddContactPerson {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

export const ModalAddContactPerson = (props: ModalAddContactPerson) => {
  const { isVisible, setIsVisible } = props;
  const [nickName, setNickName] = useState({ label: "" });
  const [gender, setGender] = useState({ label: "" });

  const {
    control,
    formState: { errors },
  } = useForm({ mode: "all" });
  const dataTest = [
    {
      name: "Chị Nguyễn Thu Thủy",
      gender: "Nam",
      addRess: "BIDV",
      code: "34",
    },
    {
      name: "Anh Nguyễn Văn Duẩn",
      gender: "Nam",
      addRess: "ViettinBank",
      code: "33",
    },
    {
      name: "Chị Nguyễn Thu Hằng",
      gender: "Nữ",
      addRess: "TPBank",
      code: "32",
    },
    {
      name: "Chị Đinh Thị Thu",
      gender: "Nữ",
      addRess: "Agribank",
      code: "31",
    },
  ];

  const arrGender = dataTest.map((item) => {
    return { label: item.gender, id: item.code };
  });
  const arrNickName = dataTest.map((item) => {
    return { label: item.name, id: item.code };
  });

  return (
    <Modal
      isVisible={isVisible}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      style={{
        backgroundColor: "rgba(0,0,0,0.1)",
        margin: 0,
        justifyContent: "flex-end",
        // paddingTop: showMore ? scaleHeight(160) : null,
      }}>
      <View style={[styles.modalView]}>
        <TextRN style={styles.modalText} />

        <View style={styles.header}>
          <Text
            style={styles.headerTitle}
            tx="NCCScreen.addContactPerson"></Text>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Text style={styles.headerButton} tx="common.cancel"></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        <ScrollView
          style={{ height: scaleHeight(570) }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: scaleWidth(15),
              marginTop: scaleHeight(20),
            }}>
            <View style={{ marginRight: scaleWidth(15) }}>
              <TouchableOpacity style={{ marginBottom: 10 }}>
                <Svgs.img_addImg />
              </TouchableOpacity>

              <TouchableOpacity>
                <Svgs.img_Camera />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    // backgroundColor: 'red',
                    end: 5,
                    top: 5,
                    zIndex: 2,
                  }}>
                  <Svgs.ic_Xcircle />
                </TouchableOpacity>

                <Image
                  source={Images.brickTest}
                  style={{
                    width: scaleWidth(107),
                    height: scaleHeight(76),
                    borderRadius: 8,
                    zIndex: 1,
                  }}></Image>
              </View>
            </View>
          </View>

          <InputSelect
            titleTx="NCCScreen.nickName"
            hintTx="NCCScreen.selectNickName"
            arrData={arrNickName}
            dataDefault={nickName.label}
            onPressChoice={(item: any) => {
              setNickName(item);
            }}
            isSearch
            // required
            styleView={{
              marginBottom: scaleWidth(15),
            }}
          />
          <Controller
            control={control}
            name="name"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                labelTx={"NCCScreen.name"}
                placeholderTx={"NCCScreen.placeholderName"}
                // isImportant
                onBlur={onBlur}
                value={value}
                style={{
                  marginBottom: scaleWidth(15),
                }}
                inputStyle={{
                  fontSize: fontSize.size16,
                  fontWeight: "500",
                }}
                RightIconClear={Svgs.icon_delete2}
                onChangeText={(value) => onChange(value)}
                onClearText={() => onChange("")}
                error={errors.name?.message}
              />
            )}
            rules={{ required: "Please Input data" }}
          />
          <Controller
            control={control}
            name="Position"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                labelTx={"NCCScreen.position"}
                placeholderTx={"NCCScreen.placeholderPosition"}
                // isImportant
                onBlur={onBlur}
                value={value}
                style={{
                  marginBottom: scaleWidth(15),
                }}
                inputStyle={{
                  fontSize: fontSize.size16,
                  fontWeight: "500",
                }}
                RightIconClear={Svgs.icon_delete2}
                onChangeText={(value) => onChange(value)}
                onClearText={() => onChange("")}
                error={errors.Position?.message}
              />
            )}
            rules={{ required: "Please Input data" }}
          />
          <InputSelect
            titleTx="NCCScreen.gender"
            hintTx="NCCScreen.placeholderGender"
            arrData={arrGender}
            dataDefault={gender.label}
            onPressChoice={(item: any) => {
              setGender(item);
            }}
            isSearch
            // required
            styleView={{
              marginBottom: scaleWidth(15),
            }}
          />

          <Controller
            control={control}
            name="dateBirth"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                labelTx={"NCCScreen.dayBirth"}
                placeholder={"dd/mm/yyyy"}
                value={value}
                onBlur={onBlur}
                RightIconClear={Svgs.icon_delete2}
                onChangeText={(txt) => onChange(txt)}
                RightIcon={Svgs.ic_Calender_gray}
                onClearText={() => onChange("")}
                style={{
                  marginBottom: scaleWidth(15),
                }}
                inputStyle={{
                  fontSize: fontSize.size16,
                  fontWeight: "500",
                }}
                // isImportant
                error={errors.dateBirth?.message}
              />
            )}
            rules={{ required: "Please Input data" }}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                labelTx={"NCCScreen.phone"}
                placeholderTx={"NCCScreen.enterPhone"}
                value={value}
                onBlur={onBlur}
                RightIconClear={Svgs.icon_delete2}
                onChangeText={(txt) => onChange(txt)}
                RightIcon={Svgs.ic_Calender_gray}
                onClearText={() => onChange("")}
                style={{
                  marginBottom: scaleWidth(15),
                }}
                inputStyle={{
                  fontSize: fontSize.size16,
                  fontWeight: "500",
                }}
                // isImportant
                error={errors.phone?.message}
              />
            )}
            rules={{ required: "Please Input data" }}
          />

          <Controller
            control={control}
            name="Email"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                labelTx={"NCCScreen.email"}
                placeholderTx={"NCCScreen.placeholderEmail"}
                value={value}
                onBlur={onBlur}
                RightIconClear={Svgs.icon_delete2}
                onChangeText={(txt) => onChange(txt)}
                onClearText={() => onChange("")}
                style={{
                  marginBottom: scaleWidth(15),
                }}
                inputStyle={{
                  fontSize: fontSize.size16,
                  fontWeight: "500",
                }}
                // isImportant
                error={errors.Email?.message}
              />
            )}
            rules={{ required: "Please Input data" }}
          />

          <Controller
            control={control}
            name="personalIdentification"
            render={({ field: { onBlur, onChange, value } }) => (
              <TextField
                labelTx={"NCCScreen.personalIdentification"}
                placeholderTx={"NCCScreen.placeholderPersonalIdentification"}
                value={value}
                onBlur={onBlur}
                RightIconClear={Svgs.icon_delete2}
                onChangeText={(txt) => onChange(txt)}
                onClearText={() => onChange("")}
                style={{
                  marginBottom: scaleWidth(15),
                }}
                inputStyle={{
                  fontSize: fontSize.size16,
                  fontWeight: "500",
                }}
                // isImportant
                error={errors.personalIdentification?.message}
              />
            )}
            rules={{ required: "Please Input data" }}
          />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: scaleHeight(15),
          }}>
          <TouchableOpacity
            style={{
              width: scaleWidth(150),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              marginRight: scaleWidth(12),
              borderRadius: 10,
              borderColor: colors.veryLightGrey,
            }}>
            <Text style={{ fontSize: fontSize.size14 }}>Huỷ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: scaleWidth(150),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: colors.navyBlue,
            }}>
            <Text style={{ fontSize: fontSize.size14, color: "white" }}>
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
