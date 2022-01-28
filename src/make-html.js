export function webTemplate( title, container ){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title> Þetta eru gögn úr skrá ${title ?? ''}</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div class="wrapper">
            <header class="header">
             <h1>Gagnavinnsla</h1>
            </header>
            <main class="main">
              ${container ?? ''}
            </main>
          </div>
        </body>
    </html>`;
}
export function makeIndex( entries ){
    let list = '';
    for (const entry of entries){
        const link =`<li><a href="${entry}.html">Þetta er skrá númer ${entry}</a></li>`;
        list+=link;
    }
    return `<ul>${list}</ul>`;
}


export function mainHTML(data) {

  const {stats,filename} =data;

  let result = '';
  let row='';
  if(Object.keys(stats).length === 0){
    result='Gagnasett hefur engar niðurstöður';
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

    result=`<table>
    <thead>
        <tr>
            <th colspan="2">Niðurstöður</th>
        </tr>
    </thead>
    <tbody>${row}</tbody>
    </table>`
  }

  return `
  <section>
    <div class = "filename">Þessi skrá er númer ${filename}</div>
    <div class ="result">${result}</div>
  </section>`;
}

