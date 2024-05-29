import { Container, Row, Col } from "react-bootstrap";

export default function SpellCard({spell}) {
  // Sets the string to be displayed for the spell level
  let spellLevelText;
  switch (spell.level) {
    case 0:
      spellLevelText = "Cantrip";
      break;
    case 1:
      spellLevelText = "1st-Level";
      break;
    case 2:
      spellLevelText = "2nd-Level";
      break;
    case 3:
      spellLevelText = "3rd-Level";
      break;
    case 4:
      spellLevelText = "4th-Level";
      break;
    case 5:
      spellLevelText = "5th-Level";
      break;
    case 6:
      spellLevelText = "6th-Level";
      break;
    case 7:
      spellLevelText = "7th-Level";
      break;
    case 8:
      spellLevelText = "8th-Level";
      break;
    case 9:
      spellLevelText = "9th-Level";
  }

  console.log(spell);
  console.log(spell.classList);
  // Takes all items from the spellList array and joins them into a string for display
  const spellListString = spell.classList.join(", ");
  console.log(spellListString);

  return (
    <Container>
      <Row>
        <Col>
          <h2>{spell.name}</h2>
        </Col>
      </Row>

      <Row>
        <Col>Source: {spell.sourceBook}</Col>
      </Row>
      <Row>
        <Col>
          {spell.level === 0
            ? `${spell.school} ${spellLevelText}`
            : `${spellLevelText} ${spell.school}`}
        </Col>
      </Row>

      <Row>
        <Col>Casting Time: {spell.castingTime}</Col>
      </Row>
      <Row>
        <Col>Range: {spell.range}</Col>
      </Row>
      <Row>
        <Col>
          Components: {spell.components}{" "}
          {spell.materialComponents ? `(${spell.materialComponents})` : ""}
        </Col>
      </Row>
      <Row>
        <Col>Duration: {spell.duration}</Col>
      </Row>

      <Row>
        <Col>{spell.description}</Col>
      </Row>

      <Row>
        <Col>At Higher Levels: {spell.atHigherLevel}</Col>
      </Row>

      <Row>
        <Col>Spell Lists: {spellListString}</Col>
      </Row>
    </Container>
  );
}
