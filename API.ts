import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './data/db';
import fs from 'fs/promises';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import startProducerCron from './schedulers/cronProducer';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: `${process.env.FRONTEND_URL}`,
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));

async function loadControllers() {
    try {
        const files = await fs.readdir('./Controllers');
        console.log('\n\tLoaded Controllers');
        for (const file of files) {
            const route = file.replace('Controller.ts', '').toLowerCase();
            const controller = (await import(`./Controllers/${file}`)) as {
                default: express.Router;
            };
            //const controller = await import(`./Controllers/${file.replace('.ts', '.js')}`) as { default: express.Router };
            app.use(`/api/${route}`, controller.default);
            console.log(`/api/${route}`);
        }
        console.log('');
    } catch (err) {
        console.error('Error loading controllers:', err);
    }
}

void (async () => {
    await connectDb();
    await loadControllers();
    //startProducerCron();

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})();
