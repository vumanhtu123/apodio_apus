import { Observer, observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import React, {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Header, Switch, Text, TextField } from "../../../components";
import { Images } from "../../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import {
  colors,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { translate } from "../../../i18n";
import { useStores } from "../../../models";
import {
  OrderListAddressResult,
  Root1,
} from "../../../models/order-store/entities/order-address-model";

export const DeliveryAddress: FC = observer(function DeliveryAddress() {
  const navigation = useNavigation();
  const [addressChoice, setAddressChoice] = useState(0);
  const [arrAddress, setArrAddress] = useState<Root1[]>([]);
  const route = useRoute();
  const { orderStore } = useStores();

  const handlePress = (data: any) => {
    setAddressChoice(data.id);
    orderStore.setDataAddress(data)
    navigation.goBack()
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getListAddress();
    });
    return unsubscribe;
  }, [navigation]);

  const getListAddress = async () => {
    try {
      const response = await orderStore.getListAddress(
        Number(orderStore.dataClientSelect.id)
      );
      // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
      if (response && response.kind === "ok") {
        console.log(
          "getListAddress---------------------",
          JSON.stringify(response.response.data)
        );
        const newArr = response.response.data;
        if (orderStore.dataAddress.id === undefined) {
          newArr.map((items) => {
            if (items.isDefault === true) {
              setAddressChoice(items.id);
              orderStore.setDataAddress(items)
            }
          });
        } else {
          setAddressChoice(orderStore.dataAddress.id);
        }
        setArrAddress(newArr);
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <View style={styles.ROOT}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        headerTx={"order.changeDeliveryAddress"}
        style={{ height: scaleHeight(54) }}
      />
      <View style={[styles.viewModal, { maxHeight: "85%" }]}>
        <View>
          <FlatList
            data={arrAddress}
            style={{ maxHeight: "100%" }}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => handlePress(item.item)}
                  key={item.item.id}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, maxWidth: "80%" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          marginTop: scaleHeight(margin.margin_15),
                        }}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textListProduct}>
                              {translate("order.phone") + ": "}
                            </Text>
                            <Text
                              text={item.item.phoneNumber}
                              style={styles.textMoney2}
                            />
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("newDelivery" as never, {
                                  dataEdit: item.item, screen: 'edit'
                                })
                              }>
                              <Images.icon_edit
                                style={{
                                  marginLeft: scaleWidth(margin.margin_4),
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginVertical: scaleHeight(margin.margin_6),
                            }}>
                            <Text style={styles.textListProduct}>
                              {translate("order.address") + ": "}
                              <Text style={styles.textMoney2}>
                                {item.item.city.name}
                              </Text>
                              <Text style={styles.textMoney2} text=", " />
                              <Text style={styles.textMoney2}>
                                {item.item.district.name}
                              </Text>
                              <Text style={styles.textMoney2} text=", " />
                              <Text style={styles.textMoney2}>
                                {item.item.ward.name}
                              </Text>
                              <Text style={styles.textMoney2} text=", " />
                              <Text style={styles.textMoney2}>
                                {item.item.address}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        {item.item.addressType === "DELIVERY_ADDRESS" ? (
                          <View style={styles.viewBorder}>
                            <Text
                              tx={"order.deliveryAddress"}
                              style={styles.textDolphin400}
                            />
                          </View>
                        ) : item.item.addressType === "RECEIPT_ADDRESS" ? (
                          <View style={styles.viewBorder}>
                            <Text
                              tx={"order.receiptAddress"}
                              style={styles.textDolphin400}
                            />
                          </View>
                        ) : item.item.addressType === "INVOICE_ADDRESS" ? (
                          <View style={styles.viewBorder}>
                            <Text
                              tx={"order.invoiceAddress"}
                              style={styles.textDolphin400}
                            />
                          </View>
                        ) : item.item.addressType === "OTHER_ADDRESS" ? (
                          <View style={styles.viewBorder}>
                            <Text
                              tx={"order.otherAddress"}
                              style={styles.textDolphin400}
                            />
                          </View>
                        ) : item.item.addressType === "PERSONAL_ADDRESS" ? (
                          <View style={styles.viewBorder}>
                            <Text
                              tx={"order.personalAddress"}
                              style={styles.textDolphin400}
                            />
                          </View>
                        ) : (
                          <View style={styles.viewBorder}>
                            <Text
                              tx={"order.contact"}
                              style={styles.textDolphin400}
                            />
                          </View>
                        )}
                        {item.item.isDefault === true ? (
                          <View>
                            <Text
                              tx={"order.deFault"}
                              style={[
                                styles.textDolphin400,
                                {
                                  color: colors.palette.radicalRed,
                                },
                              ]}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                        width: "20%",
                      }}>
                      {addressChoice === item.item.id ? (
                        <Images.icon_checkGreen width={17} height={13} />
                      ) : null}
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#E7EFFF",
                      marginTop: scaleHeight(margin.margin_15),
                    }}></View>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: scaleHeight(margin.margin_15),
            }}
            onPress={() => navigation.navigate("newDelivery" as never, {
              dataEdit: undefined, screen: 'new'
            })}>
            <Images.icon_add width={14} height={14} />
            <Text tx={"order.addAddress"} style={styles.textAddAddress} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
