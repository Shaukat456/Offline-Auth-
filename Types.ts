export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
export interface Admin extends Document {
  name: string;
  email: string;
  password: string;
}
