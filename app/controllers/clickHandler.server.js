'use strict';

var Clicks = require('../models/clicks.js');

function ClickHandler(){

	this.getClicks = function(req, res){

		//we don't want the 'id' field to show up in our results 
		//equals to {'_id' : 0}

		Clicks.findOne({}, {'_id' : false}).exec(function(err, result){
			if(err)
				throw err;

			if(result){
				res.json(result);
			}else{
				//creates a new document using the parameters defined within the Click model
				var newDoc = new Clicks({'clicks' : 0});
				//This method simply saves the current document to the database.
				newDoc.save(function(err, doc){
					if(err) 
						throw err;
					res.json(doc);
				});
			}
		});
	};

	this.addClick = function(req, res){
		Clicks.findOneAndUpdate(
			{},
			// Mongo $inc method
			{$inc : {'clicks' : 1}})
			.exec(function(err, result){
				if(err)
					throw err;

				res.json(result);
			}
		);
	};

	this.resetClicks = function(req, res){
		Clicks.findOneAndUpdate(
			{},
			{'clicks' : 0})
			.exec(function(err, result){
				if(err) throw err;

				res.json(result);
			}
		);
	};
}


module.exports = ClickHandler;