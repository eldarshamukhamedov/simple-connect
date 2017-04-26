import React from 'react';
import { TextInput } from './TextInput';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

describe('TextInput', () => {
  it('should display input label', () => {
    const wrapper = shallow(<TextInput id="text-test" label="Test" />);
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toEqual('Test');
    expect(wrapper.find('label').props().htmlFor).toEqual('text-test');
  });

  it('should display text input', () => {
    const wrapper = shallow(<TextInput id="text-test" />);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should display placeholder when no selection has been made', () => {
    const wrapper = shallow(<TextInput id="text-test" placeholder="Test" />);
    expect(wrapper.find('input').props().placeholder).toEqual('Test');
    expect(wrapper.find('input').props().id).toEqual('text-test');
  });

  it('should indicate that an error has occurred', () => {
    const wrapper = shallow(<TextInput id="text-test" error />);
    expect(wrapper.find('.text-input').hasClass('error')).toBe(true);
  });

  it('should indicate that input is disabled', () => {
    const wrapper = shallow(<TextInput id="text-test" disabled />);
    expect(wrapper.find('.text-input').hasClass('disabled')).toBe(true);
  });

  it('should not allow input when disabled', () => {
    const onInputSpy = spy();
    const wrapper = mount(
      <TextInput id="text-test" disabled onInput={onInputSpy} />
    );
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(onInputSpy.calledOnce).toBe(false);
  });

  it('should update input value on user input', () => {
    const onInputSpy = spy();
    const wrapper = mount(<TextInput id="text-test" onInput={onInputSpy} />);
    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(onInputSpy.calledWith('Hello')).toBe(true);
  });

  it('should indicate that input is active when focused', () => {
    const wrapper = mount(<TextInput id="text-test" />);
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('.text-input').hasClass('active')).toBe(true);
  });

  it('should not indicate that input is active when blurred', () => {
    const wrapper = mount(<TextInput id="text-test" />);
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('.text-input').hasClass('active')).toBe(true);
    wrapper.find('input').simulate('blur');
    expect(wrapper.find('.text-input').hasClass('active')).toBe(false);
  });
});
