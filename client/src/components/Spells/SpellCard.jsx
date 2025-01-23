import { Container, Row, Col } from "react-bootstrap";
import AdditionalEffects from "./AdditionalEffects";
import "./SpellCard.css";

export default function SpellCard({ spell }) {
  console.log(spell)

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

  // Takes all items from the spellList array and joins them into a string for display
  const spellListString = spell.classList.join(", ");

  return (
    <Container className="spellCard">
      <Row>
        <Col className="spellCardHeader">
          <h2 className="spellCardName">{spell.name}</h2>
          <h4>{spell.isRitual ? "Ritual" : ""}</h4>
        </Col>
      </Row>

      <Row className="spellCardField">
        <Col className="fieldTitle">
          {spell.level === 0
            ? `${spell.school} ${spellLevelText}`
            : `${spellLevelText} ${spell.school}`}
        </Col>
      </Row>

      <Row className="spellCardField">
        <Col>
          <div className="fieldTitle">Casting Time: </div> {spell.castingTime}
        </Col>
      </Row>

      <Row className="spellCardField">
        <Col>
          <div className="fieldTitle">Range: </div>
          {spell.range}
        </Col>
      </Row>

      <Row className="spellCardField">
        <Col>
          <div className="fieldTitle">Components: </div>
          {spell.components}{" "}
          {spell.materialComponents.length > 0 &&
            `(${spell.materialComponents})`}
        </Col>
      </Row>

      <Row className="spellCardField">
        <Col>
          <div className="fieldTitle">Duration: </div>
          {spell.duration} {spell.isConcentration && `(Concentration)`}
        </Col>
      </Row>

      <Row className="spellDescription">
        <Col>
          <div
            dangerouslySetInnerHTML={{
              __html: spell.description.replace(/\n/g, "<br />"),
            }}
          />
        </Col>
      </Row>

      {spell.effectsArray && (
        <AdditionalEffects effectsArray={spell.effectsArray} />
      )}

      {spell.atHigherLevel && (
        <Row className="spellCardField atHigherLevel">
          <Col>
            <>
              <div className="fieldTitle">At Higher Levels: </div>
              {spell.atHigherLevel}
            </>
          </Col>
        </Row>
      )}

      <Row className="spellCardField">
        <Col>
          <div className="fieldTitle">Spell Lists: </div>
          {spellListString}
        </Col>
      </Row>

      <Row className="spellCardField">
        <Col>
          <div className="fieldTitle">Source: </div>
          {spell.sourceBook}
        </Col>
      </Row>
    </Container>
  );
}
