import React from 'react'

function StripePay() {
  return (
    <div>
        <form action="http://localhost:4242/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
    </div>
  )
}

export default StripePay