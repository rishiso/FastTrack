// create Realm Context function from the package automatically create the realm 

import {createRealmContext} from '@realm/react';
import {Item} from './ItemSchema';

import {Report} from './ReportSchema';
import {Location} from './LocationSchema';

export default createRealmContext({
  schema: [Item.schema, Report.schema, Location.schema],
});
