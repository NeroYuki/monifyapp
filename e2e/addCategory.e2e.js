import {takeScreenshot} from '../e2e/takeScreenshot'

describe('Example', () => {

  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  })

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
    //Close add category screen
    await element(by.id('CategoryCloseIcon')).tap();

    //Tab income
    await element(by.text('Income')).tap();

    //Have salary
    await waitFor(element(by.text('Salary Nov')).toBeVisible()).withTimeout(20000);

    //Screenshot
    takeScreenshot(`addCategory-${Date.now().toString()}.png`.toString());
  });
});