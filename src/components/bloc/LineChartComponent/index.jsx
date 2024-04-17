import { useEffect, useRef } from 'react';
import { LineGraphService } from '../../../core/services/line-graph-service';

/**
 * Créer le composant avec un graphique ne ligne
 * @param sessions {SessionModel[]} - Les sessions moyennes en objet `AverageSessionModel`
 * @return {JSX.Element<LineChartComponent>}
 * @constructor
 */
const LineChartComponent = ({ sessions }) => {
  const svgRef = useRef();
  const titleText = `Durée moyenne des sessions`;
  useEffect(() => {
    const svgWidth = 330;
    const svgHeight = 330;
    const lineChartService = new LineGraphService({ ref: svgRef.current, svgHeight, svgWidth });
    lineChartService.drawGraph({ titleText, sessions });
  }, [titleText, sessions]);
  return (
    <div>
      <svg className={'line-graph'} ref={svgRef}></svg>
    </div>
  );
};

export default LineChartComponent;
