'use client';

import Page from '@/components/Page';
import SignInForm from '@/components/SignInForm';
import React from 'react';

const SignInPage = () => {
  return (
    <Page id='signInPage' title='Log in to your account' titleClassname='text-center'>
      <SignInForm />
    </Page>
  )
}

export default SignInPage;