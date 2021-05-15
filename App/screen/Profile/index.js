import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';
import { images } from '../../assets/constants';
import { ProfileHeader } from '../../components/ProfileScreen/ProfileHeader';

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Banner Photo */}
                <View style={{ height: 400 }}>
                    <Image
                        source={images.backgroundYellow}
                        resizeMode='cover'
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                    />
                </View>

                {/* Detail of Budget */}
                <View style={styles.allWallet}>

                </View>

                {/* Render Header */}
                <ProfileHeader />

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    allWallet: {
        flex: 1,
        backgroundColor: 'red'
    },
});