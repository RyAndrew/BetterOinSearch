/*
 * File: app/view/MainPanelViewModel.js
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

Ext.define('BetterOinSearch.view.MainPanelViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.mainpanel',

	requires: [
		'Ext.data.Store',
		'Ext.data.field.Field',
		'Ext.util.Sorter',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Array',
		'Ext.data.proxy.LocalStorage'
	],

	stores: {
		oinCategoryStore: {
			fields: [
				{
					name: 'category'
				},
				{
					name: 'categoryLabel'
				},
				{
					name: 'count'
				}
			],
			sorters: {
				direction: 'DESC',
				property: 'count'
			}
		},
		oinCapabilities: {
			data: [
				[
					'SSO - SAML',
					'accessSAML'
				],
				[
					'SSO - OIDC',
					'accessOIDC'
				],
				//['Single Sign-On','productSingleSignOn'], - every app is on this list? why?
				//['SSO - WS-Federation','WSFED'],
				[
					'Workflows Connector',
					'accessWorkflowsConnectors'
				],
				[
					'Workflow Template',
					'accessWorkflowsTemplates'
				],
				//['Provisioning','accessProvisioning'],
				[
					'Lifecycle Management',
					'productLifecycleManagement'
				],
				[
					'Group Linking',
					'provisioningGroupLinking'
				],
				[
					'Group Push',
					'provisioningGroupPush'
				],
				[
					'Provis: Sync Password',
					'provisioningSyncPassword'
				],
				[
					'Provis: Attr Sourcing',
					'provisioningAttributeSourcing'
				],
				[
					'Provis: Attr Writeback',
					'provisioningAttributeWriteback'
				],
				[
					'Provis: Schema Disco',
					'provisioningSchemaDiscovery'
				]
			],
			fields: [
				{
					name: 'capabilities'
				},
				{
					name: 'filter'
				}
			]
		},
		oinAppStore: {
			model: 'BetterOinSearch.model.OinModel',
			proxy: {
				type: 'ajax',
				url: 'oin.json',
				reader: {
					type: 'array'
				}
			}
		},
		myApps: {
			model: 'BetterOinSearch.model.OinModel',
			proxy: {
				type: 'localstorage',
				id: 'myapps21916'
			}
		},
		myLists: {
			proxy: {
				type: 'localstorage',
				id: 'mylists21928'
			},
			fields: [
				{
					name: 'listId'
				},
				{
					name: 'listName'
				},
				{
					name: 'dateCreated'
				},
				{
					name: 'dateModified'
				},
				{
					name: 'appList'
				}
			]
		},
		searchTags: {
			fields: [
				{
					name: 'id'
				},
				{
					name: 'display'
				}
			]
		}
	}

});