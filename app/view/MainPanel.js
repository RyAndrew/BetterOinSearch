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
		'Ext.form.Panel',
		'Ext.form.field.Text',
		'Ext.button.Button',
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
							title: 'Categories',
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
							height: 245,
							bodyBorder: true,
							title: 'Capabilities',
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
					xtype: 'container',
					flex: 1,
					userCls: 'force-grid-border',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'form',
							height: 111,
							bodyPadding: 10,
							title: 'Search Okta Integration Network  <a href=\'https://docs.google.com/spreadsheets/d/1XQx4umhgmSQ21hkVqnitrJ7FTAbhpaXsks8vWAcOgIA/\'>Source Data</a>',
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
								width: 742
							},
							listeners: {
								rowdblclick: 'onOinAppGridRowDblClick'
							}
						}
					]
				},
				{
					xtype: 'gridpanel',
					itemId: 'myApps',
					resizable: true,
					resizeHandles: 'w',
					userCls: 'force-grid-border',
					width: 400,
					title: 'My Apps',
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
									text: 'Export',
									listeners: {
										click: 'onButtonClick2'
									}
								},
								{
									xtype: 'button',
									text: 'Print',
									listeners: {
										click: 'onButtonClick3'
									}
								},
								{
									xtype: 'button',
									text: 'Remove',
									listeners: {
										click: 'onButtonClick11'
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
						}
					],
					plugins: [
						{
							ptype: 'gridexporter'
						}
					]
				}
			]
		}
	],
	listeners: {
		render: 'onPanelRender'
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

	onButtonClick1: function(button, e, eOpts) {
		let sel = this.queryById('oinAppGrid').getSelectionModel().getSelection();
		console.log(sel);
		if(sel.length < 1){
			Ext.Msg.alert(' ','Please select an app!');
			return;
		}

		this.getViewModel().getStore('myApps').add(sel[0].clone());
	},

	onOinAppGridRowDblClick: function(tableview, record, element, rowIndex, e, eOpts) {
		this.getViewModel().getStore('myApps').add(record.clone());
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
		console.log(sel);
		if(sel.length < 1){
			Ext.Msg.alert(' ','Please select an app!');
			return;
		}

		this.getViewModel().getStore('myApps').remove(sel[0]);
	},

	onPanelRender: function(component, eOpts) {
		this.categoryFilter = null;
		this.searchFilter = null;
		this.capabilityFilter = [];

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
	},

	doAjaxRequest: function() {
		//let job = this.queryById('job').getValue();

		//let grid = this.queryById('jobGrid');

		//this.clearJobGrid();

		AERP.Ajax.request({
			url:'/controllerName/methodName',
			jsonData: {
				job:job
			},
			success:function(reply){
				//this.loadedJob = job;

				//store.loadData(reply.data);
			},
			scope:this,
			//mask:grid
		});
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
		console.log('loadApps',arguments);

		let groups = {
			'All':{
				//catNo: 1,
				category:'All',
				categoryLabel:'All',
				count:records.length
			}
		};
		//let catNo = 2;
		Ext.each(records,function(rec){

			let cat = rec.get('AppCategory');
			//let cat = btoa(catLabel);

			//console.log(cat);
			//console.log(groups[cat]);
			if(!groups[cat]){
				groups[cat] = {
					count:1,
					category:cat,
					categoryLabel:rec.get('AppCategoryLabel'),
					//catNo: catNo
				};
				//rec.set('AppCategory',++catNo);
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

	}

});