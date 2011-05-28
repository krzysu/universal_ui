
(function($){

	var Ui = {
	
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
				
				//that.panels.push(Panel.init(options, index)); //sth like this
				Panel.init(options, index); //temporary only
				that.panelsCounter++;
				
			});
		}
	};
 
	var Panel = {        
		
		states: ['mini', 'normal', 'full'], //[0,1,2]
		state: 1,
		
		draggable: true,
		resizable: true,
		sortable: true,
		
		$panel: null,
		$panelMiniContent: null,
		$panelNormalContent: null,
		$panelFullContent: null,
		
		options: {
			panelSelector: '.panel',
			panelMiniContentSelector: '.content_mini',
			panelNormalContentSelector: '.content_normal',
			panelFullContentSelector: '.content_full'
		},
		
		init: function( options, panelsCounter ){
		
			var that = this;
			var opt = this.options = $.extend({}, that.options, options);
			
			this.$panel = $(opt.panelSelector).eq(0); //only one element is allowed
			this.$panel.attr('id','#panel-' + panelsCounter);
			
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
				}

			});
		},
		
		minimalize: function(){
			
			this.$panel.removeClass('normalized supersized');
			this.$panel.addClass('minimalized');
			//this.$panelMiniContent.text('I am minimalized!');
		},
		
		normalize: function(){
			
			this.$panel.removeClass('minimalized supersized');
			this.$panel.addClass('normalized');
			//this.$panelNormalContent.text('I am normalized!');
		},
		
		supersize: function(){
			
			this.$panel.removeClass('minimalized normalized');
			this.$panel.addClass('supersized');
			//this.$panelFullContent.text('I am supersized!');
		},

		move: function(){

		},
		
		changeState: function( newState ){
		
			this.$panel.trigger('statechange', { state: newState });
		},
		
		getState: function(){
		
			return this.state();
		}
		
		
	};

    $.fn.universalizeMe = function(options){
        
        Ui.init(this, options); //only one element is allowed
		return this;
    };

})(jQuery);





