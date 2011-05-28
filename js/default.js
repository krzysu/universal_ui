
$(document).ready( function() {

	/*$('#panels').createUniversalUi({
		panelSelector: '.panel',
		panelHeaderSelector: '.panel_head',
		panelContentSelector: '.panel_content',
		draggable: true,
		resizable: true,
		sortable: true,
		state: 'minimalized' //minimalized, intermediate, full
		//onStateChange: function() {} //callbacks ??
	});*/
	
	
	
	$('#panels').universalizeMe();

			
	/*
	UI.init({
		panelsContainer: '#panels',
		panelSelector: '.panel',
		panelHeaderSelector: '.panel_head',
		panelContentSelector: '.panel_content',
	});
	
	UI.registerPanels({
		id: [id1, id2],
		sortable: true, //able to change displaying order/position
		resizable: true, //able to change state
		state: 'minimalized'
		//position: [3, 4] //position on the list (default added automaticaly after registering then changed if dragged/dropped)
		
	});
	
	UI.changeState( panelId, newState, beforeStateChangeCallback, afterStateChangeCallback );
	
	
	//after dragging and dropping
	UI.changePosition( newPosition );
	*/

});
 






