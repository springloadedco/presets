export default definePreset({
  name: 'vue-tsc-command',
  handler: async () => {
    await installPackages({
      for: 'node',
      packages: ['vue-tsc'],
      dev: true
    });
    await editFiles({
      title: 'Add compile script',
      files: 'package.json',
      operations: {
        type: 'edit-json',
        merge: {
          scripts: {
            compile: './node_modules/.bin/vue-tsc --noEmit -p tsconfig.json'
          }
        }
      }
    });
  }
});
