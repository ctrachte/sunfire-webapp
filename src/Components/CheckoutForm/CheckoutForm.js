import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './CheckoutForm.css';

function CheckoutForm({ stripe, totalCost }) {
  const [status, setStatus] = useState('default');

  const submit = async e => {
    e.preventDefault();

    setStatus('submitting');

    try {
      let { token } = await stripe.createToken({ name: 'Name' });

      let response = await fetch('/.netlify/functions/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: totalCost * 100,
          token: token.id,
        }),
      });

      if (response.ok) {
        setStatus('complete');
        // try {
    
        //   let response = await fetch('/.netlify/functions/invoice', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       to: 'cetrachte@hotmail.com',
        //       from: 'cetrachte@hotmail.com',
        //       subject: 'Your Purchase from Sunfire Hot Sauce',
        //       text: 'purchase from sunfire hot sauce ...',
        //       html: '<strong>Enjoy!</strong>',
        //     }),
        //   });
    
        //   if (response.ok) {
        //     setStatus('complete');
        //   } else {
        //     throw new Error('Network response for Sendgrid API was not ok.');
        //   }
        // } catch (err) {
        //   setStatus('error');
        // }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'complete') {
    return <div className="CheckoutForm-complete">Payment successful!</div>;
  }

  return (
    <form className="CheckoutForm" onSubmit={submit}>
      <h4>Enter info and click submit to complete your order!</h4>
      <CardElement />
      <button
        className="CheckoutForm-button"
        type="submit"
        disabled={status === 'submitting' || totalCost === 0}
      >
        {status === 'submitting' ? 'Submitting' : 'Submit Order'}
      </button>
      {status === 'error' && (
        <div className="CheckoutForm-error">Something went wrong.</div>
      )}
    </form>
  );
}

export default injectStripe(CheckoutForm);