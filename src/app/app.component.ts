import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepoStore } from './store/repo.store';
import { UserStore } from './store/user.store';
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
  public repoStore = inject(RepoStore);
  public userStore = inject(UserStore);
  public selectedUser!: User;

  public searchUserByTerm(searchTerm: string) {
    this.userStore.searchUser(searchTerm);
  }
  public selectUser(user: User) {
    this.repoStore.loadRepo(user.login);
    this.selectedUser = user;
  }
}
