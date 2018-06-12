import React from 'react';
import { RingLoader } from 'react-spinners';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='sweet-loading'>
        <RingLoader
          color={'#123abc'}
          loading={this.props.loading}
        />
      </div>
    )
  }
}
