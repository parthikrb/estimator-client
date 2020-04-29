import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Story } from '../../../entities/story';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Sprint } from 'src/app/entities/sprint';

@Component({
  selector: 'app-sprint-story-details',
  templateUrl: './sprint-story-details.component.html',
  styleUrls: ['./sprint-story-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SprintStoryDetailsComponent implements OnInit, OnChanges {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public devValue = [];
  public qaValue = [];
  public baValue = [];

  public barChartData: ChartDataSets[] = [
    { data: this.devValue, label: 'Developer' },
    { data: this.qaValue, label: 'Quality Analyst' },
    { data: this.baValue, label: 'Business Analyst' }
  ];

  constructor() {
  }

  @Input() dataSource: Story[];

  @Input() sprint: Sprint;

  totalEstimation: any;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource.currentValue) {
      this.barChartLabels = [];
      this.devValue = [];
      this.qaValue = [];
      this.baValue = [];
      changes.dataSource.currentValue.forEach(story => {
        this.barChartLabels.push(story.storyname);
        this.devValue.push(story.dev);
        this.qaValue.push(story.qa);
        this.baValue.push(story.ba);
      });
      this.barChartData[0].data = this.devValue;
      this.barChartData[1].data = this.qaValue;
      this.barChartData[2].data = this.baValue;

      // Computing total estimation
      this.totalEstimation = Array.from(changes.dataSource.currentValue.reduce(
        (acc, obj) => Object.keys(obj).reduce(
          // tslint:disable-next-line: no-shadowed-variable
          (acc, key) => typeof obj[key] === 'number'
            ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
            : acc,
          acc),
        new Map())).reduce(
          (acc, [name, values]) =>
            Object.assign(acc, { [name]: Math.ceil(values.reduce((a, b) => a + b)) }),
          {}
        );
      console.log(this.totalEstimation);
    }

    console.log(changes.sprint.currentValue);

  }



}
