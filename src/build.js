/* eslint-disable no-await-in-loop */

import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { calculate } from './calculator.js';
/* pakkar frá okkur eigin kóða */
import { resultHTML, makeIndex, webTemplate } from './make-html.js';
import { parse } from './parser.js';



const BLOG_DIR = './data';
const OUTPUT_DIR ='./dist'

async function direxists(dir) {
  try {
    const info = await stat(dir);
    return info.isDirectory();
  } catch (e) {
    return false;
  }
}

async function main() {
  const files = await readdir(BLOG_DIR);

  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

 const htmlfiles =[];
 const filesInfo= new Map()
  for (const file of files) {
    const path = join(BLOG_DIR, file);
    const data= await readFile(path);
    const content = data.toString('utf-8');
    const numbers = parse(content);

    const filename = file.toString().split('.')[0];

    let stats={};
    if (numbers.length > 0 ){
      stats = calculate(numbers);
    }

    const result = {
      'numbers':numbers,
      'stats': stats,
      'filename':filename
    };

    const template = webTemplate(result.filename,resultHTML(result));

    const slug = join(OUTPUT_DIR, `${result.filename}.html`);

    await writeFile(slug, template, { flag: 'w+' });

    htmlfiles.push(filename);
    filesInfo.set(filename, {lenghtNum: result.numbers.length, std: result.stats.Staðalfrávik})
  }

  const index = webTemplate(' Gagnavinnsla ', makeIndex(htmlfiles,filesInfo));
  try{
  await writeFile(join(OUTPUT_DIR, 'index.html'), index, { flag: 'w+' });
  }
  catch(e){
    console.error(`Can't write file index : ${e}` )
  }

}

// eslint-disable-next-line no-console
main().catch((err) => console.log(err));
