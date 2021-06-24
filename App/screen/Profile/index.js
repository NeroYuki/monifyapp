import React from 'react';
import { Text, Image, View, ImageBackground, } from 'react-native';
import { stylesheet } from './style'
import { images } from '../../assets/constants';
import { ProfileHeader } from '../../components/ProfileScreen/ProfileHeader';
import { Avatar } from 'react-native-paper';
import { DescriptiveButton } from '../../components';

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const style = stylesheet

        return (
            <View style={style.container}>
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
                    <DescriptiveButton icon="wallet-outline" title="Wallet" style={style.button_entry} onPress={() => { this.props.navigation.push("Wallet") }}></DescriptiveButton>
                    <DescriptiveButton icon="piggy-bank" title="Saving" style={style.button_entry} onPress={() => { this.props.navigation.push("Saving") }}></DescriptiveButton>
                    <DescriptiveButton icon="account-cash-outline" title="Loan" style={style.button_entry} onPress={() => { this.props.navigation.push("Loan") }}></DescriptiveButton>
                    <DescriptiveButton icon="repeat" title="Recurring Bills" style={style.button_entry} onPress={() => { this.props.navigation.push("RecurringBill") }}></DescriptiveButton>
                </View>



            </View >
        );
    }
}
