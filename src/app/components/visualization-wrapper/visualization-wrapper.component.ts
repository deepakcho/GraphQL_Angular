import { Component, computed, inject } from '@angular/core';
import { BarChartComponent } from '../../shared/bar-chart/bar-chart.component';
import { RepoStore } from '../../store/repo.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visualization-wrapper',
  standalone: true,
  imports: [BarChartComponent, RouterLink],
  templateUrl: './visualization-wrapper.component.html',
  styleUrl: './visualization-wrapper.component.scss',
})
export class VisualizationWrapperComponent {
  public repoStore = inject(RepoStore);
  public allRepositories = this.repoStore.repositories;
  public repositories = computed(() => {
    if (!this.allRepositories().length) return [];
    return this.allRepositories().map((data) => {
      return {
        name: data.name,
        url: data.url,
        stargazerCount: data.stargazerCount || 0,
      };
    });
  });
  public allColumns = computed(() => {
    if (!this.repositories().length) return [];
    return Object.keys(this.repositories()[0]).map((d) => {
      return { field: d };
    });
  });
}
