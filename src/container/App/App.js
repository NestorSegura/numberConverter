import React, { Component } from 'react';
import './App.css';
import NumberConverter from '../../components/NumberConverter/NumberConverter';
import RadioButton from '../../components/utilities/RadioButton.js';

class App extends Component {
  state = {
    radioButtons: [

        {
            name: "nc-action",
            value: "d2r",
            placeholder: "Please enter a decimal number",
            labelValue: "Decimal to Roman",
            id: Math.floor((Math.random() * 999999) + 1)
        },
        {
            value: "b2r",
            name: "nc-action",
            placeholder: "Please enter a binary number",
            labelValue: "Binary to Roman",
            id: Math.floor((Math.random() * 999999) + 1)
        }
    ],
    numberConverter: {
        value: "",
        placeholder: ""
    }
  }

  inputChangeHandler = (e) => {
    this.setState({
        ...this.state.numberConverter,
        numberConverter: {
            ...this.state.numberConverter.value,
            value: e.target.value
        }
     })
  }

  rbChangeHandler = (e) => {
    let selectedRadioButton = this.state.radioButtons.find(item => item.name === e.target.name);
    console.log(selectedRadioButton)
    this.setState({
        ...this.state.numberConverter,
        numberConverter: {
            placeholder: selectedRadioButton.placeholder
        }
    })
  }



  render() {

    const rb = this.state.radioButtons.map(
        item => (<RadioButton
                    key={item.id}
                    name={item.name}
                    value={item.value}
                    labelValue={item.labelValue}
                    onchangeHandler={(e) => this.rbChangeHandler(e)} />)
        );

    return (

      <div className="App">
        <h1 style={{textAlign: "center"}}>Number Converter from * to Roman</h1>
        <div style={{marginBottom: "1em", textAlign: "center"}}>
            {rb}
        </div>
        <NumberConverter
            value={this.state.numberConverter.value}
            placeholder={this.state.numberConverter.placeholder}
            changeHandler={ (e) => this.inputChangeHandler(e)} />

      </div>
    );
  }
}

export default App;
