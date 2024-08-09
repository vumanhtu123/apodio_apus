import { LinearGradient } from "react-native-linear-gradient"
import React, { useState } from "react"
import { Platform, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Svgs } from "../../../assets/svgs"
import { translate } from "../../i18n"
import { colors, fontSize, scaleHeight, scaleWidth, spacing } from "../theme"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { HeaderProps } from "./header.props"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.xxs,
  alignItems: "center",
  paddingTop: spacing.xxs,
  paddingBottom: spacing.xxs,
  justifyContent: 'space-between'
}
const TITLE: TextStyle = { textAlign: "center", color: "white", fontSize: fontSize.size16, fontWeight: '700' }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: scaleWidth(16) }
// const TOP: ViewStyle = { height: Platform.OS === 'ios' ? scaleHeight(44) : scaleHeight(32) }
const RIGHT: ViewStyle = { width: scaleWidth(32), marginRight: 2, zIndex: 2 }
const BTNLEFT: ViewStyle = { width: scaleWidth(30), height: scaleHeight(30), alignItems: 'center' }
const BTNRIGHT: ViewStyle = { width: scaleWidth(25), height: scaleHeight(20), alignItems: 'center' }
const LOGO: ViewStyle = {
  position: 'absolute', opacity: 1, top: 0, right: 40, height: 40, width: 40, zIndex: 1
}
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    onRightPress1,
    onRightPress2,
    onLeftTextPress,
    onRightTextPress,
    onRightIconTextInput,
    onRightIconTextInputCenter,
    onRightIconAndTextBelow,
    RightIconAndTextBelow,
    RightIcon,
    RightIcon1,
    RightIcon2,
    TitleIcon,
    TitleIcon1,
    TitleIcon2,
    RightIconTextInput,
    RightIconTextInputCenter,
    LeftIcon,
    headerText,
    headerTx,
    textBelowIconRight,
    leftText,
    rightText,
    rightTx,
    rightText1,
    rightTx1,
    style,
    titleStyle,
    searchTx,
    searchText,
    titleMiddleStyle,
    btnRightStyle,
    widthRightIcon,
    heightRightIcon,
    widthLeftIcon,
    heightLeftIcon,
    headerInput,
    headerInputCenter,
    textBelowIconRightSearch,
    searchValue,
    onSearchValueChange,
    handleOnSubmitSearch,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""
  const textRight = rightText || (rightTx && translate(rightTx)) || ""
  const textRight1 = rightText1 || (rightTx1 && translate(rightTx1)) || ""
  const searchPlaceholder = searchText || (searchTx && translate(searchTx)) || ""
  // const [searchText, setSearchText] = useState(searchValue);
  // const [searchValue, setSearchValue] = useState("");
  // const handleSearch = (text: any) => setSearchText(text);
  const handleSearch = (text: any) => {
    // const processedText = text.trim().toLowerCase();
    onSearchValueChange(text);
  };
  return (
    <View>
      <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={{ height: useSafeAreaInsets().top }}
      ></LinearGradient>
      <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={[ROOT, style]}>
        {LeftIcon ? (
          <Button preset="link" onPress={onLeftPress} style={BTNLEFT}>
            <LeftIcon width={scaleWidth(20)} height={scaleHeight(20)} />
            {/* <SvgIcon name={leftIcon}  width={20} height={20}/> */}
          </Button>
        ) : (
          <View style={LEFT} />
        )
        }
        {leftText && (
          <TouchableOpacity onPress={onLeftTextPress} style={{ width: '40%', justifyContent: 'center' }}>
            <Text tx={leftText} style={{ color: colors.white, textAlign: 'left', fontSize: fontSize.size16 }} />
          </TouchableOpacity>
        )
        }

        <View style={[TITLE_MIDDLE, titleMiddleStyle]}>
          <Text style={[TITLE, titleStyle]} text={header} />
        </View>
        {
          headerInputCenter && (
            <View style={{
              height: scaleHeight(45),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >
              <View style={{ position: 'absolute', zIndex: 100, left: scaleWidth(8) }}>
                <Svgs.icon_searchBlack width={scaleWidth(16)} height={scaleHeight(16)} />
              </View>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 4,
                  paddingHorizontal: scaleWidth(32),
                  paddingVertical: scaleHeight(7),
                  // marginVertical: 8,
                  width: scaleWidth(285),
                  height: scaleHeight(30),
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // zIndex: 1,
                  fontSize: fontSize.size12
                  // paddingLeft: 40,
                }}

                value={searchValue}
                onChangeText={handleSearch}
                placeholder="Tìm kiếm..."
              />

              {
                RightIconTextInputCenter ?
                  (
                    <Button
                      preset="link"
                      onPress={onRightIconTextInputCenter}
                      style={{ justifyContent: 'center', alignItems: 'center', marginLeft: scaleWidth(12) }}
                    >
                      <RightIconTextInputCenter width={16} height={16} />
                      {
                        textBelowIconRightSearch && (
                          <Text style={{ fontSize: 9, fontFamily: 'Inter', color: colors.white, }}>
                            Báo cáo
                          </Text>
                        )
                      }

                    </Button>
                  ) : null
              }

            </View>


          )
        }
        <View style={[RIGHT, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
          {rightText1 ? (
            <Button preset="link" onPress={onRightTextPress} style={{ alignItems: 'flex-end', zIndex: 2, width: scaleWidth(136) }}>
              <Text text={textRight1} style={{
                color: colors.white, textAlign: 'center',
                fontSize: fontSize.size10, fontWeight: '400'
              }} />
            </Button>
          ) : (
            null
          )}
          {RightIcon && (
            <Button preset="link" onPress={onRightPress} style={[BTNRIGHT, btnRightStyle]}>
              <RightIcon width={scaleWidth(16)} height={scaleHeight(16)} />
              {TitleIcon && (<Text tx={TitleIcon} numberOfLines={1} style={{
                fontSize: fontSize.size9, fontWeight: '400', textAlign: 'center', color: colors.textWhite,
              }} />
              )}
            </Button>
          )}
          {RightIcon1 && (
            <Button preset="link" onPress={onRightPress1} style={[BTNRIGHT, btnRightStyle]}>
              <RightIcon1 width={scaleWidth(16)} height={scaleHeight(16)} />
              {TitleIcon1 && (<Text tx={TitleIcon1} numberOfLines={1} style={{
                fontSize: fontSize.size9, fontWeight: '400', textAlign: 'center', color: colors.textWhite,
              }} />
              )}
            </Button>
          )}
          {RightIcon2 && (
            <Button preset="link" onPress={onRightPress2} style={[BTNRIGHT, btnRightStyle]}>
              <RightIcon2 width={scaleWidth(16)} height={scaleHeight(16)} />
              {TitleIcon2 && (<Text tx={TitleIcon2} numberOfLines={1} style={{
                fontSize: fontSize.size9, fontWeight: '400', textAlign: 'center', color: colors.textWhite,
              }} />
              )}
            </Button>
          )}
          {rightText && (
            <Button preset="link" onPress={onRightTextPress} style={{ width: scaleWidth(50), alignItems: 'center', zIndex: 2 }}>
              <Text text={textRight} style={{ color: colors.white, textAlign: 'center' }} />
            </Button>
          )
          }
          {
            RightIconAndTextBelow && (
              <Button
                preset="link"
                onPress={onRightIconAndTextBelow}
                style={{ width: scaleWidth(40), marginRight: 10, alignItems: 'center', justifyContent: 'center' }}
              >
                <RightIconAndTextBelow width={widthRightIcon} height={heightRightIcon} />
                {
                  textBelowIconRight && (
                    <Text text={textBelowIconRight}
                      style={{ fontSize: scaleWidth(8), color: colors.white }}
                    />
                  )
                }
              </Button>
            )
          }
        </View>

        <View style={LOGO}>
          <Svgs.icon_logoHome />
        </View>
      </LinearGradient>
      {headerInput && (

        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
          colors={[colors.palette.navyBlue, colors.palette.malibu]}
          style={{ height: scaleHeight(45), flexDirection: 'row', alignItems: 'center', justifyContent: RightIconTextInput ? 'space-evenly' : 'center', }}
        >
          <View style={{ position: 'absolute', zIndex: 100, left: scaleWidth(25) }}>
            <Svgs.icon_searchBlack width={scaleWidth(16)} height={scaleHeight(16)} />
          </View>
          <TextInput
            style={{
              backgroundColor: 'white',
              borderRadius: 4,
              paddingHorizontal: scaleWidth(32),
              paddingVertical: scaleHeight(7),
              // marginVertical: 8,
              width: RightIconTextInput ? scaleWidth(286) : scaleWidth(343),
              height: scaleHeight(30),
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              fontSize: fontSize.size12
              // paddingLeft: 40,
            }}
            value={searchValue}
            onChangeText={handleSearch}
            enterKeyHint="search"
            onSubmitEditing={handleOnSubmitSearch}
            enablesReturnKeyAutomatically
            placeholder={searchPlaceholder}

          // placeholder="Tìm kiếm..."
          />

          {
            RightIconTextInput && (
              <Button
                preset="link"
                onPress={onRightIconTextInput}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <RightIconTextInput width={16} height={16} />
                {
                  textBelowIconRightSearch && (
                    <Text style={{ fontSize: 9, fontFamily: 'Inter', color: colors.white }}>
                      Báo cáo
                    </Text>
                  )
                }

              </Button>
            )
          }
        </LinearGradient>

        /* <View style={LOGO}>
            <Images.icon_Logo1/>
          </View> */
      )}

    </View>
  )
}
