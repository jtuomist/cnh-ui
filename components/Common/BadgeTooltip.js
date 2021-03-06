import React from 'react';
import { Badge, Tooltip } from 'reactstrap';

class BadgeTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    return (
      <span>
        <Badge pill href="#" id={this.props.abbreviation}>{this.props.abbreviation}</Badge>
        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={this.props.abbreviation} toggle={this.toggle}>
          {this.props.name}
        </Tooltip>
      </span>
    );
  }
}

export default BadgeTooltip;
