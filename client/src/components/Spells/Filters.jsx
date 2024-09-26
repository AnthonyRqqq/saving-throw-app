import { spellSchool, spellClass, spellLevel } from "../../data/spells";
import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

export default function filters({
  filterList,
  handleReload,
  allSpells,
  setSpells,
  setDisplayedSpell,
  setFilterList,
  reload,
}) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    const setNewSpells = async () => handleNewSpells();
    console.log(filterList);
    console.log(selectedFilters);
    setNewSpells();
  }, [selectedFilters]);

  useEffect(() => {
    console.log(filterList);
    console.log(selectedFilters);
    const newFilters = selectedFilters;

    if (filterList.some((filter) => filter.includes("Concentration"))) {
      if (filterList.includes("Concentration Only"))
        newFilters["concentration"] = true;
      else newFilters["concentration"] = false;
    } else if (newFilters["concentration"]) delete newFilters["concentration"];

    if (filterList.some((filter) => filter.includes("Ritual"))) {
      if (filterList.includes("Ritual Only")) {
        newFilters["ritual"] = true;
      } else newFilters["ritual"] = false;
    } else if (newFilters["ritual"]) delete newFilters["ritual"];

    Object.keys(newFilters).forEach((key) => {
      const isInFilterList = filterList.some((filter) =>
        filter.toLowerCase().includes(key.toLowerCase())
      );

      if (!isInFilterList) {
        delete newFilters[key];
      }
    });

    console.log(newFilters);
    setSelectedFilters(newFilters);
    if (Object.keys(newFilters).length > 0) handleNewSpells();
    else {
      inputRef.current.value = "";
      setSpells(allSpells);
    }
  }, [reload]);

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
          case "concentration":
            if (selectedFilters[filter] !== curr.isConcentration) pass = false;
            break;
          case "ritual":
            if (selectedFilters[filter] !== curr.isRitual) pass = false;
            break;
          case "name":
            if (selectedFilters[filter].length > 0) {
              if (
                !curr.name
                  .toLowerCase()
                  .includes(selectedFilters[filter].toLowerCase())
              )
                pass = false;
            }
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

      {/* Input text to filter names by */}
      <div className="px-3">
        <div className="filterTitle">Name</div>
        <div className="spellList">
          <Form.Control
            ref={inputRef}
            className="filterTitle"
            type="text"
            style={{ textAlign: "center", maxWidth: "20rem" }}
            onChange={(e) => {
              const { target } = e;
              const name = target.value;
              setSelectedFilters((prev) => ({ ...prev, ["name"]: name }));
            }}
          ></Form.Control>
        </div>
      </div>
    </div>
  );
}
