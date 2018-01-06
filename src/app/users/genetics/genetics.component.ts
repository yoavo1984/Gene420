import {Component, OnInit, Input} from '@angular/core';
import {UserDaoService} from "../services/user-dao.service";
import {AuthService} from "../../authentication/services/auth-service";
import {Genetics} from "../model/Genetics";

@Component({
  selector: 'gene420-genetics',
  templateUrl: './genetics.component.html',
  styleUrls: ['./genetics.component.css']
})
export class GeneticsComponent implements OnInit {

  @Input() user;
  private iconByPhenotype = {
    "craving": "fa fa-birthday-cake",
    "psychosis": "fa fa-bullseye",
    "memory": "fa fa-floppy-o",
    "dependence": "fa fa-heart",
    "decision": "fa fa-lightbulb-o"
  };
  constructor(private userDao:UserDaoService, private authService:AuthService) { }

  ngOnInit() {
    this.getUserGenetics();
  }

  getIconClass(phenotype){
    return this.iconByPhenotype[phenotype] +' fa-3x';
  }

  public geneticsChartOptions:any = {
    scale: {
      ticks: {
        display:false,
        //showLabelBackdrop: false
      }

    },
    responsive: true
  };
  public geneticsChartLabels:any[] = ["Craving", 'Decision', 'Dependence', 'Memory', 'Psychosis'];
  public geneticsChartType:string = 'radar';
  public geneticsChartLegend:boolean = false;

  public geneticsChartData:any[] = [
    {data: [0, 0, 0, 0, 0,], label: ''},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  getUserGenetics():void{
    let geneticArray = [];
    let genetics = this.userDao.getGenetics(this.authService.getCurrentUserUid());
    genetics.subscribe((geneticData)=>{
      for (let phenotype in geneticData){
        geneticArray.push(geneticData[phenotype]);
      }
      this.geneticsChartData = JSON.parse(JSON.stringify(geneticArray));
    });
  }

}
