import SpellSearch from "../../utils/spellSearch";
import { useEffect, useState } from "react";
import "./Spells.css";

export default function Spells() {
  const [spells, setSpells] = useState(null);
  const [displaySpellList, setDisplaySpellList] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const getAllSpells = async () => {
      const allSpells = await SpellSearch.getAllSpells();
      await setSpells(allSpells);
      console.log(spells);
    };

    getAllSpells();
  }, []);

  useEffect(() => {
    if (spells?.results.length > 0) {
      setDisplaySpellList(true);
    } else {
      setDisplaySpellList(false);
    }
  }, [spells]);

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

  const handleFilterSelect = async (e) => {
    const filter = e.target.textContent;
    const currentlySelected = selectedFilters;

    if (currentlySelected.includes(filter)) {
      const index = currentlySelected.indexOf(filter);
      if (index !== -1) {
        currentlySelected.splice(index, 1);
      }
      setSelectedFilters(currentlySelected);
    } else {
      currentlySelected.push(filter);
      setSelectedFilters(currentlySelected);
    }

    console.log(selectedFilters);
  };

  const handleSchoolSelect = async (e) => {};

  return (
    <div>
      <div className="pt-3 px-3">
        <span>Spell Schools:</span>
        <ul className="spellList">
          {spellSchools.map((school, index) => (
            <li key={index} onClick={(e) => handleFilterSelect(e)}>
              {school}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-3">
        <span>Spell Levels:</span>
        <ul className="spellList">
          {spellLevels.map((level, index) => (
            <li key={index} onClick={(e) => handleFilterSelect(e)}>
              {level}
            </li>
          ))}
        </ul>
      </div>

      <ul className="row" style={{ listStyle: "none", textAlign: "center" }}>
        {displaySpellList &&
          spells.results.map((spell, index) => (
            <li key={index} className="spellName col-3">
              <span className="spellText">{spell.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
