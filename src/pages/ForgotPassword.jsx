import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { PiKeyFill } from 'react-icons/pi';
import { useNavigate } from 'react-router';
import { sendOTP, verifyOTP } from '../services/passwordService';
import { motion } from 'framer-motion';
import { editUser, getUser } from '../services/userService';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!email) return setError("Please enter your email.");
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await sendOTP(email);
      setMessage(response.message || 'OTP sent successfully!');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return setError("Please enter the OTP.");
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await verifyOTP(email, otp);
      setMessage('OTP verified successfully!');
      setStep(3); // Move to the password reset step
    } catch (err) {
      setError(err.message || 'Invalid OTP, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) return setError("Please fill in both fields.");
    if (newPassword !== confirmPassword) return setError("Passwords do not match.");
  
    setLoading(true);
    setError(null);
    setMessage(null);
  
    try {
      // Step 1: Get the user details using the email
      const user = await getUser(email);
      
      if (!user) throw new Error("User not found.");

      await editUser(user._id, { password: newPassword });
  
      setMessage("Password reset successfully!");
      setStep(4);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-grow justify-center items-center bg-accent'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='flex flex-col w-full max-w-md h-fit bg-primary-content p-5 rounded shadow-lg gap-3 justify-center items-center'
      >
        <img className='w-20 h-20' src='assets/logo.png' alt='logo' />
        <h1 className='text-3xl font-bold mb-3'>Change Password</h1>
        <p>
          Remembered your password?{' '}
          <a className='cursor-pointer text-accent underline' onClick={() => navigate('/login')}>
            Log in!
          </a>
        </p>
        {error && <p className='text-red-500'>{error}</p>}
        {message && <p className='text-green-500'>{message}</p>}

        {/* Step 1: Email Input */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="w-full">
            <div className='flex w-full items-center bg-primary-content border rounded'>
              <label htmlFor='email' className='flex items-center text-primary-content h-10 font-semibold px-2 bg-neutral'>
                <MdEmail />
              </label>
              <input
                type='email'
                id='email'
                placeholder='Company Email'
                className='p-2 rounded w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button onClick={handleSendEmail} className={`btn w-full text-white my-3 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-neutral'}`} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </motion.div>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="w-full">
            <div className='flex w-full items-center bg-primary-content border rounded'>
              <label htmlFor='otp' className='flex items-center text-primary-content h-10 font-semibold px-2 bg-neutral'>
                <PiKeyFill />
              </label>
              <input
                type='text'
                id='otp'
                placeholder='Enter OTP'
                className='p-2 rounded w-full'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button onClick={handleVerifyOTP} className={`btn w-full text-white my-3 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-neutral'}`} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </motion.div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="w-full">
            <div className='flex w-full items-center bg-primary-content border rounded'>
              <label htmlFor='newPassword' className='flex items-center text-primary-content h-10 font-semibold px-2 bg-neutral'>
                🔒
              </label>
              <input
                type='password'
                id='newPassword'
                placeholder='New Password'
                className='p-2 rounded w-full'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex w-full items-center bg-primary-content border rounded mt-2'>
              <label htmlFor='confirmPassword' className='flex items-center text-primary-content h-10 font-semibold px-2 bg-neutral'>
                🔒
              </label>
              <input
                type='password'
                id='confirmPassword'
                placeholder='Confirm Password'
                className='p-2 rounded w-full'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={handleResetPassword} className={`btn w-full text-white my-3 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-neutral'}`} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </motion.div>
        )}

        {/* Step 4: Success Message */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="w-full text-center">
            <p className="text-green-500">Your password has been reset successfully!</p>
            <button onClick={() => navigate('/login')} className="btn w-full text-white my-3 bg-neutral">
              Go to Login
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
