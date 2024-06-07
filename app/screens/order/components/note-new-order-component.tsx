import React, { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, TouchableOpacity, View } from "react-native";
import { AutoImage, TextField } from "../../../components";
import { styles } from "../new-order/styles";
import { Images } from "../../../../assets";
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme";

interface InputNote {
  note: boolean;
  setNote: (item: boolean) => void;
  imagesNote: string;
  setModalImage: (item: boolean) => void;
}

export const ShowNote = (props: InputNote) => {
  const {
    control,
    formState: { errors },
  } = useForm();
  return (
    <View>
      {props.note === true ? (
        <View style={styles.viewNote}>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  keyboardType={null}
                  // labelTx={"order.address"}
                  style={styles.viewTextfieldNote}
                  inputStyle={{
                    marginBottom:
                      Platform.OS === "ios"
                        ? scaleHeight(padding.padding_8)
                        : 0,
                  }}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  onClearText={() => onChange("")}
                  RightIconClear={Images.icon_delete2}
                  multiline={true}
                  placeholderTx={"order.placeNote"}
                  placeholderTextColor={colors.palette.nero}
                  // isImportant={true}
                  // error={errors?.phone?.message}
                />
              )}
              name="noteText"
              // rules={{ required: "Address is required" }}
            />
          </View>
          {props.imagesNote === "" ? (
            <TouchableOpacity onPress={() => props.setModalImage(true)}>
              <Images.icon_image />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => props.setModalImage(true)}>
              {/* <Image
                    source={{ uri: imagesNote }}
                    height={scaleHeight(48)}
                    width={scaleWidth(48)}
                    resizeMode="cover"
                    style={{ borderRadius: 8 }}
                  /> */}

              <TouchableOpacity
                // key={index}
                onPress={() => {
                  props.setModalImage(true);
                  // setModalImages(true);
                  // setActiveSlide(index);
                }}>
                <AutoImage
                  style={{
                    width: scaleWidth(107),
                    height: scaleHeight(70),
                    borderRadius: 8,
                  }}
                  source={{ uri: props.imagesNote }}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: scaleWidth(5),
                    top: scaleHeight(5),
                  }}
                  onPress={() => {
                    props.setNote(false);
                    console.log("aaa");
                  }}>
                  <Images.circle_close
                    width={scaleWidth(16)}
                    height={scaleHeight(16)}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => props.setNote(false)}
            style={{ position: "absolute", right: 6, top: 6 }}>
            {/* <Images.icon_deleteDolphin /> */}
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
