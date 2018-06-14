import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as articleSelectors from '../store/articles/reducer';
import MeshChart from '../components/MeshChart';
import MeshTable from '../components/MeshTable';

class MeshResults extends Component {

  render() {
    return (
      <div className="results">
        <MeshChart data={this.props.meshCounts} />
        <MeshTable data={this.props.meshArticles} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    meshArticles: articleSelectors.getArticles(state),
    meshCounts: articleSelectors.getMeshCounts(state)
  };
}

export default connect(mapStateToProps)(MeshResults);
