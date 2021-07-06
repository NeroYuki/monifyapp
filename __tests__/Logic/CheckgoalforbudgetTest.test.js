import { checkGoalForBudget } from "../../App/logic/callonappopenning"
import { fetchBugetList } from "../../App/logic/Screen-budget"



test('testing logic checkgoalforbudget', async () => {

    let budgetlist = await(fetchBugetList())
    console.log(JSON.stringify(budgetlist))
    console.log(JSON.stringify(checkGoalForBudget(budgetlist[0].idmuctieu)) )
})