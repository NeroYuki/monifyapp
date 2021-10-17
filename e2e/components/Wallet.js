export const addWallet = async() => {
    //Tap profile
    await waitFor(element(by.id('Profile'))).toExist().withTimeout(5000);
    await element(by.id('Profile')).tap();

    //Tap wallet
    await waitFor(element(by.text('WALLET'))).toExist().withTimeout(5000);
    await element(by.text('WALLET')).tap();

    //New Wallet
    await waitFor(element(by.id('PlusWalletProfile'))).toExist().withTimeout(5000);
    await element(by.id('PlusWalletProfile')).tap();

    //Type Wallet
    await waitFor(element(by.id('WalletName'))).toBeVisible().withTimeout(5000);
    await element(by.id('WalletName')).tap();

    await waitFor(element(by.id('InputDialog'))).toBeVisible().withTimeout(5000);
    await element(by.id('InputDialog')).typeText('Wallet 2021\n');
    await element(by.text('DONE')).tap();

    await waitFor(element(by.id('SaveWallet'))).toBeVisible().withTimeout(5000);
    await element(by.id('SaveWallet')).tap();
}