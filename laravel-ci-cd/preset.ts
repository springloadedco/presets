export default definePreset({
	name: 'laravel-ci-cd',
	options: {
		// ...
	},
	handler: async() => {
		await extractTemplates({
			from: '.env.ci',
			to: '.env.ci'
		}),
		await extractTemplates({
			from: 'setup-php-node.yml',
			to: '.github/actions/setup-php-node.yml'
		}),
		await extractTemplates({
			from: 'ci-cd-workflow.yml',
			to: '.github/workflows/ci-cd-workflow.yml'
		})
	},
})
