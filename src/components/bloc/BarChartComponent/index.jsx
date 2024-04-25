import './index.scss';
import PropTypes, { number } from 'prop-types';
import { useEffect, useRef } from 'react';
import { BarGraphService } from '../../../core/services/bar-graph-service';

/**
 * Créer le composant BarChartComponent
 * @param poids {number[]}
 * @param calories {number[]}
 * @return {JSX.Element}
 * @constructor
 */
const BarChartComponent = ({ poids, calories }) => {
  const svgRef = useRef();
  const titleText = 'Activité quotidienne';
  useEffect(() => {
    const svgWidth = 1024;
    const svgHeight = 350;

    const d3HistogramService = new BarGraphService({ ref: svgRef.current, svgWidth, svgHeight });
    d3HistogramService.drawGraph({ poids, calories, titleText });
  }, [poids, calories, titleText]);

  return (
    <div className={'histogram-container'}>
      <svg className={'histogram'} ref={svgRef}></svg>
    </div>
  );
};

BarChartComponent.propType = {
  datas1: PropTypes.arrayOf(number).isRequired,
  datas2: PropTypes.arrayOf(number).isRequired,
};

export default BarChartComponent;
