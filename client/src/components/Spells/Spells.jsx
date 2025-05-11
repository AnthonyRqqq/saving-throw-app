import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_SPELLS, GET_ALL_SPELL_LISTS } from "../../utils/queries";
import { CREATE_SPELL_LIST } from "../../utils/mutations";
import { Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SpellCard from "./SpellCard";
import FilterSelect from "./FilterSelect";
import Filters from "./Filters";
import SpellListSidebar from "./SpellListSidebar";
import InputModal from "../Modals/InputModal";
import AccountModal from "../Modals/AccountModal";
import Auth from "../../utils/auth";
import "./Spells.css";
import { sortByName } from "../../utils/lib";

export default function Spells({ setListDisplay }) {
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
  const [showLogin, setShowLogin] = useState(false);
  const focusRef = useRef(null);
  const navigate = useNavigate();

  const { listId, createNewList } = useParams();
  const user = Auth.getLoggedInUser();

  const [createSpellList] = useMutation(CREATE_SPELL_LIST);
  const { loading: allSpellsLoading, data: allSpellsData } =
    useQuery(GET_ALL_SPELLS);

  const {
    loading: listLoading,
    data: spellListData,
    refetch,
  } = useQuery(GET_ALL_SPELL_LISTS, {
    variables: { userId: user?.data?._id },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (createNewList) {
      navigate("/spells");
      setCreateList(true);
    }
  }, [createNewList]);

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
  }, [listId, spellListData, listLoading, refetch]);

  // Set initial spell data on page load
  useEffect(() => {
    if (!allSpellsLoading && allSpellsData) {
      let spells = allSpellsData.spells;
      if (spellList)
        spells = spells.filter((spell) =>
          spellList.spell.map((spell) => spell._id).includes(spell._id)
        );
      // Alphabetizes spells before setting them to display
      const sortedSpells = sortByName([...spells]);
      setSpells(sortedSpells);
      setAllSpells(sortedSpells);
    }
  }, [allSpellsLoading, allSpellsData, resetSpells, spellList]);

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
    if (!Auth.getLoggedInUser) return setShowLogin(true);

    const listObject = {
      name: listName,
      spellIds: listSpells,
      userId: user.data._id,
    };

    const response = await createSpellList({ variables: listObject });
    refetch();

    setCreateList(false);
    setListSpells(null);
    setListName(null);
    navigate(`/spellLists/${response.data.createSpellList._id}`);
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

    if (newList.length) setListSpells(sortByName([...newList]));
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
      {showLogin && (
        <AccountModal
          verifyLogin={true}
          afterLogin={() => handleSaveList()}
          onHide={() => setShowLogin(false)}
        />
      )}
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

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="mx-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FilterSelect
              filterList={filterList}
              setFilterList={setFilterList}
              handleReload={handleReload}
              setSpells={setSpells}
              allSpells={allSpells}
              setDisplayedSpell={setDisplayedSpell}
            />
          </div>

          {((!createList && listId) || !listId) && (
            <button
              className="mx-2"
              onClick={() => {
                if (spellList) navigate("/spells");

                setCreateList(!createList);
                if (listSpells) setListSpells(null);
                if (createList) setDisplayedSpell("");
              }}
              style={{ borderRadius: "8px" }}
            >
              {createList ? "Cancel Create List" : "Create New Spell List"}
            </button>
          )}

          {user && (
            <button
              className="mx-2 rounded"
              onClick={() => navigate("/spellLists")}
            >
              View My Spell Lists
            </button>
          )}

          {createList && !listId && (
            <>
              <button
                className="mx-2"
                onClick={() => {
                  setShowNameModal(true);
                }}
                style={{ borderRadius: "8px" }}
              >
                Save Spell List
              </button>

              <button
                className="mx-2"
                onClick={() => {
                  if (listSpells) setListSpells(null);
                }}
                style={{ borderRadius: "8px" }}
              >
                Clear Selected Spells List
              </button>
            </>
          )}
        </div>

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
              spell={displayedSpell}
              handleSpellListChange={handleSpellListChange}
              listSpells={listSpells}
              createList={createList}
              setDisplayedSpell={setDisplayedSpell}
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
            listSpells={listSpells}
            setListSpells={setListSpells}
            viewAllSpells={viewAllSpells}
            reloadList={() => setResetSpells(!resetSpells)}
            setCreateList={setCreateList}
            setDisplayedSpell={setDisplayedSpell}
            allSpells={allSpells}
          />
        </div>
      )}
    </div>
  );
}
