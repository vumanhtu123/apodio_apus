import React, { useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { Button, Text, TextField } from "../../../components";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import { Controller, useForm } from "react-hook-form";
import { InputSelect } from "../../../components/input-select/inputSelect";

const data = [
  { id: 1, name: "Tất cả" },
  { id: 2, name: "Đã thanh toán" },
  { id: 3, name: "Chưa thanh toán" },
  { id: 4, name: "Chưa thanh toán" },
];

export const DebtSupplier = (item: any) => {
  const [onclick, setOnclick] = useState(0);

  const onTap = (id: any) => {
    if (id == 1) {
      setOnclick(1);
    } else {
      setOnclick(0);
    }
  };

  return (
    <View style={{ flexDirection: "column", marginHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          alignSelf: "flex-end",
        }}>
        <TouchableOpacity onPress={() => onTap(0)}>
          <Text
            tx="suppliers.all"
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: onclick == 0 ? "#0078D4" : "#242424",
            }}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTap(1);
          }}
          style={{
            marginLeft: 12,
          }}>
          <Text
            tx="suppliers.thisMonth"
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: onclick == 1 ? "#0078D4" : "#242424",
            }}></Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "column",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 8,
          elevation: 0.5,
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Images.ClipboardText />
          <Text
            tx="suppliers.Bought"
            style={{
              color: "#747475",
              fontSize: 12,
              fontWeight: "400",
              paddingHorizontal: 6,
            }}></Text>
          <Text
            style={{
              color: "#242424",
              fontSize: 12,
              fontWeight: "400",
            }}>
            {item.bought ?? "7 đơn"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            alignItems: "center",
          }}>
          <Images.ClipboardText />
          <Text
            tx="suppliers.deDebt"
            style={{
              color: "#747475",
              fontSize: 12,
              fontWeight: "400",
              paddingHorizontal: 6,
            }}></Text>
          <Text
            style={{
              color: "#242424",
              fontSize: 12,
              fontWeight: "400",
            }}>
            {item.processing ?? "3 đơn"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Images.icon_chart />
          <Text
            tx="suppliers.debtLimit"
            style={{
              color: "#747475",
              fontSize: 12,
              fontWeight: "400",
              paddingHorizontal: 6,
            }}></Text>
          <Text
            style={{
              color: "#242424",
              fontSize: 12,
              fontWeight: "400",
            }}>
            {item.amount ?? "1.700.000.000đ"}
          </Text>
        </View>
        {item.amount == 0 ? (
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#747475",
              paddingVertical: 8,
            }}>
            Chưa có đơn hàng cho NCC này
          </Text>
        ) : null}
      </View>
      <ItemDebt />
    </View>
  );
};

const ItemDebt = (item: any) => {
  const [open, setOpen] = useState(false);

  const onOpenDialog = () => {
    setOpen(true);
    console.log("dataa", open);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 15,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <View style={{ flexDirection: "column", alignSelf: "flex-end" }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#242424" }}>
            {item.item ?? "Nguyễn Hà Dung"}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}>
            {item.item ?? "ĐH_21090930 - 13:56 01/03/2024 "}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#A55EEA1A",
            borderRadius: 2,
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: "flex-start",
          }}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: "400",
              color: "#A55EEA",
            }}>
            Chờ xác nhận
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#F6F7FB",
          height: 1,
          marginVertical: 12,
        }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <View style={{ flexDirection: "column" }}>
          <Text
            tx="suppliers.totalAmountPaid"
            style={{
              color: "#747475",
              fontSize: 10,
              fontWeight: "400",
              marginVertical: 8,
            }}></Text>
          <Text
            tx="suppliers.paid"
            style={{
              color: "#747475",
              fontSize: 10,
              fontWeight: "400",
            }}></Text>
          <Text
            tx="suppliers.stillInDebt"
            style={{
              color: "#747475",
              fontSize: 10,
              fontWeight: "400",
              marginVertical: 8,
            }}></Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <Text style={{ color: "#242425", fontSize: 10, fontWeight: "400" }}>
            {item.discount ?? "5.000.000"}
          </Text>
          <Text
            style={{
              color: "#242425",
              fontSize: 10,
              fontWeight: "400",
              marginVertical: 8,
            }}>
            {item.tax ?? "5.000.000"}
          </Text>
          <Text style={{ color: "#FF4956", fontSize: 12, fontWeight: "600" }}>
            {item.totalPayment ?? "80.000.000"}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#0078D4",
          marginVertical: 8,
          borderRadius: 4,
          width: 59,
        }}>
        <TouchableOpacity
          onPress={() => {
            onOpenDialog();
          }}>
          <Text
            tx="suppliers.update"
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#FFFFFF",
              marginHorizontal: 8,
              marginVertical: 6,
            }}></Text>
        </TouchableOpacity>
      </View>
      <ShowDialogUpdate isVisible={open} setIsVisible={setOpen} />
    </View>
  );
};

interface DebtModalProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  // item: any;
}

const ShowDialogUpdate = (props: DebtModalProps) => {
  const { isVisible, setIsVisible } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleCloseModal = () => {
    setIsVisible(false);
  };
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          justifyContent: "flex-end",
          alignItems: "center",
        }}></View>
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: "#FFFFFF",
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            tx="suppliers.updateDebt"
            style={{
              color: "#242424",
              fontSize: 16,
              fontWeight: "600",
            }}></Text>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Images.ic_x />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: "center",
            paddingVertical: 20,
            color: "#FF4956",
            fontSize: 20,
            fontWeight: "600",
          }}>
          {props.item ?? "83.700.000"}
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              keyboardType={null}
              labelTx={"suppliers.paymentAmount"}
              style={{}}
              value={value}
              onBlur={onBlur}
              RightIconClear={Images.icon_delete2}
              error={""}
              onClearText={() => {
                onChange("");
              }}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          // Account test setup new pin
          defaultValue={"0"}
          // Account test
          // defaultValue={"67076743544"}
          name="Số tiền cần thanh toán"
          rules={{ required: "Số tiền thanh toán" }}
        />
        <View style={{ flexDirection: "row", paddingVertical: 15 }}>
          <Text
            tx="suppliers.amountOwed"
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#747475",
            }}></Text>
          <Text style={{ fontSize: 12, fontWeight: "400", color: "red" }}>
            83.700.000
          </Text>
        </View>
        <InputSelect
          titleText="Hình thức thanh toán"
          hintText="Chọn danh mục"
          isSearch
          required={false}
          arrData={data.filter((item) => item.name)}
          dataDefault={"Tiền mặt"}
          // onLoadMore={loadMoreCategories}
          // handleOnSubmitSearch={handleSubmitSearchCategory}
          // onChangeText={handleSearchCategoryChange}
          onPressChoice={(item: any) => {}}
          styleView={{ marginBottom: scaleHeight(15) }}
        />
        <Button
          tx="suppliers.confirm"
          style={{ backgroundColor: "#0078D4", borderRadius: 8, marginTop: 20 }}
          textStyle={{
            fontSize: 14,
            fontWeight: "600",
            color: "#FFFFFF",
            marginVertical: 12,
          }}></Button>
      </View>
    </Modal>
  );
};