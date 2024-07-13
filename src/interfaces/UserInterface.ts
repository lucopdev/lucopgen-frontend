import AccountInterface from './AccountInterface';

export default interface UserInterface {
  id: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  password: string | null;
  accounts: AccountInterface[] | null;
}
