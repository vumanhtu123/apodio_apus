/** @format */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Text as TextRN,
  Alert,
} from "react-native";
import { SvgIcon } from "../../../../components/svg-icon/index";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { navigate } from "../../../navigators";
import { useNavigation } from "@react-navigation/native";
import { Svgs } from "../../../../../assets/svgs";
import { Text, TextField } from "../../../../components";
import { Controller, useForm } from "react-hook-form";
import { InputSelect } from "../../../../components/input-select/inputSelect";
import Modal from "react-native-modal";
import { is } from "date-fns/locale";
import { ModalAddAnotherAddrest } from "./modal-add-another-address";
import { ModalAddBank } from "./modal-add-bank";
import { number } from "mobx-state-tree/dist/internal";
import { ModalAddContactPerson } from "./modal-add-contact-person";

interface ModalProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const ModalCreateSuppliers = (props: ModalProps) => {
  const { isVisible, setIsVisible } = props;
  const [showMore, setShowMore] = useState(false);
  const [modalAddBank, setmodalAddBank] = useState(false);
  const [modalAddContactPersonInFormation, setModalAddContactPersonInFormation] = useState(false)
  const [modalAddContactPerson, setModalAddContactPerson] = useState(false)
  const [modalAddAnotherAddress, setModalAddAnotherAddress] = useState(false)
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const arrTest = [
    {
      name: "An Giang",
      slug: "an-giang",
      type: "tinh",
      name_with_type: "Tỉnh An Giang",
      code: "89",
      region: "Miền Bắc",
    },
    {
      name: "Kon Tum",
      slug: "kon-tum",
      type: "tinh",
      name_with_type: "Tỉnh Kon Tum",
      code: "62",
      region: "Miền Nam",
    },
    {
      name: "Đắk Nông",
      slug: "dak-nong",
      type: "tinh",
      name_with_type: "Tỉnh Đắk Nông",
      code: "67",
      region: "Miền Nam",
    },
    {
      name: "Sóc Trăng",
      slug: "soc-trang",
      type: "tinh",
      name_with_type: "Tỉnh Sóc Trăng",
      code: "94",
      region: "Miền Nam",
    },
    {
      name: "Bình Phước",
      slug: "binh-phuoc",
      type: "tinh",
      name_with_type: "Tỉnh Bình Phước",
      code: "70",
      region: "Miền Bắc",
    },
    {
      name: "Hưng Yên",
      slug: "hung-yen",
      type: "tinh",
      name_with_type: "Tỉnh Hưng Yên",
      code: "33",
      region: "Miền Bắc",
    },
    {
      name: "Thanh Hóa",
      slug: "thanh-hoa",
      type: "Huyện",
      name_with_type: "Tỉnh Thanh Hóa",
      code: "38",
      region: "Miền Bắc",
    },
    {
      name: "Quảng Trị",
      slug: "quang-tri",
      type: "Thị Trấn",
      name_with_type: "Tỉnh Quảng Trị",
      code: "45",
      region: "Miền Trung",
    },
  ];
  const arrCity = arrTest.map((item) => {
    return { label: item.name, id: item.code };
  });

  const arrTypeSupplier = arrTest.map((item) => {
    return { label: item.type, id: item.code };
  });

  const arrGroupSupplier = arrTest.map((item) => {
    return { label: item.slug, id: item.code };
  });

  const arrRegion = arrTest.map((item) => {
    return { label: item.region, id: item.code };
  });
  console.log("====================================");
  console.log(arrTypeSupplier);
  console.log("====================================");
  const [city, setCity] = useState({ label: "" });
  const [type, setType] = useState({ label: "" });
  const [group, setGroup] = useState({ label: "" });
  const [region, setregion] = useState({ label: "" });

  const handleModalAddAnotherAddress = () => {
    setModalAddAnotherAddress(!modalAddAnotherAddress)
  }
  const handleModalAddBank = () => {
    setmodalAddBank(!modalAddBank)
  }
  const handleModalAddContactPerson = () => {
    setModalAddContactPerson(!modalAddContactPerson)
  }

  const dataArray = [
    {
      label: "NCCScreen.codeSupplier",
      placeholder: "NCCScreen.placeholderCodeSupplier",
      name: "phoneNumber2",
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
    <Modal
      isVisible={isVisible}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      style={{
        backgroundColor: "rgba(0,0,0,0.1)",
        margin: 0,
        justifyContent: showMore ? "center" : "flex-end",
        paddingTop: showMore ? scaleHeight(160) : null,
      }}
    >
      {/* <View style={styles.container}> */}
      <View style={[styles.modalView, {}]}>
        <TextRN style={styles.modalText} />
        <View style={styles.header}>
          <Text style={styles.headerTitle} tx="suppliers.createNewSupplier"></Text>
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Text style={styles.headerButton} tx="suppliers.cancel"></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: scaleHeight(15),
              marginTop: scaleWidth(20),
            }}
          >
            <InputSelect
              titleText="suppliers.type"
              hintText="suppliers.selectTypeSupplier"
              isSearch
              required={true}
              arrData={arrTypeSupplier}
              dataDefault={type.label}
              onPressChoice={(item: any) => {
                console.log("doandev", item);

                setType(item);
              }}
              styleView={{ marginBottom: scaleHeight(15) }}
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
                    marginBottom: scaleHeight(15),
                    justifyContent: "center",
                  }}
                  inputStyle={{
                    fontSize: fontSize.size16,
                    fontWeight: "500",
                  }}
                  value={value}
                  onBlur={onBlur}
                  RightIconClear={Svgs.icon_delete2}
                  error={errors?.nameSuppliers?.message}
                  onClearText={() => onChange("")}
                  onChangeText={(value) => onChange(value)}
                  placeholder="Nhập tên NCC"
                  isImportant
                />
              )}
              // defaultValue={''}
              name="nameSuppliers"
              rules={{
                required: "Please input data",
              }}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  labelTx={"NCCScreen.phone"}

                  style={{
                    // marginBottom: scaleHeight(10),
                    marginBottom: scaleHeight(15),
                    justifyContent: "center",

                  }}
                  inputStyle={{

                    fontSize: fontSize.size16,
                    fontWeight: "500",
                  }}
                  onClearText={() => onChange("")}
                  onChangeText={() => onChange}
                  RightIconClear={Svgs.icon_delete2}
                  error={errors?.phoneNumber?.message}
                  placeholder="Ví dụ: 0909448877"
                  isImportant
                />
              )}
              rules={{
                required: "Please input data",
              }}
            />

            <InputSelect
              titleTx="NCCScreen.groupSuppliers"
              hintTx="NCCScreen.selectedGroupSuppliers"
              isSearch
              arrData={arrGroupSupplier}
              dataDefault={group.label}
              onPressChoice={(item: any) => {
                setGroup(item);
              }}
              styleView={{ marginBottom: scaleHeight(15) }}
            />
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            onPress={() => setShowMore(!showMore)}
          >
            <Text
              style={styles.headerTitle}
              tx="NCCScreen.moreInformation"
            ></Text>
            <Svgs.dropDown />
          </TouchableOpacity>

          {showMore && (
            <View>
              <View
                style={{
                  marginTop: scaleHeight(15),
                  marginBottom: scaleHeight(20),
                }}
              >
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
                          RightIconClear={Svgs.icon_delete2}
                          error={errors?.[item.name]?.message}
                          onClearText={() => onChange("")}
                          onChangeText={(value) => onChange(value)}
                          placeholderTx={item.placeholder}
                        />
                      )}
                      name={item.name}
                      rules={{ required: "Please input data" }}
                    />
                  )}
                />
              </View>

              <Text
                style={styles.headerTitle}
                tx="NCCScreen.addressInfomation"
              ></Text>

              <View
                style={{
                  marginTop: scaleHeight(15),
                  marginBottom: scaleHeight(15),
                  // backgroundColor:'red'
                }}
              >
                <InputSelect
                  titleTx="NCCScreen.region"
                  hintTx="NCCScreen.selectRegion"
                  isSearch
                  arrData={arrRegion}
                  dataDefault={region.label}
                  onPressChoice={(item: any) => {
                    setregion(item);
                  }}
                  styleView={{
                    marginBottom: scaleHeight(15),
                  }}
                />
                <InputSelect
                  titleText="NCCScreen.cityProvince"
                  hintText="NCCScreen.selectCityProvince"
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
                  titleText="NCCScreen.district"
                  hintText="NCCScreen.selectDistrict"
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
                  titleText="NCCScreen.wards"
                  hintText="NCCScreen.selectWards"
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
                      RightIconClear={Svgs.icon_delete2}
                      error={errors?.nameSuppliers?.message}
                      onClearText={() => onChange("")}
                      onChangeText={(value) => onChange(value)}
                      placeholderTx={"NCCScreen.placeholderAddress"}
                    />
                  )}
                  // defaultValue={''}
                  name="nameSuppliers"
                  rules={{
                    required: "Please input data",
                  }}
                />
                <TouchableOpacity
                  style={[styles.flexRow, { marginVertical: scaleWidth(15) }]}
                  onPress={() => handleModalAddAnotherAddress()}
                >
                  <Text style={styles.addAnother}>+</Text>
                  <Text
                    style={styles.addAnother}
                    tx="NCCScreen.addAnotherAddress"
                  />
                </TouchableOpacity>
                <View style={[styles.flexRow, { alignItems: "center" }]}>
                  <Svgs.ic_minusCircle style={{ marginRight: 8 }} />
                  <View style={styles.stylesCard}>
                    <View style={{ marginRight: 8 }}>
                      <Svgs.ic_Truck />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          styles.flexRow,
                          { justifyContent: "space-between" },
                        ]}
                      >
                        <Text style={styles.styleTextBold}>
                          Địa chỉ giao hàng
                        </Text>
                        <Svgs.ic_pen />
                      </View>
                      <Text style={styles.textSize}>
                        24 Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  // marginTop: scaleHeight(15),
                  marginBottom: scaleHeight(15),
                  // backgroundColor:'red'
                }}
              >
                <Text
                  tx="NCCScreen.bankInformation"
                  style={styles.headerTitle}
                />
                <TouchableOpacity
                  style={[styles.flexRow, { marginVertical: scaleWidth(15) }]}
                  onPress={() => handleModalAddBank()}
                >
                  <Text style={styles.addAnother}>+</Text>
                  <Text style={styles.addAnother} tx="NCCScreen.addBank" />
                </TouchableOpacity>
                <View style={[styles.flexRow, { alignItems: "center" }]}>
                  <Svgs.ic_minusCircle style={{ marginRight: 8 }} />
                  <View style={styles.stylesCard}>
                    <View style={{ marginRight: 8 }}>
                      <Svgs.ic_BIDV />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          styles.flexRow,
                          { justifyContent: "space-between" },
                        ]}
                      >
                        <Text style={styles.textSize}>Ngân hàng: BIDV</Text>
                        <Svgs.ic_pen />
                      </View>
                      <Text style={styles.textSize}>
                        Số tài khoản: 1231231155151
                      </Text>
                      <Text style={styles.textSize}>
                        Tên chủ tài khoản: HOANG LAN
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  // marginTop: scaleHeight(15),
                  marginBottom: scaleHeight(15),
                  // backgroundColor:'red'
                }}
              >
                <Text style={styles.headerTitle} tx="NCCScreen.contactPersonInformation" />
                <TouchableOpacity
                  style={[styles.flexRow, { marginVertical: scaleWidth(15) }]}
                  onPress={() => {
                    handleModalAddContactPerson()
                  }}
                >
                  <Text style={styles.addAnother}>+</Text>
                  <Text style={styles.addAnother} tx="NCCScreen.addContactPersonInformation" />
                </TouchableOpacity>
                <View style={[styles.flexRow, { alignItems: "center" }]}>
                  <Svgs.ic_minusCircle style={{ marginRight: 8 }} />
                  <View style={styles.stylesCard}>
                    <View style={{ marginRight: 8 }}>
                      <Svgs.img_Girl />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          styles.flexRow,
                          { justifyContent: "space-between" },
                        ]}
                      >
                        <Text style={styles.textSize}>Chị Nguyễn Lan Hương</Text>
                        <Svgs.ic_pen />
                      </View>

                      <Text style={styles.textSize}>
                        Trưởng phòng kinh doanh
                      </Text>
                      <Text style={styles.textSize}>
                        nguyenlanhuong@gmail.com
                      </Text>
                      <Text style={styles.textSize}>
                        09859500400
                      </Text>
                    </View>
                  </View>
                </View>

              </View>

              <ModalAddAnotherAddrest
                isVisible={modalAddAnotherAddress}
                setIsVisible={handleModalAddAnotherAddress}
              />
              <ModalAddBank
                isVisible={modalAddBank}
                setIsVisible={handleModalAddBank}

              />
              <ModalAddContactPerson
                isVisible={modalAddContactPerson}
                setIsVisible={handleModalAddContactPerson}

              />

              {/* btnBottom */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: scaleHeight(15),
                }}
              >
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
                  }}
                >
                  <Text style={{ fontSize: fontSize.size14 }} tx="NCCScreen.cancel"></Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: scaleWidth(150),
                    height: scaleHeight(48),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: colors.navyBlue,
                  }}
                >
                  <Text style={{ fontSize: fontSize.size14, color: "white" }}
                    tx="NCCScreen.save"
                  >

                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: scaleHeight(15),
          }}
        >
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
            }}
          >
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
            }}
          >
            <Text style={{ fontSize: fontSize.size14, color: "white" }}>
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    // flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: scaleHeight(8),
    // paddingBottom: 5,
    paddingHorizontal: scaleWidth(15),
    // marginTop: scaleHeight(60),
  },
  modalText: {
    textAlign: "center",
    width: scaleWidth(68),
    height: scaleHeight(5),
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 8,
    alignSelf: "center",
  },
  styleTextBold: {
    fontWeight: "600",
    fontSize: scaleWidth(12),
  },
  stylesCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.palette.aliceBlue,
    borderRadius: scaleWidth(8),
    // marginRight: scaleWidth(6),
    // marginVertical: scaleHeight(8),
    paddingLeft: scaleHeight(16),
    paddingEnd: scaleWidth(6),
    paddingVertical: scaleHeight(8),
  },
  textSize: {
    fontSize: fontSize.size12,
  },
  flexRow: {
    // flex:1,
    flexDirection: "row",
    // backgroundColor:'red'
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
  addAnother: {
    fontSize: fontSize.size12,
    fontWeight: "700",
    color: colors.palette.navyBlue,
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
    borderBottomColor: colors.whisper,
  },
  optionText: {
    fontSize: 16,
  },
  radioButton: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.veryLightGrey2,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10
  },
  radioButtonSelected: {
    width: 14,
    height: 14,
    borderRadius: 6,
    backgroundColor: colors.navyBlue,
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
    backgroundColor: colors.solitude2,
    marginTop: scaleHeight(18),
    // marginBottom: 18,
  },
  cancel: {
    fontSize: fontSize.size14,
    color: colors.red,
    fontWeight: "700",
    lineHeight: scaleHeight(24),
  },
  imageWithBorder: {
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(15),
    width: scaleWidth(60),
    height: scaleWidth(60),
    borderWidth: 1, // Đặt giá trị borderWidth tùy ý
    borderColor: 'gray', // Đặt màu của đường viền
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
});

export default ModalCreateSuppliers;
