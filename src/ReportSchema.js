import {BSON} from 'realm';

export class Report {
    constructor({
        _id = new BSON.ObjectId(),
        location, 
        reporter, 
        time, 
        crowdLevel, 
    }) {
        this._id = _id;
        this.location = location, 
        this.reporter = reporter, 
        this.time = time,
        this.crowdLevel = crowdLevel;
    }

    static schema = {
        name: "Report",
        properties: {
            _id: "objectId", 
            location: "string", 
            reporter: "string",
            time: "int",
            crowdLevel: "int"
        },
        primaryKey: '_id',
    };
}
