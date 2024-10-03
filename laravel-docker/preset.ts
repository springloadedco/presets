export default definePreset({
  name: 'laravel-docker',
  handler: async () => {
    await extractTemplates();
  }
});
