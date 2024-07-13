import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext, ApiContextInterface } from '../context/ApiContext';
import { jwtDecode } from 'jwt-decode';
import UserInterface from '../interfaces/UserInterface';

interface Payload {
  email: string;
  iat: number;
  exp: number;
}

function Login() {
  const { get, post } = useContext<ApiContextInterface>(ApiContext as React.Context<ApiContextInterface>);
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });

  const onHandleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async () => {
    try {
      const result = await post('login', loginInput);
      const token = result.data.token;
      const decodedToken: Payload = jwtDecode(token);

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', new Date(decodedToken.exp * 1000).toISOString());
      }

      if (token && result.status === 200) {
        get('users').then((data) => {
          const user = data.data.find((user: UserInterface | null) => user?.email === loginInput.email) || {};
          localStorage.setItem('user', JSON.stringify(user));

          navigate('/home');
        });
      }
    } catch (error) {
      console.error('Error on login:', error);
      throw error;
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[250px] h-[280px] flex flex-col items-center justify-between">
        <h1 className="text-sky-700 font-inter font-bold text-[50px] pb-10">LucopGen</h1>
        <input
          className="w-full h-[35px] bg-white rounded shadow-inner-md px-2"
          placeholder="email"
          type="text"
          name="email"
          value={loginInput.email}
          onChange={onHandleLoginInputChange}
        />
        <input
          className="w-full h-[35px] bg-white rounded shadow-inner-md px-2"
          placeholder="senha"
          type="password"
          name="password"
          value={loginInput.password}
          onChange={onHandleLoginInputChange}
        />
        <button
          onClick={onLogin}
          className="w-full h-[35px] text-white font-bold border bg-green-400 rounded shadow-inner"
        >
          Entrar
        </button>
        <button onClick={() => navigate('/create-account')}>Criar uma conta</button>
      </div>
    </div>
  );
}

export default Login;
