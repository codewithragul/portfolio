// server.js - explicit static server + API
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// === static folder ===
// PUBLIC_DIR is where index.html & body.js must live
const PUBLIC_DIR = path.join(__dirname, 'public');
console.log('Server starting. Project folder:', __dirname);
console.log('Expecting public folder at:', PUBLIC_DIR);

// Ensure public exists
if (!fs.existsSync(PUBLIC_DIR)) {
  console.error('ERROR: public folder not found at', PUBLIC_DIR);
  console.error('Create a folder named "public" next to server.js and put index.html inside it.');
  process.exit(1);
}

// Serve static assets
app.use(express.static(PUBLIC_DIR));

// Explicit root route that sends index.html (this guarantees GET / works)
app.get('/', (req, res) => {
  const indexFile = path.join(PUBLIC_DIR, 'index.html');
  if (!fs.existsSync(indexFile)) {
    return res.status(500).send('Error: index.html not found in public/');
  }
  res.sendFile(indexFile);
});

// Data file
const DATA_FILE = path.join(__dirname, 'messages.json');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme-token';

// Ensure messages.json exists
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

// Helpers
function readMessages() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
}
function writeMessages(arr) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

// POST endpoint
app.post('/api/messages', (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.fullName || !data.email || !data.message) {
      return res.status(400).json({ error: 'missing required fields: fullName, email, message' });
    }
    const messages = readMessages();
    const entry = Object.assign({}, data, { receivedAt: new Date().toISOString() });
    messages.push(entry);
    writeMessages(messages);
    console.log('Saved message from', data.email);
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Failed to save message', err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// small admin check route for quick health
app.get('/_status', (req, res) => {
  res.json({ ok: true, publicExists: fs.existsSync(PUBLIC_DIR) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT} — admin token: ${ADMIN_TOKEN}`));
