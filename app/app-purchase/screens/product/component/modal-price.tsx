import "numeral/locales/vi";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";
import { Svgs } from "../../../../../assets/svgs";
import { Button, Text, TextField } from "../../../components";
import Dialog from "../../../components/dialog/dialog";
import { TxKeyPath, translate } from "../../../i18n";
import { useStores } from "../../../models";
import {
  colors,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import {
  addCommas,
  formatCurrency,
  removeNonNumeric,
} from "../../../utils/validate";
import { observer } from "mobx-react-lite";
import { stylesModalPrice } from "../styles";
const { width, height } = Dimensions.get("screen");

interface PriceModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
  title?: string;
  titleTx?: TxKeyPath | {};
  onCancel: () => void;
  onConfirm: (value: any) => void;
  dataAdd?: {}[];
}

const VIEWMODAL: ViewStyle = {
  justifyContent: "flex-end",
  margin: 0,
};

const PriceModal = observer((props: PriceModalProps) => {
  const {
    isVisible,
    setIsVisible,
    title,
    titleTx,
    onCancel,
    onConfirm,
    dataAdd,
  } = props;
  const { vendorStore } = useStores();

  useEffect(() => {
    handleGetInfoCompany();
    console.log("infoCompany", vendorStore.checkSeparator);
  }, [isVisible]);

  const handleGetInfoCompany = async () => {
    if (vendorStore.checkSeparator === "") {
      try {
        const response = await vendorStore.getInfoCompany();
        if (response && response.kind === "ok") {
          // console.log('response', response.result.data.thousandSeparator)
          vendorStore.setCheckSeparator(response.result.data.thousandSeparator);
        } else {
          console.error("Failed to fetch categories:", response);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    } else {
      console.log("Đã có key");
    }
  };
  const actualTitle = titleTx ? translate(titleTx) : title;

  const { control, reset, handleSubmit, watch, setError, clearErrors } =
    useForm({
      defaultValues: {
        price: dataAdd?.length !== 0 ? dataAdd : [{ min: "", price: "" }],
      },
    });
  const { append, fields, remove } = useFieldArray({
    control,
    name: `price`,
  });

  useEffect(() => {
    if (dataAdd?.length !== 0) {
      reset({ price: dataAdd });
    }
    console.log("loi roi");
  }, [dataAdd]);
  const priceWatch = watch("price");
  const onSubmit = (data: any) => {
    const minValues = data.price.map((item) => item.min);
    const isDuplicate = minValues.some(
      (min, idx) => minValues.indexOf(min) !== idx
    );
    if (isDuplicate) {
      setModalError(true);
    } else {
      onConfirm(data);
      reset();
    }
  };
  const [modalNotify, setModalNotify] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [isError, setIsError] = useState(false);

  const validateUniqueMinQuantity = (value: any) => {
    const minValues = priceWatch.map((item) => item.min);
    const isDuplicate = minValues.filter((min) => min === value).length > 1;
    setIsError(isDuplicate);
    return isDuplicate ? "Số lượng không được trùng lặp" : true;
  };

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      isVisible={isVisible}
      style={VIEWMODAL}
      avoidKeyboard={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={stylesModalPrice.keyboardView}>
        <View style={stylesModalPrice.viewModal}>
          <Text style={stylesModalPrice.viewTextTittle} tx={actualTitle} />
          <View style={stylesModalPrice.line} />
          <FlatList
            data={fields}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View style={stylesModalPrice.viewItem}>
                  <Controller
                    control={control}
                    name={`price.${index}.min`}
                    render={({
                      field: { onChange, value, onBlur },
                      fieldState: { error },
                    }) => (
                      <View>
                        <TextField
                          keyboardType={"numeric"}
                          labelTx={"productScreen.minimum"}
                          style={{
                            width:
                              (Dimensions.get("screen").width -
                                scaleWidth(32)) *
                              0.4,
                          }}
                          inputStyle={{
                            marginBottom:
                              Platform.OS === "ios"
                                ? scaleHeight(padding.padding_8)
                                : 0,
                            marginTop: scaleHeight(4),
                          }}
                          value={value}
                          onBlur={onBlur}
                          valueInput={vendorStore.checkSeparator === "DOTS"
                            ? formatCurrency(
                              removeNonNumeric(value)
                            )
                            : addCommas(removeNonNumeric(value))}
                          onChangeText={(value) => onChange(
                            vendorStore.checkSeparator === "DOTS"
                              ? formatCurrency(removeNonNumeric(value))
                              : addCommas(removeNonNumeric(value))
                          )}
                          showRightIcon={false}
                          isImportant={true}
                          maxLength={15}
                          placeholder={translate("productScreen.enterCount")}
                          styleTextError={{
                            maxWidth:
                              (Dimensions.get("screen").width -
                                scaleWidth(64)) *
                              0.4,
                          }}
                          error={isError ? error?.message : undefined}
                          styleError={{ flex: 1 }}
                        />
                      </View>
                    )}
                    rules={{
                      required: translate("productScreen.enterCountMinimum"),
                      validate: validateUniqueMinQuantity,
                    }}
                  />
                  <Controller
                    control={control}
                    name={`price.${index}.price`}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextField
                        keyboardType={"numeric"}
                        labelTx={"productScreen.priceProduct"}
                        style={{
                          marginHorizontal: scaleWidth(margin.margin_12),
                          width:
                            (Dimensions.get("screen").width - scaleWidth(32)) *
                            0.49,
                        }}
                        inputStyle={{
                          marginTop: scaleHeight(4),
                        }}
                        value={value}
                        onBlur={onBlur}
                        valueInput={vendorStore.checkSeparator === "DOTS"
                          ? formatCurrency(
                            removeNonNumeric(value)
                          )
                          : addCommas(removeNonNumeric(value))}
                        onChangeText={(value) => {
                          onChange(
                            vendorStore.checkSeparator === "DOTS"
                              ? formatCurrency(removeNonNumeric(value))
                              : addCommas(removeNonNumeric(value))
                          );
                          // onChange(value)
                        }}
                        isImportant={true}
                        showRightIcon={false}
                        maxLength={15}
                        placeholder={translate("productScreen.enterPrice")}
                      />
                    )}
                    rules={{
                      required: translate("productScreen.enterProduct"),
                    }}
                  />
                  {fields?.length > 1 ? (
                    <TouchableOpacity onPress={() => remove(index)}>
                      <Svgs.icon_delete2
                        style={{ marginBottom: scaleHeight(8) }}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            }}
          />
          <Button
            onPress={() => {
              const lastItem = priceWatch[priceWatch?.length - 1];
              if (lastItem.min && lastItem.price) {
                append({ min: "", price: "" });
              } else {
                setModalNotify(true);
              }
            }}
            style={stylesModalPrice.buttonAdd}>
            <Svgs.icon_add />
            <Text
              tx="productScreen.addPriceRange"
              style={stylesModalPrice.textAdd}
            />
          </Button>
          <View style={stylesModalPrice.viewCancel}>
            <Button
              onPress={() => {
                if (
                  priceWatch?.length === 1 &&
                  priceWatch[0].min === "" &&
                  priceWatch[0].price === ""
                ) {
                  onCancel();
                } else {
                  setModalClose(true);
                }
              }}
              tx={"productScreen.cancel"}
              style={stylesModalPrice.buttonCancel}
              textStyle={stylesModalPrice.textCancel}
            />
            <Button
              tx={"productScreen.BtnNotificationAccept"}
              style={stylesModalPrice.buttonAccept}
              textStyle={stylesModalPrice.textAccept}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
        <Dialog
          onPressCancel={() => setModalClose(false)}
          onPressAccept={() => {
            onCancel();
            setModalClose(false);
          }}
          isVisible={modalClose}
          title={"productScreen.Notification"}
          content={"productScreen.NotifyCloseModal"}
          titleBTN1="productScreen.cancel"
          titleBTN2="productScreen.BtnNotificationAccept"
          styleBTN1={stylesModalPrice.styleBTN1}
          styleBTN2={{ backgroundColor: colors.navyBlue, borderRadius: 8 }}
        />
        <Dialog
          isVisible={modalNotify}
          title={"productScreen.Notification"}
          content={"productScreen.NotifyModal"}
          titleBTN2="productScreen.BtnNotificationAccept"
          styleBTN2={{ backgroundColor: colors.navyBlue, borderRadius: 8 }}
          onPressAccept={() => setModalNotify(false)}
        />
        <Dialog
          isVisible={modalError}
          title={"productScreen.Notification"}
          content={"productScreen.validateMin"}
          titleBTN2="productScreen.BtnNotificationAccept"
          styleBTN2={{ backgroundColor: colors.navyBlue, borderRadius: 8 }}
          onPressAccept={() => setModalError(false)}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
});

export default PriceModal;
