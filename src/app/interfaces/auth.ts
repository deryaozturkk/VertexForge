export interface UserKurumsal {
  id?: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  department: string;
  sifre: string;
  confirmPassword?: string;
}

export interface User {
    id?:string;
    name:string;
    surname:string;
    email:string;
    phoneNumber:string;
    occupation:string;
    sifre:string;
    confirmPassword?: string;

}

export interface List {
  id?: number;
  boardId: number;
  title: string;
}
