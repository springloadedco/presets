export default definePreset({
  name: 'php-cs-fixer',
  options: {},
  handler: async () => {
    await extractTemplates({
      extractDotFiles: true
    });
    await installPackages({
      for: 'php',
      packages: ['friendsofphp/php-cs-fixer:*'],
      dev: true
    });
    await editFiles({
      files: ['composer.json'],
      operations: {
        type: 'edit-json',
        merge: {
          scripts: {
            fix: [
              './vendor/bin/php-cs-fixer fix --config .php-cs-fixer.dist.php app database config'
            ]
          }
        }
      }
    });
    await editFiles({
      files: ['.gitignore'],
      operations: {
        type: 'add-line',
        position: 'append',
        lines: '.php-cs-fixer.cache'
      }
    });
  }
});
