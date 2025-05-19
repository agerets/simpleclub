import { openAIRequest, mindMapRequestTemplate, STATUSES, uploadJSONToBucket, getAllFilesAsJSON } from './utils';

export const generateMindMaps = (inputs: any[]) => {
    return Promise.all(inputs.map(async (input: any) => {
        try {
            const gptRequest = mindMapRequestTemplate(input);
            // TODO: use logger
            console.log({ gptRequest });
            const response = await openAIRequest(gptRequest);
            const sub_topics = JSON.parse(response.output_text);
            console.log({ sub_topics: response })

            await uploadJSONToBucket({
                ...input,
                ...sub_topics,
            });

            console.log({ topic: input.topic, status: STATUSES.SUCCESS });

            return { topic: input.topic, status: STATUSES.SUCCESS };
        } catch (e) {
            // TODO: send errors to sentry other place
            console.log(e);

            console.log({ topic: input.topic, status: STATUSES.FAILURE });

            // if something failed then topic is not returned
            return { topic: input.topic, status: STATUSES.FAILURE };
        }
    }))
};

export const getAllMindMaps = getAllFilesAsJSON;