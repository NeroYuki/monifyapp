import React, { Component } from "react";
// import { stylesheet } from './style'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import { COLORS } from "../../assets/constants";

import { RadioButton } from "react-native-paper"
import { iconData } from "../../appdata/iconData";
import { saveCategory } from "../../logic/Component-CategoryEditor";

export class CategoryEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            selectedType: 'Income',
            selectedIcon: '',
            DATA: iconData
        }
    }

    RenderItem = ({ items }) => (
        <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center', height: 48, width: 48, marginVertical: 8, marginHorizontal: 8, }}
            onPress={() => {
                this.setState({ selectedIcon: items.item.source })
            }}
        >
            <Image
                source={items.item.source}
                style={{
                    height: (this.state.selectedIcon == items.item.source) ? 64 : 48,
                    width: (this.state.selectedIcon == items.item.source) ? 64 : 48,
                }}
                resizeMode='contain'
            />
        </TouchableOpacity>
    );

    handleSaveCategory = async () => {
        console.log("Handle Save Category")

        if (this.state.name == '' || this.state.selectedIcon == '') {
            Alert.alert(
                "Something wrong!",
                "Please fill in all the field",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
        else {
            hangmucgiaodich = {
                userid: '60c0cb55a09b8f641df3ca14',
                name: this.state.name,
                icon: String(this.state.selectedIcon),
                loaihangmuc: (this.state.selectedType == 'Income') ? 'thunhap' : 'chitieu',
                color: '#fdfd96'
            }

            console.log("Hang Muc Giao dich", hangmucgiaodich)

            console.log(JSON.parse(JSON.stringify(await saveCategory(hangmucgiaodich))))

            this.props.onDismiss()
        }

    }


    render() {
        return (
            <View style={styles.container}>

                {/* Header  */}
                <View style={{ height: 48, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: '300' }}>NEW CATEGORY</Text>
                </View>

                {/* Name  */}
                <View style={[styles.nameField, styles.dropshadow]}>
                    <View style={{ height: 48, marginLeft: 16 }}>
                        <Text style={{ marginTop: 16, color: COLORS.blueText }}> NAME </Text>
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                        <TextInput
                            style={{
                                height: '100%',
                                fontSize: 17
                            }}
                            placeholder="Required"
                            onChangeText={text => {
                                // console.log(text)
                                this.setState({
                                    name: text,
                                })
                            }}
                        />
                    </View>
                </View>

                {/* Category Type  */}
                <View style={[styles.categoryField, styles.dropshadow]}>
                    <View style={{ height: 48, marginLeft: 16 }}>
                        <Text style={{ marginTop: 20, color: COLORS.blueText }}> CATEGORY TYPE </Text>
                    </View>

                    <View style={{ flex: 1, marginLeft: 16, justifyContent: 'center' }}>
                        <RadioButton.Group
                            value={this.state.selectedType}
                            onValueChange={value => {
                                this.setState({ selectedType: value })
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton value="Income" />
                                <Text style={{ fontSize: 15, paddingLeft: 8 }}>Income</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton value="Expense" />
                                <Text style={{ fontSize: 15, paddingLeft: 8 }}>Expense</Text>

                            </View>
                        </RadioButton.Group>
                    </View>
                </View>

                {/* Icon  */}
                <View style={[styles.appearance, styles.dropshadow]}>
                    <View style={{ height: 48, marginLeft: 16 }}>
                        <Text style={{ marginTop: 16, color: COLORS.blueText }}> ICON </Text>
                    </View>

                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <FlatList
                            style={{ flex: 1, padding: 8 }}
                            horizontal
                            data={this.state.DATA}
                            keyExtractor={items => items.id}
                            renderItem={(items) => {
                                return (
                                    <this.RenderItem items={items} />
                                )
                            }}
                        />
                    </View>
                </View>

                <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSaveCategory}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 17 }}>SAVE</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    nameField: {
        marginTop: 16,
        height: 100,
        backgroundColor: 'white',
    },
    categoryField: {
        marginTop: 16,
        paddingBottom: 16,
        height: 150,
        backgroundColor: 'white'

    },

    appearance: {
        marginTop: 16,
        flex: 1,
        backgroundColor: 'white',
    },

    button: {
        height: 50,
        width: 250,
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
        shadowOpacity: 0.25,
        shadowRadius: 10,

        elevation: 5
    },
    dropshadow: {
        // Shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 5
    }
})