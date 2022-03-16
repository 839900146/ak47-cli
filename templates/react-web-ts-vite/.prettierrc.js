module.exports = {
	// 使用 4 个空格缩进
	tabWidth: 4,
	// 使用tab缩进
	useTabs: true,
	// 行尾不需要有分号
	semi: false,
	// 使用单引号
	singleQuote: true,
	// 对象的 key 仅在必要时用引号
	quoteProps: 'as-needed',
	// jsx 使用单引号，而不是双引号
	jsxSingleQuote: false,
	// 尾随逗号
	trailingComma: 'all',
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 箭头函数，只有一个参数的时候，也需要括号
	arrowParens: 'always',
	// 每个文件格式化的范围是文件的全部内容
	rangeStart: 0,
	rangeEnd: Infinity,
	// 不需要写文件开头的 @prettier
	requirePragma: false,
	// 不需要自动在文件开头插入 @prettier
	insertPragma: false,
	// 使用默认的折行标准
	proseWrap: 'preserve',
	// 根据显示样式决定 html 要不要折行
	htmlWhitespaceSensitivity: 'css',
	printWidth: 100,
	endOfLint: 'lf'
}
