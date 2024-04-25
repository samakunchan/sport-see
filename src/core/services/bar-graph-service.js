import { axisBottom, axisRight, extent, local, max, scaleLinear, select } from 'd3';
import { GraphService } from './graph-service';

/**
 * Service contenant les éléments pour construire un histogramme.
 * @param ref {MutableRefObject<undefined>.current} - `svgRef.current`. Référence du graph
 * @param svgWidth {number} Largeur du graph
 * @param svgHeight {number} Hauteur du graph
 * @class
 */
export class BarGraphService extends GraphService {
  /**
   * @param ref {MutableRefObject<undefined>.current} - `svgRef.current`. Référence du graph
   * @param svgWidth {number} Largeur du graph
   * @param svgHeight {number} Hauteur du graph
   * @constructor
   */
  constructor({ ref, svgWidth, svgHeight }) {
    const margin = { top: 80, right: 65, bottom: 40, left: 45 };
    super({ ref, svgWidth, svgHeight, margin });
  }

  /**
   * Créer l'histogramme
   * @param poids {number[]} - Liste de nombres
   * @param calories {number[]} - Liste de nombres
   * @param titleText {string} - Titre de l'histogramme
   */
  drawGraph({ poids, calories, titleText = '' }) {
    select(this._ref).selectAll('*').remove();

    const maxCalories = Number(max(calories));
    const primaryColor = '#e41a1c';
    const blackColor = '#000000';
    const cardColor = '#fbfbfb';
    const gap = 3;

    // selection du graph
    const svg = select(this._ref)
      .attr('width', this._svgWidth)
      // .attr('height', this._svgHeight) // Supprimer pour le responsive
      .style('background-color', cardColor)
      .style('border-radius', '5px')
      // Pour le responsive. Un max-width = this._svgWidth et un width = 100%
      // sur le svg est important dans le fichier css
      .attr('preserveAspectRatio', 'xMinYMin meet')
      // Pour le responsive aussi. La largueur et hauteur est redéfinis ici
      .attr('viewBox', `0 0 ${this._svgWidth} ${this._svgHeight}`);

    // X axis
    const xExtent = extent(poids.map((d, i) => `${i + 1}`));
    const xScale = scaleLinear()
      .domain(xExtent ?? '')
      .range([this._margin.left, this._svgWidth - this._margin.right - 30]);
    const xAxis = axisBottom(xScale)
      .tickSize(0)
      .tickPadding(this._margin.bottom - 20)
      .ticks(7);

    // Y axis
    const yExtent = extent(poids);
    const moitierDeY = Math.trunc((yExtent[0] + yExtent[1]) / 2);
    const yScale = scaleLinear()
      .domain([moitierDeY - gap, moitierDeY + gap])
      .range([this._svgHeight - this._margin.top, this._margin.top]);

    const yCaloriesScale = scaleLinear()
      .domain([0, maxCalories])
      .range([0, this._svgHeight / 2]);

    const tickValues = [moitierDeY - gap, moitierDeY, moitierDeY + gap];
    const yAxis = axisRight(yScale)
      .ticks(3)
      .tickSize(0)
      .tickPadding(30)
      .tickValues(tickValues)
      .tickFormat(d => `${d}`);

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${this._svgHeight - this._margin.top})`)
      .attr('font-size', '1rem')
      .select('path')
      .attr('transform', 'scale(1.05) translate(-20,0)');

    svg
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${this._svgWidth - this._margin.right}, 0)`) // Bouge les chiffres de l'ordonnée
      .attr('font-size', '1rem')
      .select('.domain')
      .remove();

    // Pointillés
    const yAxisGrid = axisRight(yScale)
      .tickSize(-(this._svgWidth - this._margin.left - this._margin.right) - 20)
      .ticks(3)
      .tickValues(tickValues)
      .tickFormat(d => ``);
    svg
      .append('g')
      .style('stroke-dasharray', '3, 3')
      .style('color', 'lightgray')
      .attr('transform', `translate(${this._svgWidth - this._margin.right}, 0)`) // Bouge les pointillés de l'ordonnée
      .call(yAxisGrid)
      .select('path')
      .remove();

    // Titre
    this.histogramTitle({ svg, titleText });

    // Légendes
    this.histogramLegends({
      svg,
      positionCircle: this._svgWidth - 200,
      positionText: this._svgWidth - 190,
      color: blackColor,
      titleText: 'Poids (kg)',
    });
    this.histogramLegends({
      svg,
      positionCircle: this._svgWidth - 90,
      positionText: this._svgWidth - 80,
      color: primaryColor,
      titleText: 'Calories brûlées (kCal)',
    });

    // Initialisation du Hover
    svg
      .selectAll()
      .data(poids)
      .enter()
      .append('g')
      .attr('class', (d, i) => `g-hover-${i}`)
      .attr(
        'transform',
        (d, i) => `translate(${xScale(i) + this._margin.left + this._margin.right + 5}, 70)`,
      )
      .each((d, index, nodes) => {
        const selection = select(nodes[index]);
        selection
          .append('rect')
          .attr('class', () => `g-bg-grey`)
          .attr('height', `${this._svgHeight + this._margin.bottom - 190}px`)
          .attr('width', () => `65px`)
          .attr('fill', 'transparent');

        selection
          .append('rect')
          .attr('class', () => `g-bg-red`)
          .attr('transform', (d, i) =>
            index === poids.length - 1
              ? `translate(${xScale(i) + 45}, 0)`
              : `translate(${xScale(i) + 170}, 0)`,
          )
          .attr('width', () => `60px`)
          .attr('height', `70px`)
          .attr('fill', 'transparent');

        selection
          .append('text')
          .attr('class', () => `g-text-kg`)
          .text(d => `${d}Kg`)
          .attr('transform', (d, i) =>
            index === poids.length - 1
              ? `translate(${xScale(i) + 75}, 25)`
              : `translate(${xScale(i) + 200}, 25)`,
          )
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('fill', 'transparent');

        selection
          .append('text')
          .attr('class', () => `g-text-cal`)
          .text(() => `${calories[index]}Kcal`)
          .attr('transform', (d, i) =>
            index === poids.length - 1
              ? `translate(${xScale(i) + 75}, 55)`
              : `translate(${xScale(i) + 200}, 55)`,
          )
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('fill', 'transparent');
      });

    // Barres des histogrammes
    const poidsConfiguration = {
      typeRound: {
        x1: (d, i) => xScale(i) + this._svgWidth / 7.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 7.5,
        y1: () => this._svgHeight + this._margin.bottom - 150,
        y2: () => this._svgHeight + this._margin.bottom - 125,
      },
      typeRectangle: {
        x1: (d, i) => xScale(i) + this._svgWidth / 7.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 7.5,
        y1: () => this._svgHeight + this._margin.bottom - 120,
        y2: () => this._svgHeight + this._margin.bottom - 125,
      },
      yScale,
    };
    const caloriesConfiguration = {
      typeRound: {
        x1: (d, i) => xScale(i) + this._svgWidth / 6.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 6.5,
        y1: () => this._svgHeight + this._margin.bottom - 150,
        y2: () => this._svgHeight + this._margin.bottom - 125,
      },
      typeRectangle: {
        x1: (d, i) => xScale(i) + this._svgWidth / 6.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 6.5,
        y1: () => this._svgHeight + this._margin.bottom - 120,
        y2: () => this._svgHeight + this._margin.bottom - 125,
      },
      yScale: yCaloriesScale,
    };

    this.histogramBar({
      type: 'poids',
      svg,
      datas: poids,
      configuration: poidsConfiguration,
      color: blackColor,
    });
    this.histogramBar({
      type: 'calories',
      svg,
      datas: calories,
      configuration: caloriesConfiguration,
      color: primaryColor,
    });

    // Activation des Hovers
    this.activateEventHoverOnbar({ svg, poids, xScale });
  }

  /**
   * Ajoute un titre sur l'histogramme
   * @param svg {MutableRefObject<undefined>.current} `svg` de l'histogramme
   * @param titleText {string} - Titre
   */
  histogramTitle({ svg, titleText }) {
    svg
      .append('text')
      .attr('x', this._margin.right - 40)
      .attr('y', 38)
      .attr('class', 'title-histogram')
      .text(titleText)
      .style('font-weight', 'bold');
  }

  /**
   * Ajout une légende sur l'histogramme
   * @param svg {MutableRefObject<undefined>.current} `svg` de l'histogramme
   * @param positionCircle - La position du rond
   * @param positionText - La position du texte
   * @param color {string} `#000000 | #e41a1c`
   * @param titleText {string} - Titre
   */
  histogramLegends({ svg, positionCircle, positionText, color, titleText }) {
    const legend = svg
      .append('g')
      .attr('transform', `translate(${-(this._svgWidth * 0.15)},${this._svgHeight * 0.01})`);
    legend
      .append('circle')
      .attr('cx', positionCircle)
      .attr('cy', 30)
      // .attr('r', 5)
      .attr('class', 'circle')
      .attr('fill', color);
    legend
      .append('text')
      .text(titleText)
      .attr('dx', positionText)
      .attr('dy', 35)
      .attr('class', 'legend')
      .attr('fill', '#74798C');
  }

  /**
   * Créer une barre pour chaque valeur réçu
   * @param svg {MutableRefObject<undefined>.current} `svg` de l'histogramme
   * @param type {string} `poids | calories`
   * @param datas {number[]} Liste de données
   * @param configuration {Object} Configuration des barres
   * @param color {string} `#000000 | #e41a1c`
   */
  histogramBar({ type, svg, datas, configuration, color }) {
    const height = Number(this._svgHeight) - this._margin.top - this._margin.bottom;

    // Bar rond
    svg
      .append('g')
      .selectAll('line')
      .data(datas)
      .enter()
      .append('line')
      .attr('x1', configuration.typeRound.x1)
      .attr('x2', configuration.typeRound.x2)
      .attr('y1', configuration.typeRound.y1)
      .attr('y2', configuration.typeRound.y2)
      .attr('stroke', color)
      .attr('stroke-width', '8')
      .attr('stroke-linecap', 'round')
      .transition()
      .duration(700)
      .attr('y2', d =>
        type === 'calories' ? height - configuration.yScale(d) + 20 : configuration.yScale(d) + 2,
      );

    // Bar rectangulaire
    svg
      .append('g')
      .selectAll('line')
      .data(datas)
      .enter()
      .append('line')
      .attr('x1', configuration.typeRectangle.x1)
      .attr('x2', configuration.typeRectangle.x2)
      .attr('y1', configuration.typeRectangle.y1)
      .attr('y2', configuration.typeRectangle.y2)
      .transition()
      .duration(700)
      .attr('y2', d =>
        type === 'calories' ? height - configuration.yScale(d) + 20 : configuration.yScale(d) + 2,
      )
      .attr('stroke', color)
      .attr('stroke-width', '8')
      .attr('stroke-linecap', 'butt');
  }

  /**
   * Utilise l'event hover pour afficher des informations supplémentaires
   * @param svg {MutableRefObject<undefined>.current} - `svg` de l'histogramme
   * @param poids {number[]} - Les données du poids
   * @param xScale - `ScaleLinear`
   */
  activateEventHoverOnbar({ svg, poids, xScale }) {
    const localIndex = local();
    const setLocalIndex = (d, i, nodes) => localIndex.set(nodes[i], i);

    svg
      .selectAll('.x-axis-group')
      .data(poids)
      .enter()
      .append('rect')
      .attr('class', 'g-rect')
      .attr(
        'transform',
        (d, i) => `translate(${xScale(i) + this._margin.left + this._margin.right + 5}, 70)`,
      )
      .attr('height', `${this._svgHeight + this._margin.bottom - 190}px`)
      .attr('width', () => `65px`)
      .attr('fill', 'transparent')
      .each(setLocalIndex) // Pour ajouter une série d'index pour le hover
      .on('mouseover', event => this.onHoverIn({ localIndex, event }))
      .on('mouseout', event => this.onHoverOut({ localIndex, event }));
  }

  /**
   * Méthode pour le Hover in
   * @param localIndex {Local} - Index local de D3Js
   * @param event {Event} Event sur le graph
   */
  onHoverIn({ localIndex, event }) {
    const index = localIndex.get(event.currentTarget);
    select(`.g-hover-${index}`)
      .select(`.g-bg-grey`)
      .transition()
      .duration(150)
      .attr('fill', 'rgba(196, 196, 196, 0.5)');

    select(`.g-hover-${index}`)
      .select(`.g-bg-red`)
      .transition()
      .duration(150)
      .attr('fill', '#e41a1c');

    select(`.g-hover-${index}`)
      .select(`.g-text-kg`)
      .transition()
      .duration(150)
      .attr('fill', '#FFFFFF');

    select(`.g-hover-${index}`)
      .select(`.g-text-cal`)
      .transition()
      .duration(150)
      .attr('fill', '#FFFFFF');
  }

  /**
   * Méthode pour le Hover out
   * @param localIndex {Local} - Index local de D3Js
   * @param event {Event} Event sur le graph
   */
  onHoverOut({ localIndex, event }) {
    const index = localIndex.get(event.currentTarget);
    select(`.g-hover-${index}`).select(`.g-bg-grey`).transition().attr('fill', 'transparent');

    select(`.g-hover-${index}`)
      .select(`.g-bg-red`)
      .transition()
      .duration(150)
      .attr('fill', 'transparent');

    select(`.g-hover-${index}`)
      .select(`.g-text-kg`)
      .transition()
      .duration(150)
      .attr('fill', 'transparent');

    select(`.g-hover-${index}`)
      .select(`.g-text-cal`)
      .transition()
      .duration(150)
      .attr('fill', 'transparent');
  }
}
