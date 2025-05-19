import multer from 'multer';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import { v4 } from 'uuid';
import { createObjectCsvWriter } from 'csv-writer';

const uploadPath = path.join(__dirname, 'uploads/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // make unique filename
        cb(null, `${file.originalname}_${v4()}`);
    }
});

export const upload = multer({ storage });

export const csv2json = (filePath: any) => {
    const results: any[] = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('error', (error) => reject(error))
            .on('end', async () => {
                // remove file
                fs.unlinkSync(filePath);
                resolve(results);
            });
    })
};

export const json2csvStream = async (data: any) => {
    const tmpPath = path.join(uploadPath, `${v4()}.csv`);
    const csvWriter = createObjectCsvWriter({
        path: tmpPath,
        header: [
          { id: 'topic', title: 'topic' },
          { id: 'status', title: 'status' },
        ]
    });
  
    // Write the data to CSV
    await csvWriter.writeRecords(data);

    const file = fs.createReadStream(tmpPath);

    file.on('close', () => {
        // Delete the temporary CSV file after streaming is complete
        fs.unlinkSync(tmpPath);
    });

    // Stream the CSV file in the response
    return file;
};