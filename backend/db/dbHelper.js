import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data files are placed in backend/data (one level up from db/)
const DATA_DIR = path.resolve(__dirname, '../data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const readProducts = () => {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading products database file:', err);
    return [];
  }
};

export const writeProducts = (products) => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to products database file:', err);
  }
};

export const readUsers = () => {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading users database file:', err);
    return [];
  }
};

export const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to users database file:', err);
  }
};

export const seedDatabases = async () => {
  // Seed Products
  const currentProducts = readProducts();
  if (currentProducts.length === 0) {
    console.log('Database is empty. Fetching initial products from FakeStoreAPI...');
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (response.ok) {
        const data = await response.json();
        writeProducts(data);
        console.log(`Successfully seeded database with ${data.length} products!`);
      } else {
        console.error('Failed to fetch from FakeStoreAPI, response status:', response.status);
      }
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  } else {
    console.log(`Database loaded. Found ${currentProducts.length} products.`);
  }

  // Seed Users
  const currentUsers = readUsers();
  if (currentUsers.length === 0) {
    console.log('No users found. Seeding default accounts (admin / user)...');
    const defaultUsers = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' }
    ];
    writeUsers(defaultUsers);
    console.log('Default accounts seeded successfully!');
  } else {
    console.log(`Users database loaded. Found ${currentUsers.length} accounts.`);
  }
};
