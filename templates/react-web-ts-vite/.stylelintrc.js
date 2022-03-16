module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
	plugins: ['stylelint-order'],
	rules: {
		'indentation': 4,
		'no-descending-specificity': null,
		'selector-class-pattern': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'apply',
					'variants',
					'responsive',
					'screen',
					'function',
					'if',
					'each',
					'include',
					'mixin',
				],
			},
		],
	},
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}
