import { marked } from 'marked';

export const renderMarkdown = (markdown: string): string => {
  const html = marked(markdown);
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
            body {
                margin: 0;
                padding: 40px 80px;
                width: 2048px;
                height: 1440px;
                box-sizing: border-box;
                background-color: white;
            }
            
            .markdown-content {
                max-width: 1800px;
                margin: 0 auto;
                color: #374151;
                line-height: 1.6;
                text-align: left;
            }
            
            .markdown-content h1 {
                font-size: 4rem;
                font-weight: 700;
                margin: 3rem 0 1.5rem;
                background: linear-gradient(45deg, #111111, #535bf2);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }
            
            .markdown-content h2 {
                font-size: 1.75rem;
                font-weight: 600;
                margin: 1.5rem 0 1rem;
                color: #111827;
            }

            .markdown-content h3 {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 1.25rem 0 0.75rem;
                color: #1f2937;
            }

            .markdown-content p {
                margin: 1rem 0;
            }

            .markdown-content ul {
                list-style-type: disc;
                padding-left: 1.5rem;
                margin: 1rem 0;
            }

            .markdown-content table {
                width: 100%;
                border-collapse: collapse;
                margin: 1rem 0;
            }

            .markdown-content th,
            .markdown-content td {
                border: 1px solid #e5e7eb;
                padding: 0.75rem;
                text-align: left;
            }

            .markdown-content th {
                background: #f9fafb;
                font-weight: 600;
            }

            .markdown-content code {
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-size: 0.875em;
            }

            .markdown-content pre {
                background: #1f2937;
                color: #f9fafb;
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
                margin: 1rem 0;
            }

            .markdown-content blockquote {
                border-left: 4px solid #e5e7eb;
                padding-left: 1rem;
                margin: 1rem 0;
                color: #6b7280;
            }
        </style>
      </head>
      <body>
        <div class="markdown-content">
          ${html}
        </div>
      </body>
    </html>
  `;
}; 