import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BiRename } from 'react-icons/bi';
import { useNavigate } from 'react-router'; 
import { register } from '../services/userService';

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
        const userData = await register(username, password, email, firstName, lastName);
      console.log('Signup successful:', userData);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='flex flex-grow justify-center place-items-center bg-accent'>
      <div className='flex flex-col w-full max-w-100 h-fit bg-primary-content p-3 px-8 rounded shadow-lg gap-3 justify-center place-items-center'>
        <img className='w-30 h-30' src='assets/logo.png' alt='logo' />
        <h1 className='text-3xl font-bold mb-5'>Sign Up</h1>
        <p>
          Have an account?{' '}
          <a className='cursor-pointer text-accent underline' onClick={() => navigate('/login')}>
            Log in!
          </a>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSignup}>
          <div className='flex w-full place-items-center bg-primary-content border-1 rounded'>
            <label htmlFor='fname' className='flex text-center place-items-center text-primary-content h-8 font-semibold px-2 bg-neutral'>
              <BiRename />
            </label>
            <input
              type='text'
              name='fname'
              id='fname'
              placeholder='First Name'
              className='p-1 rounded w-full'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='flex w-full place-items-center bg-primary-content border-1 rounded'>
            <label htmlFor='lname' className='flex text-center place-items-center text-primary-content h-8 font-semibold px-2 bg-neutral'>
              <BiRename />
            </label>
            <input
              type='text'
              name='lname'
              id='lname'
              placeholder='Last Name'
              className='p-1 rounded w-full'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
            <label htmlFor='email' className='flex text-center place-items-center text-primary-content h-8 font-semibold px-2 bg-neutral'>
              <MdEmail />
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Company E-mail'
              className='p-1 rounded w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className='flex w-full place-items-center bg-primary-content border-1 rounded'>
            <label htmlFor='cpassword' className='flex text-center place-items-center text-primary-content h-8 font-semibold px-2 bg-neutral'>
              <RiLockPasswordFill />
            </label>
            <input
              type='password'
              name='cpassword'
              id='cpassword'
              placeholder='Confirm Password'
              className='p-1 rounded w-full'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn w-full bg-neutral text-white my-3'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;