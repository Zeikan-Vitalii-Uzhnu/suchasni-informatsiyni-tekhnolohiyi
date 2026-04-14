const db = require('./firestore');

(async () => {
  console.log('=== ДЕМОНСТРАЦІЯ РОБОТИ FIREBASE FIRESTORE ===\n');

  console.log('1. Всі користувачі (порожня база):', await db.getAllUsers());

  const user1 = await db.addUser({ name: 'Марія Іваненко', email: 'maria@test.com' });
  console.log('2. Додано користувача:', user1);

  const user2 = await db.addUser({ name: 'Петро Сидоренко', email: 'petro@test.com' });
  console.log('   Додано користувача:', user2);

  console.log('3. Всі користувачі після додавання:');
  console.log(await db.getAllUsers());

  const allUsers = await db.getAllUsers();
  if (allUsers.length > 0) {
    const firstId = allUsers[0].id;
    const foundUser = await db.getUserById(firstId);
    console.log(`4. Користувач з id=${firstId}:`, foundUser);

    await db.updateUser(firstId, { name: 'Марія Оновлена', email: 'maria.new@test.com' });
    console.log(`5. Оновлено користувача id=${firstId}`);
    console.log('   Після оновлення:', await db.getUserById(firstId));
  }

  const usersAfterUpdate = await db.getAllUsers();
  if (usersAfterUpdate.length > 1) {
    const secondId = usersAfterUpdate[1].id;
    await db.deleteUser(secondId);
    console.log(`6. Видалено користувача id=${secondId}`);
  }

  console.log('7. Фінальний список користувачів:');
  console.log(await db.getAllUsers());

  console.log('\n=== ГОТОВО ===');
})();