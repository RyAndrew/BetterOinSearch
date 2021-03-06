/*
 * File: app/view/SaveWindow.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 7.3.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 7.3.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('BetterOinSearch.view.SaveWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.savewindow',

	requires: [
		'BetterOinSearch.view.SaveWindowViewModel',
		'Ext.form.field.Text',
		'Ext.toolbar.Toolbar',
		'Ext.toolbar.Fill',
		'Ext.button.Button'
	],

	viewModel: {
		type: 'savewindow'
	},
	height: 185,
	width: 400,
	closeAction: 'hide',
	title: 'Save',
	defaultListenerScope: true,

	items: [
		{
			xtype: 'textfield',
			itemId: 'name',
			margin: '30 0 0 50',
			width: 290,
			fieldLabel: 'Name',
			labelWidth: 60
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [
				{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					margin: '0 50 0 0',
					width: 100,
					text: 'Cancel',
					listeners: {
						click: 'onButtonClick1'
					}
				},
				{
					xtype: 'button',
					width: 100,
					text: 'Save',
					listeners: {
						click: 'onButtonClick'
					}
				},
				{
					xtype: 'tbfill'
				}
			]
		}
	],

	onButtonClick1: function(button, e, eOpts) {
		this.hide();
	},

	onButtonClick: function(button, e, eOpts) {
		let name = this.queryById('name').getValue();
		if(name === ''){
			Ext.Msg.alert(' ','Enter name');
			return false;
		}
		this.fireEvent('saved',name);
		this.hide();
	},

	clearAndShow: function() {
		this.show();
		let name = this.queryById('name');
		name.setValue('');
		name.focus();
	}

});