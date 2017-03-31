/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.Component");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");

// extent of sap.ca.scfld.md.ComponentBase
sap.ca.scfld.md.ComponentBase.extend("hcm.mytimesheet.Component", {
	metadata : sap.ca.scfld.md.ComponentBase.createMetaData("FS", {
										// "name" : "My Timesheet", 
										// "version" : "1.8.28",
										// "library" : "hcm.mytimesheet",
										"manifest": "json",
										"includes" : [],
										// "dependencies" : {
										// 	"libs" : [ "sap.m", "sap.me" ],
										// 	"components" : []
										// },
										"config" : {
											"titleResource" : "TIMESHEET_TITLE",
											"resourceBundle" : "i18n/i18n.properties",
											"icon" : "sap-icon://Fiori2/F0397",
											"favIcon" : "./resources/sap/ca/ui/themes/base/img/favicon/My_Timesheet.ico",
											"homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/57_iPhone_Desktop_Launch.png",
											"homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/114_iPhone-Retina_Web_Clip.png",
											"homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/72_iPad_Desktop_Launch.png",
											"homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/144_iPad_Retina_Web_Clip.png"
										},
										viewPath : "hcm.mytimesheet.view",
										fullScreenPageRoutes : {
											
											"S3" : {
												"pattern" : "",
												"view" : "S3"
											},
											"S31" : {
												"pattern" : "detail/{context}",
												"view" : "S31"
											}
										}

									}),	

	/**
	 * Initialize the application
	 * 
	 * @returns {sap.ui.core.Control} the content
	 */
	createContent : function() {
		var oViewData = {component: this};
		return sap.ui.view({
			viewName : "hcm.mytimesheet.Main",
			type : sap.ui.core.mvc.ViewType.XML,
			viewData : oViewData
		});
	}
});