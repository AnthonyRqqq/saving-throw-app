import SpellSearch from "../../utils/spellSearch";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SPELLS, GET_FILTERED_SPELLS } from "../../utils/queries";
import React from "react";
import "./Spells.css";

export default function Spells() {
  const [allSpells, setAllSpells] = useState(null);
  const [spells, setSpells] = useState(null);
  // const [displaySpellList, setDisplaySpellList] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  // const [reload, setReload] = React.useState(0);

  const { loading: allSpellsLoading, data: allSpellsData } =
    useQuery(GET_ALL_SPELLS);

  useEffect(() => {
    if (!allSpellsLoading && allSpellsData) {
      console.log(allSpellsData.spells);
      const spells = allSpellsData.spells;
      const sortedSpells = [...spells].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setSpells(sortedSpells);
      setAllSpells(sortedSpells);
      console.log(spells);
    }
  }, [allSpellsLoading, allSpellsData]);

  useEffect(() => {
    getFilteredSpells();
  }, [selectedLevels, selectedSchools]);

  // const forceReload = () => {
  //   setReload(reload + 1);
  // };

  const getFilteredSpells = async () => {
    let filteredSpells = allSpells;
    if (selectedSchools.length > 0) {
      filteredSpells = filteredSpells.filter((spell) =>
        selectedSchools.includes(spell.school)
      );
    }
    if (selectedLevels.length > 0) {
      filteredSpells = filteredSpells.filter((spell) =>
        selectedLevels.includes(String(spell.level))
      );
    }
    setSpells(filteredSpells);
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

  const handleFilterSelect = (e, input) => {
    const filter = e.target.textContent;
    let currentlySelected = [];

    if (input === "level") {
      currentlySelected = [...selectedLevels];
      if (currentlySelected.includes(filter)) {
        currentlySelected = currentlySelected.filter((item) => item !== filter);
      } else {
        currentlySelected.push(filter);
      }
      setSelectedLevels(currentlySelected);
    } else {
      currentlySelected = [...selectedSchools];
      if (currentlySelected.includes(filter)) {
        currentlySelected = currentlySelected.filter((item) => item !== filter);
      } else {
        currentlySelected.push(filter);
      }
      setSelectedSchools(currentlySelected);
    }
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
              <span className="spellText">{spell.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
