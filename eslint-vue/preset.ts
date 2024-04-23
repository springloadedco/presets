export default definePreset({
  name: 'eslint-vue',
  handler: async () => {
    await extractTemplates({
      extractDotFiles: true
    }),
      await editFiles({
        title: 'Add lint scripts',
        files: 'package.json',
        operations: {
          type: 'edit-json',
          merge: {
            scripts: {
              lint: './node_modules/.bin/eslint --ext .ts,.vue resources/',
              'lint-fix': './node_modules/.bin/eslint --fix --ext .ts,.vue resources/'
            }
          }
        }
      }),
      await installPackages({
        title: 'Add NPM dependencies',
        for: 'node',
        dev: true,
        packages: [
          '@typescript-eslint/eslint-plugin',
          '@typescript-eslint/parser',
          '@vue/eslint-config-prettier',
          '@vue/eslint-config-typescript',
          'eslint',
          'eslint-plugin-no-relative-import-paths',
          'eslint-plugin-unused-imports',
          'prettier',
          'prettier-plugin-tailwindcss',
          'typescript'
        ]
      });
  }
});
