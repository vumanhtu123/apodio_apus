import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { dataOrderDetails, dataPromotion } from "../styles/data";
import Images from "../../../../../assets/index";
import { colors } from "../../../theme";

export const BodyDetailsOrder = (data: any) => {
  const [dataOrder, setData] = useState<any[]>([]);
  useEffect(() => {
    return setData(dataOrderDetails);
  }, []);
  return (
    <View
      style={{
        borderRadius: 8,
        flexDirection: "column",
        backgroundColor: "white",
        marginHorizontal: 16,
        paddingHorizontal: 16,
        marginVertical: 15,
        paddingVertical: 12,
      }}>
      {dataOrder.map((item: any) => {
        return (
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={Images.iconAVT}
                  style={{
                    width: 48,
                    height: 48,
                    marginRight: 10,
                  }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: colors.nero,
                    }}>
                    {item.name ?? "Gạch 1566CB502 60x60"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: colors.dolphin,
                    }}>
                    {item.size ?? "- 30 Hộp"}
                  </Text>
                  {item.vat !== null ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <Svgs.ic_tag />
                      <Text style={{ fontSize: 10, fontWeight: "400" }}>
                        {" "}
                        Thuế VAT{" "}
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "400",
                            color: colors.navyBlue,
                            fontStyle: "italic",
                          }}>
                          {item.vat ?? "100.000"}
                          {item.currency ?? "đ"}
                        </Text>
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <Text
                style={{
                  color: colors.navyBlue,
                  fontSize: 12,
                  fontWeight: "600",
                  fontStyle: "italic",
                  textAlign: "right",
                }}>
                10.000.000đ
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.ghostWhite,
                marginVertical: 12,
              }}></View>
          </View>
        );
      })}
    </View>
  );
};

export const PromotionList = (data: any) => {
  const [dataPromo, setDataPromo] = useState<any[]>([]);
  useEffect(() => {
    return setDataPromo(dataPromotion);
  }, []);
  return (
    <View
      style={{
        flexDirection: "column",
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: "white",
        borderRadius: 8,
      }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ fontSize: 10, fontWeight: "400", color: colors.dolphin }}>
          Khuyến mại
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400", color: colors.nero }}>
          5.000.000đ
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          marginTop: 10,
        }}>
        {dataPromotion.map((data: any) => {
          return (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Svgs.ic_tag />
              <Text
                style={{ fontSize: 10, fontWeight: "400", color: colors.nero }}>
                {"  "}
                Giảm {data.disCount ?? "10%"}{" "}
              </Text>
              <View style={{ height: 10 }} />
              <Text
                style={{ fontSize: 10, fontWeight: "400", color: colors.nero }}>
                tối đa {data.maxValue ?? "30K"}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const Payment = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 18,
        marginVertical: 16,
        backgroundColor: "white",
        borderRadius: 8,
      }}>
      <Text style={{ color: colors.nero, fontSize: 12, fontWeight: "600" }}>
        Phương thức thanh toán
      </Text>
      <View style={{ height: 15 }} />
      <Text style={{ color: colors.nero, fontSize: 12, fontWeight: "400" }}>
        Thanh toán luôn
      </Text>
    </View>
  );
};

export const InfoPayment = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: "white",
        borderRadius: 8,
        justifyContent: "space-between",
      }}>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{ fontSize: 10, fontWeight: "400", color: colors.dolphin }}>
          Tổng tiền hàng
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: colors.dolphin,
            paddingVertical: 8,
          }}>
          Chiết khấu:
        </Text>
        <Text
          style={{ fontSize: 10, fontWeight: "400", color: colors.dolphin }}>
          Khuyến mại:
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: colors.dolphin,
            paddingVertical: 8,
          }}>
          Tổng tiền thuế:
        </Text>
        <Text
          style={{ fontSize: 10, fontWeight: "400", color: colors.dolphin }}>
          Tổng thanh toán:
        </Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 10, fontWeight: "400", color: colors.nero }}>
          30.000.000đ
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: colors.nero,
            paddingVertical: 8,
          }}>
          0đ
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400", color: colors.nero }}>
          5.000.000đ
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: colors.nero,
            paddingVertical: 8,
          }}>
          100.000đ
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#FF4956" }}>
          25.900.000đ
        </Text>
      </View>
    </View>
  );
};

export const Notes = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 18,
        marginVertical: 16,
        backgroundColor: "white",
        borderRadius: 8,
        justifyContent: "space-between",
      }}>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 12, fontWeight: "600", color: colors.nero }}>
          Ghi Chú
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: colors.nero,
            marginTop: 15,
          }}>
          Mong muốn giao trước 30/04/2024
        </Text>
      </View>
      <Image
        source={Images.iconAVT}
        style={{
          width: 48,
          height: 48,
        }}
      />
    </View>
  );
};
