import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { LoanManager, ProfileScreen, RecurringBillManager, SavingManager, WalletManager } from '../screen';

const Stack = createStackNavigator()

const ProfileNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Wallet" component={WalletManager} />
            <Stack.Screen name="Loan" component={LoanManager} />
            <Stack.Screen name="Saving" component={SavingManager} />
            <Stack.Screen name="RecurringBill" component={RecurringBillManager} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator