import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import React, {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Header, Switch, Text, TextField } from "../../../../components";
import { styles } from "./styles";
import { Svgs } from "../../../../../assets/svgs";
import { InputSelect } from "../../../../components/input-select/inputSelect";
import {
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Toast,
} from "../../../../components/dialog-notification";
import { useStores } from "../../../models";
import { translate } from "../../../../i18n";
import { checkPhoneNumber } from "../../../utils/validate";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const page = useRef(0)
  const size = useRef(100)
  const [dataCity, setDataCity] = useState<{}[]>([]);
  const [dataDistrict, setDataDistrict] = useState<{}[]>([]);
  const [dataWards, setDataWards] = useState<{}[]>([]);
  const [city, setCity] = useState({ id: 0, label: "" });
  const [district, setDistrict] = useState({ id: 0, label: "" });
  const [wards, setWards] = useState({ id: 0, label: "" });
  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchWards, setSearchWards] = useState("");
  const { screen, dataEdit, toScreen }: any = route?.params
  const [valueSwitch, setValueSwitch] = useState(toScreen == 'new-order' ? true : false);

  const { control, handleSubmit, setValue, formState: { errors }, setError } = useForm({
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
      const response = await orderStore.getListCity(
        page.current,
        size.current,
        searchCity,
        366,
      );
      if (response && response.kind === "ok") {
        if (page.current === 0) {
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          setDataCity(formatArr);
        } else {
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
  };
  const getListDistrict = async (value: any) => {
      const response = await orderStore.getListDistrict(
        page.current,
        size.current,
        searchDistrict,
        value
      );
      if (response && response.kind === "ok") {
        if (page.current === 0) {
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          setDataDistrict(formatArr);
        } else {
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
  };
  const getListWard = async (value: any) => {
      const response = await orderStore.getListWard(
        page.current,
        size.current,
        searchWards,
        value
      );
      if (response && response.kind === "ok") {
        if (page.current === 0) {
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            label: item.name,
            id: item.id,
          }));
          setDataWards(formatArr);
        } else {
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
    let hasError = false
    if (checkPhoneNumber(data.phone) !== true) {
      setError("phone", {
        type: "validate",
        message: checkPhoneNumber(data.phone),
      });
      hasError = true
    }
    if (hasError == true) {
    } else {
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
        Keyboard.dismiss()
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
          console.log(response)

          if (response && response.kind === "ok") {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              textBody: screen === 'edit' ? translate("order.editAddressDialog") : translate("order.newAddressDialog"),
            })
            if (valueSwitch === true) {
              orderStore.setDataAddress({
                id: response.response.data.id, partnerId: Number(orderStore.dataClientSelect.id),
                phoneNumber: data.phone,
                addressType: "DELIVERY_ADDRESS",
                country: newCountry,
                region: null,
                city: newCity,
                district: newDistrict,
                ward: newWard,
                address: data.address,
                isDefault: valueSwitch,
              })
            }
            setTimeout(() => navigation.goBack(), 1000)
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
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              textBody: response.response.errorCodes[0].message
            })
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
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        headerTx={screen === 'new' ? "order.newDelivery" : 'order.editDelivery'}
        style={{ height: scaleHeight(54) }}
      />
      <KeyboardAvoidingView
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
            render={({ field: { onChange, value, onBlur }}) => (
              <TextField
                keyboardType="numeric"
                labelTx={"order.phone"}
                maxLength={11}
                style={styles.viewTextField}
                inputStyle={{
                  marginBottom:
                    Platform.OS === "ios" ? scaleHeight(padding.padding_8) : 0,
                }}
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => {
                  const filteredValue = value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                  onChange(filteredValue)
                }}
                onClearText={() => onChange("")}
                RightIconClear={Svgs.icon_delete2}
                isImportant={true}
                error={errors?.phone?.message}
              />
            )}
            name="phone"
            rules={{ required: "order.phoneNumberIsRequired" }}
          />
          <InputSelect
            titleTx={"order.city"}
            hintTx={"order.chooseCity"}
            required={true}
            arrData={dataCity}
            dataDefault={city.label}
            onPressChoice={(item) => handleSelectCity(item)}
            styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
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
                RightIconClear={Svgs.icon_delete2}
                isImportant={true}
                error={errors?.address?.message}
              />
            )}
            name="address"
            rules={{ required: "order.addressIsRequired" }}
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
          onPress={() => {navigation.goBack()}}
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
