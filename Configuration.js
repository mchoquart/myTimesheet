/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.Configuration");jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");jQuery.sap.require("sap.ca.scfld.md.app.Application");sap.ca.scfld.md.ConfigurationBase.extend("hcm.mytimesheet.Configuration",{oServiceParams:{serviceList:[{name:"HCM_TIMESHEET_MAN_SRV",masterCollection:"Favorites",serviceUrl:hcm.mytimesheet.Component.getMetadata().getManifestEntry("sap.app").dataSources["HCM_TIMESHEET_MAN_SRV"].uri,isDefault:true,mockedDataSource:"/hcm.emp.mytimesheet/model/metadata.xml"}]},getServiceParams:function(){return this.oServiceParams;},getAppConfig:function(){return this.oAppConfig;},getServiceList:function(){return this.oServiceParams.serviceList;}});
