export function webTemplate( title, content ){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${title ?? 'Gagnavinnsla'}</title>
            <link rel="stylesheet" href="../public/styles.css">
        </head>
        <body>
          <div class="container">
            <header class="header">
             <h1>Gagnavinnsla</h1>
             <span>Vefforritun 2 - Verkefni 1 </span>
            </header>
            <main>
             <div class="content">${content ?? ''}</div>
            </main>
          </div>
        </body>
    </html>`;
}

export function makeIndex( files ,filesInfo){
    let list = '';
    for (const file of files){
      const {lenghtNum, std} = filesInfo.get(file);
        const link =`<li><a href="${file}.html">
        <div>Skráarnafn: ${file}</div>
        <div>Fjöldi gagna: ${lenghtNum ?? 'Vantar gögn'}</div>
        <div>Miðgildi gagna: ${std ?? 'Engin gögn til staðar'}</div>
        </a></li>`;
        list+=link;
    }
    return `
    <div>
       <ul class="files">${list}</ul>
    </div>
    `;
}


export function resultHTML(data) {

  const {numbers,stats,filename} =data;

  let numb='';
  for(const number of numbers){
    numb+=`${number} `;

  }

  let result = '';
  let row='';
  if(Object.keys(stats).length === 0){
    result=`
    <section class="no-results">
      <p>Gagnasett hefur engar niðurstöður.</p>
    </section>`;
  }
  else{
    Object.entries(stats).forEach((entry) => {
      const [key, value] = entry;
      const link =`<tr>
        <td>${key}</td>
        <td>${value}</td>
      </tr>
      `;
      row+=link;
    });

    result=`
    <section class="result-stats">
      <table>
        <thead>
            <tr>
                <th colspan="2">Niðurstöður úr skrá ${filename}</th>
            </tr>
        </thead>
        <tbody>${row}</tbody>
      </table>
    </section>
    <section class="result-data">
    <table>
      <thead>
          <tr>
              <th colspan="1">Gögn</th>
          </tr>
      </thead>
    <tbody><tr>
      <td>${numb}</td>
    </tr></tbody>
    </table>
    </section>`
  }

  return `${result}`;
}

