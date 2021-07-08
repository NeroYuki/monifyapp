import React, { Component } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { stylesheet } from './style'
import { CategoriesModal, ColorPickerModal, GenericInputModal, GenericSelectionModal, GenericSettingField } from '../../components'
import { FAB, Snackbar } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchBill, saveBill } from "../../logic/screen-RecurringBillEditor";
import { querywallet } from "../../logic/Screen-wallet";
import moment from 'moment'
import sessionStore from "../../logic/sessionStore";

export class RecurringBillEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            desc: "",
            color: '#ffffff',
            amount: '0',
            icon: '',
            cycle_start: new Date(),
            cycle_duration_value: "1",
            cycle_duration_type_values: ['Day', 'Week', 'Month', 'Year'],
            //TODO: if day/week => cycle_duration_day = week*7/day
            //else => cycle_duration_month = month/year*12
            cycle_duration_type: 'Month',
            creation_date: new Date(),
            applied_wallet_values: [], //{key: id, text: name}
            applied_wallet: '', //id

            nameInputVisible: false,
            descInputVisible: false,
            amountInputVisible: false,
            cycleStartPickerVisible: false,
            cycleDurationInputVisible: false,
            cycleTypeSelectionVisible: false,
            colorPickerVisible: false,
            walletSelectionVisible: false,
            categoriesVisible: false,

            snackbarMessage: "",
            snackbarMessageVisible: false,
        }
        //route parameters
        console.log(this.props.route.params)

        this.handleChooseIcon = this.handleChooseIcon.bind(this)
    }

    async componentDidMount() {
        const id = this.props.route.params.id
        let wallet_selection = []
        let wallet_query_result = await querywallet({})
        wallet_query_result.forEach((val) => {
            wallet_selection.push({
                key: val.walletId,
                text: val.name,
            })
        })

        if (id) {
            //console.log(this.state)
            let arr_data = await fetchBill({billId: id})
            if (!arr_data || arr_data.length == 0) return
            let data = arr_data[0]
            let cycle_value = 0, cycle_type = ""
            //console.log(data.chukygiaodichtheothang)
            if (!data.chukygiaodichtheongay) {
                if (data.chukygiaodichtheothang % 12 === 0) {
                    cycle_value = data.chukygiaodichtheothang / 12
                    cycle_type = "Year"
                }
                else {
                    cycle_value = data.chukygiaodichtheothang
                    cycle_type = "Month"
                }
            }
            else {
                if (data.chukygiaodichtheongay % 7 === 0) {
                    cycle_value = data.chukygiaodichtheongay / 12
                    cycle_type = "Week"
                }
                else {
                    cycle_value = data.chukygiaodichtheongay
                    cycle_type = "Day"
                }
            }

            console.log(this.getWalletText(JSON.stringify(data.idtaikhoan).toString()))
            
            this.setState({
                name: data.name,
                desc: data.ghichu,
                color: data.color,
                amount: data.sotienthunhap || data.sotientieudung ,
                cycle_duration_value: cycle_value.toFixed(0),
                cycle_duration_type: cycle_type,
                applied_wallet: data.idtaikhoan,
                icon: data.loaihangmucgd,
                cycle_start: moment(JSON.stringify(data.thoigianbatdau), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate(),
                // interest: data.interest,
                applied_wallet_values: wallet_selection,
                creation_date: moment(JSON.stringify(data.thoigian), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate()
            })
            
        }
        else {
            this.setState({
                applied_wallet_values: wallet_selection
            })
        }
    }

    getWalletText(id) {
        if (!id) return
        //Fucking String object, not string primitive was returned. Fuck whoever code the fetching function
        id = id.toString()
        let appliedWalletIndex = this.state.applied_wallet_values.findIndex((val) => {return val.key === id})
        return (appliedWalletIndex !== -1)? this.state.applied_wallet_values[appliedWalletIndex].text : ""
    }

    handleChooseIcon(val) {
        console.log("ADD NEW TRANS - ICON: ", val)
        this.setState({
            icon: val
        })
    }

    handleSaveButton = async () => {
        console.log("SAVE BILL")
    }

    render() {
        const style = stylesheet
        const id = this.props.route.params.id
        const mode = this.props.route.params.mode
        return (
            <View style={style.container}>
                <ScrollView>
                    <GenericSettingField
                        style={style.setting_entry}
                        title="Recurring Bill Name"
                        value={this.state.name}
                        description="Change name of the bill"
                        onPress={(mode === "edit") ? () => { this.setState({ nameInputVisible: true }) } : null} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Recurring Bill Description"
                        value={this.state.desc}
                        description="Change description of the bill"
                        onPress={(mode === "edit") ? () => { this.setState({ descInputVisible: true }) } : null} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Recurring Bill Color"
                        color={this.state.color}
                        value={this.state.color}
                        description="Pick a color to represent the bill"
                        onPress={(mode === "edit") ? () => { this.setState({ colorPickerVisible: true }) } : null} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Bill Value"
                        value={this.state.amount}
                        description="The current value of the bill, one transaction will be made based on this value every cycle. Do note that a transaction value can still be changed later"
                        onPress={(mode === "edit") ? () => { this.setState({ amountInputVisible: true }) } : null} />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Inherited Wallet"
                        value={this.getWalletText(this.state.applied_wallet)}
                        description="The wallet that will get the saving fund withdrawal amount after the fund expire" 
                        onPress={(mode === "edit") ? () => {this.setState({walletSelectionVisible: true})} : null}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Category"
                        value={"Select..."}
                        description="The category attached to the transaction created by the recurring bills" 
                        onPress={(mode === "edit") ? () => {this.setState({categoriesVisible: true})} : null}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Cycle Start Date"
                        value={this.state.cycle_start.toDateString()}
                        description="Indicate time the billing cycle begin"
                        onPress={(mode === "edit") ? () => { this.setState({ cycleStartPickerVisible: true }) } : null}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Cycle Duration"
                        value={this.state.cycle_duration_value + " " + this.state.cycle_duration_type}
                        description="The length of the billing cycle as numeral value"
                        onPress={(mode === "edit") ? () => { this.setState({ cycleDurationInputVisible: true }) } : null}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Cycle Type"
                        value={this.state.cycle_duration_type}
                        description="The type of the billing cycle"
                        onPress={(mode === "edit") ? () => { this.setState({ cycleTypeSelectionVisible: true }) } : null}
                    />

                    <GenericSettingField
                        style={style.setting_entry}
                        title="Creation Date"
                        value={this.state.creation_date.toDateString()}
                        description="Creation date of the recurring bill entry, cannot be changed"
                    />
                </ScrollView>

                {(mode === "edit") && <FAB style={style.fab}
                    big
                    icon="content-save"
                    onPress={async () => {
                        let cycle_duration_day = null, cycle_duration_month = null
                        if (this.state.cycle_duration_type === "Day") {
                            cycle_duration_day = this.state.cycle_duration_value
                            cycle_duration_month = 'a'
                        }
                        else if (this.state.cycle_duration_type === "Week") {
                            cycle_duration_day = this.state.cycle_duration_value * 7
                            cycle_duration_month = 'a'
                        }
                        else if (this.state.cycle_duration_type === "Month") {
                            cycle_duration_month = this.state.cycle_duration_value
                            cycle_duration_day = 'a'
                        }
                        else if (this.state.cycle_duration_type === "Year") {
                            cycle_duration_month = this.state.cycle_duration_value * 12
                            cycle_duration_day = 'a'
                        }

                        let saved_data = {
                            billId: (id)? id : undefined,
                            loaihangmucId: (this.state.icon)? this.state.icon.id : "",
                            userId: sessionStore.activeUserId,
                            name: this.state.name,
                            note: this.state.desc,
                            color: this.state.color,
                            amount: parseFloat(this.state.amount) || 0,
                            cycle_start: this.state.cycle_start,
                            cycle_duration_day: parseInt(cycle_duration_day) || null,
                            cycle_duration_month: parseInt(cycle_duration_month) || null,
                            creation_date: this.state.creation_date,
                            idtaikhoan: this.state.applied_wallet,
                        }
                        console.log(saved_data)
                        let data_result = await saveBill(saved_data)
                        //console.log(data_result)
                        if (data_result) this.setState({snackbarMessage: "Your billing info have been saved"})
                        else this.setState({snackbarMessage: "Failed to save your billing info"})

                        this.setState({snackbarMessageVisible: true})
                    }}
                />}

                <Snackbar
                    visible={this.state.snackbarMessageVisible}
                    onDismiss={() => {this.setState({snackbarMessageVisible: false})}}>
                    {this.state.snackbarMessage}
                </Snackbar>

                <GenericInputModal
                    initialValue={this.state.name}
                    isVisible={this.state.nameInputVisible}
                    onRequestClose={() => { this.setState({ nameInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ nameInputVisible: false, name: val }) }}
                />

                <GenericInputModal
                    initialValue={this.state.desc}
                    isVisible={this.state.descInputVisible}
                    onRequestClose={() => { this.setState({ descInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ descInputVisible: false, desc: val }) }}
                />

                <GenericInputModal
                    initialValue={this.state.cycle_duration_value}
                    isVisible={this.state.cycleDurationInputVisible}
                    onRequestClose={() => { this.setState({ cycleDurationInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ cycleDurationInputVisible: false, cycle_duration_value: val }) }}
                    inputType='numeric'
                    affixText={this.state.cycle_duration_type}
                />

                <GenericInputModal
                    initialValue={this.state.amount}
                    isVisible={this.state.amountInputVisible}
                    onRequestClose={() => { this.setState({ amountInputVisible: false }) }}
                    onSubmit={(val) => { this.setState({ amountInputVisible: false, amount: val }) }}
                    inputType='numeric'
                    affixText={this.state.cycle_duration_type}
                />

                <ColorPickerModal
                    initialValue={this.state.color}
                    isVisible={this.state.colorPickerVisible}
                    onRequestClose={() => { this.setState({ colorPickerVisible: false }) }}
                    onSubmit={(val) => { this.setState({ colorPickerVisible: false, color: val }) }}
                />

                {this.state.cycleStartPickerVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.cycle_start}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(e, val) => {
                            const currentDate = val || this.state.cycle_start;
                            this.setState({ cycle_start: currentDate })
                            this.setState({ cycleStartPickerVisible: Platform.OS === 'ios' });
                        }}
                    />
                )}

                <GenericSelectionModal
                    isVisible={this.state.cycleTypeSelectionVisible}
                    onRequestClose={() => { this.setState({ cycleTypeSelectionVisible: false }) }}
                    selectionEntry={this.state.cycle_duration_type_values}
                    onSelection={(val) => {
                        this.setState({
                            cycleTypeSelectionVisible: false,
                            cycle_duration_type: val,
                        })
                    }} />

                <GenericSelectionModal
                    keyMode={true}
                    isVisible={this.state.walletSelectionVisible}
                    onRequestClose={() => { this.setState({ walletSelectionVisible: false }) }}
                    selectionEntry={this.state.applied_wallet_values}
                    onSelection={(val) => {
                        this.setState({
                            walletSelectionVisible: false,
                            applied_wallet: val,
                        })
                    }} />

                <CategoriesModal
                    isVisible={this.state.categoriesVisible}
                    chooseIcon={this.handleChooseIcon}
                    onRequestClose={() => { this.setState({ categoriesVisible: false }) }}
                />

            </View>
        )
    }
}