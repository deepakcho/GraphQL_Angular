import { Component, computed, inject } from '@angular/core';
import { GridComponent } from '../../shared/grid/grid.component';
import { RepoStore } from '../../store/repo.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid-wrapper',
  standalone: true,
  imports: [GridComponent, RouterLink],
  templateUrl: './grid-wrapper.component.html',
  styleUrl: './grid-wrapper.component.scss',
})
export class GridWrapperComponent {
  public repoStore = inject(RepoStore);
  public allRepositories = this.repoStore.repositories;
  public repositories = computed(() => {
    if (!this.allRepositories().length) return [];
    return this.allRepositories().map((data) => {
      return {
        name: data.name,
        url: data.url,
        stargazerCount: data.stargazerCount,
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
