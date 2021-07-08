import * as React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import { stylesheet } from './style'

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            txtEmail: "",
            txtPassword: "",
        }
    }

    render() {
        const style = stylesheet

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
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Register')}}>
                        <Text style={style.footer_text}>
                            Don't have an account? <Text>Create an account</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};