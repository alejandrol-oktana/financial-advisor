import React from 'react';

class CalculatorForm extends React.Component {

    state = { form: { bonds: '', largeCap: '', midCap: '', foreign: '', smallCap: ''} , error: false }

    onInputChange = e => {
      const { name, value } = e.target;
      let form = this.state.form;
      form[name] = value;
      this.setState( form );
    }

    isFormComplete() {
      return Object.values(this.state.form).every(x => (x !== null && x !== ''));
    }

    validateForm = e => {
      e.preventDefault();
      const { riskData } = this.props;
      let isPositiveNumber = true;
      riskData.forEach(column => {
        if(!/^\d+$/.test(this.state.form[column.key])) {
          isPositiveNumber = false;
        };
      })
      if (isPositiveNumber) {
        this.props.onFormSubmit(this.state.form);
        this.setState({ error: false });
      } else {
        this.props.onFormSubmit(null);
        this.setState({ error: true });
      }
    }

    renderError() {
      if (!this.state.error) { return null;}
      return (
        <div>
          <p style={{ color: 'red', fontSize: '19px' }}><b>Invalid Input: inputs should be positive numbers or zero (e.g: 0, 1, 2, ...)</b></p>
        </div>
      )
    }

    renderInputs() {
      const { riskData } = this.props;
      if (!riskData) { return null }
      return riskData.map(column => {
        return(
          <div key={column.label} className="medium-2 small-6 cell">
            <label>{column.label} $
              <input type="text" name={column.key} value={this.state.form[column.key]} onChange={this.onInputChange}/>
            </label>
          </div>
        );
      })
    }

   render() {
    return(
      <form>
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            {this.renderInputs()}
            <div className="medium-2 small-6 calculator-rebalance-cntr">
              <input 
                type="submit"
                className="button"
                value="Rebalance"
                onClick={this.validateForm}
                disabled={!this.isFormComplete()}
              />
            </div>
          </div>
        </div>
        {this.renderError()}
      </form>
    )
  }
};

export default CalculatorForm;