'use client';

import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectDeleteAccount } from '@/store/modals/modals.selectors';
import { closeModal } from '@/store/modals/modals.slice';

const DeleteAccountModal = () => {
    const isOpen = useAppSelector(selectDeleteAccount);
    const deleteAccountHandler = () => {

    }

    const dispatch = useAppDispatch();
  return isOpen && (
    <AlertDialog>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your all your data.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => dispatch(closeModal('deleteAccount'))}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAccountHandler}>Yes, I'm sure</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAccountModal;