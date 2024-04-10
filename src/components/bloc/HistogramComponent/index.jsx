import './index.scss';
import { useEffect, useRef } from 'react';
import { D3Service } from '../../../core/services/d3-service';
import PropTypes from 'prop-types';

/**
 * Créer le composant HistogramComponent
 * @param poids {number[]}
 * @param calories {number[]}
 * @return {JSX.Element}
 * @constructor
 */
const HistogramComponent = ({ poids, calories }) => {
  const svgRef = useRef();
  const titleText = 'Titre du graph';
  useEffect(() => {
    const d3Service = new D3Service({ ref: svgRef.current });
    d3Service.build({ poids, calories });
  }, [poids, calories, titleText]);

  return (
    <div className={'histogram-container'}>
      <svg className={'histogram'} ref={svgRef}></svg>
    </div>
  );
};

HistogramComponent.propType = {
  datas1: PropTypes.array.isRequired,
  datas2: PropTypes.array.isRequired,
};

export default HistogramComponent;
