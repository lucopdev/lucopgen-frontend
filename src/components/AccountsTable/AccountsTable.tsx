import UserInterface from '../../interfaces/UserInterface';
import { FaRegCopy } from 'react-icons/fa6';
import { BsTrash } from 'react-icons/bs';

interface AccountsTableProps {
  user: UserInterface;
  onDeleteAccount: (id: number) => void;
}

function AccountsTable({ user, onDeleteAccount }: AccountsTableProps) {
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-md:w-full max-md:min-w-[250px] max-md:m-0 max-md:my-2 flex flex-col items-center justify-center p-5">
      <ul className="flex flex-wrap w-full h-[100%] items-center justify-center">
        {user.accounts != null && user.accounts.length > 0 ? (
          user.accounts?.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between w-[100%] max-w-[250px] h-[150px] m-2 p-4 bg-slate-500 shadow-lg rounded relative"
            >
              <div className="w-full h-full flex flex-col items-start justify-between">
                <p className="flex items-center justify-center text-white font-bold font-anton text-[20px] bg-slate-400 w-[80%] h-[40px] p-1 rounded uppercase">
                  {account.name}
                </p>
                <p className="flex items-center justify-between text-white bg-slate-700 px-2 py-1 w-[100%] h-[30px] relative">
                  <span className="w-[100%] overflow-x-scroll mr-6">{account.login}</span>
                  <span
                    className="flex items-center absolute top-0 right-0 bg-slate-700 h-[30px] px-2 cursor-pointer"
                    onClick={() => onCopy(account.login)}
                  >
                    <FaRegCopy />
                  </span>
                </p>
                <p className="flex items-center justify-between text-white bg-slate-700 px-2 py-1 w-[100%] h-[30px] overflow-hidden relative">
                  {account.password}
                  <span
                    className="absolute flex items-center top-0 right-0 h-[30px] bg-slate-700 px-2 cursor-pointer"
                    onClick={() => onCopy(account.password)}
                  >
                    <FaRegCopy />
                  </span>
                </p>
              </div>
              <button
                onClick={() => onDeleteAccount(account.id)}
                className="bg-red-500 text-white font-bold w-8 h-8 flex items-center justify-center rounded absolute top-4 right-4"
              >
                <BsTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Nenhuma conta cadastrada</p>
        )}
      </ul>
    </div>
  );
}

export default AccountsTable;
