import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants'

export const stylesheet = StyleSheet.create({
    modal_container: {
        padding: 10, 
        height: "70%", 
        width: "90%", 
        backgroundColor: COLORS.white, 
        color: COLORS.white,
        elevation: 20,
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        elevation: 20,
    },
})