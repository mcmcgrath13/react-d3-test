import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as articleActions from '../store/articles/actions';
import * as articleSelectors from '../store/articles/reducer';

class MeshFilter extends Component {

  handleChange(event) {
    this.props.dispatch(articleActions.changeFilter(event.target.value));
  }

  handleSubmit(event) {
    this.props.dispatch(articleActions.fetchArticles());
  }

  componentDidMount() {
    this.props.dispatch(articleActions.fetchArticles());
  }

  render() {
    return (
      <form className="MeshFilter form-inline" onSubmit={this.handleSubmit.bind(this)}>
        <div className="input-group">
          <input
            type="text"
            className="light"
            value={this.props.meshSearch}
            onChange={this.handleChange.bind(this)} />
          <input
            className="input-group-btn btn btn-success"
            type="submit"
            value="Search" />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    meshSearch: articleSelectors.getMeshSearch(state)
  };
}

export default connect(mapStateToProps)(MeshFilter);
