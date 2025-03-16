import Logo from "../assets/logo.png";
import ExitIcon from "../assets/exit-icon.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import { Search } from "lucide-react";
import { useTask } from "../hooks/useTask";

export const Header = () => {
  const { isAuthenticated, setIsAuthenticated, userName } = useAuthContext();
  const { search, setSearch } = useTask();

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
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[530px] shadow-md p-2 text-xs rounded-[4px] border-[1px] border-black/20 placeholder:text-[#9A9A9A]"
            placeholder="Pesquisar notas"
          />
          <Search className="h-4 w-4 text-[#9E9E9E] absolute right-2 bottom-2" />
        </div>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <div className="hidden md:block px-2 py-1 border-1 border-black/20 drop-shadow-4xl rounded-lg text-center">
          <p className="text-center text-sm">{userName}</p>
        </div>
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
