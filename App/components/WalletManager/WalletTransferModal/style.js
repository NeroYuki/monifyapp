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

    header: {
        marginLeft: 16,
        marginRight: 16,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textHeader: {
        flex: 1,
        fontSize: 17,
        fontWeight: '300',
        textAlign: 'center',
    },
    moneyTitle: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info_field: {
        flex: 1,
    },
    info_field_item: {
        height: 48,
        margin: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    info_field_item_text: {
        marginLeft: 20,
        fontSize: 17,
    },

    button: {
        height: 48,
        backgroundColor: COLORS.yellow,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

        // Shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
})