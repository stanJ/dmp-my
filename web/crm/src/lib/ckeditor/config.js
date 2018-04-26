/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	 config.language = 'en';
	// config.uiColor = '#AADC6E';
	config.width = 375;
	config.height = 472;
	config.toolbar = 'MyToolbar';
	config.autoUpdateElement = true;
	config.toolbar_MyToolbar =
		[
			{name: 'document', items: ['Source', '-', '-']},
			{name: 'styles', items: ['Styles', 'Format']},
			{
				name: 'insert', items: ['Image', '-', '-', '-', '-', '-'
				, '-']
			},
			{name: 'tools', items: ['insertCustomTitle']}
		];
};
