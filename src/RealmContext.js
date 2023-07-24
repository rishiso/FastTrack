// create Realm Context function from the package automatically create the realm

import {createRealmContext} from '@realm/react';

import {Report} from './ReportSchema';
import {Location} from './LocationSchema';

export default createRealmContext({
  schema: [Report.schema, Location.schema],
});
