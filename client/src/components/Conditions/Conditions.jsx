import { conditions } from "./conditions";

export default function Conditions() {
  return (
    <div>
      {Object.keys(conditions).map((condition) => {
        return (
          <div key={condition}>
            <h3>{condition}</h3>
            <ul>
              {conditions[condition].effects &&
                conditions[condition].effects.map((effect, index) => {
                  return <li key={index}>{effect}</li>;
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
