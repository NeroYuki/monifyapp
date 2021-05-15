import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants'

export const stylesheet = StyleSheet.create({
    button: {
        minWidth: 100,
        minHeight: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        elevation: 8,
    },
    button_layout: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    icon: {
        flex: 2,
    },
    title_text: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 20,
        flex: 1,
    },
    description_text: {
        color: 'grey',
        flex: 2,
        textAlign: 'center',
    }
})