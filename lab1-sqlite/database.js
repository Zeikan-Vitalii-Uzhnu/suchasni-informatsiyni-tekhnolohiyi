// Підключаємо бібліотеку
const Database = require('better-sqlite3');
const path = require('path');

// Відкриваємо файл бази даних (якщо файлу немає - він створиться)
const db = new Database(path.join(__dirname, 'data.db'));

// Створюємо таблицю, якщо її ще немає
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`);

// Функція 1: Отримати ВСІХ користувачів
function getAllUsers() {
  const statement = db.prepare('SELECT * FROM users');
  return statement.all();
}

// Функція 2: Отримати ОДНОГО користувача за ID
function getUserById(id) {
  const statement = db.prepare('SELECT * FROM users WHERE id = ?');
  return statement.get(id);
}

// Функція 3: Додати нового користувача
function addUser(name, email) {
  const statement = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  const info = statement.run(name, email);
  return { id: info.lastInsertRowid, name, email };
}

// Функція 4: Оновити дані користувача
function updateUser(id, name, email) {
  const statement = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
  const info = statement.run(name, email, id);
  return info.changes > 0; // true, якщо оновлено хоча б один рядок
}

// Функція 5: Видалити користувача
function deleteUser(id) {
  const statement = db.prepare('DELETE FROM users WHERE id = ?');
  const info = statement.run(id);
  return info.changes > 0; // true, якщо видалено
}

// Експортуємо функції, щоб їх можна було використати в іншому файлі
module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};