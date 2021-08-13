import React, { useEffect } from 'react';
import Container from "./Container";
import PropTypes from "prop-types";

Page.propTypes = {
  title: PropTypes.string.isRequired,
  wide: PropTypes.bool
}

function Page({ title, children, wide }) {
  useEffect(() => {
    document.title = `${title} | Complex App`;
    window.scrollTo(0, 0);
  }, [title])
  return (
    <Container wide={wide}>
      {children}
    </Container>
  );
}

export default Page;