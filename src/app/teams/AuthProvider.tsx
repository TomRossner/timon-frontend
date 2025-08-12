'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser, setToken, setUserProfile, setIsAuthenticating } from '@/store/auth/auth.slice';
import { decodeJwt } from '@/lib/jwt';
import { getJWT } from '@/lib/localStorage';
import { useRouter } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = getJWT();

    if (!!token) {
      dispatch(setIsAuthenticating(true));
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
      dispatch(setIsAuthenticating(false));
    }
  }, [dispatch, router]);

  return <>{children}</>;
}