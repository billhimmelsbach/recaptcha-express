//seed database with default data

var db = require('./models');
var switts_list = [{
		name: "Turbo Switt",
		super_power: "Faster than the normal Switt",
	},
	{
		name: "CEO Switt",
		super_power: "Able to delegate tasks, looks good in a button up",
	}
];

db.Switt.remove({}, function(err, switts) {
	if (err) {
		console.log('Error occurred in remove', err);
	} else {
		console.log('removed all switts');

		// create new records based on the array switts_list
		db.Switt.create(switts_list, function(err, switts) {
			if (err) {
				return console.log('err', err);
			}
			console.log("created", switts.length, "switts");
			process.exit();
		});
	}
});
