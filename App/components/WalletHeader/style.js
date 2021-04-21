import { StyleSheet } from 'react-native'

export const stylesheet = StyleSheet.create({
    surface: {
        height: 150,
        backgroundColor: "#ff92a7",
        flexDirection: "column",    
        elevation: 12,
    },
    selector: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selector_text: {
        fontSize: 18,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selector_text_highlight: {
        fontSize: 18,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    info_field: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    info_field_divider: {
        backgroundColor: 'white',
        height: "30%",
        width: 1,
    },
    info_field_text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14
    },
    info_field_text_highlight: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button_group: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        borderRadius: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button_content: {
        width: 150,
    },
    button_label: {
        color: "#ff92a7",
    }
})