import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative bg-white w-[390px] h-[844px] mx-auto">
      {/* Logo Container (assuming it’s the empty div at top-[65px]) */}
      <div className="absolute left-[25px] top-[65px] w-[310px] h-[187px] flex justify-center items-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>

      {/* Login Details Heading */}
      <p className="absolute left-[29px] top-[288px] text-2xl font-medium text-gray-800">
        Login Details
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(login)} className="absolute top-[336px] left-[29px] w-[330px]">
        {/* Email Input */}
        <div className="relative mb-[71px]">
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            className="w-[330px] h-[60px] border border-[#887e7e] rounded-[5px] text-base font-medium text-[#635c5c]"
            {...register('email', {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-[120px]">
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            className="w-[330px] h-[60px] border border-[#887e7e] rounded-[5px] text-base font-medium text-[#635c5c]"
            {...register('password', {
              required: true,
            })}
          />
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-[330px] h-[60px] bg-[#0b6efe] text-white text-2xl font-bold rounded-[5px] border border-[#0b6efe] hover:bg-blue-800 transition duration-200"
        >
          Login
        </Button>
      </form>

      {/* Gradient Lines (Decorative) */}
      <div className="absolute left-[6px] top-[627px] w-[132px] h-[3px] bg-gradient-to-l from-[#0b6efe] to-[#c4c4c4]"></div>
      <div className="absolute left-[252px] top-[627px] w-[132px] h-[3px] bg-gradient-to-r from-[#0b6efe] to-[#c4c4c4]"></div>

      {/* Error Message */}
      {error && (
        <p className="absolute top-[700px] left-[29px] w-[330px] text-red-600 text-center">
          {error}
        </p>
      )}

      {/* Sign Up Link (adjusted to fit design) */}
      <p className="absolute top-[660px] left-[29px] w-[330px] text-center text-base text-black/60">
        Don&apos;t have an account?{' '}
        <Link
          to="/signup"
          className="font-medium text-[#0b6efe] hover:underline transition duration-200"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
