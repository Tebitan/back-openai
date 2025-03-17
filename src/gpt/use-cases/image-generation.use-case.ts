import *  as fs from 'fs';
import * as path from 'path';
import OpenAI from "openai";
import { downloadBase64ImageAsPng, downloadImagesAsPng } from "../../helpers";

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

interface Options2 {
    baseImage: string;
}

export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options;

    if (!originalImage || !maskImage) {
        const response = await openai.images.generate({
            prompt: prompt,
            model: "dall-e-3",
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url"

        });
        const localPath = await downloadImagesAsPng(response.data[0].url);
        return {
            url: response.data[0].url,
            localPath,
            data: response.data[0]
        };
    }
    //Se tiene que buscar primero la imagen file systrem getImageByIdUseCase
    const pngImagePath = await downloadImagesAsPng(originalImage);
    const maskPath = await downloadBase64ImageAsPng(maskImage);
    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt: prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskPath),
        n: 1,
        size: '1024x1024',
        response_format: "url"
    });
    const localImagePath = await downloadImagesAsPng(response.data[0].url);
    return {
        url: response.data[0].url,
        localPath: localImagePath,
        data: response.data[0]
    };

}

export const getImageByIdUseCase = async (fileId: number) => {
    const filePath = path.resolve(__dirname, '../../../generated/images/', `${fileId.toString()}.png`);
    return fs.existsSync(filePath) ? filePath : '';
}

export const imageVariationUseCase = async (openai: OpenAI, options: Options2) => {
    const { baseImage } = options;
    const pngImagePath = await downloadImagesAsPng(baseImage);
    const response = await openai.images.createVariation({
        model: 'dall-e-2',
        image: fs.createReadStream(pngImagePath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    });

    const localPath = await downloadImagesAsPng(response.data[0].url);
    return {
        url: response.data[0].url,
        localPath,
        data: response.data[0]
    };

}