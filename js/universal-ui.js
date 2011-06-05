
//(function($){

	var Ui = {};

	/* PanelsSupervisor - knows all panels and controls actions between them */
	Ui.PanelsSupervisor = { //singleton in fact
	
		panelsCounter: 0,
		panels: [],
		
		$panelsBox: null,
		$panels: null,
		
		options: {
			panelSelector: '.panel',
			panelHeaderSelector: '.panel_head',
			panelContentSelector: '.panel_content'
		},
		
		init: function(panelsBoxSelector, options) {

			var that = this;
			this.options = $.extend({}, that.options, options);
			
			this.$panelsBox = $(panelsBoxSelector);
			this.$panels = this.$panelsBox.find(that.options.panelSelector);
			
			this.$panels.each(function(index, panel) {
				
				that.registerPanel(panel, that.options);
			});

			this.bindSomePanelHasChangedItsStateEvent();
			
		},
		
		registerPanel: function(panelSelector, options) {
		
			var that = this;
			that.panels.push(new Ui.Panel(options, panelSelector, that.panelsCounter));
			that.panelsCounter++;
		},
		
		bindSomePanelHasChangedItsStateEvent: function() {
		
			var that = this;
			this.$panelsBox.bind('somePanelHasChangedItsState', function(e, data) {

				switch(data.newState) {
					case 0:
						//
						break;
					case 1:
						that.normalizeOthersThan( data.panelId );
						break;
					case 2:
						that.minimalizeOthersThan( data.panelId );
						break;
					default:
						throw new Error("PanelSupervisor does not know this state");
						return;
				}
			});
		},
		
		normalizeOthersThan: function( panelId ) {
		
			$.each(this.panels, function(i, val){
			
				if( i == panelId) { return true; }
				val.normalize();
			});
		},
		
		minimalizeOthersThan: function( panelId ) {
		
			$.each(this.panels, function(i, val){
			
				if( i == panelId) { return true; }
				val.minimalize();
			});
		}
	};
 
 
	/* Panel - single panel object */
	Ui.Panel = function( options, thisPanel, panelsCounter ) { //constructor

		var that = this;
		
		this.options = {
			panelHeaderSelector: '.panel_head',
			panelMiniContentSelector: '.content_mini',
			panelNormalContentSelector: '.content_normal',
			panelFullContentSelector: '.content_full'
		};
		
		this.options = $.extend({}, that.options, options);
		
		//states: ['mini', 'normal', 'full'], //[0,1,2]
		//this.state = 1;
		this.id = panelsCounter;
		
		/*this.draggable = true;
		this.resizable = true;
		this.sortable = true;*/
		
		this.$panel = $(thisPanel).eq(0);
		this.$panel.attr('id','panel-' + panelsCounter);
		
		this.$panelMiniContent = this.$panel.find(this.options.panelMiniContentSelector);
		this.$panelNormalContent = this.$panel.find(this.options.panelNormalContentSelector);
		this.$panelFullContent = this.$panel.find(this.options.panelFullContentSelector);
		
		if( this.$panel.hasClass('minimalized') ) {
			this.minimalize();
		}
		else if( this.$panel.hasClass('supersized') ) {
		
			this.supersize();
		}
		else {
			this.normalize();
		}
		
		this.bindStateChangeEvent();
		this.createChangeStateControls();
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
					throw new Error("panel state unknown");
					return;
			}

			//PanelsSupervisor should know about this too
			Ui.PanelsSupervisor.$panelsBox.trigger('somePanelHasChangedItsState', {
				panelId: that.id,
				newState: data.state
			});
		});
	}
	
	Ui.Panel.prototype.getState = function(){
	
		return this.state;
	};


	Ui.Panel.prototype.changeState = function( newState ){
		
		this.$panel.trigger('statechange', { state: newState });
	};
	
	Ui.Panel.prototype.minimalize = function(){
			
		this.state = 0;
		this.$panel.removeClass('normalized supersized');
		this.$panel.addClass('minimalized');
		this.$panelMiniContent.show();
		this.$panelNormalContent.hide();
		this.$panelFullContent.hide();
	};
	
	Ui.Panel.prototype.normalize = function(){
		
		this.state = 1;
		this.$panel.removeClass('minimalized supersized');
		this.$panel.addClass('normalized');
		this.$panelMiniContent.hide();
		this.$panelNormalContent.show();
		this.$panelFullContent.hide();
	};
	
	Ui.Panel.prototype.supersize = function(){
		
		this.state = 2;
		this.$panel.removeClass('minimalized normalized');
		this.$panel.addClass('supersized');
		this.$panelMiniContent.hide();
		this.$panelNormalContent.hide();
		this.$panelFullContent.show();
	};

	Ui.Panel.prototype.createChangeStateControls = function(){
		
		var that = this;
		this.controls = {};
		this.$header = this.$panel.find(this.options.panelHeaderSelector);
		
		this.$controlsBox = $('<div />').attr({
			'class': 'controls-box',
			'id': 'panel-' + that.id + '-controls-box'
		}).appendTo( that.$header );
		
		var $control = $('<a />').attr({
			'class': 'control',
			'href': '#'
		});
		
		createMinimalizeControl();
		createNormalizeControl();
		createSupersizeControl();

		this.bindChangeStateControlsEvents();
		
		function createMinimalizeControl() {
		
			that.controls.$minimalizeControl = $control
				.clone()
				.attr('id', 'panel-' + that.id + '-control-mini')
				.addClass('control-mini')
				.text('minimalizeMe')
				.appendTo( that.$controlsBox );
		}
		
		function createNormalizeControl() {
		
			that.controls.$normalizeControl = $control
				.clone()
				.attr('id', 'panel-' + that.id + '-control-norm')
				.addClass('control-norm')
				.text('normalizeMe')
				.appendTo( that.$controlsBox );
		}
		
		function createSupersizeControl() {
		
			that.controls.$supersizeControl = $control
				.clone()
				.attr('id', 'panel-' + that.id + '-control-full')
				.addClass('control-full')
				.text('supersizeMe')
				.appendTo( that.$controlsBox );
		}
	};
	
	Ui.Panel.prototype.bindChangeStateControlsEvents = function(){
	
		var that = this;
		this.controls.$minimalizeControl.bind('click', function(e) {
			e.preventDefault();
			that.changeState(0);
		});
		
		this.controls.$normalizeControl.bind('click', function(e) {
			e.preventDefault();
			that.changeState(1);
		});
		
		this.controls.$supersizeControl.bind('click', function(e) {
			e.preventDefault();
			that.changeState(2);
		});
	};
	
		


    $.fn.universalizeMe = function(options){
        
        Ui.PanelsSupervisor.init(this, options); //only one element is allowed
		return this;
    };

//})(jQuery);





