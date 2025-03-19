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
}) {
  const [showSave, setShowSave] = useState(false);
  const [changes, setChanges] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletedSpell, setDeletedSpell] = useState(null);
  const [deletedSpellName, setDeletedSpellName] = useState(null);

  const navigate = useNavigate();

  const [updateSpellList] = useMutation(UPDATE_SPELL_LIST);

  const handleListChange = (e) => {
    const newList = e.target.value;
    if (newList === list._id) return;

    const selectedList = allLists.find((list) => list._id === newList);
    navigate(`/spellLists/${selectedList._id}`);
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
              }}
            >
              Add Spells
            </button>
          )}
          <button className="rounded" onClick={() => navigate("/spellLists")}>
            View All Lists
          </button>
        </div>

        <select defaultValue={list.name} onChange={handleListChange}>
          {allLists.map((listItem, index) => (
            <option key={index} value={listItem._id}>
              {listItem.name}
            </option>
          ))}
        </select>

        <div className="pt-4">
          <ul>
            {list.spell.map((spell, index) => {
              return (
                <li
                  key={index}
                  style={{
                    listStyle: "none",
                    textAlign: "center",
                    position: "relative",
                  }}
                  data-spell-id={spell._id}
                  onClick={(e) => handleSpellSelect(e)}
                >
                  {spell.name}

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
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
