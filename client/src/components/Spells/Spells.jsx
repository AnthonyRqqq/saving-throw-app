import SpellSearch from "../../utils/spellSearch";
import { useEffect, useState } from "react";
import { GET_ALL_SPELLS, GET_FILTERED_SPELLS } from "../../utils/queries";
import React from "react";
import "./Spells.css";

export default function Spells() {
  const [spells, setSpells] = useState(null);
  const [displaySpellList, setDisplaySpellList] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [reload, setReload] = React.useState(0);

  const { loading: allSpellsLoading, data: allSpellsData } =
    useQuery(GET_ALL_SPELLS);

  useEffect(() => {
    if (!allSpellsLoading && allSpellsData) {
      const spells = allSpellsData.name;
      setSpells(spells);
    }

    getAllSpells();
  }, [allSpellsLoading, allSpellsData]);

  useEffect(() => {
    if (spells?.results.length > 0) {
      setDisplaySpellList(true);
    } else {
      setDisplaySpellList(false);
    }
  }, [spells]);

  useEffect(() => {
    getFilteredSpells();
  });

  const forceReload = () => {
    setReload(reload + 1);
  };

  const getFilteredSpells = async () => {
    const filteredSpells = await SpellSearch.getFilteredSpells(
      { levels: selectedLevels },
      { schools: selectedSchools }
    );
    console.log(filteredSpells);
  };

  const spellLevels = ["0 (Cantrip)", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const spellSchools = [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
  ];

  const handleFilterSelect = async (e, input) => {
    const handleInput = (filter, input) => {
      if (input === "level") {
        setSelectedLevels(filter);
      } else {
        setSelectedSchools(filter);
      }
    };

    const filter = e.target.textContent;
    let currentlySelected = "";
    if (input === "level") {
      currentlySelected = selectedLevels;
    } else {
      currentlySelected = selectedSchools;
    }

    if (currentlySelected.includes(filter)) {
      const index = currentlySelected.indexOf(filter);
      if (index !== -1) {
        currentlySelected.splice(index, 1);
      }

      handleInput(currentlySelected, input);
    } else {
      currentlySelected.push(filter);
      handleInput(currentlySelected, input);
    }

    forceReload();
    console.log("Schools: ", selectedSchools);
    console.log("Levels: ", selectedLevels);
  };

  return (
    <div>
      <div className="pt-3 px-3">
        <span>Spell Schools:</span>
        <ul className="spellList">
          {spellSchools.map((school, index) => (
            <li key={index} onClick={(e) => handleFilterSelect(e, "school")}>
              <span
                className={
                  selectedSchools.includes(school)
                    ? "selectedSchool spellSchool"
                    : "spellSchool"
                }
              >
                {school}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-3">
        <span>Spell Levels:</span>
        <ul className="spellList">
          {spellLevels.map((level, index) => (
            <li key={index} onClick={(e) => handleFilterSelect(e, "level")}>
              <span
                className={
                  selectedLevels.includes(String(level))
                    ? "spellLevel selectedLevel"
                    : "spellLevel"
                }
              >
                {level}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <hr></hr>
      </div>

      <ul className="row" style={{ listStyle: "none", textAlign: "center" }}>
        {spells &&
          spells.map((spell, index) => (
            <li key={index} className="spellName col-3">
              <span className="spellText">{spell}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
