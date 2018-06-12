import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class MeshTable extends Component {
  render() {
    const columns = [{
      Header: 'PMID',
      accessor: 'pmid',
      minWidth: 50,
      maxWidth: 100
    }, {
      Header: 'Title',
      accessor: 'title',
      minWidth: 250
    }, {
      Header: 'Authors',
      accessor: 'authors',
      minWidth: 150
    }, {
      Header: 'Publication Year', // Custom header components!
      accessor: 'pubYear',
      minWidth: 100,
      maxWidth: 200
    }]

    return(
      <ReactTable
        data={this.props.data}
        columns={columns}
        className="-striped -highlight"
        />
    );
  }
}
