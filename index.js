import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    accountBalance;
    constructor(accountNumber, accountBalance) {
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.accountBalance += amount;
        console.log(`$${amount} has been deposited in ${this.accountNumber}\nNew Balance is $${this.accountBalance}`);
    }
    withdraw(amount) {
        if (this.accountBalance >= amount) {
            this.accountBalance -= amount;
            console.log(`You have successfully withdrew $${amount}...\nYour remaining balance is $${this.accountBalance}`);
        }
        else {
            console.log("You have Insufficient Balance");
        }
    }
    checkBalance() {
        console.log(`Your account balance is $${this.accountBalance}`);
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    accountNumber;
    constructor(firstName, lastName, gender, age, mobileNumber, accountNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.accountNumber = accountNumber;
    }
}
const bankaccounts = [
    new BankAccount(1009435670, 2000),
    new BankAccount(1001453983, 1000),
    new BankAccount(1009475369, 500)
];
const customers = [
    new Customer("Insia", "Murtaza", "female", 42, 3343437271, bankaccounts[0]),
    new Customer("Kashif", "Faisal", "male", 45, 3135444853, bankaccounts[1]),
    new Customer("Shehzad", "Farooqi", "Male", 55, 3457862543, bankaccounts[2])
];
const askCustomer = await inquirer.prompt([{
        name: "accountnumber",
        message: "Enter Your Account Number: ",
        type: "number"
    }]);
const matchaccountnumber = customers.find(customer => customer.accountNumber.accountNumber === askCustomer.accountnumber);
do {
    if (matchaccountnumber) {
        console.log(`Welcome ${matchaccountnumber.firstName + " " + matchaccountnumber.lastName}`);
        let operation = await inquirer.prompt([{
                name: "select",
                message: "What would you like to do?",
                type: "list",
                choices: ["Balance Inquiry", "Deposit", "Withdraw", "Exit"]
            }]);
        switch (operation.select) {
            case "Balance Inquiry":
                console.log(`Your account balance is $${matchaccountnumber.accountNumber.accountBalance}`);
                break;
            case "Deposit":
                let asktoDeposit = await inquirer.prompt([{
                        name: "amount",
                        message: "Enter the amount you want to deposit: ",
                        type: "number"
                    }]);
                matchaccountnumber.accountNumber.deposit(asktoDeposit.amount);
                break;
            case "Withdraw":
                let asktoWithdraw = await inquirer.prompt([{
                        name: "amount",
                        message: "Enter the amount you want to withdraw: ",
                        type: "number"
                    }]);
                matchaccountnumber.accountNumber.withdraw(asktoWithdraw.amount);
                break;
            case "Exit":
                console.log("Thankyou for using our bank service!");
                process.exit();
        }
        let askagain = await inquirer.prompt([{
                name: "tomaketransaction",
                message: "Do you want to make another transaction? ",
                type: "list",
                choices: ["Yes", "No"]
            }]);
        if (askagain.tomaketransaction == "No") {
            console.log("Thankyou for using our bank service!");
            process.exit();
        }
    }
    else {
        console.log("Invalid Account Number...");
        process.exit();
    }
} while (true);
