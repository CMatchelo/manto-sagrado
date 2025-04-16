export interface UserType {
    useremail: string;
    userpassword: string;
    cemail?: string;
    cpassword?: string;
    username?: string;
}

export const createUser = (): UserType => ({
    useremail: '',
    userpassword: '',
})
