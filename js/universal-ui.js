
//(function($){

	var Ui = {};

	Ui = { //PanelsSupervisor -> to refactor
	
		panelsCounter: 0,
		panels: [],
		
		$panelsBox: null,
		$panels: null,
		
		options: {
			panelSelector: '.panel'
		},
		
		init: function(panelsBoxSelector, options) {

			var that = this;
			this.options = $.extend({}, that.options, options);
			
			this.$panelsBox = $(panelsBoxSelector);
			this.$panels = this.$panelsBox.find(that.options.panelSelector);
			
			this.$panels.each(function(index, panel) {
				
				that.panels.push(new Ui.Panel(that.options, panel, index));
				that.panelsCounter++;
				
				
			});
			
			that.panels[0].changeState(0); //test
			that.panels[1].changeState(2); //test
		}
	};
 
 
	/* Panel - single panel object */
	Ui.Panel = function( options, thisPanel, panelsCounter ) { //constructor

		var that = this;
		
		this.options = {
			panelMiniContentSelector: '.content_mini',
			panelNormalContentSelector: '.content_normal',
			panelFullContentSelector: '.content_full'
		};
		
		this.options = $.extend({}, that.options, options);
		
		//states: ['mini', 'normal', 'full'], //[0,1,2]
		this.state = 1;
		
		this.draggable = true;
		this.resizable = true;
		this.sortable = true;
		
		this.$panel = $(thisPanel);
		this.$panel.attr('id','panel-' + panelsCounter);
		this.normalize();
		
		this.$panelMiniContent = this.$panel.find(this.options.panelMiniContentSelector);
		this.$panelNormalContent = this.$panel.find(this.options.panelNormalContentSelector);
		this.$panelFullContent = this.$panel.find(this.options.panelFullContentSelector);
		
		this.bindStateChangeEvent();
		
	};
	
	Ui.Panel.prototype.bindStateChangeEvent = function(){
	
		var that = this;
		this.$panel.bind('statechange', function(e, data){
			switch(data.state) {
				case 0:
					that.minimalize();
					break;
				case 1:
					that.normalize();
					break;
				case 2:
					that.supersize();
					break;
				default:
					throw new Error("state unknown");
					return;
			}
			
			setState( data.state );
		});
		
		function setState( newState ){
		
			that.state = newState;
		}
	}
	
	Ui.Panel.prototype.getState = function(){
	
		return this.state;
	};


	Ui.Panel.prototype.changeState = function( newState ){
		
		this.$panel.trigger('statechange', { state: newState });
	};
	
	Ui.Panel.prototype.minimalize = function(){
			
		this.$panel.removeClass('normalized supersized');
		this.$panel.addClass('minimalized');
		//this.$panelMiniContent.text('I am minimalized!');
	};
	
	Ui.Panel.prototype.normalize = function(){
		
		this.$panel.removeClass('minimalized supersized');
		this.$panel.addClass('normalized');
		//this.$panelNormalContent.text('I am normalized!');
	};
	
	Ui.Panel.prototype.supersize = function(){
		
		this.$panel.removeClass('minimalized normalized');
		this.$panel.addClass('supersized');
		//this.$panelFullContent.text('I am supersized!');
	};


		


    $.fn.universalizeMe = function(options){
        
        Ui.init(this, options); //only one element is allowed
		return this;
    };

//})(jQuery);





