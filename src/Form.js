import React, { Component } from 'react';

export default class Form extends Component {
  state = {
    items: [],
    item: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      items: [...this.state.items, this.state.item],
      item: ''
    });
  };

  handleInput = e => {
    this.setState({
      item: e.target.value
    });
  };

  render() {
    const { item, items } = this.state;
    let disabled = !item;
    return (
      <div className="App">
        <table>
          <th>Items</th>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <input value={item} type="text" onChange={this.handleInput} />
          <button type="submit" disabled={disabled}>Submit</button>
        </form>
      </div>
    );
  }
}
