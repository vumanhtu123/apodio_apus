import React, { useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text as TextRN,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../../../components";
import {
  colors,
  fontSize,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Images } from "../../../../assets";
import { CustomModal } from "../../../components/custom-modal";
import { stylesCategory } from "../styles";
import { translate } from "../../../i18n";

const CategoryModalFilter = ({
  showCategory,
  setShowCategory,
  dataCategory,
  selectedCategory,
  setSelectedCategory,
  setNameDirectory,
  isSearchBarVisible,
  setIndex,
  setPage,
  onSearchChange,
  isRefreshing,
  onRefresh,
}: any) => {
  const inputRef = useRef<TextInput | null>(null);
  const [search, setSearch] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const handleSearch = (text: any) => {
    setSearch(text);
    // onSearchChange(text); // Gọi hàm callback để cập nhật state ở component cha
  };
  const handleOnSubmitSearch = () => {
    // setShowLoading(true);
    if (onSearchChange) {
      onSearchChange(search);
    }
    // setShowLoading(false);
  };
  const refresh = () => {
    setShowLoading(true);
    setSearch("");
    // setShowLoading(true)
    onRefresh()
      .then((result: any) => {
        setShowLoading(false);
      })
      .catch((error: any) => {
        setShowLoading(false);
      });
  };

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setSelectedCategory(item.id);
        setNameDirectory(item.name);
        setShowCategory(false);
        setIndex(index);
      }}
      style={{
        paddingVertical: scaleHeight(padding.padding_12),
        paddingHorizontal: scaleWidth(padding.padding_16),
        backgroundColor:
          selectedCategory === item.id
            ? colors.palette.navyBlue
            : colors.palette.neutral100,
      }}>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 10,
          color:
            selectedCategory === item.id
              ? colors.palette.neutral100
              : colors.palette.nero,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    // <Modal
    <CustomModal
      isVisible={showCategory}
      setIsVisible={setShowCategory}
      isHideKeyBoards={showCategory}
      isVisibleLoading={showLoading}
      // style={{ height: '40%' }}
    >
      <View
        style={{
          borderColor: colors.palette.veryLightGrey,
          // backgroundColor: colors.palette.neutral100,
          height: scaleHeight(350),
        }}>
        <TextRN style={stylesCategory.textRN} />
        <View style={stylesCategory.viewTextCategory}>
          <Text
            tx={"inforMerchant.Category"}
            style={stylesCategory.textCategory}
          />
        </View>
        <View
          style={{ height: scaleHeight(1), backgroundColor: "#E7EFFF" }}></View>
        <View>
          <View style={stylesCategory.viewIconSearch}>
            <Images.icon_searchBlack />
          </View>
          <TextInput
            ref={inputRef}
            style={stylesCategory.textInput}
            textAlign="left"
            onChangeText={(text) => handleSearch(text)}
            value={search}
            placeholder={translate("productScreen.searchCategories")}
            enterKeyHint="search"
            onSubmitEditing={handleOnSubmitSearch}
            enablesReturnKeyAutomatically
          />
        </View>
        <View
        // style={{ height: '40%' }}
        >
          <FlatList
            data={dataCategory}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
            }
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default CategoryModalFilter;
