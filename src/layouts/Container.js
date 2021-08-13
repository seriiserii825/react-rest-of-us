import React from 'react';
import PropTypes from 'prop-types';

Container.propTypes = {
  wide: PropTypes.bool
}

function Container({wide, children}) {
  return (
    <div className={"container  py-md-5 " + (wide ? '' : 'container--narrow')}>
      {children}
    </div>
  );
}

export default Container;