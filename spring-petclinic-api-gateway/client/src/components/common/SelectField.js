import { Col, Form, FormControl, Row } from 'react-bootstrap'

export function SelectField({ name, label, value, options = [], onChange, error }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>{label}</Form.Label>
      <Col sm={10}>
        <FormControl as="select" isInvalid={error} name={name} value={value} onChange={onChange}>
          {options.map(i => (
            <option value={i.value}>{i.label}</option>
          ))}
        </FormControl>
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}
