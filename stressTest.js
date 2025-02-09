import * as option from '../helpers/options.js';
import { averageUserScenario } from '../helpers/scenarios/averageUserScenario.js';
import { generateHeaders } from '../helpers/generateHeaders.js';
import exec from 'k6/execution';

export const options = option.stages(300, '20m', '1m', '1m', '<0.01', '1000');

export default function () {
  const headers = generateHeaders(exec.vu.idInTest);

  averageUserScenario(headers);
}
