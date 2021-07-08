import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants'

export const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
    },
    header_content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    header_title: {
        height: 60,
    },

    header_background: {
        flex: 1,
    },

    header_avatar: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_username_text: {
        color: COLORS.white,
        fontSize: 20,
        marginBottom: 20,
        fontWeight: '500'
    },

    header: {
        flex: 1,
    },

    allWallet: {
        flex: 1.5,
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
    },

    button_entry: {
        marginVertical: 10,
        height: 120,
        width: "48%"
    }
})