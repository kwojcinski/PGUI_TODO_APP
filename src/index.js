import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function List(props) {
  return (
    <ul>
      {props.lista.map((v, i) => (
        <li key={i}>
          <input
            type="checkbox"
            value={v.name}
            onClick={e => props.onClickCheckbox(v, e)}
            checked={v.done}
          />
          {v.name}
        </li>
      ))}
    </ul>
  );
}
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tekst: "" };
  }
  keyPressed(event) {
    if (event.key === "Enter") {
      this.props.onEnter(this.state.tekst);
      this.setState({ tekst: "" });
    }
  }

  onChange = el => {
    this.setState({ tekst: el.target.value });
  };

  render() {
    return (
      <input
        value={this.state.tekst}
        onChange={this.onChange}
        onKeyPress={el => {
          this.keyPressed(el);
        }}
      />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tekst: "",
      lista: []
    };
  }

  onEnter = element => {
    console.log(element);
    this.setState((state, props) => {
      state.lista = [...this.state.lista, { name: element, done: false }];

      console.log(state.lista);
      return state;
    });
  };
  onClickCheckbox = (v, el) => {
    console.log(v);
    v.done = !v.done;
    this.setState({ lista: this.state.lista });
  };
  render() {
    return (
      <div className="App">
        <h1>PGUI L06 2019Z</h1>
        <Input tekst="" onEnter={this.onEnter} />
        <div>TO DO</div>
        <List
          onClickCheckbox={this.onClickCheckbox}
          lista={this.state.lista.filter(v => v.done === false)}
        />
        <div>DONE</div>
        <List
          onClickCheckbox={this.onClickCheckbox}
          lista={this.state.lista.filter(v => v.done === true)}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
