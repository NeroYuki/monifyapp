import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants'

export const stylesheet = StyleSheet.create({
    saving_entry: {
        margin: 10,
    },
    container: {
        flex: 1
    },
    search_bar: {
        padding: 10,
        flexDirection: 'row',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})