var address;
var template;
var $swittsList;
var mapHidden = 1;
var allSwitts = [];
$(document).ready(function() {
	$swittsList = $('#swittTarget');

	//compiles handlebars template
	var source = $('#switts-template').html();
	template = Handlebars.compile(source);

	//pulls a JSON of the switt data
	$.ajax({
		method: 'GET',
		url: '/api/switts',
		success: handleSuccess,
		error: handleError
	});


	//on click of the new switt button, POSTSs new switt based on forms
	$('#newSwittForm').on('submit', function(event) {
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/api/switts',
			data: $(this).serialize(),
			success: newSwittSuccess,
			error: newSwittError
		});
	});

	$('#collapsing_button').on('click', function() {
		$(this).hide();
	});

	//on click of the delete this switt button, DELETE switt based on ID
	$swittsList.on('click', '.deleteBtn', function() {
		$.ajax({
			method: 'DELETE',
			url: '/api/switts/' + $(this).attr('data-id'),
			success: deleteSwittSuccess,
			error: deleteSwittError
		});
	});
});

//function that renders data on AJAX success: removes all posts, passes allSwitts to template, appends HTML
function render() {
	$swittsList.empty();
	var swittsHtml = template({
		switts: allSwitts
	});
	$swittsList.append(swittsHtml);
}

function handleSuccess(json) {
	allSwitts = json;
	render();
}

function handleError(event) {
	$('#swittTarget').text('Failed to load switts, is the server up?');
}

function newSwittSuccess(json) {
	$('#newSwittForm input').val('');
	allSwitts.push(json);
	render();
}

function newSwittError() {
	$('#swittTarget').text('Failed to load switts, is the server up?');
}

// find the switt by ID, remove from allSwitts array
function deleteSwittSuccess(json) {
	var switt = json;
	var swittId = switt._id;
	for (var index = 0; index < allSwitts.length; index++) {
		if (allSwitts[index]._id === swittId) {
			allSwitts.splice(index, 1);
			break;
		}
	}
	render();
}

function deleteSwittError() {
	$('#swittTarget').text('Failed to load switts, is the server up?');
}
