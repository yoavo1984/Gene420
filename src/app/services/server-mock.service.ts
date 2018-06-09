import {Injectable} from '@angular/core';
import {Genetics} from "../users/model/Genetics";

@Injectable()
export class ServerMockService {

  private map = [
    {
      "rsid": "rs2494732",
      "genotypes": ["CC", "CT"],
      "phenotypes": ["anxious", "paranoia"]
    },
    {
      "rsid": "rs1154155",
      "genotypes": ["GG"],
      "phenotypes": ["narcolepsy"]
    },
    {
      "rsid": "rs4570625",
      "genotypes": ["CC"],
      "phenotypes": ["anxious"]
    },
    {
      "rsid": "rs25532",
      "genotypes": ["CC"],
      "phenotypes": ["anxious"]
    },
    {
      "rsid": "rs6994992",
      "genotypes": ["TT"],
      "phenotypes": ["creative", "stimulation", "funny"]
    },
    {
      "rsid": "rs2576573",
      "genotypes": ["A", "G"],
      "phenotypes": ["dependence"]
    },
    {
      "rsid": "rs2229616",
      "phenotypes": ["obesity"]
    },
    {
      "rsid": "rs5082",
      "genotypes": ["CC", "CT"],
      "phenotypes": ["obesity"]
    },
    {
      "rsid": "rs2023239",
      "genotypes": ["G", "C"],
      "phenotypes": ["creative", "stimulation", "funny"]
    },
    {
      "rsid": "rs324420",
      "genotypes": ["G", "C"],
      "phenotypes": ["creative", "stimulation", "funny"]
    },
    {
      "rsid": "rs6994992",
      "genotypes": ["TT"],
      "phenotypes": ["creative"]
    }

  ];

  sanitize(text) {
    return text.replace(/\r?\n|\r/g, "");
  }

  phenotypeMatch(rsid, genotype): string[] {
    for (let record of this.map) {
      let hasGenotype = record["genotypes"] ? record["genotypes"].indexOf(genotype) >= 0 : true;
      if (record["rsid"] == rsid && hasGenotype) {
        return record["phenotypes"];
      }
    }
    return [];
  }

  resolve(data: string, vendor?) {
    //TODO build model
    let phenotypes: Genetics =
    {
      "creative": 0,
      "funny": 0,
      "energetic": 0,
      "desire": 0,
      "stimulation": 0,
      "anxious": 0,
      "paranoia": 0,
      "obesity": 0,
      "narcolepsy": 0,
      "pain": 0,
      "dependence": 0
    };

    let dataLines = data.split("\n");
    let startingLine = 0;
    for (let i = 0; i < dataLines.length; i++) {
      let line = dataLines[i];
      if (line.indexOf("rsid") >= 0) {
        startingLine = i + 1;
        break;
      }
    }

    let geneticDataLines = dataLines.slice(startingLine);
    for (let line of geneticDataLines) {
      let lineData = line.split("\t");
      let rsid = lineData[0];
      let genotype = this.sanitize(lineData[3]);
      let phenotypesMatch = this.phenotypeMatch(rsid, genotype);
      for (let phenotype of phenotypesMatch) {
        phenotypes[phenotype]++;
      }
    }
    return phenotypes;
  }

  resolveGenetics(data: any): Promise<any> {
    return new Promise<any>((resolve, reject)=> {
      let phenotypes;
      try {
        phenotypes = this.resolve(data["geneticsData"]);
      }
      catch (error) {
        reject(error);
      }
      resolve(phenotypes);
    })
  }

  constructor() {
  }

}
