import { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SPELLS } from "../../utils/queries";
import { Form, Spinner } from "react-bootstrap";
import SpellCard from "./SpellCard";
import "./Spells.css";

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

export default function Spells() {
  const [allSpells, setAllSpells] = useState([]);
  const [spells, setSpells] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [displayedSpell, setDisplayedSpell] = useState("");
  const [reload, setReload] = useState(0);
  const intervalRef = useRef(null);
  const focusRef = useRef(null);

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

  // Handles reloading the page if spell data is still being loaded
  useEffect(() => {
    if (allSpellsLoading) {
      handleLoading();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [allSpellsLoading]);

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

    if (filteredSpells.length === 0) setSpells(null);
    else setSpells(filteredSpells);
    setDisplayedSpell("");
  };

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
    await setDisplayedSpell(displayedSpell[0]);

    // Scrolls back to top of page to view spell
    if (focusRef) {
      focusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoading = async () => {
    intervalRef.current = setInterval(() => {
      const newReload = reload + 1;
      console.log(`Reload ${newReload}`);
      setReload(newReload);
    }, 1000);
  };

  return (
    <div>
      {/* Schools to filter by */}
      <div className="pt-3 px-3">
        <div className="filterTitle">Spell Schools</div>
        <ul className="spellList">
          {spellSchools.map((school, index) => (
            <li key={index}>
              <button
                onClick={(e) => handleFilterSelect(e, "school")}
                className={
                  selectedSchools.includes(school)
                    ? "selectedSchool spellSchool"
                    : "spellSchool"
                }
              >
                {school}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Levels to filter by */}
      <div className="px-3">
        <div className="filterTitle">Spell Levels</div>
        <ul className="spellList">
          {spellLevels.map((level, index) => (
            <li key={index}>
              <button
                onClick={(e) => handleFilterSelect(e, "level")}
                className={
                  selectedLevels.includes(String(level))
                    ? "spellLevel selectedLevel"
                    : "spellLevel"
                }
              >
                {level}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Input text to filter names by */}
      <div className="px-3">
        <div className="filterTitle">Name</div>
        <div className="spellList">
          <Form.Control
            className="filterTitle"
            type="text"
            style={{ textAlign: "center", maxWidth: "20rem" }}
            onChange={(e) => handleInputChange(e)}
          ></Form.Control>
        </div>
      </div>

      <hr ref={focusRef}></hr>
      {/* Show the SpellCard component if a spell has been selected */}
      {displayedSpell && <SpellCard spell={displayedSpell} />}
      {displayedSpell && <hr></hr>}

      <ul
        className="row"
        style={{
          listStyle: "none",
          textAlign: "center",
        }}
      >
        {spells ? (
          spells.length > 0 ? (
            // Display the list of available spells matching the selected filters
            spells.map((spell, index) => (
              <li key={index} className="spellName col-lg-3 col-sm-4 col-md-3">
                <span
                  className="spellText"
                  data-spell-id={spell._id}
                  onClick={(e) => handleSpellSelect(e)}
                >
                  {spell.name}
                </span>
              </li>
            ))
          ) : (
            // If we have a spells array, but it is empty, show a loading spinner as data loads in
            <div>
              <Spinner animation="border" />
            </div>
          )
        ) : (
          // If we don't have any spells matching the filters, display a message instead of a spinner
          <div>No spells found matching these filters</div>
        )}
      </ul>
    </div>
  );
}
