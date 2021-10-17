export const addCategory = async() => {
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
}