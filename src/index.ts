const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const inquirer = require('inquirer')

const read = async (filePath: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err: any, data: string) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

const write = (filePath: string, fileName: string, content: any) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${filePath}/${fileName}.json`, content, (err: any) => {
            if (err) reject(err)
            console.log('\n💥File successfully written!\n')
        })
    })
}

async function run() {
    const [firstArg] = process.argv.slice(2)

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Name'
        }
    ]

    try {
        const answers = await inquirer.prompt(questions)

        const resolvedPath = path.resolve(firstArg)
        const targetDir = path.parse(resolvedPath).dir

        const data = await read(resolvedPath)
        const content = data.toString()

        console.log(content);
    } catch (error) {
        console.log(error)
    }
}

run()
