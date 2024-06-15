import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SPELLS } from "../../utils/queries";
import Form from "react-bootstrap/Form";
import SpellCard from "./SpellCard";
import "./Spells.css";

export default function Spells() {
  const [allSpells, setAllSpells] = useState(null);
  const [spells, setSpells] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [displayedSpell, setDisplayedSpell] = useState("");

  const { loading: allSpellsLoading, data: allSpellsData } =
    useQuery(GET_ALL_SPELLS);

  // Set initial spell data on page load
  useEffect(() => {
    if (!allSpellsLoading && allSpellsData) {
      const spells = allSpellsData.spells;
      // Alphabetizes spells before setting them to display
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
    }
  }, [allSpellsLoading, allSpellsData]);

  // Refilter the spells any time the filters are updated
  useEffect(() => {
    getFilteredSpells();
  }, [selectedLevels, selectedSchools, selectedName]);

  // Handles setting the filters selected for spells
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

    if (selectedName.length > 0) {
      filteredSpells = filteredSpells.filter((spell) =>
        spell.name.toLowerCase().includes(selectedName.toLowerCase())
      );
    }
    setSpells(filteredSpells);
    setDisplayedSpell("");
  };

  // Filtering options for levels and schools
  const spellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  // Handles updating when a new filter is selected
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

  // Handles text input change for name filter
  const handleInputChange = async (e) => {
    const { target } = e;
    const name = target.value;
    setSelectedName(name);
  };

  // Handles displaying spell card when a spell is clicked
  const handleSpellSelect = async (e) => {
    const { target } = e;
    const spellId = target.dataset.spellId;
    const displayedSpell = spells.filter((spell) => spellId === spell._id);
    setDisplayedSpell(displayedSpell[0]);
  };

  return (
    <div>
      {/* Schools to filter by */}
      <div className="pt-3 px-3">
        <div style={{ textAlign: "center" }}>Spell Schools:</div>
        <ul
          className="spellList"
          style={{ flex: "flex", justifyContent: "center" }}
        >
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

      {/* Levels to filter by */}
      <div className="px-3">
        <div style={{ textAlign: "center" }}>Spell Levels:</div>
        <ul
          className="spellList"
          style={{ flex: "flex", justifyContent: "center" }}
        >
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

      {/* Input text to filter names by */}
      <div className="px-3">
        <div style={{ textAlign: "center" }}>Name:</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Control
            type="text"
            style={{ textAlign: "center", maxWidth: "20rem" }}
            onChange={(e) => handleInputChange(e)}
          ></Form.Control>
        </div>
      </div>

      <div>
        <hr></hr>
      </div>

      {/* Show the SpellCard component if a spell has been selected */}
      {displayedSpell && <SpellCard spell={displayedSpell} />}
      {displayedSpell && (
        <div>
          <hr></hr>
        </div>
      )}

      <ul className="row" style={{ listStyle: "none", textAlign: "center" }}>
        {spells &&
          spells.map((spell, index) => (
            <li key={index} className="spellName col-3">
              <span
                className="spellText"
                data-spell-id={spell._id}
                onClick={(e) => handleSpellSelect(e)}
              >
                {spell.name}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
