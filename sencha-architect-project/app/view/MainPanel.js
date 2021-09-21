/*
 * File: app/view/MainPanel.js
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

Ext.define('BetterOinSearch.view.MainPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.mainpanel',

	requires: [
		'BetterOinSearch.view.MainPanelViewModel',
		'Ext.grid.Panel',
		'Ext.grid.column.Number',
		'Ext.view.Table',
		'Ext.selection.CheckboxModel',
		'Ext.tab.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Text',
		'Ext.tab.Tab',
		'Ext.toolbar.Toolbar',
		'Ext.grid.plugin.Exporter'
	],

	viewModel: {
		type: 'mainpanel'
	},
	frame: true,
	minHeight: 500,
	minWidth: 500,
	title: '',
	defaultListenerScope: true,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [
		{
			xtype: 'container',
			flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'container',
					userCls: 'force-grid-border',
					width: 235,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'gridpanel',
							flex: 1,
							bodyBorder: true,
							title: '<i class="fas fa-filter"></i> Categories',
							bind: {
								store: '{oinCategoryStore}'
							},
							columns: [
								{
									xtype: 'gridcolumn',
									width: 155,
									dataIndex: 'categoryLabel',
									text: 'Category'
								},
								{
									xtype: 'numbercolumn',
									flex: 1,
									align: 'end',
									dataIndex: 'count',
									text: 'Count',
									format: '0,0'
								}
							],
							listeners: {
								selectionchange: 'onGridpanelSelectionChange'
							}
						},
						{
							xtype: 'gridpanel',
							height: 350,
							bodyBorder: true,
							title: '<i class="fas fa-filter"></i> Capabilities',
							hideHeaders: true,
							bind: {
								store: '{oinCapabilities}'
							},
							columns: [
								{
									xtype: 'gridcolumn',
									flex: 1,
									dataIndex: 'capabilities',
									text: 'String'
								}
							],
							selModel: {
								selType: 'checkboxmodel'
							},
							listeners: {
								selectionchange: 'onGridpanelSelectionChange1'
							}
						}
					]
				},
				{
					xtype: 'tabpanel',
					border: false,
					flex: 1,
					width: 100,
					bodyBorder: false,
					activeTab: 0,
					plain: true,
					items: [
						{
							xtype: 'panel',
							userCls: 'force-grid-border',
							bodyBorder: true,
							title: '<i class="fas fa-search"></i> Search OIN',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'form',
									height: 47,
									margin: '10 0 0 10',
									layout: 'hbox',
									items: [
										{
											xtype: 'container',
											width: 435,
											layout: {
												type: 'hbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'textfield',
													itemId: 'search',
													userCls: 'search-label',
													width: 383,
													fieldLabel: '',
													labelAlign: 'right',
													emptyText: 'Search',
													enableKeyEvents: true,
													listeners: {
														keyup: 'onTextfieldKeyup',
														render: 'onSearchRender'
													}
												},
												{
													xtype: 'button',
													hidden: true,
													itemId: 'clearButton',
													margin: '0 0 0 10',
													text: 'X',
													listeners: {
														click: 'onButtonClick'
													}
												}
											]
										},
										{
											xtype: 'container',
											flex: 1,
											html: '&nbsp;'
										},
										{
											xtype: 'container',
											itemId: 'lastUpdate',
											margin: '8 0 0 0'
										},
										{
											xtype: 'button',
											itemId: 'updateButton',
											margin: '0 10 0 10',
											text: 'Refresh',
											listeners: {
												click: 'onButtonClick4'
											}
										}
									]
								},
								{
									xtype: 'gridpanel',
									flex: 1,
									itemId: 'oinAppGrid',
									title: '',
									bind: {
										store: '{oinAppStore}'
									},
									dockedItems: [
										{
											xtype: 'toolbar',
											dock: 'top',
											items: [
												{
													xtype: 'button',
													text: '<i class="far fa-plus-square"></i> Add to My Apps',
													listeners: {
														click: 'onButtonClick1'
													}
												}
											]
										}
									],
									columns: [
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												return '<img src="https://ok3static.oktacdn.com'+value+'" height="34" />';
											},
											width: 145,
											dataIndex: 'LogoImage',
											text: 'Logo'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(record.data.Website !== ''){
													return '<a href="'+record.data.Website+'" target="_blank">'+value+'</a>';
												}
												return value;
											},
											width: 157,
											dataIndex: 'DisplayName',
											text: 'Name'
										},
										{
											xtype: 'gridcolumn',
											text: 'SSO',
											columns: [
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){

															return String.fromCodePoint(0x2705);
															//return '&#x2705;';
															//return '<img src="/inc/img/silk_icons/tick.png">';
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'AutoLogin',
													text: 'SWA'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(record.data['SAML_2_0'] === 'YES' || record.data['SAML_1_1'] === 'YES'){
															return String.fromCodePoint(0x2705);
														}
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'SAML_2_0',
													text: 'SAML'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'OIDC',
													text: 'OIDC'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'WSFED',
													exportRenderer: true,
													text: 'WS Fed'
												}
											]
										},
										{
											xtype: 'gridcolumn',
											text: 'Provisioning',
											columns: [
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'PushNewUsers',
													text: 'Create Users'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'PushPasswordUpdates',
													text: 'Password'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'PushUserDeactivation',
													text: 'Deactivation'
												}
											]
										},
										{
											xtype: 'gridcolumn',
											text: 'Importing',
											columns: [
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'ImportNewUsers',
													text: 'Import Users'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'ImportProfileUpdates',
													text: 'Profile Updates'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'AutoConfirmImports',
													text: 'Auto Confirm'
												},
												{
													xtype: 'gridcolumn',
													renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														if(value==='YES'){
															return String.fromCodePoint(0x2705);
														}
														return '';
													},
													userCls: 'rotate-grid-headers',
													width: 50,
													dataIndex: 'ReactivateUsers',
													text: 'Reactivation'
												}
											]
										},
										{
											xtype: 'gridcolumn',
											width: 275,
											dataIndex: 'Description',
											text: 'Description'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'AppCategoryLabel',
											text: 'App Category Label'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'Custom',
											text: 'Custom'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'SecurePasswordStore',
											text: 'Secure Password Store'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'SAML_2_0',
											text: 'Saml 2 0'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'SAML_1_1',
											text: 'Saml 1 1'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'BookMark',
											text: 'Book Mark'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'BrowserPlugin',
											text: 'Browser Plugin'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'BasicAuth',
											text: 'Basic Auth'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'PushProfileUpdates',
											text: 'Push Profile Updates'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'Ranking',
											text: 'Ranking'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'OMM',
											text: 'Omm'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'Name',
											text: 'Name'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'Website',
											text: 'Website'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'Version',
											text: 'Version'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'VerificationStatus',
											text: 'Verification Status'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'GroupPush',
											text: 'Group Push'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'GroupSync',
											text: 'Group Sync'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'ImportUserSchema',
											text: 'Import User Schema'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'ProfileMastering',
											text: 'Profile Mastering'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'SCIM',
											text: 'Scim'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'IntegrationApp',
											text: 'Integration App'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'AppLinksJSON',
											text: 'App Links Json'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'VersionCreatedDate',
											text: 'Version Created Date'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'DeepLinkUrl',
											text: 'Deep Link Url'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'AppCatalogDiscoverable',
											text: 'App Catalog Discoverable'
										},
										{
											xtype: 'gridcolumn',
											dataIndex: 'SupportLevel',
											text: 'Support Level'
										}
									],
									viewConfig: {
										width: 742,
										enableTextSelection: true
									},
									listeners: {
										rowdblclick: 'onOinAppGridRowDblClick'
									}
								}
							],
							tabConfig: {
								xtype: 'tab',
								margin: '0 0 0 5',
								userCls: 'tab-with-border',
								width: 125
							}
						},
						{
							xtype: 'gridpanel',
							itemId: 'myApps',
							resizable: true,
							resizeHandles: 'w',
							userCls: 'force-grid-border',
							width: 400,
							title: '<i class="fas fa-clipboard-list"></i> My Apps (0)',
							bind: {
								store: '{myApps}'
							},
							dockedItems: [
								{
									xtype: 'toolbar',
									dock: 'top',
									items: [
										{
											xtype: 'button',
											text: '<i class="far fa-file-excel"></i> Export',
											listeners: {
												click: 'onButtonClick2'
											}
										},
										{
											xtype: 'button',
											text: '<i class="fas fa-print"></i> Print',
											listeners: {
												click: 'onButtonClick3'
											}
										},
										{
											xtype: 'button',
											text: '<i class="far fa-minus-square"></i> Remove',
											listeners: {
												click: 'onButtonClick11'
											}
										},
										{
											xtype: 'button',
											margin: '0 0 0 30',
											text: '<i class="far fa-trash-alt"></i> Remove All',
											listeners: {
												click: 'onButtonClick111'
											}
										}
									]
								}
							],
							columns: [
								{
									xtype: 'gridcolumn',
									renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return '<img src="https://ok3static.oktacdn.com'+value+'" height="34" />';
									},
									width: 145,
									dataIndex: 'LogoImage',
									ignoreExport: true,
									text: 'Logo'
								},
								{
									xtype: 'gridcolumn',
									width: 157,
									dataIndex: 'DisplayName',
									text: 'Name'
								},
								{
									xtype: 'gridcolumn',
									text: 'SSO',
									columns: [
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'AutoLogin',
											exportRenderer: true,
											text: 'SWA'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(record.data['SAML_2_0'] === 'YES' || record.data['SAML_1_1'] === 'YES'){
													return String.fromCodePoint(0x2705);
												}
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'SAML_2_0',
											exportRenderer: true,
											text: 'SAML'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'OIDC',
											exportRenderer: true,
											text: 'OIDC'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'WSFED',
											exportRenderer: true,
											text: 'WS Fed'
										}
									]
								},
								{
									xtype: 'gridcolumn',
									text: 'Provisioning',
									columns: [
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'PushNewUsers',
											exportRenderer: true,
											text: 'Create Users'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'PushPasswordUpdates',
											exportRenderer: true,
											text: 'Password'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'PushUserDeactivation',
											exportRenderer: true,
											text: 'Deactivation'
										}
									]
								},
								{
									xtype: 'gridcolumn',
									text: 'Importing',
									columns: [
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'ImportNewUsers',
											exportRenderer: true,
											text: 'Import Users'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'ImportProfileUpdates',
											exportRenderer: true,
											text: 'Profile Updates'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'AutoConfirmImports',
											exportRenderer: true,
											text: 'Auto Confirm'
										},
										{
											xtype: 'gridcolumn',
											renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
												if(value==='YES'){
													return String.fromCodePoint(0x2705);
												}
												return '';
											},
											userCls: 'rotate-grid-headers',
											width: 50,
											dataIndex: 'ReactivateUsers',
											exportRenderer: true,
											text: 'Reactivation'
										}
									]
								},
								{
									xtype: 'gridcolumn',
									width: 275,
									dataIndex: 'Description',
									text: 'Description'
								}
							],
							viewConfig: {
								enableTextSelection: true
							},
							plugins: [
								{
									ptype: 'gridexporter'
								}
							],
							tabConfig: {
								xtype: 'tab',
								dock: 'left',
								margin: '0 0 0 10',
								userCls: 'tab-with-border',
								width: 128
							}
						}
					]
				}
			]
		}
	],
	listeners: {
		afterrender: 'onPanelAfterRender'
	},

	onGridpanelSelectionChange: function(model, selected, eOpts) {
		let cat = selected[0].data.category;

		if(cat==='All'){ //1 = All
			this.categoryFilter = null;
		}else{
			this.categoryFilter = {
				property:'AppCategory',
				value:cat,
				exactMatch:true
			};
		}

		this.updateFilters();
	},

	onGridpanelSelectionChange1: function(model, selected, eOpts) {
		this.capabilityFilter = [];

		Ext.each(selected, function(sel){
			this.capabilityFilter.push({
				property:sel.data.filter,
				value:'YES',
				exactMatch:true
			});
		}, this);

		this.updateFilters();
	},

	onTextfieldKeyup: function(textfield, e, eOpts) {
		//debounce!
		if(this.delayTimer){
			Ext.undefer(this.delayTimer);
		}
		this.delayTimer = Ext.defer(function(){
			this.delayTimer = false;

			this.searchApps(textfield.getValue());

		}, 200, this);
	},

	onSearchRender: function(component, eOpts) {
		component.focus();
	},

	onButtonClick: function(button, e, eOpts) {
		this.queryById('search').setValue('');
		this.searchApps('');
	},

	onButtonClick4: function(button, e, eOpts) {
		let sThis = this;

		let xhttp = new XMLHttpRequest();

		this.mask('Refreshing Data');

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				location.reload();
			}
		};

		xhttp.open("POST", "/updateOinData", true);
		xhttp.send();

	},

	onButtonClick1: function(button, e, eOpts) {
		let sel = this.queryById('oinAppGrid').getSelectionModel().getSelection();

		if(sel.length < 1){
			Ext.Msg.alert(' ','Please select an app!');
			return;
		}

		this.addAppToMyApps(sel[0]);

	},

	onOinAppGridRowDblClick: function(tableview, record, element, rowIndex, e, eOpts) {
		this.addAppToMyApps(record);
	},

	onButtonClick2: function(button, e, eOpts) {
		this.queryById('myApps').saveDocumentAs({
		     type: 'xlsx',
		     title: 'My Apps',
		     fileName: 'My_Apps_'+Ext.util.Format.date(new Date(), 'Y-m-d_g-ia')+'.xlsx'
		 });
	},

	onButtonClick3: function(button, e, eOpts) {
		this.queryById('myApps').saveDocumentAs({
		     type: 'html',
		     title: 'My Apps',
		     fileName: 'My_Apps_'+Ext.util.Format.date(new Date(), 'Y-m-d_g-ia')+'.html'
		 });
	},

	onButtonClick11: function(button, e, eOpts) {
		let sel = this.queryById('myApps').getSelectionModel().getSelection();

		if(sel.length < 1){
			Ext.Msg.alert(' ','Please select an app!');
			return;
		}

		let store = this.getViewModel().getStore('myApps');
		store.remove(sel[0]);
		store.sync();
	},

	onButtonClick111: function(button, e, eOpts) {
		let store = this.getViewModel().getStore('myApps');
		store.removeAll();
		store.sync();
	},

	onPanelAfterRender: function(component, eOpts) {
		this.categoryFilter = null;
		this.searchFilter = null;
		this.capabilityFilter = [];

		//load my apps
		let myAppStore = this.getViewModel().getStore('myApps');
		myAppStore.on('datachanged',this.updateMyAppCount, this);
		myAppStore.load();

		//load oin apps
		let store = this.getViewModel().getStore('oinAppStore');

		var fields = store.getModel().getFields();
		Ext.each(fields,function(field){

		    switch(field.name ){
		        case 'Ranking':
		            field.sortType = this.customZeroSort;
		    }
		}, this);

		store.on('beforesort', function(store, sorters, eOpts){

		    if(sorters && sorters[0] && sorters[0]._direction){
		        appSortDir = sorters[0]._direction;
		    }
		}, this);

		store.on('load',this.loadApps,this);
		store.sort('Ranking','ASC');
		store.load();

		this.getLastApiRefresh();
	},

	addAppToMyApps: function(record) {
		let store = this.getViewModel().getStore('myApps');

		let existing = store.find('Name', record.get('Name'),0,false);

		if(existing > -1){
			return;
		}

		let rec = record.clone();
		rec.phantom = true;

		store.add(rec);

		store.sync();
	},

	searchApps: function(searchText) {
		let store = this.getViewModel().getStore('oinAppStore');

		if(searchText === ''){
			this.searchFilter = null;
			this.queryById('clearButton').hide();
		}else{
			this.searchFilter = {
				property:'DisplayName',
				value:searchText,
				anyMatch:true
			};
			this.queryById('clearButton').show();

			store.sort({property:'DisplayName',direction:'ASC'});
		}

		this.updateFilters();
	},

	customZeroSort: function(s) {
		if(s === 0){
		    if(appSortDir == "ASC"){
		        return 999;
		    }else{
		        return 0;
		    }
		}
		return s;
	},

	loadApps: function(store, records) {
		let groups = {
			'All':{
				category:'All',
				categoryLabel:'All',
				count:records.length
			}
		};

		Ext.each(records,function(rec){

			let cat = rec.get('AppCategory');

			if(!groups[cat]){
				groups[cat] = {
					count:1,
					category:cat,
					categoryLabel:rec.get('AppCategoryLabel')
				};

				rec.commit();
			}else{
				groups[cat].count++;
			};
		});

		let groupsArr = [];
		for(let cat in groups){
			let group = groups[cat];
			groupsArr.push([group.category, group.categoryLabel, group.count]);
		};

		this.getViewModel().getStore('oinCategoryStore').loadData(groupsArr);
	},

	updateFilters: function() {
		let filters = [];
		if(this.categoryFilter !== null){
			filters.push(this.categoryFilter);
		}
		if(this.searchFilter !== null){
			filters.push(this.searchFilter);
		}

		filters = filters.concat(this.capabilityFilter);

		let store = this.getViewModel().getStore('oinAppStore');

		if(filters.length > 0){
			store.clearFilter(true);
			store.filter(filters);
		}else{
			store.clearFilter();
		}

	},

	getLastApiRefresh: function() {
		let sThis = this;

		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				sThis.queryById('lastUpdate').update('Data Refreshed '+this.responseText);
			}
		};

		xhttp.open("POST", "lastApiUpdate", true);
		xhttp.send();
	},

	updateMyAppCount: function(store) {
		this.queryById('myApps').setTitle('<i class="fas fa-clipboard-list"></i> My Apps ('+store.getCount()+')');
	}

});