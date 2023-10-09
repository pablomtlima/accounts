import inquirer from 'inquirer';
import chalk from 'chalk'

import fs from 'fs'
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

        if (action === 'Criar conta') {
            createAccount()
        }
    }).catch(error => console.log(error))
}

function createAccount() {
    console.log(chalk.bgGreen.blk(' Parabéns por escolher o nosso banco '))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
}

function buildAccount() {
    inquirer.prompt({
        name: 'accountName',
        message: 'Digite um nome para a sua conta:'
    }).then(answer => {
        console.log(answer)
    }).catch((error => {
        console.log(error)
    }))
}