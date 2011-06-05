
describe("Panel", function() {

	describe("has basic features", function() {
	
		var panel;
		
		beforeEach(function () {
			jasmine.getFixtures().fixturesPath = 'spec/fixtures';
			jasmine.getFixtures().load('panel.html');
			
			panel = new Ui.Panel({}, '.panel', 2);
			
			Ui.PanelsSupervisor.$panelsBox = $('<ul />'); //dumb jquery object
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

			expect(panel.$panel).toHandle('statechange');
		});

		
		describe("has controls", function() {

			it("to change its state to minimalized", function() {

				expect(panel.$header).toContain('#panel-2-control-mini');
			});
			
			it("to change its state to normalized", function() {

				expect(panel.$header).toContain('#panel-2-control-norm');
			});
			
			it("to change its state to supersized", function() {

				expect(panel.$header).toContain('#panel-2-control-full');
			});
			
			it("that handles click event", function() {

				expect(panel.controls.$minimalizeControl).toHandle('click');
				expect(panel.controls.$normalizeControl).toHandle('click');
				expect(panel.controls.$supersizeControl).toHandle('click');
			});
			
			it("minimalize control when clicked changes Panel state appropriately", function() {

				spyOn(panel, 'changeState');
				panel.controls.$minimalizeControl.trigger('click');
				expect(panel.changeState).toHaveBeenCalledWith(0);
			});
			
			it("normalize control when clicked changes Panel state appropriately", function() {

				spyOn(panel, 'changeState');
				panel.controls.$normalizeControl.trigger('click');
				expect(panel.changeState).toHaveBeenCalledWith(1);
			});
			
			it("supersize control when clicked changes Panel state appropriately", function() {

				spyOn(panel, 'changeState');
				panel.controls.$supersizeControl.trigger('click');
				expect(panel.changeState).toHaveBeenCalledWith(2);
			});
		
		});
	});
	

	describe("can have features according to HTML classes when initialized", function() {
	
		var panel;
		
		beforeEach(function () {
			jasmine.getFixtures().fixturesPath = 'spec/fixtures';
			jasmine.getFixtures().load('panel.html');
			
			Ui.PanelsSupervisor.$panelsBox = $('<ul />'); //dump jquery object
		});
		
		it("with HTML class 'minimalized' -> sets state to minimalized", function() {

			$('.panel').addClass('minimalized');
			panel = new Ui.Panel({}, '.panel', 1);
			expect(panel.state).toEqual(0);
		});
			
		it("with HTML class 'supersized' -> sets state to supersized", function() {

			$('.panel').addClass('supersized');
			panel = new Ui.Panel({}, '.panel', 1);
			expect(panel.state).toEqual(2);
		});
			
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
		//expect(Ui.PanelsSupervisor.panels[0]).toEqual( new Ui.Panel({}, '.panel', 0) );
		
		expect(Ui.PanelsSupervisor.panels[1]).not.toBeDefined();
	});

});
