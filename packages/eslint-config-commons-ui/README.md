# ESLint Configuration for Commons UI

This repository contains the ESLint configurations for the Commons UI project. The configurations are organized to support different types of applications and packages within the project.

## Default ESLint Configuration

At the root of the project, there is a default ESLint configuration that is set up to lint Next.js applications. This configuration ensures that all Next.js specific linting rules are applied consistently across the project.

## TypeScript Configurations

For applications that are configured with TypeScript and Next and located under the `apps/{app_name}` directory, there are specific ESLint configurations that import from the `/typescript` configs. This setup ensures that TypeScript-specific linting rules are applied to these applications.

## Packages Configuration

The `packages` folder contains one ESLint configuration that imports from the `/index` configs, excluding Next.js specific rules. This configuration is used for linting packages that do not rely on Next.js.

## Running ESLint

To run ESLint with the appropriate configurations, you can use the following command at the root of the project:

```sh
pnpm eslint --flag unstable_config_lookup_from_file --fix './'
```

This command utilizes the experimental configuration file resolution feature as specified in the [ESLint documentation](https://eslint.org/docs/latest/use/configure/configuration-files#experimental-configuration-file-resolution).

By running this command, ESLint will automatically resolve and apply the correct configuration based on the location and type of the files being linted.

## Summary

- **Default Configuration**: Lints Next.js applications at the root of the project.
- **TypeScript Configuration**: Applied to TypeScript apps under `apps/{app_name}`.
- **Packages Configuration**: Applied to packages in the `packages` folder, excluding Next.js rules.
- **Running ESLint**: Use `pnpm eslint --flag unstable_config_lookup_from_file --fix './'` at the root.
