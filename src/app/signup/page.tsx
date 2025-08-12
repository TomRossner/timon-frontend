'use client';

import Page from '@/components/Page';
import SignUpForm from '@/components/SignUpForm';
import React from 'react';

const SignUpPage = () => {
  return (
    <Page id='signupPage' title='Create an account'>
        <SignUpForm />
    </Page>
  )
}

export default SignUpPage;