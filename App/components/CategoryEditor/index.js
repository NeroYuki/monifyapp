import React, { Component } from "react";
// import { stylesheet } from './style'
import { Text, View, StyleSheet, TextInput, SectionList, FlatList, Image } from "react-native";
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, icons } from "../../assets/constants";

import { RadioButton } from "react-native-paper"


export class CategoryEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: 'Income',
            DATA: [
                {
                    id: '1',
                    text: 'Long',
                    source: icons.foodIcon,
                },
                {
                    id: '2',
                    text: 'Yeu',
                    source: icons.bonusIcon,
                },
                {
                    id: '3',
                    text: 'Yen',
                    source: icons.clothesIcon,
                },
            ],
        }
    }

    RenderItem = ({ items }) => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 48, width: 48, marginVertical: 8, marginHorizontal: 8, }}>
            <Image
                source={items.item.source}
                style={{
                    height: 48,
                    width: 48,
                }}
                resizeMode='contain'
            />
        </View>
    );


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
                            onChangeText={text => console.log(text)}
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
                            // numColumns={2}
                            horizontal
                            data={this.state.DATA}
                            keyExtractor={items => items.id}
                            renderItem={(items) => {
                                // console.log(items)
                                return (
                                    <this.RenderItem items={items} />
                                )
                            }}
                        />
                    </View>
                </View>

                <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.button}>
                        <Text style={{ color: COLORS.white, fontSize: 17 }}>SAVE</Text>
                    </View>
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