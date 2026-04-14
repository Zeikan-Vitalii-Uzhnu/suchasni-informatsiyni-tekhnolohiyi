import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query
} from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const userRef = doc(db, 'users', editingId);
      await updateDoc(userRef, { name, email });
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'users'), { name, email });
    }
    setName('');
    setEmail('');
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setEmail('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Користувачі (Firestore + onSnapshot)</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">
          {editingId ? 'Оновити' : 'Додати'}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel}>
            Скасувати
          </button>
        )}
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={() => handleEdit(user)}>Редагувати</button>
            <button onClick={() => handleDelete(user.id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
