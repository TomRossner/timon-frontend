import { useAppDispatch } from '@/store/hooks';
import { fetchAuthToken } from '@/store/user/user.slice';
import { LoginCredentials } from '@/types/user';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';

type FormData = LoginCredentials;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      // confirmPassword: ''
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(fetchAuthToken(getValues()));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input id="email" type="text" {...register('email')} className='bg-white text-black' />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" {...register('password')} className='bg-white text-black' />
      {/* <label htmlFor="confirmPassword">Confirm password</label>
      <input id="confirmPassword" type="text" {...register('password')} className='bg-white text-black' /> */}

      <Button type='submit' className='cursor-pointer'>Login</Button>
    </form>
  )
}

export default SignInForm;