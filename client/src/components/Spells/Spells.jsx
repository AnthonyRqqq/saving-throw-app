import { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SPELLS } from "../../utils/queries";
import { Spinner } from "react-bootstrap";
import SpellCard from "./SpellCard";
import FilterSelect from "./FilterSelect";
import Filters from "./Filters";
import "./Spells.css";

export default function Spells() {
  const [allSpells, setAllSpells] = useState([]);
  const [spells, setSpells] = useState([]);
  const [filterList, setFilterList] = useState([]);
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

  useEffect(() => {
    console.log(filterList);
  }, [filterList]);

  // Handles reloading the page if spell data is still being loaded
  useEffect(() => {
    if (allSpellsLoading) {
      handleLoading();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [allSpellsLoading]);

  const handleReload = () => setReload((prev) => prev + 1);

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
      <FilterSelect
        filterList={filterList}
        setFilterList={setFilterList}
        handleReload={handleReload}
        setSpells={setSpells}
        allSpells={allSpells}
      />
      <Filters
        filterList={filterList}
        setFilterList={setFilterList}
        handleReload={handleReload}
        allSpells={allSpells}
        setSpells={setSpells}
        setDisplayedSpell={setDisplayedSpell}
        reload={reload}
      />

      {/* Ref here to scroll to the displayed spell after one is selected */}
      <hr ref={focusRef}></hr>
      {/* Show the SpellCard component if a spell has been selected */}
      {displayedSpell && (
        <>
          <SpellCard spell={displayedSpell} /> <hr></hr>
        </>
      )}

      <ul
        className="row"
        style={{
          padding: '0px',
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
