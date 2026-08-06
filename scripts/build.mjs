/**
 * Build de Curio.
 * Compila src/app.jsx + Tailwind y produce un unico archivo dist/index.html
 * completamente autocontenido: sin CDN, sin red, sin API keys.
 *
 *   npm run build     -> compila una vez
 *   npm run watch     -> recompila al guardar
 */
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(root, ...s);

async function compile() {
  // 1. JS: React + la app, en un bundle IIFE minificado
  const out = await build({
    entryPoints: [p('src/app.jsx')],
    bundle: true,
    minify: true,
    format: 'iife',
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    write: false,
    logLevel: 'silent',
  });
  const js = out.outputFiles[0].text;

  // 2. CSS: solo las clases de Tailwind realmente usadas + estilos propios
  mkdirSync(p('.tmp'), { recursive: true });
  execFileSync(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['tailwindcss', '-c', p('tailwind.config.js'), '-i', p('src/index.css'), '-o', p('.tmp/tw.css'), '--minify'],
    { stdio: 'ignore' }
  );
  const css = readFileSync(p('.tmp/tw.css'), 'utf8') + '\n' + readFileSync(p('src/custom.css'), 'utf8');

  // 3. Inyeccion en la plantilla
  const html = readFileSync(p('src/index.html'), 'utf8')
    .replace('/*__CSS__*/', () => css)
    .replace('/*__JS__*/', () => js.replace(/<\/script/g, '<\\/script'));

  mkdirSync(p('dist'), { recursive: true });
  writeFileSync(p('dist/index.html'), html);
  console.log(`dist/index.html  ${(html.length / 1024).toFixed(1)} kb`);
}

await compile();

if (process.argv.includes('--watch')) {
  console.log('Observando src/ …');
  let t;
  watch(p('src'), { recursive: true }, () => {
    clearTimeout(t);
    t = setTimeout(() => compile().catch(e => console.error(e.message)), 120);
  });
}
