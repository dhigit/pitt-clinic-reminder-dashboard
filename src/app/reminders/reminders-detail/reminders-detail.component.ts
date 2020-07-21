import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RemindersService } from 'src/app/reminders.service';
import { BaseChartDirective } from 'ng2-charts';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-reminders-detail',
  templateUrl: './reminders-detail.component.html',
  styleUrls: ['./reminders-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RemindersDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private remindersService: RemindersService,
    private router: Router,
    private authService: AuthserviceService
  ) { }

  expandedElement: any;

  mid = -1;
  mappingInfo = null;
  loadedRemiders = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'title',
    'priority',
    'duration',
    'createdTime',
    'overallStatus'
  ];


  ngOnInit(): void {

    if (!localStorage.length){
      this.router.navigate([`/login`]);
    }

    this.mid = +this.activatedRoute.snapshot.paramMap.get('mid');
    this.remindersService.getMappingById(this.mid).subscribe(result=> {
      this.mappingInfo = result;
    });

    this.remindersService.getRemindersByMid(this.mid).subscribe(result => {
      this.generateChartData(result);
      this.loadedRemiders = new MatTableDataSource(result);
      this.loadedRemiders.paginator = this.paginator;
      this.loadedRemiders.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loadedRemiders.filter = filterValue.trim().toLowerCase();

    if (this.loadedRemiders.paginator) {
      this.loadedRemiders.paginator.firstPage();
    }
  }

  /* CHARTS */

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'bar';
  public barChartLabels = [];// ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barData = []; //[65, 59, 80, 81, 56, 55, 40]

  public barChartLegend = true;
  public barChartData = [
    {
      data: this.barData,
      label: 'Overdue count for last 7 days'
    }
  ];



  generateChartData(result){
    const chartData = [];


    for (let i=0; i<7; i++){
      var d = new Date();
      d.setDate(d.getDate() - i);
      chartData.push({
        label: d.toDateString(),
        value: 0
      });
      //this.chart.labels.push(d.toDateString());
    }

    const dateNow = new Date(new Date().toDateString());
    result.forEach(element => {

      if (element.overallStatus==2){
        const dateCurr = new Date(new Date(element.createdTime).toDateString());
        const daysDiff = (dateNow.valueOf() - dateCurr.valueOf())/1000/60/60/24;
        if (daysDiff<7){
          chartData[daysDiff].value++;
        }
      }


    });

    chartData.forEach(element => {
      this.chart.labels.push(element.label);
      this.chart.datasets.forEach((dataset)=>{
        dataset.data.push(element.value);
      });
    });


    this.chart.update();

    //console.log(chartData);
  }

  goToCreateReminderPage(){
    this.router.navigate([`/reminders/create/${this.mid}`])
  }

}

