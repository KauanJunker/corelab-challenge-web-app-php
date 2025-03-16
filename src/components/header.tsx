import Logo from "../assets/logo.png";
import ExitIcon from "../assets/exit-icon.svg";
import { useAuthContext } from "../hooks/useAuthContext";

export const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const LogOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <header className="bg-white flex justify-between px-7 py-2 items-center shadow-md">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5 ">
          <img src={Logo} alt="Logo" />
          <h1>CoreNotes</h1>
        </div>
        <div>
          <input
            type="text"
            className="w-[530px] shadow-md p-2 text-xs rounded-[4px] border-[1px] border-black/20 placeholder:text-[#9A9A9A]"
            placeholder="Pesquisar notas"
          />
        </div>
      </div>

      <div>
        <img
          src={ExitIcon}
          alt="Saida Icon"
          className="cursor-pointer"
          onClick={LogOut}
        />
      </div>
    </header>
  );
};
