import { Dispatch, SetStateAction } from 'react';

type ChangePasswordFormFields = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type DeleteAccountFormFields = {
  password: string;
};

type UpdateAccountFormFields = {
  firstName: string;
  lastName: string;
  email: string;
};

type NavBarProfileTabProps = {
  setIsSubmittingForm: Dispatch<SetStateAction<boolean>>;
};

export type {
  ChangePasswordFormFields,
  DeleteAccountFormFields,
  UpdateAccountFormFields,
  NavBarProfileTabProps,
};
