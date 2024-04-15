import { axisBottom, axisRight, extent, local, max, min, scaleLinear, select } from 'd3';

export class D3Service {
  constructor({ ref, svgWidth, svgHeight }) {
    this._ref = ref;
    this._svgWidth = svgWidth;
    this._svgHeight = svgHeight;
  }

  drawHistogram({ poids, calories, titleText = '' }) {
    select(this._ref).selectAll('*').remove();

    const margin = { top: 80, right: 65, bottom: 40, left: 45 };
    const minPoids = Number(min(poids));
    const maxPoids = Number(max(poids));
    const maxCalories = Number(max(calories));
    const gapPoids = maxPoids - minPoids;
    const gap = gapPoids > 2 ? 12 : 11;

    // selection du graph
    const svg = select(this._ref)
      .attr('width', this._svgWidth)
      .attr('height', this._svgHeight)
      .style('background-color', '#fbfbfb')
      .style('border-radius', '5px');

    // X axis
    const xExtent = extent(poids.map((d, i) => `${i + 1}`));
    const xScale = scaleLinear()
      .domain(xExtent ?? '')
      .range([margin.left, this._svgWidth - margin.right - 20]);
    const xAxis = axisBottom(xScale)
      .tickSize(0)
      .tickPadding(margin.bottom - 20)
      .ticks(7);

    // Y axis
    const yScale = scaleLinear()
      .domain([maxPoids - gap, maxPoids + 3])
      .range([this._svgHeight - margin.top, margin.top]);

    const yCaloriesScale = scaleLinear()
      .domain([0, maxCalories])
      .range([0, this._svgHeight / 2]);

    const yAxis = axisRight(yScale).ticks(3).tickSize(0).tickPadding(30);

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${this._svgHeight - margin.top})`)
      .attr('font-size', '1rem')
      .select('path')
      .attr('transform', 'scale(1.05) translate(-11,0)');

    svg
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${this._svgWidth - margin.right}, 17)`) // Bouge les chiffres de l'ordonnée
      .attr('font-size', '1rem')
      .select('.domain')
      .remove();

    // Pointillés
    const yAxisGrid = axisRight(yScale)
      .tickSize(-(this._svgWidth - margin.left - margin.right) - 20)
      .ticks(3)
      .tickFormat(() => '');

    svg
      .append('g')
      .style('stroke-dasharray', '3, 3')
      .style('color', 'lightgray')
      .attr('transform', `translate(${this._svgWidth - margin.right}, 17)`) // Bouge les pointillés de l'ordonnée
      .call(yAxisGrid)
      .select('path')
      .remove();

    // Titre
    this.histogramTitle({ svg, titleText, margin });

    // Légendes
    this.histogramLegends({
      svg,
      positionCircle: this._svgWidth - 190,
      positionText: this._svgWidth - 180,
      color: '#000000',
      titleText: 'Poids (kg)',
    });
    this.histogramLegends({
      svg,
      positionCircle: this._svgWidth - 100,
      positionText: this._svgWidth - 90,
      color: '#e41a1c',
      titleText: 'Calories brûlées (kCal)',
    });

    // Initialisation du Hover
    svg
      .selectAll()
      .data(poids)
      .enter()
      .append('g')
      .attr('class', (d, i) => `g-hover-${i}`)
      .attr('transform', (d, i) => `translate(${xScale(i) + margin.left + margin.right - 30}, 70)`)
      .each((d, index, nodes) => {
        const selection = select(nodes[index]);
        selection
          .append('rect')
          .attr('class', () => `g-bg-grey`)
          .attr('height', `${this._svgHeight + margin.bottom - 190}px`)
          .attr('width', () => `65px`)
          .attr('fill', 'transparent');

        selection
          .append('rect')
          .attr('class', () => `g-bg-red`)
          .attr('transform', (d, i) => `translate(${xScale(i) + 120}, 10)`)
          .attr('width', () => `60px`)
          .attr('height', `70px`)
          .attr('fill', 'transparent');

        selection
          .append('text')
          .attr('class', () => `g-text-kg`)
          .text(d => `${d}Kg`)
          .attr('transform', (d, i) => `translate(${xScale(i) + 150}, 30)`)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('fill', 'transparent');

        selection
          .append('text')
          .attr('class', () => `g-text-cal`)
          .text(() => `${calories[index]}Kcal`)
          .attr('transform', (d, i) => `translate(${xScale(i) + 150}, 60)`)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('fill', 'transparent');
      });

    // Barres des histogrammes
    const poidsConfiguration = {
      typeRound: {
        x1: (d, i) => xScale(i) + this._svgWidth / 7.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 7.5,
        y1: () => this._svgHeight + margin.bottom - 150,
        y2: () => this._svgHeight + margin.bottom - 125,
      },
      typeRectangle: {
        x1: (d, i) => xScale(i) + this._svgWidth / 7.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 7.5,
        y1: () => this._svgHeight + margin.bottom - 120,
        y2: () => this._svgHeight + margin.bottom - 125,
      },
      yScale,
    };
    const caloriesConfiguration = {
      typeRound: {
        x1: (d, i) => xScale(i) + this._svgWidth / 6.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 6.5,
        y1: () => this._svgHeight + margin.bottom - 150,
        y2: () => this._svgHeight + margin.bottom - 125,
      },
      typeRectangle: {
        x1: (d, i) => xScale(i) + this._svgWidth / 6.5,
        x2: (d, i) => xScale(i) + this._svgWidth / 6.5,
        y1: () => this._svgHeight + margin.bottom - 120,
        y2: () => this._svgHeight + margin.bottom - 125,
      },
      yScale: yCaloriesScale,
    };

    this.histogramBar({
      type: 'poids',
      svg,
      margin,
      datas: poids,
      configuration: poidsConfiguration,
      color: '#000000',
    });
    this.histogramBar({
      type: 'calories',
      svg,
      margin,
      datas: calories,
      configuration: caloriesConfiguration,
      color: '#e41a1c',
    });

    // Activation des Hovers
    this.activateEventHoverOnbar({ svg, poids, margin, xScale });
  }

  /**
   * Ajoute un titre sur l'histogramme
   * @param svg `svg` de l'histogramme
   * @param margin `margin`
   * @param titleText {string} - Titre
   */
  histogramTitle({ svg, margin, titleText }) {
    svg
      .append('text')
      .attr('x', margin.right)
      .attr('y', 38)
      .text(titleText)
      .style('font-weight', '500');
  }

  /**
   * Ajout une légende sur l'histogramme
   * @param svg `svg` de l'histogramme
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
      .attr('r', 5)
      .attr('fill', color);
    legend
      .append('text')
      .text(titleText)
      .attr('dx', positionText)
      .attr('dy', 35)
      .attr('fill', '#74798C')
      .style('font-size', '14px');
  }

  /**
   * Créer une barre pour chaque valeur réçu
   * @param svg `svg` de l'histogramme
   * @param type {string} `poids | calories`
   * @param datas {number[]} Liste de données
   * @param margin `margin`
   * @param configuration {Object} Configuration des barres
   * @param color {string} `#000000 | #e41a1c`
   */
  histogramBar({ type, svg, datas, margin, configuration, color }) {
    const height = Number(this._svgHeight) - margin.top - margin.bottom;

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
        type === 'calories' ? height - configuration.yScale(d) + 20 : configuration.yScale(d) + 20,
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
        type === 'calories' ? height - configuration.yScale(d) + 20 : configuration.yScale(d) + 20,
      )
      .attr('stroke', color)
      .attr('stroke-width', '8')
      .attr('stroke-linecap', 'butt');
  }

  /**
   * Utilise l'event hover pour afficher des informations supplémentaires
   * @param svg - `svg` de l'histogramme
   * @param poids {number[]} - Les données du poids
   * @param margin - `margin`
   * @param xScale - `ScaleLinear`
   */
  activateEventHoverOnbar({ svg, poids, margin, xScale }) {
    const localIndex = local();
    const setLocalIndex = (d, i, nodes) => localIndex.set(nodes[i], i);

    svg
      .selectAll('.x-axis-group')
      .data(poids)
      .enter()
      .append('rect')
      .attr('class', 'g-rect')
      .attr('transform', (d, i) => `translate(${xScale(i) + margin.left + margin.right - 30}, 70)`)
      .attr('height', `${this._svgHeight + margin.bottom - 190}px`)
      .attr('width', () => `65px`)
      .attr('fill', 'transparent')
      .each(setLocalIndex) // Pour ajouter une série d'index pour le hover
      .on('mouseover', event => this.onHoverIn({ localIndex, event }))
      .on('mouseout', event => this.onHoverOut({ localIndex, event }));
  }

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
