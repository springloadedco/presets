export default definePreset({
	name: 'php-cs-fixer',
	options: {},
	handler: async() => {
		await extractTemplates({
			extractDotFiles: true
		}),
		await installPackages({
			for: 'php',
			packages: ['friendsofphp/php-cs-fixer:*'],
			dev: true,
		})
	},
})
