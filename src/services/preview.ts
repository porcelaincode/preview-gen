import puppeteer from 'puppeteer';
import { S3 } from 'aws-sdk';
import { config } from '../config';
import { renderMarkdown } from './markdown';

export class PreviewService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId!,
        secretAccessKey: config.aws.secretAccessKey!
      }
    });
  }

  async generatePreview(markdown: string, userId: string): Promise<string> {
    if (!userId.match(/^[a-zA-Z0-9-_]+$/)) {
      throw new Error('Invalid userId format');
    }

    const html = renderMarkdown(markdown);
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      await page.setViewport({ 
        width: 2048,
        height: 1440,
        deviceScaleFactor: 2
      });
      await page.setContent(html);
      
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: false
      });

      const timestamp = Date.now();
      const key = `users/${userId}/previews/preview-${timestamp}.png`;
      
      await this.s3.upload({
        Bucket: config.aws.bucketName,
        Key: key,
        Body: screenshot,
        ContentType: 'image/png',
        Metadata: {
          userId,
          createdAt: new Date(timestamp).toISOString()
        }
      }).promise();

      return `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${key}`;
    } finally {
      await browser.close();
    }
  }
} 