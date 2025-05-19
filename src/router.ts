import { Request, Response, Router } from 'express';
import { upload, csv2json, json2csvStream } from './utils';
import { generateMindMaps, getAllMindMaps } from './service';

export const router = Router({ mergeParams: true });

router.get('/ping', (req: Request, res: Response) => {
    res.json({ status: 'ok'});
});

// TODO: add json validations and auth
router.post('/request-mind-map', upload.single('csv_file'), async (req: Request, res: Response) => {
    const filePath: string | undefined = req.file?.path;
    
    // TODO: Move errors to errors library
    if (!filePath) {
        res.status(400).send('File path not provided.');
    }
    
    // TODO: add types
    const inputs: any = await csv2json(filePath);

    // TODO: Move business logic to service
    const data: any = await generateMindMaps(inputs);
    
    // get file stream
    const file = await json2csvStream(data);
    
    res.setHeader('Content-Type', 'text/csv');
    // TODO: move output name to const
    res.setHeader('Content-Disposition', 'attachment; filename="output.csv"');
    file.pipe(res);
});

//TODO: add schemas and models

// TODO: organise as API with pagination instead of retriving the whole bucket
router.get('/get-all-mind-maps', async (req: Request, res: Response) => {
    const data = await getAllMindMaps();
    res.json(data);
});
