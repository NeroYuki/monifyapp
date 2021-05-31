import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Modal, SafeAreaView } from "react-native";
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, icons } from "../../assets/constants";
import { CategoriesModal } from "../CategoriesModal";

import DateTimePicker from '@react-native-community/datetimepicker';
import { RecurringModal } from "./RecurringModal";


export class TransactionModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categoriesVisible: false,
            recurringVisible: false,

            customDate: new Date(),
            showPickerDialog: false,
        }

        this.openCategoriesModal = this.openCategoriesModal.bind(this)
        this.onChangeDateTime = this.onChangeDateTime.bind(this)
    }

    openCategoriesModal() {
        this.setState({
            categoriesVisible: !this.state.categoriesVisible
        })
    }

    onChangeDateTime(event, selectedDate) {

        const currentDate = selectedDate || this.state.customDate;
        this.setState({
            customDate: currentDate,
            showPickerDialog: false
        })
    }

    render() {

        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={styles.background}>
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
                                defaultValue={this.props.currentData.money}
                                placeholder='0'
                                onChangeText={text => console.log(text)}
                            />
                        </View>

                        <View style={styles.info_field}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ categoriesVisible: !this.state.categoriesVisible })
                                }}
                            >
                                <View style={styles.info_field_item}>
                                    <Icon name="sack" size={24} />
                                    <Text style={styles.info_field_item_text}>{this.props.currentData.key}</Text>
                                </View>
                            </TouchableOpacity>
                            <Divider style={{ height: 1 }} />

                            <View style={styles.info_field_item}>
                                <Icon name="notebook" size={24} />
                                <TextInput
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        fontSize: 17,
                                        marginLeft: 16,
                                    }}
                                    defaultValue={this.props.currentData.describe}
                                    placeholder="Note"
                                    onChangeText={text => console.log(text)}
                                />
                            </View>
                            <Divider style={{ height: 1 }} />

                            <TouchableOpacity
                                onPress={() => this.setState({ showPickerDialog: true })}
                            >
                                <View style={styles.info_field_item}>
                                    <Icon name="calendar" size={24} />
                                    <Text style={styles.info_field_item_text}>Tuesday, 5 Mar</Text>
                                </View>
                            </TouchableOpacity>

                            <Divider style={{ height: 1 }} />

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ recurringVisible: !this.state.recurringVisible })
                                }}
                            >
                                <View style={styles.info_field_item}>
                                    <Icon name="repeat" size={24} />
                                    <Text style={styles.info_field_item_text}>Make Recurring</Text>
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
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', marginRight: 16, marginLeft: 16 }}>
                                <View style={styles.button}>
                                    <Text style={{ fontSize: 17, color: COLORS.white }}> SAVE </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <RecurringModal
                        isVisible={this.state.recurringVisible}
                        closePeriod={() => {
                            this.setState({ recurringVisible: false })
                        }}
                    />

                    <CategoriesModal
                        isVisible={this.state.categoriesVisible}
                        onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                    />

                    <SafeAreaView>
                        {this.state.showPickerDialog && (
                            <DateTimePicker
                                testID="dateTimePicker"

                                value={this.state.customDate}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={this.onChangeDateTime}
                            />
                        )}
                    </SafeAreaView>

                </View>

            </Modal>
        )

    }
}

const styles = StyleSheet.create({
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
})

