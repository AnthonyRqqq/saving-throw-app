import { useState } from "react";

export default function SpellFilters({
  filterList,
  setFilterList,
  handleReload,
}) {
  const [dropdownOptions, setDropdownOptions] = useState(false);

  const filters = [
    {
      name: "School",
    },
    {
      name: "Level",
    },
    {
      name: "Class",
    },
    {
      name: "Concentration Only",
      exclude: "No Concentration",
    },
    {
      name: "No Concentration",
      exclude: "Concentration Only",
    },
    {
      name: "Ritual Only",
      exclude: "No Ritual",
    },
    {
      name: "No Ritual",
      exclude: "Ritual Only",
    },
  ];

  const handleFilterChange = async (filter) => {
    const newFilters = filterList;
    // If the filterList already has this filter, we are simply unchecking it
    if (newFilters.includes(filter.name)) {
      const index = newFilters.indexOf(filter.name);
      if (index !== -1) {
        newFilters.splice(index, 1);
      }
      console.log(newFilters);
      handleReload();
      return setFilterList(newFilters);
    }

    // If the filterList has a mutually exclusive filter, uncheck it when we select our new filter
    if (newFilters.includes(filter.exclude)) {
      const index = newFilters.indexOf(filter.exclude);
      if (index !== -1) {
        newFilters.splice(index, 1);
      }
    }

    newFilters.push(filter.name);
    console.log(newFilters);
    handleReload();
    return setFilterList(newFilters);
  };

  return (
    <div
      onBlur={(e) => {
        // Check if the related target (element being clicked) is inside the dropdown
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setDropdownOptions(false);
        }
      }}
      tabIndex={0} // Ensure the div can receive focus
      className="dropdown"
    >
      <button onClick={() => setDropdownOptions(!dropdownOptions)}>
        Filters
      </button>
      <div
        className="dropdown-content"
        style={{ display: dropdownOptions ? "block" : "none" }}
      >
        {filters.map((filter) => {
          return (
            <label key={filter.name}>
              <input
                type="checkbox"
                checked={filterList.includes(filter.name)}
                onChange={() => handleFilterChange(filter)}
              />
              {filter.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
