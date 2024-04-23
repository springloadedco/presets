export default definePreset({
  name: 'sail',
  handler: async () => {
    await installPackages({
      for: 'php',
      packages: ['laravel/sail'],
      dev: true
    });
    await executeCommand({
      command: 'php',
      arguments: ['artisan', 'sail:install', '--with=pgsql,redis'],
      data: console.log
    });
  }
});
