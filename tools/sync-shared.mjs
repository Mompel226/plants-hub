/* Copy the shared plant files into this repo.   node tools/sync-shared.mjs
   The source is ../../labs-shared/plant/ (plant.js, plant-draw.js); the Plants Lab copies the
   same files with its own build. Edit them there, then sync here and rebuild the lab, so the
   two pages draw the same plant. */
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(REPO, '../../labs-shared/plant');
if (!existsSync(SRC)) { console.error('labs-shared/plant not found at ' + SRC); process.exit(1); }
for (const f of ['plant.js', 'plant-draw.js']) copyFileSync(resolve(SRC, f), resolve(REPO, 'js', f));
console.log('synced plant.js and plant-draw.js from labs-shared/plant');
