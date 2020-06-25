import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import { REDIRECT_URL } from 'utils/api';
import { Button } from 'antd';
import Success from '../../images/success.png';
import history from '../../utils/history';

class Thankyou extends React.Component {
  state = {
    showSupportModal: true,
    email: '',
  };

  componentWillMount() {
    const { email } = history.location.state;
    this.setState({
      email,
    });
  }

  getInvoiceIdFn = () => {
    const id = this.props.user_data.invoiceObj.invoice_id;
    return id.slice(3);
  };

  goToLogin = () => {
    console.log('PEDGING: ---- LOGIN REDIRECT PENDING.....');
    window.location = REDIRECT_URL;
  };

  render() {
    const { email } = this.state;
    return (
      <div className="pr-thank-wrap">
        <TweenOne
          className="banner-user-title"
          animation={{ y: 30, opacity: 0, type: 'from' }}
        >
          <img className="img-fluid" src={Success} alt="predikt-r" />
        </TweenOne>

        <TweenOne
          className="banner-user-text"
          animation={{ y: 30, opacity: 0, type: 'from', delay: 150 }}
        >
          <h1>Thanks for signing up with us. </h1>

          <p>
            Check your email to verify your account, Not in your inbox? It may
            be in the spam folder of {email}.
          </p>
        </TweenOne>

        {this.props.plan_name !== 'F' ? (
          <TweenOne
            className="banner-user-text"
            animation={{ y: 30, opacity: 0, type: 'from', delay: 250 }}
          >
            <div className="invoice_id">
              Invoice ID : {this.getInvoiceIdFn()}{' '}
            </div>
          </TweenOne>
        ) : (
          ''
        )}

        <TweenOne
          className="banner-user-text"
          animation={{ y: 30, opacity: 0, type: 'from', delay: 400 }}
        >
          <Button onClick={this.goToLogin} className="cl-fill" type="primary">
            Okay got it
          </Button>
        </TweenOne>
      </div>
    );
  }
}

export default Thankyou;
