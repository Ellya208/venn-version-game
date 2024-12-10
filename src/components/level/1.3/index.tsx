import { MultiSelect } from "@/components/multi-select";
import { useState } from "react";
import VennDiagram from "./venn";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const foodList = [
  { value: "chicken_nuggets", label: "Chicken nuggets", target: "ali" },
  { value: "fries", label: "Fries", target: "intersection" },
  { value: "soft_drink", label: "A soft drink", target: "intersection" },
  { value: "ice_cream", label: "Ice cream", target: "ali" },
  { value: "burger", label: "Burger", target: "siti" },
  { value: "apple_pie", label: "Apple pie", target: "siti" },
];

export function Level1_3({ onNextLevel }: { onNextLevel?: () => void }) {
  const [selectedFood, setSelectedFood] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const checkAnswer = () => {
    const correctAnswer = ["fries", "soft_drink"];
    const allCorrect = selectedFood.every((i) => correctAnswer.includes(i));
    setIsCorrect(selectedFood.length == correctAnswer.length && allCorrect);
    setShowResult(true);
  };

  return (
    <div>
      <div className="prose mb-3">
        <h3>
          1.3. Welcome to MekDi Intersection: Where Sets Meet and Overlap!
        </h3>
        <p className="m-0">Here's a scenario:</p>
        <p className="m-0">
          Ali and Siti go to MekDi for lunch and each orders a meal.
        </p>
      </div>

      <div className="h-[520px] w-[800px] relative border border-gray-300 bg-white">
        <div className="absolute flex flex-col items-center top-[10px]">
          <img src="/A/4.png" alt="Cashier" className="w-[180px]" />
          <span className="text-semibold">Cashier</span>
        </div>

        <div className="absolute flex flex-col items-center top-[120px] right-0">
          <img src="/A/2.png" alt="Ali" className="w-[180px]" />
          <span className="text-semibold">Ali</span>
        </div>

        <div className="absolute flex flex-col items-center top-[240px]">
          <img src="/A/1.png" alt="Siti" className="w-[180px]" />
          <span className="text-semibold">Siti</span>
        </div>

        <div className="absolute flex flex-col items-center top-[390px]">
          <img src="/A/3.png" alt="Teacher" className="w-[180px]" />
        </div>

        <p className="absolute top-[40px] left-[170px] p-4 bg-orange-300 rounded-full">
          Hello, Welcome to MekDi! Can I get your order please?
        </p>
        <p className="absolute top-[160px] right-[140px] p-4 bg-cyan-300 rounded-full">
          I'm getting chicken nuggets, fries, a soft drink, and some ice cream
        </p>
        <p className="absolute top-[280px] left-[160px] p-4 bg-pink-300 rounded-full">
          I think I'll go for a burger, fries, a soft drink, and an apple pie
        </p>
        <p className="absolute top-[420px] left-[140px] p-4 bg-gray-300 rounded-full">
          What are the same between their orders?
        </p>
      </div>

      <label>Answer</label>
      <div className="flex gap-2">
        <div className="bg-white w-[600px]">
          <MultiSelect
            options={foodList}
            onValueChange={setSelectedFood}
            defaultValue={selectedFood}
            placeholder="Select food"
            variant="inverted"
          />
        </div>
        <Button onClick={checkAnswer}>Check your answer</Button>
      </div>

      {showResult && (
        <div
          className={`my-4 flex justify-start items-center gap-2 ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 className="w-6 h-6" />
              <span>Yes, you are correct!</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-6 h-6" />
              <span>Opps, try again.</span>
            </>
          )}
        </div>
      )}

      <VennDiagram onNextLevel={onNextLevel} />
    </div>
  );
}
