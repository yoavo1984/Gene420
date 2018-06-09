import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service";
import {HttpHeaders} from "@angular/common/http";
import {Upload} from "../../users/model/Upload";
import {HttpClient} from "@angular/common/http";
import {ServerMockService} from "../../services/server-mock.service";
import {UserDaoService} from "../../users/services/user-dao.service";
import {DnaDataUtils} from "../../utils/DnaDataUtils";

@Component({
  selector: 'gene420-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private vendorList = ["23AndMe"]

  private form;
  public stage: number = 0;
  private questionnaire;
  private dna;
  private selectedFiles;
  private dnaLoadingProgress: number = 0;
  private dnaTotalSize: number = 0;
  private dnaLoaded;
  //1 - initial form, 2 - DNA, 3 - Questionnaire


  constructor(private authService: AuthService,
              private httpClient: HttpClient,
              private serverMockService: ServerMockService,
              private userDao: UserDaoService) {
  }

  ngOnInit() {
  }

  skipUploading() {
    this.stage = 4;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  submitInitialForm(form: any) {
    this.form = form;
    this.stage = 1;
  }

  submitDNA(dnaData) {
    this.dna = dnaData;
    this.stage = 2;
  }

  submitQuestionnaire(form: any) {
    this.questionnaire = form;
    this.stage = 3;
    this.signUp(form)
  }


  signUp(form: any) {
    if (this.dna) {
      this.resolveAndUpdateDnaData();
    }

    //this.authService.signUp(form.email, form.password, form.firstName + " " + form.lastName);

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

      let phenotypesData = [];

      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        let data = {"geneticsData": chunk};
        setTimeout(()=> {
          //let response = this.httpClient.post("https://us-central1-gene420site.cloudfunctions.net/resolveGenetics", data, httpOptions).toPromise();
          let response = this.serverMockService.resolveGenetics(data);
          response.then((phenotypes)=> {
            console.log(phenotypes);
            this.dnaLoadingProgress++;
            phenotypesData.push(phenotypes);

            if (this.dnaLoadingProgress == this.dnaTotalSize) {
              this.userDao.updateUserGenetics(this.authService.getCurrentUserUid(), phenotypes);
              this.dnaLoaded = true;
            }
          }).catch((error)=> {
            console.log(error);
          })
        }, i * 20)
      }


    };

  }

}
