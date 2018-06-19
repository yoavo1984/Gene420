import {Injectable} from '@angular/core';
import {Phenome} from "../users/model/Phenome";
import {createEmptyPhenome} from "../users/model/Phenome";

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
    },
    {
      "rsid": "rs4986938",
      "genotypes": ["A", "AA"],
      "phenotypes": ["desire"]
    },
    {
      "rsid": "rs2234693",
      "genotypes": ["TT"],
      "phenotypes": ["desire"]
    },
    {
      "rsid": "rs324420",
      "genotypes": ["AA"],
      "phenotypes": ["dependence"]
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
    let phenotypes: Phenome = createEmptyPhenome();

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
