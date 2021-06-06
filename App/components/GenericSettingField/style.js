import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants'

export const stylesheet = StyleSheet.create({
    container: {
        elevation: 4,
        //borderWidth: 1,
        backgroundColor: COLORS.white
    },

    title: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        textTransform: 'uppercase',
        color: COLORS.blue,
        fontSize: 14,
    },
    value: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
    },
    description: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: COLORS.gray,
        fontSize: 12,
    }
})