let requestOptions = "";
let requestURL = "https://www.dnd5eapi.co/api/spells";

class SpellSearch {
  getAllSpells = async () => {
    const response = await fetch(requestURL);
    const data = response.json();
    return data;
  };

  getFilteredSpells = async (levels, schools) => {
    let levelFilters = null;
    let schoolFilters = null;

    console.log(levels);
    console.log(schools);

    // Takes values from schools and levels arrays and turns them to string for the url
    if (levels) {
      levelFilters = levels.levels.join(",");
    }

    if (schools) {
      const lowerCaseSchools = schools.schools.map((school) =>
        school.toLowerCase()
      );
      schoolFilters = lowerCaseSchools.join(",");
    }

    if (!levelFilters && !schoolFilters) {
      return;
    }

    if (schools) {
      let filteredSpells = {};

      const promises = schools.schools.map(async (school) => {
        requestURL = `https://www.dnd5eapi.co/api/spells?school=${school}`;
        const response = await fetch(requestURL);
        const data = response.json();
        if (data) {
          filteredSpells = { ...filteredSpells, ...data };
        }
      });

      await Promise.all(promises)

      console.log(filteredSpells);
      return filteredSpells;
    }

    // console.log(levelFilters, schoolFilters)
    // // Sets up request url based on given params
    // if (levels && schools) {
    //   requestURL = `https://www.dnd5eapi.co/api/spells?level=${levelFilters}&school=${schoolFilters}`;
    // } else {
    //   requestURL = `https://www.dnd5eapi.co/api/spells?${
    //     levels ? `level=${levelFilters}` : `school=${schoolFilters}`
    //   }`;
    // }

    // const response = await fetch(requestURL);
    // console.log(response)
    // const data = response.json();
    // console.log(data)
    // return data;
  };
}

export default new SpellSearch();
