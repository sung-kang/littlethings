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

export type {
  ChangePasswordFormFields,
  DeleteAccountFormFields,
  UpdateAccountFormFields,
};
