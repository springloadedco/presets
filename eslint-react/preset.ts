export default definePreset({
  name: 'eslint-react',
  handler: async () => {
    await extractTemplates({
      extractDotFiles: true
    });
    await editFiles({
      title: 'Add lint scripts',
      files: 'package.json',
      operations: {
        type: 'edit-json',
        merge: {
          scripts: {
            lint: './node_modules/.bin/eslint --ext .ts,.tsx resources/',
            'lint-fix': './node_modules/.bin/eslint --fix --ext .ts,.tsx resources/'
          }
        }
      }
    });
    await installPackages({
      title: 'Add NPM dependencies',
      for: 'node',
      dev: true,
      packages: [
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint',
        'eslint-config-prettier',
        'eslint-config-standard',
        'eslint-import-resolver-alias',
        'eslint-plugin-import',
        'eslint-plugin-node',
        'eslint-plugin-prettier',
        'eslint-plugin-promise',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'prettier',
        'prettier-plugin-tailwindcss'
      ]
    });
  }
});
