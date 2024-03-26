import './index.scss';
import PropTypes from 'prop-types';

/**
 * @param src {string}
 * @param title {string}
 * @param data {string}
 * @return {JSX.Element<CardComponent>}
 * @constructor
 */
const CardComponent = ({ src, title, data }) => {
  return (
    <div className={'infos-card'}>
      <img src={src} alt={`${title} icone`} />
      <div>
        <p>{data}</p>
        <small>{title}</small>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  data: PropTypes.string.isRequired,
};

CardComponent.defaultProps = {
  src: `http://via.placeholder.com/640x360`,
  title: `[Infos]`,
  data: `[Infos]`,
};

export default CardComponent;
