import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {ServerMockService} from "../../services/server-mock.service";
import {UserDaoService} from "../../users/services/user-dao.service";
import {DnaDataUtils} from "../../utils/DnaDataUtils";
import {Phenome, createEmptyPhenome} from "../../users/model/Phenome";
import {Router} from "@angular/router";

@Component({
  selector: 'gene420-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
//Stages: 1 - initial form, 2 - DNA, 3 - Questionnaire
export class SignUpComponent implements OnInit {

  private vendorList = ["23AndMe"];

  private initialForm;
  public stage: number = 0;
  private questionnaire;
  private dna;
  private selectedFiles;
  private dnaLoadingProgress: number = 0;
  private dnaTotalSize: number = 0;
  private dnaLoaded;
  private skipped:boolean;
  private errorSignupMessage:string = "";

  constructor(private authService: AuthService,
              private httpClient: HttpClient,
              private serverMockService: ServerMockService,
              private userDao: UserDaoService,
              private router:Router) {
  }

  resetStage(){
    this.stage = 0;
  }

  ngOnInit() {
    this.resetStage();
  }

  skipUploading() {
    this.skipped = true;
    this.stage = 2;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  submitInitialForm(form: any) {
    this.initialForm = form;
    this.stage = 1;
  }

  submitDNA(dnaData) {
    this.dna = dnaData;
    this.stage = 2;
  }

  submitQuestionnaire(form: any) {
    this.questionnaire = form;
    this.stage = 3;
    this.signUp()
  }


  signUp() {
    this.authService.signUp(this.initialForm.email, this.initialForm.password, this.initialForm.firstName + " " + this.initialForm.lastName)
    .then(()=>{
      if (this.dna) {
        this.resolveAndUpdateDnaData();
      }
    })
    .catch((error)=>{
      this.errorSignupMessage = error;
    });
  }

  updatePhenome(phenotypes:Phenome){
    this.userDao.updateUserPhenome(this.authService.getCurrentUserUid(), phenotypes);
    setTimeout(()=>{
      this.router.navigate(['user','strain-browser']);
    }, 4000)
  }

  resolvePhenotypesDataOfQuestionnaire(){
    let phenotypes:Phenome = {
      "creative":this.questionnaire.insomnia? 1:0,
      "funny": 0,
      "energetic": this.questionnaire.insomnia? 1:0,
      "desire": this.questionnaire.male? 2:0,
      "stimulation": 0,
      "anxious": this.questionnaire.anxiety? 1:0,
      "paranoia": this.questionnaire.depression? 1:0 + this.questionnaire.psychosis? 1:0,
      "obesity": 0,
      "narcolepsy": this.questionnaire.insomnia? -1:0,
      "pain": this.questionnaire.depression? 1:0,
      "dependence": this.questionnaire.depression? 2:0
    };
    return phenotypes;
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

              phenotypesData.push(this.resolvePhenotypesDataOfQuestionnaire());

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

  getLoadingProgress():number{
    if (this.dnaTotalSize==0){
      return 0;
    }
    return Math.floor((this.dnaLoadingProgress/this.dnaTotalSize)*100)
  }

  navigateToPrivateArea(){
    this.resetStage();
    setTimeout(()=>{
      this.router.navigate(['user', 'strain-browser']);
    }, 300);

  }

  startOver(){
    this.resetStage();
  }

}
