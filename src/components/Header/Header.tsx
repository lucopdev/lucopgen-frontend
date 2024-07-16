import { IoMdAdd } from 'react-icons/io';
import UserInterface from '../../interfaces/UserInterface';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  user: UserInterface;
  onAddBtn: () => void;
}

function Header({ user, onAddBtn }: HeaderProps) {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <header className="flex items-center justify-between w-full h-[80px] bg-slate-700 top-0 left-0 fixed p-4 z-50">
      <h1 className="text-white font-inter font-bold text-[50px]">LucopGen</h1>
      <div className="flex items-center justify-between">
        <p className="text-white font-bold">
          Olá <span className="text-sky-500">{user?.name}</span> !
        </p>
        <button
          className="text-white font-bold bg-sky-500 ml-5 px-5 py-2 flex items-center justify-center rounded"
          onClick={onLogout}
        >
          Sair
        </button>
      </div>
      <div className="w-full h-8 absolute -bottom-4 left-0 mx-auto">
        <button
          className="w-[200px] h-8 bg-sky-500 mx-auto flex items-center justify-center rounded-xl"
          onClick={onAddBtn}
        >
          <span className="text-[30px] text-white">
            <IoMdAdd />
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
