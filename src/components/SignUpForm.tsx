import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Gender, LoginCredentials } from '@/types/user';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Form } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { NAME_REGEXP, PASSWORD_REGEXP } from '@/lib/regexp';
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

type FormData = LoginCredentials & {
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEXP, { message: 'Invalid password' }),
  confirmPassword: z.string().regex(PASSWORD_REGEXP),
  firstName: z.string().regex(NAME_REGEXP),
  lastName: z.string().regex(NAME_REGEXP),
  phoneNumber: z.string(),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-to-say']).nullable(),
});

const defaultValues: z.infer<typeof formSchema> = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: null,
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

const SignUpForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema as ZodType<FormData>),
    defaultValues: defaultValues as FormData,
  });

  const dispatch = useAppDispatch();
  const isAuthenticating = useAppSelector(selectIsAuthenticating);

  const onSubmit = (data: FormData) => {
    // dispatch(fetchAuthToken(data));
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-2'>
        {/* <div className='grid grid-cols-2 gap-2'>
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
        </div> */}

        {/* <div className='flex items-center justify-between w-full gap-4'>
          <hr className='border border-stone-100 grow' />
          <p className='w-fit text-center font-semibold text-stone-300 py-4 my-4 text-lg'>OR</p>
          <hr className='border border-stone-100 grow' />
        </div> */}

        <div className='col-span-1 flex flex-col gap-1'>
            <Label htmlFor="First name">First name</Label>
            <Input
            {...form.register('firstName')}
            id="firstName"
            type="text"
            className={clsx('bg-white text-black', form.formState.errors.firstName && 'border-2 border-red-300 bg-red-50')}
            />
        </div>

        <div className='col-span-1 flex flex-col gap-1'>
            <Label htmlFor="lastName">Last name</Label>
            <Input
            {...form.register('lastName')}
            id="lastName"
            type="text"
            className={clsx('bg-white text-black', form.formState.errors.lastName && 'border-2 border-red-300 bg-red-50')}
            />
        </div>

        <div className='col-span-2 flex flex-col gap-1'>
            <Label htmlFor="email">Email</Label>
            <Input
                {...form.register('email')}
                id="email"
                type="email"
                className={clsx('bg-white text-black', form.formState.errors.email && 'border-2 border-red-300 bg-red-50')}
            />
        </div>

        <div className='col-span-1 flex flex-col gap-1'>
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
                {...form.register('phoneNumber')}
                id="phoneNumber"
                type="tel"
                className={clsx('bg-white text-black', form.formState.errors.phoneNumber && 'border-2 border-red-300 bg-red-50')}
            />
        </div>

        <div className='col-span-1 flex flex-col gap-1'>
            <Label htmlFor="gender">Gender</Label>
            <Input
                {...form.register('gender')}
                id="gender"
                type="text"
                className={clsx('bg-white text-black', form.formState.errors.gender && 'border-2 border-red-300 bg-red-50')}
            />
        </div>

        <div className='col-span-1 flex flex-col gap-1'>
            <Label htmlFor="password">Password</Label>
            <Input
            {...form.register('password')}
            id="password"
            type="password"
            className={clsx('bg-white text-black', form.formState.errors.password && 'border-2 border-red-300 bg-red-50')}
            />
        </div>

        <div className='col-span-1 flex flex-col gap-1'>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
            {...form.register('confirmPassword')}
            id="confirmPassword"
            type="password"
            className={clsx('bg-white text-black', form.formState.errors.confirmPassword && 'border-2 border-red-300 bg-red-50')}
            />
        </div>
    
        <Button type='button' className='col-span-2 cursor-pointer bg-transparent text-blue-400 border-0 shadow-none hover:bg-transparent hover:text-blue-300'>
            <Link href={'/signin'}>Already have an account? Log in here</Link>
        </Button>
        <Button type='submit' className='col-span-2 cursor-pointer'>Sign up</Button>

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

export default SignUpForm;