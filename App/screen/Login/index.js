import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            txtEmail: "",
            txtPassword: "",
        }
    }

    render() {

        const style = StyleSheet.create({
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

        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.header_text_big}>
                        Welcome,
                    </Text>
                    <Text style={style.header_text}>
                        Sign in to continue {"\n"}
                        Get your money under control
                    </Text>
                </View>
                    <View style={style.input_field}>
                    <TextInput
                        label="Email"
                        value={this.state.txtEmail}
                        onChangeText={t => this.setState({txtEmail: t})}
                    />
                    <TextInput
                        label="Password"
                        value={this.state.txtPassword}
                        onChangeText={t => this.setState({txtPassword: t})}
                    />
                    <Text style={style.input_field_forgot_password}>
                        Forgot password?
                    </Text>
                </View>
                <View style={style.footer}>
                    <Button mode="contained" contentStyle={style.footer_button_content} style={style.footer_button}>
                        Sign In
                    </Button>
                    <Text style={style.footer_text}>
                        Don't have an account? <Text>Create an account</Text>
                    </Text>
                </View>
            </View>
        );
    }
};