import React, { useState } from "react";
import { foodList } from "./index";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type DraggableItem = {
  id: string;
  value: string;
  target: string;
};

export default function VennDiagram({
  onNextLevel,
}: {
  onNextLevel: () => void;
}) {
  const items: DraggableItem[] = foodList.map((a) => ({
    id: a.value,
    value: a.label,
    target: a.target,
  }));

  const [droppedItems, setDroppedItems] = useState<
    { id: string; target: string }[]
  >([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const checkAnswer = () => {
    const allCorrect = droppedItems.every((droppedItem) => {
      const item = items.find((i) => i.id === droppedItem.id);
      return droppedItem.target === item.target;
    });
    const allItemsPlaced = items.every((item) =>
      droppedItems.map((a) => a.id).includes(item.id)
    );

    setIsCorrect(allCorrect && allItemsPlaced);
    setShowResult(true);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const onDrop = (
    e: React.DragEvent<SVGElement | HTMLDivElement>,
    target: string
  ) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");

    if (id) {
      setDroppedItems((prev) =>
        prev.find((item) => item.id === id)
          ? prev.map((item) => (item.id === id ? { id, target } : item))
          : [...prev, { id, target }]
      );
    }
  };

  const onDragOver = (e: React.DragEvent<SVGElement | HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-10">
        <div className="prose">
          <p>
            Drag and place their orders into the correct set. After that, click
            on the part of intersection.
          </p>
        </div>
      </div>
      
      {/* Draggable Items */}
      <div className="mb-8 flex gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item.id)}
            className="rounded shadow-md bg-white p-3 cursor-grab"
          >
            {item.value}
          </div>
        ))}
      </div>

      <div className="relative w-[800px]">
        {/* render droppedItems for Ali */}
        <div
          className="absolute w-[160px] h-[310px] top-[150px] left-[110px] flex flex-col justify-center items-start"
          onDrop={(e) => onDrop(e, "ali")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "ali")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return <div key={id}>{item?.value}</div>;
            })}
        </div>

        {/* render droppedItems for Siti */}
        <div
          className="absolute w-[160px] h-[310px] top-[150px] right-[110px] flex flex-col justify-center items-end"
          onDrop={(e) => onDrop(e, "siti")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "siti")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return <div key={id}>{item?.value}</div>;
            })}
        </div>

        {/* render droppedItems for intersect */}
        <div
          className="absolute w-[170px] h-[280px] top-[170px] left-[315px] flex flex-col justify-center items-center"
          onDrop={(e) => onDrop(e, "intersection")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "intersection")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return <div key={id}>{item?.value}</div>;
            })}
        </div>

        {/* Venn Diagram */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          viewBox="-2 -1 4 3"
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
          }}
        >
          {/* Circle Ali */}
          <g
            fillOpacity=".6"
            onDrop={(e) => onDrop(e, "ali")}
            onDragOver={onDragOver}
          >
            <circle
              cx="-.55"
              cy=".577"
              r="1.2"
              fill="aqua"
              style={{
                mixBlendMode: "multiply",
              }}
            />
          </g>

          {/* Circle Siti */}
          <g
            fillOpacity=".6"
            onDrop={(e) => onDrop(e, "siti")}
            onDragOver={onDragOver}
          >
            <circle
              cx=".55"
              cy=".577"
              r="1.2"
              fill="pink"
              style={{
                mixBlendMode: "multiply",
              }}
            />
          </g>

          {/* Intersection */}
          <g
            fillOpacity=".8"
            onDrop={(e) => onDrop(e, "intersection")}
            onDragOver={onDragOver}
          >
            <ellipse cx="0" cy=".57" rx=".63" ry="1.05" fill="transparent" />
          </g>

          <text x="-1.7" y="-0.3" fontSize={0.15}>
            Ali
          </text>
          <text x="1.46" y="-0.3" fontSize={0.15}>
            Siti
          </text>
        </svg>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <Button onClick={checkAnswer}>Check your answer</Button>
        <Button onClick={onNextLevel} disabled={!isCorrect}>
          Next level
        </Button>
      </div>
      <div className="h-32">
        {showResult && (
          <div
            className={`my-4 flex justify-center items-center gap-2 ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? (
              <div className="flex gap-4 items-center">
                <CheckCircle2 className="w-6 h-6" />
                <div className="flex flex-col">
                  <span>Yes, that's exactly right! An intersection of sets occurs when the sets overlap, highlighting the elements that are common to both. In this case, the intersection happens when Ali and Siti ordered the same items: Ali ∩ Siti = fries and a soft drink.</span>
                </div>
              </div>
            ) : (
              <>
                <AlertCircle className="w-6 h-6" />
                <span>Opps, try again.</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
