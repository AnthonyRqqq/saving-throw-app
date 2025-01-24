export function handleStatBonus(bonus) {
  bonus = parseInt(bonus)
  let modifier = -5;

  if (bonus > 1) {
    if (bonus % 2 !== 0) bonus = bonus - 1;
    modifier = modifier + bonus / 2;
    if (modifier >= 0) modifier = `+${modifier}`;
  }

  console.log(bonus)
  return modifier;
}
