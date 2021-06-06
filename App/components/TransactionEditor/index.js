import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, icons } from "../../assets/constants";


export class TransactionEditor extends Component {
    render() {
        const style = stylesheet
        //console.log(Icon)
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.onRequestClose}>
                        <Icon name='close' size={24} />
                    </TouchableOpacity>

                    <Text style={styles.textHeader}>EDIT TRANSACTION</Text>
                </View>

                <View style={styles.moneyTitle}>
                    <TextInput
                        style={{
                            height: '100%',
                            fontSize: 40,
                            fontWeight: '300'
                        }}
                        defaultValue={(this.props.currentData)? this.props.currentData.money : 0}
                        placeholder='0'
                        onChangeText={text => console.log(text)}
                    />
                </View>

                <View style={style.info_field}>
                    <TouchableOpacity
                        onPress={this.props.onCategoriesPress}
                    >
                        <View style={style.info_field_item}>
                            <Icon name="sack" size={24} />
                            <Text style={style.info_field_item_text}>{(this.props.currentData)? this.props.currentData.key : ""}</Text>
                        </View>
                    </TouchableOpacity>
                    <Divider style={{ height: 1 }} />

                    <View style={style.info_field_item}>
                        <Icon name="notebook" size={24} />
                        <TextInput
                            style={{
                                height: '100%',
                                width: '100%',
                                fontSize: 17,
                                marginLeft: 16,
                            }}
                            defaultValue={(this.props.currentData)? this.props.currentData.describe : ""}
                            placeholder="Note"
                            onChangeText={text => console.log(text)}
                        />
                    </View>
                    <Divider style={{ height: 1 }} />

                    <View style={style.info_field_item}>
                        <Icon name="calendar" size={24} />
                        <Text style={style.info_field_item_text}>Tuesday, 5 Mar</Text>
                    </View>
                    <Divider style={{ height: 1 }} />

                    <TouchableOpacity
                        onPress={this.props.onRecurringPress}
                    >
                        <View style={style.info_field_item}>
                            <Icon name="repeat" size={24} />
                            <Text style={style.info_field_item_text}>Make Recurring</Text>
                        </View>
                    </TouchableOpacity>

                    <Divider style={{ height: 1 }} />
                </View>

                <View style={{ height: 64, marginBottom: 16, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ height: 64, width: 64 }}>
                        <Image
                            source={icons.trash}
                            resizeMode='cover'
                            style={{
                                width: 64,
                                height: 64,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>
                        <View style={styles.button}>
                            <Text style={{ fontSize: 17, color: COLORS.white }}> SAVE </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})

