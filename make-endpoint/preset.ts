export default definePreset({
	name: 'make-endpoint',
	handler: async(context) => {
		await prompt({ name: 'fileName', text: '*Required*: What is the name of the endpoint? (eg: ShowUser)', default: null })
		await prompt({ name: 'subfolder', text: '*Required*: What subfolder will the endpoint reside in? (eg: Users)', default: '' })
		await prompt({ name: 'domain', text: 'What domain does the endpoint belong to? Leave blank if not using domains. (eg: Auth)', default: '' })
		
		const { fileName, domain, subfolder } = context.prompts;

		if (!fileName) {
			throw new Error('The name of the endpoint is required');
		}

		// Create controller
		let controllerDirectory = `app/Http/Controllers/${subfolder}`;
		if (domain) {
			controllerDirectory = `app/${domain}/Http/Controllers/${subfolder}`;
		}
		const controllerFilePath = `${controllerDirectory}/${fileName}Controller.php`;
		await extractTemplates({
			from: 'Controller.php',
			to: controllerDirectory,
		})
		await renamePaths({
      paths: `${controllerDirectory}/Controller.php`,
      transformer: () => `${fileName}Controller.php`,
    })
		await replaceVariables(controllerFilePath, controllerDirectory, fileName)

		// Create request
		const requestDirectory = `${controllerDirectory.replaceAll('Controller', 'Request')}`;
		const requestFilePath = `${requestDirectory}/${fileName}Request.php`;
		await extractTemplates({
			from: 'Request.php',
			to: requestDirectory,
		})
		await renamePaths({
      paths: `${requestDirectory}/Request.php`,
      transformer: () => `${fileName}Request.php`,
    })
		await replaceVariables(requestFilePath, requestDirectory, fileName)

		// Create test
		let testDirectory = `tests/Feature/${subfolder}`;
		if (domain) {
			testDirectory = `app/${domain}/Tests/Feature/${subfolder}`;
		}
		const testFilePath = `${testDirectory}/${fileName}Test.php`;
		await extractTemplates({
			from: 'Test.php',
			to: testDirectory,
		})
		await renamePaths({
      paths: `${testDirectory}/Test.php`,
      transformer: () => `${fileName}Test.php`,
    })
		await replaceVariables(testFilePath, testDirectory, fileName)
	},
})

async function replaceVariables(filePath: string, directory: string, fileName: string) {
		await editFiles({
			title: `Set namespace in ${filePath}`,
			files: filePath,
			operations: {
				type: 'replace-variables',
				variables: {
					'namespace': directory.charAt(0).toUpperCase() + directory.slice(1).replaceAll('/', '\\'),
					'fileName': fileName
				}
			}
		})
}
