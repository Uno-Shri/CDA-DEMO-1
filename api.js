import * as option from '../helpers/options.js';
import clothoAuth from './api/clotho/auth.js';
import cohorts from './api/clotho/cohorts.js';
import courseRuns from './api/clotho/course-runs.js';
import courses from './api/clotho/courses.js';
import crp from './api/clotho/crp.js';
import enrollments from './api/clotho/enrollments.js';
import health from './api/clotho/health.js';
import tenants from './api/clotho/tenants.js';
import tokenClaim from './api/clotho/token-claim.js';
import userProfiles from './api/clotho/user-profiles.js';
import users from './api/clotho/users.js';
import waves from './api/clotho/waves.js';

import cdaAuth from './api/cda/auth.js';
import contentDelivery from './api/cda/content-delivery.js';
import content from './api/cda/content.js';
import courseProvisioning from './api/cda/course-provisioning.js';
import event from './api/cda/event.js';
import healthCda from './api/cda/health.js';
import learner from './api/cda/learner.js';
import socialEntries from './api/cda/social-entries.js';
import socialModeration from './api/cda/social-moderation.js';
import socialUser from './api/cda/social-user.js';
import state from './api/cda/state.js';
import { group } from 'k6';
import { Counter } from 'k6/metrics';

const customCounter = new Counter('customCounter');

export const options = option.iterations(1, 1, undefined, '===2', '<0.077');

export default function () {
  group('CLOTHO API CRUD tests', () => {
    clothoAuth();
    cohorts();
    courseRuns();
    courses();
    crp();
    enrollments();
    health();
    tenants();
    tokenClaim();
    userProfiles();
    users();
    waves();
    customCounter.add(1);
  });
  // TODO: Unblock when CI run is fixed for CDA API
  group('CDA API CRUD tests', () => {
    cdaAuth();
    contentDelivery();
    content();
    courseProvisioning();
    event();
    healthCda();
    learner();
    // TODO: Skip because it is hard to prepare data with /api/preview
    // preview();
    socialEntries();
    socialModeration();
    socialUser();
    state();
    customCounter.add(1);
  });
}
