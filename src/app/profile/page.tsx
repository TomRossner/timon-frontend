'use client';

import Page from '@/components/Page';
import { selectUserProfile } from '@/store/auth/auth.selectors';
import { useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import React from 'react';

const width = 150;
const height = 150;

const ProfilePage = () => {
    const userProfile = useAppSelector(selectUserProfile);
    const fullName = `${userProfile?.firstName} ${userProfile?.lastName}`;
  return (
    <Page id='profilePage' title='My Profile'>
        {userProfile?.image
            ? <Image
                src={userProfile.image}
                alt=''
                width={width}
                height={height}
                className='w-10 h-10 rounded-full border-gray-400 border-2 bg-white'
            />
            : <div
                style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}
                className='rounded-full border-gray-400 border-2 bg-white'
            />
        }
        <h2>{fullName} <span className='text-gray-500 italic'>{userProfile?.userName}</span></h2>
    </Page>
  )
}

export default ProfilePage;