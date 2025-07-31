export const AuthEnum = {
    fillAllFields: 'Please fill all fields',
    invalidFName: 'Please fill a valid first name',
    invalidLName: 'Please fill a valid last name', 
    sameName: 'First name and last name cannot be the same', 
    invalidEmail: 'Please enter a valid email',
    existEmail: 'Email is already registered',
    invalidPassword: 'Please enter a valid password', 
    notSamePassword: 'confirm password and password are not same',
<<<<<<< HEAD
} as const;

export type AuthEnum = typeof AuthEnum[keyof typeof AuthEnum];
=======
} as const;
>>>>>>> 843d9bc87c7605cc8231f3cb4e91c6f617535db5
