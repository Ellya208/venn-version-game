import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const insidePositions = [
  { x: 112, y: 45 },
  { x: 85, y: 249 },
  { x: 209, y: 332 },
  { x: 217, y: 35 },
  { x: 280, y: 62 },
  { x: 180, y: 203 },
  { x: 151, y: 276 },
  { x: 75, y: 158 },
  { x: 253, y: 272 },
  { x: 249, y: 141 },
];

const outsidePositions = [
  { x: 197, y: 17 },
  { x: 7, y: 148 },
  { x: 307, y: 79 },
  { x: 323, y: 191 },
  { x: 158, y: 168 },
  { x: 29, y: 272 },
  { x: 160, y: 422 },
  { x: 334, y: 290 },
  { x: 117, y: 311 },
  { x: 67, y: 52 },
];

export function Level1_4({ onNextLevel }: { onNextLevel?: () => void }) {
  const inputsOutside = outsidePositions
  const inputsInside = insidePositions

  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const checkAnswer = () => {
    const outsideInputs = document.querySelectorAll<HTMLInputElement>(
      "input[data-type='outside']"
    );
    const insideInputs = document.querySelectorAll<HTMLInputElement>(
      "input[data-type='inside']"
    );

    let isCorrect = true;

    // Check inputs outside (even numbers)
    outsideInputs.forEach((input) => {
      const value = parseInt(input.value);
      if (isNaN(value) || value % 2 !== 0 || value < 1 || value > 20) {
        isCorrect = false;
      }
    });

    // Check inputs inside (odd numbers)
    insideInputs.forEach((input) => {
      const value = parseInt(input.value);
      if (isNaN(value) || value % 2 === 0 || value < 1 || value > 20) {
        isCorrect = false;
      }
    });

    setIsCorrect(isCorrect);
    setShowResult(true);
  };

  return (
    <div>
      <div className="prose mb-3">
        <h3>1.4. What's Not in the Set? Complements in Action!</h3>
        <p className="m-0">
          You are given a sample space {"S = {1,2,3,...,20}"}
        </p>
        <p className="m-0">Set A contains all the odd numbers in S.</p>
        <p className="m-0">
          Your goal is to find the complement of set A, which is set A'
        </p>
        <p>
          Complete the Venn diagram below by filling in the blanks with the
          correct numbers into the correct sets.
        </p>
      </div>

      <h1 className="absolute left-[5px] text-2xl">ξ</h1>
      <div className="pt-[10px] pl-[26px]">
        <div className="relative w-[1000px] h-[600px] border-2 border-violet-500 bg-white">
          <div className="w-[400px] h-[400px] top-[20px] left-[20px] relative">
            {inputsOutside.map((pos, index) => (
              <div
                className="absolute flex items-center gap-2"
                style={{
                  top: `${pos.y}px`,
                  left: `${pos.x}px`,
                }}
              >
                <span className="font-bold text-xl">•</span>
                <Input
                  key={`outside-${index}`}
                  type="text"
                  className="border-2 border-violet-500 w-[40px] h-[40px] p-2"
                  data-type="outside"
                />
              </div>
            ))}
          </div>

          <div className="absolute w-[400px] h-[400px] rounded-full border-2 border-violet-500 right-[100px] top-[100px]">
            <h1 className="absolute text-2xl top-[30px] left-[30px]">A</h1>
            <div className="relative w-full h-full">
              {inputsInside.map((pos, index) => (
                <div
                  className="absolute flex items-center gap-2"
                  style={{
                    top: `${pos.y}px`,
                    left: `${pos.x}px`,
                  }}
                >
                  <span className="font-bold text-xl">•</span>
                  <Input
                    key={`inside-${index}`}
                    type="text"
                    className="border-2 border-violet-500 w-[40px] h-[40px] p-2"
                    data-type="inside"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-3">
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
                  <p>Congratulations! You did it!</p>
                  <p>
                    The complement of Set A includes all the numbers from the
                    sample space that are not in Set A. By completing the Venn
                    diagram, you've shown how complements work:
                  </p>
                  <ul>
                    <li>Set A contains the odd numbers.</li>
                    <li>
                      The complement of Set A, A' contains the even numbers.
                    </li>
                  </ul>
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
