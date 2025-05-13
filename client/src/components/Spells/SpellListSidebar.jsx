import "./SpellListSidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_SPELL_LIST } from "../../utils/mutations";
import { sortByName } from "../../utils/lib";

export default function SpellListSidebar({
  list,
  allLists,
  viewAllSpells,
  reloadList,
  handleSpellSelect,
  setCreateList,
  setListSpells,
  listSpells,
  setDisplayedSpell,
  allSpells,
}) {
  const [showSave, setShowSave] = useState(false);
  const [showSpellLists, setShowSpellLists] = useState(false);

  const spellLevels = [
    "Cantrips",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
  ];
  const navigate = useNavigate();

  const [updateSpellList] = useMutation(UPDATE_SPELL_LIST);

  const handleListChange = (newList) => {
    if (newList === list._id) return;

    const selectedList = allLists.find((list) => list._id === newList);
    navigate(`/spellLists/${selectedList._id}`);
    setShowSpellLists(false);
    setDisplayedSpell("");
  };

  return (
    <>
      <div className="list-sidebar-el">
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {showSave && (
            <>
              <button
                className="rounded"
                onClick={async () => {
                  let spellDiff = list.spell.filter(
                    (spell) =>
                      !listSpells.some((listItem) => listItem._id === spell._id)
                  );
                  if (!spellDiff.length)
                    spellDiff = listSpells.filter(
                      (spell) =>
                        !list.spell
                          .map((spell) => spell._id)
                          .includes(spell._id)
                    );

                  if (spellDiff.length) {
                    await updateSpellList({
                      variables: {
                        spells: listSpells.map((spell) => spell._id),
                        listId: list._id,
                      },
                    });
                  }

                  setShowSave(false);
                  setCreateList(false);
                  setListSpells(null);
                  setDisplayedSpell("");
                  reloadList();
                }}
              >
                Save Changes
              </button>

              <button
                className="rounded"
                onClick={() => {
                  setShowSave(false);
                  setCreateList(false);
                  setListSpells(null);
                  setDisplayedSpell("");
                  reloadList();
                }}
              >
                Cancel Changes
              </button>
            </>
          )}

          <div>
            {!showSave && (
              <button
                className="rounded"
                onClick={() => {
                  setListSpells(list.spell);
                  viewAllSpells();
                  setShowSave(true);
                  setCreateList(true);
                  setDisplayedSpell("");
                }}
              >
                Edit Spells
              </button>
            )}
            <button className="rounded" onClick={() => navigate("/spellLists")}>
              View All Lists
            </button>
          </div>
        </div>

        <div
          class="custom-dropdown custom-dropdown-dark"
          onPointerLeave={() => setShowSpellLists(false)}
        >
          <button
            onClick={() => setShowSpellLists(!showSpellLists)}
            class="dropdown-btn rounded"
          >
            List: {list.name}
          </button>

          {showSpellLists && (
            <ul class="dropdown-menu dropdown-menu-dark">
              {allLists.map((listItem, index) => (
                <li
                  onClick={() => handleListChange(listItem._id)}
                  className="dropdown-item dropdown-item-dark"
                  key={index}
                  value={listItem._id}
                >
                  {listItem.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 text-center">
          <span>Spell Slots</span>
          <ul className="px-0">
            {spellLevels.map((level, index) => {
              const slotCount = list.spellSlots.find((slot) => {
                if (level === "Cantrip") return slot.level === 0;
                else return slot.level === level.substring(0, 1);
              });

              const spellsList = listSpells || allSpells;
              const spellsPerLevel = spellsList.filter((spell) => {
                if (!spellsList.some((listItem) => listItem._id === spell._id)) return false;

                if (level === "Cantrips") return spell.level === 0;
                else return spell.level === parseInt(level.substring(0, 1));
              });

              if (!slotCount?.length && !spellsPerLevel.length) {
                return null;
              }

              return (
                <li
                  style={{
                    listStyle: "none",
                    textAlign: "left",
                    position: "relative",
                    paddingBottom: "0.75rem",
                  }}
                  key={index}
                >
                  <div className="text-center">{level}</div>{" "}
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div
                      style={{ display: "inline-block", whiteSpace: "nowrap" }}
                    >
                      Slots: {slotCount?.length || 0}{" "}
                      <button style={{ width: "1.5rem" }}>+</button>
                      <button style={{ width: "1.5rem" }}>-</button>
                    </div>
                    <div>
                      Spells:
                      {spellsPerLevel.length}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pt-4">
          <ul className="px-0">
            {(listSpells ? sortByName(listSpells) : sortByName(list.spell)).map(
              (spell, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      listStyle: "none",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <span
                      data-spell-id={spell._id}
                      onClick={(e) => handleSpellSelect(e)}
                      className="list-spell"
                    >
                      {spell.name}
                    </span>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
