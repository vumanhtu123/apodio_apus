import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  Text as TextRN,
  TouchableOpacity,
  View,
} from "react-native";
import { Images } from "../../../../assets";
import { TextField } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { translate } from "../../../i18n/translate";

const ModalCreateSuppliers = (props: any) => {
  const { isVisible, setType, setIsVisible } = props;
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [selectedIndexes, setSelectedIndexes] = useState<number[][]>([[], []]);

  const arrTest = [
    {
      name: "An Giang",
      slug: "an-giang",
      type: "tinh",
      name_with_type: "Tỉnh An Giang",
      code: "89",
    },
    {
      name: "Kon Tum",
      slug: "kon-tum",
      type: "tinh",
      name_with_type: "Tỉnh Kon Tum",
      code: "62",
    },
    {
      name: "Đắk Nông",
      slug: "dak-nong",
      type: "tinh",
      name_with_type: "Tỉnh Đắk Nông",
      code: "67",
    },
    {
      name: "Sóc Trăng",
      slug: "soc-trang",
      type: "tinh",
      name_with_type: "Tỉnh Sóc Trăng",
      code: "94",
    },
    {
      name: "Bình Phước",
      slug: "binh-phuoc",
      type: "tinh",
      name_with_type: "Tỉnh Bình Phước",
      code: "70",
    },
    {
      name: "Hưng Yên",
      slug: "hung-yen",
      type: "tinh",
      name_with_type: "Tỉnh Hưng Yên",
      code: "33",
    },
    {
      name: "Thanh Hóa",
      slug: "thanh-hoa",
      type: "tinh",
      name_with_type: "Tỉnh Thanh Hóa",
      code: "38",
    },
    {
      name: "Quảng Trị",
      slug: "quang-tri",
      type: "tinh",
      name_with_type: "Tỉnh Quảng Trị",
      code: "45",
    },
  ];
  const arrCity = arrTest.map((item) => {
    return { label: item.name, id: item.code };
  });
  const [city, setCity] = useState({ label: "" });
  const dataArray = [
    {
      label: "NCCScreen.phone",
      placeholder: "NCCScreen.placeholderPhone",
      name: "phoneNumber",
    },
    {
      label: "NCCScreen.email",
      placeholder: "NCCScreen.placeholderEmail",
      name: "email",
    },
    {
      label: "NCCScreen.idCard",
      placeholder: "NCCScreen.placeHolderIdCard",
      name: "identityNumber",
    },
  ];
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TextRN style={styles.modalText} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Tạo mới nhà cung cấp</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text style={styles.headerButton}>Hủy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginBottom: scaleHeight(15),
                marginTop: scaleWidth(20),
              }}>
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField
                    // maxLength={maxLenngthPhoneNumber}
                    keyboardType={null}
                    labelTx={"NCCScreen.idSupliers"}
                    style={{
                      marginBottom: scaleHeight(5),
                      justifyContent: "center",
                    }}
                    inputStyle={{
                      fontSize: fontSize.size16,
                      fontWeight: "500",
                    }}
                    value={value}
                    onBlur={onBlur}
                    RightIconClear={Images.icon_delete2}
                    error={errors?.suplierId?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => onChange(value)}
                    placeholder="Ví dụ: NCC00001"
                  />
                )}
                // defaultValue={''}
                name="suplierId"
                rules={{
                  required: translate('ruleController.emptyText'),
                }}
              />
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField
                    // maxLength={maxLenngthPhoneNumber}
                    keyboardType={null}
                    labelTx={"NCCScreen.nameSuppliers"}
                    style={{
                      // marginBottom: scaleHeight(10),
                      marginBottom: scaleHeight(5),
                      justifyContent: "center",
                    }}
                    inputStyle={{
                      fontSize: fontSize.size16,
                      fontWeight: "500",
                    }}
                    value={value}
                    onBlur={onBlur}
                    RightIconClear={Images.icon_delete2}
                    error={errors?.nameSuppliers?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => onChange(value)}
                    placeholder="Ví dụ: Công ty TNHH Hà Nội"
                  />
                )}
                // defaultValue={''}
                name="nameSuppliers"
                rules={{
                  required: translate('ruleController.emptyText'),
                }}
              />
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField
                    // maxLength={maxLenngthPhoneNumber}
                    keyboardType={null}
                    labelTx={"NCCScreen.nameSuppliers"}
                    style={{
                      // marginBottom: scaleHeight(10),
                      marginBottom: scaleHeight(5),
                      justifyContent: "center",
                    }}
                    inputStyle={{
                      fontSize: fontSize.size16,
                      fontWeight: "500",
                    }}
                    value={value}
                    onBlur={onBlur}
                    RightIconClear={Images.icon_delete2}
                    error={errors?.nameSuppliers?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => onChange(value)}
                    placeholder="Ví dụ: Công ty TNHH Hà Nội"
                  />
                )}
                // defaultValue={''}
                name="nameSuppliers"
                rules={{
                  required: translate('ruleController.emptyText'),
                }}
              />
              <InputSelect
                titleText="Kiểu"
                hintText="Chọn kiểu NCC"
                isSearch
                required={true}
                arrData={arrCity}
                dataDefault={city.label}
                onPressChoice={(item: any) => {
                  setCity(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
              <InputSelect
                titleText="Nhóm NCC"
                hintText="Chọn nhóm NCC"
                isSearch
                required={true}
                arrData={arrCity}
                dataDefault={city.label}
                onPressChoice={(item: any) => {
                  setCity(item);
                }}
                styleView={{ marginBottom: scaleHeight(10) }}
              />
            </View>
            <Text style={styles.headerTitle}>Thông tin định danh</Text>
            <View
              style={{
                marginTop: scaleHeight(15),
                marginBottom: scaleHeight(20),
              }}>
              <FlatList
                data={dataArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextField
                        keyboardType={null}
                        labelTx={item.label}
                        style={{
                          marginBottom: scaleHeight(10),
                          // marginTop: scaleWidth(10),
                          justifyContent: "center",
                        }}
                        inputStyle={{
                          fontSize: fontSize.size16,
                          fontWeight: "500",
                        }}
                        value={value}
                        onBlur={onBlur}
                        RightIconClear={Images.icon_delete2}
                        error={errors?.[item.name]?.message}
                        onClearText={() => onChange("")}
                        onChangeText={(value) => onChange(value)}
                        placeholderTx={item.placeholder}
                      />
                    )}
                    name={item.name}
                    rules={{required: translate('ruleController.emptyText'),}}
                  />
                )}
              />
            </View>
            <Text style={styles.headerTitle}>Thông tin địa chỉ</Text>
            <View
              style={{
                marginTop: scaleHeight(15),
                marginBottom: scaleHeight(20),
              }}>
              <InputSelect
                titleText="Tỉnh/Thành phố"
                hintText="Chọn tỉnh/thành phố"
                isSearch
                required={true}
                arrData={arrCity}
                dataDefault={city.label}
                onPressChoice={(item: any) => {
                  setCity(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
              <InputSelect
                titleText="Quận/Huyện"
                hintText="Chọn quận/huyện"
                isSearch
                required={true}
                arrData={arrCity}
                dataDefault={city.label}
                onPressChoice={(item: any) => {
                  setCity(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
              <InputSelect
                titleText="Phường/Xã"
                hintText="Chọn phường/xã"
                isSearch
                required={true}
                arrData={arrCity}
                dataDefault={city.label}
                onPressChoice={(item: any) => {
                  setCity(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField
                    // maxLength={maxLenngthPhoneNumber}
                    keyboardType={null}
                    labelTx={"NCCScreen.address"}
                    style={{
                      // marginBottom: scaleHeight(10),
                      marginBottom: scaleHeight(5),
                      justifyContent: "center",
                    }}
                    inputStyle={{
                      fontSize: fontSize.size16,
                      fontWeight: "500",
                    }}
                    value={value}
                    onBlur={onBlur}
                    RightIconClear={Images.icon_delete2}
                    error={errors?.nameSuppliers?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => onChange(value)}
                    placeholderTx={"NCCScreen.placeholderAddress"}
                  />
                )}
                // defaultValue={''}
                name="nameSuppliers"
                rules={{
                  required: translate('ruleController.emptyText'),
                }}
              />
            </View>
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
                borderColor: "#c8c8c8",
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
                backgroundColor: "#0078d4",
              }}>
              <Text style={{ fontSize: fontSize.size14, color: "white" }}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: scaleHeight(8),
    // paddingBottom: 5,
    paddingHorizontal: scaleWidth(15),
    marginTop: scaleHeight(60),
  },
  modalText: {
    textAlign: "center",
    width: scaleWidth(68),
    height: scaleHeight(5),
    backgroundColor: "#C7C7C7",
    borderRadius: 8,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: fontSize.size14,
    fontWeight: "700",
    color: "black",
    marginLeft: 8,
    // lineHeight : 17
  },
  headerButton: {
    fontSize: 16,
    color: "red",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
  radioButton: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10
  },
  radioButtonSelected: {
    width: 14,
    height: 14,
    borderRadius: 6,
    backgroundColor: "#0078d4",
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "black",
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#E7EFFF",
    marginTop: scaleHeight(18),
    // marginBottom: 18,
  },
  cancel: {
    fontSize: fontSize.size14,
    color: "#FF0000",
    fontWeight: "700",
    lineHeight: scaleHeight(24),
  },
});

export default ModalCreateSuppliers;
