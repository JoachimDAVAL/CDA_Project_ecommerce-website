// scripts/compress-models.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const srcDir = 'assets-src';
const outDir = 'public/models';

// Crée le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Lit tous les fichiers .glb ou .fbx du dossier source
const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.glb') || file.endsWith('.fbx'));

files.forEach(file => {
  const inputPath = path.join(srcDir, file);
  // On force l'extension de sortie en .glb
  const outputName = path.parse(file).name + '.glb'; 
  const outputPath = path.join(outDir, outputName);

  console.log(`📦 Optimisation de ${file} ...`);
  
  // Exécute la commande gltf-transform
  try {
    execSync(`npx gltf-transform optimize "${inputPath}" "${outputPath}" --compress draco --texture-compress webp --texture-size 2048`, { stdio: 'inherit' });
    console.log(`✅ Terminé : ${outputPath}\n`);
  } catch (err) {
    console.error(`❌ Erreur sur ${file}`);
  }
});