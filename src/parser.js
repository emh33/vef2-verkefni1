/* import { marked } from 'marked';
import matter from 'gray-matter'; */

/**
 *
 * @param
 * @returns
 */
export function parse(input) {
  const data=[];
  /* const comment=[]; */
  input.split(/\r?\n/).forEach(line =>  {
    let number=line;

    /* if(number.trim()[0] === '#'){
      comment.push(number);
    } */

    if(number.includes('.')){
      number=number.replaceAll('.', '');
    }
    if(number.includes(',')){
      number=number.replace(',', '.');
    }
    if(number.trim()!==''){
      number=Number(number);
      if(!Number.isNaN(number)){
        data.push(number);
      }
    }
  });

  return data;
}
