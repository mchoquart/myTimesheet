/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.InitialConfigHelper");jQuery.sap.require("hcm.mytimesheet.utils.DataManager");hcm.mytimesheet.Configuration.extend("hcm.mytimesheet.utils.InitialConfigHelper",{getText:function(k,p){return this.oBundle.getText(k,p);},getInitialInfoModel:function(){return this.initialInfoModel;},setInitialInfoModel:function(i){this.initialInfoModel=i;},setResourceBundle:function(r){this.oBundle=r;}});
