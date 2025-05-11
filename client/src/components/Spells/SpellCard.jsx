import { Container, Row, Col } from "react-bootstrap";
import AdditionalEffects from "./AdditionalEffects";
import StatBlock from "../StatBlocks/StatBlock";
import "./SpellCard.css";

export default function SpellCard({
  spell,
  createList,
  listSpells,
  handleSpellListChange,
  setDisplayedSpell,
}) {
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

  const stats = [
    "Strength",
    "Dexterity",
    "Charisma",
    "Constitution",
    "Intelligence",
    "Wisom",
  ];

  // Takes all items from the spellList array and joins them into a string for display
  const spellListString = spell.classList.join(", ");
  const statBlock = spell.statBlock[0];

  const SpellTable = () => {
    const tableData = spell.table;

    return (
      <table className="my-4 statBlock">
        <thead>
          <tr>
            {tableData.map((item) => (
              <th key={item}>{item.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData[0].details.map((detail, index) => {
            return (
              <tr key={index}>
                {tableData.map((item, itemIndex) => (
                  <td key={itemIndex}>{item.details[index]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const DescriptionDisplay = ({ spellDescription }) => {
    let descriptionArray = spellDescription
      .split("\n\n")
      .map((item) => item.trim());

    return descriptionArray.map((item) => {
      if (item === "") return <SpellTable />;

      return <div className="py-2">{item}</div>;
    });
  };

  return (
    <Container className="spellCard">
      <Container>
        <Row>
          {createList && (
            <button onClick={() => handleSpellListChange(spell)}>
              {listSpells?.includes(spell._id)
                ? "Remove Spell From List"
                : "Add Spell To List"}
            </button>
          )}

          <Col className="spellCardHeader">
            <h2 className="spellCardName">{spell.name}</h2>
            <h4 className="d-flex" style={{ alignItems: "center" }}>
              {spell.isRitual ? "Ritual" : ""}{" "}
              <button
                onClick={() => setDisplayedSpell(null)}
                className="mx-2 rounded"
              >
                X
              </button>
            </h4>
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
            <DescriptionDisplay spellDescription={spell.description} />
          </Col>
        </Row>

        {spell.effectsArray && (
          <AdditionalEffects effectsArray={spell.effectsArray} />
        )}

        {spell.atHigherLevel && (
          <Row className="spellCardField atHigherLevel">
            <Col>
              <div className="fieldTitle">At Higher Levels: </div>
              {spell.atHigherLevel}
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

      {statBlock && <StatBlock statBlock={statBlock} />}
    </Container>
  );
}
