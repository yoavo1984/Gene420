import { Injectable } from '@angular/core';

@Injectable()
export class ServerMockService {

  private map = [
      {
        "rsid": "rs2494732",
        "genotypes":["CC", "CT"],
        "phenotypes": ["anxious", "paranoia"]
      },
      {
        "rsid": "rs1154155",
        "genotypes": ["GG"],
        "phenotypes": ["narcolepsy"]
      }

  ];

  sanitize(text){
    return text.replace(/\r?\n|\r/g, "");
  }

  phenotypeMatch(rsid, genotype):string[]{
    for (let record of this.map){
      if (record["rsid"] == rsid && record["genotypes"].indexOf(genotype)>=0){
        return record["phenotypes"];
      }
    }
    return [];
  }

  resolve(data:string, vendor?){
    //TODO build model
    let phenotypes = {"anxious":0, "narcolepsy":0};

    let dataLines = data.split("\n");
    let startingLine = 0;
    for (let i=0; i<dataLines.length; i++){
      let line = dataLines[i];
      if (line.indexOf("rsid")>=0){
        startingLine = i+1;
        break;
      }
    }

    let geneticDataLines = dataLines.slice(startingLine);
    for (let line of geneticDataLines){
      let lineData = line.split("\t");
      let rsid = lineData[0];
      let genotype = this.sanitize(lineData[3]);
      let phenotypesMatch = this.phenotypeMatch(rsid, genotype);
      for (let phenotype of phenotypesMatch){
        phenotypes[phenotype]++;
      }
    }
    return phenotypes;
  }

  resolveGenetics(data:any):Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      let phenotypes;
      try{
        phenotypes = this.resolve(data["geneticsData"]);
      }
      catch (error){
        reject(error);
      }
      resolve(phenotypes);
    })
  }

  constructor() { }

}
