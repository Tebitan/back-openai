import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

export const downloadBase64ImageAsPng = async (base64Image: string) => {
    // Remover encabezado
    base64Image = base64Image.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });
    const imageNamePng = `${new Date().getTime()}-64.png`;
    const completePath = path.join(folderPath, imageNamePng);
    // Transformar a RGBA, png // Así lo espera OpenAI
    await sharp(imageBuffer)
        .png()
        .ensureAlpha()
        .toFile(completePath);
    return completePath;
}