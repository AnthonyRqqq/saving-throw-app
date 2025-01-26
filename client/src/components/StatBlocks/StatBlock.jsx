import { Container, Row, Col, Card } from "react-bootstrap";
import CardField from "../Templates/CardField";
import { handleStatBonus } from "../../utils/lib";

import "./StatBlock.css";

export default function StatBlock({ statBlock }) {
  const Action = ({ action }) => {
    return (
      <Row className="spellCardField">
        <Col>
          <div className="fieldTitle">{action.title}. </div>
          {action.type ? (
            <>
              <div className="fst-italic">{action.type}: </div>
              <div>{action.hitBonus}, </div>
              <div>{action.range}, </div>
              <div>{action.target}, </div>
              <div>
                <div className="fst-italic">
                  {action.description.substring(0, 4)}
                </div>
                <div>{action.description.substring(4)}</div>
              </div>
            </>
          ) : (
            <div>{action.description}</div>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <Container className="mt-4 pt-4 statBlock">
      <Row>
        <Col>
          <h2>{statBlock.name}</h2>
        </Col>
      </Row>
      <CardField content={`${statBlock.size} ${statBlock.type}`} />
      <div className="breakline"></div>
      <CardField title={"Armor Class: "} content={statBlock.armorClass} />
      <CardField title={"Speed: "} content={statBlock.speed} />
      <div className="breakline"></div>
      <Row>
        <Col className="text-center">
          <div className="fw-bold">STR</div> {statBlock.strength}{" "}
          {`(${handleStatBonus(statBlock.strength)})`}
        </Col>

        <Col className="text-center">
          <div className="fw-bold">DEX</div> {statBlock.dexterity}{" "}
          {`(${handleStatBonus(statBlock.dexterity)})`}
        </Col>

        <Col className="text-center">
          <div className="fw-bold">CON</div> {statBlock.constitution}{" "}
          {`(${handleStatBonus(statBlock.constitution)})`}
        </Col>

        <Col className="text-center">
          <div className="fw-bold">WIS</div> {statBlock.wisdom}{" "}
          {`(${handleStatBonus(statBlock.wisdom)})`}
        </Col>

        <Col className="text-center">
          <div className="fw-bold">INT</div> {statBlock.intelligence}{" "}
          {`(${handleStatBonus(statBlock.intelligence)})`}
        </Col>

        <Col className="text-center">
          <div className="fw-bold">CHA</div> {statBlock.charisma}{" "}
          {`(${handleStatBonus(statBlock.charisma)})`}
        </Col>
      </Row>
      <div className="breakline"></div>
      {statBlock.resistances.length > 0 && (
        <CardField
          title={"Damage Resistances: "}
          content={statBlock.resistances.join(", ")}
        />
      )}

      {statBlock.damageImmunities.length > 0 && (
        <CardField
          title={"Damage Immunities: "}
          content={statBlock.damageImmunities.join(", ")}
        />
      )}

      {statBlock.conditionImmunities.length > 0 && (
        <CardField
          title={"Condition Immunities: "}
          content={statBlock.conditionImmunities.join(", ")}
        />
      )}

      <CardField title={"Senses: "} content={statBlock.sense.join(", ")} />
      <CardField
        title={"Languages: "}
        content={statBlock.language.join(", ")}
      />
      <CardField title={"Challenge: "} content={statBlock.challenge || "-"} />
      <CardField
        title={"Proficiency Bonus: "}
        content={statBlock.proficiency}
      />
      <div className="breakline"></div>
      {statBlock.trait.map((trait) => {
        return (
          <CardField title={`${trait.title}.`} content={trait.description} />
        );
      })}
      <Row className="mt-4">
        <Col>
          <h4>Actions</h4>
        </Col>
      </Row>
      <div className="breakline-sm"></div>
      {statBlock.action.map((action) => {
        return <Action action={action} />;
      })}
      {statBlock.bonusAction.length > 0 && (
        <>
          <Row className="mt-4">
            <Col>
              <h4>Bonus Actions</h4>
            </Col>
          </Row>

          <div className="breakline-sm"></div>

          {statBlock.bonusAction.map((action) => {
            return <Action action={action} />;
          })}
        </>
      )}
      {statBlock.reaction.length > 0 && (
        <>
          <Row className="mt-4">
            <Col>
              <h4>Reactions</h4>
            </Col>
          </Row>

          <div className="breakline-sm"></div>

          {statBlock.reaction.map((action) => {
            return <Action action={action} />;
          })}
        </>
      )}
    </Container>
  );
}
