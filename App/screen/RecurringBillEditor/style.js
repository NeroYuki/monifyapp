import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants'

export const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header_text: {
        fontSize: 20,
        fontWeight: '700'
    },
    setting_entry: {
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})