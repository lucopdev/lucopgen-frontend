import React, { useContext, useState } from 'react';
import { ApiContext, ApiContextInterface } from '../../context/ApiContext';
import UserInterface from '../../interfaces/UserInterface';
import cryptoRandomString from 'crypto-random-string';

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

  const fetchUsers = async () => {
    const result = await get('users');
    const users: UserInterface[] = result.data;

    const storageUser: UserInterface = JSON.parse(localStorage.getItem('user') || '{}');
    const userFound = users.find((user) => user.email == storageUser.email);

    if (userFound) {
      setUser(userFound);
      localStorage.setItem('user', JSON.stringify(userFound));
    }
    return userFound;
  };

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

      const response = await post('accounts', newAccount);

      if (response) {
        const userFetched = await fetchUsers();
        setUser(userFetched as UserInterface);

        setAccountInputs({
          name: '',
          login: '',
          password: '',
        });
      }
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

  const onGenerateComplexPassword = () => {
    const newPassword = cryptoRandomString({
      length: 12,
      type: 'alphanumeric',
    });

    setAccountInputs({
      ...accountInputs,
      password: newPassword,
    });
  };

  return (
    <div className="min-w-[500px] w-[500px] mx-auto max-md:min-w-[250px] max-sm:w-[100%] h-[300px] bg-slate-300 rounded-3xl shadow-low flex flex-col items-center justify-center p-5 my-5 relative">
      <div className="flex flex-col items-center justify-between w-[100%] p-2 h-full">
        {/* <button className="text-[25px] text-slate-500 absolute top-5 right-5">
          <IoMdClose />
        </button> */}
        <h1 className="text-[25px] font-bold text-slate-600 text-shadow-sm">Nova conta</h1>
        <div className="flex flex-col items-start w-full">
          <input
            className="h-10 w-full p-2 border-2 shadow-inner rounded my-[1px]"
            type="text"
            placeholder="Account name"
            name="name"
            value={accountInputs.name}
            onChange={handleInputChange}
          />
          <input
            className="h-10 w-full p-2 border-2 shadow-inner rounded my-[1px]"
            type="text"
            placeholder="Login"
            name="login"
            value={accountInputs.login}
            onChange={handleInputChange}
          />
          <div className="flex w-full">
            <input
              className="h-10 w-full p-2 border-2 shadow-inner rounded my-[1px]"
              type="text"
              placeholder="Password"
              name="password"
              value={accountInputs.password}
              onChange={handleInputChange}
            />
            <button
              className="bg-sky-500 w-[150px] h-10 text-[10px] text-white rounded ml-1 px-1 leading-[15px]"
              onClick={onGenerateComplexPassword}
            >
              Gerar senha complexa
            </button>
          </div>
        </div>
        <button
          className="bg-sky-500 h-10 w-full p-2 shadow-inner rounded my-[1px] text-white"
          onClick={onCreateNewAccount}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateAccountComponent;
