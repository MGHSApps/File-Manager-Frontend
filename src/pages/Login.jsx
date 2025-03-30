import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { login } from '../services/userService';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const userData = await login(username, password);
        console.log("Login successful:", userData);

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));
      
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
  };

  return (
    <div className='flex flex-grow justify-center place-items-center bg-accent'>
      <div className='flex flex-col w-full max-w-100 h-fit bg-primary-content p-3 px-8 rounded shadow-lg gap-3 justify-center place-items-center'>
        <img className='w-30 h-30' src='assets/logo.png' alt='logo' />
        <h1 className='text-3xl font-bold mb-5'>LOGIN</h1>
        <p>
          Don't have an account yet?{' '}
          <a className='cursor-pointer text-accent underline' onClick={() => navigate('/signup')}>
            Sign Up!
          </a>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className='flex w-full place-items-center bg-primary-content border-1 rounded'>
            <label htmlFor='username' className='flex text-center place-items-center text-primary-content h-8 font-semibold px-2 bg-neutral'>
              <MdEmail />
            </label>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              className='p-1 rounded w-full'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='flex w-full place-items-center bg-primary-content border-1 rounded'>
            <label htmlFor='password' className='flex text-center place-items-center text-primary-content h-8 font-semibold px-2 bg-neutral'>
              <RiLockPasswordFill />
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='p-1 rounded w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-x-grow text-center justify-center mt-2 mb-2'>
            <a className='underline text-gray-700 cursor-pointer' onClick={() => navigate("/forgot-password")}>Forgot password?</a>
          </div>
          <button type='submit' className='btn w-full bg-neutral text-white my-3'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;