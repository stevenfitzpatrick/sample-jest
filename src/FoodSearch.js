import React, { Component } from 'react';
import Client from './Client';

const MATCHING_ITEM_LIMIT = 25;

export default class FoodSearch extends Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: ''
  };

  onSearchChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === '') {
      this.setState({
        foods: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });
      console.log('before client');
      Client.search(value, foods => {
        console.log('inside client');
        this.setState({
          foods: foods.slice(0, MATCHING_ITEM_LIMIT)
        });
      });
    }
  };

  onRemoveIconClick = e => {
    this.setState({
      foods: [],
      searchValue: '',
      showRemoveIcon: false
    });
  };

  render() {
    const { foods, showRemoveIcon, searchValue } = this.state;
    let removeIcon =
      showRemoveIcon &&
      <i className="remove icon" onClick={this.onRemoveIconClick} />;
    return (
      <section>
        <table>
          <tbody>
            {foods.map((food, idx) => (
              <tr key={idx} onClick={() => this.props.onFoodClick(food)}>
                <td>{food.description}</td>
                <td>{food.kcal}</td>
                <td>{food.protein_g}</td>
                <td>{food.fat_g}</td>
                <td>{food.carbohydrate_g}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <input
          placeholder="search"
          className="testing"
          type="text"
          value={searchValue}
          onChange={this.onSearchChange}
        />
        {removeIcon}
      </section>
    );
  }
}
