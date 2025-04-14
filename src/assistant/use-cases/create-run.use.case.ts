import OpenAI from 'openai';
interface Options {
    threadId: string;
    assistantId?: string;//Se puede pasar por variable de entorno
}

export const createRunUseCase = async (openAI: OpenAI, opcions: Options) => {
    const { threadId, assistantId = 'asst_NBCnulTCvCNEGbGQAeaplbU0' } = opcions;
    return await openAI.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        //instructions; OJO! Sobre escribe el asistente 
    });
}