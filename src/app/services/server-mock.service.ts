import {Injectable} from '@angular/core';
import {Phenome, PHENOTYPE} from "../users/model/Phenome";
import {createEmptyPhenome} from "../users/model/Phenome";

@Injectable()
export class ServerMockService {

  private map = [
    {
      "rsid": "rs2494732",
      "genotypes": ["CC", "CT"],
      "phenotypes": [PHENOTYPE.Anxious, PHENOTYPE.Paranoia]
    },
    {
      "rsid": "rs1154155",
      "genotypes": ["GG"],
      "phenotypes": [PHENOTYPE.Narcolepsy]
    },
    {
      "rsid": "rs4570625",
      "genotypes": ["CC"],
      "phenotypes": [PHENOTYPE.Anxious]
    },
    {
      "rsid": "rs25532",
      "genotypes": ["CC"],
      "phenotypes": [PHENOTYPE.Anxious]
    },
    {
      "rsid": "rs6994992",
      "genotypes": ["TT"],
      "phenotypes": [PHENOTYPE.Creative, PHENOTYPE.Stimulation, PHENOTYPE.Funny]
    },
    {
      "rsid": "rs2576573",
      "genotypes": ["A", "G"],
      "phenotypes": [PHENOTYPE.Dependence]
    },
    {
      "rsid": "rs2229616",
      "phenotypes": [PHENOTYPE.Obesity]
    },
    {
      "rsid": "rs5082",
      "genotypes": ["CC", "CT"],
      "phenotypes": [PHENOTYPE.Obesity]
    },
    {
      "rsid": "rs2023239",
      "genotypes": ["G", "C"],
      "phenotypes": [PHENOTYPE.Creative, PHENOTYPE.Stimulation, PHENOTYPE.Funny]
    },
    {
      "rsid": "rs324420",
      "genotypes": ["G", "C"],
      "phenotypes": [PHENOTYPE.Creative, PHENOTYPE.Stimulation, PHENOTYPE.Funny]
    },
    {
      "rsid": "rs6994992",
      "genotypes": ["TT"],
      "phenotypes": [PHENOTYPE.Creative]
    },
    {
      "rsid": "rs4986938",
      "genotypes": ["A", "AA"],
      "phenotypes": [PHENOTYPE.Desire]
    },
    {
      "rsid": "rs2234693",
      "genotypes": ["TT"],
      "phenotypes": [PHENOTYPE.Desire]
    },
    {
      "rsid": "rs324420",
      "genotypes": ["AA"],
      "phenotypes": [PHENOTYPE.Dependence]
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
