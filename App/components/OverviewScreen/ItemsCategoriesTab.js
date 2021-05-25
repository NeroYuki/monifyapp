import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, icons } from '../../assets/constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export class ItemsCategoriesTab extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    title: "Expenses",
                    total: '+350.000',
                    data: [
                        {
                            key: 'Salary',
                            money: '450.000',
                            percentage: '30%',
                        },
                        {
                            key: 'Food',
                            money: '300.000',
                            percentage: '43%',
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
                <View style={{ flex: 1, marginLeft: 16, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{items.money}</Text>
                        <Text style={styles.describe}>{items.key}  </Text>
                    </View>

                    <View style={{ height: '100%', alignItems: 'center' }}>
                        <Text style={styles.percentage}> {items.percentage} </Text>
                    </View>


                </View>

            </View>
            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>
    );

    Header = ({ section }) => (
        <TouchableOpacity style={styles.header}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.titleHeader}>Showing: </Text>
                    <Text style={styles.totalHeader}>{section.title}</Text>
                </View>

                <View style={{ marginRight: 20, height: 25, width: 25 }}>
                    <Icon
                        name="chevron-right"
                        size={25}>
                    </Icon>
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </TouchableOpacity>
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

    footer: {
        height: 48,
        backgroundColor: COLORS.grayBackground,
        marginTop: -1
    },
    item: {
        flex: 1,
        minHeight: 70,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 17
    },
    describe: {
        fontSize: 15,
        color: COLORS.gray
    },
    percentage: {
        fontSize: 20,
    },
    titleHeader: {
        marginLeft: 20,
        color: COLORS.gray
    },

    totalHeader: {
        marginRight: 20,
        color: COLORS.black,
        fontWeight: 'bold'
    },

})