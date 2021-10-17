import {takeScreenshot,sleep} from './utils'
describe('Add Category', () => {

  beforeAll(async () => {
    await device.launchApp();
  });

  it('add category', async () => {
    //Open screen add category
    await waitFor(element(by.id('Tools'))).toExist().withTimeout(5000);
    await element(by.id('Tools')).tap();
    await element(by.text('CATEGORIES')).tap();

    //Add category
    await waitFor(element(by.id('AddCategory'))).toBeVisible().withTimeout(20000);
    await element(by.id('AddCategory')).tap();

    //Name category
    await waitFor(element(by.id('InputCategoryName'))).toBeVisible().withTimeout(20000);
    await element(by.id('InputCategoryName')).typeText('Salary Nov\n');

    //Type, icome, exp
    await waitFor(element(by.id('InputCategoryIncome'))).toBeVisible().withTimeout(20000);
    await element(by.id('InputCategoryIncome'));

    //Icon category
    await waitFor(element(by.id('IconCategories'))).toBeVisible().withTimeout(20000);
    await element(by.id('IconCategories')).tapAtPoint({x:20,y:30});

    //Save category
    await waitFor(element(by.id('SaveCategory'))).toBeVisible().withTimeout(20000);
    await element(by.id('SaveCategory')).tap();
  });

  it('check category', async () => {
    await sleep(5000);
    //Tab income
    await waitFor(element(by.text('Income'))).toBeVisible().withTimeout(20000);
    await element(by.id('IncomeCategory')).tap();

    //Have salary
    await waitFor(element(by.text('Salary Nov'))).toBeVisible().withTimeout(20000);

    //Screenshot
    takeScreenshot(`addCategory-${Date.now().toString()}.png`.toString());
  });
});