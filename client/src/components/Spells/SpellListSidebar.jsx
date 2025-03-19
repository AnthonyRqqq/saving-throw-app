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
}) {
  const [showSave, setShowSave] = useState(false);
  const [changes, setChanges] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletedSpell, setDeletedSpell] = useState(null);

  const navigate = useNavigate();

  const [updateSpellList] = useMutation(UPDATE_SPELL_LIST);

  const handleListChange = (e) => {
    const newList = e.target.value;
    if (newList === list.name) return;

    const selectedList = allLists.find((list) => list.name === newList);
    setListDisplay(selectedList);
    reloadList();
  };

  const handleDeleteClick = (e) => {
    setDeletedSpell(e.target.dataset.spellid);
    setShowDeleteConfirm(true);
  };

  const handleRemoveSpell = async () => {
    const newSpellList = list.spell
      .filter((spell) => spell._id !== deletedSpell)
      .map((spell) => spell._id);

    await updateSpellList({
      variables: { spells: newSpellList, listId: list._id },
    });
  };

  return (
    <>
      <DeleteModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onHide={() => setShowDeleteConfirm(false)}
        onClick={() => handleRemoveSpell()}
      />

      <div className="list-sidebar-el">
        {showSave && (
          <button
            className="rounded"
            onClick={() => {
              setShowSave(false);
              reloadList();
            }}
          >
            Save Changes
          </button>
        )}

        <div>
          <button
            className="rounded"
            onClick={() => {
              viewAllSpells();
              setShowSave(true);
            }}
          >
            Add Spells
          </button>
          <button className="rounded" onClick={() => navigate("/spellLists")}>
            View All Lists
          </button>
        </div>

        <select defaultValue={list.name} onChange={handleListChange}>
          {allLists.map((listItem, index) => (
            <option key={index} value={listItem.name}>
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
