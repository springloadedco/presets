export default definePreset({
  name: 'laravel-react-app',
  handler: async () => {
    await installPackages({
      for: 'php',
      packages: ['laravel/breeze'],
      dev: true
    });
    await executeCommand({
      command: 'php',
      arguments: ['artisan', 'breeze:install', 'react', '--typescript', '--pest']
    });
    await executeCommand({
      command: 'npx',
      arguments: ['shadcn@latest', 'init', '--yes', '--defaults', '--force', '--silent']
    });
    await applyNestedPreset({
      preset: 'springloadedco/presets',
      args: ['--path', 'php-cs-fixer']
    });
    await applyNestedPreset({
      preset: 'springloadedco/presets',
      args: ['--path', 'laravel-docker']
    });
    await applyNestedPreset({
      preset: 'springloadedco/presets',
      args: ['--path', 'eslint-react']
    });
    await applyNestedPreset({
      preset: 'springloadedco/presets',
      args: ['--path', 'laravel-ci-cd']
    });
  }
});
