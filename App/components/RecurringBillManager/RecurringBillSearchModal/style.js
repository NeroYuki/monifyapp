import { StyleSheet } from 'react-native'
import { COLORS } from '../../../assets/constants'

export const stylesheet = StyleSheet.create({
    main_view: {
        height: "30%", 
        marginTop: 'auto',
        elevation: 20,
        backgroundColor: COLORS.lightGray
    },
    main_view_tab :{
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'space-around'
    },
    main_view_header: {
        backgroundColor: "white",
        textAlign: 'center',
        padding: 10,
        color: 'grey',
    },
    amount_group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})