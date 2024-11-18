import Part2pageonein1 from "./Part2pageone1-1";
import Part2pageone1iner1 from "./Part2pageone1-iner1";
import FAQcomponent from "./FAQcomponent-section";

import "./Part2-pageone-1.css";
const Part2pageone1 = () => {
  return (
    <div>
      <div className="outer-1">
        <Part2pageonein1 />
        <Part2pageone1iner1 />
      </div>
      <FAQcomponent />
    </div>
  );
};

export default Part2pageone1;
