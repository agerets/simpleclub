import { Storage } from '@google-cloud/storage';
import { v4 } from 'uuid';
import config from '../config';

const storage = new Storage({
    apiKey: config.get('gcp_api_key'),
    projectId: config.get('gcp_project_id'),
});

const bucketName = config.get('gcp_bucket_name');

export const uploadJSONToBucket = async (data: any) => {
    // TODO: fails if bucket don't exist = create validation later
    const [bucket] = await storage.bucket(bucketName).get();

    const fileName = `${v4()}.json`;

    const file = storage.bucket(bucketName).file(fileName);

    await file.save(JSON.stringify(data), {
        contentType: 'application/json'
    });

    console.log(`JSON file ${fileName} uploaded successfully to bucket ${bucketName}`);
};

export const createBucketIfNotExists = async () => {
    try {
        const [buckets] = await storage.getBuckets();

        if (!buckets.some(bucket => bucket.name === bucketName)) {
            await storage.createBucket(bucketName);
            console.log(`Bucket ${bucketName} created as it did not exist.`);
        } else {
            console.log(`Bucket ${bucketName} already exists.`);
        }
    } catch (error) {
        console.error('Error creating/checking bucket:', error);
    }
};

// TODO: handle download better with pagination, maybe like a different files
export const getAllFilesAsJSON = async () => {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles();

    return Promise.all(files.map(async (file) => {
        const [data] = await file.download();
        return JSON.parse(data.toString())
    }));
};
