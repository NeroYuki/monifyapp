import { StyleSheet } from 'react-native'
import { COLORS } from '../../../assets/constants'

export const stylesheet = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLORS.blackBlur,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    container: {
        height: '80%',
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 20,

        // Shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,

        elevation: 5
    },
})