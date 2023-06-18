import {BSON} from 'realm';

export class Location {
  constructor({
    _id = new BSON.ObjectId(),
    name,
    type,
    icon, 
    longtitude, 
    latitude, 
    crowdLevel
  }) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.icon = icon;
    this.longtitude = longtitude;
    this.latitude = latitude;
    this.crowdLevel = crowdLevel;
  }

  static schema = {
    name: "Location", 
    properties: {
        _id: "objectId", 
        name: "string", 
        type: "string",
        icon: "string",
        longitude: "double", 
        latitude: "double",
        crowdLevel: "int"
    }, 
    primaryKey: '_id',
}
}
