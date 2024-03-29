/*
 * File: app/model/OinModel.js
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

Ext.define('BetterOinSearch.model.OinModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Integer'
	],

	fields: [
		{
			name: 'Name'
		},
		{
			name: 'DisplayName'
		},
		{
			name: 'Website'
		},
		{
			name: 'LogoImage'
		},
		{
			name: 'Description'
		},
		{
			name: 'AppCategory'
		},
		{
			name: 'AppCategoryLabel'
		},
		{
			name: 'Custom'
		},
		{
			name: 'SecurePasswordStore'
		},
		{
			name: 'SAML_2_0'
		},
		{
			name: 'SAML_1_1'
		},
		{
			name: 'BookMark'
		},
		{
			name: 'BrowserPlugin'
		},
		{
			name: 'AutoLogin'
		},
		{
			name: 'BasicAuth'
		},
		{
			name: 'ImportNewUsers'
		},
		{
			name: 'ImportProfileUpdates'
		},
		{
			name: 'PushNewUsers'
		},
		{
			name: 'PushProfileUpdates'
		},
		{
			name: 'PushUserDeactivation'
		},
		{
			name: 'PushPasswordUpdates'
		},
		{
			name: 'ReactivateUsers'
		},
		{
			name: 'AutoConfirmImports'
		},
		{
			type: 'int',
			name: 'Ranking'
		},
		{
			name: 'Version'
		},
		{
			name: 'Creatable'
		},
		{
			name: 'WSFED'
		},
		{
			name: 'OIDC'
		},
		{
			name: 'GroupPush'
		},
		{
			name: 'GroupSync'
		},
		{
			name: 'ImportUserSchema'
		},
		{
			name: 'ProfileMastering'
		},
		{
			name: 'SCIM'
		},
		{
			name: 'IntegrationApp'
		},
		{
			name: 'accessSAML'
		},
		{
			name: 'accessSWA'
		},
		{
			name: 'accessProvisioning'
		},
		{
			name: 'accessOIDC'
		},
		{
			name: 'accessWorkflowsConnectors'
		},
		{
			name: 'accessWorkflowsTemplates'
		},
		{
			name: 'accessWSFederation'
		},
		{
			name: 'provisioningCreate'
		},
		{
			name: 'provisioningUpdate'
		},
		{
			name: 'provisioningDeactivate'
		},
		{
			name: 'provisioningSyncPassword'
		},
		{
			name: 'provisioningGroupPush'
		},
		{
			name: 'provisioningGroupLinking'
		},
		{
			name: 'provisioningAttributeSourcing'
		},
		{
			name: 'provisioningAttributeWriteback'
		},
		{
			name: 'provisioningSchemaDiscovery'
		},
		{
			name: 'productLifecycleManagement'
		},
		{
			name: 'productSingleSignOn'
		},
		{
			name: 'path'
		}
	]
});