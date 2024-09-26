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
    console.log(allSpells);
    console.log(selectedFilters);
    const setNewSpells = async () => handleNewSpells();
    setNewSpells();
  }, [selectedFilters]);

  useEffect(() => {
    console.log(filterList);
  }, [filterList]);

  const handleNewSpells = async () => {
    if (
      Object.keys(selectedFilters).every(
        (filter) => selectedFilters[filter].length === 0
      )
    )
      return setSpells(allSpells);

    const spellList = allSpells.reduce((acc, curr) => {
      let pass = true;
      Object.keys(selectedFilters).forEach((filter) => {
        console.log(filter);
        switch (filter) {
          case "class":
            if (
              !curr.classList.some((item) =>
                selectedFilters[filter].includes(item)
              ) &&
              selectedFilters[filter].length > 0
            )
              pass = false;
            break;
          case "level":
            if (
              !selectedFilters[filter].includes(curr.level.toString()) &&
              selectedFilters[filter].length > 0
            )
              pass = false;
            break;
          case "school":
            if (
              !selectedFilters[filter].includes(curr.school) &&
              selectedFilters[filter].length > 0
            )
              pass = false;
            break;
          default:
            break;
        }
      });
      if (pass) {
        acc.push(curr);
      }
      return acc;
    }, []);
    console.log(spellList);
    setDisplayedSpell(null);

    if (spellList.length === 0) setSpells(null);
    else setSpells(spellList);
  };

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

  const handleFilterChange = (filterValue, filterType) => {
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
                        onClick={(e) =>
                          handleFilterChange(
                            e.target.textContent,
                            selection.toLowerCase()
                          )
                        }
                        className={
                          selectedFilters[selection.toLowerCase()]?.includes(
                            item.toString()
                          )
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
