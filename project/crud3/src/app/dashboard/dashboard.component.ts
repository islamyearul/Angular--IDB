import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Usermodule } from '../usermodule';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: Usermodule[];
  cat:number;
 
  constructor(private dataService: DataserviceService,private router:Router) { }
 
  ngOnInit() {
    this.getuserdetails();
 
  }
getuserdetails()
{
  this.dataService.getAllUsers(this.cat).subscribe(response =>
    {
      this.users = response.map(item =>
      {
        return new Usermodule(
          item.Id,
            item.name,
            item.pwd,
            item.email,
            item.mobile,
        );
      });
    });
}
deleteuserdetails(user:Usermodule)
{
  this.dataService.removeEmployee(user.Id)
  .subscribe( data => {
    //this.users = this.users.filter(u => u !== user);
    this.getuserdetails();
  })
 
}
updateUser(user: Usermodule): void {
  window.localStorage.removeItem("editId");
  window.localStorage.setItem("editId", user.Id.toString());
  this.router.navigate(['edit']);
};
addUser(): void {
  this.router.navigate(['create']);
};
}
 