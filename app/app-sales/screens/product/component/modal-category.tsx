import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text as TextRN,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../../../../app-purchase/components";
import {
  colors,
  fontSize,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { CustomModal } from "../../../../app-purchase/components/custom-modal";
import { stylesCategory } from "../styles";
import { translate } from "../../../i18n";
import { useStores } from "../../../models";

const CategoryModalFilter = ({
  showCategory,
  setShowCategory,
  selectedCategory,
  setSelectedCategory,
  setNameDirectory,
}: any) => {
  const inputRef = useRef<TextInput | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const { categoryStore } = useStores();
  const [dataCategoryFilter, setDataCategoryFilter] = useState<any>([]);
  const [isRefreshingCategory, setIsRefreshingCategory] = useState(false);
  const [valueSearchCategory, setValueSearchCategory] = useState("");

  const handleSearch = (text: any) => {
    setValueSearchCategory(text);
  };
  const handleOnSubmitSearch = () => {
    setShowLoading(true);
    setDataCategoryFilter([]);
    handleGetCategoryFilter(valueSearchCategory)
      .then((result: any) => {
        setShowLoading(false);
      }).catch((error: any) => {
        setShowLoading(false);
      });
    // }
  };
  const refreshCategoryFilter = async () => {
    setIsRefreshingCategory(true);
    setShowLoading(true);
    setValueSearchCategory("");
    setDataCategoryFilter([]);
    await handleGetCategoryFilter()
      .then((result: any) => {
        setShowLoading(false);
      }).catch((error: any) => {
        setShowLoading(false);
      });
    setIsRefreshingCategory(false);
  };
  useEffect(() => {
    handleGetCategoryFilter()
  }, [])
  const handleGetCategoryFilter = async (valueSearchCategory?: any) => {
    try {
      const response = await categoryStore.getListCategoriesFilter(
        0,
        100,
        valueSearchCategory
      );
      if (response && response.kind === "ok") {
        const filteredData = response.response.data.content.map(({ id, name }: any) => ({ id, name }));
        const newElement = { name: "Tất cả danh mục" };
        filteredData.unshift(newElement);
        setDataCategoryFilter(filteredData);
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setSelectedCategory(item.id);
        setNameDirectory(item.name);
        setShowCategory(false);
        // setIndex(index);
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
          fontSize: fontSize.size10,
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
    >
      <View
        style={{
          borderColor: colors.palette.veryLightGrey,
          height: scaleHeight(350),
        }}>
        <View>
          <View style={stylesCategory.viewIconSearch}>
            <Svgs.icon_searchBlack />
          </View>
          <TextInput
            ref={inputRef}
            style={stylesCategory.textInput}
            textAlign="left"
            onChangeText={(text) => handleSearch(text)}
            value={valueSearchCategory}
            placeholder={translate("productScreen.searchCategories")}
            enterKeyHint="search"
            onSubmitEditing={handleOnSubmitSearch}
            enablesReturnKeyAutomatically
          />
        </View>
        <View
        >
          <FlatList
            data={dataCategoryFilter}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={isRefreshingCategory} onRefresh={refreshCategoryFilter} />
            }
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default CategoryModalFilter;
