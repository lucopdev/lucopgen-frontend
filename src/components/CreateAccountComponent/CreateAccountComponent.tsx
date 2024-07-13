import React, { useContext, useState } from 'react';
import { ApiContext, ApiContextInterface } from '../../context/ApiContext';
import UserInterface from '../../interfaces/UserInterface';

interface CreateAccountComponentProps {
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

function CreateAccountComponent({ setUser }: CreateAccountComponentProps) {
  const { get, post } = useContext<ApiContextInterface>(ApiContext as React.Context<ApiContextInterface>);
  const [accountInputs, setAccountInputs] = useState({
    name: '',
    login: '',
    password: '',
  });

  const onCreateNewAccount = async () => {
    const user: UserInterface = await get('users').then((data) =>
      data.data.find((user: UserInterface) => user.email === JSON.parse(localStorage.getItem('user') || '{}').email)
    );

    if (user) {
      const newAccount = {
        name: accountInputs.name,
        login: accountInputs.login,
        password: accountInputs.password,
        ownerId: user.id,
      };

      post('accounts', newAccount);

      const updateUser = {
        ...user,
        accounts: [...(user.accounts || []), newAccount],
      };

      localStorage.setItem('user', JSON.stringify(updateUser));
      setUser(updateUser as UserInterface);
    } else {
      console.error('User not found');
    }

    setAccountInputs({
      name: '',
      login: '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInputs({
      ...accountInputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-[300px] mx-auto max-md:w-full max-md:min-w-[250px] max-md:m-0 max-md:my-2 min-w-[600px] h-[300px] bg-blue-300 flex flex-col items-center justify-center p-5 my-5">
      <div className="flex flex-col items-center justify-between w-[80%] h-full">
        <h1 className="text-[25px] font-bold text-white text-shadow-sm">Add nova conta</h1>
        <div className="flex flex-col items-center w-[100%]">
          <input
            className="h-10 w-[100%] max-w-[400px] p-2 border-2 shadow-inner rounded my-[1px]"
            type="text"
            placeholder="Account name"
            name="name"
            value={accountInputs.name}
            onChange={handleInputChange}
          />
          <input
            className="h-10 w-[100%] max-w-[400px] p-2 border-2 shadow-inner rounded my-[1px]"
            type="text"
            placeholder="Login"
            name="login"
            value={accountInputs.login}
            onChange={handleInputChange}
          />
          <input
            className="h-10 w-[100%] max-w-[400px] p-2 border-2 shadow-inner rounded my-[1px]"
            type="text"
            placeholder="Password"
            name="password"
            value={accountInputs.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-blue-500 h-10 w-[100%] max-w-[400px] p-2 shadow-inner rounded my-[1px]"
          onClick={onCreateNewAccount}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateAccountComponent;
