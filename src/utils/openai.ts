import OpenAI from "openai";
import config from '../config';

export const openAIClient = new OpenAI({ apiKey: config.get('openai_api_key') });

export const openAIRequest = async (input: string) => {
    return openAIClient.responses.create({
        model: config.get('gpt_model'),
        input,
    })
};