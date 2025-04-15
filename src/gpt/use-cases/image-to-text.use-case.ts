import OpenAI from 'openai';
import { convertFileToBase64 } from '../../helpers';

interface Options {
  prompt?: string;
  imageFile: Express.Multer.File;
}

export const imageToTextUseCase = async (openai: OpenAI, options: Options) => {
    const { imageFile, prompt } = options;
  
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo', //'gpt-4-vision-preview',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt ?? '¿Qué logras ver en la imagen?',
            },
            // {
            //   type: 'image_url',
            //   image_url: {
            //     url: 'https://static.vecteezy.com/system/resources/previews/003/623/626/non_2x/sunset-lake-landscape-illustration-free-vector.jpg',
            //   },
            // },
            {
              type: 'image_url',
              image_url: {
                url: convertFileToBase64(imageFile),
              },
            },
          ],
        },
      ],
    });
  
    return { msg: response.choices[0].message.content };
  };