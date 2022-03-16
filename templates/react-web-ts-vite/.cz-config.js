module.exports = {
	// 可选类型
	types: [
		{ value: 'feat', name: 'feat:     新的功能/页面' },
		{ value: 'fix', name: 'fix:      修复Bug' },
		{ value: 'docs', name: 'docs:     修改文档' },
		{ value: 'style', name: 'style:    修改样式/外观/布局/图片' },
		{ value: 'refactor', name: 'refactor: 重构代码' },
		{ value: 'perf', name: 'perf:     性能优化' },
		{ value: 'test', name: 'test:     测试相关' },
		{ value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
		{ value: 'CI/CD', name: 'CI/CD:    CI/CD相关' },
		{ value: 'revert', name: 'revert:   代码回退' },
		{ value: 'build', name: 'build:    打包相关' }
	],
	// 消息步骤
	messages: {
		type: '请选择提交类型:',
		customScope: '请输入修改范围(可选):',
		subject: '简要 -> 描述修改内容(必填):',
		body: '详细 -> 描述修改内容(可选):',
		footer: '请输入要关闭的issue(可选):',
		confirmCommit: '确认提交上述所填信息？(y/n/e/h)'
	},
	// 跳过问题
	skipQuestions: ['footer'],
	// subject文字长度默认是72
	subjectLimit: 72
}
