#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk')

const Repository = {
    react: {
        'admin': 'https://gitee.com/ssg-wangyue/template-react-ts-umi-admin.git',
    },
    vue: {
        'web': 'https://gitee.com/ssg-wangyue/template-react-ts-vite-web.git',
    }
};

(async () => {
    const answers = await inquirer.prompt([
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
            name: 'framework',
            message: '请选择要使用的前端框架',
            choices: [
                {value: 'react', name: 'react'},
                {value: 'vue', name: 'vue'},
            ],
        },
        {
            type: 'list',
            name: 'template',
            message: '请选择要使用的模板',
            choices: [
                {value: 'admin', name: '管理系统'},
            ],
            when(answers) {
                return answers.framework === 'react'
            }
        },
        {
            type: 'list',
            name: 'template',
            message: '请选择要使用的模板',
            choices: [
                {value: 'web', name: '通用网站'},
            ],
            when(answers) {
                return answers.framework === 'vue'
            }
        },
    ]);

    // 获取对应仓库的url
    const cloneUrl = Repository[answers.framework][answers.template];

    if(!cloneUrl) {
        console.error(chalk.red(`${answers.framework}-${answers.template} 暂不支持`))
        shell.exit(1);
    }

    // 获取项目的创建位置(包含项目名)
    let projectRoot = path.join(process.cwd(), answers.projectName);

    // 检测是否有同名项目
    if (fs.existsSync(projectRoot)) {
        console.error(chalk.red(`当前目录下已存在 ${answers.projectName}, 创建失败`))
        shell.exit(1);
    }

    // 判断是否安装有git
    if (!shell.which('git')) {
        console.error(chalk.red('检测到操作系统未安装git, 请先自行安装!'))
        shell.exit(1);
    }

    // 创建项目文件夹
    try {
        fs.mkdirSync(projectRoot);
    } catch (e) {
        console.error(e);
        console.error(chalk.red('项目文件夹创建失败'));
    }

    // 下载模板
    if (shell.exec(`git clone ${cloneUrl} ${projectRoot}`).code !== 0) {
        console.log(chalk.red('Error: Git clone 错误'))
        shell.exit(1);
    }

    // 成功
    console.log(chalk.blue('\r\n=========================================\r\n'))
    console.log(chalk.green('项目创建成功, 可执行以下命令开始体验\r\n'))
    console.log(chalk.green(`cd ./${answers.projectName}`))
    console.log(chalk.green(`npm install or yarn install`))
    console.log(chalk.blue('\r\n=========================================\r\n'))

})();
