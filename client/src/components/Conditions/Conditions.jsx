import { conditions } from "./conditions";
import "./conditions.css";

export default function Conditions() {
  return (
    <div className="accordion">
      {Object.keys(conditions).map((condition) => {
        return (
          <div className="accordion-item" key={condition}>
            <span
              className="accordion-button accordion-header"
              data-bs-toggle="collapse"
              data-bs-target={`#panel-${condition}`}
            >
              {condition}
            </span>
            <div
              id={`panel-${condition}`}
              className="accordion-collapse collapse"
            >
              <ul className="accordion-body">
                {conditions[condition].effects &&
                  conditions[condition].effects.map((effect, index) => {
                    return <li key={index}>{effect}</li>;
                  })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
