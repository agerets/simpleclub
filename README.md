# simpleclub

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/agerets/simpleclub.git
   cd simpleclub
   ```

2. Install dependencies using npm:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory of the project with the following values:
```
OPENAI_API_KEY=
GCP_API_KEY=
GCP_PROJECT_ID=
GCP_BUCKET_NAME=
GPT_MODEL=gpt-3.5-turbo
```

## Usage

### Starting the Server
To start the server, run the following command:
```bash
npm start
```

### Request Generation of Mind Map from CSV
Use the following `curl` command to request the generation of a mind map from a CSV file:
```bash
curl --location 'http://localhost:3000/request-mind-map' --form 'csv_file=@"/path/to/your/input_file.csv"'
```

### Get All Mind Maps Generated
To retrieve all generated mind maps, use the following `curl` command:
```bash
curl --location 'http://localhost:3000/get-all-mind-maps'
```