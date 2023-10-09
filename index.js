import inquirer from 'inquirer';
import chalk from 'chalk'

import fs, { copyFileSync } from 'fs'
import { error } from 'console';

operation()

function operation() {
    console.clear()
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair'
        ],
    }).then((answer) => {
        const action = answer['action']

        switch (action) {
            case 'Criar conta':
                createAccount()
                break;

            case 'Consultar saldo':
                break;

            case 'Depositar':
                deposit()
                break;

            case 'Sacar':
                break;

            case 'Sair':
                exit()
                break;
        }

        if (action === 'Criar conta') {
        }
    }).catch(error => console.log(error))
}

function createAccount() {
    console.clear()
    console.log(chalk.bgGreen.black(' Parabéns por escolher o nosso banco '))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    console.clear()

    inquirer.prompt({
        name: 'accountName',
        message: 'Digite um nome para a sua conta:',


    }).then(answer => {

        const accountName = answer['accountName']

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed(`A conta já existe, por favor escolha outro nome!`))
            return setTimeout(() => {
                buildAccount()
            }, 2000)
        }

        if (!accountName || accountName === null) {
            console.log(chalk.bgRed(`Por favor insira um nome válido!`))
            return setTimeout(() => {
                buildAccount()
            }, 2000)
        }

        if (accountName.includes(' ')) {
            console.log(chalk.bgRed(` O nome da conta não pode conter espaços `))
            return setTimeout(() => {
                buildAccount()
            }, 2000)
        }

        inquirer.prompt({
            name: 'accountPass',
            message: 'Crie um senha:'
        })
            .then(answer => {
                const accountPass = answer['accountPass']

                fs.writeFileSync(
                    `accounts/${accountName}.json`,
                    `{"balance": 0, "password": ${accountPass}}`,
                    (error) => console.log(error)
                )

                console.log(chalk.bgGreen.black('Parabéns, a sua conta foi criada!'))

                setTimeout(() => {
                    operation()
                }, 2000)
            })
            .catch(error => console.log(error))



    }).catch((error => {
        console.log(error)
    }))

}

function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta:'
        }
    ]).then(answer => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'accountPass',
                message: 'Insira sua senha:'
            }
        ]).then(answer => {

            const accountPass = answer['accountPass']

            if (!checkPass(accountName, accountPass)) {
                console.log(chalk.bgRed.black('Senha incorreta!'))
                return deposit()
            }

            inquirer.prompt({
                name: 'amount',
                message: 'Quanto você deseja depositar:',
            }).then(answer => {
                const amount = answer['amount']
                addAmount(accountName, amount)
                // operation()
            })
                .catch()

        }).catch(error => console.lor(error))

    }).catch(error => console.lor(error))
}

function checkAccount(accountName) {

    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }

    return true
}

function checkPass(accountName, accountPass) {
    const accountData = getAccount(accountName)

    if (JSON.stringify(accountData.password) === accountPass) {
        return true
    }

    return false

}

function addAmount(accountName, amount) {

    const account = getAccount(accountName)
    console.log(account)
}

function getAccount(accountName) {
    return JSON.parse(fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    }))
}

function exit() {
    console.log(chalk.bgBlue.black(' Obrigado por usar o Accounts! '))
    process.exit()
}
