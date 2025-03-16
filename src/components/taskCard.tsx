import ExitIcon from "../assets/exit-icon.svg";
import ColorIcon from "../assets/color-icon.svg";
import PencilIcon from "../assets/pencil-icon.svg";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Colors } from "../utils/colors";
import { useTask } from "../hooks/useTask";

interface NoteCardInterface {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
  color: string;
}

export const TaskCard = ({
  id,
  title,
  description,
  favorite,
  color,
}: NoteCardInterface) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingColors, setIsEditingColors] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [text, setText] = useState(description);
  const [selectedColor, setSelectedColor] = useState<string>(color);

  const { removeTask, editTask } = useTask();

  const colorButtonRef = useRef<HTMLDivElement>(null);
  const [colorMenuPos, setColorMenuPos] = useState({ top: 0, left: 0 });

  const deleteTask = (taskId: number) => {
    removeTask(taskId);
  };

  const toggleColorMenu = () => {
    if (colorButtonRef.current) {
      const rect = colorButtonRef.current.getBoundingClientRect();
      setColorMenuPos({
        top: rect.bottom + 5,
        left: rect.left,
      });
    }
    setIsEditingColors(!isEditingColors);
  };

  const toggleEditing = () => {
    if (isEditing) {
      editTask(
        {
          title: newTitle,
          description: text,
          favorite: isFavorite,
          color: selectedColor,
        },
        id
      );
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const handleScroll = () => setIsEditingColors(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="relative flex flex-col w-full md:w-[390px] rounded-3xl drop-shadow-2xl min-h-[430px] 
      justify-between overflow-visible"
        style={{ backgroundColor: selectedColor }}
      >
        {/* TITLE */}
        <div className="flex items-center justify-between border-b-[1px] border-[#D9D9D9] py-2 px-4">
          <input
            disabled={!isEditing}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full focus:outline-none"
          />
          <Star
            width={18}
            height={18}
            onClick={() => setIsFavorite(!isFavorite)}
            fill={isFavorite ? "#FFA000" : "#fff"}
          />
        </div>

        <div className="px-4 pt-2 pb-3 h-full flex flex-col justify-between">
          {/* DESCRIPTION */}
          <div className="flex items-start justify-start">
            <textarea
              disabled={!isEditing}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full focus:outline-none text-gray-600 text-sm resize-none pt-2"
              placeholder="Criar nota..."
            ></textarea>
          </div>

          {/* EDIT */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`${isEditing && "bg-[#FFE3B3] rounded-full p-1"}`}
                onClick={toggleEditing}
              >
                <img
                  src={PencilIcon}
                  alt="Icone para alterar tarefa"
                  onClick={() => setIsEditing(!isEditing)}
                />
              </div>
              <div
                ref={colorButtonRef}
                className={`relative cursor-pointer ${
                  isEditingColors && "bg-[#FFE3B3] rounded-full p-1"
                }`}
                onClick={toggleColorMenu}
              >
                <img src={ColorIcon} alt="Icone para alterar cor" />
              </div>
            </div>
            <img
              src={ExitIcon}
              alt="Saida Icon"
              onClick={() => deleteTask(id)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* MENU DE CORES  */}
      {isEditingColors && (
        <div
          className="fixed z-50 bg-white px-2 py-1 rounded-lg border border-[#D9D9D9] shadow-xl flex flex-wrap w-[280px] md:w-auto gap-2"
          style={{
            top: `${colorMenuPos.top}px`,
            left: `${colorMenuPos.left}px`,
          }}
        >
          {Colors.map((c, i) => (
            <div
              key={i}
              className="rounded-full h-9 w-9 cursor-pointer"
              style={{ backgroundColor: c }}
              onClick={() => {
                setSelectedColor(c);
                setIsEditingColors(false);
                editTask(
                  {
                    title: newTitle,
                    description: text,
                    favorite: isFavorite,
                    color: c,
                  },
                  id
                );
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};
