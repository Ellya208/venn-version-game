import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const parameters = {
  id: "applet1",
  width: 570,
  height: 400,
  showToolBar: false,
  showAlgebraInput: false,
  showToolBarHelp: false,
  showMenuBar: false,
  filename: "question2.ggb",
};

export function Diagram({
  level,
  expected,
  title,
}: {
  level: number;
  expected: string;
  title?: string;
}) {
  const [check, setCheck] = useState(false);
  const [correct, setCorrect] = useState(false);
  const levelName = `applet_container_${level}`;

  useEffect(() => {
    const app = new globalThis.GGBApplet(
      {
        ...parameters,
        id: levelName,
        appletOnLoad(api1) {
          api1.evalCommand(`expected = ${expected}`);
        },
      },
      true
    );
    app.inject(levelName);
  }, [expected, level, levelName]);

  function checkAnswer() {
    const isCorrect = globalThis[levelName].getValue("correct");
    setCorrect(isCorrect == 1);
    setCheck(true);
  }

  return (
    <div className="flex gap-2 items-center">
      <div id={levelName}></div>
      <div>
        <div>
          <span className="text-4xl font-semibold">{title}</span>
        </div>
        <Button onClick={checkAnswer}>Check your answer</Button>
        {check && (
          <div className={correct ? "text-green-500" : "text-red-500"}>
            {correct ? "Yes, you are correct!" : "Opps, try again."}
          </div>
        )}
      </div>
    </div>
  );
}
