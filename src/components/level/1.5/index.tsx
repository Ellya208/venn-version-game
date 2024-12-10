import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Question1 } from "./question1";
import { Question2 } from "./question2";
import { Question3 } from "./question3";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type DraggableItem = {
  id: string;
  value: string;
  image?: string;
  target: string;
};

const items: DraggableItem[] = [
  { id: "1.1", value: "Lolipop", image: "/B/lolipop.jpg", target: "L" },
  { id: "1.2", value: "Lolipop", image: "/B/lolipop.jpg", target: "L" },
  { id: "1.3", value: "Lolipop", image: "/B/lolipop.jpg", target: "L" },
  { id: "1.4", value: "Lolipop", image: "/B/lolipop.jpg", target: "L" },
  { id: "1.5", value: "Lolipop", image: "/B/lolipop.jpg", target: "L" },
  { id: "2.1", value: "Gummy", image: "/B/gummy.jpg", target: "G" },
  { id: "2.2", value: "Gummy", image: "/B/gummy.jpg", target: "G" },
  { id: "2.3", value: "Gummy", image: "/B/gummy.jpg", target: "G" },
  { id: "2.4", value: "Gummy", image: "/B/gummy.jpg", target: "G" },
  { id: "3.1", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "3.2", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "3.3", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "3.4", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "3.5", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "3.6", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "3.7", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "3.8", value: "Candy", image: "/B/candy.jpg", target: "C" },
  { id: "4.1", value: "Chocolate", image: "/B/chocolate.jpg", target: "T" },
  { id: "4.2", value: "Chocolate", image: "/B/chocolate.jpg", target: "T" },
  { id: "4.3", value: "Chocolate", image: "/B/chocolate.jpg", target: "T" },
];

export function Level1_5({ onNextLevel }: { onNextLevel?: () => void }) {
  const [droppedItems, setDroppedItems] = useState<
    { id: string; target: string }[]
  >([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

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

  const onRemoveDroppedItem = (id: string) => {
    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
  };

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

  return (
    <div>
      <div className="prose mb-3">
        <h3>1.5. A Sweet Union: Exploring Candy Sets!</h3>
        <p>
          Today, we are going shopping with Sarah. Sarah loves sweets, but she
          needs your help to decide what to buy. Let's solve her sweet problems
          with some math magic-union sets!
        </p>
      </div>

      <div>
        <div className="relative">
          <img src="/B/cupboard.jpg" alt="" />

          <div className="top-[33px] left-[229px] absolute flex gap-2">
            {items
              .filter((a) => a.target == "L")
              .map((item) => {
                const isDropped = droppedItems.some(
                  (dropped) => dropped.id === item.id
                );
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                    className="rounded shadow-md bg-white cursor-grab"
                    style={{ opacity: isDropped ? 0.5 : 1 }}
                  >
                    <img
                      src={item.image}
                      alt={item.value}
                      className="object-fill w-[35px]"
                    />
                  </div>
                );
              })}
          </div>

          <div className="top-[123px] left-[249px] absolute flex gap-2">
            {items
              .filter((a) => a.target == "G")
              .map((item) => {
                const isDropped = droppedItems.some(
                  (dropped) => dropped.id === item.id
                );
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                    className="rounded shadow-md bg-white cursor-grab"
                    style={{ opacity: isDropped ? 0.5 : 1 }}
                  >
                    <img
                      src={item.image}
                      alt={item.value}
                      className="object-fill w-[35px]"
                    />
                  </div>
                );
              })}
          </div>

          <div className="top-[225px] left-[233px] absolute flex flex-wrap w-[200px] gap-1 justify-center">
            {items
              .filter((a) => a.target == "C")
              .map((item) => {
                const isDropped = droppedItems.some(
                  (dropped) => dropped.id === item.id
                );
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                    className="rounded shadow-md bg-white cursor-grab"
                    style={{ opacity: isDropped ? 0.5 : 1 }}
                  >
                    <img
                      src={item.image}
                      alt={item.value}
                      className="object-fill h-[30px]"
                    />
                  </div>
                );
              })}
          </div>

          <div className="top-[293px] left-[269px] absolute flex gap-2">
            {items
              .filter((a) => a.target == "T")
              .map((item) => {
                const isDropped = droppedItems.some(
                  (dropped) => dropped.id === item.id
                );
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.id)}
                    className="rounded shadow-md bg-white cursor-grab"
                    style={{ opacity: isDropped ? 0.5 : 1 }}
                  >
                    <img
                      src={item.image}
                      alt={item.value}
                      className="object-fill w-[35px]"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="prose mb-3">
        <p className="my-0">
          Grab the sweets from the cupboard and put into the correct sets.
        </p>
        <p className="my-0">
          Set L : Lollipop
          <img
            src="/B/lolipop.jpg"
            className="w-[36px] h-[36px] inline-flex my-0 object-contain mix-blend-multiply"
            alt=""
          />
        </p>
        <p className="my-0">
          Set G : Gummy
          <img
            src="/B/gummy.jpg"
            className="w-[36px] h-[36px] inline-flex my-0 object-contain mix-blend-multiply"
            alt=""
          />
        </p>
        <p className="my-0">
          Set C : Candy
          <img
            src="/B/candy.jpg"
            className="w-[36px] h-[36px] inline-flex my-0 object-contain mix-blend-multiply"
            alt=""
          />
        </p>
        <p className="my-0">
          Set T : Chocolate
          <img
            src="/B/chocolate.jpg"
            className="w-[36px] h-[36px] inline-flex my-0 object-contain mix-blend-multiply"
            alt=""
          />
        </p>
      </div>

      <div className="relative">
        {/* render droppedItems for L */}
        <div
          className="absolute top-[60px] left-[60px] w-[150px] h-[150px] flex flex-wrap gap-2 flex-col justify-center items-center"
          onDrop={(e) => onDrop(e, "L")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "L")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-[32px] h-[32px] object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        {/* render droppedItems for G */}
        <div
          className="absolute top-[60px] left-[300px] w-[150px] h-[150px] flex flex-wrap gap-2 flex-col justify-center items-center"
          onDrop={(e) => onDrop(e, "G")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "G")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-[32px] h-[32px] object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        {/* render droppedItems for C */}
        <div
          className="absolute top-[60px] left-[546px] w-[150px] h-[150px] flex flex-wrap gap-2 flex-col justify-center items-center"
          onDrop={(e) => onDrop(e, "C")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "C")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-[32px] h-[32px] object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        {/* render droppedItems for T */}
        <div
          className="absolute top-[60px] left-[787px] w-[150px] h-[150px] flex flex-wrap gap-2 flex-col justify-center items-center"
          onDrop={(e) => onDrop(e, "T")}
          onDragOver={onDragOver}
        >
          {droppedItems
            .filter((a) => a.target === "T")
            .map(({ id }) => {
              const item = items.find((item) => item.id === id);
              return (
                <div key={id} className="rounded shadow-md bg-white">
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-[32px] h-[32px] object-contain cursor-pointer"
                    onClick={() => onRemoveDroppedItem(item.id)}
                  />
                </div>
              );
            })}
        </div>

        <h1 className="absolute left-[5px] text-lg">ξ</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000"
          viewBox="-3 -2 18.5 5"
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
          }}
        >
          <g
            fillOpacity="1"
            onDrop={(e) => onDrop(e, "L")}
            onDragOver={onDragOver}
          >
            <circle cx="-.5" cy=".5" r="2" fill="#ffbda3" />
          </g>
          <g
            fillOpacity="1"
            onDrop={(e) => onDrop(e, "G")}
            onDragOver={onDragOver}
          >
            <circle cx="4" cy=".5" r="2" fill="pink" />
          </g>
          <g
            fillOpacity="1"
            onDrop={(e) => onDrop(e, "C")}
            onDragOver={onDragOver}
          >
            <circle cx="8.5" cy=".5" r="2" fill="lightsteelblue" />
          </g>
          <g
            fillOpacity="1"
            onDrop={(e) => onDrop(e, "T")}
            onDragOver={onDragOver}
          >
            <circle cx="13" cy=".5" r="2" fill="lightskyblue" />
          </g>

          <text x="-2" y="-1" fontSize={0.25}>
            L
          </text>

          <text x="2.5" y="-1" fontSize={0.25}>
            G
          </text>

          <text x="7" y="-1" fontSize={0.25}>
            C
          </text>

          <text x="11.5" y="-1" fontSize={0.25}>
            T
          </text>
        </svg>
      </div>

      <Button onClick={checkAnswer}>Check your answer</Button>

      <div className="">
        {showResult && (
          <div
            className={`my-4 flex items-center gap-2 ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? (
              <div className="flex gap-4 items-center">
                <CheckCircle2 className="w-6 h-6" />
                <div className="flex flex-col">
                  <span>Yes, you are correct!</span>
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

      <Question1 />
      <Question2 />
      <Question3 />

      <div className="flex justify-center items-center gap-2 mt-3">
        <Button onClick={onNextLevel}>
          Next level
        </Button>
      </div>

      <div className="h-32"></div>

    </div>
  );
}
