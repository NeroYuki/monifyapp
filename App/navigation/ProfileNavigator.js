import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { LoanEditor, LoanManager, ProfileScreen, RecurringBillEditor, RecurringBillManager, SavingEditor, SavingManager, WalletEditor, WalletManager } from '../screen';

const Stack = createStackNavigator()

const ProfileNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Wallet" component={WalletManager} options={{title: "Wallet Manager"}}/>
            <Stack.Screen name="Loan" component={LoanManager} options={{title: "Loan Manager"}}/>
            <Stack.Screen name="Saving" component={SavingManager} options={{title: "Saving Manager"}}/>
            <Stack.Screen name="RecurringBill" component={RecurringBillManager} options={{title: "Recurring Bill Manager"}}/>
            <Stack.Screen name="WalletEditor" component={WalletEditor} options={{title: "Wallet Editor"}}/>
            <Stack.Screen name="SavingEditor" component={SavingEditor} options={{title: "Saving Editor"}}/>
            <Stack.Screen name="RecurringBillEditor" component={RecurringBillEditor} options={{title: "Recurring Bill Editor"}}/>
            <Stack.Screen name="LoanEditor" component={LoanEditor} options={{title: "Loan Editor"}}/>
        </Stack.Navigator>
    )
}

export default ProfileNavigator