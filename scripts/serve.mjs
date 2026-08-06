/** Servidor estatico minimo para probar dist/ en el navegador. */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = process.env.PORT || 4173;

createServer((req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(readFileSync(join(dist, 'index.html')));
  } catch {
    res.writeHead(404); res.end('Corre primero: npm run build');
  }
}).listen(port, () => console.log(`Curio en http://localhost:${port}`));
