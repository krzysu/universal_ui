* * *
### WARNING! project still in development so no working version is available ###
* * *


UniversalUI
===========

#### JavaScript based, jQuery powered, UI generator ####

Put life in your HTML code with one line of JS code. It cannot be easier!

Demo
----

some link will be here

Features
--------

Developer friendly:

-   easy configuration, mainly from HTML code
-   with a little effort this engine can be adjusted to every need
-   customizable themes
-   no pages, just bookmarkable views (shortcuts)
-   content of Panels can be static or loaded by AJAX when needed

User friendly:

-   experience almost like desktop app
-   organize webpage as you like and then save it (by localStorage)

If you have some use case and do not know how to adopt this engine - just let me know!

Basics
------

### HTML: ###

	<ul id="panels" class="panels_list">
		<li>
			<div class="panel">
				<div class="panel_head">
					<h3>Header</h3>
				</div>
				<div class="panel_content">
					<div class="content_mini">content minimalized</div>
					<div class="content_normal">content normal</div>
					<div class="content_full">content full window</div>
				</div>
			</div>
		</li>
		<li>
			<div class="panel">
				<div class="panel_head">
					<h3>Header 2</h3>
				</div>
				<div class="panel_content">
					<div class="content_mini">content minimalized</div>
					<div class="content_normal">content normal</div>
					<div class="content_full">content full window</div>
				</div>
			</div>
		</li>
		<li>  
			<div class="panel">
				<div class="panel_head">
					<h3>Header 3</h3>
				</div>
				<div class="panel_content">
					<div class="content_mini">content minimalized</div>
					<div class="content_normal">content normal</div>
					<div class="content_full">content full window</div>
				</div>
			</div>
		</li>
	</ul>

### JavaScript: ###

	$('#panels').universalizeMe( [options] );

where all options are optional :)

	options = {
		panelSelector: '.panel',
		panelHeaderSelector: '.panel_head',
		panelContentSelector: '.panel_content'
		panelMiniContentSelector: '.content_mini',
		panelNormalContentSelector: '.content_normal',
		panelFullContentSelector: '.content_full'
	}

TODO:
-----

-   separate CSS files for basic layout and themes
-   jquery bbq integration for creating shortcuts to views
-   create WaitingRoom and move minimalized Panels there
-   full state for real

* * *

Copyright (c) 2011 Krzysztof Urbas (@krzysu). UniversalUI is available under the MIT license.