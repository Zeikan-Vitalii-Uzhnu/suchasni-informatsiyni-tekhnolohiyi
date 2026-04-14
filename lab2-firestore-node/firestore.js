const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const usersCollection = db.collection('users');

async function getAllUsers() {
  const snapshot = await usersCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getUserById(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

async function addUser(data) {
  const docRef = await usersCollection.add(data);
  return { id: docRef.id, ...data };
}

async function updateUser(id, data) {
  await usersCollection.doc(id).update(data);
  return { id, ...data };
}

async function deleteUser(id) {
  await usersCollection.doc(id).delete();
  return id;
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};