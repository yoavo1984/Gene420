import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DnaDataUtils} from "../utils/DnaDataUtils";
import {HttpHeaders} from "@angular/common/http";
import {Phenome, createEmptyPhenome} from "../users/model/Phenome";
import {UserDaoService} from "../users/services/user-dao.service";
import {ServerMockService} from "../services/server-mock.service";
import {AuthService} from "../authentication/services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'gene420-dna-upload',
  templateUrl: './dna-upload.component.html',
  styleUrls: ['./dna-upload.component.css']
})
export class DnaUploadComponent implements OnInit {

  @Output() complete = new EventEmitter<any>();
  private dnaData;
  private selectedFiles;
  private dnaTotalSize;
  private dnaLoadingProgress;
  private dnaLoaded;

  constructor(private userDao:UserDaoService,
              private serverMockService:ServerMockService,
              private authService:AuthService, /*TODO: is this needed?*/
              private router:Router) { }

  ngOnInit() {
  }

  submitDNA(dnaData) {
    this.dnaData = dnaData;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  updatePhenome(phenotypes:Phenome){
    this.userDao.updateUserPhenome(this.authService.getCurrentUserUid(), phenotypes);
    setTimeout(()=>{
      this.router.navigate(['user','strain-browser']);
    }, 4000)
  }





  resolvePhenotypes(phenotypesData:Phenome[]){
    let phenotypes:Phenome = createEmptyPhenome();
    for (let dataSet of phenotypesData){
      for (let phenotype in dataSet){
        phenotypes[phenotype] = phenotypes[phenotype] + dataSet[phenotype];
      }
    }
    console.log("Updating user genetics with: "+JSON.stringify(phenotypes));
    return phenotypes;
  }

  getLoadingProgress():number{
    if (this.dnaTotalSize==0){
      return 0;
    }
    return Math.floor((this.dnaLoadingProgress/this.dnaTotalSize)*100)
  }

  resolveAndUpdateDnaData() {
    let file = this.selectedFiles.item(0);
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = ()=> {
      let danaDataText = reader.result;

      let chunks:string[] = DnaDataUtils.splitToChunks(danaDataText);
      this.dnaTotalSize = chunks.length;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      };

      let phenotypesData:Phenome[] = [];

      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        let data = {"geneticsData": chunk};
        setTimeout(()=> {
          //let response = this.httpClient.post("https://us-central1-gene420site.cloudfunctions.net/resolveGenetics", data, httpOptions).toPromise();
          let response = this.serverMockService.resolveGenetics(data);
          response.then((phenotypes)=> {

            this.dnaLoadingProgress++;
            phenotypesData.push(phenotypes);

            if (this.dnaLoadingProgress == this.dnaTotalSize) {

              //phenotypesData.push(this.resolvePhenotypesDataOfQuestionnaire());

              let phenotypes = this.resolvePhenotypes(phenotypesData);
              this.updatePhenome(phenotypes);
              this.dnaLoaded = true;
            }
          }).catch((error)=> {
            this.dnaLoadingProgress++;
            console.log(error);
          })
        }, i * 10)
      }
    };

  }

}
