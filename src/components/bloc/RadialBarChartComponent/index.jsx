import './index.scss';
import { useEffect, useRef } from 'react';
import { RadialGraphService } from '../../../core/services/radial-graph-service';

/**
 * Créer le composant RadialBarChartComponent
 * @param todayScore {number}
 * @return {JSX.Element<RadialBarChartComponent>} -
 * @constructor
 */
const RadialBarChartComponent = ({ todayScore }) => {
  const svgRef = useRef();
  const titleText = `Score`;

  useEffect(() => {
    const svgWidth = 320;
    const svgHeight = 320;
    const radialService = new RadialGraphService({ ref: svgRef.current, svgHeight, svgWidth });
    radialService.drawGraph({ titleText, todayScore });
  }, [todayScore, titleText]);

  return (
    <div>
      <svg className={'radial-graph'} ref={svgRef}></svg>
    </div>
  );
};

export default RadialBarChartComponent;
