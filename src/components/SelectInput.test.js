import React from 'react';
import { SelectInput } from './SelectInput';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('SelectInput', () => {
  beforeEach(() => {
    spy(SelectInput.prototype, 'onExpandDropdown');
  });

  afterEach(() => {
    SelectInput.prototype.onExpandDropdown.restore();
  });

  it('should display input label', () => {
    const wrapper = shallow(<SelectInput id="select-test" label="Test" />);
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toEqual('Test');
  });

  it('should display select button', () => {
    const wrapper = shallow(<SelectInput id="select-test" />);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('.dropdown-arrow').exists()).toBe(true);
  });

  it('should display placeholder when no selection has been made', () => {
    const wrapper = shallow(
      <SelectInput id="select-test" placeholder="Test" />
    );
    expect(wrapper.find('.select-input').hasClass('empty')).toBe(true);
    expect(wrapper.find('.selected-text').exists()).toBe(true);
    expect(wrapper.find('.selected-text').text()).toEqual('Test');
  });

  it('should display selected value', () => {
    const wrapper = shallow(
      <SelectInput
        id="select-test"
        placeholder="Test"
        selected="California"
        options={['California']}
      />
    );
    expect(wrapper.find('.selected-text').exists()).toBe(true);
    expect(wrapper.find('.selected-text').text()).toEqual('California');
  });

  it('should indicate that an error has occurred', () => {
    const wrapper = shallow(<SelectInput id="select-test" error />);
    expect(wrapper.find('.select-input').hasClass('error')).toBe(true);
  });

  it('should indicate that input is disabled', () => {
    const wrapper = shallow(<SelectInput id="select-test" disabled />);
    expect(wrapper.find('.select-input').hasClass('disabled')).toBe(true);
  });

  it('should expand dropdown on click', () => {
    const wrapper = shallow(
      <SelectInput id="select-test" options={['California']} />
    );
    expect(wrapper.state('expanded')).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('expanded')).toBe(true);
    expect(SelectInput.prototype.onExpandDropdown.calledOnce).toBe(true);
  });

  it('should collapse dropdown on click away', () => {
    const wrapper = shallow(
      <SelectInput id="select-test" options={['California']} />
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.state('expanded')).toBe(true);
    console.log(document.onclick);
    document.querySelector('body').click();
    expect(wrapper.state('expanded')).toBe(false);
  });

  it('should not expand dropdown when disabled', () => {
    const wrapper = shallow(<SelectInput id="select-test" disabled />);
    expect(wrapper.state('expanded')).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('expanded')).toBe(false);
    expect(SelectInput.prototype.onExpandDropdown.calledOnce).toBe(false);
  });

  it('should not display dropdown DOM when disabled', () => {
    const wrapper = shallow(
      <SelectInput id="select-test" disabled options={['California']} />
    );
    expect(wrapper.find('.dropdown-menu').exists()).toBe(false);
  });

  it('should not expand dropdown when there are no options', () => {
    const wrapper = shallow(<SelectInput id="select-test" />);
    expect(wrapper.state('expanded')).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('expanded')).toBe(false);
    expect(SelectInput.prototype.onExpandDropdown.calledOnce).toBe(false);
  });

  it('should not display dropdown DOM when there are no options', () => {
    const wrapper = shallow(<SelectInput id="select-test" />);
    expect(wrapper.find('.dropdown-menu').exists()).toBe(false);
  });

  it('should update selected value on dropdown menu click', () => {
    const onSelectSpy = spy();
    const wrapper = shallow(
      <SelectInput
        id="select-test"
        options={['California']}
        onSelect={onSelectSpy}
      />
    );
    wrapper.find('.dropdown-menu li').simulate('click');
    expect(onSelectSpy.calledWith('California')).toBe(true);
  });
});
