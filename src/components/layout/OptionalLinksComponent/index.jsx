import './index.scss';
import { Link } from 'react-router-dom';
import React from 'react';

/**
 * Liens inutile et à supprimer lors de la version final
 * @return {Element}
 * @constructor
 */
const OptionalLinksComponent = () => {
  return (
    <div>
      <Link to={'/user/12'}>Karl</Link>
      <Link to={'/user/18'}>Cécilia</Link>
    </div>
  );
};

export default OptionalLinksComponent;

// const HistogramComponent = () => {
//   const svgRef = useRef();
//   const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   const titleText = 'Titre du graph';
//
//   useEffect(() => {
//     select(svgRef.current).selectAll('*').remove();
//
//     if (datas && datas.length > 0) {
//       const margin = { top: 50, right: 20, bottom: 30, left: 40 };
//       const width = 960 - margin.left - margin.right;
//       const height = 500 - margin.top - margin.bottom;
//
//       const x = scaleLinear().rangeRound([0, width]);
//       const bins = histogram().thresholds(15)(datas);
//
//       const y = scaleLinear().rangeRound([height, 0]);
//
//       const svg = select(svgRef.current)
//         .attr('width', width + margin.left + margin.right)
//         .attr('height', height + margin.top + margin.bottom);
//
//       const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
//
//       x.domain([bins[0].x0, bins[bins.length - 1].x1]);
//       y.domain([0, max(bins, d => d.length)]);
//
//       const bar = g.selectAll('.bar').data(bins);
//
//       bar.join(
//         enter =>
//           enter
//             .append('rect')
//             .attr('class', 'bar')
//             .attr('x', d => x(d.x0))
//             .attr('y', d => y(d.length))
//             .attr('width', d => x(d.x1) - x(d.x0))
//             .attr('height', d => height - y(d.length)),
//         update =>
//           update
//             .attr('x', d => x(d.x0))
//             .attr('y', d => y(d.length))
//             .attr('width', d => x(d.x1) - x(d.x0))
//             .attr('height', d => height - y(d.length)),
//         exit => exit.remove(),
//       );
//
//       g.append('text')
//         .attr('class', 'title')
//         .attr('x', width / 2)
//         .attr('y', -20)
//         .style('text-anchor', 'middle')
//         .text(titleText);
//     }
//   }, [datas, titleText]);
//
//   return (
//     <div className={'histogram-container'}>
//       <svg ref={svgRef}></svg>
//     </div>
//   );
// };
//
// export default HistogramComponent;
