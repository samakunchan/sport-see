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
    <div className={'optional-links'}>
      <h1>Projet 13 - OpenClassroom</h1>
      <div className={'links'}>
        <Link to={'/user/12'}>Tableau de bord de Karl</Link>
        <Link to={'/user/18'}>Tableau de bord de Cécilia</Link>
      </div>
    </div>
  );
};

export default OptionalLinksComponent;
