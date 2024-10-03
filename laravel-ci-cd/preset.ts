export default definePreset({
  name: 'laravel-ci-cd',
  options: {
    // ...
  },
  handler: async () => {
    await extractTemplates({
      from: '.env.ci'
    });
    await extractTemplates({
      from: 'setup-php-node',
      to: '.github/actions/setup-php-node'
    });
    await extractTemplates({
      from: 'ci-cd-workflow.yml',
      to: '.github/workflows'
    });
  }
});
