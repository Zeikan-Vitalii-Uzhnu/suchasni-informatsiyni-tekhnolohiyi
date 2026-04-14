const db = require('./database');

console.log('=== ДЕМОНСТРАЦІЯ РОБОТИ SQLite ===\n');

console.log('1. Всі користувачі (порожня база):', db.getAllUsers());

const user1 = db.addUser('Олена Петренко', 'olena@example.com');
console.log('2. Додано користувача:', user1);

const user2 = db.addUser('Андрій Коваленко', 'andriy@example.com');
console.log('   Додано користувача:', user2);

console.log('3. Всі користувачі після додавання:');
console.log(db.getAllUsers());

const foundUser = db.getUserById(1);
console.log('4. Користувач з id=1:', foundUser);

const wasUpdated = db.updateUser(1, 'Олена Оновлена', 'olena.new@example.com');
console.log('5. Оновлено користувача id=1:', wasUpdated ? 'успішно' : 'не знайдено');

console.log('6. Користувач з id=1 після оновлення:', db.getUserById(1));

const wasDeleted = db.deleteUser(2);
console.log('7. Видалено користувача id=2:', wasDeleted ? 'успішно' : 'не знайдено');

console.log('8. Фінальний список користувачів:');
console.log(db.getAllUsers());

console.log('\n=== ГОТОВО ===');