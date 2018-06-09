export class DnaDataUtils {

  public static splitToChunks(data: string):string[] {
    let chunkSize = 100;
    let chunks = [];
    let dataLines = data.split("\n");
    let startingLine = 0;
    for (let i = 0; i < dataLines.length; i++) {
      let line = dataLines[i];
      if (line.indexOf("rsid") >= 0) {
        startingLine = i + 1;
        break;
      }
    }
    let stringStartingLine = dataLines[startingLine - 1];

    let chunk = [];
    for (let i = 0; i < dataLines.length; i++) {
      chunk.push(dataLines[i]);
      if (i % chunkSize == 0) {
        let stringChunk = stringStartingLine + "\n" + chunk.join("\n");
        chunks.push(stringChunk);
        chunk = [];
      }
    }
    return chunks;
  }
}
