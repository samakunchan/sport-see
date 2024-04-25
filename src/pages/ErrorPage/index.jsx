import './index.scss';
import { ErrorUtil } from '../../core/utils/error-util';
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
  return (
    <>
      {message === ErrorUtil.messageNotFound ? (
        <>
          <h1>{message}</h1>
          <p>Possibilités : </p>
          <ul className={'case-error'}>
            <li>L'utilisateur n'existe pas.</li>
            <li>J'ai remplacé les endpoints de l'API (voir documentation).</li>
          </ul>
        </>
      ) : (
        <h1>{message}</h1>
      )}
    </>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorPage;
