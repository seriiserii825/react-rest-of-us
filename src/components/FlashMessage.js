import React from 'react';

function FlashMessage({ msg }) {
  return (
    <div className="floating-alerts">
      <div className="alert alert-success text-center floating-alert shadow-sm">{msg}</div>
    </div>
  );
}

export default FlashMessage;