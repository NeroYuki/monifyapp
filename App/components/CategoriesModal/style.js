import { StyleSheet } from 'react-native'

export const stylesheet = StyleSheet.create({
    modal_view: {
        backgroundColor: "#000000e0", 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    modal_text: {
        color: 'white'
    },
    modal_text_header: {
        flex: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    },
    tab_switcher: {
        flex: 2
    },
    tab_switcher_frame: {
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000',
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        flexDirection: 'row',
    },
    content_list: {
        flex: 15
    },
    on_select: {
        borderRadius: 7,
        backgroundColor: 'white',
        flex: 1,
        height: "90%",
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    on_nonselect: {
        borderRadius: 7,
        flex: 1,
        height: "90%",
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    category_entry: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-evenly',
    },
    category_entry_content: {
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'flex-start',
    },
    content_list_text: {
        marginLeft: 20
    }
})