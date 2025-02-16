import "./SpellListSidebar.css";

export default function SpellListSidebar({ list, allLists, setListDisplay }) {
  const handleListChange = (e) => {
    const newList = e.target.value;
    if (newList === list.name) return;

    const selectedList = allLists.find((list) => list.name === newList);
    setListDisplay(selectedList);
  };

  return (
    <div className="list-sidebar-el">
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
