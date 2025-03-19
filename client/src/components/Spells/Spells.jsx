import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_SPELLS,
  GET_SPELL_LIST_BY_ID,
  GET_ALL_SPELL_LISTS,
} from "../../utils/queries";
import { CREATE_SPELL_LIST } from "../../utils/mutations";
import { Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SpellCard from "./SpellCard";
import FilterSelect from "./FilterSelect";
import Filters from "./Filters";
import SpellListSidebar from "./SpellListSidebar";
import InputModal from "../Modals/InputModal";
import Auth from "../../utils/auth";
import "./Spells.css";

export default function Spells({ allLists, setListDisplay }) {
  const [allSpells, setAllSpells] = useState([]);
  const [spells, setSpells] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [displayedSpell, setDisplayedSpell] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [reload, setReload] = useState(0);
  const [createList, setCreateList] = useState(false);
  const [listSpells, setListSpells] = useState(null);
  const [listName, setListName] = useState("");
  const [resetSpells, setResetSpells] = useState(false);
  const [spellList, setSpellList] = useState(null);
  const intervalRef = useRef(null);
  const focusRef = useRef(null);
  const navigate = useNavigate();

  const { listId } = useParams();

  const user = Auth.getUser();

  const [createSpellList] = useMutation(CREATE_SPELL_LIST);
  const { loading: allSpellsLoading, data: allSpellsData } =
    useQuery(GET_ALL_SPELLS);

  const { loading: listLoading, data: spellListData } = useQuery(
    GET_ALL_SPELL_LISTS,
    {
      variables: { userId: user.data._id },
    }
  );

  useEffect(() => {
    if (!listId) {
      setSpellList(null);
      setResetSpells(!resetSpells);
      return;
    }

    if (spellListData && !listLoading) {
      const selectedList = spellListData.spellLists.find(
        (list) => list._id === listId
      );
      setSpellList(selectedList);
    }
  }, [listId, spellListData, listLoading]);

  // Set initial spell data on page load
  useEffect(() => {
    if (!allSpellsLoading && allSpellsData) {
      let spells = allSpellsData.spells;
      if (spellList)
        spells = spells.filter((spell) =>
          spellList.spell.map((spell) => spell._id).includes(spell._id)
        );
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
  }, [allSpellsLoading, allSpellsData, resetSpells]);

  // Handles reloading the page if spell data is still being loaded
  useEffect(() => {
    if (allSpellsLoading) {
      handleLoading();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [allSpellsLoading]);

  useEffect(() => {
    console.log(listId);
    console.log(spellList);
  }, [listId, spellList]);

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

  const handleInputChange = async (e) => {
    setListName(e.target.value);
  };

  const handleSaveList = async (e) => {
    const user = Auth.getUser();

    if (!user) {
    }

    const listObject = {
      name: listName,
      spellIds: listSpells,
      userId: user.data._id,
    };

    const response = await createSpellList({ variables: listObject });

    console.log(response);
    setCreateList(false);
    setListSpells(null);
    setListName(null);
  };

  const handleLoading = async () => {
    intervalRef.current = setInterval(() => {
      const newReload = reload + 1;
      setReload(newReload);
    }, 1000);
  };

  const handleSpellListChange = async (spell) => {
    let newList = listSpells || [];
    if (newList.includes(spell._id)) {
      const spellIndex = newList.indexOf(spell._id);

      newList = [
        ...newList.slice(0, spellIndex),
        ...newList.slice(spellIndex + 1),
      ];
    } else {
      newList.push(spell._id);
    }

    if (newList.length) setListSpells(newList);
    else setListSpells(null);

    handleReload();
  };

  const viewAllSpells = () => {
    // Alphabetizes spells before setting them to display
    const sortedSpells = [...allSpellsData.spells].sort((a, b) => {
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
  };

  return (
    <div className={spellList ? "list-sidebar" : ""}>
      <div className={spellList ? "main-spell-div" : ""}>
        <InputModal
          show={showNameModal}
          confirmText="Save List"
          inputElements={[{ text: "List Name" }]}
          inputTitle="Enter a name for this spell list"
          onClose={() => setShowNameModal(false)}
          onClick={() => handleSaveList()}
          onChange={handleInputChange}
        />

        <FilterSelect
          filterList={filterList}
          setFilterList={setFilterList}
          handleReload={handleReload}
          setSpells={setSpells}
          allSpells={allSpells}
          setDisplayedSpell={setDisplayedSpell}
        />

        <button
          onClick={() => {
            if (spellList) navigate("/spells");

            setCreateList(!createList);
            if (listSpells) setListSpells(null);
          }}
          style={{ borderRadius: "8px" }}
        >
          {createList ? "Cancel Create List" : "Create New Spell List"}
        </button>

        {createList && (
          <>
            <button
              onClick={() => {
                setShowNameModal(true);
              }}
              style={{ borderRadius: "8px" }}
            >
              Save Spell List
            </button>

            <button
              onClick={() => {
                if (listSpells) setListSpells(null);
              }}
              style={{ borderRadius: "8px" }}
            >
              Clear Selected Spells List
            </button>
          </>
        )}

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
          <div className={`${spellList && "mx-5"}`}>
            <SpellCard
              spellList={spellList}
              spell={displayedSpell}
              handleSpellListChange={handleSpellListChange}
              listSpells={listSpells}
              createList={createList}
            />
            <hr></hr>
          </div>
        )}

        <ul
          className="row"
          style={{
            padding: "0px",
            listStyle: "none",
            textAlign: "center",
          }}
        >
          {spells ? (
            spells.length > 0 ? (
              // Display the list of available spells matching the selected filters
              spells.map((spell, index) => (
                <li
                  key={index}
                  className="spellName col-lg-3 col-sm-4 col-md-3"
                >
                  {createList && (
                    <input
                      type="checkbox"
                      className="me-1 dropdown-checkbox"
                      onChange={() => handleSpellListChange(spell)}
                      checked={listSpells?.includes(spell._id)}
                    />
                  )}

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

      {spellList && (
        <div style={{ width: "20%" }}>
          <SpellListSidebar
            handleSpellSelect={handleSpellSelect}
            list={spellList}
            allLists={spellListData.spellLists}
            setListDisplay={setListDisplay}
            viewAllSpells={viewAllSpells}
            reloadList={() => setResetSpells(!resetSpells)}
          />
        </div>
      )}
    </div>
  );
}
