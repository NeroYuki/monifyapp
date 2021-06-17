import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, icons } from '../../assets/constants';
import { fetchCategory } from '../../logic/Component-CategoryEditor';
import { currencyFormat } from '../../utils/formatNumber';


export class ItemsOverView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // data: [
            //     {
            //         title: "TUESDAY, 5 MAR",
            //         total: '+350.000',
            //         data: [
            //             {
            //                 key: 'Salary',
            //                 money: '450.000',
            //                 describe: '',
            //             },
            //             {
            //                 key: 'Food',
            //                 money: '300.000',
            //                 describe: 'Chocolate + Milk'
            //             },
            //         ]
            //     },
            //     {
            //         title: "TUESDAY, 3 MAR",
            //         total: '-250.000',
            //         data: [
            //             {
            //                 key: 'Internet',
            //                 money: '200.000',
            //                 describe: '',
            //             },
            //             {
            //                 key: 'Food',
            //                 money: '50.000',
            //                 describe: ''
            //             },
            //         ]
            //     },
            // ]
            data: ''
        };
    }

    getData = async () => {
        var dataFetched = this.props.data

        console.log("DATA TRANS: ", this.props.currentOption)

        var trans = []

        for (var i = dataFetched.length - 1; i >= 0; --i) {

            var datas = []
            var total = 0

            for (var j in dataFetched[i].data) {
                var icon = JSON.parse(JSON.stringify(await fetchCategory({ categoryId: dataFetched[i].data[j].loaihangmucgd })))
                datas.push({
                    icon: icon,
                    datas: dataFetched[i].data[j],
                })

                // total = total + (dataFetched[i].data[j].sotientieudung) ? -dataFetched[i].data[j].sotientieudung : +dataFetched[i].data[j].sotienthunhap
                if (dataFetched[i].data[j].sotientieudung != null) {
                    total -= dataFetched[i].data[j].sotientieudung
                } else {
                    total += dataFetched[i].data[j].sotienthunhap
                }
            }

            var value = {
                title: dataFetched[i].time,
                total: total,
                data: datas,
            }

            trans.push(value)
        }

        this.setState({ data: trans })
    }

    componentDidMount = async () => {
        this.getData()
    }



    Item = ({ items }) => (

        <TouchableOpacity
            style={styles.item}
            // onPress={this.props.onPressTransactionEditor}
            onPress={
                (this.props.onPressTransactionEditor) ?
                    () => {
                        // console.log("111", items.icon[0].color)
                        this.props.onPressTransactionEditor(items)
                    }
                    :
                    () => { console.log(items) }
            }
        >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={{
                        height: 32,
                        width: 32
                    }}
                    source={items.icon[0].iconhangmuc}
                    resizeMode='contain'
                />
                <View style={{ flex: 1, marginLeft: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>{items.icon[0].tenhangmuc}</Text>
                        <Text style={styles.describe}>   {items.datas.ghichu}  </Text>
                    </View>
                    {
                        (items.datas.sotientieudung != null) ?
                            <Text style={styles.title}> -{currencyFormat(items.datas.sotientieudung)}</Text>
                            :
                            <Text style={styles.title}> +{currencyFormat(items.datas.sotienthunhap)}</Text>
                    }

                </View>

            </View>
            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </TouchableOpacity>
    );

    Header = ({ section }) => (
        <View style={styles.header}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.titleHeader}>{section.title}</Text>
                <Text style={styles.totalHeader}>{currencyFormat(section.total)}</Text>
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.separateLine }}></View>
        </View>
    );

    Footer = () => (
        <View style={styles.footer}>
        </View>

    );

    render() {
        console.log("STATE DATA: ", this.state)
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
        height: 20,
        backgroundColor: COLORS.grayBackground,
        marginTop: -1
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
    describe: {
        fontSize: 15,
        color: COLORS.gray
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

})