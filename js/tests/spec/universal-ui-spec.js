
describe("Panel", function() {

	var panel;
	
	beforeEach(function () {
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		jasmine.getFixtures().load('panel.html');
		
		panel = new Ui.Panel({}, '.panel', 2);
	});

	it("has auto generated id", function() {

		expect(panel.$panel).toHaveId('panel-2');
	});
	
	it("can change its state to minimalized", function() {

		panel.changeState(0); //states: ['mini', 'normal', 'full'], //[0, 1, 2]

		expect(panel.state).toEqual(0);
		expect(panel.$panel).toHaveClass('minimalized');
	});
	
	it("can change its state to normalized", function() {

		panel.changeState(1); //states: ['mini', 'normal', 'full'], //[0, 1, 2]

		expect(panel.state).toEqual(1);
		expect(panel.$panel).toHaveClass('normalized');
	});
	
	it("can change its state to supersized", function() {

		panel.changeState(2); //states: ['mini', 'normal', 'full'], //[0, 1, 2]

		expect(panel.state).toEqual(2);
		expect(panel.$panel).toHaveClass('supersized');
	});
	
	
	it("handles statechange event", function() {

		expect(panel.$panel).toHandle("statechange");
	});
	
	
	

});

