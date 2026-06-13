import { readUsers, writeUsers } from '../db/dbHelper.js';

export const register = (req, res) => {
  const users = readUsers();
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Foydalanuvchi nomi, parol va rol kiritilishi shart' });
  }

  if (role !== 'user' && role !== 'admin') {
    return res.status(400).json({ message: 'Noto\'g\'ri rol tanlandi' });
  }

  // Check if user already exists
  const userExists = users.some((u) => u.username.toLowerCase() === username.toLowerCase());
  if (userExists) {
    return res.status(400).json({ message: 'Ushbu foydalanuvchi nomi allaqachon mavjud' });
  }

  const newUser = {
    username,
    password, // Stored as plain text for simplicity in this local setup
    role
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({
    message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!',
    user: { username, role }
  });
};

export const login = (req, res) => {
  const users = readUsers();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Foydalanuvchi nomi va parol kiritilishi shart' });
  }

  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Foydalanuvchi nomi yoki parol noto\'g\'ri' });
  }

  res.json({
    message: 'Tizimga muvaffaqiyatli kirdingiz!',
    user: {
      username: user.username,
      role: user.role
    }
  });
};
