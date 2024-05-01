let requestOptions = "";
let requestURL = "https://www.dnd5eapi.co/api/spells";

class SpellSearch {
  getAllSpells = async () => {
    const response = await fetch(requestURL);
    const data = response.json();
    return data;
  };
}

export default new SpellSearch();
