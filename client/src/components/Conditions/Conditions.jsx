import { conditions } from "./conditions";
import { Col } from "react-bootstrap";
import "./conditions.css";

export default function Conditions() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
    <div className="accordion accordion-flush">
      {Object.keys(conditions).map((condition) => {
        return (
          <div className="accordion-item" key={condition}>
            <h2
              className="ps-0 fw-bold fs-5 accordion-button accordion-header"
              data-bs-toggle="collapse"
              data-bs-target={`#panel-${condition}`}
              style={{ color: 'black'}}
            >
              {condition}
            </h2>
            <div
              id={`panel-${condition}`}
              className="accordion-collapse collapse"
            >
              <ul className="accordion-body mb-0">
                {conditions[condition].effects &&
                  conditions[condition].effects.map((effect, index) => {
                    return <li className="py-1" key={index}>{effect}</li>;
                  })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
