import React, { Component } from 'react';
import classNames from 'classnames';
import { string, bool, func, arrayOf } from 'prop-types';
import './SelectInput.css';

export class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };

    this.onClickAway = this.onClickAway.bind(this);
  }

  onClickAway() {
    this.setState({ expanded: false });
    document.removeEventListener('click', this.onClickAway);
  }

  onExpandDropdown() {
    this.setState({ expanded: true });
    document.addEventListener('click', this.onClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickAway);
  }

  render() {
    // Input can be disabled externally, or if there are no items to display
    const disabled = this.props.disabled || this.props.options.length < 1;

    return (
      <div
        className={classNames('select-input', {
          empty: !this.props.options.includes(this.props.value),
          expanded: this.state.expanded,
          error: this.props.error,
          disabled
        })}
      >
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <button
          id={this.props.id}
          type="button"
          onClick={event => !disabled && this.onExpandDropdown()}
          disabled={disabled}
        >
          <div className="selected-text">
            {this.props.value || this.props.placeholder}
          </div>
          <div className="dropdown-arrow" />
        </button>
        <div className="input-line" />
        <div className="helper-text">{this.props.helperText}</div>
        {!disabled &&
          <ul className="dropdown-menu">
            {this.props.options.map(option => (
              <li key={option} onClick={() => this.props.onInput(option)}>
                {option}
              </li>
            ))}
          </ul>}
      </div>
    );
  }
}
SelectInput.propTypes = {
  id: string.isRequired,
  value: string,
  options: arrayOf(string).isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
  helperText: string.isRequired,
  error: bool.isRequired,
  disabled: bool.isRequired,
  onInput: func.isRequired
};
SelectInput.defaultProps = {
  options: [],
  label: 'Label',
  placeholder: 'Placeholder',
  helperText: 'Helper text',
  error: false,
  disabled: false,
  onInput(option) {
    console.warn(`Selected options=${option}`);
  }
};
