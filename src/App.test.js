import React from 'react';
import Form from './Form';
import { shallow } from 'enzyme';

describe('test harness', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  it('should pass one test', () => {
    expect(wrapper.contains(<th>Items</th>)).toEqual(true);
  });

  test('it should have a button', () => {
    expect(wrapper.containsMatchingElement(<button>Submit</button>)).toBe(true);
  });

  test('Should have an input', () => {
    expect(wrapper.containsMatchingElement(<input type="text" />)).toBe(true);
  });

  test('button should be disabled', () => {
    const button = wrapper.find('button').first();
    expect(button.props().disabled).toBe(true);
  });

  describe('User interacts with the app', () => {
    const item = 'Vancouver';
    beforeEach(() => {
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: {
          value: item
        }
      });
    });

    test('should set state correctly', () => {
      expect(wrapper.state().item).toEqual(item);
    });

    test('it should enable the button', () => {
      const button = wrapper.find('button').first();
      expect(button.props().disabled).toBe(false);
    });

    describe('And then submits the form', () => {
      beforeEach(() => {
        const form = wrapper.find('form').first();
        form.simulate('submit', {
          preventDefault: () => {}
        });
      });

      test('new item is in state', () => {
        expect(wrapper.state().items).toContain(item);
      });

      test('item is displayed in the table', () => {
        expect(wrapper.find('table').first().contains(<td>{item}</td>)).toBe(
          true
        );
      });

      test('should clear the input field', () => {
        expect(wrapper.find('input').first().props().value).toEqual('');
      });
    });
  });

  describe('And then clears', () => {
    beforeEach(() => {
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: {
          value: ''
        }
      });
    });

    test('it should disable the button', () => {
      const button = wrapper.find('button').first();
      expect(button.props().disabled).toBe(true);
    });
  });
});
