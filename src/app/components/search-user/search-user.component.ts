import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.scss',
})
export class SearchUserComponent implements OnInit {
  public searchTerm = '';
  users = input<User[]>([]);
  loading = input<boolean>(false);
  private modelChanged = new Subject<string>();
  @Output() selectedUser = new EventEmitter();
  @Output() serchedTerm = new EventEmitter();
  showList = false;
  public searchUserByTerm() {
    this.modelChanged.next(this.searchTerm);
    this.showList = this.searchTerm.length > 0;
  }

  ngOnInit() {
    this.modelChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.serchedTerm.emit(this.searchTerm);
      });
  }

  selectUser(user: User) {
    this.selectedUser.emit(user);
    this.showList = false;
  }

  onFocus() {
    this.showList = this.searchTerm.length > 0;
  }

  onBlur() {
    setTimeout(() => (this.showList = false), 200); // Delay to allow item click to register
  }
}
