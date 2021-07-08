import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { stylesheet } from './style'

export class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            txtEmail: "",
            txtPassword: "",
            txtUsername: "",
        }
    }

    render() {
        const style = stylesheet
        
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.header_text_big}>
                        Create account
                    </Text>
                    <Text style={style.header_text}>
                        Sign up to get started
                    </Text>
                </View>
                <View style={style.input_field}>
                    <TextInput
                        label="Username"
                        value={this.state.txtUsername}
                        onChangeText={t => this.setState({txtUsername: t})}
                    />
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
                </View>
                <View style={style.footer}>
                    <Button mode="contained" contentStyle={style.footer_button_content} style={style.footer_button}>
                        Create account
                    </Button>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login')}}>
                        <Text style={style.footer_text}>
                            Already have an account? <Text>Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};