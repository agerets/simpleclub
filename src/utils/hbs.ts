import fs from 'fs';
import hbs from 'handlebars';
import path from 'path';

const partialsDir = path.join(__dirname, '../templates');

fs.readdirSync(partialsDir).forEach(file => {
    const partialPath = path.join(partialsDir, file);
    const partialContent = fs.readFileSync(partialPath, 'utf8');
    const partialName = path.parse(file).name;
    hbs.registerPartial(partialName, partialContent);
});

export const mindMapRequestTemplate = hbs.compile(
    fs.readFileSync(path.join(__dirname, '../templates/mind_map_request.hbs'), 'utf8')
);