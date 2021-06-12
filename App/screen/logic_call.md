1. screen/AppearanceSetting
#### saveSetting({appTheme: string, Language: string, Currency: string, StrictMode: boolean})
return boolean 
#### fetchSetting()
return Object({appTheme: string, Language: string, Currency: string, StrictMode: boolean})

2. screen/Budget
#### fetchBugetList()
return Array(Object({budgetId: string, name: string}))
#### fetchBudget({budgetId: string})

3. screen/LoanEditor
#### fetchLoan({loanId: string})
return Object({loanId: string, name: string, color: string, amount: number, expire_on: Date, interest: number, creationDate: Date})
#### saveLoan({loanId: ?string, name: string, color: string, expire_on: Date, interest: number})
return boolean

4. screen/LoanManager
#### queryLoan({loanName: ?string, minAmount: ?string, maxAmount: ?string, expire_in_days: ?number})
return Array(Object({loanId: string, name: string, color: string, amount: number, expire_on: Date, interest: number, creationDate: Date}))
#### deleteLoan({loanId: string})
return boolean
#### deactivateLoan({loanId: string})
return boolean

5. screen/Login
#### login({username: string, password: string})
return Object({userId: string})

6. screen/Overview
[TODO] add Overview task
#### queryTransactions(<?>)



7. screen/Profile
#### fetchUser({userId: string})
return Object({username: string, email: string, birthday: Date})

8. screen/RecurringBillEditor
#### fetchBill({billId: string})
return Object({billId: string, name: string, color: string, note: string, amount: number, cycle_start: Date, cycle_duration_day: number, cycle_duration_month: number, creation_date: Date})
#### saveBill({billId: string?,loaihangmucid:string,userid:string, name: string, color: string, note: string, cycle_start: Date, cycle_duration_day: number, cycle_duration_month: number})
return Object({result: boolean, message: ?string})

9. screen/RecurringBillManager
[TODO] add querying by cycle relate attribute
#### queryBill({billName: ?string, minAmount: ?string, maxAmount: ?string})
return Array(Object({billId: string, name: string, note: string, color: string, amount, number, cycle_start: Date, cycle_duration_day: number, cycle_duration_month: number, creation_date: Date}))
#### pauseBill({billId: string})
return Object({result: boolean, message: ?string})
#### resumeBill({billId: string})
return Object({result: boolean, message: ?string})
#### deleteBill({billId: string})
return Object({result: boolean, message: ?string})

10. screen/Register
#### register({username: string, password: string})
return Object({result: boolean, message: ?string})

11. screen/SavingEditor
#### fetchSaving({savingId: string})
return Object({savingId: string, name: string, color: string, amount: number, expire_on: Date, interest: number, applied_wallet_id: string, early_interest: number, creation_date: Date})
#### saveSaving({savingId: ?string, name: string, color: string, expire_on: Date, interest: number, applied_wallet_id: string, early_interest: number})
return boolean

12. screen/SavingManager
#### querySaving({savingName: ?string, minAmount: ?string, maxAmount: ?string, expire_in_days: ?number})
return Array(Object({savingId: string, name: string, color: string, amount: number, expire_on: Date, interest: number, applied_wallet_id: string, early_interest: number, creation_date: Date}))
#### deleteSaving({savingId: string})
return Object({result: boolean, message: ?string})
#### deactivateSaving({savingId: string})
return Object({result: boolean, message: ?string})

13. screen/SyncData
#### restoreData()
return Promise
#### backupData()
return Promise

14. screen/WalletEditor
#### fetchWallet({walletId: string})
return Object({walletId: string, name: string, amount: number, color: string, creation_date: Date})
#### saveWallet({walletId: ?string, name: string, color: string})
return Object({result: boolean, message: ?string})

15. screen/WalletManager
#### queryWallet({walletName: ?string, minAmount: ?string, maxAmount: ?string})
return Array(Object({walletId: string, name: string, amount: number, color: string, creation_date: Date}))
#### deleteWallet({walletId: string})
return Object({result: boolean, message: ?string})

16. component/CategoriesModal
#### fetchCategories() 
return Array(Object({category_id: string, name: string, color: string, icon: string, type: number(INCOME = 1, EXPENSE = 2)}))
#### deleteCategory({categoryId: string})
return Object({result: boolean, message: ?string})

17. component/CategoryEditor
#### fetchCategory({categoryId: string})
return Object({category_id: string, name: string, color: string, icon: string, type: number(INCOME = 1, EXPENSE = 2)})
#### saveCategory({category_id: ?string, name: string, color: string, icon: string, type: number(INCOME = 1, EXPENSE = 2)})
return Object({result: boolean, message: ?string})

18. component/LoanManager/LoanPaymentModal
#### createLoanPayment({from_wallet_id: string, for_loan_id: string, amount: number})
return Object({result: boolean, message: ?string})

19. component/SavingManager/SavingDepositModal
#### createSavingDeposit({from_wallet_id: string, for_saving_id: string, amount: number})
return Object({result: boolean, message: ?string})

20. component/SavingManager/SavingWithdrawModal
#### createSavingWithdraw({to_wallet_id: string, from_saving_id: string, amount: number})
return Object({result: boolean, message: ?string})

21. component/TransactionEditor/TransactionModal
#### fetchTransaction({transactionId: string})
return Object({transactionId: string, note: string, amount: number, walletId: string, occur_date: Date, categoryId: string})
#### saveTransaction({transactionId: ?string, note: string, amount: number, walletId: string, occur_date: Date, categoryId: string})
return Object({result: boolean, message: ?string})
#### deleteTransaction({transactionId: string})
return Object({result: boolean, message: ?string})

22. component/WalletManager/WalletTransferModal
#### createWalletTransfer({from_wallet_id: string, to_wallet_id: string, amount: number)
return Object({result: boolean, message: ?string})

23. call on app opening
#### checkLoansForCycle()
return Array(Object({loanId: string, name: string, eventName: number(VALUE_UPDATE = 1, EXPIRE = 2), current_amount: number}))
#### checkSavingForCycle()
return Array(Object({savingId: string, name: string, eventName: number(VALUE_UPDATE = 1, EXPIRE = 2), current_amount: number}))
#### checkBillForCycle()
return Array(Object({billId: string, name: string, eventName: number(NEW_TRANSACION = 1, ERROR = 2), amount: number}))