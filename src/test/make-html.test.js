/* eslint-disable no-useless-escape */
import { describe, expect, it } from '@jest/globals';
import { mainHTML } from '../make-html';

describe('mainHTML', () => {
  it.skip('make mainHTML', () => {
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

    const stats = mainHTML(input);
    expect(stats).toStrictEqual(`
  <section>
  <table>
    <thead>
        <tr>
            <th colspan=\"2\">Niðurstöður</th>
        </tr>
    </thead>
    <tbody><tr>
        <td>variance</td>
        <td>22.667</td>
      </tr>
      <tr>
        <td>max</td>
        <td>10</td>
      </tr>
      <tr>
        <td>mean</td>
        <td>3</td>
      </tr>
      <tr>
        <td>median</td>
        <td>2</td>
      </tr>
      <tr>
        <td>min</td>
        <td>-4</td>
      </tr>
      <tr>
        <td>std</td>
        <td>4.761</td>
      </tr>
      <tr>
        <td>sum</td>
        <td>18</td>
      </tr>
      <tr>
        <td>range</td>
        <td>14</td>
      </tr>
      </tbody>
    </table>
  </section>`);
  });

  it('make HTML with empty stats', () => {
    const input ={
      numbers:[10, 3, -4, 1, 8, 0],
      stats: {},
      filename: '1'
    }

    const stats = mainHTML(input);
    expect(stats).toStrictEqual(`
  <section>
    <div class = "filename">Þessi skrá er númer 1</div>
    <div class ="result">Gagnasett hefur engar niðurstöður</div>
  </section>`
    )
  });

});
