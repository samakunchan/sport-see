import { arc, interpolate, select } from 'd3';
import { GraphService } from './graph-service';

/**
 * Service contenant les éléments pour construire un radial.
 * @param ref {MutableRefObject<any>.current} - `svgRef.current`. Référence du graph.
 * @param svgWidth {number} Largeur du graph.
 * @param svgHeight {number} Hauteur du graph.
 * @class
 */
export class RadialGraphService extends GraphService {
  /**
   * @param ref {MutableRefObject<any>.current} - `svgRef.current`. Référence du graph.
   * @param svgWidth {number} Largeur du graph.
   * @param svgHeight {number} Hauteur du graph.
   * @constructor
   * @example
   * const svgWidth = 400;
   * const svgHeight = 300;
   * const radialService = new RadialGraphService({ ref: svgRef.current, svgHeight, svgWidth });
   * radialService.drawGraph({ performances: datas });
   */
  constructor({ ref, svgWidth, svgHeight }) {
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };
    super({ ref, svgWidth, svgHeight, margin });
  }

  drawGraph({ titleText = '', todayScore }) {
    select(this._ref).selectAll('*').remove();
    const primaryColor = 'white';
    const secondaryColor = '#fbfbfb';
    const curveColor = '#e41a1c';
    const svg = select(this._ref)
      .attr('width', this._svgWidth)
      // .attr('height', this._svgHeight)
      .style('background-color', secondaryColor)
      .style('border-radius', '5px')
      // Pour le responsive. Un max-width = this._svgWidth et un width = 100%
      // sur le svg est important dans le fichier css
      .attr('preserveAspectRatio', 'xMinYMin meet')
      // Pour le responsive aussi. La largueur et hauteur est redéfinis ici
      .attr('viewBox', `0 0 ${this._svgWidth} ${this._svgHeight}`);

    svg
      .append('circle')
      .attr('class', 'bg-round')
      .attr('transform', `translate(${this._svgWidth / 2}, ${this._svgHeight / 2})`)
      .attr('r', 90)
      .attr('fill', primaryColor);

    const graph = svg
      .append('g')
      .attr('transform', `translate(${this._svgWidth / 2}, ${this._svgHeight / 2})`);

    const arcPath = arc().outerRadius(100).innerRadius(90).startAngle(0).cornerRadius(8);

    graph
      .append('path')
      .datum({ endAngle: -0.1 })
      .attr('d', arcPath)
      .attr('fill', curveColor)
      .transition()
      .duration(750)
      .call(
        (t, a) => {
          return this.arcTween({ transition: t, newFinishAngle: a, arcPath });
        },
        todayScore * Math.PI * -2,
      );

    svg
      .append('text')
      .attr('fill', '#000')
      .attr('x', this._margin.left)
      .attr('y', this._margin.top)
      .text(titleText)
      .style('font-size', '1.5rem')
      .style('font-weight', 'bold');

    //Draw the Circle

    //center text
    svg
      .append('text')
      .attr('x', '50%')
      .attr('y', '43%')
      .style('text-anchor', 'middle')
      .style('font-size', '2em')
      .style('font-weight', 'bold')
      .text(`${todayScore * 100}%`)
      .append('tspan')
      .attr('x', '50%')
      .attr('y', '53%')
      .text('de votre')
      .style('font-size', '20px')
      .style('font-weight', '500')
      .append('tspan')
      .attr('x', '50%')
      .attr('y', '63%')
      .text('objectif')
      .style('font-size', '20px')
      .style('font-weight', '500');
  }

  arcTween({ transition, newFinishAngle, arcPath }) {
    transition.attrTween('d', d => {
      const interpolateEnd = interpolate(d.endAngle, newFinishAngle);
      return t => {
        d.endAngle = interpolateEnd(t);
        return arcPath(d);
      };
    });
  }
}
