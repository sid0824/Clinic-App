import React, { Component } from 'react';
import { Modal } from 'antd';

class Support extends React.Component {
  state = {
    showSupportModal: true,
  };

  componentWillUpdate() {
    const { EnableModal } = this.props;

    console.log('test test', EnableSupModal);
    // this.setState({
    //     showSupportModal : EnableSupModal
    // })
  }

  EnablleSupportModal() {
    console.log('yes rendered');
  }

  render() {
    return (
      <div>
        <h4>New user</h4>
        <p>
          If you have any questions refer to our FAQs , otherwise please contact
          us through support@predikt-r.com.au
        </p>
      </div>
    );
  }
}

export default Support;
