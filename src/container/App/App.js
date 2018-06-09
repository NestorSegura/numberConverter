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
        romanNumbers: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
        decimalNumbers: [1000,900,500,400,100,90,50,40,10,9,5,4,1],
        loopIndex: 0,
        opValue: 0,
        conversionValue: "",
        operation: null
    }


    inputChangeHandler = (e) => {        
        if(this.state.operation) {
            this.setState({
                ...this.state.numberConverter,
                numberConverter: {
                    ...this.state.numberConverter.value,
                    value: e.target.valueAsNumber
                }
            })
    
            if(this.state.opValue !== 0) {
                this.setState({opValue: this.state.numberConverter.value})
            }
        }else {
            alert("please select an option to start the conversion")
        }
        
        
    }

    rbChangeHandler = (e) => {
        let selectedRadioButton = this.state.radioButtons.find(item => item.value === e.target.value);
        this.setState({
            ...this.state.numberConverter,
            numberConverter: {
                placeholder: selectedRadioButton.placeholder
            },
            operation: this.setConversionOperation(selectedRadioButton.value)
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

    setConversionOperation = (radioButtonValue) => {
        switch(radioButtonValue) {
            case "d2r": 
               return this.decimalsToRoman;
        }
    }

    decimalsToRoman = (value) => {
            // not working 
            if( value < 1) {
                alert("this program only accepts numbers grater than 0")
                this.setState({
                    ...this.state.numberConverter,
                    numberConverter: {
                        value: 0
                    },
                    conversionValue: ""
                })
            }else if(value > 3999) {
                alert("this program only accepts numbers until 3999")
                this.setState({
                    ...this.state.numberConverter,
                    numberConverter: {
                        value: 0
                    },
                    conversionValue: ""
                })
            }
            let i = 0;
            let romanNumber =""; 
            let localValue = value; 
            while(localValue > 0) {
                if(localValue - this.state.decimalNumbers[i] >= 0) {
                    romanNumber = romanNumber + this.state.romanNumbers[i]
                    localValue = localValue - this.state.decimalNumbers[i]
                }else {
                   i = i+1
                }
            }

            return romanNumber;
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
                    decimalToRomanHandler = {this.state.operation}
                    conversionValue = {this.state.conversionValue}
                />

                <span>{this.state.error.show ? this.state.error.errorMessage : null}</span>
            </div>
        );
    }
}

export default App;
