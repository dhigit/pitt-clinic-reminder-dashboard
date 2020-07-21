import { Component, OnInit } from '@angular/core';
import { RemindersService } from '../reminders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reminder } from '../model/reminder';
import { MatSnackBar, MatSnackBarModule  } from '@angular/material/snack-bar';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-reminders-create',
  templateUrl: './reminders-create.component.html',
  styleUrls: ['./reminders-create.component.css']
})
export class RemindersCreateComponent implements OnInit {

  mappingInfo = null;
  mid = -1;
  reminderModel = new Reminder('','',0,'',{mid: 0});
  doctorId = -1;

  constructor(
    private remindersService: RemindersService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthserviceService
  ) { }

  ngOnInit(): void {

    this.authService.authUserObservable.subscribe(auth => {
      if (auth.status=="AUTHORIZED"){
        this.doctorId = auth.ID;
      }
    });

    if (this.doctorId==-1){
      this.router.navigate([`/login`]);
    }

    this.mid = +this.activatedRoute.snapshot.paramMap.get('mid');
    this.remindersService.getMappingById(this.mid).subscribe(result=> {
      this.mappingInfo = result;
      this.reminderModel.mapping.mid = this.mappingInfo.mid;
    });
  }

  onSubmit(){
    this.remindersService.postReminder(this.reminderModel).subscribe(result => {
      console.log(result);
      this._snackBar.open('data Saved', 'dismiss', {
        duration:3000
      });
      setTimeout(() => {
          this.router.navigate([`/reminders/${this.mappingInfo.mid}`]);
      }, 3000);
    });
  }


}
