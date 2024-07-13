import { useContext, useEffect, useState } from 'react';
import CreateAccountComponent from '../components/CreateAccountComponent/CreateAccountComponent';
import UserInterface from '../interfaces/UserInterface';
import { ApiContext, ApiContextInterface } from '../context/ApiContext';

function Home() {
  const { erase } = useContext<ApiContextInterface>(ApiContext as React.Context<ApiContextInterface>);
  const [user, setUser] = useState<UserInterface>(JSON.parse(localStorage.getItem('user') || '{}'));

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
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div className="pl-4">
      <div className="w-[80%]">
        Olá {user?.name}!
        <div className="bg-blue-300 flex flex-col items-center justify-center p-5">
          <h1 className="text-[25px] font-bold">Suas contas</h1>
          <ul className="flex flex-wrap">
            {user.accounts != null && user.accounts.length > 0 ? (
              user.accounts?.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between w-[200px] h-[60px] m-2 p-4 bg-slate-500 rounded"
                >
                  <p className="text-white">{account.name}</p>
                  <button
                    onClick={() => onDeleteAccount(account.id)}
                    className="bg-red-500 w-8 h-8 flex items-center justify-center rounded"
                  >
                    x
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhuma conta cadastrada</p>
            )}
          </ul>
        </div>
        <CreateAccountComponent setUser={setUser} />
      </div>
    </div>
  );
}

export default Home;
