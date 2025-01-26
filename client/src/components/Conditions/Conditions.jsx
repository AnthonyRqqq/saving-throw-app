import { conditions } from "./conditions";
import "./conditions.css";

export default function Conditions() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="accordion accordion-flush">
        {Object.keys(conditions).map((condition) => {
          return (
            <div className="accordion-item" key={condition}>
              <h2
                className="ps-0 fw-bold fs-5 accordion-button accordion-header collapsed"
                data-bs-toggle="collapse"
                data-bs-target={`#panel-${condition}`}
                style={{ color: "black" }}
              >
                {condition}
              </h2>
              <div
                id={`panel-${condition}`}
                className="accordion-collapse collapse"
              >
                {conditions[condition].effects && (
                  <ul className="accordion-body mb-0">
                    {conditions[condition].effects.map((effect, index) => {
                      return (
                        <li className="py-1" key={index}>
                          {effect}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {conditions[condition].table && (
                  <>
                    <div className="pb-4 mb-4">
                      {conditions[condition].header}
                    </div>
                    <table>
                      <tbody>
                        {conditions[condition].table.level.map(
                          (level, index) => {
                            return (
                              <tr>
                                <td>{level}</td>
                                <td>
                                  {conditions[condition].table.effect[index]}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>

                    <div className="pt-4 mt-4">
                      {conditions[condition].footer}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
