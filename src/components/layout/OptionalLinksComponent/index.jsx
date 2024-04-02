import './index.scss';
import { Link } from 'react-router-dom';
import React from 'react';

/**
 * Liens inutile et à supprimer lors de la version final
 * @return {Element}
 * @constructor
 */
const OptionalLinksComponent = () => {
  return (
    <div>
      <Link to={'/user/12'}>Karl</Link>
      <Link to={'/user/18'}>Cécilia</Link>
    </div>
  );
};

export default OptionalLinksComponent;
