# Preview Generator

A small node.js service that generates preview images from markdown content using Puppeteer and stores them in AWS S3.

## Features

- Converts Markdown to styled HTML
- Generates high-quality preview images (2048x1440)
- Stores images in AWS S3
- Rate limiting protection
- Docker support
- CORS enabled
- Health check endpoint

## Prerequisites

- Node.js 18 or higher
- AWS Account with S3 access
- Docker (optional)

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3030
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
BUCKET_NAME=your-bucket-name
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Docker Usage

```bash
# Build the Docker image
docker-compose build

# Run the service
docker-compose up -d
```

## API Endpoints

### Generate Preview
```http
POST /generate-preview
Content-Type: application/json

{
  "markdown": "# Your Markdown Content",
  "userId": "user123"
}
```

### Health Check
```http
GET /health
```

## License

MIT