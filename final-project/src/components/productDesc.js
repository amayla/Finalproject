import React from 'react';
import { UncontrolledAlert } from 'reactstrap';


export class ProductDesc extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <UncontrolledAlert color="primary" isOpen={this.state.visible} toggle={this.onDismiss} fade={false}>
          I am a primary alert and I can be dismissed without animating!
        </UncontrolledAlert>
      </div>
    );
  }
}

