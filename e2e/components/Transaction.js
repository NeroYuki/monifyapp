export const addTransaction = async() => {

    await waitFor(element(by.id('IconCategory'))).toBeVisible().withTimeout(20000);
    await element(by.id('IconCategory')).tap();
    
    await waitFor(element(by.id('IncomeCategory'))).toBeVisible().withTimeout(20000);
    await element(by.id('IncomeCategory')).tap();

    await waitFor(element(by.text('Salary Nov'))).toBeVisible().withTimeout(20000);
    await element(by.text('Salary Nov')).tap();

    await waitFor(element(by.id('NoteTransaction'))).toBeVisible().withTimeout(20000);
    await element(by.id('NoteTransaction')).typeText('Salary Nov late\n');

    await waitFor(element(by.id('MoneyTitle'))).toBeVisible().withTimeout(20000);
    await element(by.id('MoneyTitle')).typeText('2000000\n');

    await waitFor(element(by.id('SaveTransaction'))).toBeVisible().withTimeout(20000);
    await element(by.id('SaveTransaction')).tap();
}