import './index.scss';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Page qui sert à afficher les messages d'érreurs dans les cas suivants :
 * - Serveur hors ligne
 * - Page non autorisé (message non implémenter actuellement)
 * - Session expiré (message non implémenter actuellement)
 * @param message
 * @return {Element}
 * @constructor
 */
const ErrorPage = ({ message }) => {
  return <h1>{message}</h1>;
};

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorPage;
