import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../components";
import { Images } from "../../../../assets";


interface ArrangeProps {
    isVisible: boolean
    setIsVisible : (value: boolean) => void
}


const ArrangeModal = (props: ArrangeProps) => {

    const {isVisible, setIsVisible} = props;
    const [click, setclick] = useState(0)

    return(
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={() =>setIsVisible(false)}
            
        >
            <View style={{flex:1, alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
               
                <View style={styles.container}>
                    <View style={{alignItems:'center', marginTop:8, marginBottom:scaleHeight(25)}}>  
                    <View style={{width:scaleWidth(68), borderWidth:3, borderRadius:10, borderColor:"#C7C7C7"}}/>
                    </View>
               
                    <View style={styles.titleModal}>
                        <Text
                        tx="inforMerchant.Arrange"
                        />
                        <TouchableOpacity
                        
                        onPress={() => setIsVisible(false)}
                        >
                            <Text
                                style={{color:"red", fontWeight:"700"}}
                                tx="inforMerchant.cancel"
                            />
                        </TouchableOpacity>
                       
                    </View>

                    <View style={{alignItems:'center'}}>
                        <View style={styles.line}/>
                    </View> 
                   
                   <TouchableOpacity
                    style={{
                        paddingVertical:scaleHeight(14),
                        paddingHorizontal:scaleWidth(18),
                        justifyContent:'space-between',
                        flexDirection:'row'
                    }}
                    onPress={() => setclick(1)}
                   >
                    <Text>Mới nhất</Text>

                    {
                        click == 1 ?
                        <Images.ic_tick/>
                         :
                         null   
                    }
                   </TouchableOpacity>

                   <View style={{alignItems:'center'}}>
                        <View style={styles.line}/>
                    </View> 

                    <TouchableOpacity
                   
                    style={{
                        paddingVertical:scaleHeight(14), 
                        paddingHorizontal:scaleWidth(18),
                         justifyContent:'space-between',
                        flexDirection:'row'
                    }}

                    onPress={() => setclick(2)}
                   >
                    <Text>Sản phẩm bán chạy</Text>
                    {
                        click == 2 ?
                        <Images.ic_tick/>
                         :
                         null   
                    }

                   </TouchableOpacity>
                   
                   <View style={{alignItems:'center'}}>
                        <View style={styles.line}/>
                    </View> 

                    <TouchableOpacity
                   
                    style={{
                        paddingVertical:scaleHeight(14), 
                        paddingHorizontal:scaleWidth(18),
                         justifyContent:'space-between',
                        flexDirection:'row'
                    }}

                    onPress={() => setclick(3)}
                   >
                    <Text>Giá từ thấp đến cao</Text>
                    {
                        click == 3 ?
                        <Images.ic_tick/>
                         :
                         null   
                    }
                   </TouchableOpacity>
                   
                   <View style={{alignItems:'center'}}>
                        <View style={styles.line}/>
                    </View> 

                    <TouchableOpacity
                   
                    style={{
                        paddingVertical:scaleHeight(14), 
                        paddingHorizontal:scaleWidth(18),
                         justifyContent:'space-between',
                        flexDirection:'row'
                    }}

                    onPress={() => setclick(4)}
                   >
                    <Text>Giá Từ Cao đến thấp</Text>
                    {
                        click == 4 ?
                        <Images.ic_tick/>
                         :
                         null   
                    }
                   </TouchableOpacity>
                   
                

                  
                  
                </View>
            </View>
           

        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        borderRadius:8,
        width: scaleWidth(343),
        height: scaleHeight(301),
        backgroundColor:'#FFFFFF',
        padding: 8,
        // alignItems:'center',
        
        position: 'absolute',
        bottom:scaleHeight(15)
    },
    titleModal:{    
        flexDirection:'row',
        justifyContent:"space-between",
        marginBottom:scaleHeight(18),
        paddingHorizontal:scaleWidth(16),

    },
    line:{
        
        borderColor:"#E7EFFF",
        borderWidth:1,
        width:'100%'
    }
})

export default ArrangeModal;