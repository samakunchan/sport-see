import './index.scss';
import { useEffect, useRef } from 'react';
import { LineGraphService } from '../../../core/services/line-graph-service';
import useScreenSize from '../../../core/utils/use-screen-size';

/**
 * Créer le composant avec un graphique ne ligne
 * @param sessions {SessionModel[]} - Les sessions moyennes en objet `AverageSessionModel`
 * @return {JSX.Element<LineChartComponent>}
 * @constructor
 */
const LineChartComponent = ({ sessions }) => {
  const svgRef = useRef();
  const screenSize = useScreenSize();
  const isTabletSize = screenSize.isTabletSize;
  const titleText = `Durée moyenne des sessions`;

  useEffect(() => {
    const svgWidth = isTabletSize ? 1024 : 320;
    const svgHeight = 320;

    const lineChartService = new LineGraphService({ ref: svgRef.current, svgHeight, svgWidth });
    lineChartService.drawGraph({ titleText, sessions });
  }, [titleText, sessions, isTabletSize]);

  return (
    <div>
      <svg className={'line-graph'} ref={svgRef}></svg>
    </div>
  );
};

export default LineChartComponent;
