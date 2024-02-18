export default definePreset({
	name: 'openai',
	handler: async() => {
		await installPackages({
      for: 'php',
      packages: ['openai-php/client', 'guzzlehttp/guzzle'],
      dev: false,
    })
		await extractTemplates({
			from: 'config',
			to: 'config'
		})
		await extractTemplates({
			from: 'app',
			to: 'app'
		})
		await editFiles({
			title: 'Adding OpenAI environment variable',
			files: ['.env', '.env.example'],
			operations: {
				type: 'add-line',
				position: 'append',
				lines: 'OPENAI_API_KEY=',
			}
		})
	},
})
