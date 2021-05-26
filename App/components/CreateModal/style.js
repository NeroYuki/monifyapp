import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants'

export const stylesheet = StyleSheet.create({
    overlay: {
        height: "100%",
        //backgroundColor: "#000000d0",
        elevation: 1
    },
    main_view: {
        height: "30%", 
        marginTop: 'auto',
        elevation: 20,
        backgroundColor: COLORS.lightGray
    },
    main_view_tab :{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-evenly'
    },
    main_view_button_container: {
        marginHorizontal: 5,
        height: 175,
        width: "48%",
    },
    main_view_header: {
        backgroundColor: "white",
        textAlign: 'center',
        padding: 10,
        color: 'grey',
    },
    transaction_container: {
        padding: 10, 
        height: "90%", 
        width: "90%", 
        backgroundColor: COLORS.white, 
        color: COLORS.white,
        elevation: 20,
    },
    transaction: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        elevation: 20,
    },
})