import {
  axisBottom,
  axisRight,
  max,
  min,
  range,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
} from 'd3';

export class D3Service {
  constructor({ ref }) {
    this._ref = ref;
  }

  build({ poids, calories }) {
    select(this._ref).selectAll('*').remove();

    const margin = { top: 80, right: 45, bottom: 40, left: 45 };
    const svgWidth = 800;
    const svgHeight = 400;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = select(this._ref)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('background-color', '#fbfbfb');
    const graphArea = svg
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .attr('preserveAspectRatio', 'xMinYMin')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    this.graphWeight({ poids, graphArea, width, height });
    this.graphCalories({ calories, graphArea, width, height });

    this.moreInfos({ poids, graphArea, width, height });

    const legend = graphArea
      .append('g')
      .attr('transform', `translate(${width - 100},${height - 40})`);

    legend
      .append('circle')
      .attr('cx', -120)
      .attr('cy', -height + 5)
      .attr('r', 6)
      .style('fill', '#000000');

    legend
      .append('text')
      .attr('x', -100)
      .attr('y', -height + 10)
      .text('Poids (kg)')
      .style('font-size', '15px');

    legend
      .append('circle')
      .attr('cx', 10)
      .attr('cy', -height + 5)
      .attr('r', 6)
      .style('fill', '#e41a1c');

    legend
      .append('text')
      .attr('x', 30)
      .attr('y', -height + 10)
      .text('Calories (kCal)')
      .style('font-size', '15px');

    svg
      .append('text')
      .attr('x', width / 5)
      .attr('y', height / 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('Activité quotidienne');
  }

  graphWeight({ poids, graphArea, width, height }) {
    const x = scaleBand()
      .rangeRound([0, width])
      .domain(poids.map((d, i) => i))
      .padding(0.9);

    const y = scaleLinear()
      .range([height, 0])
      .domain([min(poids, d => Number(d)) - 1, max(poids, d => Number(d)) + 5])
      .nice();

    const xAxis = axisBottom(x).tickFormat((d, i) => i + 1);
    const yAxis = axisRight(y).ticks(3).tickSize(-width);

    graphArea
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    graphArea
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${width}, 0)`)
      .attr('stroke-dasharray', '2')
      .call(yAxis)
      .select('.domain')
      .style('padding-top', '50px')
      .attr('display', 'none');

    const rx = 5;
    const ry = 5;

    graphArea
      .selectAll('bar')
      .data(poids)
      .enter()
      .append('path')
      .style('fill', '#000000')
      .attr(
        'd',
        (item, index) => `
        M${x(index) - 10},${y(min(poids, d => Number(d))) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(min(poids, d => Number(d))) - ry}
        h${-x.bandwidth()}Z
      `,
      )
      .transition()
      .duration(500)
      .attr('y', d => y(Number(d)) + ry)
      .attr(
        'd',
        (item, index) => `
        M${x(index) - 10},${y(Number(item)) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(Number(item)) - ry}
        h${-x.bandwidth()}Z
      `,
      );
  }

  graphCalories({ calories, graphArea, width, height }) {
    const x = scaleBand()
      .rangeRound([0, width])
      .domain(calories.map((d, i) => i))
      .padding(0.9);

    const y = scaleLinear()
      .range([height, 0])
      .domain([min(calories, d => Number(d)) - 15, max(calories, d => +d) + 5])
      .nice();

    const rx = 5;
    const ry = 5;

    graphArea
      .selectAll('bar')
      .data(calories)
      .enter()
      .append('path')
      .style('fill', '#e41a1c')
      .attr(
        'd',
        (item, index) => `
        M${x(index) + 10},${y(min(calories, d => Number(d))) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(min(calories, d => Number(d))) - ry}
        h${-x.bandwidth()}Z
      `,
      )
      .transition()
      .duration(500)
      .attr('y', d => y(Number(d)) + ry)
      .attr(
        'd',
        (item, index) => `
        M${x(index) + 10},${y(Number(item)) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(Number(item)) - ry}
        h${-x.bandwidth()}Z
      `,
      );
  }

  moreInfos({ poids, graphArea, width, height }) {
    const x = scaleBand()
      .rangeRound([0, width])
      .domain(poids.map((d, i) => i))
      .padding(0.9);

    graphArea
      .selectAll('.x-axis-group')
      .data(poids)
      .enter()
      .append('g')
      .attr('class', 'g-infos')
      .append('rect')
      .attr('class', 'g-rect')
      .attr('transform', (d, i) => `translate(${x(i) - 30}, 0)`)
      .style('height', `${height}px`)
      .style('width', `${x.bandwidth() + 60}px`)
      .style('fill', 'transparent');

    const infosGroup = graphArea.selectAll('.g-infos').append('rect').attr('class', 'infos');
    infosGroup
      .attr('transform', (d, i) => `translate(${x(i) + 50}, 0)`)
      .style('height', `90px`)
      .style('width', `${x.bandwidth() + 60}px`)
      .style('fill', 'transparent');

    infosGroup
      .append('text')
      .attr('class', 'text-infos')
      .attr('transform', (d, i) => `translate(${x(i) + 50}, 45)`)
      .attr('color', 'green !important')
      .text(`Activité`);

    graphArea
      .selectAll('.g-rect')
      .on('mouseover', event => {
        select(event.currentTarget).style('fill', 'rgba(196,196,196,0.56)');
        select(event.currentTarget.parentElement).select('.infos').style('fill', '#e41a1c');

        select(event.currentTarget.parentElement)
          .select('.text-infos')
          .style('fill', 'white !important');
        select(event.currentTarget.parentElement)
          .select('.text-infos')
          .style('color', 'white !important');
        // tooltip.style('visibility', 'visible').text(`count: 1111`);
      })
      .on('mouseout', event => {
        select(event.currentTarget).style('fill', 'transparent');
        select(event.currentTarget.parentElement).select('.infos').style('fill', 'transparent');

        select(event.currentTarget.parentElement)
          .select('.text-infos')
          .style('fill', 'transparent');
      });
  }

  // /**
  //  * @param ref
  //  * @param poids {number[]}
  //  * @param calories {number[]}
  //  */
  // testExemple({ poids, calories }) {
  //   select(this._ref).selectAll('*').remove();
  //
  //   // Set up margins and dimensions
  //   const margin = { top: 10, right: 30, bottom: 20, left: 50 },
  //     width = 800 - margin.left - margin.right,
  //     height = 500 - margin.top - margin.bottom;
  //
  //   // Append the SVG element to the body of the page
  //   const svg = select(this._ref)
  //     .attr('width', width + margin.left + margin.right)
  //     .attr('height', height + margin.top + margin.bottom)
  //     .attr(
  //       'viewBox',
  //       `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
  //     )
  //     .attr('preserveAspectRatio', 'xMinYMin')
  //     .append('g')
  //     .attr('transform', `translate(${margin.left},${margin.top})`);
  //
  //   // Set up the X scale
  //   const x = scaleBand().domain(range(poids.length)).range([0, width]).padding(0.2);
  //   svg.append('g').attr('transform', `translate(0, ${height})`).call(axisBottom(x));
  //
  //   // Set up the Y scale
  //   const y = scaleLinear()
  //     .domain([0, max([...poids, ...calories])])
  //     .range([height, 0]);
  //
  //   svg
  //     .append('g')
  //     .attr('transform', `translate(${width}, 0)`)
  //     // .call(axisRight(y).ticks(3).tickSize(0))
  //     .call(axisRight(y).ticks(2).tickFormat(null).tickSize(-width))
  //     .attr('stroke-dasharray', '2');
  //
  //   // Set up the color scale
  //   const color = scaleOrdinal().domain(['poids', 'calories']).range(['#000000', '#e41a1c']);
  //
  //   // Draw the bars for datas1
  //   svg
  //     .selectAll('.bar-poids')
  //     .data(poids)
  //     .enter()
  //     .append('rect')
  //     .attr('class', 'bar-poids')
  //     .attr('x', (d, i) => x(i) + x.bandwidth() / 10)
  //     .attr('y', d => y(d))
  //     .attr('width', x.bandwidth() / 3)
  //     .attr('height', d => height - y(d))
  //     .attr('fill', color('poids'))
  //     // .attr('rx', 55) // Arrondir les coins supérieurs
  //     .attr('ry', d => (y(d) !== height ? 5 : 0));
  //
  //   // Draw the bars for datas2
  //   svg
  //     .selectAll('.bar-calories')
  //     .data(calories)
  //     .enter()
  //     .append('rect')
  //     .attr('class', 'bar-calories')
  //     .attr('x', (d, i) => x(i) + x.bandwidth() / 1.8)
  //     .attr('y', d => y(d))
  //     .attr('width', x.bandwidth() / 3)
  //     .attr('height', d => height - y(d))
  //     .attr('fill', color('calories'))
  //     // .attr('rx', 55) // Arrondir les coins supérieurs
  //     .attr('ry', d => (y(d) !== height ? 5 : 0));
  // }

  // /**
  //  *
  //  * @param width
  //  * @param datas
  //  * @return {ScaleBand<string>}
  //  */
  // getAbscisse(width, datas) {
  //   return scaleBand()
  //     .domain(datas.map((_, i) => i.toString()))
  //     .range([0, width])
  //     .padding(0.2);
  // }
  //
  // /**
  //  *
  //  * @param height
  //  * @param max
  //  * @return {ScaleLinear<number, number, never>}
  //  */
  // getOrdonnee(height, max) {
  //   return scaleLinear().domain([0, max]).range([height, 0]);
  // }
  //
  // /**
  //  *
  //  * @param y
  //  * @return {Axis<AxisDomain>}
  //  */
  // makeYGridlines(y) {
  //   return axisRight(y).ticks(5);
  // }
}
