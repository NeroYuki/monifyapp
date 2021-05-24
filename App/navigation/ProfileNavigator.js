import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { LoanEditor, LoanManager, ProfileScreen, RecurringBillEditor, RecurringBillManager, SavingEditor, SavingManager, WalletEditor, WalletManager } from '../screen';

const Stack = createStackNavigator()

const ProfileNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Wallet" component={WalletManager} />
            <Stack.Screen name="Loan" component={LoanManager} />
            <Stack.Screen name="Saving" component={SavingManager} />
            <Stack.Screen name="RecurringBill" component={RecurringBillManager} />
            <Stack.Screen name="WalletEditor" component={WalletEditor} />
            <Stack.Screen name="SavingEditor" component={SavingEditor} />
            <Stack.Screen name="RecurringBillEditor" component={RecurringBillEditor} />
            <Stack.Screen name="LoanEditor" component={LoanEditor} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator