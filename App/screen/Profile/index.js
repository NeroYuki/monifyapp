import React from 'react';
import { Text, Image, View, ImageBackground, } from 'react-native';
import { stylesheet } from './style'
import { icons, images } from '../../assets/constants';
import { ProfileHeader } from '../../components/ProfileScreen/ProfileHeader';
import { Avatar } from 'react-native-paper';
import { DescriptiveButton } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wallet: icons.wallet,
            saving: icons.pig,
            loan: icons.loan,
            recurring: icons.recurring
        }
    }

    render() {

        const style = stylesheet

        console.log("PROFILE ", icons.wallet)
        return (
            <View style={style.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    {/* Banner Photo */}
                    <View style={style.header}>
                        <ImageBackground
                            source={images.backgroundYellow}
                            resizeMode='cover'
                            style={style.header_background}
                        >
                            <View style={style.header_content}>
                                {/* Render Header */}
                                <ProfileHeader style={style.header_title} />
                                <Avatar.Image style={style.header_avatar} size={100} source={images.avatarPlaceholder} />
                                <Text style={style.header_username_text}>Guest</Text>
                            </View>
                        </ImageBackground>
                    </View>



                    {/* Detail of Budget */}
                    <View style={style.allWallet}>
                        <DescriptiveButton
                            icon={this.state.wallet}
                            title="Wallet"
                            style={style.button_entry}
                            onPress={() => { this.props.navigation.push("Wallet") }}></DescriptiveButton>
                        <DescriptiveButton
                            icon={this.state.saving}
                            title="Saving"
                            style={style.button_entry}
                            onPress={() => { this.props.navigation.push("Saving") }}></DescriptiveButton>
                        <DescriptiveButton
                            icon={this.state.loan}
                            title="Loan"
                            style={style.button_entry}
                            onPress={() => { this.props.navigation.push("Loan") }}></DescriptiveButton>
                        <DescriptiveButton
                            icon={this.state.recurring}
                            title="Recurring"
                            style={style.button_entry}
                            onPress={() => { this.props.navigation.push("RecurringBill") }}></DescriptiveButton>
                    </View>
                </SafeAreaView>

            </View >
        );
    }
}
