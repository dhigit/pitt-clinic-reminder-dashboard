import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RemindersService } from 'src/app/reminders.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reminders-detail',
  templateUrl: './reminders-detail.component.html',
  styleUrls: ['./reminders-detail.component.css']
})
export class RemindersDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private remindersService: RemindersService,
    private router: Router
  ) { }


  mid = -1;
  mappingInfo = null;
  loadedRemiders = null;

  displayedColumns: string[] = [
    'title',
    'priority',
    'duration',
    'createdTime',
    'overallStatus'
  ];


  ngOnInit(): void {
    this.mid = +this.activatedRoute.snapshot.paramMap.get('mid');
    this.remindersService.getMappingById(this.mid).subscribe(result=> {
      this.mappingInfo = result;
    });

    this.remindersService.getRemindersByMid(this.mid).subscribe(result => {
      this.loadedRemiders = result;
      this.generateChartData();
    });
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



  generateChartData(){
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
    this.loadedRemiders.forEach(element => {

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

