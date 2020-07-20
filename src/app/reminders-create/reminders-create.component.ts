import { Component, OnInit } from '@angular/core';
import { RemindersService } from '../reminders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reminder } from '../model/reminder';
import { MatSnackBar, MatSnackBarModule  } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reminders-create',
  templateUrl: './reminders-create.component.html',
  styleUrls: ['./reminders-create.component.css']
})
export class RemindersCreateComponent implements OnInit {

  mappingInfo = null;
  mid = -1;
  reminderModel = new Reminder('','',0,'',{mid: 0});;

  constructor(
    private remindersService: RemindersService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
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
