import { Component, computed, inject } from '@angular/core';
import { BarChartComponent } from '../../shared/bar-chart/bar-chart.component';
import { AppStore } from '../../store/app.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visualization-wrapper',
  standalone: true,
  imports: [BarChartComponent, RouterLink],
  templateUrl: './visualization-wrapper.component.html',
  styleUrl: './visualization-wrapper.component.scss',
})
export class VisualizationWrapperComponent {
  public appStore = inject(AppStore);
  public allRepositories = this.appStore.repositories;
  public xAxis = 'name';
  public yAxis = 'stargazerCount';

  public repositories = computed(() => {
    if (!this.allRepositories().length) return [];
    return this.allRepositories().map((data) => {
      return {
        name: data.name,
        stargazerCount: data.stargazerCount || 0,
      };
    });
  });
}
