import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AddUserPageComponent } from '../../user/add-user-page/add-user-page.component';
import { BottomSheetHelper } from '../../../helpers/bottomSheetHelper';
import { User } from 'src/app/entities/user';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge, BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users$: Observable<User[]>
  loading$: Observable<boolean>;

  users: User[];
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['firstname', 'lastname', 'username', 'email', 'isAdmin'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private bottomSheet: BottomSheetHelper,
    private userService: UserService
  ) {
    this.users$ = userService.entities$;
    this.loading$ = userService.loading$;

    this.userService.getAll();
  }

  ngOnInit() {


    this.users$.subscribe(data => {
      console.log('User, ', data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // this.userService.getAll().subscribe(data => {
    //   this.users = data;
    //   this.dataSource = new MatTableDataSource(this.users);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUser() {
    this.bottomSheet.openBottomSheet(AddUserPageComponent);
  }

}
