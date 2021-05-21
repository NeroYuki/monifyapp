import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image } from 'react-native';
import { COLORS, icons } from '../../assets/constants';


export class ItemsOverView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    title: "TUESDAY, 5 MAR",
                    total: '+350.000',
                    data: [
                        {
                            key: 'Salary',
                            money: '450.000',
                            describe: '',
                        },
                        {
                            key: 'Food',
                            money: '300.000',
                            describe: 'Chocolate + Milk'
                        },
                    ]
                },
                {
                    title: "TUESDAY, 3 MAR",
                    total: '-250.000',
                    data: [
                        {
                            key: 'Internet',
                            money: '200.000',
                            describe: '',
                        },
                        {
                            key: 'Food',
                            money: '50.000',
                            describe: ''
                        },
                    ]
                },
            ]
        };
    }

    Item = ({ items }) => (
        <View style={styles.item}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={{
                        height: 32,
                        width: 32
                    }}
                    source={icons.foodIcon}
                    resizeMode='contain'
                />
                <View style={{ flex: 1, marginLeft: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>{items.key}</Text>
                    <Text> {items.describe} </Text>
                    <Text style={styles.title}>{items.money}</Text>
                </View>

            </View>
            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>
    );

    Header = ({ section }) => (
        <View style={styles.header}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.titleHeader}>{section.title}</Text>
                <Text style={styles.totalHeader}>{section.total}</Text>
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>
    );

    Footer = () => (
        <View style={styles.footer}>
        </View>

    );

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    style={styles.selectionList}
                    scrollEnabled={false}
                    sections={this.state.data}
                    renderItem={({ item }) => <this.Item items={item} />}
                    renderSectionHeader={({ section }) => <this.Header section={section} />}
                    renderSectionFooter={() => <this.Footer />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        minHeight: 60,
        width: '100%',
        backgroundColor: COLORS.white
    },

    selectionList: {
    },

    header: {
        height: 48,
        justifyContent: 'space-between'
    },
    item: {
        flex: 1,
        minHeight: 48,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 17
    },
    titleHeader: {
        marginTop: 16,
        marginLeft: 20,
        color: COLORS.blueText
    },

    totalHeader: {
        marginTop: 16,
        marginRight: 20,
        color: COLORS.pink
    },

    footer: {
        flex: 1,
        height: 20,
        backgroundColor: '#f2f2f2'
    }
})