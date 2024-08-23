import { Component, computed, inject } from '@angular/core';
import { GridComponent } from '../../shared/grid/grid.component';
import { AppStore } from '../../store/app.store';
import { RouterLink } from '@angular/router';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-grid-wrapper',
  standalone: true,
  imports: [GridComponent, RouterLink],
  templateUrl: './grid-wrapper.component.html',
  styleUrl: './grid-wrapper.component.scss',
})
export class GridWrapperComponent {
  public appStore = inject(AppStore);
  public allRepositories = this.appStore.repositories;
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

  public colDefs = computed(() => {
    if (!this.repositories().length) return [];
    return Object.keys(this.repositories()[0]).map((d) => {
      return { field: d } as ColDef;
    });
  });
}
