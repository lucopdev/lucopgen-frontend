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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInputs({
      ...accountInputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Create new accounts</h1>
      <input
        type="text"
        placeholder="Account name"
        name="name"
        value={accountInputs.name}
        onChange={handleInputChange}
      />
      <input type="text" placeholder="Login" name="login" value={accountInputs.login} onChange={handleInputChange} />
      <input
        type="text"
        placeholder="Password"
        name="password"
        value={accountInputs.password}
        onChange={handleInputChange}
      />
      <button onClick={onCreateNewAccount}>Submit</button>
    </div>
  );
}

export default CreateAccountComponent;
