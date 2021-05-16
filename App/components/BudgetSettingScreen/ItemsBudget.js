import React, { Component } from 'react';
import { Text, View, StyleSheet, SectionList, Image } from 'react-native';
import { COLORS, icons } from '../../assets/constants';

export class ItemsBudget extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    title: "INCOME",
                    data: [
                        {
                            key: 'Food',
                            money: '200.000'
                        },
                        {
                            key: 'Entertainment',
                            money: '300.000'
                        },
                        {
                            key: 'Internet',
                            money: '400.000'
                        },
                        {
                            key: 'Coffee',
                            money: '600.000'
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
                <View style={{ flex: 1, marginLeft: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{items.key}</Text>
                    <Text style={styles.title}>{items.money}</Text>
                </View>

            </View>
            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>
    );

    Header = ({ section }) => (
        <View style={styles.header}>
            <Text style={styles.titleHeader}>{section.title}</Text>
            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>

    );

    Footer = () => (
        <View style={styles.item}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={{
                        height: 32,
                        width: 32
                    }}
                    source={icons.plusUnfill}
                    resizeMode='contain'
                />
                <Text style={[styles.title, { marginLeft: 16 }]}>Add new category</Text>
            </View>
            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>

    );


    render() {
        // console.log(this.props)
        return (
            <View style={styles.container}>
                <SectionList
                    style={styles.sectionlist}
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
        minHeight: 200,
        marginTop: 20,
        backgroundColor: COLORS.white
    },

    sectionlist: {
        marginBottom: 20,
    },

    header: {
        flex: 1,
        height: 48,
        justifyContent: 'space-between'
    },
    item: {
        flex: 1,
        height: 48,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 17
    },
    titleHeader: {
        fontSize: 17,
        marginTop: 16,
        marginLeft: 20,
        fontSize: 17,
        color: COLORS.blueText
    },
    titleFooter: {
        fontSize: 17,
        marginTop: 16,
        marginLeft: 20,
        fontSize: 17,
        color: COLORS.black
    }
})