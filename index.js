#!/usr/bin/env node
var program = require('commander');
var inquirer = require('inquirer');
var Rx = require('rxjs');

program
  .version('0.0.2', '-v, --version');

program
  .command('create <project_name>')
  .option('-t, --type', 'project type')
  .action(function (project_name, cmd) {
    if (cmd.type) {
      let output = 'create '
        + (cmd.type ? 'admin type project ' : '')
        + 'tplhk-' + project_name + '-ui.'
      console.log(output);
    } else {
      inquirer.prompt([
        {
          type: 'rawlist',
          name: 'type',
          message: '选择项目类型',
          choices: [
            { name: '管理后台', value: 'admin' },
            { name: '网站门户', value: 'website' },
            { name: '产品门户', value: 'product' }
          ],
          default: 0 // 默认值为列表项编号，起始为 0
        }
      ]).then((answer) => {
        console.log('结果为: ' + answer.type);
        inquirer.prompt([
          {
            type: 'checkbox',
            name: 'module',
            message: '选择模块功能',
            choices: [
              { name: '登入', value: 'login' },
              { name: '角色', value: 'role' },
              { name: '用户', value: 'user' }
            ],
            default: ['login', 'role', 'user'] // 默认值为列表项编号，起始为 0
          }
        ]).then((answer) => {
          console.log('结果为: ');
          console.log(answer);


          let prompList = [{
            type: 'input',
            name: 'platform_code',
            message: '平台代码（示例：web_cms_hk）'
          }, {
            type: '',
            name: 'secret',
            message: '平台密码'
          }, {
            type: 'input',
            name: 'apiUrl',
            message: '接口地址',
          }];

          inquirer.prompt(prompList).then((answers) => {
            console.log(answers);
          });
        });
      });
    }
  })

program.parse(process.argv);

//end