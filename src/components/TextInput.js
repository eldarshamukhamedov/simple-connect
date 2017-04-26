import React, { Component } from 'react';
import classNames from 'classnames';
import { string, bool, func } from 'prop-types';
import './TextInput.css';

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  render() {
    return (
      <div
        className={classNames('text-input', {
          active: this.state.active,
          error: this.props.error,
          disabled: this.props.disabled
        })}
      >
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          ref={ref => this.inputElement = ref}
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onFocus={() => this.setState({ active: true })}
          onBlur={() => this.setState({ active: false })}
          onChange={event =>
            !this.props.disabled && this.props.onInput(event.target.value)}
          disabled={this.props.disabled}
        />
        <div className="input-line" />
        <div className="helper-text">{this.props.helperText}</div>
      </div>
    );
  }
}
TextInput.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
  helperText: string.isRequired,
  error: bool.isRequired,
  disabled: bool.isRequired,
  onInput: func.isRequired
};
TextInput.defaultProps = {
  label: 'Label',
  placeholder: 'Placeholder',
  helperText: 'Helper text',
  error: false,
  disabled: false,
  onInput(value) {
    console.warn(`Input value=${value}`);
  }
};
