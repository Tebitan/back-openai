import OpenAI from 'openai';

interface Options {
    threadId: string;
    runId: string;
}
export const checkCompleteStatusUseCase = async (openAI: OpenAI, options: Options) => {
    const { threadId, runId } = options;
    const runStatus = await openAI.beta.threads.runs.retrieve(threadId,runId);
    const { status } = runStatus;
    if(status === 'completed') return runStatus;

    //Esperar 1 segundo
    await new Promise(resolve=> setTimeout(resolve,1000));
    //volvemos recursiva la funcion 
    return await checkCompleteStatusUseCase(openAI,options);
}