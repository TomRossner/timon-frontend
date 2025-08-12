'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { setToken, setUser, setUserProfile } from '@/store/auth/auth.slice';
import { saveJWT } from '@/lib/localStorage';
import { decodeJwt } from '@/lib/jwt';
import { LINKS } from '@/lib/links';

export default function AuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = params.get('token');
    if (!token || token === 'undefined') {
      router.push(LINKS.SIGN_IN);
      return;
    }

    saveJWT(token);
    dispatch(setToken(token));

    const user = decodeJwt(token);
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
      }));
    }

    router.push(LINKS.HOME);
  }, [dispatch, params, router]);

  return <p className='text-center text-black font-medium text-xl my-10'>Logging you in...</p>;
}