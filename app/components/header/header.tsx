import { LinearGradient } from "react-native-linear-gradient"
import React, { useState } from "react"
import { Platform, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Images } from "../../../assets/index"
import { translate } from "../../i18n/"
import { colors, fontSize, scaleHeight, scaleWidth, spacing } from "../../theme"
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
const LEFT: ViewStyle = { width: 32 }
// const TOP: ViewStyle = { height: Platform.OS === 'ios' ? scaleHeight(44) : scaleHeight(32) }
const RIGHT: ViewStyle = { width: 32, marginRight: 2, zIndex: 2 }
const BTNLEFT: ViewStyle = { paddingLeft: 16 }
const BTNRIGHT: ViewStyle = { paddingRight: 16 }
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
    RightIcon,
    RightIcon1,
    RightIcon2,
    RightIconTextInput,
    RightIconTextInputCenter,
    LeftIcon,
    headerText,
    headerTx,
    leftText,
    rightText,
    rightTx,
    rightText1,
    rightTx1,
    style,
    titleStyle,
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
        )}
        {leftText && (
          <TouchableOpacity onPress={onLeftTextPress} style={{ width:80, justifyContent: 'center',}}>
            <Text tx={leftText} style={{ color: '#FFFFFF', textAlign: 'center',  }} />
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
                <Images.icon_searchBlack width={scaleWidth(16)} height={scaleHeight(16)} />
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
                  style={{ justifyContent: 'center', alignItems: 'center', marginLeft:scaleWidth(12) }}
                >
                  <RightIconTextInputCenter width={16} height={16} />
                  {
                    textBelowIconRightSearch && (
                      <Text style={{ fontSize: 9, fontFamily: 'Inter', color: '#FFF', }}>
                        Báo cáo
                      </Text>
                    )
                  }
  
                </Button>
                ):null
              }

            </View>


          )
        }
        <View style={[RIGHT, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
          {rightText1 ? (
            <Button preset="link" onPress={onRightTextPress} style={{ alignItems: 'flex-end', zIndex: 2, width: scaleWidth(136) }}>
              <Text text={textRight1} style={{
                color: '#FFFFFF', textAlign: 'center',
                fontSize: fontSize.size10, fontWeight: '400'
              }} />
            </Button>
          ) : (
            null
          )}
          {RightIcon && (
            <Button preset="link" onPress={onRightPress} style={[BTNRIGHT, btnRightStyle]}>
              <RightIcon width={widthRightIcon} height={heightRightIcon} />
            </Button>
          )}
          {RightIcon1 && (
            <Button preset="link" onPress={onRightPress1} style={[BTNRIGHT, btnRightStyle]}>
              <RightIcon1 width={widthRightIcon} height={heightRightIcon} />
            </Button>
          )}
          {RightIcon2 && (
            <Button preset="link" onPress={onRightPress2} style={[BTNRIGHT, btnRightStyle]}>
              <RightIcon2 width={widthRightIcon} height={heightRightIcon} />
            </Button>
          )}
          {rightText && (
            <Button preset="link" onPress={onRightTextPress} style={{ width: 50, alignItems: 'center', zIndex: 2 }}>
              {/* <Text tx={rightText} style={{ color: '#FFFFFF', textAlign: 'center' }} /> */}
              <Text text={textRight} style={{ color: '#FFFFFF', textAlign: 'center' }} />
            </Button>
          )
          }
        </View>

        <View style={LOGO}>
          <Images.icon_logoHome />
        </View>
      </LinearGradient>
      {headerInput && (

        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
          colors={[colors.palette.navyBlue, colors.palette.malibu]}
          style={{ height: scaleHeight(45), flexDirection: 'row', alignItems: 'center', justifyContent: RightIconTextInput ? 'space-evenly' : 'center', }}
        >
          <View style={{ position: 'absolute', zIndex: 100, left: scaleWidth(25) }}>
            <Images.icon_searchBlack width={scaleWidth(16)} height={scaleHeight(16)} />
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
            onSubmitEditing = {handleOnSubmitSearch}
            enablesReturnKeyAutomatically

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
                    <Text style={{ fontSize: 9, fontFamily: 'Inter', color: '#FFF' }}>
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