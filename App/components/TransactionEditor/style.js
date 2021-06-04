import { StyleSheet } from 'react-native'

export const stylesheet = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    header_text: {
        flex: 1,
        textAlign: "center"
    },
    amount_field: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    amount_field_text: {
        fontSize: 50,
    },
    info_field: {
        flex: 1,
    },
    info_field_item: {
        height: 30,
        margin: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    info_field_item_text: {
        marginLeft: 20
    },
    footer: {
        flex: 1,
        marginTop: 40,
    },
    footer_button: {
        borderRadius: 50,
        marginLeft: 50,
        marginRight: 50,
    },
    footer_button_content: {
        height: 50,
    }
})