const fs = require('fs');
const readline = require('readline');

function readAllLines(path: any) {
  return new Promise((resolve, reject) => {
    // Test file access directly, so that we can fail fast.
    // Otherwise, an ENOENT is thrown in the global scope by the readline internals.
    try {
      fs.accessSync(path, fs.constants.R_OK);
    } catch (err) {
      reject(err);
    }

    let lines: any = [];

    const reader = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity
    });

    reader
      .on('line', (line: any) => lines.push(line))
      .on('close', () => resolve(lines));
  });
}

export const configFromPath = async function configFromPath(path: any) {
  const lines = await readAllLines(path) as any;

  return lines
    .filter((line: string) => !/^\s*?#/.test(line))
    .map((line: string) => line
      .split('=')
      .map((s: string) => s.trim()))
    .reduce((config: { [x: string]: any; }, [k, v]: any) => {
      config[k] = v;
      return config;
    }, {});
};