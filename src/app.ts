import express from 'express';
import { PreviewService } from './services/preview';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();
const previewService = new PreviewService();

app.use(express.json({ limit: '1mb' }));

// Basic request validation middleware
const validateRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { markdown, userId } = req.body;

  if (!markdown || typeof markdown !== 'string') {
    return res.status(400).json({ error: 'Invalid markdown content' });
  }

  if (!userId || typeof userId !== 'string' || !userId.match(/^[a-zA-Z0-9-_]+$/)) {
    return res.status(400).json({ error: 'Invalid userId format' });
  }

  next();
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each userId to 100 requests per windowMs
  keyGenerator: (req) => req.body.userId || req.ip
});

app.use('/generate-preview', limiter);

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));

app.post('/generate-preview', validateRequest, async (req, res) => {
  try {
    const { markdown, userId } = req.body;
    const imageUrl = await previewService.generatePreview(markdown, userId);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Preview generation failed:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app; 