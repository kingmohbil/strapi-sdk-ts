import { defineConfig } from "tsup";

export default defineConfig({
    splitting: false,
    entry: ['src/index.ts'],   // Your main TypeScript entry point
    format: ['cjs', 'esm'],    // Output both CommonJS and ESModule
    sourcemap: true,           // Generate source maps
    clean: true,               // Clean the dist folder before bundling
    dts: true,                 // Generate .d.ts files for TypeScript consumers
    outDir: 'build'
});