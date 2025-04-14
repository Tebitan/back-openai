import OpenAI from 'openai';
export const createThreadUseCase =  async(openAI:OpenAI)=>{
    return await openAI.beta.threads.create();
}