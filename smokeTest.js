import * as option from '../helpers/options.js';
import { averageUserScenario } from '../helpers/scenarios/averageUserScenario.js';
import { generateHeaders } from '../helpers/generateHeaders.js';
import exec from 'k6/execution';
import { Counter } from 'k6/metrics';

const customCounter = new Counter('customCounter');

export const options = option.iterations(2, 2, undefined, undefined, '===0');

export default function () {
  const headers = generateHeaders(exec.vu.idInTest);

  averageUserScenario(headers, 1, 2);
  customCounter.add(1);
}
