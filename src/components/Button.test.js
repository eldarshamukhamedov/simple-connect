import React from 'react';
import { Button } from './Button';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('Button', () => {
  it('should display button label', () => {
    const wrapper = shallow(<Button label="Test" />);
    expect(wrapper.find('.button').exists()).toBe(true);
    expect(wrapper.find('.button').text()).toEqual('Test');
  });

  it('should indicate when button is disabled', () => {
    const wrapper = shallow(<Button label="Test" disabled />);
    expect(wrapper.find('.button').hasClass('disabled')).toBe(true);
  });

  it('should ignore clicks when disabled', () => {
    const onClickSpy = spy();
    const wrapper = shallow(
      <Button label="Test" disabled onClick={onClickSpy} />
    );
    wrapper.find('.button').simulate('click');
    expect(onClickSpy.calledOnce).toBe(false);
  });

  it('should handle clicks when enabled', () => {
    const onClickSpy = spy();
    const wrapper = shallow(<Button label="Test" onClick={onClickSpy} />);
    wrapper.find('.button').simulate('click');
    expect(onClickSpy.calledOnce).toBe(true);
  });
});
