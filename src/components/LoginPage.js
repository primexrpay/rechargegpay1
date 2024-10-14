import React, { useState } from 'react';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  //console.log(API_URL);

  if (token) {
    window.location.href = '#/dashboard';
    return null; // Prevent rendering if not authenticated
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/lgn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '#/dashboard';
      } else {
        console.error('Error:', data.message); // Log the error message
        setError(data.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error); // Log any fetch errors
      setError('An error occurred');
    }
  };

  return (
    <div className="py-10 px-5">
      <div className="bg-white border border-slate-200 rounded-xl py-4 px-6 shadow-xl shadow-blue-100">
        <center><h1>Admin</h1></center>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-[13px] ml-1 font-bold">Username</label>
            <input
              type="text"
              value={username}
              className="bg-white mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-[13px] ml-1 font-bold">Password</label>
            <input
              type="password"
              value={password}
              className="bg-white mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button className="bg-blue-500 py-3 mt-3 w-full text-[15px] rounded-xl font-bold text-white" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
