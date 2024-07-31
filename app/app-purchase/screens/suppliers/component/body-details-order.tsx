import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { dataOrderDetails, dataPromotion } from "../styles/data";

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
                  source={require("../../../../../assets/Images/Avatar.png")}
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
                      color: "#242424",
                    }}>
                    {item.name ?? "Gạch 1566CB502 60x60"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#747475",
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
                            color: "#0078D4",
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
                  color: "#0078D4",
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
                backgroundColor: "#F6F7FB",
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
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}>
          Khuyến mại
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#242424" }}>
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
                style={{ fontSize: 10, fontWeight: "400", color: "#242424" }}>
                {"  "}
                Giảm {data.disCount ?? "10%"}{" "}
              </Text>
              <View style={{ height: 10 }} />
              <Text
                style={{ fontSize: 10, fontWeight: "400", color: "#242424" }}>
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
      <Text style={{ color: "#242424", fontSize: 12, fontWeight: "600" }}>
        Phương thức thanh toán
      </Text>
      <View style={{ height: 15 }} />
      <Text style={{ color: "#242424", fontSize: 12, fontWeight: "400" }}>
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
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}>
          Tổng tiền hàng
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: "#747475",
            paddingVertical: 8,
          }}>
          Chiết khấu:
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}>
          Khuyến mại:
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: "#747475",
            paddingVertical: 8,
          }}>
          Tổng tiền thuế:
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}>
          Tổng thanh toán:
        </Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#242424" }}>
          30.000.000đ
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: "#242424",
            paddingVertical: 8,
          }}>
          0đ
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#242424" }}>
          5.000.000đ
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: "#242424",
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
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#242424" }}>
          Ghi Chú
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#242424",
            marginTop: 15,
          }}>
          Mong muốn giao trước 30/04/2024
        </Text>
      </View>
      <Image
        source={require("../../../../../assets/Images/Avatar.png")}
        style={{
          width: 48,
          height: 48,
        }}
      />
    </View>
  );
};
