export interface SignupResponse {
    token: string;
}
  
export interface LoginResponse {
    token: string;
}

export interface Address {
    country: string;
    state: string;
    street: string;
    streetNumber: string;
}

export interface User {
    _id: string;
    userID: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: Address;
    profilePicture?: string;
    role: 'guest' | 'user' | 'admin';
    status?: string;
}

export interface Car {
    carID: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    kilometers: number;
    fuel: string;
    consumption: number;
    description?: string;
    image?: string;
    user?: string;
    createdAt?: Date;
}