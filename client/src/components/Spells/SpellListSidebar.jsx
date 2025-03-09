import "./SpellListSidebar.css";

export default function SpellListSidebar({
  list,
  allLists,
  setListDisplay,
  viewAllSpells,
  reloadList,
}) {
  const handleListChange = (e) => {
    const newList = e.target.value;
    if (newList === list.name) return;

    const selectedList = allLists.find((list) => list.name === newList);
    setListDisplay(selectedList);
    reloadList();
  };

  return (
    <div className="list-sidebar-el">
      <div>
        <button onClick={() => viewAllSpells()}>Add Spells</button>
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
