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

        if (action === 'Criar conta') {
            createAccount()
        }
    }).catch(error => console.log(error))
}

function createAccount() {
    console.log(chalk.bgGreen.blk(' Parabéns por escolher o nosso banco '))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
}