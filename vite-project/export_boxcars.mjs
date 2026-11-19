import fs from 'fs';
import path from 'path';
import { parseFig, geometryBlobToSVGPath, getBlobBytes } from 'openfig-core';

const figPath = '/Users/incold13/Downloads/Многостраничный сайт - Автодилер.fig';
const rawImagesDir = '/tmp/boxcars_raw_images';
const targetAssetsDir = '/Users/incold13/Desktop/Boxcars/vite-project/src/assets';

const buf = fs.readFileSync(figPath);
const result = parseFig(buf);

const guidMap = new Map();
for (const n of result.nodes) {
  if (n.guid) guidMap.set(`${n.guid.sessionID}:${n.guid.localID}`, n);
}

function getAncestors(node) {
  const list = [];
  let cur = node;
  while (cur && cur.parentIndex?.guid) {
    const parentKey = `${cur.parentIndex.guid.sessionID}:${cur.parentIndex.guid.localID}`;
    const parent = guidMap.get(parentKey);
    if (!parent) break;
    list.push(parent);
    cur = parent;
  }
  return list;
}

// Ensure dir helper
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// 1. Process SVG Icons
const vectorNodes = result.nodes.filter(n => n.type === 'VECTOR' && n.fillGeometry?.[0]?.commandsBlob !== undefined);
console.log(`Found ${vectorNodes.length} vector nodes.`);

const svgExported = new Set();
ensureDir(path.join(targetAssetsDir, 'header'));
ensureDir(path.join(targetAssetsDir, 'footer'));
ensureDir(path.join(targetAssetsDir, 'icons'));

for (const v of vectorNodes) {
  const blobIndex = v.fillGeometry[0].commandsBlob;
  const blobBytes = getBlobBytes(result, blobIndex);
  if (!blobBytes) continue;
  try {
    const d = geometryBlobToSVGPath(blobBytes);
    if (!d || d.length < 5) continue;
    const w = Math.max(1, Math.round(v.size?.x || 24));
    const h = Math.max(1, Math.round(v.size?.y || 24));
    
    // Name determination
    const ancestors = getAncestors(v);
    const parent = ancestors[0];
    let iconName = (parent?.name || v.name || 'icon').toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (iconName.length < 2 || iconName === 'vector') {
      const parentName = ancestors.find(a => a.name && !['vector', 'icon', 'svg', 'container'].includes(a.name.toLowerCase()))?.name;
      if (parentName) iconName = parentName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    }
    
    const svgContent = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>\n`;

    let destDir = path.join(targetAssetsDir, 'icons');
    if (ancestors.some(a => a.name?.toLowerCase().includes('header'))) {
      destDir = path.join(targetAssetsDir, 'header');
    } else if (ancestors.some(a => a.name?.toLowerCase().includes('footer'))) {
      destDir = path.join(targetAssetsDir, 'footer');
    }

    const filename = `${iconName}_${w}x${h}.svg`;
    const destPath = path.join(destDir, filename);
    if (!svgExported.has(destPath)) {
      fs.writeFileSync(destPath, svgContent);
      svgExported.add(destPath);
    }
  } catch (e) {}
}

console.log(`Exported ${svgExported.size} SVG icons.`);

// 2. Process Raster Images
const homeNode = result.nodes.find(n => n.name === 'Header-main');
const imgNodes = result.nodes.filter(n => n.fillPaints?.some(p => p.type === 'IMAGE'));

console.log(`Processing ${imgNodes.length} image nodes...`);
let copiedImages = 0;

for (const n of imgNodes) {
  const paint = n.fillPaints.find(p => p.type === 'IMAGE');
  if (!paint?.image?.hash) continue;
  const hashHex = Buffer.from(paint.image.hash).toString('hex');
  const srcFile = path.join(rawImagesDir, hashHex);
  if (!fs.existsSync(srcFile)) continue;

  const rawHead = fs.readFileSync(srcFile, { start: 0, end: 12 });
  const ext = rawHead.includes(Buffer.from('PNG')) ? 'png' : 'jpg';

  const ancestors = getAncestors(n);
  const isHome = ancestors.some(a => a.guid?.sessionID === homeNode?.guid?.sessionID && a.guid?.localID === homeNode?.guid?.localID);

  let targetSubdir = 'common';
  let cleanName = (n.name || 'image').toLowerCase().replace(/\.(png|jpg|jpeg|webp)/g, '').replace(/[^a-z0-9_]/g, '_');

  if (isHome) {
    const section = ancestors.find(a => {
      const p = guidMap.get(`${a.parentIndex?.guid?.sessionID}:${a.parentIndex?.guid?.localID}`);
      return p && (p.name.trim() === 'Main' || p.guid?.localID === homeNode?.guid?.localID);
    });
    const y = Math.round(section?.transform?.m12 || 0);
    if (y < 300) targetSubdir = 'page1/main_sect1';
    else if (y < 1200) targetSubdir = 'page1/main_sect2';
    else if (y < 2500) targetSubdir = 'page1/main_sect3';
    else if (y < 3600) targetSubdir = 'page1/main_sect4';
    else if (y < 4400) targetSubdir = 'page1/main_sect5';
    else if (y < 5200) targetSubdir = 'page1/main_sect6';
    else if (y < 6000) targetSubdir = 'page1/main_sect7';
    else if (y < 6800) targetSubdir = 'page1/main_sect8';
    else if (y < 7200) targetSubdir = 'page1/main_sect9';
    else targetSubdir = 'page1/main_sect10';
  } else {
    const topPage = ancestors.find(a => a.parentIndex?.guid?.sessionID === 8 && a.parentIndex?.guid?.localID === 42) || ancestors[ancestors.length - 1];
    const pName = topPage?.name?.toLowerCase() || '';
    if (pName.includes('list')) targetSubdir = 'page2';
    else if (pName.includes('details')) targetSubdir = 'page3';
    else if (pName.includes('about')) targetSubdir = 'page4';
    else if (pName.includes('service')) targetSubdir = 'page5';
    else if (pName.includes('blog')) targetSubdir = 'page6';
    else if (pName.includes('shop')) targetSubdir = 'page7';
    else if (pName.includes('contact')) targetSubdir = 'page8';
    else targetSubdir = 'other';
  }

  // Skip OSM map tiles
  if (cleanName.includes('12319') || cleanName.includes('12320') || (n.size?.x === 256 && n.size?.y === 256 && targetSubdir.includes('page8'))) {
    continue;
  }

  const outDir = path.join(targetAssetsDir, targetSubdir);
  ensureDir(outDir);

  const destFile = path.join(outDir, `${cleanName}.${ext}`);
  fs.copyFileSync(srcFile, destFile);
  copiedImages++;
}

console.log(`Copied ${copiedImages} raster assets.`);

// Generate header logo.svg if not present
const headerLogoPath = path.join(targetAssetsDir, 'header', 'logo.svg');
const logoSvg = `<svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 8V24L12 30L22 24V8L12 2Z" fill="#405FF2"/>
  <path d="M12 7L6 11V21L12 25L18 21V11L12 7Z" fill="#ffffff"/>
  <text x="30" y="23" font-family="'DM Sans', sans-serif" font-size="22" font-weight="800" fill="#050B20" letter-spacing="-0.5">BOXCARS</text>
</svg>\n`;
fs.writeFileSync(headerLogoPath, logoSvg);

// Footer logo
const footerLogoPath = path.join(targetAssetsDir, 'footer', 'logo_white.svg');
const footerLogoSvg = `<svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 8V24L12 30L22 24V8L12 2Z" fill="#405FF2"/>
  <path d="M12 7L6 11V21L12 25L18 21V11L12 7Z" fill="#ffffff"/>
  <text x="30" y="23" font-family="'DM Sans', sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.5">BOXCARS</text>
</svg>\n`;
fs.writeFileSync(footerLogoPath, footerLogoSvg);

