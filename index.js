#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const templateRoot = path.join(__dirname, './templates');

inquirer.prompt([
    {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名',
        validate: (v) => {
            try {
                return v.trim().length > 0 || '项目名不能为空';
            } catch (error) {
                return '非法项目名';
            }
        }
    },
    {
        type: 'list',
        name: 'type',
        message: '请选择要使用的框架',
        choices: [
            { value: 'react-admin', name: '管理系统模板: react + antd + umi + dva + ts' },
            { value: 'react-web-ts-vite', name: '通用网站模板: react + ts + vite' },
        ],
    },
]).then(answers => {

    let projectRoot = path.join(process.cwd(), answers.projectName);

    if (fs.existsSync(projectRoot)) throw Error(`当前目录下已存在 ${answers.projectName}, 创建失败`);

    fs.mkdirSync(projectRoot);

    fs.copySync(path.join(templateRoot, answers.type), projectRoot, { overwrite: true });

    console.log(`项目 ${answers.projectName} 已创建成功, 可执行以下命令: \n\n`);
    console.log(`cd ${projectRoot}`);
    console.log(`yarn install`);
    console.log(`---------------------------------------------------------`);
})


