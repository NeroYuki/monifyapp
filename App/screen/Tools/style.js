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
    button_grid: {
        margin: 10,
        flex: 11,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        
    },
    button_entry: {
        marginVertical: 10,
        height: 220,
        width: "48%"
    }
})