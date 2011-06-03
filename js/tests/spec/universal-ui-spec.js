
describe("Panel", function() {

	var panel;
	
	beforeEach(function () {
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		jasmine.getFixtures().load('panel.html');
		
		panel = new Ui.Panel({}, '.panel', 2);
		
		Ui.PanelsSupervisor.$panelsBox = $('<ul />'); //dump jquery object
	});

	it("has auto generated id", function() {

		expect(panel.$panel).toHaveId('panel-2');
	});
	
	it("can change its state to minimalized", function() {

		panel.changeState(0); //states: ['mini', 'normal', 'full'], //[0, 1, 2]

		expect(panel.state).toEqual(0);
		expect(panel.$panel).toHaveClass('minimalized');
		expect(panel.$panelMiniContent).toBeVisible();
		expect(panel.$panelNormalContent).toBeHidden();
		expect(panel.$panelFullContent).toBeHidden();
	});
	
	it("can change its state to normalized", function() {

		panel.changeState(1); //states: ['mini', 'normal', 'full'], //[0, 1, 2]

		expect(panel.state).toEqual(1);
		expect(panel.$panel).toHaveClass('normalized');
		expect(panel.$panelMiniContent).toBeHidden();
		expect(panel.$panelNormalContent).toBeVisible();
		expect(panel.$panelFullContent).toBeHidden();
	});
	
	it("can change its state to supersized", function() {

		panel.changeState(2); //states: ['mini', 'normal', 'full'], //[0, 1, 2]

		expect(panel.state).toEqual(2);
		expect(panel.$panel).toHaveClass('supersized');
		expect(panel.$panelMiniContent).toBeHidden();
		expect(panel.$panelNormalContent).toBeHidden();
		expect(panel.$panelFullContent).toBeVisible();
	});
	
	it("handles statechange event", function() {

		expect(panel.$panel).toHandle("statechange");
	});
	
});

describe("PanelsSupervisor", function() {

	//var panelsSupervisor;
	
	beforeEach(function () {
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		jasmine.getFixtures().load('panels.html');
		
	});

	it("can register new panel", function() {

		Ui.PanelsSupervisor.registerPanel('.panel', {} );
		
		expect(Ui.PanelsSupervisor.panelsCounter).toEqual(1);
		expect(Ui.PanelsSupervisor.panels.length).toEqual(1);
		//expect(Ui.PanelsSupervisor.panels[0]).toEqual(new Ui.Panel({}, '.panel', 0) );
		
		expect(Ui.PanelsSupervisor.panels[1]).not.toBeDefined();
	});

});
