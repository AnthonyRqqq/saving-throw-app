import { spellSchool, spellClass, spellLevel } from "../../data/spells";
import { useState, useEffect } from "react";

export default function filters({
  filterList,
  handleReload,
  allSpells,
  setSpells,
  setDisplayedSpell,
}) {
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

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

  const handleFilterChange = (e, filterType) => {
    const filterValue = e.target.textContent;
    let filter = selectedFilters[filterType];

    if (filter?.includes(filterValue)) {
      const index = filter.indexOf(filterValue);
      filter.splice(index, 1);
      handleReload();
      return setSelectedFilters((prev) => ({ ...prev, filter }));
    } else {
      let newFilter = [];
      if (filter) newFilter = [...filter];
      newFilter.push(filterValue);
      handleReload();
      return setSelectedFilters((prev) => ({
        ...prev,
        [filterType]: newFilter,
      }));
    }
  };

  // When clicking on this filterList item, remove it from the filterList array
  const handleFilterClick = (filter) => {
    const newFilters = filterList;
    const index = newFilters.indexOf(filter);
    newFilters.splice(index, 1);
    handleReload();
    return setFilterList(newFilters);
  };

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
                      <button
                        onClick={(e) => handleFilterChange(e, selection.toLowerCase())}
                        className={
                          selectedFilters[selection]?.includes(item.toString())
                            ? "selectedSchool spellSchool"
                            : "spellSchool"
                        }
                      >
                        {item}
                      </button>
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
                  onClick={() => handleFilterClick(button)}
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
