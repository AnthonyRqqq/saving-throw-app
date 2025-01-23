import { Container, Row, Col, Card } from "react-bootstrap";
import CardField from "../Templates/CardField";

import './StatBlock.css'

export default function StatBlock({ statBlock }) {
  return (
    <Container className="mt-4 statBlock">
      <Row>
        <Col>
          <h2 className="spellCardName">{statBlock.name}</h2>
        </Col>
      </Row>

      <CardField content={`${statBlock.size} ${statBlock.type}`} />
      <CardField title={"Armor Class: "} content={statBlock.armorClass} />
      <CardField title={"Speed: "} content={statBlock.speed} />

      <Row>
        <Col>
          <div>STR</div> {statBlock.strength}
        </Col>

        <Col>
          <div>DEX</div> {statBlock.dexterity}
        </Col>

        <Col>
          <div>CON</div> {statBlock.constitution}
        </Col>

        <Col>
          <div>WIS</div> {statBlock.wisdom}
        </Col>

        <Col>
          <div>INT</div> {statBlock.intelligence}
        </Col>

        <Col>
          <div>CHA</div> {statBlock.charisma}
        </Col>
      </Row>

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

      {statBlock.trait.map((trait) => {
        return <CardField title={trait.title} content={trait.description} />;
      })}

      <Row>
        <Col>
          <h3 className="spellCardName">Actions</h3>
        </Col>
      </Row>

      {statBlock.action.map((action) => {
        return (
          <Row className="spellCardField">
            <Col>
              <div className="fieldTitle">{action.title}. </div>
              {action.type && <div>{action.type}: </div>}
              {action.hitBonus && <div>{action.hitBonus}, </div>}
              {action.range && <div>{action.range}, </div>}
              {action.target && <div>{action.target}, </div>}
              {action.description}
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}
