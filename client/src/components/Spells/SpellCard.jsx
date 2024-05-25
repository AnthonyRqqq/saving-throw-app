import { Container, Row, Col} from 'react-bootstrap'

export default function SpellCard (spell){
    return (
        <Container>
            <Row>
                <Col>---SPELL TITLE GOES HERE---</Col>
            </Row>

            <Row>
                <Col>SOURCE</Col>
            </Row>
            <Row>
                <Col>SCHOOL --- LEVEL</Col>
            </Row>

            <Row>
                <Col>CASTING TIME</Col>
            </Row>
            <Row>
                <Col>RANGE</Col>
            </Row>
            <Row>
                <Col>COMPONENTS</Col>
            </Row>
            <Row>
                <Col>DURATION</Col>
            </Row>

            <Row>
                <Col>DESCRIPTION</Col>
            </Row>

            <Row>
                <Col>AT HIGHER LEVELS</Col>
            </Row>

            <Row>
                <Col>Spell lists</Col>
            </Row>
        </Container>
    )
}