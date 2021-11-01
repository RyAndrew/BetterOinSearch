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
		'Ext.toolbar.TextItem',
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
					itemId: 'tabs',
					width: 100,
					bodyBorder: false,
					activeTab: 0,
					plain: true,
					items: [
						{
							xtype: 'panel',
							userCls: 'force-grid-border',
							bodyBorder: true,
							iconCls: 'x-fa fa-search',
							title: 'Search OIN',
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
											html: 'App v<BR>Data Refreshed',
											itemId: 'lastUpdate',
											style: {
												'text-align': 'right'
											}
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
													iconCls: 'x-fa fa-plus-square',
													text: 'Add to My Apps',
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
												return '<img src="'+store.cdnUrl + value+'" height="34" />';
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
														if(record.data['AutoLogin'] === 'YES' || record.data['BrowserPlugin'] === 'YES'){
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
							iconCls: 'x-fa fa-clipboard-list',
							title: 'My Apps (0)',
							bind: {
								store: '{myApps}'
							},
							dockedItems: [
								{
									xtype: 'toolbar',
									dock: 'top',
									items: [
										{
											xtype: 'tbtext',
											itemId: 'appListName',
											margin: '4 0 0 30',
											userCls: 'app-list-name'
										}
									]
								},
								{
									xtype: 'toolbar',
									dock: 'top',
									items: [
										{
											xtype: 'button',
											iconCls: 'x-fa fa-file-excel',
											text: 'Export',
											listeners: {
												click: 'onButtonClick2'
											}
										},
										{
											xtype: 'button',
											iconCls: 'x-fa fa-save',
											text: 'Save List',
											listeners: {
												click: 'onButtonClick3'
											}
										},
										{
											xtype: 'button',
											margin: '0 0 0 20',
											iconCls: 'x-fa fa-minus-square',
											text: 'Remove',
											listeners: {
												click: 'onButtonClick11'
											}
										},
										{
											xtype: 'button',
											margin: '0 0 0 30',
											iconCls: 'x-fa fa-trash-alt',
											text: 'Remove All',
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
										return '<img src="'+store.cdnUrl + value+'" height="34" />';
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
												if(record.data['AutoLogin'] === 'YES' || record.data['BrowserPlugin'] === 'YES'){
													return String.fromCodePoint(0x2705);
													//return '&#x2705;';
													//return '<img src="/inc/img/silk_icons/tick.png">';
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
						},
						{
							xtype: 'gridpanel',
							itemId: 'myAppLists',
							resizable: true,
							resizeHandles: 'w',
							userCls: 'force-grid-border',
							width: 400,
							iconCls: 'x-fa fa-list',
							title: 'My App Lists (0)',
							bind: {
								store: '{myLists}'
							},
							dockedItems: [
								{
									xtype: 'toolbar',
									dock: 'top',
									items: [
										{
											xtype: 'button',
											iconCls: 'x-fa fa-clipboard-list',
											text: 'View',
											listeners: {
												click: 'onButtonClick21'
											}
										},
										{
											xtype: 'button',
											iconCls: 'x-fa fa-copy',
											text: 'Copy Sharing Link',
											listeners: {
												click: 'onButtonClick211'
											}
										},
										{
											xtype: 'button',
											itemId: 'btnDelete',
											margin: '0 0 0 20',
											iconCls: 'x-fa fa-minus-square',
											text: 'Delete',
											listeners: {
												click: 'onBtnDeleteClick'
											}
										}
									]
								}
							],
							columns: [
								{
									xtype: 'gridcolumn',
									width: 240,
									dataIndex: 'listName',
									text: 'Name'
								},
								{
									xtype: 'gridcolumn',
									renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return value.length || '';
									},
									width: 96,
									dataIndex: 'appList',
									text: 'Apps'
								},
								{
									xtype: 'gridcolumn',
									width: 182,
									dataIndex: 'dateCreated',
									text: 'Date Created'
								},
								{
									xtype: 'gridcolumn',
									width: 182,
									dataIndex: 'dateModified',
									text: 'Date Modified'
								}
							],
							viewConfig: {
								enableTextSelection: true
							},
							tabConfig: {
								xtype: 'tab',
								dock: 'left',
								margin: '0 0 0 10',
								userCls: 'tab-with-border'
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
		AERP.Ajax.request({
			url:'api/updateOinData',
			mask:this,
			success:function(resp){
				location.reload();
			},
			scope:this
		});
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
		this.saveListGetName();
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

	onButtonClick21: function(button, e, eOpts) {
		let sel = this.queryById('myAppLists').getSelectionModel().getSelection();

		if(sel.length < 1){
			Ext.Msg.alert(' ','Please select a list!');
			return;
		}

		this.loadAppsFromAppList(sel[0].data.appList, sel[0].data.listName);
	},

	onButtonClick211: function(button, e, eOpts) {
		let sel = this.queryById('myAppLists').getSelectionModel().getSelection();

		if(sel.length < 1){
			Ext.Msg.alert(' ','Please select a list!');
			return;
		}

		this.copyToClipboard(location.protocol+'//'+window.location.hostname +'/?list='+sel[0].data.listId);
	},

	onBtnDeleteClick: function(button, e, eOpts) {
		let sel = this.queryById('myAppLists').getSelectionModel().getSelection();

		if(sel.length < 1){
			Ext.Msg.alert(' ','Please select a list!');
			return;
		}

		AERP.Ajax.request({
			url:'api/delete',
			mask:this,
			jsonData:{
				list:sel[0].data.listId
			},
			success:function(resp){
				let store = this.getViewModel().getStore('myLists');
				store.remove(sel[0]);
				store.sync();
				this.updateMyListsCount(store);
			},
			scope:this
		});


	},

	onPanelAfterRender: function(component, eOpts) {
		this.categoryFilter = null;
		this.searchFilter = null;
		this.capabilityFilter = [];

		let cdnUrl = 'https://ok14static.oktacdn.com';

		//load my apps
		let myAppStore = this.getViewModel().getStore('myApps');
		myAppStore.on('datachanged',this.updateMyAppCount, this);
		myAppStore.load();

		myAppStore.cdnUrl = cdnUrl;

		//load oin apps
		let store = this.getViewModel().getStore('oinAppStore');
		store.cdnUrl = cdnUrl;

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

		store.on('load',this.oinAppsLoaded,this);
		store.sort('Ranking','ASC');
		store.load();

		let listsStore = this.getViewModel().getStore('myLists');
		listsStore.load();
		this.updateMyListsCount(listsStore);

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

	copyToClipboard: function(text) {
		if (typeof(navigator.clipboard)=='undefined') {
		    var textArea = document.createElement("textarea");
		    textArea.value = text;
		    textArea.style.position="fixed";  //avoid scrolling to bottom
		    document.body.appendChild(textArea);
		    textArea.focus();
		    textArea.select();

		    try {
		        let successful =document.execCommand('copy');
				if(!successful){
					Ext.Msg.alert(' ','Failed to copy to clipboard 1');
				}
		        //var msg = successful ? 'successful' : 'unsuccessful';
		        //toastr.info(msg);
		    } catch (err) {
					Ext.Msg.alert(' ','Failed to copy to clipboard 2');
		    }

		    document.body.removeChild(textArea);
		    return;
		}else{
			navigator.clipboard.writeText(text).then(function() {}, function() {
				Ext.Msg.alert(' ','Failed to copy to clipboard');
			});
		}
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

	loadAppListFromUrl: function() {
		var searchQuery = Ext.Object.fromQueryString(window.location.search);

		if(searchQuery.list){
			AERP.Ajax.request({
				url:'api/read',
				mask:this,
				jsonData:{
					list:searchQuery.list
				},
				success:function(resp){
					if(resp.data === null){
						Ext.Msg.alert(' ','This list has been deleted');
						return;
					}
					resp.data.appList = Ext.decode(resp.data.appList);
					this.loadAppsFromAppList(resp.data.appList, resp.data.listName);
				},
				scope:this
			});
		}

	},

	oinAppsLoaded: function(store, records) {
		if(records==undefined){
			return;
		}

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

		this.loadAppListFromUrl();
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

		this.queryById('oinAppGrid').getScrollable().scrollTo(0,0);
	},

	loadAppsFromAppList: function(appList, listName) {
		this.queryById('tabs').setActiveItem('myApps');
		this.queryById('appListName').setHtml(listName);

		let foundRecs = [];

		this.getViewModel().getStore('oinAppStore').each(function(rec){
			if(appList.indexOf(rec.get('Version'))>= 0){
				let clone = rec.clone();
				clone.phantom = true;
				foundRecs.push(clone);
			}
		});

		let MyAppsStore = this.getViewModel().getStore('myApps');
		MyAppsStore.removeAll();
		MyAppsStore.add(foundRecs);
		MyAppsStore.sync();

		this.updateMyAppCount(MyAppsStore);
	},

	saveListResponse: function(data) {
		let store = this.getViewModel().getStore('myLists');
		store.loadData([data],true);
		store.sync();
		this.updateMyListsCount(store);
	},

	saveList: function(listName) {
		let appList = [];
		this.getViewModel().getStore('myApps').each(function(rec){
			appList.push(rec.get('Version'));
		});

		AERP.Ajax.request({
			url:'api/create',
			mask:this,
			jsonData:{
				listName:listName,
				appList:appList
			},
			success:function(resp){
				resp.data.appList = Ext.decode(resp.data.appList);
				this.saveListResponse(resp.data);
			},
			scope:this
		});
	},

	saveListGetName: function() {
		if(!this.saveWin){
			this.saveWin = Ext.create('BetterOinSearch.view.SaveWindow',{
				listeners:{
					scope:this,
					saved:function(name){
						this.saveList(name);
					}
				}
			});
		}

		this.saveWin.clearAndShow();
	},

	getLastApiRefresh: function() {
		let appVer = '1.0.2';

		AERP.Ajax.request({
			url:'lastApiUpdate',
			method:'GET',
			rawResponse:true,
			success:function(resp){
				this.queryById('lastUpdate').update('App v'+appVer+'<BR>Data Refreshed '+resp);
			},
			scope:this
		});
	},

	updateMyAppCount: function(store) {
		this.queryById('myApps').setTitle('My Apps ('+store.getCount()+')');
	},

	updateMyListsCount: function(store) {
		this.queryById('myAppLists').setTitle('My App Lists ('+store.getCount()+')');
	}

});