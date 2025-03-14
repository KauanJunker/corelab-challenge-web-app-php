import ExitIcon from "../assets/exit-icon.svg";
import ColorIcon from "../assets/color-icon.svg";
import PencilIcon from "../assets/pencil-icon.svg";
import { Divide, Star } from "lucide-react";
import { useState } from "react";
import { Colors } from "../utils/colors";

interface NoteCardInterface {
  title: string;
  description: string;
  favorite: boolean;
}

export const NoteCard = ({
  title,
  description,
  favorite,
}: NoteCardInterface) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingColors, setIsEditingColors] = useState(false);
  const [text, setText] = useState(description);
  console.log("auqi", isEditingColors);

  return (
    <div className="relative border border-red-500 mb-10">
      <div className="flex flex-col w-[390px] rounded-3xl drop-shadow-2xl bg-white min-h-[430px] justify-between ">
        {/* TITLE */}
        <div className="flex items-center justify-between border-b-[1px] border-[#D9D9D9] py-2 px-4">
          <input
            type="text"
            value={title}
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
          <div className="flex items-start justify-start ">
            <textarea
              disabled={!isEditing}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full focus:outline-none text-gray-600 text-sm resize-none pt-2 "
              placeholder="Criar nota..."
            ></textarea>
          </div>
          {/* EDIT */}
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <div
                className={`${isEditing && "bg-[#FFE3B3] rounded-full p-1"}`}
              >
                <img
                  src={PencilIcon}
                  alt="Icone para alterar tarefa"
                  onClick={() => setIsEditing(!isEditing)}
                />
              </div>
              <img
                src={ColorIcon}
                alt="Icone para alterar cor"
                onClick={() => setIsEditingColors(!isEditingColors)}
              />
            </div>
            <img src={ExitIcon} alt="Saida Icon" />
          </div>
        </div>
      </div>
      {isEditingColors && (
        <div className="flex gap-2 py-1 px-2 shadow-md rounded-md z-50 bg-white absolute -bottom-9 left-10 border-1 border-[#D9D9D9]">
          {Colors.map((c, i) => (
            <div
              key={i}
              className={`bg-[${c}] rounded-full  h-9 w-9 `}
              // className="bg-[#FFCAB9] rounded-full h-9 w-9"
            />
          ))}
        </div>
      )}
    </div>
  );
};
