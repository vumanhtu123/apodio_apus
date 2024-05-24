import { TouchableOpacity, ViewStyle,TextStyle, View } from "react-native";
import { colors, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../components";

interface ItemExample {
    onPress?: () => void,
    id?: String,
    time?: String,
    code?: String,
    status?: String  ,
    styleViewStatus?: ViewStyle,
    styleTextStatus?: TextStyle,
    styleViewItemExample?: ViewStyle
}

export default function ItemExample(props: ItemExample) {
    const {onPress, id, time, code, status,styleViewStatus,styleTextStatus ,styleViewItemExample } = props;

    return (
        <TouchableOpacity
            style={[ROOT,styleViewItemExample]}
            onPress={onPress}
        >
           <View >
                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <Text style={STYLETEXID}>Mã yêu cầu: {id}</Text>
                    <Text style={[VIEWSTATUS, styleTextStatus,styleViewStatus]} text={status}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ color:'#747475', fontFamily:'Inter-Light'}}  text={time}/>
                    <Text>-</Text>
                    <Text style={{ color:'#747475', fontFamily:'Inter-Light'}}  text={code}/>
                </View>
           </View>
        </TouchableOpacity>
    )
}

const ROOT: ViewStyle = {
        backgroundColor: colors.palette.neutral100,
        paddingHorizontal: scaleWidth(padding.padding_16),
        paddingVertical: scaleWidth(padding.padding_12),
        marginVertical: scaleHeight(margin.margin_10),
        borderRadius:8,
        marginHorizontal:scaleWidth(margin.margin_10)
    
};

const STYLETEXID: TextStyle = { 
    fontSize: 18,
    fontWeight: "600",
    fontFamily:"Inter-Medium",

}
const VIEWSTATUS: ViewStyle = {
    paddingHorizontal: scaleWidth(padding.padding_8),
    paddingVertical:scaleHeight(padding.padding_2)
}




