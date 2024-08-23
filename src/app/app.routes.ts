import { Routes } from '@angular/router';
import { GridWrapperComponent } from './components/grid-wrapper/grid-wrapper.component';
import { VisualizationWrapperComponent } from './components/visualization-wrapper/visualization-wrapper.component';

export const routes: Routes = [
  {
    path: '',
    component: GridWrapperComponent,
  },
  {
    path: 'visualize',
    component: VisualizationWrapperComponent,
  },
];
