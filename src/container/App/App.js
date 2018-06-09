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
            value: 0,
            placeholder: "",
        },
        error: {
            show: false,
            errorMessage: null
        },
        romanNumbers: ["I","V,","X","L","C","D","M"]
    }

    inputChangeHandler = (e) => {
        this.setState({
            ...this.state.numberConverter,
            numberConverter: {
                ...this.state.numberConverter.value,
                value: e.target.valueAsNumber
            }
        })
    }

    errorMessageHandler = (e) => {

        let inputType = e.target.type;
        let inputValueType = typeof e.target.valueAsNumber;

        if (inputType === inputValueType) {
            this.setState({
                ...this.state.error,
                error: {
                    show: false,
                    errorMessage: ""
                }
            })
        } else {
            this.setState({
                ...this.state.error,
                error: {
                    show: true,
                    errorMessage: "Please enter a correct value of type: " + inputType
                }
            })
        }
    }

    rbChangeHandler = (e) => {
        let selectedRadioButton = this.state.radioButtons.find(item => item.value === e.target.value);
        this.setState({
            ...this.state.numberConverter,
            numberConverter: {
                placeholder: selectedRadioButton.placeholder
            }
        })
    }


    render() {
        const rb = this.state.radioButtons.map(
            (item, i) => {
                return (<RadioButton
                    key={item.id}
                    name={item.name}
                    value={item.value}
                    labelValue={item.labelValue}
                    onchangeHandler={(e) => this.rbChangeHandler(e)}
                    checked
                />);
            }
        );

        return (

            <div className="App">
                <h1 style={{ textAlign: "center" }}>Number Converter from * to Roman</h1>
                <div style={{ marginBottom: "1em", textAlign: "center" }}>
                    {rb}
                </div>
                <NumberConverter
                    value={this.state.numberConverter.value}
                    placeholder={this.state.numberConverter.placeholder}
                    changeHandler={(e) => this.inputChangeHandler(e)}
                    errorToggle={this.state.error.show}
                    errorMessage={this.state.errorMessage}
                    onKeyPressed={e => this.errorMessageHandler(e)}
                />

                <span>{this.state.error.show ? this.state.error.errorMessage : null}</span>
            </div>
        );
    }
}

export default App;
