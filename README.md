# Springloaded Presets

This is a repository of presets that we commonly use for Springloaded projects.

Check the individual folders of the repository for information on the specific presets.

## Usage

You don't need to clone this repo in order to start applying presets. 

We leverage the [Preset node CLI tool](https://preset.dev/quick-start) to run and manage these presets. You can install preset globally, or use npx to run it.

#### Installing / Running Preset

```
npm i -g @preset/cli
```

```
# With global installation
preset apply organization/preset

# With npx for one-off commands (note that `apply` is an aliased package equivalent to `@preset/cli`)
npx apply organization/preset
```

Refer to the Preset docs [https://preset.dev/quick-start#installation](https://preset.dev/quick-start#installation) for additional information.

## Alias

In order to make using presets easier, here's a helpful alias you can add to your system:

```bash
alias slp="preset apply springloadedco/presets --path"
```

If you haven't installed Preset globally, you can modify the alias to use npx:

```bash
alias slp="npx apply springloadedco/presets --path"
```

Then you can install presets by running:

```bash
slp <preset-name>
```
