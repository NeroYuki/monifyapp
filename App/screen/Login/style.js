import { StyleSheet } from 'react-native'

export const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    header: {
        flex: 2,
        justifyContent: "flex-end",
        marginBottom: "10%",
        margin: "3%"
    },
    header_text_big: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20
    },
    header_text: {
        fontSize: 18,
    },
    input_field: {
        flex: 2,
        margin: "3%",
    },
    input_field_forgot_password: {
        alignSelf: "flex-end",
        marginTop: 3
    },
    footer: {
        flex: 1,
        justifyContent: "space-evenly",
        margin: "3%"
    },
    footer_button: {
        borderRadius: 15,
    },
    footer_button_content: {
        height: 50,
    },
    footer_text: {
        textAlign: "center"
    }
})