import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTask } from "../hooks/useTask";

export const CreatorTask = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [title, setTitle] = useState("Título");
  const [description, setDescription] = useState("");
  const { addTask } = useTask();

  const createTask = () => {
    addTask({ title, description, favorite: isFavorite });
  };

  useEffect(() => {
    setTitle("Título");
    setDescription("");
    setIsFavorite(false);
  }, [addTask]);

  return (
    <div className="bg-white rounded-4xl md:rounded-xs shadow-xl border-[1px] border-[#D9D9D9] w-full md:w-[530px] min-h-[50px] flex flex-col">
      <div className="flex justify-between items-center py-2 px-4 border-b-[1px] border-[#D9D9D9]">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full focus:outline-none text-sm"
        />
        <div className="flex gap-2 items-center">
          <Star
            width={18}
            height={18}
            onClick={() => setIsFavorite(!isFavorite)}
            fill={isFavorite ? "#FFA000" : "#fff"}
          />
          <button
            className="bg-emerald-400 hover:bg-emerald-500 transition-all delay-100 py-1 px-2 rounded-md 
          text-white text-xs cursor-pointer"
            onClick={createTask}
          >
            Adicionar
          </button>
        </div>
      </div>
      <div className="px-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full focus:outline-none text-gray-600 text-sm resize-none pt-2 "
          placeholder="Criar nota..."
        ></textarea>
      </div>
    </div>
  );
};
