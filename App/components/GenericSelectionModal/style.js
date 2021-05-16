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
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignSelf: 'stretch'
    },
    main_view_header: {
        backgroundColor: "white",
        textAlign: 'center',
        padding: 10,
        color: 'grey',
    },
    selection_entry: {
        
    },
    selection_entry_text: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        fontSize: 18,
    }
})