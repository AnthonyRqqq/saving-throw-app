import { spellSchool, spellClass, spellLevel } from "../../data/spells";
import { useState } from "react";

export default function filters({
  filterList,
  handleReload,
  allSpells,
  setSpells,
  setDisplayedSpell,
}) {
  const [selectedFilters, setSelectedFilters] = useState({});

  const filterButtons = [
    "Concentration Only",
    "No Concentration",
    "Ritual Only",
    "No Ritual",
  ];
  const filterSelections = ["School", "Level", "Class"];
  const data = {
    School: spellSchool,
    Class: spellClass,
    Level: spellLevel,
  };

  const handleFilterChange = () => {};
  const handleFilterClick = () => {};

  return (
    <div className="pt-3">
      {/* If any of the filterSelections items are included in the filterList, generate their options */}
      {filterSelections.map((selection, index) => {
        if (filterList.includes(selection)) {
          return (
            <div className="px-3" key={index}>
              <div className="filterTitle">{selection}</div>
              <ul className="spellList">
                {data[selection].map((item, itemIndex) => {
                  return (
                    <li key={itemIndex}>
                      <button className="spellSchool">{item}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
      })}

      <div style={{ display: "flex", justifyContent: "center" }}>
        {filterButtons.map((button, index) => {
          if (filterList.includes(button)) {
            return (
              <div className="px-3 pb-3" key={index}>
                <button
                  className="selectedSchool"
                  style={{ textWrap: "nowrap" }}
                >
                  {button}
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
