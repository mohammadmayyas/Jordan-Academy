export interface User {
    userId: number
    userName: string;
    firstNameEn: string;
    lastNameEn: string;
    Roles: [{
        roleId: number;
        roleName: string;
    }];
    email: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    userImage: string;
  }