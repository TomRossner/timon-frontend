'use client';

import { selectUserProfile } from '@/store/auth/auth.selectors';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

function isAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const IsAuth: React.FC<P> = (props) => {
    const user = useAppSelector(selectUserProfile);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/signin');
      }
    }, [router, user]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  return IsAuth;
}

export default isAuth;