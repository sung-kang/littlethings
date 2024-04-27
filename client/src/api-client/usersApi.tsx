import {
  ChangePasswordFormFields,
  DeleteAccountFormFields,
  UpdateAccountFormFields,
} from '@/types/AccountFormFieldTypes';

const changePassword = async (
  changePasswordFormData: ChangePasswordFormFields
) => {
  try {
    const response = await fetch('/api/v1/users/change-password', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changePasswordFormData),
    });

    if (response.status === 500) {
      return {
        errors: [
          {
            message:
              'Something went wrong on our side. Please try again later.',
          },
        ],
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteAccount = async (
  deleteAccountFormData: DeleteAccountFormFields
) => {
  try {
    const response = await fetch('/api/v1/users/delete-user', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteAccountFormData),
    });

    if (response.status === 500) {
      return {
        errors: [
          {
            message:
              'Something went wrong on our side. Please try again later.',
          },
        ],
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const updateAccount = async (
  updateAccountFormData: UpdateAccountFormFields
) => {
  try {
    const response = await fetch('/api/v1/users/update-user', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateAccountFormData),
    });

    if (response.status === 500) {
      return {
        errors: [
          {
            message:
              'Something went wrong on our side. Please try again later.',
          },
        ],
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { changePassword, deleteAccount, updateAccount };
