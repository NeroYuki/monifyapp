import { StyleSheet } from 'react-native'

export const stylesheet = StyleSheet.create({
    button: {
        borderRadius: 70,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
    },
    button_content: {
        width: 150,
        height: 40,
        justifyContent: 'center'
    },
    button_label: {
        color: "black",
        fontSize: 18,
        textAlign: "center",
        //margin: "10%"
    }
})