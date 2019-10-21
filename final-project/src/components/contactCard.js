import React from 'react';
import { Card, Button, CardHeader, CardBody,
  CardTitle, CardText } from 'reactstrap';

const contactCard = (props) => {
  return (
    <div>
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Go somewhere</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default contactCard;
