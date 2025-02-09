import * as option from '../helpers/options.js';
import { averageUserScenario } from '../helpers/scenarios/averageUserScenario.js';
import { generateHeaders } from '../helpers/generateHeaders.js';
import exec from 'k6/execution';

export const options = option.stages(100, '15m', '2m', '2m', '<0.01');

export default function () {
  const headers = generateHeaders(exec.vu.idInTest);

  averageUserScenario(headers);
}
