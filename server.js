import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Square Cloud automatically provides the PORT environment variable.
const PORT = process.env.PORT || 3000;

// Serve public static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Support client-side routing fallback (for React Router or SPA navigation if used)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
