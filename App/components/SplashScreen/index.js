import React, { Component } from "react";
import { stylesheet } from './style'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal, SafeAreaView, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, images } from '../../assets/constants'

export class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const styles = stylesheet
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={styles.background}>
                    <View style={styles.container}>
                        <Image
                            style={{width: "50%", height: "30%",resizeMode: 'contain'}}
                            source={images.appLogo}
                        />
                        <Text style={{fontSize: 48, fontFamily: 'san-serif', margin: 20}}>Monify App</Text>
                        <Text style={{fontSize: 20, color: COLORS.gray}}>Your personal finance - Anywhere you go</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}