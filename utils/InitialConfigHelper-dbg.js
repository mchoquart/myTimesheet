/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
/*global hcm:true */
hcm.mytimesheet.Configuration.extend("hcm.mytimesheet.utils.InitialConfigHelper", {
			
		getText : function(sKey, aParams) {
			return this.oBundle.getText(sKey, aParams);
		},
		getInitialInfoModel: function(){
			return this.initialInfoModel;
		},
		setInitialInfoModel: function(initialInfoModel){
			this.initialInfoModel = initialInfoModel;
		},
		setResourceBundle: function(resourceBundle){
			this.oBundle = resourceBundle;
		}
	
});
