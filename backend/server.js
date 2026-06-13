import app from './app.js';
import { seedDatabases } from './db/dbHelper.js';

const PORT = process.env.PORT || 5001;

// Seed databases on startup
await seedDatabases();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/products`);
});
