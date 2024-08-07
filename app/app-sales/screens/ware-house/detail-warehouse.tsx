import { StackScreenProps } from "@react-navigation/stack";
import { FC, useEffect, useState } from "react";
import { NavigatorParamList } from "../../navigators";
import { observer } from "mobx-react-lite";
import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Svgs } from "../../../../assets/svgs";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../theme";
import { Header, Text } from "../../../app-purchase/components";
import { Styles } from "./style";
import { values } from "mobx";
import ViewInfo from "../dashboard/component/view-info";
import { useStores } from "../../models";
import data from "../../../app-purchase/components/svg-icon/data";
import DataDetailWarehouse from "../../models/warehouse-store/detail-warehouse-model";
import { ModalDeleteWareHouse } from "./modal/modal_delete_warehouse";
import en from "../../i18n/en";
import { ALERT_TYPE, Dialog } from "../../../app-purchase/components/dialog-notification";
import { translate } from "../../i18n";
import { useNavigation } from "@react-navigation/native";
import { reset } from "i18n-js";

export const DetailWarehouseScreen: FC<
  StackScreenProps<NavigatorParamList, "detailWarehouse">
> = observer(function DetailWarehouse(props) {
  const navigation = useNavigation();
  const [myData, setMyData] = useState(DataDetailWarehouse);
  const [box1, setBox1] = useState(true);
  const [box2, setBox2] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const getAPI = useStores();

  const { id, state, name } = props.route.params;
  console.log("====================================");
  console.log("data id", id, state);
  console.log("====================================");
  const idNumber = Number(id);

  const getDataDetail = () => {
    getAPI.warehouseStore.getDetailWarehouse(idNumber).then((data) => {
      // console.log('data cua toi ', data?.data?.conditionStorage?.standardTemperature);
      const dataDetailWarehouse = data?.data;
      console.log("detail-------", JSON.stringify(dataDetailWarehouse));
      setMyData(dataDetailWarehouse);
    });
  };

  const isConditionStorageAllNull = (conditionStorage) => {
    if (!conditionStorage) {
      return false; // Nếu conditionStorage là undefined hoặc null, trả về false
    }

    return !Object.values(conditionStorage).every((value) => value === null);
  };

  const isAdditionalInfoAllNull = (additionalInfo) => {
    if (!additionalInfo) {
      return false; // Nếu conditionStorage là undefined hoặc null, trả về false
    }

    return !Object.values(additionalInfo).every((value) => value === null);
  };

  const deleteWarehouse = async () => {
    const result = await getAPI.warehouseStore.deleteWarehouse(idNumber);
    console.log("resultMess", result?.message);

    if (result?.message == "Success") {
      console.log("abv");
      await Dialog.hideDialog();

      Dialog.show({
        title: translate("txtDialog.txt_title_dialog"),
        button: "",
        button2: translate("common.ok"),
        textBody: translate("wareHouse.messengerSucces"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          console.log("doantesttt");
          navigation.navigate("wareHouse", { reset: true });
          // navigation.goBack()
          Dialog.hide();
        },
      });
    } else {
      await Dialog.hideDialog();
      Dialog.show({
        title: translate("productScreen.Notification"),
        button: translate("common.ok"),
        textBody: data?.message + translate("wareHouse.messengerFail"),
        closeOnOverlayTap: false,
      });
    }
  };

  useEffect(() => {
    getDataDetail();
  }, [props.navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        LeftIcon={Svgs.back}
        style={{ height: scaleHeight(52) }}
        leftText="wareHouse.detailWarehouse"
        RightIcon1={state !== "ARCHIVED" ? Svgs.ic_pen_white : null}
        RightIcon2={state !== "ARCHIVED" ? Svgs.ic_bin_white : null}
        RightIcon={Svgs.icon_copy}
        onLeftPress={() => props.navigation.goBack()}
        onRightPress2={
          state !== "ARCHIVED"
            ? () => {
              Dialog.show({
                type: ALERT_TYPE.INFO,
                title: translate("productScreen.Notification"),
                button: translate("productScreen.cancel"),
                button2: translate("productScreen.BtnNotificationDeleteFail"),
                textBody:
                  translate("wareHouse.titleConfirm") +
                  " " +
                  name +
                  " " +
                  translate("wareHouse.this"),
                textBodyWarning: translate("wareHouse.warning"),
                closeOnOverlayTap: false,
                onPressButton: () => {
                  deleteWarehouse();
                },
              });
            }
            : undefined
        }
        onRightPress1={
          state !== "ARCHIVED"
            ? () => {
              props.navigation.navigate({
                name: "warehouse",
                params: {
                  name: myData?.name,
                  code: myData?.code,
                  companyId: myData?.companyId,
                  branchId: myData?.branchId,
                  sourceProductType: myData?.sourceProductType,
                  address: myData?.address,
                  areaCode: myData?.areaCode,
                  hasAdditionalInfo: myData?.hasAdditionalInfo,
                  additionalInfo: {
                    latitude: myData?.additionalInfo?.latitude,
                    longitude: myData?.additionalInfo?.longitude,
                    height: myData?.additionalInfo?.height,
                    heightUom: {
                      id: myData?.additionalInfo?.heightUom?.id,
                      name: myData?.additionalInfo?.heightUom?.name,
                    },
                    length: myData?.additionalInfo?.length,
                    lengthUom: {
                      id: myData?.additionalInfo?.lengthUom?.id,
                      name: myData?.additionalInfo?.lengthUom?.name,
                    },
                    width: myData?.additionalInfo?.width,
                    widthUom: {
                      id: myData?.additionalInfo?.widthUom?.id,
                      name: myData?.additionalInfo?.widthUom?.name,
                    },
                    weightCapacity: myData?.additionalInfo?.weightCapacity,
                    weightCapacityUom: {
                      id: myData?.additionalInfo?.weightCapacityUom?.id,
                      name: myData?.additionalInfo?.weightCapacityUom?.name,
                    },
                    scene: myData?.additionalInfo?.scene,
                  },
                  hasConditionStorage: myData?.hasConditionStorage,
                  conditionStorage: {
                    standardTemperature: String(
                      myData?.conditionStorage?.standardTemperature
                    ),
                    minTemperature: myData?.conditionStorage?.minTemperature,
                    standardHumidity:
                      myData?.conditionStorage?.standardHumidity,
                  },
                  action: "CREATE",
                  note: "string",
                  isMobile: true,
                  status: "UPDATE",
                  id: idNumber,
                  sequenceCopy: myData?.sequenceCopy,
                } as never,
              });
            }
            : undefined
        }
        onRightPress={() =>
          props.navigation.navigate({
            name: "warehouse",
            params: {
              name: myData?.name,
              code: myData?.code,
              companyId: myData?.companyId,
              branchId: myData?.branchId,
              sourceProductType: myData?.sourceProductType,
              address: myData?.address,
              areaCode: myData?.areaCode,
              hasAdditionalInfo: myData?.hasAdditionalInfo,
              additionalInfo: {
                latitude: myData?.additionalInfo?.latitude,
                longitude: myData?.additionalInfo?.longitude,
                height: myData?.additionalInfo?.height,
                heightUom: {
                  id: myData?.additionalInfo?.heightUom?.id,
                  name: myData?.additionalInfo?.heightUom?.name,
                },
                length: myData?.additionalInfo?.length,
                lengthUom: {
                  id: myData?.additionalInfo?.lengthUom?.id,
                  name: myData?.additionalInfo?.lengthUom?.name,
                },
                width: myData?.additionalInfo?.width,
                widthUom: {
                  id: myData?.additionalInfo?.widthUom?.id,
                  name: myData?.additionalInfo?.widthUom?.name,
                },
                weightCapacity: myData?.additionalInfo?.weightCapacity,
                weightCapacityUom: {
                  id: myData?.additionalInfo?.weightCapacityUom?.id,
                  name: myData?.additionalInfo?.weightCapacityUom?.name,
                },
                scene: myData?.additionalInfo?.scene,
              },
              hasConditionStorage: myData?.hasConditionStorage,
              conditionStorage: {
                standardTemperature:
                  myData?.conditionStorage?.standardTemperature,
                minTemperature: myData?.conditionStorage?.minTemperature,
                standardHumidity: myData?.conditionStorage?.standardHumidity,
              },
              action: "CREATE",
              note: "string",
              isMobile: true,
              status: "COPY",
              id: idNumber,
              sequenceCopy: myData?.sequenceCopy,
            } as never,
          })
        }
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={Styles.box}>
          <Text
            tx="wareHouse.generalInformation"
            style={{ marginBottom: scaleWidth(25) }}
          />

          <View style={Styles.flexRow}>
            <Text tx="wareHouse.codeWarehouse" style={Styles.label} />
            <Text style={Styles.value}>{myData?.code}</Text>
          </View>
          <View style={[Styles.flexRow, { marginVertical: scaleHeight(12) }]}>
            <Text tx="wareHouse.nameWarehouse" style={Styles.label} />
            <Text style={Styles.value}>{myData?.name}</Text>
          </View>
          <View style={[Styles.flexRow]}>
            <Text tx="wareHouse.address" style={[Styles.label, { flex: 1 }]} />
            <Text
              style={[
                { flex: 1, textAlign: "right", fontSize: fontSize.size12 },
              ]}>
              {myData?.address}
            </Text>
          </View>
          <View style={[Styles.flexRow, { marginTop: scaleHeight(12) }]}>
            <Text tx="wareHouse.status" style={Styles.label} />
            <Text
              style={[
                { fontSize: fontSize.size12, color: colors.palette.navyBlue },
              ]}>
              {myData?.state == "APPROVED"
                ? translate("wareHouse.isActive")
                : translate("wareHouse.save")}
            </Text>
          </View>
        </View>

        {isConditionStorageAllNull(myData.conditionStorage) ? (
          <View>
            <TouchableOpacity
              style={[Styles.box2]}
              onPress={() => setBox1(!box1)}>
              <Text
                style={{
                  fontSize: fontSize.size12,
                  color: colors.palette.navyBlue,
                  marginRight: scaleWidth(6),
                }}
                tx="wareHouse.storageConditions"
              />
              <Svgs.icon_caretUp
                style={{ transform: [{ rotate: box1 ? "180deg" : "0deg" }] }}
              />
            </TouchableOpacity>
            {box1 ? (
              <View
                style={{
                  paddingHorizontal: scaleHeight(16),
                  backgroundColor: colors.white,
                }}>
                <View>
                  <Text
                    tx="wareHouse.standardStorageTemperature"
                    style={Styles.value}
                  />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.conditionStorage?.standardTemperature} °C
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: scaleHeight(20),
                  }}>
                  <Text
                    tx="wareHouse.minimumStorageTemperature"
                    style={Styles.value}
                  />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.conditionStorage?.minTemperature} °C
                  </Text>
                </View>
                <View>
                  <Text tx="wareHouse.standardHumidity" style={Styles.value} />
                  <Text
                    style={[
                      Styles.label,
                      {
                        marginTop: scaleHeight(12),
                        marginBottom: scaleWidth(10),
                      },
                    ]}>
                    {myData.conditionStorage?.standardHumidity} %
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : null}

        {isAdditionalInfoAllNull(myData.additionalInfo) ? (
          <View>
            <TouchableOpacity
              style={[Styles.box2]}
              onPress={() => setBox2(!box2)}>
              <Text
                style={{
                  fontSize: fontSize.size12,
                  color: colors.palette.navyBlue,
                  marginRight: scaleWidth(6),
                }}
                tx="wareHouse.additionalInformation"
              />
              <Svgs.icon_caretUp
                style={{ transform: [{ rotate: box2 ? "180deg" : "0deg" }] }}
              />
            </TouchableOpacity>
            {box2 ? (
              <View
                style={{
                  paddingHorizontal: scaleHeight(16),
                  backgroundColor: colors.white,
                }}>
                <View>
                  <Text tx="wareHouse.longitude" style={Styles.value} />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.additionalInfo?.longitude}
                  </Text>
                </View>

                <View style={{ marginVertical: scaleHeight(20) }}>
                  <Text tx="wareHouse.Latitude" style={Styles.value} />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.additionalInfo?.latitude}
                  </Text>
                </View>
                <View>
                  <Text tx="wareHouse.length" style={Styles.value} />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.additionalInfo?.length}{" "}
                    {myData?.additionalInfo?.lengthUom?.name}
                  </Text>
                </View>
                <View style={{ marginVertical: scaleHeight(20) }}>
                  <Text tx="wareHouse.width" style={Styles.value} />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.additionalInfo?.width}{" "}
                    {myData?.additionalInfo?.widthUom?.name}
                  </Text>
                </View>
                <View>
                  <Text tx="wareHouse.height" style={Styles.value} />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.additionalInfo?.height}{" "}
                    {myData?.additionalInfo?.heightUom?.name}
                  </Text>
                </View>
                <View style={{ marginVertical: scaleHeight(20) }}>
                  <Text tx="wareHouse.backgroundLoad" style={Styles.value} />
                  <Text style={[Styles.label, { marginTop: scaleHeight(12) }]}>
                    {myData.additionalInfo?.weightCapacity}{" "}
                    {myData?.additionalInfo?.weightCapacityUom?.name}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
});
