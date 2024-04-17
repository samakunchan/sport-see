import './index.scss';
import PropTypes, { number } from 'prop-types';
import { useEffect, useRef } from 'react';
import { D3HistogramService } from '../../../core/services/d3-histogram-service';

/**
 * Créer le composant HistogramComponent
 * @param poids {number[]}
 * @param calories {number[]}
 * @return {JSX.Element}
 * @constructor
 */
const HistogramComponent = ({ poids, calories }) => {
  const svgRef = useRef();
  const titleText = 'Activité quotidienne';
  useEffect(() => {
    const svgWidth = 750;
    const svgHeight = 350;
    const d3HistogramService = new D3HistogramService({ ref: svgRef.current, svgWidth, svgHeight });
    d3HistogramService.drawGraph({ poids, calories, titleText });
  }, [poids, calories, titleText]);

  return (
    <div className={'histogram-container'}>
      <svg className={'histogram'} ref={svgRef}></svg>
    </div>
  );
};

HistogramComponent.propType = {
  datas1: PropTypes.arrayOf(number).isRequired,
  datas2: PropTypes.arrayOf(number).isRequired,
};

export default HistogramComponent;
