export default definePreset({
	name: 'tailwind-nesting',
	handler: async() => {
		await editFiles({
			title: 'Add lint scripts',
			files: 'package.json',
			operations: {
				type: 'edit-json',
				merge: {
					postcss: {
						plugins: {
							"tailwindcss/nesting": {},
						}
					},
				},
			},
		})
	},
})
