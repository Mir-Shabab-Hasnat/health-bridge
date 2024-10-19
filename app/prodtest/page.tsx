"use client"; 

import { useState } from 'react';
import { useMutation } from 'convex/react'; 

import { api } from '../../convex/_generated/api'

export default function ProdTest() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = useMutation(api.mutations.userAuthentication.registerUser)

  const handleRegister = async () => {
    try {
      const { userId } = await register({ username, password });
      
      document.cookie = `currentUser=${userId}; isDoctor=${isDoctor} path=/;`;

      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error registering user: ' + error)
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
