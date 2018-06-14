import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'react-table/react-table.css'
import MeshFilter from './containers/MeshFilter';
import MeshResults from './containers/MeshResults';
import Spinner from './components/Spinner';
import * as actionSelectors from './store/articles/reducer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="jumbotron">MEDLINE by MeSH</h1>
        </header>

        <div className="row justify-content-center align-center">
          <MeshFilter className="col col-md-auto"/>
          <Spinner loading={this.props.loading} className="col col-md-auto spinner" />
        </div>

        <MeshResults />
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state)  {
  return {
    loading: actionSelectors.getLoading(state)
  };
}

export default connect(mapStateToProps)(App);
