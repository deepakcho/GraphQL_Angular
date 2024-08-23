import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppStore } from './store/app.store';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SearchUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public appStore = inject(AppStore);
  public selectedUser!: User;
  public users = this.appStore.searchedUsers;
  public loading = this.appStore.loading;
  public repositories = this.appStore.repositories;


  public searchUserByTerm(searchTerm: string) {
    this.appStore.searchUser(searchTerm);
  }
  public selectUser(user: User) {
    this.appStore.loadRepo(user.login);
    this.selectedUser = user;
  }
}
