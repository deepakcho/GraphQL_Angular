import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private data: any[] = []; // Array to store the parsed data
  private svg: any;
  private margin = { top: 20, right: 30, bottom: 200, left: 40 };
  private width: number = 0;
  private height: number = 800;
  private resizeObserver: ResizeObserver | undefined;

  @Input() set chartData(data: any[]) {
    this.data = data;
    this.updateChart();
  }

  @Input() xField: string = ''; // Field for x-axis
  @Input() yField: string = ''; // Field for y-axis

  constructor() {}

  ngOnInit(): void {
    this.createChart();
    this.resizeObserver = new ResizeObserver(() => this.updateChart());
    this.resizeObserver.observe(this.chartContainer.nativeElement);
  }

  private createChart(): void {
    this.svg = d3
      .select('#chart')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.svg.append('g').attr('class', 'chart-group');
    this.svg.append('g').attr('class', 'x-axis');
    this.svg.append('g').attr('class', 'y-axis');
  }

  private updateChart(): void {
    if (!this.svg) return;
    const container = this.chartContainer.nativeElement;
    const boundingRect = container.getBoundingClientRect();
    this.width = boundingRect.width - this.margin.left - this.margin.right;
    this.height = boundingRect.height - this.margin.top - this.margin.bottom;

    this.svg
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    const chartGroup = this.svg
      .select('.chart-group')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d[this.xField]))
      .range([0, this.width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => d[this.yField])! * 1.1])
      .range([this.height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(5);

    const bars = chartGroup
      .selectAll('.bar')
      .data(this.data, (d: any) => d[this.xField]);

    bars.exit().remove();

    bars
      .attr('x', (d: any) => x(d[this.xField]))
      .attr('y', (d: any) => y(d[this.yField]))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => Math.abs(this.height - y(d[this.yField])));

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => x(d[this.xField]))
      .attr('y', (d: any) => y(d[this.yField]))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => Math.abs(this.height - y(d[this.yField])))
      .attr('fill', '#182230');

    this.svg
      .select('.x-axis')
      .attr(
        'transform',
        `translate(${this.margin.left},${this.margin.top + this.height})`
      )
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px')
      .style('fill', '#333')
      .style('white-space', 'nowrap')
      .style('padding', '10px'); // Additional padding if needed

    this.svg
      .select('.y-axis')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
      .call(yAxis);
  }
}
