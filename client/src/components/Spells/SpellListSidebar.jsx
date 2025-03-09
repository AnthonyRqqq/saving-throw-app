import "./SpellListSidebar.css";
import { useState } from "react";

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

  const handleListChange = (e) => {
    const newList = e.target.value;
    if (newList === list.name) return;

    const selectedList = allLists.find((list) => list.name === newList);
    setListDisplay(selectedList);
    reloadList();
  };

  return (
    <div className="list-sidebar-el">
      {showSave && (
        <button
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
          onClick={() => {
            viewAllSpells();
            setShowSave(true);
          }}
        >
          Add Spells
        </button>
        <button onClick={() => setListDisplay(null)}>View All Lists</button>
        <button onClick={() => removeSpells()}>Remove Spells</button>
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
                style={{ listStyle: "none", textAlign: "center" }}
                data-spell-id={spell._id}
                onClick={(e) => handleSpellSelect(e)}
              >
                {spell.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
