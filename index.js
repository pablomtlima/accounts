import inquirer from 'inquirer';
import chalk from 'chalk'
import bcrypt from 'bcrypt'

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

        if (!fs.existsSync('users')) {
            fs.mkdirSync('users')
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
            type: 'password',
            message: 'Crie um senha:'
        })
            .then(answer => {
                const accountPass = answer['accountPass']

                createPass(accountPass, accountName)

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
                type: 'password',
                message: 'Insira sua senha:'
            }
        ]).then(answer => {

            const accountPass = answer['accountPass']

            console.log(checkPass(accountName,accountPass))

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
                operation()
            })
                .catch()

        }).catch(error => console.log(error))

    }).catch(error => console.log(error))
}

function checkAccount(accountName) {

    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }

    return true
}

function createPass(accountPass, accountName) {

    if (!accountPass || accountPass === null) {
        console.log(chalk.bgRed(`Por favor insira um nome válido!`))
        return setTimeout(() => {
            buildAccount()
        }, 2000)
    }

    if (accountPass.includes(' ')) {
        console.log(chalk.bgRed(` O nome da conta não pode conter espaços `))
        return setTimeout(() => {
            buildAccount()
        }, 2000)
    }

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        `{"balance": 0}`,
        (error) => console.log(error)
    )

    bcrypt.hash(accountPass, 10, (error, hash) => {
        if (error) console.log(error)

        fs.writeFileSync(
            `users/${accountName}.json`,
            `{"userName":"${accountName}", "password": "${hash}"}`
        )
    })


}

async function checkPass(accountName, accountPass) {
    const { password: passwordHash } = getAccountUser(accountName)

    console.log(passwordHash)
    return await bcrypt.compare(accountPass, passwordHash, (error, result) => result)
}

function addAmount(accountName, amount) {

    const account = getAccount(accountName)
    console.log(account)

    fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": ${Number(account.balance) + Number(amount)}}`)

}

function getAccount(accountName) {

    return JSON.parse(fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    }))
}

function getAccountUser(accountName) {

    return JSON.parse(fs.readFileSync(`users/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    }))
}

function exit() {
    console.log(chalk.bgBlue.black(' Obrigado por usar o Accounts! '))
    process.exit()
}
