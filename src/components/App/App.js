import './App.scss';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../services/fileManager';
import { initRiskList } from '../../actions';

import Header from '../Header/Header';
import Portfolio from '../Portfolio/Portfolio';
import Calculator from '../Calculator/Calculator';

class App extends React.Component {

  async componentDidMount() {
    this.props.initRiskList(await loadData());
  }

  render () {
    return (
      <div >
        <BrowserRouter>
          <Header />
          <div className="grid-container">
            <Route path="/" exact component={Portfolio} />
            <Route path="/calculator" exact component={Calculator} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { portfolio: state.portfolio }
}

export default connect(mapStateToProps, { initRiskList })(App);