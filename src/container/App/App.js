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
        error: false,
        errorMessage: "something went wrong",
        keyPressed: false,
        loopIndex: 0,
        opValue: 0,
        conversionValue: "",
        operation: null,
        radioButtons: [
            {
                name: "nc-action",
                value: "d2r",
                placeholder: "Please enter a decimal number",
                labelValue: "Decimal to Roman",
                id: Math.floor((Math.random() * 999999) + 1),
                checked: false
            },
            {
                value: "b2r",
                name: "nc-action",
                placeholder: "Please enter a binary number",
                labelValue: "Binary to Roman",
                id: Math.floor((Math.random() * 999999) + 1),
                checked: false
            }
        ]
    }

    inputChangeHandler = (e) => {

        let numberConverterValue = 0;

        if (parseInt(e.target.value, 10)) {
            numberConverterValue = parseInt(e.target.value, 10);
        }

        if (this.state.operation && !this.state.error) {
            this.setState({
                ...this.state.numberConverter,
                numberConverter: {
                    ...this.state.numberConverter.value,
                    value: numberConverterValue
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

        if (!this.state.error) {
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
    }

    setConversionOperation = (radioButtonValue) => {
        switch (radioButtonValue) {
            case "d2r":
                return this.decimalsToRoman;
            case "b2r":
                return this.binaryToRoman;
            default:
                return
        }
    }

    decimalsToRoman = (value, romanNumbers, decimalNumbers) => {
        let errorMessage;

        if (value < 1 && this.state.keyPressed) {
            errorMessage = "this program only accepts numbers grater than 0"
            let errorArray = [true, errorMessage];

            return errorArray
        } else if (value > 3999 && this.state.keyPressed) {
            errorMessage = "this program can convert numbers until 3999";
            let errorArray = [true, errorMessage];

            return errorArray
        }

        let i = 0,
            romanNumber = "",
            localValue = value;

        while (localValue > 0) {
            if (localValue - decimalNumbers[i] >= 0) {
                romanNumber = romanNumber + romanNumbers[i]
                localValue = localValue - decimalNumbers[i]
            } else {
                i = i + 1
            }
        }

        return romanNumber;
    }

    binaryToRoman = (value, decimalNumbers, romanNumbers) => {
        let decimalNumber = 0;

        if (value) {
            decimalNumber = value.toString().split("").reduce((previousValue, n, i) => {
                if (n === "1" || n === "0") {
                    let binaryNumber = parseInt(n, 2);
                    return previousValue + (Math.pow(2, i) * binaryNumber)
                } else {
                    alert("please enter a valid binary numer for example 101");
                    return 0
                }
            }, 0)
        }

        if (decimalNumber > 0) {
            return this.decimalsToRoman(decimalNumber, decimalNumbers, romanNumbers)
        }
    }

    render() {

        const romanNumbers = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        const decimalNumbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

        let conversionHandlerParameters = [romanNumbers, decimalNumbers];


        const rb = this.state.radioButtons.map(
            (item, i) => {
                return (<RadioButton
                    key={item.id}
                    name={item.name}
                    value={item.value}
                    labelValue={item.labelValue}
                    onchangeHandler={(e) => this.rbChangeHandler(e, this.state.radioButtons)}
                />);
            }
        );

        return (

            <div className="App">
                <h1 style={{textAlign: "center"}}>Number Converter from * to Roman</h1>
                <div style={{marginBottom: "1em", textAlign: "center"}}>
                    <form>
                        {rb}
                    </form>
                </div>
                <NumberConverter
                    value={this.state.numberConverter.value}
                    placeholder={this.state.numberConverter.placeholder}
                    changeHandler={(e) => this.inputChangeHandler(e)}
                    errorToggle={this.state.error.show}
                    errorMessage={this.state.errorMessage}
                    conversionHandler={this.state.operation}
                    conversionHandlerParameters={conversionHandlerParameters}
                    conversionValue={this.state.conversionValue}
                />

            </div>
        );
    }
}

export default App;
