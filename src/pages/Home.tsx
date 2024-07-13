import { useContext, useEffect, useState } from 'react';
import CreateAccountComponent from '../components/CreateAccountComponent/CreateAccountComponent';
import UserInterface from '../interfaces/UserInterface';
import { ApiContext, ApiContextInterface } from '../context/ApiContext';
import AccountsTable from '../components/AccountsTable/AccountsTable';
import Header from '../components/Header/Header';

function Home() {
  const { erase } = useContext<ApiContextInterface>(ApiContext as React.Context<ApiContextInterface>);
  const [user, setUser] = useState<UserInterface>(JSON.parse(localStorage.getItem('user') || '{}'));
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);

  const onDeleteAccount = (id: number) => {
    if (user.id) {
      const updateUser = {
        ...user,
        accounts: user.accounts?.filter((account) => account.id !== id),
      };

      setUser(updateUser as UserInterface);
      erase('accounts', user.id.toString(), id.toString());
    }
  };

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storageUser);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const onAddBtn = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
  };

  return (
    <div className="p-4">
      <Header user={user} onAddBtn={onAddBtn} />
      <div className="flex flex-col mt-[80px]">
        {isAddMenuOpen && <CreateAccountComponent setUser={setUser} />}
        <AccountsTable user={user} onDeleteAccount={onDeleteAccount} />
      </div>
    </div>
  );
}

export default Home;
