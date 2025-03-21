import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { InternalServerErrorException } from "@nestjs/common";

export const downloadImagesAsPng = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new InternalServerErrorException(`Download image was not possible`);
    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });
    const imageNamePng = `${new Date().getTime()}.png`;
    const buffer = Buffer.from(await response.arrayBuffer());
    const completPath = `${folderPath}/${imageNamePng}`
    await sharp(buffer).png().ensureAlpha().toFile(completPath);
    return completPath;
} 