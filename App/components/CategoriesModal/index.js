import React, { Component } from "react";
import { View, Modal, Text, TouchableHighlight, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Divider, Modal as PModal } from "react-native-paper"
import { stylesheet } from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CategoryEditor } from "../CategoryEditor";
import { fetchCategories } from "../../logic/Component-CategoriesModal";

export class CategoriesModal extends Component {
    constructor(props) {
        console.log("Constructor")

        super(props)
        this.state = {
            isVisible: this.props.isVisible,
            isAddCategoryPromptVisible: false,
            typeSelection: 1,

            data: '',
            income_cat_list: [],
            expense_cat_list: [],
            editMode: false,
            selectingId: "",
        }

        this.onAddCategoryPress = this.onAddCategoryPress.bind(this)

        this.getData()
    }

    componentDidMount() {
        console.log("Component Did Mount")
    }

    getData = async () => {
        var value = JSON.parse(JSON.stringify(await fetchCategories({})))

        var expenses = []
        var incomes = []

        for (index in value) {
            if (value[index].loaihangmuc.chitieu == true) {
                expenses.push({
                    type: value[index].tenhangmuc,
                    icon: value[index].iconhangmuc,
                    id: value[index].idhangmucgiaodich
                })
            } else {
                incomes.push({
                    type: value[index].tenhangmuc,
                    icon: value[index].iconhangmuc,
                    id: value[index].idhangmucgiaodich
                })
            }
        }


        this.setState({
            expense_cat_list: expenses,
            income_cat_list: incomes
        })
        // console.log("Expense", expenses)
        // console.log("Income", incomes)

    }

    onAddCategoryPress() {
        console.log('Add Category')
        this.setState({
            isAddCategoryPromptVisible: true,
            selectingId: "",
        })
    }

    render() {
        const style = stylesheet
        //console.log('Here: ' + this.state.isVisible)
        const income_type_style = (this.state.typeSelection == 2) ? style.on_select : style.on_nonselect
        const expense_type_style = (this.state.typeSelection == 1) ? style.on_select : style.on_nonselect
        const income_text_style = (this.state.typeSelection == 2) ? { color: '#000000' } : { color: 'white' }
        const expense_text_style = (this.state.typeSelection == 1) ? { color: '#000000' } : { color: 'white' }

        const content_list = (this.state.typeSelection === 1) ?
            (this.state.expense_cat_list.map((val, index) => {

                return (
                    <View style={style.category_entry} key={index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={style.category_entry_content}
                                onPress={(this.props.chooseIcon) ?
                                    () => {
                                        this.props.onRequestClose()
                                        this.props.chooseIcon(val)
                                    }
                                    :
                                    () => { console.log(val) }}
                            >
                                <Image
                                    source={val.icon}
                                    resizeMode='contain'
                                    style={{
                                        height: 24,
                                        width: 24,
                                    }}
                                />
                                <Text style={[style.modal_text, style.content_list_text]}>{val.type}</Text>
                            </TouchableOpacity>
                            {(this.state.editMode) && 
                                <TouchableOpacity style={style.category_entry_content}
                                onPress={() => {
                                    console.log(val)
                                    this.setState({
                                        isAddCategoryPromptVisible: true,
                                        selectingId: val.id,
                                    })
                                }}>
                                    <Icon name="square-edit-outline" size={25} color="#fff" style={{}}></Icon>
                                </TouchableOpacity>
                            }
                        </View>
                        <Divider style={{ height: 1, backgroundColor: 'white' }}></Divider>
                    </View>
                )
            }))
            : (this.state.income_cat_list.map((val, index) => {
                return (
                    <View style={style.category_entry} key={index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={style.category_entry_content}
                                onPress={(this.props.chooseIcon) ?
                                    () => {
                                        this.props.onRequestClose()
                                        this.props.chooseIcon(val)
                                    }
                                    :
                                    () => { console.log(val) }}
                            >
                                <Image
                                    source={val.icon}
                                    resizeMode='contain'
                                    style={{
                                        height: 24,
                                        width: 24,
                                    }}
                                />
                                <Text style={[style.modal_text, style.content_list_text]}>{val.type}</Text>
                            </TouchableOpacity>
                            {(this.state.editMode) && 
                                <TouchableOpacity style={style.category_entry_content}
                                onPress={() => {
                                    this.setState({
                                        isAddCategoryPromptVisible: true,
                                        selectingId: val.id,
                                    })
                                }}>
                                    <Icon name="square-edit-outline" size={25} color="#fff" style={{}}></Icon>
                                </TouchableOpacity>
                            }
                        </View>
                        <Divider style={{ height: 1, backgroundColor: 'white' }}></Divider>
                    </View>
                )
            }))

        return (
            <Modal
                testID="CategoriesScreen"
                animationType='slide'
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={style.modal_view}>
                        <View style={style.header}>
                            <TouchableOpacity onPress={this.props.onRequestClose} testID="CategoryCloseIcon">
                                <Icon name="close" size={25} color="#fff"></Icon>
                            </TouchableOpacity>
                            <Text style={[style.modal_text, style.modal_text_header]}>CATEGORIES</Text>
                            <TouchableHighlight onPress={() => {
                                this.setState({
                                    editMode: !this.state.editMode
                                })
                            }}>
                                <Icon name="square-edit-outline" size={25} color="#fff"></Icon>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.onAddCategoryPress} testID="AddCategory">
                                <Icon name="plus" size={25} color="#fff"></Icon>
                            </TouchableHighlight>
                        </View>
                        <View style={style.tab_switcher}>
                            <View style={style.tab_switcher_frame}>
                                <TouchableHighlight style={expense_type_style} onPress={() => { this.setState({ typeSelection: 1 }) }}><Text style={expense_text_style}>Expense</Text></TouchableHighlight>
                                <TouchableHighlight testID="IncomeCategory" style={income_type_style} onPress={() => { this.setState({ typeSelection: 2 }) }}><Text style={income_text_style}>Income</Text></TouchableHighlight>
                            </View>
                        </View>
                        <Divider style={{ backgroundColor: 'white', marginTop: 10 }}></Divider>
                        <View style={style.content_list}>
                            {content_list}
                        </View>
                        <PModal visible={this.state.isAddCategoryPromptVisible} onDismiss={() => { this.setState({ isAddCategoryPromptVisible: false }) }} onRequestClose={() => { this.setState({ isAddCategoryPromptVisible: false }) }}
                            contentContainerStyle={style.transaction_container} style={style.transaction}>
                            <CategoryEditor editId={this.state.selectingId} onDismiss={() => {
                                this.setState({ isAddCategoryPromptVisible: false })
                                this.getData()
                            }} />
                        </PModal>
                    </View>
                </SafeAreaView>

            </Modal>
        )
    }
}