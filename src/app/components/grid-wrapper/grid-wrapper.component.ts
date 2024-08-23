import { Component, computed, inject, signal } from '@angular/core';
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
  public searchTerm = signal('');
  public repositories = computed(() => {
    if (!this.allRepositories().length) return [];
    const searchKey = this.searchTerm();
    return this.allRepositories()
      .filter((repo) => {
        return !searchKey ? true : repo.name.includes(searchKey);
      })
      .map((data) => {
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
  public searchRepositories(str: string) {
    this.searchTerm.set(str);
  }
}
