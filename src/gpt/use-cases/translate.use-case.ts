import OpenAI from "openai";

interface Options {
    prompt: string
    lang: string
}

export const translateUseCase = async (openAI: OpenAI, { prompt, lang }: Options) => {
    const completion = await openAI.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: `Traduce el siguiente texto al idioma ${lang}:${prompt}` },
        ],
        temperature: 0.2,
    });
    return { message: completion.choices[0].message.content };
}