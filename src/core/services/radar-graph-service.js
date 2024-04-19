import { line, lineRadial, max, scaleLinear, select } from 'd3';
import { GraphService } from './graph-service';

/**
 * Service contenant les éléments pour construire un radar.
 * @param ref {MutableRefObject<any>.current} - `svgRef.current`. Référence du graph.
 * @param svgWidth {number} Largeur du graph.
 * @param svgHeight {number} Hauteur du graph.
 * @class
 */
export class RadarGraphService extends GraphService {
  /**
   * @param ref {MutableRefObject<any>.current} - `svgRef.current`. Référence du graph.
   * @param svgWidth {number} Largeur du graph.
   * @param svgHeight {number} Hauteur du graph.
   * @constructor
   * @example
   * const svgWidth = 400;
   * const svgHeight = 300;
   * const radarService = new RadarGraphService({ ref: svgRef.current, svgHeight, svgWidth });
   * radarService.drawGraph({ performances: datas });
   */
  constructor({ ref, svgWidth, svgHeight }) {
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };
    super({ ref, svgWidth, svgHeight, margin });
  }

  /**
   * Déssine le graph.
   * @param performances {PerformanceDatasModel[]} - Liste des performances
   */
  drawGraph({ performances }) {
    select(this._ref).selectAll('*').remove();
    const primaryColor = 'rgba(228,26,28,0.80)';
    const radarSize = Math.min(this._svgWidth, this._svgHeight) / 2 - 50;
    const angles = this._getHexagonAngles(RadarGraphService._rotateTo30Degree);
    const scaleRadar = scaleLinear().range([0, radarSize]);
    const translate = `translate(${this._svgWidth / 2}, ${this._svgHeight / 2})`;
    const datasAxesForRadar = [0, 0.25, 0.5, 0.75, 1].reverse();
    const bgColor = '#282D30';

    scaleRadar.domain([0, max(performances, d => +d.score)]);

    const svg = select(this._ref)
      .attr('width', this._svgWidth)
      .attr('height', this._svgHeight)
      .style('background-color', bgColor)
      .style('border-radius', '5px');

    this._drawRadar({ svg, angles, radarSize, translate, datasAxesForRadar });
    this._drawLabels({ svg, angles, radarSize, translate, performances });
    this._drawResults({ svg, angles, primaryColor, radarSize, translate, performances });
  }

  /**
   * Déssine le radar
   * @param svg {MutableRefObject<any>.current} `svg` de l'histogramme.
   * @param angles {number[]} - Liste des angles
   * @param radarSize {number} - Taille du radar
   * @param translate {string} - `translate(${this._svgWidth / 2}, ${this._svgHeight / 2})`
   * @param datasAxesForRadar {number[]}
   * @private
   */
  _drawRadar({ svg, angles, radarSize, translate, datasAxesForRadar }) {
    svg
      .selectAll('.radar')
      .data(datasAxesForRadar)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('transform', translate)
      .attr('class', 'radar')
      .attr('d', d => {
        const points = angles.map(angle => {
          const x = radarSize * Math.cos((angle * Math.PI) / 180);
          const y = radarSize * Math.sin((angle * Math.PI) / 180);
          return [x * d, y * d];
        });
        points.push([points[0][0], points[0][1]]);
        return line()(points);
      })
      .style('stroke', 'white')
      .style('stroke-width', '1px');
  }

  /**
   * Déssine les labels dans à chaque coins du graph
   * @param svg {MutableRefObject<any>.current} `svg` de l'histogramme.
   * @param angles {number[]} - Liste des angles
   * @param radarSize {number} - Taille du radar
   * @param translate {string} - `translate(${this._svgWidth / 2}, ${this._svgHeight / 2})`
   * @param performances {PerformanceDatasModel[]} - Liste des performances
   * @private
   */
  _drawLabels({ svg, angles, radarSize, translate, performances }) {
    const newDatas = angles.map(angle => ({ axis: '', angle }));
    svg
      .selectAll('.axis-label')
      .data(newDatas)
      .enter()
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', d => radarSize * Math.cos((d.angle * Math.PI) / 180) * 1.4)
      .attr('y', d => radarSize * Math.sin((d.angle * Math.PI) / 180) * 1.1)
      .attr('transform', `${translate} scale(1.1)`)
      .attr('fill', `white`)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .merge(svg.selectAll('.axis-label'))
      .text((d, i) => `${performances[i].label}`);
  }

  /**
   * Déssine le résultats des performances
   * @param svg {MutableRefObject<any>.current} `svg` de l'histogramme
   * @param angles {number[]} - Liste des angles
   * @param primaryColor {string} - `rgba(228,26,28,0.80)`
   * @param radarSize {number} - Taille du radar
   * @param translate {string} - `translate(${this._svgWidth / 2}, ${this._svgHeight / 2})`
   * @param performances {PerformanceDatasModel[]} - Liste des performances
   * @private
   */
  _drawResults({ svg, angles, primaryColor, radarSize, translate, performances }) {
    const radiusUser = scaleLinear()
      .domain([0, max(performances, d => +d.score)])
      .range([0, radarSize]);

    svg
      .append('g')
      .attr('transform', translate)
      .append('path')
      .datum(performances.map((performance, index) => [angles[index], performance.score]))
      .attr('fill', primaryColor)
      .style('stroke-width', '1px')
      .attr(
        'd',
        lineRadial()
          .angle(() => {
            return this._toRadian({ angle: 0 });
          })
          .radius(() => radiusUser(0)),
      )
      .transition()
      .duration(500)
      .attr(
        'd',
        lineRadial()
          .angle(([angle]) => {
            return this._toRadian({ angle }) + this._toRadian({ angle: 90 });
          })
          .radius(([_, score]) => radiusUser(+score)),
      );
  }

  /**
   * Les angles d'un Hexagone qu'on tourne à 90°
   * @param rotateHexagon {function} - Fonction qui doi calculer les nouveaux angles de la liste.
   * @return {number[]} - Listes des angles
   * @private
   */
  _getHexagonAngles(rotateHexagon) {
    return [0, 60, 120, 180, 240, 300].map(rotateHexagon);
  }

  /**
   * Calcul les radians en degrés
   * @param radian {number} - `Ex : 1.5707963267948966`
   * @return {number} - `90` degré
   * @private
   */
  _toDegree({ radian }) {
    return radian * (180 / Math.PI);
  }

  /**
   * Calcul les degrés en radians
   * @param angle {number} - `90` degré
   * @return {number} - `Resultat : 1.5707963267948966`
   * @private
   */
  _toRadian({ angle }) {
    return angle * (Math.PI / 180);
  }

  /**
   * Rajoute 30 degré à l'angle de base.
   * @param angle {number} - Angle de base.
   * @return {number} - Angle avec 30 degré de plus.
   * @private
   */
  static _rotateTo30Degree(angle) {
    return angle + 30;
  }

  /**
   * Rajoute 60 degré à l'angle de base.
   * @param angle {number} - Angle de base.
   * @return {number} - Angle avec 60 degré de plus.
   * @private
   */
  static _rotateTo60Degree(angle) {
    return angle + 60;
  }

  /**
   * Rajoute 90 degré à l'angle de base.
   * @param angle {number} - Angle de base.
   * @return {number} - Angle avec 90 degré de plus.
   * @private
   */
  static _rotateTo90Degree(angle) {
    return angle + 90;
  }
}
