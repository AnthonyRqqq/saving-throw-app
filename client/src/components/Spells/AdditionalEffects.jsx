import { Row, Col } from "react-bootstrap";

// Handles iterating through and rendering each item of an effects array for a spell card
export default function AdditionalEffects({ effectsArray }) {
  console.log(effectsArray);

  const renderEffectsArray = (effectsArray) => {
    return effectsArray.map((effect, index) => {
      return (
        <div className="spellCardField pb-3" key={index}>
          {effect}
        </div>
      );
    });
  };

  return (
    <Row className="spellDescription pt-0 pb-4">
      <Col>{renderEffectsArray(effectsArray)}</Col>
    </Row>
  );
}
