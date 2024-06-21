import { Observer, observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import React, {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Header, Switch, Text, TextField } from "../../../components";
import { styles } from "./styles";
import { Images } from "../../../../assets";
import { InputSelect } from "../../../components/input-select/inputSelect";
import {
  colors,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
} from "../../../components/dialog-notification";
import { useStores } from "../../../models";
import { translate } from "../../../i18n";
import { OrderCityResult } from "../../../models/order-store/order-address-model";
import { formatPhoneNumber, phoneNumberPattern } from "../../../utils/validate";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Root1 } from "../../../models/order-store/entities/order-address-model";

export const NewDelivery: FC = observer(function NewDelivery() {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const heightScroll =
    Dimensions.get("window").height -
    scaleHeight(120) -
    scaleHeight(52) -
    paddingTop;
  const route = useRoute()
  const { orderStore } = useStores();
  const [dataCity, setDataCity] = useState<{}[]>([]);
  const [dataDistrict, setDataDistrict] = useState<{}[]>([]);
  const [dataWards, setDataWards] = useState<{}[]>([]);
  const [city, setCity] = useState({ id: 0, label: "" });
  const [district, setDistrict] = useState({ id: 0, label: "" });
  const [wards, setWards] = useState({ id: 0, label: "" });
  const [valueSwitch, setValueSwitch] = useState(false);
  const [page, setPage] = useState(0);
  const [pageDistrict, setPageDistrict] = useState(0);
  const [pageWards, setPageWards] = useState(0);
  const [size, setSize] = useState(100);
  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchWards, setSearchWards] = useState("");

  const dataEdit: Root1 = route?.params?.dataEdit
  const screen = route?.params?.screen

  const { control, reset, handleSubmit, setValue, formState: { errors }, setError } = useForm({
    defaultValues: { phone: '', address: '' },
  });

  useEffect(() => {
    if (dataEdit !== undefined) {
      console.log(dataEdit)
      setCity({ label: dataEdit.city.name, id: dataEdit.city.id })
      setDistrict({ label: dataEdit.district.name, id: dataEdit.district.id })
      setWards({ label: dataEdit.ward.name, id: dataEdit.ward.id })
      setValueSwitch(dataEdit.isDefault)
      getListCity()
      getListDistrict(dataEdit.city.id)
      getListWard(dataEdit.district.id)
      setValue('phone', dataEdit.phoneNumber?.toString())
      setValue('address', dataEdit.address?.toString())
    } else {
      getListCity()
    }
  }, [])

  const getListCity = async () => {
    try {
      const response = await orderStore.getListCity(
        page,
        size,
        searchCity,
        366,
        undefined
      );
      if (response && response.kind === "ok") {
        if (page === 0) {
          console.log(
            "getListCity---------------------",
            JSON.stringify(response.response.data.content)
          );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          setDataCity(formatArr);
        } else {
          console.log(
            "getListCity---------------------",
            JSON.stringify(response.response.data)
          );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          const endArr = dataCity.concat(formatArr);
          setDataCity(endArr);
        }
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const getListDistrict = async (value: any) => {
    try {
      const response = await orderStore.getListDistrict(
        page,
        size,
        searchDistrict,
        value
      );
      if (response && response.kind === "ok") {
        if (page === 0) {
          console.log(
            "getListDistrict---------------------",
            JSON.stringify(response.response.data.content)
          );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          setDataDistrict(formatArr);
        } else {
          console.log(
            "getListDistrict---------------------",
            JSON.stringify(response.response.data)
          );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          const endArr = dataDistrict.concat(formatArr);
          setDataDistrict(endArr);
        }
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const getListWard = async (value: any) => {
    try {
      const response = await orderStore.getListWard(
        page,
        size,
        searchWards,
        value
      );
      if (response && response.kind === "ok") {
        if (page === 0) {
          console.log(
            "getListWard---------------------",
            JSON.stringify(response.response.data.content)
          );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          setDataWards(formatArr);
        } else {
          console.log(
            "getListWard---------------------",
            JSON.stringify(response.response.data)
          );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          const endArr = dataWards.concat(formatArr);
          setDataWards(endArr);
        }
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSelectCity = (data: any) => {
    setCity(data);
    setDistrict({ id: 0, label: "" });
    setWards({ id: 0, label: "" });
    getListDistrict(data.id);
  };

  const handleSelectDistrict = (data: any) => {
    setDistrict(data);
    setWards({ id: 0, label: "" });
    getListWard(data.id);
  };

  const handleSelectWards = (data: any) => {
    setWards(data);
  };
  const handleSelectDistrict1 = () => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      textBody: translate('txtToats.change_city'),
    });
  };

  const handleSelectWards1 = () => {
    if (city.label === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: translate('txtToats.change_city'),
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: translate('txtToats.change_district'),
      });
    }
  };

  const submitAdd = async (data: any) => {
    if (
      data.address === "" ||
      data.phone === "" ||
      city.id === 0 ||
      district.id === 0 ||
      wards.id === 0
    ) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: translate('txtToats.required_information'),
      });
    } else {
      const newCountry = { id: 366, name: "Việt Nam" };
      const newCity = { id: city.id, name: city.label };
      const newDistrict = { id: district.id, name: district.label };
      const newWard = { id: wards.id, name: wards.label };
      const dataCreate = {
        id: dataEdit !== undefined ? dataEdit.id : null,
        partnerId: Number(orderStore.dataClientSelect.id),
        phoneNumber: data.phone,
        addressType: "DELIVERY_ADDRESS",
        country: newCountry,
        city: newCity,
        district: newDistrict,
        ward: newWard,
        address: data.address,
        isDefault: valueSwitch,
      };
      try {
        const response = await orderStore.createAddress(dataCreate);

        if (response && response.kind === "ok") {
          Toast.show({ type: ALERT_TYPE.SUCCESS, 
            textBody: screen === 'edit' ? translate("order.editAddressDialog") : translate("order.newAddressDialog"), })
            setTimeout(() => navigation.goBack(), 5000)
          // Dialog.show({
          //   type: ALERT_TYPE.INFO,
          //   title: translate("productScreen.Notification"),
          //   textBody: screen === 'edit' ? translate("order.editAddressDialog") : translate("order.newAddressDialog"),
          //   button2: translate("productScreen.BtnNotificationAccept"),
          //   closeOnOverlayTap: false,
          //   onPressButton: () => {
          //     navigation.goBack();
          //     Dialog.hide();
          //   },
          // });
        } else {
          Toast.show({ type: ALERT_TYPE.SUCCESS, 
            textBody: response.response.errorCodes[0].message })
          // Dialog.show({
          //   type: ALERT_TYPE.DANGER,
          //   title: translate("txtDialog.txt_title_dialog"),
          //   textBody: response.response.errorCodes[0].message,
          //   button: translate("common.ok"),
          //   closeOnOverlayTap: false,
          // });
          console.error(
            "Failed to fetch categories:",
            response.response.message
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        headerTx={screen === 'new' ? "order.newDelivery" : 'order.editDelivery'}
        style={{ height: scaleHeight(54) }}
      />
      <KeyboardAvoidingView
        // style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : scaleHeight(118)}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={{
            marginHorizontal: scaleWidth(16),
            marginTop: scaleHeight(10),
            height: heightScroll - scaleHeight(64),
          }}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState }) => (
              <TextField
                keyboardType="numeric"
                maxLength={10}
                labelTx={"order.phone"}
                style={styles.viewTextField}
                inputStyle={{
                  marginBottom:
                    Platform.OS === "ios" ? scaleHeight(padding.padding_8) : 0,
                }}
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  if (phoneNumberPattern.test(value) === false) {
                    setError("phone", {
                      type: "validate",
                      message: "Số điện thoại gồm 10 chữ số bắt đầu bằng số 0",
                    });
                  } else {
                    setError("phone", null);
                  }
                }}
                onClearText={() => onChange("")}
                RightIconClear={Images.icon_delete2}
                isImportant={true}
                error={errors?.phone?.message}
              // defaultValue={dataEdit !== undefined ? dataEdit.phoneNumber : ''}
              />
            )}
            name="phone"
            rules={{ required: "Số điện thoại là bắt buộc" }}
          />
          <InputSelect
            titleTx={"order.city"}
            hintTx={"order.chooseCity"}
            required={true}
            arrData={dataCity}
            dataDefault={city.label}
            onPressChoice={(item) => handleSelectCity(item)}
            styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
            // onLoadMore={()=> setPage(page+1)}
            isSearch={true}
            onSearch={(text: any) => setSearchCity(text)}
          />
          <InputSelect
            titleTx={"order.district"}
            hintTx={"order.chooseDistrict"}
            required={true}
            arrData={dataDistrict}
            dataDefault={district.label}
            onPressChoice={(item) => handleSelectDistrict(item)}
            styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
            onPressNotUse={() => handleSelectDistrict1()}
            checkUse={city.label !== "" ? false : true}
            // onLoadMore={()=> setPageDistrict(pageDistrict + 1)}
            isSearch={true}
            onSearch={(text: any) => setSearchDistrict(text)}
          />
          <InputSelect
            titleTx={"order.ward"}
            hintTx={"order.chooseWard"}
            required={true}
            arrData={dataWards}
            dataDefault={wards.label}
            onPressChoice={(item) => handleSelectWards(item)}
            styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
            onPressNotUse={() => handleSelectWards1()}
            checkUse={city.label !== "" && district.label !== "" ? false : true}
            // onLoadMore={()=> setPageWards(pageWards + 1)}
            isSearch={true}
            onSearch={(text: any) => setSearchWards(text)}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                keyboardType={null}
                labelTx={"order.address"}
                style={styles.viewTextField}
                inputStyle={{
                  marginBottom:
                    Platform.OS === "ios" ? scaleHeight(padding.padding_8) : 0,
                }}
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                onClearText={() => onChange("")}
                RightIconClear={Images.icon_delete2}
                isImportant={true}
                error={errors?.address?.message}
              // defaultValue={dataEdit !== undefined ? dataEdit.address : ''}
              />
            )}
            name="address"
            rules={{ required: "Địa chỉ là bắt buộc" }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ flex: 1 }} tx={"order.addressDefault"} />
            <Switch
              value={valueSwitch}
              onToggle={() => {
                setValueSwitch(!valueSwitch);
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.viewGroupBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.viewBtnCancel}>
          <Text tx={"common.cancel"} style={styles.textBtnCancel} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(submitAdd)}
          style={styles.viewBtnConfirm}>
          <Text tx={"common.saveChange"} style={styles.textBtnConfirm} />
        </TouchableOpacity>
      </View>
    </View>
  );
});
