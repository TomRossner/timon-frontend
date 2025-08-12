'use client';

import { decodeJwt } from '@/lib/jwt';
import { LINKS } from '@/lib/links';
import { saveJWT } from '@/lib/localStorage';
import { setAuthError, setIsAuthenticating, setToken, setUser, setUserProfile } from '@/store/auth/auth.slice';
import { useAppDispatch } from '@/store/hooks';
import { User } from '@/types/user';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const LoggingInSplashScreen = () => {
    const params = useSearchParams();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const token = params.get('token');

        if (token) {
            dispatch(setToken(token));
            saveJWT(token);

            const user = decodeJwt(token);

            console.log(user);

            if (user) {
                dispatch(setUserProfile(user));
                dispatch(setUser({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    image: user.image,
                    online: user.online,
                    phoneNumber: user.phoneNumber,
                    uid: user.uid,
                    userName: user.userName,
                } satisfies User));
                dispatch(setIsAuthenticating(false));
                router.push(LINKS.HOME);
                return;
            }

            dispatch(setAuthError('Authentication failed'));
        }
    }, [dispatch, params, router]);

  return (
    <p className='text-xl font-medium text-center my-10'>
        Logging in...
    </p>
  )
}

export default LoggingInSplashScreen;