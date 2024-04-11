export default definePreset({
	name: 'preset',
	handler: async(context) => {
		await prompt({ name: 'name', text: 'What is the name of your preset?', default: null })
		
		const { name } = context.prompts;
		if (!name) {
			throw new Error('The name of the preset is required');
		}

		await extractTemplates({
			to: name,
			extractDotFiles: true
		})

		await editFiles({
			title: 'Update name of preset in preset.ts',
			files: [`${name}/preset.ts`, `${name}/README.md`],
			operations: {
				type: 'replace-variables',
				variables: {
					name,
				},
			},
		})
	}
})
