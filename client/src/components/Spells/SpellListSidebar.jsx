import "./SpellListSidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_SPELL_LIST } from "../../utils/mutations";

import DeleteModal from "../Modals/DeleteModal";

export default function SpellListSidebar({
  list,
  allLists,
  setListDisplay,
  viewAllSpells,
  reloadList,
  handleSpellSelect,
  resetSpells,
  setResetSpells,
  setCreateList,
  setListSpells,
  listSpells,
  refetch,
  setDisplayedSpell,
  allSpells,
}) {
  const [showSave, setShowSave] = useState(false);
  const [changes, setChanges] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletedSpell, setDeletedSpell] = useState(null);
  const [deletedSpellName, setDeletedSpellName] = useState(null);
  const [showSpellLists, setShowSpellLists] = useState(false);

  const navigate = useNavigate();

  const [updateSpellList] = useMutation(UPDATE_SPELL_LIST);

  const handleListChange = (newList) => {
    if (newList === list._id) return;

    const selectedList = allLists.find((list) => list._id === newList);
    navigate(`/spellLists/${selectedList._id}`);
    setShowSpellLists(false);
  };

  const handleDeleteClick = (e) => {
    setDeletedSpell(e.target.dataset.spellid);
    setDeletedSpellName(e.target.dataset.spellname);
    setShowDeleteConfirm(true);
  };

  const handleRemoveSpell = async () => {
    const newSpellList = list.spell
      .filter((spell) => spell._id !== deletedSpell)
      .map((spell) => spell._id);

    await updateSpellList({
      variables: { spells: newSpellList, listId: list._id },
    });

    setResetSpells(!resetSpells);
  };

  return (
    <>
      <DeleteModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onHide={() => setShowDeleteConfirm(false)}
        onClick={() => handleRemoveSpell()}
        item={deletedSpellName}
      />

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
                    (spell) => !listSpells.includes(spell._id)
                  );
                  if (!spellDiff.length)
                    spellDiff = listSpells.filter(
                      (spell) =>
                        !list.spell.map((spell) => spell._id).includes(spell)
                    );

                  if (spellDiff.length) {
                    await updateSpellList({
                      variables: { spells: listSpells, listId: list._id },
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
                  const newListSpells = list.spell.map((spell) => spell._id);

                  setListSpells(newListSpells);
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

        <div class="custom-dropdown" onPointerLeave={() => setShowSpellLists(false)}>
          <button 
            onClick={() => setShowSpellLists(!showSpellLists)}
            class="dropdown-btn rounded"
          >
            List: {list.name}
          </button>

          {showSpellLists && (
            <ul class="dropdown-menu">
              {allLists.map((listItem, index) => (
                <li
                  onClick={() => handleListChange(listItem._id)}
                  className="dropdown-item"
                  key={index}
                  value={listItem._id}
                >
                  {listItem.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4">
          <ul>
            {(listSpells
              ? allSpells.filter((spell) => listSpells.includes(spell._id))
              : list.spell
            ).map((spell, index) => {
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

                  {!showSave && (
                    <div
                      data-spellid={spell._id}
                      data-spellname={spell.name}
                      className="bi bi-trash"
                      onClick={handleDeleteClick}
                      style={{
                        position: "absolute",
                        top: "10%",
                        left: "-25%",
                        color: "red",
                        cursor: "pointer",
                      }}
                    ></div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
