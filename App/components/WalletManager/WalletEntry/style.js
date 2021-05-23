import { StyleSheet } from 'react-native'
import { COLORS } from '../../../assets/constants'

export const stylesheet = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 4,
    },
    info_view: {
        flex: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left_container: {
        justifyContent: 'center',
    },
    right_container: {
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
    },
    last_tran: {
        color: COLORS.gray,
        marginTop: 5,
    },
    amount: {
        fontSize: 24,
    },
    option: {
        flex: 1,
        justifyContent: 'center',
    }
})