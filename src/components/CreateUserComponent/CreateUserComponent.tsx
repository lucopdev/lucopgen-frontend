import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext, ApiContextInterface } from '../../context/ApiContext';

function CreateUserComponent() {
  const { post } = useContext<ApiContextInterface>(ApiContext as React.Context<ApiContextInterface>);
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({
      ...userInputs,
      [e.target.name]: e.target.value,
    });
  };

  const onCreateUser = async () => {
    if (!userInputs.name || !userInputs.email || !userInputs.phone || !userInputs.password) {
      console.log('Preencha todos os campos');
      return;
    }

    try {
      const result = await post('users', userInputs);
      console.log(result.status);
      if (result.data) {
        localStorage.setItem('user', JSON.stringify(result.data));
        navigate('/home');
      }
    } catch (error) {
      console.error('Error on create user:', error);
      throw error;
    }
  };

  const onBack = () => {
    navigate('/');
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[30%] min-w-[250px] max-w-[500px] flex flex-col">
        <input
          className="w-full h-[45px] bg-white rounded shadow-inner-md px-2 m-1"
          type="text"
          placeholder="Digite seu nome"
          name="name"
          value={userInputs.name}
          onChange={handleNewUserInputChange}
        />
        <input
          className="w-full h-[45px] bg-white rounded shadow-inner-md px-2 m-1"
          type="email"
          placeholder="Email"
          name="email"
          value={userInputs.email}
          onChange={handleNewUserInputChange}
        />
        <input
          className="w-full h-[45px] bg-white rounded shadow-inner-md px-2 m-1"
          type="tel"
          placeholder="Telefone"
          name="phone"
          value={userInputs.phone}
          onChange={handleNewUserInputChange}
        />
        <input
          className="w-full h-[45px] bg-white rounded shadow-inner-md px-2 m-1"
          type="password"
          placeholder="Senha"
          name="password"
          value={userInputs.password}
          onChange={handleNewUserInputChange}
        />
        <button
          className="w-full h-[35px] text-white font-bold border bg-green-400 rounded shadow-inner m-1"
          onClick={onCreateUser}
        >
          Criar
        </button>
        <button
          className="w-full h-[35px] text-white font-bold border bg-sky-700 rounded shadow-inner m-1"
          onClick={onBack}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default CreateUserComponent;
