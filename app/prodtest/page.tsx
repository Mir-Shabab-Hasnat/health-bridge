"use client"; 

import { useState } from 'react';
import { useMutation } from 'convex/react'; 

import { api } from '../../convex/_generated/api' 

export default function ProdTest() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authenticate = useMutation(api.mutations.userAuthentication.authenticate);

  const handleRegister = async () => {
    try {

      const result: boolean | (string | boolean)[] = await authenticate({ username, password });

      if (Array.isArray(result)) {
        const [userId, isDoctor] = result; 

        if (typeof userId === 'string') {
          document.cookie = `userId=${userId}; path=/`;
        }

        if (typeof isDoctor === 'boolean') {
          document.cookie = `isDoctor=${isDoctor}; path=/`; 
        }

      } else if (typeof result === 'boolean') {
        document.cookie = `loginSuccess=${result}; path=/`;
      }
    
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
