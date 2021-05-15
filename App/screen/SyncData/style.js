import { StyleSheet } from 'react-native'

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
})