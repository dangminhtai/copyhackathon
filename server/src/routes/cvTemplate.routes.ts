
import express from 'express';

const router = express.Router();

const templates = [
    {
        id: 'classic',
        name: 'Cổ điển',
        thumbnailUrl: 'https://i.imgur.com/T1M2432.png',
        componentName: 'TemplateClassic',
    },
    {
        id: 'modern',
        name: 'Hiện đại',
        thumbnailUrl: 'https://i.imgur.com/3fa35t8.png',
        componentName: 'TemplateModern',
    }
];


router.get('/', (req, res) => {
    res.json(templates);
});

export default router;
