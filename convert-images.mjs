
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';

async function convertImages() {
  const imagePaths = await glob('public/**/*.{jpg,jpeg,png}', { absolute: true });
  for (const imagePath of imagePaths) {
    const parsedPath = path.parse(imagePath);
    const newPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
    try {
      await sharp(imagePath).webp().toFile(newPath);
      console.log(`Converted ${imagePath} to ${newPath}`);
    } catch (error) {
      console.error(`Error converting ${imagePath}:`, error);
    }
  }
}

convertImages();
