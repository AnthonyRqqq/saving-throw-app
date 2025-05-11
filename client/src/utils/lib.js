export function handleStatBonus(bonus) {
  bonus = parseInt(bonus);
  let modifier = -5;

  if (bonus > 1) {
    if (bonus % 2 !== 0) bonus = bonus - 1;
    modifier = modifier + bonus / 2;
    if (modifier >= 0) modifier = `+${modifier}`;
  }

  return modifier;
}

export function sortByName(array) {
  return [...array].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

// Regex for checking valid email addresses
export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
