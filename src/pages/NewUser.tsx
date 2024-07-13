import CreateUserComponent from '../components/CreateUserComponent/CreateUserComponent';

function NewUser() {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <h1 className="p-10 text-sky-700 font-bold text-[30px]">Estamos quase lá!</h1>
      <CreateUserComponent />
    </div>
  );
}

export default NewUser;
