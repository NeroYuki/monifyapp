import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import { icons } from "../../assets/constants";
import { stylesheet } from './style';

export class DescriptiveButton extends Component {
    render() {

        // console.log(this.props.icon)

        const style = stylesheet
        const desc_section = (this.props.desc) ?
            (<Text style={style.description_text}>{this.props.desc}</Text>) :
            (<View></View>)
        return (
            <TouchableHighlight style={[style.button, this.props.style]} onPress={(this.props.onPress) ? this.props.onPress : () => { console.log('default handler') }} underlayColor="#dddddddd">
                <View style={style.button_layout}>
                    {/* <Icon name={(this.props.icon) ? this.props.icon : "close"} size={64} style={style.icon} /> */}

                    <View style={style.icon}>
                        <Image
                            source={this.props.icon}
                            resizeMode='contain'
                            style={{
                                height: 48,
                                width: 48,
                            }}
                        />
                    </View>

                    <Text style={style.title_text}>{this.props.title}</Text>
                    {desc_section}
                </View>
            </TouchableHighlight>
        )
    }
}