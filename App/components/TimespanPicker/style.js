import { StyleSheet } from 'react-native'

export const stylesheet = StyleSheet.create({
    overlay: {
        height: "100%",
        backgroundColor: "#00000000",
        elevation: 1
    },
    main_view: {
        height: "40%", 
        marginTop: 'auto',
        elevation: 20,
    },
    main_view_tab :{

    },
    main_view_header: {
        backgroundColor: "white",
        textAlign: 'center',
        padding: 10,
        color: 'grey',
    },
    period_selection: {

    },
    custom_selection: {
        flex: 1,
        flexDirection: 'row',
    },
    custom_selection_column: {
        flex: 1,
        padding: 20,
        paddingBottom: 80,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        //flex: 1,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        
    },
    custom_selection_row_text: {
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 16,
    }
})