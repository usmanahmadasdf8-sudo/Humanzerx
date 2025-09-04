const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Allow all origins (testing only!)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', routes);

// ✅ Test route
app.get("/test", (req, res) => {
  res.json({ msg: "Hello from Humanizer X backend 🚀" });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Create uploads folder if missing
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.listen(PORT, () => {
  console.log(`✅ Humanizer X Backend running on http://localhost:${PORT}`);
  console.log(`✅ API available at http://localhost:${PORT}/api`);
});
