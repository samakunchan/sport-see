import {
  axisBottom,
  axisLeft,
  bisector,
  curveMonotoneX,
  easeSin,
  extent,
  line,
  pointer,
  scaleLinear,
  scaleTime,
  select,
} from 'd3';
import { GraphService } from './graph-service';

/**
 * Service contenant les éléments pour construire un histogramme.
 * @param ref {MutableRefObject<undefined>.current} - `svgRef.current`. Référence du graph
 * @param svgWidth {number} Largeur du graph
 * @param svgHeight {number} Hauteur du graph
 * @class
 */
export class LineGraphService extends GraphService {
  /**
   * @param ref {MutableRefObject<undefined>.current} - `svgRef.current`. Référence du graph
   * @param svgWidth {number} Largeur du graph
   * @param svgHeight {number} Hauteur du graph
   * @constructor
   */
  constructor({ ref, svgWidth, svgHeight }) {
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };
    super({ ref, svgWidth, svgHeight, margin });
  }

  /**
   * Créer le graph
   * @param titleText {string} - Titre du graph
   * @param sessions {SessionModel[]} - La liste des sessions
   */
  drawGraph({ titleText = '', sessions }) {
    select(this._ref).selectAll('*').remove();
    const primaryColor = '#e41a1c';
    const secondaryColor = 'rgba(251,251,251,0.70)';
    const daysLabel = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const addDaysToXAxis = (d, i) => daysLabel[i];

    // selection du graph
    const svg = select(this._ref)
      .attr('width', this._svgWidth)
      .attr('height', this._svgHeight)
      .style('background-color', primaryColor)
      .style('border-radius', '5px');

    this.histogramTitle({ svg, titleText, secondaryColor });

    const xExtent = extent(sessions.map(d => `${d.day}`));
    const x = scaleTime()
      .domain(xExtent ?? '')
      .range([this._margin.left + 5, this._svgWidth - this._margin.right - 5]);
    svg
      .append('g')
      .attr('transform', `translate(0,${this._svgHeight - this._margin.bottom - 15})`)
      .style('color', secondaryColor)
      .call(axisBottom(x).ticks(7).tickSize(0).tickPadding(15).tickFormat(addDaysToXAxis))
      .attr('font-size', '1rem')
      .selectAll('path, line')
      .remove();

    const yExtent = extent(sessions, d => d.sessionLength);
    const y = scaleLinear()
      .domain(yExtent)
      .range([this._svgHeight - this._margin.top * 2, this._margin.bottom * 2]);
    svg.append('g').call(axisLeft(y)).selectAll('path, line').remove();

    const lineGraph = line()
      .curve(curveMonotoneX) // curveMonotoneX - curveBasis
      .x(([day]) => x(day))
      .y(([_, sessionLength]) => y(sessionLength));

    const bgHoverInit = svg
      .append('rect')
      .attr('class', 'bg-hover')
      .attr('fill', 'rgba(0, 0, 0, 0.10)')
      .attr('width', this._svgWidth)
      .attr('height', this._svgHeight)
      .style('opacity', 0);

    svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'rgba(251, 251, 251, 0.40)' },
        { offset: '100%', color: 'rgba(251, 251, 251, 1)' },
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    const path = svg
      .append('path')
      .datum(sessions.map(session => [session.day, session.sessionLength]))
      .attr('fill', 'none')
      .attr('stroke', 'url(#gradient)')
      .attr('stroke-width', 2.5)
      .attr('d', lineGraph);

    // Animation du graph
    const pathLength = path.node().getTotalLength();
    path
      .attr('stroke-dashoffset', pathLength)
      .attr('stroke-dasharray', pathLength)
      .transition()
      .duration(1500)
      .attr('stroke-dashoffset', 0)
      .ease(easeSin);

    this.activateEventHover({ svg, bgHover: bgHoverInit, sessions, x, y });
  }

  /**
   * Ajoute un titre sur l'histogramme
   * @param svg {MutableRefObject<undefined>.current} `svg` de l'histogramme
   * @param titleText {string} - Titre
   * @param secondaryColor {string} `rgba(251,251,251,0.70)`
   */
  histogramTitle({ svg, titleText, secondaryColor }) {
    const text1 = titleText
      .split(' ')
      .filter((_, index) => index !== titleText.split(' ').length - 1)
      .join(' ');
    const text2 = titleText
      .split(' ')
      .filter((_, index) => index === titleText.split(' ').length - 1)
      .join(' ');

    svg
      .append('text')
      .attr('x', this._margin.right + 20)
      .attr('y', 40)
      .attr('fill', secondaryColor)
      .text(text1)
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .append('tspan')
      .attr('x', this._margin.right + 20)
      .attr('dy', 30)
      .text(text2)
      .style('font-size', '20px')
      .style('font-weight', 'bold');
  }

  /**
   *
   * @param svg
   * @param bgHover
   * @param sessions
   * @param x
   * @param y
   */
  activateEventHover({ svg, bgHover, sessions, x, y }) {
    const focus = svg.append('g').each((d, index, nodes) => {
      const selection = select(nodes[index]);
      selection
        .append('circle')
        .attr('class', 'circle-full')
        .style('fill', 'white')
        .attr('r', 10)
        .style('opacity', 0);

      selection
        .append('circle')
        .attr('class', 'circle-shadow')
        .style('fill', 'rgba(251,251,251,0.20)')
        .attr('r', 20)
        .style('opacity', 0);
    });

    const bgText = svg
      .append('rect')
      .attr('fill', 'white')
      .attr('width', '70')
      .attr('height', '40')
      .style('opacity', 0);

    const focusText = svg
      .append('g')
      .append('text')
      .style('opacity', 0)
      .attr('text-anchor', 'left')
      .style('font-weight', 'bold')
      .attr('alignment-baseline', 'middle');

    const bisect = bisector(d => d.day).left;
    svg
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', this._svgWidth)
      .attr('height', this._svgHeight)
      .on('mouseover', () => this.mouseover({ focus, focusText, bgText, bgHover }))
      .on('mousemove', event =>
        this.mousemove({ event, sessions, x, y, bisect, focus, focusText, bgText, bgHover }),
      )
      .on('mouseout', () => this.mouseout({ focus, focusText, bgText, bgHover }));
  }

  /**
   * Méthode pour le Hover in
   * @param focus
   * @param focusText
   * @param bgText
   * @param bgHover
   */
  mouseover({ focus, focusText, bgText, bgHover }) {
    focus.select('.circle-full').style('opacity', 1);
    focus.select('.circle-shadow').style('opacity', 1);
    focusText.style('opacity', 1);
    bgText.style('opacity', 1);
    bgHover.style('opacity', 1);
  }

  /**
   * Méthode pour le Hover qui bouge
   * @param event {Event}
   * @param sessions {SessionModel[]}
   * @param x
   * @param y
   * @param bisect
   * @param focus
   * @param focusText
   * @param bgText
   * @param bgHover
   */
  mousemove({ event, sessions, x, y, bisect, focus, focusText, bgText, bgHover }) {
    const [xCoord] = pointer(event);
    const x0 = x.invert(xCoord);
    const i = bisect(sessions, x0, 0);
    const { day, sessionLength } = sessions[i];
    focus
      .select('.circle-full')
      .attr('cx', x(Number(day)))
      .attr('cy', y(sessionLength));

    focus
      .select('.circle-shadow')
      .attr('cx', x(Number(day)))
      .attr('cy', y(sessionLength));

    bgHover.attr('x', x(Number(day)));

    bgText
      .attr('x', Number(day) === 7 ? x(Number(day)) - 60 : x(Number(day)) + 10)
      .attr('y', y(sessionLength) - 55);
    focusText
      .html(`${sessionLength} min`)
      .attr('x', Number(day) === 7 ? x(Number(day)) - 50 : x(Number(day)) + 20)
      .attr('y', y(sessionLength) - 33);
  }

  /**
   * Méthode pour le Hover out
   * @param focus
   * @param focusText
   * @param bgText
   * @param bgHover
   */
  mouseout({ focus, focusText, bgText, bgHover }) {
    focus.select('.circle-full').style('opacity', 0);
    focus.select('.circle-shadow').style('opacity', 0);
    focusText.style('opacity', 0);
    bgText.style('opacity', 0);
    bgHover.style('opacity', 0);
  }
}
