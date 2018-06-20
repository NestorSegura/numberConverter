import React, {Component} from 'react';
import './App.css';
import NumberConverter from '../../components/NumberConverter/NumberConverter';
import RadioButton from '../../components/utilities/RadioButton.js';

class App extends Component {
    state = {
        numberConverter: {
            value: 0,
            placeholder: "",
        },
        error: {
            show: false,
            errorMessage: null
        },
        keyPressed: false,
        romanNumbers: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
        decimalNumbers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
        binaryNumbers: [512, 256, 128, 64, 32, 16, 8, 4, 2, 1],
        loopIndex: 0,
        opValue: 0,
        conversionValue: "",
        operation: null
    }

    inputChangeHandler = (e) => {
        if (this.state.operation) {
            this.setState({
                ...this.state.numberConverter,
                numberConverter: {
                    ...this.state.numberConverter.value,
                    value: e.target.valueAsNumber
                },
                keyPressed: true
            })

            if (this.state.opValue !== 0) {
                this.setState({opValue: this.state.numberConverter.value})
            }
        } else {
            alert("please select an option to start the conversion")
        }


    }

    rbChangeHandler = (e, radioButtons) => {
        let selectedRadioButton = radioButtons.find(item => item.value === e.target.value);
        this.setState({
            ...this.state.numberConverter,
            numberConverter: {
                value: "",
                placeholder: selectedRadioButton.placeholder
            },
            keyPressed: false,
            operation: this.setConversionOperation(selectedRadioButton.value)
        })
    }

    setConversionOperation = (radioButtonValue) => {
        switch (radioButtonValue) {
            case "d2r":
                return this.decimalsToRoman;
                break;
            case "b2r":
                return this.binaryToRoman;
        }
    }

    decimalsToRoman = (value) => {
        if (value < 1 && this.state.keyPressed) {
            alert("this program only accepts numbers grater than 0")
            this.setState({
                ...this.state.numberConverter,
                numberConverter: {
                    value: 0
                },
                conversionValue: ""
            })
        } else if (value > 3999 && this.state.keyPressed) {
            alert("this program only accepts numbers until 3999")
            this.setState({
                ...this.state.numberConverter,
                numberConverter: {
                    value: 0
                },
                conversionValue: ""
            })
        }
        let i = 0,
            romanNumber = "",
            localValue = value;

        while (localValue > 0) {
            if (localValue - this.state.decimalNumbers[i] >= 0) {
                romanNumber = romanNumber + this.state.romanNumbers[i]
                localValue = localValue - this.state.decimalNumbers[i]
            } else {
                i = i + 1
            }
        }

        return romanNumber;
    }

    binaryToRoman = (value) => {
        let decimalNumber = 0;

        if (value) {
            if (value.toString().length < 10) {
                let binaryToDecimal = value.toString().split("").map((n, i) => {
                    if (n === "1" || n === "0") {
                        if (n === "1") {
                            decimalNumber += this.state.binaryNumbers[i];
                        }
                    } else {
                        alert("please enter a valid binary numer for example 101");
                        this.setState({
                            ...this.state.numberConverter,
                            numberConverter: {
                                value: ""
                            }
                        })
                    }
                })
            } else {
                alert("this function only accepts binary numbers until 10 digits")

                this.setState({
                    ...this.state.numberConverter,
                    numberConverter: {
                        value: ""
                    }
                })
            }
        }

        if (decimalNumber > 0) {
            return this.decimalsToRoman(decimalNumber)
        }
    }

    render() {

        const radioButtons = [
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
        ]

        const rb = radioButtons.map(
            (item, i) => {
                return (<RadioButton
                    key={item.id}
                    name={item.name}
                    value={item.value}
                    labelValue={item.labelValue}
                    onchangeHandler={(e) => this.rbChangeHandler(e, radioButtons)}
                    checked
                />);
            }
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
                    changeHandler={(e) => this.inputChangeHandler(e)}
                    errorToggle={this.state.error.show}
                    errorMessage={this.state.errorMessage}
                    conversionHandler={this.state.operation}
                    conversionValue={this.state.conversionValue}
                />

                <span>{this.state.error.show ? this.state.error.errorMessage : null}</span>
            </div>
        );
    }
}

export default App;
