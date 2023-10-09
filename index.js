import inquirer from 'inquirer';
import chalk from 'chalk'

import fs from 'fs'

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
        message: 'Digite um nome para a sua conta:'

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

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance": 0}',
            (error) => console.log(error)
        )

        console.log(chalk.bgGreen.black('Parabéns, a sua conta foi criada!'))

        setTimeout(() => {
            operation()
        }, 2000)

    }).catch((error => {
        console.log(error)
    }))

}

function exit() {
    console.log(chalk.bgBlue.black(' Obrigado por usar o Accounts! '))
    process.exit()
}