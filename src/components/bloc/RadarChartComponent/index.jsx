import './index.css';
import { useEffect, useRef } from 'react';
// import { PerformanceDatasModel } from '../../../core/models/performances/performance-datas-model';
import { RadarGraphService } from '../../../core/services/radar-graph-service';

/**
 * Créer le composant radar
 * @param performance {PerformanceModel} - Données des performances
 * @return {JSX.Element<RadarChartComponent>} - Un SVG `RadarChartComponent`.
 * @constructor
 */
const RadarChartComponent = ({ performance }) => {
  const svgRef = useRef();
  useEffect(() => {
    const svgWidth = 400;
    const svgHeight = 300;
    const radarService = new RadarGraphService({ ref: svgRef.current, svgHeight, svgWidth });
    // const datas = [
    //   {
    //     value: 80,
    //     kind: 1,
    //   },
    //   {
    //     value: 120,
    //     kind: 2,
    //   },
    //   {
    //     value: 140,
    //     kind: 3,
    //   },
    //   {
    //     value: 50,
    //     kind: 4,
    //   },
    //   {
    //     value: 200,
    //     kind: 5,
    //   },
    //   {
    //     value: 90,
    //     kind: 6,
    //   },
    // ].map(data => new PerformanceDatasModel(data));
    radarService.drawGraph({ performances: performance.performances });
  }, [performance]);
  return (
    <div>
      <svg className={'line-graph'} ref={svgRef}></svg>
    </div>
  );
};

export default RadarChartComponent;
