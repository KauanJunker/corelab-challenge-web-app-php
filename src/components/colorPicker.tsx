import { useState } from "react";
import { Colors } from "../utils/colors";
import { useTask } from "../hooks/useTask";

export function ColorPicker() {
  const { fetchData } = useTask();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setIsOpen(false);

    const encodedColor = encodeURIComponent(color);
    fetchData(`color=${encodedColor}`); // Chama fetchData com o filtro da cor
  };

  return (
    <div className="relative">
      {/* Botão de seleção de cor */}
      <div
        className="h-4 w-4 rounded-full cursor-pointer border"
        style={{ backgroundColor: selectedColor || "red" }}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Menu dropdown de cores */}
      {isOpen && (
        <div className="absolute top-6 right-0 bg-white p-2 rounded-lg shadow-md flex gap-2 flex-wrap w-[280px] md:w-auto">
          <div
            className="h-6 w-6 flex items-center justify-center cursor-pointer border rounded-full text-xs bg-gray-200"
            onClick={() => {
              setSelectedColor(null);
              setIsOpen(false);
              fetchData(); // Remove o filtro e busca todas as tarefas novamente
            }}
          >
            ✕
          </div>

          {Colors.map((c, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full cursor-pointer border"
              style={{ backgroundColor: c }}
              onClick={() => handleColorSelect(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
