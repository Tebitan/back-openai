import OpenAI from 'openai';
interface Options {
    threadId: string;
}

export const getMessageListUseCase = async (openAI: OpenAI, opcions: Options) => {
    const { threadId } = opcions;
    const messgeList = await openAI.beta.threads.messages.list(threadId);
    const messages = messgeList.data.map(message => ({
        role: message.role,
        content: message.content.map(content => (content as any).text.value),
    }));
    return messages;
}