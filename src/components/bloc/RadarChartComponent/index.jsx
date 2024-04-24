import './index.scss';
import { useEffect, useRef } from 'react';
import { PerformanceDatasModel } from '../../../core/models/performances/performance-datas-model';
import { RadarGraphService } from '../../../core/services/radar-graph-service';
import useScreenSize from '../../../core/utils/use-screen-size';

/**
 * Créer le composant radar
 * @param performance {PerformanceModel} - Données des performances
 * @return {JSX.Element<RadarChartComponent>} - Un SVG `RadarChartComponent`.
 * @constructor
 */
const RadarChartComponent = ({ performance }) => {
  const svgRef = useRef();
  const screenSize = useScreenSize();
  const isTabletSize = screenSize.isTabletSize;

  useEffect(() => {
    const svgWidth = isTabletSize ? 1024 : 320;
    const svgHeight = 320;

    const radarService = new RadarGraphService({ ref: svgRef.current, svgHeight, svgWidth });
    radarService.drawGraph({ performances: performance.performances });
  }, [performance, isTabletSize]);

  return (
    <div>
      <svg className={'radar-graph'} ref={svgRef}></svg>
    </div>
  );
};

export default RadarChartComponent;

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
