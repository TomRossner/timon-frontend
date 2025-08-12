import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAuthToken } from '@/store/auth/auth.slice';
import { LoginCredentials } from '@/types/user';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Form } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PASSWORD_REGEXP } from '@/lib/regexp';
import GoogleLogo from '../assets/Google.svg';
import AppleLogo from '../assets/Apple.svg';
import FacebookLogo from '../assets/Facebook.svg';
import MicrosoftLogo from '../assets/Microsoft.svg';
import Image from 'next/image';
import { IoWarningOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { googleLogin } from '@/services/auth.service';
import { selectIsAuthenticating } from '@/store/auth/auth.selectors';
import Link from 'next/link';

type FormData = LoginCredentials;

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEXP, { message: 'Invalid password' }),
});

const defaultValues: z.infer<typeof formSchema> = {
  email: '',
  password: '',
}

const authProviders = [
  {
    provider: 'Google',
    icon: GoogleLogo,
  },
  {
    provider: 'Facebook',
    icon: FacebookLogo,
  },
  {
    provider: 'Microsoft',
    icon: MicrosoftLogo,
  },
  {
    provider: 'Apple',
    icon: AppleLogo,
  },
];

const SignInForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const isAuthenticating = useAppSelector(selectIsAuthenticating);

  const onSubmit = (data: FormData) => {
    dispatch(fetchAuthToken(data));
  }

  const onProviderLogin = (provider: string) => {
    switch(provider) {
      case 'Google':
        googleLogin();
        break;
      // case 'Facebook':
      //   facebookLogin();
      //   break;
      // case 'Microsoft':
      //   microsoftLogin();
      //   break;
      // case 'Apple':
      //   appleLogin();
      //   break;
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <div className='grid grid-cols-2 gap-2'>
          {authProviders.map(({ provider, icon }) => (
            <Button
              key={provider}
              type='button'
              disabled={isAuthenticating}
              onClick={() => onProviderLogin(provider)}
              className='cursor-pointer bg-slate-100 text-blue-400 w-auto p-10 hover:bg-slate-200'
            >
              <Image src={icon} alt={provider} width={25} />
              {provider}
            </Button>
          ))}
        </div>

        <div className='flex items-center justify-between w-full gap-4'>
          <hr className='border border-stone-100 grow' />
          <p className='w-fit text-center font-semibold text-stone-300 py-4 my-4 text-lg'>OR</p>
          <hr className='border border-stone-100 grow' />
        </div>

        <Label htmlFor="email">Email</Label>
        <Input
          {...form.register('email')}
          id="email"
          type="email"
          className={clsx('bg-white text-black', form.formState.errors.email && 'border-2 border-red-300 bg-red-50')}
        />
        
        <Label htmlFor="password">Password</Label>
        <Input
          {...form.register('password')}
          id="password"
          type="password"
          className={clsx('bg-white text-black', form.formState.errors.password && 'border-2 border-red-300 bg-red-50')}
        />

        <Button type='button' className='cursor-pointer bg-transparent text-blue-400 border-0 shadow-none hover:bg-transparent hover:text-blue-300'><Link href={'/signup'}>Don&apos;t have an account? Sign up here</Link></Button>
        <Button type='submit' className='cursor-pointer'>Log in</Button>

        {(!!form.formState.errors.email?.message || !!form.formState.errors.password?.message) && Object.keys(form.formState.dirtyFields).length > 0 && (
          <p className='bg-red-200 text-red-400 rounded-md font-semibold w-full p-2 text-sm flex gap-2'>
            <IoWarningOutline className='text-xl' />
            {form.formState.errors.email && form.formState.errors.password
              ? 'Invalid credentials'
              : form.formState.errors.email?.message || form.formState.errors.password?.message
            }
          </p>
        )}
      </form>
    </Form>
  )
}

export default SignInForm;