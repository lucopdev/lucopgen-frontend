import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext, ApiContextInterface } from '../../context/ApiContext';

function CreateUserComponent() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/;
  const { post } = useContext<ApiContextInterface>(ApiContext as React.Context<ApiContextInterface>);
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (name === 'name') {
      const noNumber = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value);
      if (noNumber) {
        setUserInputs({
          ...userInputs,
          [name]: value,
        });
      }
    } else if (name === 'phone') {
      const cleaned = ('' + value).replace(/\D/g, '');
      const formattedPhone = cleaned.replace(/^(\d{2})(\d{0,5})(\d{0,4})$/, '($1) $2-$3').trim();

      if (cleaned.length <= 11)
        setUserInputs({
          ...userInputs,
          [name]: formattedPhone,
        });
    } else if (name === 'email') {
      if (emailRegex) {
        setUserInputs({
          ...userInputs,
          [name]: value,
        });
      }
    } else {
      setUserInputs({
        ...userInputs,
        [name]: value,
      });
    }
  };

  const areInputsValidated = () => {
    const validations = [
      userInputs.name.length >= 3,
      userInputs.email.length > 0,
      emailRegex.test(userInputs.email),
      userInputs.phone.length > 0,
      userInputs.phone.length === 15,
      userInputs.password.length > 0,
      userInputs.confirmPassword.length > 0,
      userInputs.password === userInputs.confirmPassword,
    ];

    return validations.every((validation) => validation === true);
  };

  const onSubmitCreation = async () => {
    const isValidated = areInputsValidated();

    if (!isValidated) {
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
        <input
          className="w-full h-[45px] bg-white rounded shadow-inner-md px-2 m-1"
          type="password"
          placeholder="Confirme sua senha"
          name="confirmPassword"
          value={userInputs.confirmPassword}
          onChange={handleNewUserInputChange}
        />
        <button
          className="w-full h-[35px] text-white font-bold border bg-green-400 rounded shadow-inner m-1"
          onClick={onSubmitCreation}
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
