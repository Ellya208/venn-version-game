// import { Level2_0 } from "./components/level/2.0";
import { useState } from "react";
import { Level1_1 } from "./components/level/1.1";
import { Level1_2 } from "./components/level/1.2";
import { Level1_3 } from "./components/level/1.3";
import { Level1_4 } from "./components/level/1.4";
import { Level1_5 } from "./components/level/1.5";
import { Level2_0 } from "./components/level/2.0";

function App() {
  const [level, setLevel] = useState(1);
  const skipLevel = () => {
    if (level >= 6) setLevel(1);
    else setLevel((val) => val + 1);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="container py-6 relative">
        {level == 1 && <Level1_1 onNextLevel={skipLevel} />}
        {level == 2 && <Level1_2 onNextLevel={skipLevel} />}
        {level == 3 && <Level1_3 onNextLevel={skipLevel} />}
        {level == 4 && <Level1_4 onNextLevel={skipLevel} />}
        {level == 5 && <Level1_5 onNextLevel={skipLevel} />}
        {level == 6 && <Level2_0 onNextLevel={skipLevel} />}
      </div>
    </div>
  );
}

export default App;
