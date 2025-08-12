'use client';

import Page from '@/components/Page';
import { logout } from '@/services/auth.service';
import { selectUserProfile } from '@/store/auth/auth.selectors';
import { setToken, setUser, setUserProfile } from '@/store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const LogoutPage = () => {
    const user = useAppSelector(selectUserProfile);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const logoutUser = async () => await logout(user.uid);
            
            logoutUser()
                .then(res => res.status === 200 ? cleanupUser() : router.push('/'))
                .catch(console.error);

            const cleanupUser = () => {
                dispatch(setUser(undefined));
                dispatch(setUserProfile(undefined));
                dispatch(setToken(null));
                router.push('/');
            }
        }
    }, [user, router, dispatch]);
  return (
    <Page id='logoutPage' title=''>
        <p className='text-xl text-black font-medium text-center my-10'>
            Logging out...
        </p>
    </Page>
  )
}

export default LogoutPage;