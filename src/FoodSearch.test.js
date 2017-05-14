import React from 'react';
import { shallow } from 'enzyme';
import FoodSearch from './FoodSearch';
import Client from './Client';

jest.mock('./Client');

describe('Foodsearch', () => {
  let wrapper;
  const onFoodClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<FoodSearch onFoodClick={onFoodClick} />);
  });

  afterEach(() => {
    Client.search.mockClear();
    onFoodClick.mockClear();
  });

  test('should not display the remove icon', () => {
    expect(wrapper.containsMatchingElement('<i>')).toBe(false);
    expect(wrapper.find('.remove .icon').length).toBe(0);
  });

  test('does not have any row elements', () => {
    expect(wrapper.find('tbody tr').length).toEqual(0);
  });
  describe('user populates search field', () => {
    const value = 'brocc';
    beforeEach(() => {
      // Simulate Typing
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: {
          value
        }
      });
    });

    test('should update state correctlye', () => {
      expect(wrapper.state().searchValue).toEqual(value);
    });

    test('should display the remove icon', () => {
      expect(wrapper.find('.remove .icon').length).toEqual(1);
      expect(wrapper.containsMatchingElement(<i />)).toBe(true);
    });

    test('it should call the api with entered items', () => {
      const invocationArgs = Client.search.mock.calls[0];

      expect(invocationArgs[0]).toEqual(value);
    });

    describe('and API returns result', () => {
      const FOODS = [
        {
          description: 'Broccoli',
          kcal: '100',
          protein_g: '11',
          fat_g: '11',
          carbohydrate_g: '31'
        },
        {
          description: 'Broccoli 2',
          kcal: '100',
          protein_g: '11',
          fat_g: '11',
          carbohydrate_g: '31'
        }
      ];

      beforeEach(() => {
        const invocationArgs = Client.search.mock.calls[0];
        const cb = invocationArgs[1];
        cb(FOODS);
        wrapper.update();
      });

      it('should set state correctly', () => {
        expect(wrapper.state().foods).toEqual(FOODS);
      });

      it('should have 2 rows', () => {
        expect(wrapper.find('tbody tr').length).toEqual(2);
      });

      it('should render first description', () => {
        expect(wrapper.html()).toContain(FOODS[0].description);
      });

      describe('then user clicks on food item', () => {
        beforeEach(() => {
          const foodRow = wrapper.find('tbody tr').first();
          foodRow.simulate('click');
        });

        test('should call props with first food item ', () => {
          const food = FOODS[0];
          expect(onFoodClick.mock.calls[0]).toEqual([food]);
        });

        describe('and then user types some more', () => {
          beforeEach(() => {
            const input = wrapper.find('input').first();
            input.simulate('change', {
              target: {
                value: `${value}x`
              }
            });
          });

          test('input should match state', () => {
            expect(wrapper.state().searchValue).toEqual(`${value}x`);
          });

          describe('and api returns no results', () => {
            beforeEach(() => {
              console.log(Client.search.mock.calls);
            });

            test('and no results reutn', () => {
              console.log(Client.search.mock.calls);
            });
          });
        });
      });
    });
  });
});
