'use strict'

var mongoose = require('mongoose');
//Each Mongoose schema corresponds to a MongoDB collection
var Schema = mongoose.Schema;

var Click = new Schema(
	{ clicks : Number},
	// Mongoose automatically adds a property to every schema called __v. 
	// This property is used for versioning. 
	{ versionKey : false}
	);

//The first is the singular name of the collection in the database. 
//For example, ours is named 'Click' which corresponds to our 'clicks' collection in the database.
//The second argument is the name of the schema to be converted to the model. 
//In this case, it's our Click schema.
module.exports = mongoose.model('Click', Click);
