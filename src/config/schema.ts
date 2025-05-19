export default {
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT'
    },
    openai_api_key: {
        doc: 'OpenAI API key.',
        format: String,
        default: '',
        env: 'OPENAI_API_KEY'
    },
    gcp_api_key: {
        doc: 'Google Cloud Platform API key.',
        format: String,
        default: '',
        env: 'GCP_API_KEY'
    },
    gcp_project_id: {
        doc: 'Google Cloud Platform project id.',
        format: String,
        default: '',
        env: 'GCP_PROJECT_ID'
    },
    gcp_bucket_name: {
        doc: 'Google Cloud Platform Storage Bucket Name.',
        format: String,
        default: '',
        env: 'GCP_BUCKET_NAME'
    },
    gpt_model: {
        doc: 'OpenAI GPT model.',
        format: String,
        default: 'gpt-3.5-turbo',
        env: 'GPT_MODEL'
    },
};
