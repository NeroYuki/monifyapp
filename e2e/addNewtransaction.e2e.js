import {takeScreenshot,sleep} from './utils'
import {addWallet} from './components/Wallet'
import {addTransaction} from './components/Transaction'
import {addCategory} from './components/Category'

describe('Add New Transaction', () => {

  beforeAll(async () => {
    await device.launchApp();
  });

  it('add new wallet', async () => {
    await addWallet();
    await sleep(2000);
  });

  it('check wallet', async () => {
    //Back
    await device.pressBack();

    //Tap overview
    await waitFor(element(by.id('Overview'))).toBeVisible().withTimeout(5000);
    await element(by.id('Overview')).tap();

    await sleep(2500);
    //Check wallet
    await waitFor(element(by.id('ChooseWallet'))).toBeVisible().withTimeout(5000);
    await element(by.id('ChooseWallet')).tap();
    await sleep(2000);
    await waitFor(element(by.text('Wallet 2021'))).toBeVisible().withTimeout(5000);
    await element(by.text('Wallet 2021')).tap();
    await sleep(1500);
    await device.pressBack();

    await sleep(1000);
  });

  it('add transaction', async () => {
    //Add category
    await waitFor(element(by.id('Tools'))).toExist().withTimeout(5000);
    await element(by.id('Tools')).tap();
    await element(by.text('CATEGORIES')).tap();

    await addCategory();
    await device.pressBack();
    await device.reloadReactNative();
    //Creat transaction
    await sleep(1000);
    await waitFor(element(by.id('CreateInput'))).toBeVisible().withTimeout(20000);
    await element(by.id('CreateInput')).tap();

    await addTransaction();
  });

  it('check transaction', async () => {
    await sleep(1000);
    //Tap overview
    await waitFor(element(by.id('Overview'))).toBeVisible().withTimeout(5000);
    await element(by.id('Overview')).tap();

    await sleep(1000);
    //Check transaction
    await waitFor(element(by.text('Salary Nov'))).toBeVisible().withTimeout(5000);
    await element(by.text('Salary Nov')).tap();

    await waitFor(element(by.text('Salary Nov'))).toBeVisible().withTimeout(5000);
    await waitFor(element(by.text('Salary Nov late'))).toBeVisible().withTimeout(5000);
    await waitFor(element(by.text('2000000'))).toBeVisible().withTimeout(5000);
    await sleep(1000);
    //Screenshot
    takeScreenshot(`addNewtransaction-${Date.now().toString()}.png`.toString());
  });
});