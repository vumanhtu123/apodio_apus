import { colors } from '../../../../theme/colors';
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({

    main: {
        flex:1,
        backgroundColor: colors.aliceBlue
    },

    body: {
        backgroundColor: colors.palette.white ,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: '5%',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
     

    },
    item: {
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:16,
        // alignItems:'center',
      
       
    
    },
    leftContent: {
        flexDirection:'row',
        

    },
    rightConten: {

    },
    divider: {
        height:1, 
        backgroundColor: colors.gray,
        // backgroundColor:'red',
        marginHorizontal:16
    },
    centeredView: {
        // justifyContent: 'center',
       
        // marginTop:60,
        // alignItems: 'center',
      
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalView: {
        width:252,
        height:210,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      closeButton: {
        backgroundColor: colors.dodgerBlue1,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 10,
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },

})