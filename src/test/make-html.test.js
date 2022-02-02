/* eslint-disable no-useless-escape */
import { describe, expect, it } from '@jest/globals';
import { resultHTML, webTemplate, makeIndex } from '../make-html';

describe('resultHTML', () => {
  it('make result HTML with data', () => {
    const input ={
      numbers:[10, 3, -4, 1, 8, 0],
      stats: {
        Frávik: 22.667,
        'Hæsta gild': 10,
        Meðaltal: 3,
        Miðgildi: 2,
        'Minnsta gildi': -4,
        Staðalfrávik: 4.761,
        Summa: 18,
        Svið: 14
      },
      filename: '1'
    }

    const stats = resultHTML(input);
    expect(stats).toStrictEqual(`
    <section class="result-stats">
      <table>
        <thead>
            <tr>
                <th colspan="2">Niðurstöður úr skrá 1</th>
            </tr>
        </thead>
        <tbody><tr>
        <td>Frávik</td>
        <td>22.667</td>
      </tr>
      <tr>
        <td>Hæsta gild</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Meðaltal</td>
        <td>3</td>
      </tr>
      <tr>
        <td>Miðgildi</td>
        <td>2</td>
      </tr>
      <tr>
        <td>Minnsta gildi</td>
        <td>-4</td>
      </tr>
      <tr>
        <td>Staðalfrávik</td>
        <td>4.761</td>
      </tr>
      <tr>
        <td>Summa</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Svið</td>
        <td>14</td>
      </tr>
      </tbody>
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
      <td>10 3 -4 1 8 0 </td>
    </tr></tbody>
    </table>
    </section>`)  ;
  });

  it('make HTML with empty stats', () => {
    const input ={
      numbers:[10, 3, -4, 1, 8, 0],
      stats: {},
      filename: '1'
    }

    const stats = resultHTML(input);
    expect(stats).toStrictEqual(`
    <section class="no-results">
      <p>Gagnasett hefur engar niðurstöður.</p>
    </section>`
    )
  });

});


describe('webTemplate', () => {
  it('make webTemplate', () => {
    const output= webTemplate('Skrá','<p>content</p>');
    expect(output).toStrictEqual(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Skrá</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div class="container">
            <header class="header">
             <h1>Gagnavinnsla</h1>
             <span>Vefforritun 2 - Verkefni 1 </span>
            </header>
            <main>
             <div class="content"><p>content</p></div>
            </main>
          </div>
        </body>
    </html>`)
  });
  it('make webTemplate with out title', () => {
    const output= webTemplate(undefined,'<p>content</p>');
    expect(output).toStrictEqual(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Gagnavinnsla</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div class="container">
            <header class="header">
             <h1>Gagnavinnsla</h1>
             <span>Vefforritun 2 - Verkefni 1 </span>
            </header>
            <main>
             <div class="content"><p>content</p></div>
            </main>
          </div>
        </body>
    </html>`)
  });
  it('make webTemplate with out title', () => {
    const output= webTemplate('title',undefined);
    expect(output).toStrictEqual(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>title</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div class="container">
            <header class="header">
             <h1>Gagnavinnsla</h1>
             <span>Vefforritun 2 - Verkefni 1 </span>
            </header>
            <main>
             <div class="content"></div>
            </main>
          </div>
        </body>
    </html>`)
  });
});


describe('makeIndex', () => {
  it('make makeIndex', () => {
    const filename=['skrá 1','Skrá 2','Skrá 3'];
    const info = new Map;

    info.set(filename[0], {lenghtNum:1 , std: 1})
    info.set(filename[1], {std: 2})
    info.set(filename[2], {lenghtNum:2 })

    const output= makeIndex(filename,info);
    expect(output).toStrictEqual(`
    <div>
       <ul class="files"><li><a href="skrá 1.html">
        <div>Skráarnafn: skrá 1</div>
        <div>Fjöldi gagna: 1</div>
        <div>Miðgildi gagna: 1</div>
        </a></li><li><a href="Skrá 2.html">
        <div>Skráarnafn: Skrá 2</div>
        <div>Fjöldi gagna: Vantar gögn</div>
        <div>Miðgildi gagna: 2</div>
        </a></li><li><a href="Skrá 3.html">
        <div>Skráarnafn: Skrá 3</div>
        <div>Fjöldi gagna: 2</div>
        <div>Miðgildi gagna: Engin gögn til staðar</div>
        </a></li></ul>
    </div>
    `)
  });

});
