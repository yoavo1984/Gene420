import {Component, OnInit} from '@angular/core';
import {Upload} from "../../model/Upload";
import {GeneticsDataUploaderService} from "../../services/genetics-data-uploader.service";
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";
import {Response} from "@angular/http";
import {ServerMockService} from "../../../services/server-mock.service";

@Component({
  selector: 'gene420-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: GeneticsDataUploaderService, private httpClient: HttpClient, private serverMock:ServerMockService) {
  }

  ngOnInit() {

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0);
    let reader = new FileReader();

    reader.onload = ()=> {
      let text = reader.result;
      let data = {"geneticsData":text};
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      };

      //let response = this.httpClient.post("https://us-central1-gene420site.cloudfunctions.net/resolveGenetics", data, httpOptions).toPromise();
      let response = this.serverMock.resolveGenetics(data);

      response.then((phenotypes)=>{
        console.log(phenotypes)
      }).catch((error)=>{
        console.log(error);
      })


    };
    reader.readAsText(file);


    this.currentUpload = new Upload(file);
    //this.upSvc.pushUpload(this.currentUpload)
  }

}
