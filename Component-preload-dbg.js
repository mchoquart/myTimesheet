jQuery.sap.registerPreloadedModules({
"name":"hcm/mytimesheet/Component-preload",
"version":"2.0",
"modules":{
	"hcm/mytimesheet/Component.js":function(){/*
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
},
	"hcm/mytimesheet/Configuration.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("hcm.mytimesheet.Configuration", {

	oServiceParams: {
		serviceList: [
			{
			    name: "HCM_TIMESHEET_MAN_SRV",
                masterCollection: "Favorites",
                serviceUrl: hcm.mytimesheet.Component.getMetadata().getManifestEntry("sap.app").dataSources["HCM_TIMESHEET_MAN_SRV"].uri, //oData service relative path
                isDefault: true,
                mockedDataSource: "/hcm.emp.mytimesheet/model/metadata.xml"}
		]
	},

	getServiceParams: function () {
		return this.oServiceParams;
	},

	getAppConfig: function() {
		return this.oAppConfig;
	},

	getServiceList: function () {
		return this.oServiceParams.serviceList;
	}

});
},
	"hcm/mytimesheet/Main.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("hcm.mytimesheet.Main", {

	onInit: function() {
		jQuery.sap.require("sap.ca.scfld.md.Startup");
		sap.ca.scfld.md.Startup.init("hcm.mytimesheet", this);
// 		var effectiveUrl = jQuery.sap.getModulePath("hcm.mytimesheet") + "/" + "css/mts.css";
// 		jQuery.sap.includeStyleSheet(effectiveUrl, "notes_css");
	},
	onExit: function() {
		try {
			jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
			var x = hcm.mytimesheet.utils.ConcurrentEmployment.getControllerInstance();
			x.oCEDialog.Cancelled = true;
			x.oCEDialog.close();
			x.oApplication.pernr = "";
		} catch (e) {
			jQuery.sap.log.error("couldn't execute onExit", ["onExit failed in main controller"], ["hcm.mytimesheet.Main"]);
		}
	}
});
},
	"hcm/mytimesheet/Main.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core"\n           xmlns="sap.m" controllerName="hcm.mytimesheet.Main"  displayBlock="true" height="100%">\n        <App id="fioriContent" showHeader="false">\n        </App>\n</core:View>',
	"hcm/mytimesheet/i18n/i18n.properties":'# My Timesheet V2\n# __ldi.translation.uuid=98558aa0-590c-11e4-8ed6-0800200c9a66\n\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Choose a Personnel Assignment\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Personnel Assignments\n\n#XFLD: label for from time\nFROM=from\n\n#XFLD: label for to time\nTO=to\n\n#XBUT: Button to cancel\nCANCEL=Cancel\n\n#XBUT: Button to close popover\nCLOSE=Close\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=YES\n\n#XBUT: Button to decline\nNO=NO\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Save Draft\n\n# XTIT: \nTIMESHEET_TITLE=My Timesheet\n\n#XTIT:\nINTERNAL_ERROR = Internal Error\n\n#XTIT:\nERROR = Error\n\n#XFLD:\nINTERNAL_ERROR_BODY = There is an Internal error in the application related to the error handling\n\n# XTIT:\nFAV_DIALOG_BOX=Delete Favorites\n\n# XTIT: \nTIMESHEET=Timesheet Entries\n\n#XBUT: Button for quick entry\nQUICK_FILL=Quick Entry\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Apply To\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Create Time Entry\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Create Entry for {0} days\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Entry Details\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Entry Details for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Create Entry for {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=January\n# XTIT: Month title for calendar\nMONTH_FULL_1=February\n# XTIT: Month title for calendar\nMONTH_FULL_2=March\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=May\n# XTIT: Month title for calendar\nMONTH_FULL_5=June\n# XTIT: Month title for calendar\nMONTH_FULL_6=July\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=October\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Action Required\n# XTIT: Legend filled day\nFILLED_DAY=Done\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Approver Action Needed\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejected\n# XFLD: Legend future working day\nWORKING_DAY=Working day\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Non-working day\n# XFLD: Legend selected working day\nSELECTED_DAY=Selected day\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Selected Non-working day\n# XFLD: Legend current day\nCURRENT_DAY=Current day\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total Missing Hours: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hours)\n\n#XBUT: Button\nSAVE=Save\n\n#XBUT: Button \nSUBMIT=Submit\n\n# XMSG\nFILL_ALL=Enter {0} hours for:\n\n#XFLD\nNO_TASK_TYPE=No Task Type\n\n#XFLD\nMISSING_DAYS=Missing Days:{0}\n\n#XBUT: Button\nHOME=Home\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirm Deletion\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirm Submission\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirm Draft\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Summary of time entries selected for Deletion\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Summary of time entries selected for Submission\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Summary of time entries selected\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Number of Entries\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Number of Hours\n\n#XBUT: Confirm Button\nCONFIRM=Confirm\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} Hours\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hour / {1} hours\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} Hours / {1} Hours\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Target: {0} Hours \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} Time Assignments\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 Time Assignment\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=No Assignments\n\n#XMSG: No Recordings\nNO_RECORDING=No Recordings\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} Hours Approved\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Save with time\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Save without time\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Delete Favorites\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Save as Favorite\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Manage favorites\n\n#XFLD: Week \nWEEK=Week\n\n#XFLD:\nMEET_TARGET_HOURS=Apply hours to:\n\n#XBUT\nALL_MISSING=All Missing Time ({0} hours)\n\n#XBUT: Delete Button Text\nDELETE=Delete\n\n#XBUT: Copy Button Text\nCOPY=Copy\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Add Entry\n\n#XFLD: label for duration\nDURATION=Duration\n\n#XFLD: label for total duration\nTOTAL_DURATION=Total Duration\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Start Time\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favorite Name\n\n#XFLD: label for end Time\nEND_TIME=End Time\n\n#XFLD: label for note\nNOTE=Note\n\n#XBUT: Done button\nDONE=Done\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Edit Entry\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Time Assignment\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Select Favorite / Worklist\n\n# XTIT: select worklist\nSELECT_WORKLIST=Select Worklist\n\n# XTIT: Favorite\nFAVORITE=Favorites\n\n# XTIT: Worklist\nWORKLIST=Worklist\n\n# XTIT: Add Favorite\nADD_FAVORITE=Add Favorite\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Edit Favorites\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Load More\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Loading...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continue Search on Server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Loading...\n\n#XFLD: BLANK\nEMPTY=Empty\n\n#XFLD: None\nNONE=None\n\n#XFLD\nNO_WORKLIST = No worklist available\n\n#XFLD\nNO_FAVORITE = No favorites available\n\n# XTIT: Select\nSELECT=Select {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Select\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Search...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=hours\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, YYYY\n\n#XBUT:\nDETAIL=Detail\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Settings\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Any unsaved data will be discarded. Are you sure you want to proceed?\n\n# XTIT: \nUNSAVED_CHANGES=Unsaved Changes\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Request Submitted\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Please enter a favorite name\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Please enter some fields to store as your favorite\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Please enter a valid Duration\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Please enter valid Start and End Time\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Draft Saved Successfully\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorite Created\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorite Updated\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorite Deleted\n\n#XBUT:\nHELP=Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hours entered for this week.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Some entries are incorrect. Review error details and correct entries.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Time Entry for {0} and {1} more day(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edit Time Entry\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Time entry for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0}hours {1}minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0}h {1}m\n\n#XBUT: Button to reset\nRESET=Reset\n\n#XBUT: Button to update\nUPDATE=Update\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Add Favorite\n\n#XBUT: Button to create\nCREATE=Create\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME= Existing Favorite Name\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME = New Favorite Name\n\n#XTIT: time\nTIME = Time\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Request Deleted\n\n#XTIT:\nWARNING = Warning',
	"hcm/mytimesheet/i18n/i18n_ar.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u0627\\u062E\\u062A\\u0631 \\u062A\\u0639\\u064A\\u064A\\u0646 \\u0645\\u0648\\u0638\\u0641\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A \\u0627\\u0644\\u0645\\u0648\\u0638\\u0641\\u064A\\u0646\n\n#XFLD: label for from time\nFROM=\\u0645\\u0646\n\n#XFLD: label for to time\nTO=\\u0625\\u0644\\u0649\n\n#XBUT: Button to cancel\nCANCEL=\\u0625\\u0644\\u063A\\u0627\\u0621\n\n#XBUT: Button to close popover\nCLOSE=\\u0625\\u063A\\u0644\\u0627\\u0642\n\n#XBUT: Button to accept\nOK=\\u0645\\u0648\\u0627\\u0641\\u0642\n\n#XBUT: Button to affirm\nYES=\\u0646\\u0639\\u0645\n\n#XBUT: Button to decline\nNO=\\u0644\\u0627\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629\n\n# XTIT: \nTIMESHEET_TITLE=\\u0633\\u062C\\u0644 \\u0627\\u0644\\u062D\\u0636\\u0648\\u0631 \\u0627\\u0644\\u062E\\u0627\\u0635 \\u0628\\u064A\n\n#XTIT:\nINTERNAL_ERROR=\\u062E\\u0637\\u0623 \\u062F\\u0627\\u062E\\u0644\\u064A\n\n#XTIT:\nERROR=\\u062E\\u0637\\u0623\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u062D\\u062F\\u062B \\u062E\\u0637\\u0623 \\u062F\\u0627\\u062E\\u0644\\u064A \\u0645\\u0631\\u062A\\u0628\\u0637 \\u0628\\u0645\\u0639\\u0627\\u0644\\u062C\\u0629 \\u0627\\u0644\\u0623\\u062E\\u0637\\u0627\\u0621 \\u0641\\u064A \\u0627\\u0644\\u062A\\u0637\\u0628\\u064A\\u0642.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: \nTIMESHEET=\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0635\\u062D\\u064A\\u0641\\u0629 \\u0627\\u0644\\u062D\\u0636\\u0648\\u0631\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0633\\u0631\\u064A\\u0639\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u062A\\u0637\\u0628\\u064A\\u0642 \\u0639\\u0644\\u0649\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0648\\u0642\\u062A\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0}\n\n# XTIT: Month short header\nMONTH_0=\\u064A\\u0646\\u0627\\u064A\\u0631\n# XTIT: Month short header\nMONTH_1=\\u0641\\u0628\\u0631\\u0627\\u064A\\u0631\n# XTIT: Month short header\nMONTH_2=\\u0645\\u0627\\u0631\\u0633\n# XTIT: Month short header\nMONTH_3=\\u0623\\u0628\\u0631\\u064A\\u0644\n# XTIT: Month short header\nMONTH_4=\\u0645\\u0627\\u064A\\u0648\n# XTIT: Month short header\nMONTH_5=\\u064A\\u0648\\u0646\\u064A\\u0648\n# XTIT: Month short header\nMONTH_6=\\u064A\\u0648\\u0644\\u064A\\u0648\n# XTIT: Month short header\nMONTH_7=\\u0623\\u063A\\u0633\\u0637\\u0633\n# XTIT: Month short header\nMONTH_8=\\u0633\\u0628\\u062A\\u0645\\u0628\\u0631\n# XTIT: Month short header\nMONTH_9=\\u0623\\u0643\\u062A\\u0648\\u0628\\u0631\n# XTIT: Month short header\nMONTH_10=\\u0646\\u0648\\u0641\\u0645\\u0628\\u0631\n# XTIT: Month short header\nMONTH_11=\\u062F\\u064A\\u0633\\u0645\\u0628\\u0631\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u064A\\u0646\\u0627\\u064A\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u0641\\u0628\\u0631\\u0627\\u064A\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u0645\\u0627\\u0631\\u0633\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u0623\\u0628\\u0631\\u064A\\u0644\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u0645\\u0627\\u064A\\u0648\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u064A\\u0648\\u0646\\u064A\\u0648\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u064A\\u0648\\u0644\\u064A\\u0648\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u0623\\u063A\\u0633\\u0637\\u0633\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u0633\\u0628\\u062A\\u0645\\u0628\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u0623\\u0643\\u062A\\u0648\\u0628\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u0646\\u0648\\u0641\\u0645\\u0628\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u062F\\u064A\\u0633\\u0645\\u0628\\u0631\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0627\\u0644\\u0625\\u062C\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628\n# XTIT: Legend filled day\nFILLED_DAY=\\u062A\\u0645\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u0625\\u062C\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0639\\u062A\\u0645\\u0650\\u062F \\u0645\\u0637\\u0644\\u0648\\u0628\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u0645\\u0631\\u0641\\u0648\\u0636\n# XFLD: Legend future working day\nWORKING_DAY=\\u064A\\u0648\\u0645 \\u0639\\u0645\\u0644\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u064A\\u0648\\u0645 \\u0639\\u0637\\u0644\\u0629\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u0627\\u0644\\u064A\\u0648\\u0645 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u064A\\u0648\\u0645 \\u0627\\u0644\\u0639\\u0637\\u0644\\u0629 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\n# XFLD: Legend current day\nCURRENT_DAY=\\u0627\\u0644\\u064A\\u0648\\u0645 \\u0627\\u0644\\u062D\\u0627\\u0644\\u064A\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F\\u0629\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A)\n\n#XBUT: Button\nSAVE=\\u062D\\u0641\\u0638\n\n#XBUT: Button \nSUBMIT=\\u062A\\u0642\\u062F\\u064A\\u0645\n\n# XMSG\nFILL_ALL=\\u0623\\u062F\\u062E\\u0644 {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0644\\u0640\\:\n\n#XFLD\nNO_TASK_TYPE=\\u0628\\u062F\\u0648\\u0646 \\u0646\\u0648\\u0639 \\u0645\\u0647\\u0645\\u0629\n\n#XFLD\nMISSING_DAYS=\\u0627\\u0644\\u0623\\u064A\\u0627\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F\\u0629\\: {0}\n\n#XBUT: Button\nHOME=\\u0627\\u0644\\u0635\\u0641\\u062D\\u0629 \\u0627\\u0644\\u0631\\u0626\\u064A\\u0633\\u064A\\u0629\n\n#XTIT: confirmation header\nCONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u062D\\u0630\\u0641\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u0625\\u0631\\u0633\\u0627\\u0644\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629 \\u0644\\u0644\\u062D\\u0630\\u0641\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629 \\u0644\\u0644\\u0625\\u0631\\u0633\\u0627\\u0644\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u0639\\u062F\\u062F \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u0639\\u062F\\u062F \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XBUT: Confirm Button\nCONFIRM=\\u062A\\u0623\\u0643\\u064A\\u062F\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u0633\\u0627\\u0639\\u0629\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u0633\\u0627\\u0639\\u0629 / {1} \\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u0633\\u0627\\u0639\\u0627\\u062A / {1} \\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0627\\u0644\\u0645\\u0633\\u062A\\u0647\\u062F\\u0641\\: {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u0645\\u0646 \\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u0644\\u0627 \\u062A\\u0648\\u062C\\u062F \\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A\n\n#XMSG: No Recordings\nNO_RECORDING=\\u0644\\u0627 \\u064A\\u0648\\u062C\\u062F \\u062A\\u0633\\u062C\\u064A\\u0644\\u0627\\u062A\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=\\u062A\\u0645 \\u0627\\u0639\\u062A\\u0645\\u0627\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u062D\\u0641\\u0638 \\u0628\\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u062D\\u0641\\u0638 \\u0628\\u062F\\u0648\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u062D\\u0641\\u0638 \\u0643\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u0625\\u062F\\u0627\\u0631\\u0629 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XFLD: Week \nWEEK=\\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639\n\n#XFLD:\nMEET_TARGET_HOURS=\\u062A\\u0637\\u0628\\u064A\\u0642 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0639\\u0644\\u0649\\:\n\n#XBUT\nALL_MISSING=\\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F \\u0628\\u0627\\u0644\\u0643\\u0627\\u0645\\u0644 ({0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A)\n\n#XBUT: Delete Button Text\nDELETE=\\u062D\\u0630\\u0641\n\n#XBUT: Copy Button Text\nCOPY=\\u0646\\u0633\\u062E\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0625\\u062F\\u062E\\u0627\\u0644\n\n#XFLD: label for duration\nDURATION=\\u0627\\u0644\\u0645\\u062F\\u0629\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0645\\u062F\\u0629\n\n#XFLD: label for status\nSTATUS=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629\n\n#XFLD: label for start time\nSTART_TIME=\\u0648\\u0642\\u062A \\u0627\\u0644\\u0628\\u062F\\u0621\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XFLD: label for end Time\nEND_TIME=\\u0648\\u0642\\u062A \\u0627\\u0644\\u0627\\u0646\\u062A\\u0647\\u0627\\u0621\n\n#XFLD: label for note\nNOTE=\\u0645\\u0644\\u0627\\u062D\\u0638\\u0629\n\n#XBUT: Done button\nDONE=\\u062A\\u0645\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u064A\\u062F\\u0648\\u064A\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0623\\u0648 \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\n\n# XTIT: Favorite\nFAVORITE=\\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: Worklist\nWORKLIST=\\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u062A\\u062D\\u0645\\u064A\\u0644 \\u0627\\u0644\\u0645\\u0632\\u064A\\u062F...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644 ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629 \\u0627\\u0644\\u0628\\u062D\\u062B \\u0641\\u064A \\u0627\\u0644\\u062E\\u0627\\u062F\\u0645...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644 ...\n\n#XFLD: BLANK\nEMPTY=\\u0641\\u0627\\u0631\\u063A\n\n#XFLD: None\nNONE=\\u0644\\u0627 \\u0634\\u064A\\u0621\n\n#XFLD\nNO_WORKLIST=\\u0628\\u062F\\u0648\\u0646 \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0639\\u0645\\u0644 \\u0645\\u062A\\u0648\\u0641\\u0631\\u0629\n\n#XFLD\nNO_FAVORITE=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: Select\nSELECT=\\u062D\\u062F\\u062F {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u062A\\u062D\\u062F\\u064A\\u062F\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u0628\\u062D\\u062B...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u0633\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u062F\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u062F\\u0642\\u0627\\u0626\\u0642\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, YYYY\n\n#XBUT:\nDETAIL=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u0627\\u0644\\u0625\\u0639\\u062F\\u0627\\u062F\\u0627\\u062A\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u0633\\u0648\\u0641 \\u064A\\u062A\\u0645 \\u062A\\u062C\\u0627\\u0647\\u0644 \\u0623\\u064A\\u0629 \\u0628\\u064A\\u0627\\u0646\\u0627\\u062A \\u0644\\u0645 \\u064A\\u062A\\u0645 \\u062D\\u0641\\u0638\\u0647\\u0627. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0627\\u0644\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629 \\u0628\\u0627\\u0644\\u062A\\u0623\\u0643\\u064A\\u062F\\u061F\n\n# XTIT: \nUNSAVED_CHANGES=\\u062A\\u063A\\u064A\\u064A\\u0631\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0645\\u062D\\u0641\\u0648\\u0638\\u0629\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u062A\\u0645 \\u062A\\u0642\\u062F\\u064A\\u0645 \\u0627\\u0644\\u0637\\u0644\\u0628.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0633\\u0645 \\u0645\\u0641\\u0636\\u0644\\u0629 \\u0641\\u064A \\u062D\\u0642\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644 "\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A".\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u0627\\u062C\\u0639\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0644\\u0644\\u062A\\u062E\\u0632\\u064A\\u0646 \\u0643\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0644\\u062F\\u064A\\u0643.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0645\\u062F\\u0629 \\u0635\\u0627\\u0644\\u062D\\u0629.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u0623\\u062F\\u062E\\u0644 \\u0648\\u0642\\u062A \\u0628\\u062F\\u0627\\u064A\\u0629 \\u0648\\u0627\\u0646\\u062A\\u0647\\u0627\\u0621 \\u0635\\u0627\\u0644\\u062D\\u064B\\u0627.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629 \\u0628\\u0646\\u062C\\u0627\\u062D.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u062A\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u062A\\u0645 \\u062A\\u062D\\u062F\\u064A\\u062B \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u062A\\u0645 \\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\n\n#XBUT:\nHELP=\\u0645\\u0633\\u0627\\u0639\\u062F\\u0629\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=\\u062A\\u0645 \\u0625\\u062F\\u062E\\u0627\\u0644 {0}/{1} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u0642\\u0645 \\u0628\\u062A\\u0634\\u063A\\u064A\\u0644 \\u0645\\u064A\\u0632\\u0629 \\u0627\\u0644\\u0645\\u0644\\u0621 \\u0627\\u0644\\u0645\\u0633\\u0628\\u0642 \\u0644\\u062A\\u0648\\u0632\\u064A\\u0639 \\u0633\\u0627\\u0639\\u0627\\u062A \\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639 \\u0628\\u0633\\u0631\\u0639\\u0629 \\u0627\\u0633\\u062A\\u0646\\u0627\\u062F\\u064B\\u0627 \\u0625\\u0644\\u0649 \\u0622\\u062E\\u0631 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0646\\u0627\\u062C\\u062D.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u0628\\u0639\\u0636 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0635\\u062D\\u064A\\u062D\\u0629. \\u0628\\u0631\\u062C\\u0627\\u0621 \\u0645\\u0631\\u0627\\u062C\\u0639\\u0629 \\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0623\\u062E\\u0637\\u0627\\u0621 \\u0648\\u0642\\u0645 \\u0628\\u062A\\u0635\\u062D\\u064A\\u062D \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A \\u0644\\u0639\\u062F\\u062F {0} \\u0648{1} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645 \\u0627\\u0644\\u0623\\u062E\\u0631\\u0649\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A \\u0644\\u0639\\u062F\\u062F {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A {1} \\u0645\\u0646 \\u0627\\u0644\\u062F\\u0642\\u0627\\u0626\\u0642\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u0633{1} \\u062F\n\n#XBUT: Button to reset\nRESET=\\u0625\\u0639\\u0627\\u062F\\u0629 \\u062A\\u0639\\u064A\\u064A\\u0646\n\n#XBUT: Button to update\nUPDATE=\\u062A\\u062D\\u062F\\u064A\\u062B\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XBUT: Button to create\nCREATE=\\u0625\\u0646\\u0634\\u0627\\u0621\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0627\\u0644\\u062D\\u0627\\u0644\\u064A\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0627\\u0644\\u062C\\u062F\\u064A\\u062F\n\n#XTIT: time\nTIME=\\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u062A\\u0645 \\u062D\\u0630\\u0641 \\u0627\\u0644\\u0637\\u0644\\u0628\n\n#XTIT:\nWARNING=\\u062A\\u062D\\u0630\\u064A\\u0631\n',
	"hcm/mytimesheet/i18n/i18n_bg.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u0418\\u0437\\u0431\\u0435\\u0440\\u0435\\u0442\\u0435 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u043F\\u0435\\u0440\\u0441\\u043E\\u043D\\u0430\\u043B\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F \\u043D\\u0430 \\u043F\\u0435\\u0440\\u0441\\u043E\\u043D\\u0430\\u043B\n\n#XFLD: label for from time\nFROM=\\u041E\\u0442\n\n#XFLD: label for to time\nTO=\\u0414\\u043E\n\n#XBUT: Button to cancel\nCANCEL=\\u041E\\u0442\\u043A\\u0430\\u0437\n\n#XBUT: Button to close popover\nCLOSE=\\u0417\\u0430\\u0442\\u0432\\u0430\\u0440\\u044F\\u043D\\u0435\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u0414\\u0430\n\n#XBUT: Button to decline\nNO=\\u041D\\u0435\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0430\n\n# XTIT: \nTIMESHEET_TITLE=\\u041C\\u043E\\u044F \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0440\\u0430\\u0437\\u0447\\u0435\\u0442\n\n#XTIT:\nINTERNAL_ERROR=\\u0412\\u044A\\u0442\\u0440\\u0435\\u0448\\u043D\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0430\n\n#XTIT:\nERROR=\\u0413\\u0440\\u0435\\u0448\\u043A\\u0430\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u0412\\u044A\\u0437\\u043D\\u0438\\u043A\\u043D\\u0430 \\u0432\\u044A\\u0442\\u0440\\u0435\\u0448\\u043D\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0430 \\u0432 \\u043F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435\\u0442\\u043E, \\u0441\\u0432\\u044A\\u0440\\u0437\\u0430\\u043D\\u0430 \\u0441 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0438.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n# XTIT: \nTIMESHEET=\\u0417\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0432\\u044A\\u0432 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0440\\u0430\\u0437\\u0447\\u0435\\u0442\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u0411\\u044A\\u0440\\u0437\\u043E \\u0432\\u044A\\u0432\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u041F\\u0440\\u0438\\u043B\\u0430\\u0433\\u0430\\u043D\\u0435 \\u0437\\u0430\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0} \\u0434\\u043D\\u0438\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0437\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u043D\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0}\n\n# XTIT: Month short header\nMONTH_0=\\u042F\\u043D\\u0443\n# XTIT: Month short header\nMONTH_1=\\u0424\\u0435\\u0432\n# XTIT: Month short header\nMONTH_2=\\u041C\\u0430\\u0440\n# XTIT: Month short header\nMONTH_3=\\u0410\\u043F\\u0440\n# XTIT: Month short header\nMONTH_4=\\u041C\\u0430\\u0439\n# XTIT: Month short header\nMONTH_5=\\u042E\\u043D\\u0438\n# XTIT: Month short header\nMONTH_6=\\u042E\\u043B\\u0438\n# XTIT: Month short header\nMONTH_7=\\u0410\\u0432\\u0433\n# XTIT: Month short header\nMONTH_8=\\u0421\\u0435\\u043F\n# XTIT: Month short header\nMONTH_9=\\u041E\\u043A\\u0442\n# XTIT: Month short header\nMONTH_10=\\u041D\\u043E\\u0435\n# XTIT: Month short header\nMONTH_11=\\u0414\\u0435\\u043A\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u042F\\u043D\\u0443\\u0430\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u0424\\u0435\\u0432\\u0440\\u0443\\u0430\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u041C\\u0430\\u0440\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u0410\\u043F\\u0440\\u0438\\u043B\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u041C\\u0430\\u0439\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u042E\\u043D\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u042E\\u043B\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u0410\\u0432\\u0433\\u0443\\u0441\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u0421\\u0435\\u043F\\u0442\\u0435\\u043C\\u0432\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u041E\\u043A\\u0442\\u043E\\u043C\\u0432\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u041D\\u043E\\u0435\\u043C\\u0432\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u0414\\u0435\\u043A\\u0435\\u043C\\u0432\\u0440\\u0438\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0418\\u0437\\u0438\\u0441\\u043A\\u0432\\u0430 \\u0441\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435\n# XTIT: Legend filled day\nFILLED_DAY=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u041D\\u0435\\u043E\\u0431\\u0445\\u043E\\u0434\\u0438\\u043C\\u043E \\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435 \\u043D\\u0430 \\u043E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u0449\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u041E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u0435\\u043D\n# XFLD: Legend future working day\nWORKING_DAY=\\u0420\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u041D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D \\u043D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend current day\nCURRENT_DAY=\\u0422\\u0435\\u043A\\u0443\\u0449 \\u0434\\u0435\\u043D\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u041E\\u0431\\u0449\\u043E \\u043B\\u0438\\u043F\\u0441\\u0432\\u0430\\u0449\\u0438 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435)\n\n#XBUT: Button\nSAVE=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435\n\n#XBUT: Button \nSUBMIT=\\u0418\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n# XMSG\nFILL_ALL=\\u0412\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 {0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \\u0437\\u0430\\:\n\n#XFLD\nNO_TASK_TYPE=\\u041D\\u044F\\u043C\\u0430 \\u0432\\u0438\\u0434 \\u0437\\u0430\\u0434\\u0430\\u0447\\u0430\n\n#XFLD\nMISSING_DAYS=\\u041B\\u0438\\u043F\\u0441\\u0432\\u0430\\u0449\\u0438 \\u0434\\u043D\\u0438\\: {0}\n\n#XBUT: Button\nHOME=\\u041D\\u0430\\u0447\\u0430\\u043B\\u043E\n\n#XTIT: confirmation header\nCONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0430\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438, \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u0438 \\u0437\\u0430 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438, \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u0438 \\u0437\\u0430 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u0438 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u0411\\u0440\\u043E\\u0439 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u0411\\u0440\\u043E\\u0439 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XBUT: Confirm Button\nCONFIRM=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u0447\\u0430\\u0441 / {1} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u0447\\u0430\\u0441\\u0430 / {1} \\u0447\\u0430\\u0441\\u0430\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0426\\u0435\\u043B\\: {0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u043E \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u041D\\u044F\\u043C\\u0430 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F\n\n#XMSG: No Recordings\nNO_RECORDING=\\u041D\\u044F\\u043C\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u0447\\u0430\\u0441\\u0430 \\u043E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\\u0438\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u0441 \\u0432\\u0440\\u0435\\u043C\\u0435\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u0431\\u0435\\u0437 \\u0432\\u0440\\u0435\\u043C\\u0435\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u043A\\u0430\\u0442\\u043E \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u0423\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n#XFLD: Week \nWEEK=\\u0421\\u0435\\u0434\\u043C\\u0438\\u0446\\u0430\n\n#XFLD:\nMEET_TARGET_HOURS=\\u041F\\u0440\\u0438\\u043B\\u0430\\u0433\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \\u0437\\u0430\\:\n\n#XBUT\nALL_MISSING=\\u0426\\u044F\\u043B\\u043E\\u0442\\u043E \\u043B\\u0438\\u043F\\u0441\\u0432\\u0430\\u0449\\u043E \\u0432\\u0440\\u0435\\u043C\\u0435 ({0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435)\n\n#XBUT: Delete Button Text\nDELETE=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\n\n#XBUT: Copy Button Text\nCOPY=\\u041A\\u043E\\u043F\\u0438\\u0440\\u0430\\u043D\\u0435\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n#XFLD: label for duration\nDURATION=\\u041F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E\\u0441\\u0442\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u041E\\u0431\\u0449\\u043E \\u043F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E\\u0441\\u0442\n\n#XFLD: label for status\nSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441\n\n#XFLD: label for start time\nSTART_TIME=\\u041D\\u0430\\u0447\\u0430\\u043B\\u0435\\u043D \\u0447\\u0430\\u0441\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u0418\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XFLD: label for end Time\nEND_TIME=\\u041A\\u0440\\u0430\\u0435\\u043D \\u0447\\u0430\\u0441\n\n#XFLD: label for note\nNOTE=\\u0417\\u0430\\u0431\\u0435\\u043B\\u0435\\u0436\\u043A\\u0430\n\n#XBUT: Done button\nDONE=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u0420\\u044A\\u0447\\u043D\\u043E\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0446\\u0438\\u044F \\u043D\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u0418\\u0437\\u0431\\u043E\\u0440 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442 \\u043E\\u0442 \\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u0418\\u0437\\u0431\\u043E\\u0440 \\u043D\\u0430 \\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n# XTIT: Favorite\nFAVORITE=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n# XTIT: Worklist\nWORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u0417\\u0430\\u0440\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u043E\\u0449\\u0435 ...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u0417\\u0430\\u0440\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u041F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0430\\u0432\\u0430 \\u0442\\u044A\\u0440\\u0441\\u0435\\u043D\\u0435 \\u043D\\u0430 \\u0441\\u044A\\u0440\\u0432\\u044A\\u0440...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u0417\\u0430\\u0440\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435...\n\n#XFLD: BLANK\nEMPTY=\\u041F\\u0440\\u0430\\u0437\\u043D\\u043E\n\n#XFLD: None\nNONE=\\u041D\\u044F\\u043C\\u0430\n\n#XFLD\nNO_WORKLIST=\\u041D\\u044F\\u043C\\u0430 \\u043D\\u0430\\u043B\\u0438\\u0447\\u0435\\u043D \\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n#XFLD\nNO_FAVORITE=\\u041D\\u044F\\u043C\\u0430 \\u043D\\u0430\\u043B\\u0438\\u0447\\u043D\\u0438 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n# XTIT: Select\nSELECT=\\u0418\\u0437\\u0431\\u0435\\u0440\\u0435\\u0442\\u0435 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u0418\\u0437\\u0431\\u0438\\u0440\\u0430\\u043D\\u0435\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u0422\\u044A\\u0440\\u0441\\u0435\\u043D\\u0435...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u0447\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u043C\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u0427\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u041C\\u0438\\u043D\\u0443\\u0442\\u0438\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=\\u041C\\u041C\\u041C \\u0414\\u0414, \\u0413\\u0413\\u0413\\u0413\n\n#XBUT:\nDETAIL=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u041D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0438\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u041D\\u0435\\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0438\\u0442\\u0435 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0449\\u0435 \\u0431\\u044A\\u0434\\u0430\\u0442 \\u0438\\u0437\\u0433\\u0443\\u0431\\u0435\\u043D\\u0438. \\u0421\\u0438\\u0433\\u0443\\u0440\\u043D\\u0438 \\u043B\\u0438 \\u0441\\u0442\\u0435, \\u0447\\u0435 \\u0436\\u0435\\u043B\\u0430\\u0435\\u0442\\u0435 \\u0434\\u0430 \\u043F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435?\n\n# XTIT: \nUNSAVED_CHANGES=\\u041D\\u0435\\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0438 \\u043F\\u0440\\u043E\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430\\u0442\\u0430 \\u0435 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0442\\u0435\\u043D\\u0430.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u041C\\u043E\\u043B\\u044F, \\u0432\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0438\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442 \\u0432 \\u043F\\u043E\\u043B\\u0435\\u0442\\u043E \\u0437\\u0430 \\u0432\\u044A\\u0432\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u0412\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0434\\u0430\\u043D\\u043D\\u0438, \\u0437\\u0430 \\u0434\\u0430 \\u0433\\u0438 \\u0441\\u044A\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u0435 \\u043A\\u0430\\u0442\\u043E \\u0432\\u0430\\u0448 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u041C\\u043E\\u043B\\u044F, \\u0432\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0432\\u0430\\u043B\\u0438\\u0434\\u043D\\u0430 \\u043F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E\\u0441\\u0442.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u0412\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0432\\u0430\\u043B\\u0438\\u0434\\u0435\\u043D \\u043D\\u0430\\u0447\\u0430\\u043B\\u0435\\u043D \\u0438 \\u043A\\u0440\\u0430\\u0435\\u043D \\u0447\\u0430\\u0441.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u0427\\u0435\\u0440\\u043D\\u043E\\u0432\\u0430 \\u0435 \\u0443\\u0441\\u043F\\u0435\\u0448\\u043D\\u043E \\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0430.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u044A\\u0442 \\u0435 \\u0441\\u044A\\u0437\\u0434\\u0430\\u0434\\u0435\\u043D.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u044A\\u0442 \\u0435 \\u0430\\u043A\\u0442\\u0443\\u0430\\u043B\\u0438\\u0437\\u0438\\u0440\\u0430\\u043D.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u044A\\u0442 \\u0435 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0442.\n\n#XBUT:\nHELP=\\u041F\\u043E\\u043C\\u043E\\u0449\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \\u0432\\u044A\\u0432\\u0435\\u0434\\u0435\\u043D\\u0438 \\u0437\\u0430 \\u0442\\u0430\\u0437\\u0438 \\u0441\\u0435\\u0434\\u043C\\u0438\\u0446\\u0430\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u0412\\u043A\\u043B\\u044E\\u0447\\u0435\\u0442\\u0435 \\u043F\\u0440\\u0435\\u0434\\u0432\\u0430\\u0440\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E \\u043F\\u043E\\u043F\\u044A\\u043B\\u0432\\u0430\\u043D\\u0435 \\u0437\\u0430 \\u0431\\u044A\\u0440\\u0437\\u043E \\u043F\\u043E\\u043F\\u044A\\u043B\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\\u0442\\u0435 \\u0437\\u0430 \\u0441\\u0435\\u0434\\u043C\\u0438\\u0446\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u0431\\u0430\\u0437\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u043F\\u043E\\u0441\\u043B\\u0435\\u0434\\u043D\\u0438\\u0442\\u0435 \\u0443\\u0441\\u043F\\u0435\\u0448\\u043D\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u041D\\u044F\\u043A\\u043E\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0441\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043D\\u0438. \\u041C\\u043E\\u043B\\u044F, \\u043F\\u0440\\u0435\\u0433\\u043B\\u0435\\u0434\\u0430\\u0439\\u0442\\u0435 \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438\\u0442\\u0435 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0437\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0438\\u0442\\u0435 \\u0438 \\u043A\\u043E\\u0440\\u0438\\u0433\\u0438\\u0440\\u0430\\u0439\\u0442\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\\u0442\\u0435.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u0417\\u0430\\u043F\\u0438\\u0441 \\u0432\\u0440\\u0435\\u043C\\u0435 \\u0437\\u0430 {0} \\u0438 {1} \\u043F\\u043E\\u0432\\u0435\\u0447\\u0435 \\u0434\\u043D\\u0438\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0446\\u0438\\u044F \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u0412\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u0447\\u0430\\u0441\\u0430 {1} \\u043C\\u0438\\u043D\\u0443\\u0442\\u0438\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\n\n#XBUT: Button to reset\nRESET=\\u041F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435\n\n#XBUT: Button to update\nUPDATE=\\u0410\\u043A\\u0442\\u0443\\u0430\\u043B\\u0438\\u0437\\u0438\\u0440\\u0430\\u043D\\u0435\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XBUT: Button to create\nCREATE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u0422\\u0435\\u043A\\u0443\\u0449\\u043E \\u0438\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u041D\\u043E\\u0432\\u043E \\u0438\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XTIT: time\nTIME=\\u0412\\u0440\\u0435\\u043C\\u0435\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430\\u0442\\u0430 \\u0435 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0442\\u0430\n\n#XTIT:\nWARNING=\\u041F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n',
	"hcm/mytimesheet/i18n/i18n_cs.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Zvolte pracovn\\u00ED smlouvu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Pracovn\\u00ED smlouvy\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Zru\\u0161it\n\n#XBUT: Button to close popover\nCLOSE=Zav\\u0159\\u00EDt\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Ano\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Ulo\\u017Eit n\\u00E1vrh\n\n# XTIT: \nTIMESHEET_TITLE=Moje evidence \\u010Dasu\n\n#XTIT:\nINTERNAL_ERROR=Intern\\u00ED chyba\n\n#XTIT:\nERROR=Chyba\n\n#XFLD:\nINTERNAL_ERROR_BODY=V aplikaci do\\u0161lo k intern\\u00ED chyb\\u011B souvisej\\u00EDc\\u00ED se zpracov\\u00E1n\\u00EDm chyby.\n\n# XTIT:\nFAV_DIALOG_BOX=Vymazat obl\\u00EDben\\u00E9\n\n# XTIT: \nTIMESHEET=Z\\u00E1znamy evidence \\u010Dasu\n\n#XBUT: Button for quick entry\nQUICK_FILL=Rychl\\u00FD z\\u00E1znam\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Pou\\u017E\\u00EDt na\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detaily\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Vytvo\\u0159it \\u010Dasov\\u00FD z\\u00E1znam\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Vytvo\\u0159it z\\u00E1znam pro {0} dn\\u00ED\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detaily z\\u00E1znamu\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detaily z\\u00E1znamu pro {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Vytvo\\u0159it z\\u00E1znam pro {0}\n\n# XTIT: Month short header\nMONTH_0=Led\n# XTIT: Month short header\nMONTH_1=\\u00DAno\n# XTIT: Month short header\nMONTH_2=B\\u0159e\n# XTIT: Month short header\nMONTH_3=Dub\n# XTIT: Month short header\nMONTH_4=Kv\\u011B\n# XTIT: Month short header\nMONTH_5=\\u010Cer\n# XTIT: Month short header\nMONTH_6=\\u010Cvc\n# XTIT: Month short header\nMONTH_7=Srp\n# XTIT: Month short header\nMONTH_8=Z\\u00E1\\u0159\n# XTIT: Month short header\nMONTH_9=\\u0158\\u00EDj\n# XTIT: Month short header\nMONTH_10=Lis\n# XTIT: Month short header\nMONTH_11=Pro\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Leden\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u00DAnor\n# XTIT: Month title for calendar\nMONTH_FULL_2=B\\u0159ezen\n# XTIT: Month title for calendar\nMONTH_FULL_3=Duben\n# XTIT: Month title for calendar\nMONTH_FULL_4=Kv\\u011Bten\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u010Cerven\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u010Cervenec\n# XTIT: Month title for calendar\nMONTH_FULL_7=Srpen\n# XTIT: Month title for calendar\nMONTH_FULL_8=Z\\u00E1\\u0159\\u00ED\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u0158\\u00EDjen\n# XTIT: Month title for calendar\nMONTH_FULL_10=Listopad\n# XTIT: Month title for calendar\nMONTH_FULL_11=Prosinec\n\n# XTIT: Legend missing day\nMISSING_DAY=Vy\\u017Eadov\\u00E1na akce\n# XTIT: Legend filled day\nFILLED_DAY=Hotovo\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Je po\\u017Eadov\\u00E1na akce schvalovatele\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Zam\\u00EDtnuto\n# XFLD: Legend future working day\nWORKING_DAY=Pracovn\\u00ED den\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Nepracovn\\u00ED den\n# XFLD: Legend selected working day\nSELECTED_DAY=Vybran\\u00FD den\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Vybran\\u00FD nepracovn\\u00ED den\n# XFLD: Legend current day\nCURRENT_DAY=Aktu\\u00E1ln\\u00ED den\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Celkem chyb\\u00ED hodin\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hodin)\n\n#XBUT: Button\nSAVE=Ulo\\u017Eit\n\n#XBUT: Button \nSUBMIT=Odeslat\n\n# XMSG\nFILL_ALL=Zadat {0} hodin pro\\:\n\n#XFLD\nNO_TASK_TYPE=\\u017D\\u00E1dn\\u00FD typ \\u00FAlohy\n\n#XFLD\nMISSING_DAYS=Chyb\\u011Bj\\u00EDc\\u00ED dny\\:  {0}\n\n#XBUT: Button\nHOME=Dom\\u016F\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrzen\\u00ED\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdit vymaz\\u00E1n\\u00ED\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdit odesl\\u00E1n\\u00ED\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdit n\\u00E1vrh\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Souhrn \\u010Dasov\\u00FDch z\\u00E1znam\\u016F k vymaz\\u00E1n\\u00ED\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Souhrn \\u010Dasov\\u00FDch z\\u00E1znam\\u016F vybran\\u00FDch k odesl\\u00E1n\\u00ED\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Souhrn vybran\\u00FDch \\u010Dasov\\u00FDch z\\u00E1znam\\u016F\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Po\\u010Det z\\u00E1znam\\u016F\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Po\\u010Det hodin\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdit\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} hodina\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} hodin\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hodina / {1} hodiny \n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} hodin / {1} hodin\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=C\\u00EDl\\: {0} hodin \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=P\\u0159i\\u0159azen\\u00ED \\u010Dasu\\: {0} \n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=Jednor\\u00E1zov\\u00E9 p\\u0159i\\u0159azen\\u00ED\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u017D\\u00E1dn\\u00E9 p\\u0159i\\u0159azen\\u00ED\n\n#XMSG: No Recordings\nNO_RECORDING=\\u017D\\u00E1dn\\u00E9 z\\u00E1znamy\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=Schv\\u00E1len\\u00E9 hodiny\\: {0} \n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Ulo\\u017Eit s \\u010Dasem\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ulo\\u017Eit bez \\u010Dasu\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Vymazat obl\\u00EDben\\u00E9\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ulo\\u017Eit jako obl\\u00EDben\\u00E9\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Spr\\u00E1va obl\\u00EDben\\u00FDch\n\n#XFLD: Week \nWEEK=T\\u00FDden\n\n#XFLD:\nMEET_TARGET_HOURS=Pou\\u017E\\u00EDt hodiny na\\:\n\n#XBUT\nALL_MISSING=Ve\\u0161ker\\u00FD chyb\\u011Bj\\u00EDc\\u00ED \\u010Das (hodin\\: {0})\n\n#XBUT: Delete Button Text\nDELETE=Vymazat\n\n#XBUT: Copy Button Text\nCOPY=Kop\\u00EDrov\\u00E1n\\u00ED\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=P\\u0159idat z\\u00E1znam\n\n#XFLD: label for duration\nDURATION=Trv\\u00E1n\\u00ED\n\n#XFLD: label for total duration\nTOTAL_DURATION=Celkov\\u00E9 trv\\u00E1n\\u00ED\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Po\\u010D\\u00E1te\\u010Dn\\u00ED \\u010Das\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=N\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\n\n#XFLD: label for end Time\nEND_TIME=\\u010Cas ukon\\u010Den\\u00ED\n\n#XFLD: label for note\nNOTE=Pozn\\u00E1mka\n\n#XBUT: Done button\nDONE=Hotovo\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manu\\u00E1ln\\u011B\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Upravit z\\u00E1znam\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=P\\u0159i\\u0159azen\\u00ED \\u010Dasu\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Vybrat obl\\u00EDben\\u00E9 nebo z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: select worklist\nSELECT_WORKLIST=Vybrat z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: Favorite\nFAVORITE=Obl\\u00EDben\\u00E9\n\n# XTIT: Worklist\nWORKLIST=Z\\u00E1soba pr\\u00E1ce\n\n# XTIT: Add Favorite\nADD_FAVORITE=P\\u0159idat k obl\\u00EDben\\u00FDm\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Upravit obl\\u00EDben\\u00E9\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Na\\u010D\\u00EDst v\\u00EDce...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Na\\u010D\\u00EDt\\u00E1n\\u00ED...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Pokra\\u010Dovat v hled\\u00E1n\\u00ED na serveru...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Na\\u010D\\u00EDt\\u00E1n\\u00ED...\n\n#XFLD: BLANK\nEMPTY=Pr\\u00E1zdn.\n\n#XFLD: None\nNONE=Nic\n\n#XFLD\nNO_WORKLIST=Z\\u00E1soba pr\\u00E1ce nen\\u00ED k dispozici\n\n#XFLD\nNO_FAVORITE=Nejsou k dispozici \\u017E\\u00E1dn\\u00E9 obl\\u00EDben\\u00E9 polo\\u017Eky\n\n# XTIT: Select\nSELECT=Vybrat {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Vybrat\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Hled\\u00E1n\\u00ED...\n\n#XFLD: short label for hours\nHOURS_LABEL=hod.\n\n#XFLD: short label for minutes\nMINUTES_LABEL=min.\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Hodiny\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuty\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, RRRR\n\n#XBUT:\nDETAIL=Detaily\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Nastaven\\u00ED\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=V\\u0161echna neulo\\u017Een\\u00E1 data budou zru\\u0161ena. Chcete pokra\\u010Dovat?\n\n# XTIT: \nUNSAVED_CHANGES=Neulo\\u017Een\\u00E9 zm\\u011Bny\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Po\\u017Eadavek byl odesl\\u00E1n.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Zadejte n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky do vstupn\\u00EDho pole p\\u0159i\\u0159azen\\u00ED \\u010Dasu.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Vypl\\u0148te z\\u00E1znamy k ulo\\u017Een\\u00ED mezi obl\\u00ED\\u017Een\\u00E9 polo\\u017Eky.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Zadejte platn\\u00E9 trv\\u00E1n\\u00ED.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Zadejte platn\\u00FD po\\u010D\\u00E1te\\u010Dn\\u00ED a koncov\\u00FD \\u010Das.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=N\\u00E1vrh byl \\u00FAsp\\u011B\\u0161n\\u011B ulo\\u017Een.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla vytvo\\u0159ena.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla aktualizov\\u00E1na.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla vymaz\\u00E1na.\n\n#XBUT:\nHELP=N\\u00E1pov\\u011Bda\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hodin zad\\u00E1no pro tento t\\u00FDden\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Zapnout automatick\\u00E9 vypln\\u011Bn\\u00ED a rychle vyplnit hodiny pro dan\\u00FD t\\u00FDden na z\\u00E1klad\\u011B posledn\\u00EDho \\u00FAsp\\u011B\\u0161n\\u00E9ho z\\u00E1znamu.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=N\\u011Bkter\\u00E9 z\\u00E1znamy nejsou spr\\u00E1vn\\u00E9. Zkontrolujte detaily chyby a opravte z\\u00E1znamy.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Evidence \\u010Dasu pro {0} a {1} dal\\u0161\\u00EDch dn\\u00ED\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Upravit \\u010Dasov\\u00FD z\\u00E1znam\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u010Casov\\u00FD z\\u00E1znam pro {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} hodin {1} minut\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} hod. {1} min.\n\n#XBUT: Button to reset\nRESET=Resetovat\n\n#XBUT: Button to update\nUPDATE=Aktualizovat\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=P\\u0159idat k obl\\u00EDben\\u00FDm\n\n#XBUT: Button to create\nCREATE=Vytvo\\u0159it\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktu\\u00E1ln\\u00ED n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nov\\u00FD n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\n\n#XTIT: time\nTIME=\\u010Cas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Po\\u017Eadavek vymaz\\u00E1n\n\n#XTIT:\nWARNING=Upozorn\\u011Bn\\u00ED\n',
	"hcm/mytimesheet/i18n/i18n_de.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=W\\u00E4hlen Sie einen Besch\\u00E4ftigungsvertrag\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Besch\\u00E4ftigungsvertr\\u00E4ge\n\n#XFLD: label for from time\nFROM=Von\n\n#XFLD: label for to time\nTO=Bis\n\n#XBUT: Button to cancel\nCANCEL=Abbrechen\n\n#XBUT: Button to close popover\nCLOSE=Schlie\\u00DFen\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Ja\n\n#XBUT: Button to decline\nNO=Nein\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Entwurf sichern\n\n# XTIT: \nTIMESHEET_TITLE=Zeiterfassung\n\n#XTIT:\nINTERNAL_ERROR=Interner Fehler\n\n#XTIT:\nERROR=Fehler\n\n#XFLD:\nINTERNAL_ERROR_BODY=In der Anwendung ist bei der Fehlerbehandlung ein interner Fehler aufgetreten.\n\n# XTIT:\nFAV_DIALOG_BOX=Favoriten l\\u00F6schen\n\n# XTIT: \nTIMESHEET=Arbeitszeiteintr\\u00E4ge\n\n#XBUT: Button for quick entry\nQUICK_FILL=Schnellerfassung\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Anwenden auf\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Zeiteintrag anlegen\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Zeit f\\u00FCr {0} Tage erfassen\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Details zum Eintrag\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Zeiterfassung \\u2013 Details f\\u00FCr {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Zeit f\\u00FCr {0} erfassen\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=M\\u00E4r\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dez\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=M\\u00E4rz\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Juni\n# XTIT: Month title for calendar\nMONTH_FULL_6=Juli\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktober\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=Dezember\n\n# XTIT: Legend missing day\nMISSING_DAY=Aktion erforderlich\n# XTIT: Legend filled day\nFILLED_DAY=Fertig\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Genehmigung ausstehend\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Abgelehnt\n# XFLD: Legend future working day\nWORKING_DAY=Arbeitstag\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Arbeitsfreier Tag\n# XFLD: Legend selected working day\nSELECTED_DAY=Ausgew\\u00E4hlter Tag\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Ausgew\\u00E4hlter arbeitsfreier Tag\n# XFLD: Legend current day\nCURRENT_DAY=Aktueller Tag\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Insgesamt fehlende Stunden\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} Stunden)\n\n#XBUT: Button\nSAVE=Sichern\n\n#XBUT: Button \nSUBMIT=Absenden\n\n# XMSG\nFILL_ALL={0} Stunden erfassen f\\u00FCr\\:\n\n#XFLD\nNO_TASK_TYPE=Kein Aufgabentyp\n\n#XFLD\nMISSING_DAYS=Fehlende Tage\\: {0}\n\n#XBUT: Button\nHOME=Startseite\n\n#XTIT: confirmation header\nCONFIRMATION=Best\\u00E4tigung\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=L\\u00F6schen best\\u00E4tigen\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Senden best\\u00E4tigen\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Entwurf best\\u00E4tigen\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber zum L\\u00F6schen ausgew\\u00E4hlte Zeiteintr\\u00E4ge\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber zum Senden ausgew\\u00E4hlte Zeiteintr\\u00E4ge\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber ausgew\\u00E4hlte Zeiteintr\\u00E4ge\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Anzahl der Eintr\\u00E4ge\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Stundenanzahl\n\n#XBUT: Confirm Button\nCONFIRM=Best\\u00E4tigen\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Stunde\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} Stunden\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} Stunde/{1} Stunden\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} Stunden/{1} Stunden\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Soll\\: {0} Stunden \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} Zeitzuordnungen\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 Zeitzuordnung\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Keine Zuordnungen\n\n#XMSG: No Recordings\nNO_RECORDING=Keine Datens\\u00E4tze\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} Stunden genehmigt\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Mit Zeit sichern\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ohne Zeit sichern\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Favoriten l\\u00F6schen\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Als Favorit sichern\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Favoriten verwalten\n\n#XFLD: Week \nWEEK=Woche\n\n#XFLD:\nMEET_TARGET_HOURS=Stunden anwenden auf\\:\n\n#XBUT\nALL_MISSING=Alle fehlenden Zeiten ({0} Stunden)\n\n#XBUT: Delete Button Text\nDELETE=L\\u00F6schen\n\n#XBUT: Copy Button Text\nCOPY=Kopieren\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Eintrag hinzuf\\u00FCgen\n\n#XFLD: label for duration\nDURATION=Dauer\n\n#XFLD: label for total duration\nTOTAL_DURATION=Gesamtdauer\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Beginn (Zeit)\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favoritenname\n\n#XFLD: label for end Time\nEND_TIME=Ende (Zeit)\n\n#XFLD: label for note\nNOTE=Notiz\n\n#XBUT: Done button\nDONE=Fertig\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuell\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Eintrag bearbeiten\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Zeitzuordnung\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Favorit oder Arbeitsvorrat ausw\\u00E4hlen\n\n# XTIT: select worklist\nSELECT_WORKLIST=Arbeitsvorrat ausw\\u00E4hlen\n\n# XTIT: Favorite\nFAVORITE=Favoriten\n\n# XTIT: Worklist\nWORKLIST=Arbeitsvorrat\n\n# XTIT: Add Favorite\nADD_FAVORITE=Favorit hinzuf\\u00FCgen\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Favoriten bearbeiten\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Weitere laden ...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Ladevorgang l\\u00E4uft ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Suche auf Server fortsetzen ...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Ladevorgang l\\u00E4uft ...\n\n#XFLD: BLANK\nEMPTY=Leer\n\n#XFLD: None\nNONE=Keine\n\n#XFLD\nNO_WORKLIST=Kein Arbeitsvorrat verf\\u00FCgbar\n\n#XFLD\nNO_FAVORITE=Keine Favoriten verf\\u00FCgbar\n\n# XTIT: Select\nSELECT={0} ausw\\u00E4hlen\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Ausw\\u00E4hlen\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Suche...\n\n#XFLD: short label for hours\nHOURS_LABEL=Std.\n\n#XFLD: short label for minutes\nMINUTES_LABEL=Min.\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Stunden\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuten\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD. MMM YYYY\n\n#XBUT:\nDETAIL=Details\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Einstellungen\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Ungesicherte Daten gehen verloren. M\\u00F6chten Sie fortfahren?\n\n# XTIT: \nUNSAVED_CHANGES=Ungesicherte \\u00C4nderungen\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Der Antrag wurde gesendet.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Geben Sie im Bereich \'\'Zeitzuordnung\'\' einen Favoritennamen ein.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Nehmen Sie Eintr\\u00E4ge vor, die sie als Favoriten hinterlegen m\\u00F6chten.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Geben Sie eine g\\u00FCltige Dauer an.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Geben Sie einen g\\u00FCltigen Beginn und ein g\\u00FCltiges Ende an.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Der Entwurf wurde gesichert.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Der Favorit wurde angelegt.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Der Favorit wurde aktualisiert.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Der Favorit wurde gel\\u00F6scht.\n\n#XBUT:\nHELP=Hilfe\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} Stunden f\\u00FCr diese Woche erfasst.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Um Wochenstunden auf Basis des zuletzt gemachten Eintrags automatisch zu erfassen, aktivieren Sie \'\'Vorbelegen\'\'.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Einige Eintr\\u00E4ge sind fehlerhaft. Pr\\u00FCfen Sie die Fehlerdetails, und korrigieren Sie die Eingaben.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Zeiteintrag f\\u00FCr {0} und {1} weiteren Tag/weitere Tage\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Zeiteintrag bearbeiten\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Zeiteintrag f\\u00FCr {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} Stunden {1} Minuten\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} Std. {1} Min.\n\n#XBUT: Button to reset\nRESET=Zur\\u00FCcksetzen\n\n#XBUT: Button to update\nUPDATE=Aktualisieren\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Favorit hinzuf\\u00FCgen\n\n#XBUT: Button to create\nCREATE=Anlegen\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktueller Favoritenname\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Neuer Favoritenname\n\n#XTIT: time\nTIME=Zeit\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Der Antrag wurde gel\\u00F6scht.\n\n#XTIT:\nWARNING=Warnung\n',
	"hcm/mytimesheet/i18n/i18n_en.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Choose a Personnel Assignment\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Personnel Assignments\n\n#XFLD: label for from time\nFROM=From\n\n#XFLD: label for to time\nTO=To\n\n#XBUT: Button to cancel\nCANCEL=Cancel\n\n#XBUT: Button to close popover\nCLOSE=Close\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Yes\n\n#XBUT: Button to decline\nNO=No\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Save Draft\n\n# XTIT: \nTIMESHEET_TITLE=My Timesheet\n\n#XTIT:\nINTERNAL_ERROR=Internal Error\n\n#XTIT:\nERROR=Error\n\n#XFLD:\nINTERNAL_ERROR_BODY=An internal error related to the error handling has occured in the application.\n\n# XTIT:\nFAV_DIALOG_BOX=Delete Favorites\n\n# XTIT: \nTIMESHEET=Timesheet Entries\n\n#XBUT: Button for quick entry\nQUICK_FILL=Quick Entry\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Apply To\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Create Time Entry\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Create entry for {0} days\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Entry Details\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Entry details for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Create entry for {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=January\n# XTIT: Month title for calendar\nMONTH_FULL_1=February\n# XTIT: Month title for calendar\nMONTH_FULL_2=March\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=May\n# XTIT: Month title for calendar\nMONTH_FULL_5=June\n# XTIT: Month title for calendar\nMONTH_FULL_6=July\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=October\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Action Required\n# XTIT: Legend filled day\nFILLED_DAY=Done\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Approver Action Needed\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejected\n# XFLD: Legend future working day\nWORKING_DAY=Workday\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Non-Working Day\n# XFLD: Legend selected working day\nSELECTED_DAY=Selected Day\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Selected Non-Working Day\n# XFLD: Legend current day\nCURRENT_DAY=Current Day\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total missing hours\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hours)\n\n#XBUT: Button\nSAVE=Save\n\n#XBUT: Button \nSUBMIT=Submit\n\n# XMSG\nFILL_ALL=Enter {0} hours for\\:\n\n#XFLD\nNO_TASK_TYPE=No Task Type\n\n#XFLD\nMISSING_DAYS=Missing days\\: {0}\n\n#XBUT: Button\nHOME=Home\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirm Deletion\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirm Submission\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirm Draft\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Summary of Time Entries Selected for Deletion\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Summary of Time Entries Selected for Submission\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Summary of Time Entries Selected\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Number of Entries\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Number of Hours\n\n#XBUT: Confirm Button\nCONFIRM=Confirm\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} hours\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hour / {1} hours\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} hours / {1} hours\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Target\\: {0} hours \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} time assignments\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 time assignment\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=No Assignments\n\n#XMSG: No Recordings\nNO_RECORDING=No Records\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} hours approved\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Save With Time\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Save Without Time\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Delete Favorites\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Save as Favorite\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Manage Favorites\n\n#XFLD: Week \nWEEK=Week\n\n#XFLD:\nMEET_TARGET_HOURS=Apply hours to\\:\n\n#XBUT\nALL_MISSING=All missing time ({0} hours)\n\n#XBUT: Delete Button Text\nDELETE=Delete\n\n#XBUT: Copy Button Text\nCOPY=Copy\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Add Entry\n\n#XFLD: label for duration\nDURATION=Duration\n\n#XFLD: label for total duration\nTOTAL_DURATION=Total Duration\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Start Time\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favorite Name\n\n#XFLD: label for end Time\nEND_TIME=End Time\n\n#XFLD: label for note\nNOTE=Note\n\n#XBUT: Done button\nDONE=Done\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Edit Entry\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Time Assignment\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Select Favorite or Worklist\n\n# XTIT: select worklist\nSELECT_WORKLIST=Select Worklist\n\n# XTIT: Favorite\nFAVORITE=Favorites\n\n# XTIT: Worklist\nWORKLIST=Worklist\n\n# XTIT: Add Favorite\nADD_FAVORITE=Add Favorite\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Edit Favorites\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Load More...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Loading ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continue Search on Server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Loading ...\n\n#XFLD: BLANK\nEMPTY=Empty\n\n#XFLD: None\nNONE=None\n\n#XFLD\nNO_WORKLIST=No Worklist Available\n\n#XFLD\nNO_FAVORITE=No Favorites Available\n\n# XTIT: Select\nSELECT=Select {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Select\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Search...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Hours\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, YYYY\n\n#XBUT:\nDETAIL=Details\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Settings\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Any unsaved data will be discarded. Are you sure you want to proceed?\n\n# XTIT: \nUNSAVED_CHANGES=Unsaved Changes\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Request was submitted.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Please enter a favorite name in the Time Assignment input field.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Make entries to store as your favorite.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Please enter a valid duration.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Enter a valid start and end time.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Draft was saved successfully.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorite was created.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorite was updated.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorite was deleted.\n\n#XBUT:\nHELP=Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hours entered for this week\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Some entries are incorrect. Please review error details and correct entries.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Time entry for {0} and {1} more day(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edit Time Entry\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Time entry for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} hours {1} minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Reset\n\n#XBUT: Button to update\nUPDATE=Update\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Add Favorite\n\n#XBUT: Button to create\nCREATE=Create\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Current Favorite Name\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=New Favorite Name\n\n#XTIT: time\nTIME=Time\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Request Deleted\n\n#XTIT:\nWARNING=Warning\n',
	"hcm/mytimesheet/i18n/i18n_en_US_sappsd.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=[[[\\u0108\\u0125\\u014F\\u014F\\u015F\\u0113 \\u0105 \\u01A4\\u0113\\u0157\\u015F\\u014F\\u014B\\u014B\\u0113\\u013A \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=[[[\\u01A4\\u0113\\u0157\\u015F\\u014F\\u014B\\u014B\\u0113\\u013A \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for from time\nFROM=[[[\\u0192\\u0157\\u014F\\u0271]]]\n\n#XFLD: label for to time\nTO=[[[\\u0163\\u014F\\u2219\\u2219]]]\n\n#XBUT: Button to cancel\nCANCEL=[[[\\u0108\\u0105\\u014B\\u010B\\u0113\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to close popover\nCLOSE=[[[\\u0108\\u013A\\u014F\\u015F\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to accept\nOK=[[[\\u014E\\u0136\\u2219\\u2219]]]\n\n#XBUT: Button to affirm\nYES=[[[\\u0176\\u0114\\u015C\\u2219]]]\n\n#XBUT: Button to decline\nNO=[[[\\u0143\\u014E\\u2219\\u2219]]]\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=[[[\\u015C\\u0105\\u028B\\u0113 \\u010E\\u0157\\u0105\\u0192\\u0163\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nTIMESHEET_TITLE=[[[\\u039C\\u0177 \\u0162\\u012F\\u0271\\u0113\\u015F\\u0125\\u0113\\u0113\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT:\nINTERNAL_ERROR=[[[\\u012C\\u014B\\u0163\\u0113\\u0157\\u014B\\u0105\\u013A \\u0114\\u0157\\u0157\\u014F\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT:\nERROR=[[[\\u0114\\u0157\\u0157\\u014F\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD:\nINTERNAL_ERROR_BODY=[[[\\u0162\\u0125\\u0113\\u0157\\u0113 \\u012F\\u015F \\u0105\\u014B \\u012C\\u014B\\u0163\\u0113\\u0157\\u014B\\u0105\\u013A \\u0113\\u0157\\u0157\\u014F\\u0157 \\u012F\\u014B \\u0163\\u0125\\u0113 \\u0105\\u03C1\\u03C1\\u013A\\u012F\\u010B\\u0105\\u0163\\u012F\\u014F\\u014B \\u0157\\u0113\\u013A\\u0105\\u0163\\u0113\\u018C \\u0163\\u014F \\u0163\\u0125\\u0113 \\u0113\\u0157\\u0157\\u014F\\u0157 \\u0125\\u0105\\u014B\\u018C\\u013A\\u012F\\u014B\\u011F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT:\nFAV_DIALOG_BOX=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nTIMESHEET=[[[\\u0162\\u012F\\u0271\\u0113\\u015F\\u0125\\u0113\\u0113\\u0163 \\u0114\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button for quick entry\nQUICK_FILL=[[[\\u01EC\\u0171\\u012F\\u010B\\u0137 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=[[[\\u0100\\u03C1\\u03C1\\u013A\\u0177 \\u0162\\u014F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=[[[\\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0} \\u018C\\u0105\\u0177\\u015F]]]\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=[[[\\u0114\\u014B\\u0163\\u0157\\u0177 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=[[[\\u0114\\u014B\\u0163\\u0157\\u0177 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0192\\u014F\\u0157 {0}]]]\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0}]]]\n\n# XTIT: Month short header\nMONTH_0=[[[\\u0134\\u0105\\u014B\\u2219]]]\n# XTIT: Month short header\nMONTH_1=[[[\\u0191\\u0113\\u0183\\u2219]]]\n# XTIT: Month short header\nMONTH_2=[[[\\u039C\\u0105\\u0157\\u2219]]]\n# XTIT: Month short header\nMONTH_3=[[[\\u0100\\u03C1\\u0157\\u2219]]]\n# XTIT: Month short header\nMONTH_4=[[[\\u039C\\u0105\\u0177\\u2219]]]\n# XTIT: Month short header\nMONTH_5=[[[\\u0134\\u0171\\u014B\\u2219]]]\n# XTIT: Month short header\nMONTH_6=[[[\\u0134\\u0171\\u013A\\u2219]]]\n# XTIT: Month short header\nMONTH_7=[[[\\u0100\\u0171\\u011F\\u2219]]]\n# XTIT: Month short header\nMONTH_8=[[[\\u015C\\u0113\\u03C1\\u2219]]]\n# XTIT: Month short header\nMONTH_9=[[[\\u014E\\u010B\\u0163\\u2219]]]\n# XTIT: Month short header\nMONTH_10=[[[\\u0143\\u014F\\u028B\\u2219]]]\n# XTIT: Month short header\nMONTH_11=[[[\\u010E\\u0113\\u010B\\u2219]]]\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=[[[\\u0134\\u0105\\u014B\\u0171\\u0105\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_1=[[[\\u0191\\u0113\\u0183\\u0157\\u0171\\u0105\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_2=[[[\\u039C\\u0105\\u0157\\u010B\\u0125\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_3=[[[\\u0100\\u03C1\\u0157\\u012F\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_4=[[[\\u039C\\u0105\\u0177\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_5=[[[\\u0134\\u0171\\u014B\\u0113]]]\n# XTIT: Month title for calendar\nMONTH_FULL_6=[[[\\u0134\\u0171\\u013A\\u0177]]]\n# XTIT: Month title for calendar\nMONTH_FULL_7=[[[\\u0100\\u0171\\u011F\\u0171\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_8=[[[\\u015C\\u0113\\u03C1\\u0163\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_9=[[[\\u014E\\u010B\\u0163\\u014F\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_10=[[[\\u0143\\u014F\\u028B\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_11=[[[\\u010E\\u0113\\u010B\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Legend missing day\nMISSING_DAY=[[[\\u0100\\u010B\\u0163\\u012F\\u014F\\u014B \\u0158\\u0113\\u01A3\\u0171\\u012F\\u0157\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Legend filled day\nFILLED_DAY=[[[\\u010E\\u014F\\u014B\\u0113]]]\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u0157 \\u0100\\u010B\\u0163\\u012F\\u014F\\u014B \\u0143\\u0113\\u0113\\u018C\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend future working day\nWORKING_DAY=[[[\\u0174\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend non-working day\nNON_WORKING_DAY=[[[\\u0143\\u014F\\u014B-\\u0175\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend selected working day\nSELECTED_DAY=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0143\\u014F\\u014B-\\u0175\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend current day\nCURRENT_DAY=[[[\\u0108\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163 \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=[[[\\u0162\\u014F\\u0163\\u0105\\u013A \\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u0124\\u014F\\u0171\\u0157\\u015F\\: {0}]]]\n\n#XFLD:\nMONTH_YEAR=[[[{0} {1} ({2} \\u0125\\u014F\\u0171\\u0157\\u015F)]]]\n\n#XBUT: Button\nSAVE=[[[\\u015C\\u0105\\u028B\\u0113]]]\n\n#XBUT: Button \nSUBMIT=[[[\\u015C\\u0171\\u0183\\u0271\\u012F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XMSG\nFILL_ALL=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 {0} \\u0125\\u014F\\u0171\\u0157\\u015F \\u0192\\u014F\\u0157\\:]]]\n\n#XFLD\nNO_TASK_TYPE=[[[\\u0143\\u014F \\u0162\\u0105\\u015F\\u0137 \\u0162\\u0177\\u03C1\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD\nMISSING_DAYS=[[[\\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u010E\\u0105\\u0177\\u015F\\:{0}]]]\n\n#XBUT: Button\nHOME=[[[\\u0124\\u014F\\u0271\\u0113]]]\n\n#XTIT: confirmation header\nCONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u010E\\u0113\\u013A\\u0113\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u015C\\u0171\\u0183\\u0271\\u012F\\u015F\\u015F\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u010E\\u0157\\u0105\\u0192\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0192\\u014F\\u0157 \\u010E\\u0113\\u013A\\u0113\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0192\\u014F\\u0157 \\u015C\\u0171\\u0183\\u0271\\u012F\\u015F\\u015F\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=[[[\\u0143\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u0114\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=[[[\\u0143\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u0124\\u014F\\u0171\\u0157\\u015F\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Confirm Button\nCONFIRM=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY=[[[{0} - {1}]]]\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE=[[[{0} - {1}]]]\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR=[[[{0} \\u0124\\u014F\\u0171\\u0157]]]\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F]]]\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR=[[[{0} \\u0125\\u014F\\u0171\\u0157 / {1} \\u0125\\u014F\\u0171\\u0157\\u015F]]]\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F / {1} \\u0124\\u014F\\u0171\\u0157\\u015F]]]\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=[[[\\u0162\\u0105\\u0157\\u011F\\u0113\\u0163\\: {0} \\u0124\\u014F\\u0171\\u0157\\u015F ]]]\n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=[[[{0} \\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F]]]\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=[[[1 \\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=[[[\\u0143\\u014F \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: No Recordings\nNO_RECORDING=[[[\\u0143\\u014F \\u0158\\u0113\\u010B\\u014F\\u0157\\u018C\\u012F\\u014B\\u011F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F \\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u018C]]]\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=[[[\\u015C\\u0105\\u028B\\u0113 \\u0175\\u012F\\u0163\\u0125 \\u0163\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=[[[\\u015C\\u0105\\u028B\\u0113 \\u0175\\u012F\\u0163\\u0125\\u014F\\u0171\\u0163 \\u0163\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=[[[\\u015C\\u0105\\u028B\\u0113 \\u0105\\u015F \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=[[[\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Week \nWEEK=[[[\\u0174\\u0113\\u0113\\u0137]]]\n\n#XFLD:\nMEET_TARGET_HOURS=[[[\\u0100\\u03C1\\u03C1\\u013A\\u0177 \\u0125\\u014F\\u0171\\u0157\\u015F \\u0163\\u014F\\:\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT\nALL_MISSING=[[[\\u0100\\u013A\\u013A \\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u0162\\u012F\\u0271\\u0113 ({0} \\u0125\\u014F\\u0171\\u0157\\u015F)]]]\n\n#XBUT: Delete Button Text\nDELETE=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Copy Button Text\nCOPY=[[[\\u0108\\u014F\\u03C1\\u0177]]]\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=[[[\\u0100\\u018C\\u018C \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for duration\nDURATION=[[[\\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for total duration\nTOTAL_DURATION=[[[\\u0162\\u014F\\u0163\\u0105\\u013A \\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for status\nSTATUS=[[[\\u015C\\u0163\\u0105\\u0163\\u0171\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for start time\nSTART_TIME=[[[\\u015C\\u0163\\u0105\\u0157\\u0163 \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for end Time\nEND_TIME=[[[\\u0114\\u014B\\u018C \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for note\nNOTE=[[[\\u0143\\u014F\\u0163\\u0113]]]\n\n#XBUT: Done button\nDONE=[[[\\u010E\\u014F\\u014B\\u0113]]]\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=[[[\\u039C\\u0105\\u014B\\u0171\\u0105\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=[[[\\u0114\\u018C\\u012F\\u0163 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=[[[\\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 / \\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: select worklist\nSELECT_WORKLIST=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Favorite\nFAVORITE=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Worklist\nWORKLIST=[[[\\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Add Favorite\nADD_FAVORITE=[[[\\u0100\\u018C\\u018C \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=[[[\\u0114\\u018C\\u012F\\u0163 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=[[[\\u013B\\u014F\\u0105\\u018C \\u039C\\u014F\\u0157\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F...\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=[[[\\u0108\\u014F\\u014B\\u0163\\u012F\\u014B\\u0171\\u0113 \\u015C\\u0113\\u0105\\u0157\\u010B\\u0125 \\u014F\\u014B \\u015C\\u0113\\u0157\\u028B\\u0113\\u0157...\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F...\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: BLANK\nEMPTY=[[[\\u0114\\u0271\\u03C1\\u0163\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: None\nNONE=[[[\\u0143\\u014F\\u014B\\u0113]]]\n\n#XFLD\nNO_WORKLIST=[[[\\u0143\\u014F \\u0175\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD\nNO_FAVORITE=[[[\\u0143\\u014F \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Select\nSELECT=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 {0}]]]\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125...\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: short label for hours\nHOURS_LABEL=[[[\\u0125\\u2219\\u2219\\u2219]]]\n\n#XFLD: short label for minutes\nMINUTES_LABEL=[[[\\u0271\\u2219\\u2219\\u2219]]]\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=[[[\\u0125\\u014F\\u0171\\u0157\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=[[[\\u0271\\u012F\\u014B\\u0171\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=[[[\\u039C\\u039C\\u039C \\u010E\\u010E, \\u0176\\u0176\\u0176\\u0176\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT:\nDETAIL=[[[\\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=[[[\\u015C\\u0113\\u0163\\u0163\\u012F\\u014B\\u011F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=[[[\\u0100\\u014B\\u0177 \\u0171\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u018C\\u0105\\u0163\\u0105 \\u0175\\u012F\\u013A\\u013A \\u0183\\u0113 \\u018C\\u012F\\u015F\\u010B\\u0105\\u0157\\u018C\\u0113\\u018C. \\u0100\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u015F\\u0171\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u03C1\\u0157\\u014F\\u010B\\u0113\\u0113\\u018C?\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nUNSAVED_CHANGES=[[[\\u016E\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=[[[\\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u015C\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u014B\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u015F\\u014F\\u0271\\u0113 \\u0192\\u012F\\u0113\\u013A\\u018C\\u015F \\u0163\\u014F \\u015F\\u0163\\u014F\\u0157\\u0113 \\u0105\\u015F \\u0177\\u014F\\u0171\\u0157 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u028B\\u0105\\u013A\\u012F\\u018C \\u015C\\u0163\\u0105\\u0157\\u0163 \\u0105\\u014B\\u018C \\u0114\\u014B\\u018C \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=[[[\\u010E\\u0157\\u0105\\u0192\\u0163 \\u015C\\u0105\\u028B\\u0113\\u018C \\u015C\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F\\u0192\\u0171\\u013A\\u013A\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u016E\\u03C1\\u018C\\u0105\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT:\nHELP=[[[\\u0124\\u0113\\u013A\\u03C1]]]\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=[[[{0}/{1} \\u0125\\u014F\\u0171\\u0157\\u015F \\u0113\\u014B\\u0163\\u0113\\u0157\\u0113\\u018C \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u0175\\u0113\\u0113\\u0137.]]]\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=[[[\\u0162\\u0171\\u0157\\u014B \\u014E\\u0143 \\u01A4\\u0157\\u0113-\\u0191\\u012F\\u013A\\u013A \\u0163\\u014F \\u01A3\\u0171\\u012F\\u010B\\u0137\\u013A\\u0177 \\u03C1\\u014F\\u03C1\\u0171\\u013A\\u0105\\u0163\\u0113 \\u0125\\u014F\\u0171\\u0157\\u015F \\u0192\\u014F\\u0157 \\u0163\\u0125\\u0113 \\u0175\\u0113\\u0113\\u0137 \\u0183\\u0105\\u015F\\u0113\\u018C \\u014F\\u014B \\u0177\\u014F\\u0171\\u0157 \\u013A\\u0105\\u015F\\u0163 \\u015F\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F\\u0192\\u0171\\u013A \\u0113\\u014B\\u0163\\u0157\\u0177.\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=[[[\\u015C\\u014F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u0105\\u0157\\u0113 \\u012F\\u014B\\u010B\\u014F\\u0157\\u0157\\u0113\\u010B\\u0163. \\u0158\\u0113\\u028B\\u012F\\u0113\\u0175 \\u0113\\u0157\\u0157\\u014F\\u0157 \\u018C\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0105\\u014B\\u018C \\u010B\\u014F\\u0157\\u0157\\u0113\\u010B\\u0163 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F.\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=[[[\\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0} \\u0105\\u014B\\u018C {1} \\u0271\\u014F\\u0157\\u0113 \\u018C\\u0105\\u0177(\\u015F)]]]\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=[[[\\u0114\\u018C\\u012F\\u0163 \\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=[[[\\u0162\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0}]]]\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN=[[[{0}\\u0125\\u014F\\u0171\\u0157\\u015F {1}\\u0271\\u012F\\u014B\\u0171\\u0163\\u0113\\u015F]]]\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN=[[[{0}\\u0125 {1}\\u0271]]]\n\n#XBUT: Button to reset\nRESET=[[[\\u0158\\u0113\\u015F\\u0113\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to update\nUPDATE=[[[\\u016E\\u03C1\\u018C\\u0105\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=[[[\\u0100\\u018C\\u018C \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to create\nCREATE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=[[[\\u0114\\u03C7\\u012F\\u015F\\u0163\\u012F\\u014B\\u011F \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=[[[\\u0143\\u0113\\u0175 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: time\nTIME=[[[\\u0162\\u012F\\u0271\\u0113]]]\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=[[[\\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT:\nWARNING=[[[\\u0174\\u0105\\u0157\\u014B\\u012F\\u014B\\u011F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n',
	"hcm/mytimesheet/i18n/i18n_en_US_saptrc.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=EL+T5a2Vbrij85iZGFvMtA_Choose a Personnel Assignment\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=QeCUSBtCPoG4E1OELtxmsg_Personnel Assignments\n\n#XFLD: label for from time\nFROM=j+DLW4+7jIImb4C10bR93g_from\n\n#XFLD: label for to time\nTO=/vTRUk+RQ4FAlD8d1DCb7g_to\n\n#XBUT: Button to cancel\nCANCEL=87kCER4/L4Brz+H6+bNG9Q_Cancel\n\n#XBUT: Button to close popover\nCLOSE=s57Rys/SJv3BBlurEIBh6A_Close\n\n#XBUT: Button to accept\nOK=/UFh/irrHCylGpWsqIPc7Q_OK\n\n#XBUT: Button to affirm\nYES=LpuJVytifnbMNnAfqev9GQ_YES\n\n#XBUT: Button to decline\nNO=laUdvYkE/Aw2zDkFyOcGOQ_NO\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=JYdVyYpNpV2jUaGs9UgUmA_Save Draft\n\n# XTIT: \nTIMESHEET_TITLE=lHKK83T2ZMS2uSW/hCcvAg_My Timesheet\n\n#XTIT:\nINTERNAL_ERROR=YyXrNCNJbgtbkNkOWwn63g_Internal Error\n\n#XTIT:\nERROR=EAcG4da6z0eZtLoO7dfECA_Error\n\n#XFLD:\nINTERNAL_ERROR_BODY=4W+OAm2wgsEoMKrTr0rYKg_There is an Internal error in the application related to the error handling\n\n# XTIT:\nFAV_DIALOG_BOX=gc1ViRZr54/MSzCK8IjYdA_Delete Favorites\n\n# XTIT: \nTIMESHEET=S7EpfvnYy3+r2Hk8+iCmdg_Timesheet Entries\n\n#XBUT: Button for quick entry\nQUICK_FILL=+6aJkPn56Csoj28zhSqiSQ_Quick Entry\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=+NW1+1dEBXd2tUoNmZIkJA_Apply To\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=X1Adj1bA0G2J6ie8VFxaYw_Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=aVUgu3tay3EMJi2hqwoBTw_Create Time Entry\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Yb0BzGhJDUZ45d7/oinmMg_Create Entry for {0} days\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=99GsOG3gku/i4/4sUfxjCQ_Entry Details\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=ybwRG8BXO9fuUUVM0+8X+w_Entry Details for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=/WAepUdUwTUufdu035Q1XA_Create Entry for {0}\n\n# XTIT: Month short header\nMONTH_0=TDLRyrQhwef+7RdkUj0q0g_Jan\n# XTIT: Month short header\nMONTH_1=6cboJMxd8z+g1DqMcM4zkw_Feb\n# XTIT: Month short header\nMONTH_2=5XmekwxYQ23OWUDabMs3rw_Mar\n# XTIT: Month short header\nMONTH_3=F7oEk+nc/cO1a1SqE1mWtg_Apr\n# XTIT: Month short header\nMONTH_4=GNZRi9ZjE9/NSDIfMUU12A_May\n# XTIT: Month short header\nMONTH_5=TJLiMZydCLbFlAFHBNWK1g_Jun\n# XTIT: Month short header\nMONTH_6=T7/WavWoDHMcPp5aqLRedA_Jul\n# XTIT: Month short header\nMONTH_7=u1bNwe+jache3n+YuaYARA_Aug\n# XTIT: Month short header\nMONTH_8=jTNKT83ajgKGxyfdmuKvNA_Sep\n# XTIT: Month short header\nMONTH_9=iDMoZSVkGLPaBdCgTj5K5g_Oct\n# XTIT: Month short header\nMONTH_10=5/4uM/RK/OehXbCTMvYCKA_Nov\n# XTIT: Month short header\nMONTH_11=z2+UhbNRkpFrL1/IjddInQ_Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=A9iWyHc+QoVTNEARn8ZDCA_January\n# XTIT: Month title for calendar\nMONTH_FULL_1=ntP/dEzVU+14JDHJ5DTf1A_February\n# XTIT: Month title for calendar\nMONTH_FULL_2=I/TTAi/A8W92HmoXZ4kDEQ_March\n# XTIT: Month title for calendar\nMONTH_FULL_3=4wRgbu3jpP+zlI+NJsxTnQ_April\n# XTIT: Month title for calendar\nMONTH_FULL_4=WOqnHCrMA5PvyJYvTOMGFA_May\n# XTIT: Month title for calendar\nMONTH_FULL_5=dSM5aWS/jMqxKF+qt3dt8w_June\n# XTIT: Month title for calendar\nMONTH_FULL_6=Q+tVvLFdTNPLb35m2R+8AA_July\n# XTIT: Month title for calendar\nMONTH_FULL_7=YUF5ceVC3W58q+/REM5k1w_August\n# XTIT: Month title for calendar\nMONTH_FULL_8=zBIobLuHKU3CfDHNZZgLMA_September\n# XTIT: Month title for calendar\nMONTH_FULL_9=PCOsHJKxYIHbqoyDINPOAw_October\n# XTIT: Month title for calendar\nMONTH_FULL_10=+VRN+upXOCvqBiy0IGq0DQ_November\n# XTIT: Month title for calendar\nMONTH_FULL_11=zaES3f+kmvYHIqJCGwAG0A_December\n\n# XTIT: Legend missing day\nMISSING_DAY=AonMsJkaqWWFI9OWr0IxMw_Action Required\n# XTIT: Legend filled day\nFILLED_DAY=CzzpjdTfdlmbER7Rtv7Nqg_Done\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=M6ImHVitxGJbHaOJ9ELwmw_Approver Action Needed\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=NIb9ctYoJr8IgMLdk6KpPw_Rejected\n# XFLD: Legend future working day\nWORKING_DAY=SSug9NNlRBfDlSnAUSkS1w_Working day\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Vy1M3L0IC+fq9o395NJVvQ_Non-working day\n# XFLD: Legend selected working day\nSELECTED_DAY=OLoUF1/D9qCUeS1M5M8GFg_Selected day\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=wGuz6MV9RsC1z9KwEKl5/w_Selected Non-working day\n# XFLD: Legend current day\nCURRENT_DAY=xm0KkE4jHB6+tqPVsnpi/w_Current day\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=OXZsA9aKwhOJcHwJwCEskA_Total Missing Hours\\: {0}\n\n#XFLD:\nMONTH_YEAR=WQIsFIFPjmqDLVMXeP11GA_{0} {1} ({2} hours)\n\n#XBUT: Button\nSAVE=Hjm4BleW2adZX8xtE1oFXg_Save\n\n#XBUT: Button \nSUBMIT=ckSDEW9wPsgQjnlUMDX9sg_Submit\n\n# XMSG\nFILL_ALL=oRJKrJ9n5dRZQ3e3Si12hw_Enter {0} hours for\\:\n\n#XFLD\nNO_TASK_TYPE=/NZZjTZ6lFZLDEUbbzgwIw_No Task Type\n\n#XFLD\nMISSING_DAYS=yVhhr9Kp1eYWzkUUdJh1Eg_Missing Days\\:{0}\n\n#XBUT: Button\nHOME=UIBSo/1DAJ1dQb6chHrSbA_Home\n\n#XTIT: confirmation header\nCONFIRMATION=A/oRNaubPzTcQko3+0MQLg_Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=4LeQ784gDIw645hQp0v+0w_Confirm Deletion\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=ZQQ2ZUG8ZH+JBdH9CM0oTw_Confirm Submission\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Kbc2bPZgSCFS2NIBSC+bow_Confirm Draft\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=mQ07GanWFpsP7EM1xqp46Q_Summary of time entries selected for Deletion\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=ryqvaLZNikMb5Lj1Y21qVA_Summary of time entries selected for Submission\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=tAssNTno+v8TAeGz/F15+g_Summary of time entries selected\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=IkjleOoX9B6iOHShTxjw7Q_Number of Entries\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=geFcwQpHEGOAHp4bUICLlA_Number of Hours\n\n#XBUT: Confirm Button\nCONFIRM=y++PNd3uZu3Tl7+hRVjffQ_Confirm\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY=b0mF42QRDNwbCCfThG2qNQ_{0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE=vEzkBHCO56GH1E62KN+/pg_{0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR=oCvnq5VKqONLi+fqXwmDZA_{0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS=WcLzqHof0/jMkuVQHZxSqQ_{0} Hours\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR=ZGbOC+P9roPtf/VUtulq3w_{0} hour / {1} hours\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS=2QXTOuGVgM+ns3SEH3Rz4g_{0} Hours / {1} Hours\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=npojzJ0cNonG+b0+a8NAwA_Target\\: {0} Hours \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=i2bGkoczcKHU9v8pqZInRA_{0} Time Assignments\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=SAD6cAfuoB09367Jrt6+Bw_1 Time Assignment\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=yCthBmqiPRz9PYwy+4F1YA_No Assignments\n\n#XMSG: No Recordings\nNO_RECORDING=VYatqVoOX49HovJus5Tf9w_No Recordings\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=+D2GljbqWhewX31glr0Qqw_{0} Hours Approved\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=BXl2JHYrjrpgRTyVPrsQhQ_Save with time\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=EZcr9tVrS+lAUesBQVghxA_Save without time\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=AZwnzfO4UNgQ/BozrhwBTw_Delete Favorites\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=NaAx/HgcLZmQp7MsoVXAQg_Save as Favorite\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=A/6dbCFT4vdULEjdz2e6Bw_Manage favorites\n\n#XFLD: Week \nWEEK=aHqQ9DhFNWk0lFzDpYX50A_Week\n\n#XFLD:\nMEET_TARGET_HOURS=wMy+8Ow5icxJROenV5HlPA_Apply hours to\\:\n\n#XBUT\nALL_MISSING=MefBKdehOF1gqn3GHGTH2w_All Missing Time ({0} hours)\n\n#XBUT: Delete Button Text\nDELETE=g3Mh262K6p4dCxeLebEozg_Delete\n\n#XBUT: Copy Button Text\nCOPY=conQw2ib5o88KUjHQj9EIg_Copy\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=LLJ0duO1pPXvZ31HZl4BGg_Add Entry\n\n#XFLD: label for duration\nDURATION=keeR8Qen47l4o8Cz6FlggA_Duration\n\n#XFLD: label for total duration\nTOTAL_DURATION=mQeOGg+OkM40ZhahOOk/SA_Total Duration\n\n#XFLD: label for status\nSTATUS=RUgBf+3gBC5qG4swvO2C6A_Status\n\n#XFLD: label for start time\nSTART_TIME=4UPMFtH3iesRTYmSI2rVaw_Start Time\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=iaFUVcVj3uBFQZngvbHLKA_Favorite Name\n\n#XFLD: label for end Time\nEND_TIME=zzmA3zvtKDGFh7hGKhjqHg_End Time\n\n#XFLD: label for note\nNOTE=eI/Axs2ZBcQIMo0TSp2mUg_Note\n\n#XBUT: Done button\nDONE=+QPnVExP/ZCyX84/iYAjog_Done\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=QbOqEN5U9Q4A2mVwOri6sA_Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=ea1KBff1cWKvHpAwbH+v9g_Edit Entry\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=2QRTw2jo0iwE9dVNX6KoCg_Time Assignment\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=JVzDLT3S02ayT8l9okvUSQ_Select Favorite / Worklist\n\n# XTIT: select worklist\nSELECT_WORKLIST=iqtqz64YdTv5571GE2Z7LQ_Select Worklist\n\n# XTIT: Favorite\nFAVORITE=K7sWuvziMlku9VKtKClF/A_Favorites\n\n# XTIT: Worklist\nWORKLIST=Dq8B8QS8/LnckNx1ZT0fPQ_Worklist\n\n# XTIT: Add Favorite\nADD_FAVORITE=p3FIPzmsV0bb/yhlyNJzQA_Add Favorite\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Wy3trhXWgrjPdMwBfAYEeA_Edit Favorites\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=64f79Cd1dxBvAECPxx6OyA_Load More\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=96Z6xvXC1wNVhB/ivYDkVg_Loading...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=7MYP30KxmOFL4PF71bw/7w_Continue Search on Server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=26Ie+N94XSkCQ1tWGaQCvg_Loading...\n\n#XFLD: BLANK\nEMPTY=rLnJSwDYBMrX1+8aHbFu5Q_Empty\n\n#XFLD: None\nNONE=WCpZ5goggiA4JIyYcqd/dg_None\n\n#XFLD\nNO_WORKLIST=qSSqvr/rcN3gY5KfKghC5w_No worklist available\n\n#XFLD\nNO_FAVORITE=lZ3J0gN4aMos3wIDVe61DQ_No favorites available\n\n# XTIT: Select\nSELECT=bg1I8YlS4/0ncF/ZRKbmBQ_Select {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=fRLkPwksRgEOznsUcZqCuw_Select\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=wBLOQ+MYzCAwDTrFefy0rw_Search...\n\n#XFLD: short label for hours\nHOURS_LABEL=s0QdXjMPCd811r/MIfBkaA_h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=I4pPGefQpigNWwZi45dbIA_m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=MlnrFv46Q/KKzT95ud+eiA_hours\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=jR72qvIAo27W/Du/jvJc5w_minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=op/hiIY8ufnvbCCImynBPw_MMM DD, YYYY\n\n#XBUT:\nDETAIL=+hRUylLnkm7/iQQkqOZ+8A_Detail\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=UgwZtphkgFkc0Pdieo/mGg_Settings\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=EGYu/BtRyWp4bG2duLG5aQ_Any unsaved data will be discarded. Are you sure you want to proceed?\n\n# XTIT: \nUNSAVED_CHANGES=fG+N6PK1bJRyJh7FCASG4A_Unsaved Changes\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=sdZDu06GcFMCxIS2y0f02A_Request Submitted\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=F6adSoJq42UFqndV3fkB3w_Please enter a favorite name\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=m/27iY/EkW5dm+CuuXh8nQ_Please enter some fields to store as your favorite\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Uka/RC6V3RMydMfdzVRffw_Please enter a valid Duration\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=uFoqCHJZ4Cpto8OrZFRkGw_Please enter valid Start and End Time\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=vQf9104g1R4H/0ZPp5jQ0g_Draft Saved Successfully\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=sc9ThsRAdG1QP6ADuA01lQ_Favorite Created\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=JTpg2mD/Qde/3Z7218t5lQ_Favorite Updated\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=E5Fe9joePwnSI62SZWwCxQ_Favorite Deleted\n\n#XBUT:\nHELP=k38v8TOT2oWliR5w2qRrXA_Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=Bu2eSUmsKQvRh7ChM9yBQw_{0}/{1} hours entered for this week.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=GgePeDwhZT1Ap0JpVutJgQ_Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=c2evz6DIYDAZMiWMoAxUzQ_Some entries are incorrect. Review error details and correct entries.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=rLgK56ClbqYXWOmCS3y+xQ_Time Entry for {0} and {1} more day(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=J5qELvsS4sVdGcnCHUgdQA_Edit Time Entry\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=qAtrqrDetV5kTtKS/Ab++Q_Time entry for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN=vwQw1IdUHKfXmOYEA5C2Cg_{0}hours {1}minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN=7TELbCAzm3jbqj3o9NYVug_{0}h {1}m\n\n#XBUT: Button to reset\nRESET=pM43lnpf+fKVL2NkyssCpQ_Reset\n\n#XBUT: Button to update\nUPDATE=6KW2grbpSud2SiITndNYYQ_Update\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=fQTBMYJ5fYukHrgQw9nBZw_Add Favorite\n\n#XBUT: Button to create\nCREATE=UEZ4AROCqFn3rjm7ZvfarA_Create\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=iFygYqCOuurdm5/CSV/RKA_Existing Favorite Name\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=0HNHedYkMX0d0TsfmVq26g_New Favorite Name\n\n#XTIT: time\nTIME=/WXTjwfEpkjk9qOHJnF0hw_Time\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=orAHV82RtCOFb4Bxm9wT/g_Request Deleted\n\n#XTIT:\nWARNING=6ykRKCbnDTrGeyEwP3fSpw_Warning\n',
	"hcm/mytimesheet/i18n/i18n_es.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Seleccione un contrato de ocupaci\\u00F3n\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contratos de ocupaci\\u00F3n\n\n#XFLD: label for from time\nFROM=De\\:\n\n#XFLD: label for to time\nTO=A\n\n#XBUT: Button to cancel\nCANCEL=Cancelar\n\n#XBUT: Button to close popover\nCLOSE=Cerrar\n\n#XBUT: Button to accept\nOK=Aceptar\n\n#XBUT: Button to affirm\nYES=S\\u00ED\n\n#XBUT: Button to decline\nNO=No\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Guardar borrador\n\n# XTIT: \nTIMESHEET_TITLE=Registro de tiempos\n\n#XTIT:\nINTERNAL_ERROR=Error interno\n\n#XTIT:\nERROR=Error\n\n#XFLD:\nINTERNAL_ERROR_BODY=Se ha producido un error interno relacionado con el tratamiento de errores en la aplicaci\\u00F3n\n\n# XTIT:\nFAV_DIALOG_BOX=Eliminar Favoritos\n\n# XTIT: \nTIMESHEET=Entradas en registro de tiempos\n\n#XBUT: Button for quick entry\nQUICK_FILL=Entrada r\\u00E1pida\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Aplicar a\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalles\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Crear entrada para fecha\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Crear entrada para {0} d\\u00EDas\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalles de entrada\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalles de entrada para {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Crear entrada para {0}\n\n# XTIT: Month short header\nMONTH_0=Ene\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Abr\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Ago\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dic\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Enero\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febrero\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marzo\n# XTIT: Month title for calendar\nMONTH_FULL_3=Abril\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mayo\n# XTIT: Month title for calendar\nMONTH_FULL_5=Junio\n# XTIT: Month title for calendar\nMONTH_FULL_6=Julio\n# XTIT: Month title for calendar\nMONTH_FULL_7=Agosto\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septiembre\n# XTIT: Month title for calendar\nMONTH_FULL_9=Octubre\n# XTIT: Month title for calendar\nMONTH_FULL_10=Noviembre\n# XTIT: Month title for calendar\nMONTH_FULL_11=Diciembre\n\n# XTIT: Legend missing day\nMISSING_DAY=Acci\\u00F3n necesaria\n# XTIT: Legend filled day\nFILLED_DAY=Finalizar\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Es necesaria la acci\\u00F3n del autorizador\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rechazadas\n# XFLD: Legend future working day\nWORKING_DAY=D\\u00EDa laborable\n# XFLD: Legend non-working day\nNON_WORKING_DAY=D\\u00EDa no laborable\n# XFLD: Legend selected working day\nSELECTED_DAY=D\\u00EDa seleccionado\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=D\\u00EDa festivo seleccionado\n# XFLD: Legend current day\nCURRENT_DAY=D\\u00EDa actual\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total de horas que faltan\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} horas)\n\n#XBUT: Button\nSAVE=Grabar\n\n#XBUT: Button \nSUBMIT=Enviar\n\n# XMSG\nFILL_ALL=Introducir {0} horas para\\:\n\n#XFLD\nNO_TASK_TYPE=No hay tipo de tarea\n\n#XFLD\nMISSING_DAYS=D\\u00EDas que faltan\\: {0}\n\n#XBUT: Button\nHOME=P\\u00E1gina principal\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmaci\\u00F3n\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmar borrado\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmar env\\u00EDo\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmar borrador\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Total de valores para fecha seleccionados para borrado\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Total de valores para fecha seleccionados para gastos\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Resumen de entradas de tiempos seleccionadas\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Cantidad de entradas\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Cantidad de horas\n\n#XBUT: Confirm Button\nCONFIRM=Confirmar\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} horas\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} horas\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hora / {1} horas\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} horas / {1} horas\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Objetivo\\: {0} horas \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} asignaciones de tiempos\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 asignaci\\u00F3n de tiempos\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Sin asignaciones\n\n#XMSG: No Recordings\nNO_RECORDING=Sin registros\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} horas autorizadas\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Grabar con tiempo\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Grabar sin tiempo\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Eliminar Favoritos\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Guardar como favorito\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gestionar favoritos\n\n#XFLD: Week \nWEEK=Semana\n\n#XFLD:\nMEET_TARGET_HOURS=Imputar horas a\\:\n\n#XBUT\nALL_MISSING=Tiempo que falta en total ({0} horas)\n\n#XBUT: Delete Button Text\nDELETE=Eliminar\n\n#XBUT: Copy Button Text\nCOPY=Copiar\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=A\\u00F1adir entrada\n\n#XFLD: label for duration\nDURATION=Duraci\\u00F3n\n\n#XFLD: label for total duration\nTOTAL_DURATION=Duraci\\u00F3n total\n\n#XFLD: label for status\nSTATUS=Estado\n\n#XFLD: label for start time\nSTART_TIME=Hora de inicio\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nombre de favorito\n\n#XFLD: label for end Time\nEND_TIME=Hora de fin\n\n#XFLD: label for note\nNOTE=Nota\n\n#XBUT: Done button\nDONE=Finalizar\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Editar entrada\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Asignaci\\u00F3n de tiempo\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Seleccionar favorito o lista de trabajo\n\n# XTIT: select worklist\nSELECT_WORKLIST=Seleccionar lista de trabajo\n\n# XTIT: Favorite\nFAVORITE=Favoritos\n\n# XTIT: Worklist\nWORKLIST=Lista de trabajo\n\n# XTIT: Add Favorite\nADD_FAVORITE=A\\u00F1adir favorito\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Tratar favoritos\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Cargar m\\u00E1s...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Cargando...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuar la b\\u00FAsqueda en el servidor...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Cargando...\n\n#XFLD: BLANK\nEMPTY=Vac\\u00EDo\n\n#XFLD: None\nNONE=Ninguno\n\n#XFLD\nNO_WORKLIST=Ninguna lista de trabajo disponible\n\n#XFLD\nNO_FAVORITE=No hay favoritos disponibles\n\n# XTIT: Select\nSELECT=Seleccionar {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Seleccionar\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Buscar...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Horas\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutos\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=Detalles\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Opciones\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Todos los datos no grabados se descartar\\u00E1n. \\u00BFDesea continuar?\n\n# XTIT: \nUNSAVED_CHANGES=Modificaciones no guardadas\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Solicitud enviada\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Introduzca un nombre de favorito en el campo de entrada Asignaci\\u00F3nn de tiempo\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Complete los campos para almacenar como favoritos\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Introduzca una duraci\\u00F3n v\\u00E1lida\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Introduzca una fecha de inicio y una fecha de fin v\\u00E1lidas\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Borrador guardado correctamente\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorito enviado\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorito actualizado\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorito eliminado\n\n#XBUT:\nHELP=Ayuda\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} horas introducidas para esta semana\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Pulse Prerrellenar para completar r\\u00E1pidamente horas de la semana basada en su \\u00FAltima entrada correcta.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Algunas entradas son incorrectas. Revise los detalles del error y corrija las entradas.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Entrada de tiempo para {0} y {1} d\\u00EDa(s) de m\\u00E1s\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editar entrada de tiempo\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Entrada de tiempo para {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} horas {1} minutos\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Reinicializar\n\n#XBUT: Button to update\nUPDATE=Actualizar\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=A\\u00F1adir favorito\n\n#XBUT: Button to create\nCREATE=Crear\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nombre actual de favorito\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nuevo nombre de favorito\n\n#XTIT: time\nTIME=Tiempo\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Solicitud eliminada\n\n#XTIT:\nWARNING=Advertencia\n',
	"hcm/mytimesheet/i18n/i18n_fr.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=S\\u00E9lectionner un contrat de travail\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contrats de travail\n\n#XFLD: label for from time\nFROM=De\n\n#XFLD: label for to time\nTO=\\u00C0\n\n#XBUT: Button to cancel\nCANCEL=Annuler\n\n#XBUT: Button to close popover\nCLOSE=Fermer\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Oui\n\n#XBUT: Button to decline\nNO=Non\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Sauvegarder version pr\\u00E9liminaire\n\n# XTIT: \nTIMESHEET_TITLE=Ma feuille de saisie des temps\n\n#XTIT:\nINTERNAL_ERROR=Erreur interne\n\n#XTIT:\nERROR=Erreur\n\n#XFLD:\nINTERNAL_ERROR_BODY=Une erreur interne li\\u00E9e \\u00E0 la correction des erreurs s\'est produite dans l\'application.\n\n# XTIT:\nFAV_DIALOG_BOX=Supprimer favoris\n\n# XTIT: \nTIMESHEET=Entr\\u00E9es sur la feuille de saisie des temps\n\n#XBUT: Button for quick entry\nQUICK_FILL=Saisie rapide\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Appliquer \\u00E0\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=D\\u00E9tails\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Cr\\u00E9er saisie des temps\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Cr\\u00E9er entr\\u00E9e pour {0} jours\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=D\\u00E9tails de l\'entr\\u00E9e\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=D\\u00E9tails d\'\'entr\\u00E9e pour {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Cr\\u00E9er entr\\u00E9e pour {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=F\\u00E9v\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Avr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jin\n# XTIT: Month short header\nMONTH_6=Juil\n# XTIT: Month short header\nMONTH_7=Ao\\u00FB\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=D\\u00E9c\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janvier\n# XTIT: Month title for calendar\nMONTH_FULL_1=F\\u00E9vrier\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mars\n# XTIT: Month title for calendar\nMONTH_FULL_3=Avril\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Juin\n# XTIT: Month title for calendar\nMONTH_FULL_6=Juillet\n# XTIT: Month title for calendar\nMONTH_FULL_7=Ao\\u00FBt\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septembre\n# XTIT: Month title for calendar\nMONTH_FULL_9=Octobre\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembre\n# XTIT: Month title for calendar\nMONTH_FULL_11=D\\u00E9cembre\n\n# XTIT: Legend missing day\nMISSING_DAY=Action requise\n# XTIT: Legend filled day\nFILLED_DAY=Termin\\u00E9\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Action de l\'approbateur requise\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejet\\u00E9\n# XFLD: Legend future working day\nWORKING_DAY=Jour ouvr\\u00E9\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Jour ch\\u00F4m\\u00E9\n# XFLD: Legend selected working day\nSELECTED_DAY=Jour s\\u00E9lectionn\\u00E9\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Jour s\\u00E9lectionn\\u00E9 non ouvr\\u00E9\n# XFLD: Legend current day\nCURRENT_DAY=Jour actuel\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Heures manquantes au total\\u00A0\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} heures)\n\n#XBUT: Button\nSAVE=Sauvegarder\n\n#XBUT: Button \nSUBMIT=Envoyer\n\n# XMSG\nFILL_ALL=Saisir {0} heures pour\\u00A0\\:\n\n#XFLD\nNO_TASK_TYPE=Aucun type de t\\u00E2che\n\n#XFLD\nMISSING_DAYS=Jours manquants\\u00A0\\: {0}\n\n#XBUT: Button\nHOME=Page d\'accueil\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmer la suppression\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmer l\'envoi\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmer version pr\\u00E9liminaire\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Synth\\u00E8se des saisies des temps marqu\\u00E9es pour suppression\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Synth\\u00E8se des saisies des temps marqu\\u00E9es pour envoi\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=R\\u00E9sum\\u00E9 des saisies des temps s\\u00E9lectionn\\u00E9es\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Nombre d\'entr\\u00E9es\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Nombre d\'heures\n\n#XBUT: Confirm Button\nCONFIRM=Confirmer\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0}\\u00A0heure\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} heures\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0}\\u00A0heure\\u00A0/\\u00A0{1}\\u00A0heures\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} heures\\u00A0/\\u00A0{1} heures\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Objectif\\u00A0\\: {0} heures \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} affectations des temps\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 affectation des temps\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Aucune affectation\n\n#XMSG: No Recordings\nNO_RECORDING=Aucun enregistrement\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} heures approuv\\u00E9es\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Sauvegarder avec les temps\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Sauvegarder sans les temps\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Supprimer favoris\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ajouter aux favoris\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Organiser favoris\n\n#XFLD: Week \nWEEK=Semaine\n\n#XFLD:\nMEET_TARGET_HOURS=Appliquer les heures \\u00E0 \\:\n\n#XBUT\nALL_MISSING=Temps manquant au total ({0} heure/s)\n\n#XBUT: Delete Button Text\nDELETE=Supprimer\n\n#XBUT: Copy Button Text\nCOPY=Copier\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Ajouter entr\\u00E9e\n\n#XFLD: label for duration\nDURATION=Dur\\u00E9e\n\n#XFLD: label for total duration\nTOTAL_DURATION=Dur\\u00E9e totale\n\n#XFLD: label for status\nSTATUS=Statut\n\n#XFLD: label for start time\nSTART_TIME=Heure de d\\u00E9but\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nom du favori\n\n#XFLD: label for end Time\nEND_TIME=Heure de fin\n\n#XFLD: label for note\nNOTE=Note\n\n#XBUT: Done button\nDONE=Termin\\u00E9\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuellement\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Traiter entr\\u00E9e\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Affectation temps\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=S\\u00E9lection de favori ou r\\u00E9serve de travail\n\n# XTIT: select worklist\nSELECT_WORKLIST=S\\u00E9lection de r\\u00E9serve de travail\n\n# XTIT: Favorite\nFAVORITE=Favoris\n\n# XTIT: Worklist\nWORKLIST=R\\u00E9serve de travail\n\n# XTIT: Add Favorite\nADD_FAVORITE=Ajouter favori\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Modifier favoris\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Charger plus...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Chargement...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuer la recherche sur le serveur...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Chargement...\n\n#XFLD: BLANK\nEMPTY=Vide\n\n#XFLD: None\nNONE=N\\u00E9ant\n\n#XFLD\nNO_WORKLIST=Aucune r\\u00E9serve de travail disponible\n\n#XFLD\nNO_FAVORITE=Aucun favori disponible\n\n# XTIT: Select\nSELECT=S\\u00E9lectionner {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=S\\u00E9lectionner\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Rechercher...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Heures\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=D\\u00E9tails\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Options\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Toutes les donn\\u00E9es non sauvegard\\u00E9es seront perdues. Voulez-vous continuer ?\n\n# XTIT: \nUNSAVED_CHANGES=Modifications non sauvegard\\u00E9es\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Demande correctement envoy\\u00E9e\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Saisissez un nom de favori dans la zone de saisie Affectation des temps\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Effectuez des entr\\u00E9es \\u00E0 archiver comme favoris\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Saisissez une dur\\u00E9e valide\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Saisissez une heure de d\\u00E9but et de fin valide\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Version pr\\u00E9liminaire correctement sauvegard\\u00E9e\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favori cr\\u00E9\\u00E9\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favori mis \\u00E0 jour\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favori supprim\\u00E9\n\n#XBUT:\nHELP=Aide\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} heures saisies pour cette semaine\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Activez l\'option Pr\\u00E9-remplissage pour renseigner rapidement les heures de la semaine, bas\\u00E9es sur votre derni\\u00E8re entr\\u00E9e r\\u00E9ussie.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Certaines entr\\u00E9es sont incorrectes. Examinez les d\\u00E9tails d\'erreur et corrigez les entr\\u00E9es.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Saisie des temps pour {0} et {1} jour(s) de plus\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Modifier saisie des temps\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Cr\\u00E9er saisie des temps pour {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} heures {1} minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=R\\u00E9initialiser\n\n#XBUT: Button to update\nUPDATE=Mettre \\u00E0 jour\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Ajouter favori\n\n#XBUT: Button to create\nCREATE=Cr\\u00E9er\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nom de favori actuel\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nouveau nom de favori\n\n#XTIT: time\nTIME=Heure\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Demande supprim\\u00E9e\n\n#XTIT:\nWARNING=Avertissement\n',
	"hcm/mytimesheet/i18n/i18n_hr.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Izaberite ugovor o radu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Ugovori o radu\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Otka\\u017Ei\n\n#XBUT: Button to close popover\nCLOSE=Zatvori\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Snimi nacrt\n\n# XTIT: \nTIMESHEET_TITLE=Moje bilje\\u017Eenje vremena\n\n#XTIT:\nINTERNAL_ERROR=Interna gre\\u0161ka\n\n#XTIT:\nERROR=Gre\\u0161ka\n\n#XFLD:\nINTERNAL_ERROR_BODY=Pojavila se interna gre\\u0161ka povezana s obradom gre\\u0161aka u aplikaciji.\n\n# XTIT:\nFAV_DIALOG_BOX=Izbri\\u0161i favorite\n\n# XTIT: \nTIMESHEET=Unosi liste za bilje\\u017Eenje radnog vremena\n\n#XBUT: Button for quick entry\nQUICK_FILL=Brzi unos\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Primijeni na\\:\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalji\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Kreiraj vremenski unos\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Kreiraj unos za {0} dana\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalji unosa\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalji unosa za {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Kreiraj unos za {0}\n\n# XTIT: Month short header\nMONTH_0=Sij\n# XTIT: Month short header\nMONTH_1=Vlj\n# XTIT: Month short header\nMONTH_2=O\\u017Eu\n# XTIT: Month short header\nMONTH_3=Tra\n# XTIT: Month short header\nMONTH_4=Svi\n# XTIT: Month short header\nMONTH_5=Lip\n# XTIT: Month short header\nMONTH_6=Srp\n# XTIT: Month short header\nMONTH_7=Kolovoz\n# XTIT: Month short header\nMONTH_8=Rujan\n# XTIT: Month short header\nMONTH_9=Listopad\n# XTIT: Month short header\nMONTH_10=Studeni\n# XTIT: Month short header\nMONTH_11=Prosinac\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Sije\\u010Danj\n# XTIT: Month title for calendar\nMONTH_FULL_1=Velja\\u010Da\n# XTIT: Month title for calendar\nMONTH_FULL_2=O\\u017Eujak\n# XTIT: Month title for calendar\nMONTH_FULL_3=Travanj\n# XTIT: Month title for calendar\nMONTH_FULL_4=Svibanj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Lipanj\n# XTIT: Month title for calendar\nMONTH_FULL_6=Srpanj\n# XTIT: Month title for calendar\nMONTH_FULL_7=Kolovoz\n# XTIT: Month title for calendar\nMONTH_FULL_8=Rujan\n# XTIT: Month title for calendar\nMONTH_FULL_9=Listopad\n# XTIT: Month title for calendar\nMONTH_FULL_10=Studeni\n# XTIT: Month title for calendar\nMONTH_FULL_11=Prosinac\n\n# XTIT: Legend missing day\nMISSING_DAY=Radnja obavezna\n# XTIT: Legend filled day\nFILLED_DAY=Izvr\\u0161eno\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Radnja odobravatelja potrebna\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Odbijeno\n# XFLD: Legend future working day\nWORKING_DAY=Radni dan\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Neradni dan\n# XFLD: Legend selected working day\nSELECTED_DAY=Odabrani dan\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Odabrani neradni dan\n# XFLD: Legend current day\nCURRENT_DAY=Teku\\u0107i dan\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Ukupno nedostaje sati\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} sati)\n\n#XBUT: Button\nSAVE=Snimi\n\n#XBUT: Button \nSUBMIT=Podnesi\n\n# XMSG\nFILL_ALL=Unesi sate {0} za\\:\n\n#XFLD\nNO_TASK_TYPE=Nema tipa zadatka\n\n#XFLD\nMISSING_DAYS=Dani koji nedostaju\\: {0}\n\n#XBUT: Button\nHOME=Po\\u010Detna stranica\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrda\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdi brisanje\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdi podno\\u0161enje\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdi nacrt\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Sa\\u017Eetak vremenskih unosa odabranih za brisanje\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Sa\\u017Eetak vremenskih unosa odabranih za podno\\u0161enje\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Sa\\u017Eetak odabranih vremenskih unosa\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Broj unosa\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Broj sati\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdi\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} sat\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} sati\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} sat/ {1} sati\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} sati / {1} sati\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cilj\\: {0} sati \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} dodjele vremena\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 dodjela vremena\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nema dodjela\n\n#XMSG: No Recordings\nNO_RECORDING=Nema slogova\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} sati odobreno\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Snimi s vremenom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Snimi bez vremena\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Izbri\\u0161i favorite\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Snimi kao favorit\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Upravljaj favoritima\n\n#XFLD: Week \nWEEK=Tjedan\n\n#XFLD:\nMEET_TARGET_HOURS=Primijeni sate na\\:\n\n#XBUT\nALL_MISSING=Ukupno vrijeme koje nedostaje ({0} sati)\n\n#XBUT: Delete Button Text\nDELETE=Izbri\\u0161i\n\n#XBUT: Copy Button Text\nCOPY=Kopiraj\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodaj unos\n\n#XFLD: label for duration\nDURATION=Trajanje\n\n#XFLD: label for total duration\nTOTAL_DURATION=Ukupno trajanje\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Po\\u010Detno vrijeme\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Naziv favorita\n\n#XFLD: label for end Time\nEND_TIME=Zavr\\u0161no vrijeme\n\n#XFLD: label for note\nNOTE=Bilje\\u0161ka\n\n#XBUT: Done button\nDONE=Izvr\\u0161eno\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Ru\\u010Dno\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Uredi unos\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Dodjela vremena\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Snimi favorit ili radnu listu\n\n# XTIT: select worklist\nSELECT_WORKLIST=Odaberi radnu listu\n\n# XTIT: Favorite\nFAVORITE=Favoriti\n\n# XTIT: Worklist\nWORKLIST=Radna lista\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodaj favorit\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Uredi favorite\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=U\\u010Ditaj vi\\u0161e...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=U\\u010Ditavanje...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Nastavi tra\\u017Eenje na poslu\\u017Eitelju...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=U\\u010Ditavanje...\n\n#XFLD: BLANK\nEMPTY=Prazno\n\n#XFLD: None\nNONE=Ni\\u0161ta\n\n#XFLD\nNO_WORKLIST=Radna lista nije raspolo\\u017Eiva\n\n#XFLD\nNO_FAVORITE=Favoriti nisu raspolo\\u017Eivi\n\n# XTIT: Select\nSELECT=Odaberi {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Odaberi\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Tra\\u017Eenje...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Sati\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minute\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD. MMM, YYYY\n\n#XBUT:\nDETAIL=Detalji\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Postave\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Nesnimljeni podaci \\u0107e se odbaciti. \\u017Delite li zaista nastaviti?\n\n# XTIT: \nUNSAVED_CHANGES=Nesnimljene promjene\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Zahtjev podnesen.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Molimo, unesite naziv favorita u polje unosa dodjele vremena.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Kreiraj unose za pohranu kao favorit.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Molimo, unesite va\\u017Ee\\u0107e trajanje.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Unesite va\\u017Ee\\u0107e po\\u010Detno i zavr\\u0161no vrijeme.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Nacrt uspje\\u0161no snimljen.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorit kreiran.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorit a\\u017Euriran.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorit izbrisan.\n\n#XBUT:\nHELP=Pomo\\u0107\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} sati uneseno je za ovaj tjedan\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Uklju\\u010Dite predpopunjavanje za brzo popunjavanje sati za tjedan na osnovi zadnjeg uspje\\u0161nog unosa.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Neki unosi neto\\u010Dni; molimo, pregledajte detalje gre\\u0161ke i ispravite unose.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Unos vremena za {0} i {1} vi\\u0161e dana\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Uredi vremenski unos\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Unos vremena za {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} sati {1} minuta\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Ponovno postavi\n\n#XBUT: Button to update\nUPDATE=A\\u017Euriraj\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodaj favorit\n\n#XBUT: Button to create\nCREATE=Kreiraj\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Trenutni naziv favorita\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Novi naziv favorita\n\n#XTIT: time\nTIME=Vrijeme\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Zahtjev izbrisan\n\n#XTIT:\nWARNING=Upozorenje\n',
	"hcm/mytimesheet/i18n/i18n_hu.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Foglalkoztat\\u00E1si szerz\\u0151d\\u00E9s v\\u00E1laszt\\u00E1sa\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Foglalkoztat\\u00E1si szerz\\u0151d\\u00E9sek\n\n#XFLD: label for from time\nFROM=Kezdete\\:\n\n#XFLD: label for to time\nTO=V\\u00E9ge\\:\n\n#XBUT: Button to cancel\nCANCEL=M\\u00E9gse\n\n#XBUT: Button to close popover\nCLOSE=Bez\\u00E1r\\u00E1s\n\n#XBUT: Button to accept\nOK=Rendben\n\n#XBUT: Button to affirm\nYES=Igen\n\n#XBUT: Button to decline\nNO=Nem\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Tervezet ment\\u00E9se\n\n# XTIT: \nTIMESHEET_TITLE=Saj\\u00E1t id\\u0151adatlap\n\n#XTIT:\nINTERNAL_ERROR=Bels\\u0151 hiba\n\n#XTIT:\nERROR=Hiba\n\n#XFLD:\nINTERNAL_ERROR_BODY=Hibakezel\\u00E9ssel \\u00F6sszef\\u00FCgg\\u0151 bels\\u0151 hiba t\\u00F6rt\\u00E9nt az alkalmaz\\u00E1sban.\n\n# XTIT:\nFAV_DIALOG_BOX=Kedvencek t\\u00F6rl\\u00E9se\n\n# XTIT: \nTIMESHEET=Id\\u0151adatlap-bejegyz\\u00E9sek\n\n#XBUT: Button for quick entry\nQUICK_FILL=Gyors bejegyz\\u00E9s\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Alkalmaz\\u00E1s\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=R\\u00E9szletek\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Id\\u0151bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa {0} naphoz\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Bejegyz\\u00E9s r\\u00E9szletei\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Bejegyz\\u00E9s r\\u00E9szletei - {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa - {0}\n\n# XTIT: Month short header\nMONTH_0=Jan.\n# XTIT: Month short header\nMONTH_1=Febr.\n# XTIT: Month short header\nMONTH_2=M\\u00E1rc.\n# XTIT: Month short header\nMONTH_3=\\u00C1pr.\n# XTIT: Month short header\nMONTH_4=M\\u00E1j.\n# XTIT: Month short header\nMONTH_5=J\\u00FAn.\n# XTIT: Month short header\nMONTH_6=J\\u00FAl.\n# XTIT: Month short header\nMONTH_7=Aug.\n# XTIT: Month short header\nMONTH_8=Szept.\n# XTIT: Month short header\nMONTH_9=Okt.\n# XTIT: Month short header\nMONTH_10=Nov.\n# XTIT: Month short header\nMONTH_11=Dec.\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janu\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febru\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_2=M\\u00E1rcius\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u00C1prilis\n# XTIT: Month title for calendar\nMONTH_FULL_4=M\\u00E1jus\n# XTIT: Month title for calendar\nMONTH_FULL_5=J\\u00FAnius\n# XTIT: Month title for calendar\nMONTH_FULL_6=J\\u00FAlius\n# XTIT: Month title for calendar\nMONTH_FULL_7=Augusztus\n# XTIT: Month title for calendar\nMONTH_FULL_8=Szeptember\n# XTIT: Month title for calendar\nMONTH_FULL_9=Okt\\u00F3ber\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=M\\u0171velet sz\\u00FCks\\u00E9ges\n# XTIT: Legend filled day\nFILLED_DAY=K\\u00E9sz\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Enged\\u00E9lyez\\u0151i m\\u0171velet kell\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Elutas\\u00EDtva\n# XFLD: Legend future working day\nWORKING_DAY=Munkanap\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Nem munkanap\n# XFLD: Legend selected working day\nSELECTED_DAY=Kiv\\u00E1lasztott nap\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Kiv\\u00E1lasztott szabadnap\n# XFLD: Legend current day\nCURRENT_DAY=Aktu\\u00E1lis nap\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u00D6sszes hi\\u00E1nyz\\u00F3 \\u00F3ra\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u00F3ra)\n\n#XBUT: Button\nSAVE=Ment\\u00E9s\n\n#XBUT: Button \nSUBMIT=Elk\\u00FCld\\u00E9s\n\n# XMSG\nFILL_ALL={0} \\u00F3ra megad\\u00E1sa a k\\u00F6vetkez\\u0151h\\u00F6z\\:\n\n#XFLD\nNO_TASK_TYPE=Nincs feladatt\\u00EDpus\n\n#XFLD\nMISSING_DAYS=Hi\\u00E1nyz\\u00F3 napok\\:  {0}\n\n#XBUT: Button\nHOME=Kezd\\u0151lap\n\n#XTIT: confirmation header\nCONFIRMATION=Visszaigazol\\u00E1s\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=T\\u00F6rl\\u00E9s meger\\u0151s\\u00EDt\\u00E9se\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=K\\u00FCld\\u00E9s meger\\u0151s\\u00EDt\\u00E9se\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Tervezet meger\\u0151s\\u00EDt\\u00E9se\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=T\\u00F6rl\\u00E9sre kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=K\\u00FCld\\u00E9sre kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=A kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Bejegyz\\u00E9sek sz\\u00E1ma\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u00D3r\\u00E1k sz\\u00E1ma\n\n#XBUT: Confirm Button\nCONFIRM=Visszaigazol\\u00E1s\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u00F3ra\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u00F3ra\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u00F3ra / {1} \\u00F3ra\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u00F3ra / {1} \\u00F3ra\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=C\\u00E9l\\: {0} \\u00F3ra \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} id\\u0151-hozz\\u00E1rendel\\u00E9s\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 id\\u0151-hozz\\u00E1rendel\\u00E9s\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nincs hozz\\u00E1rendel\\u00E9s\n\n#XMSG: No Recordings\nNO_RECORDING=Nincs rekord\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u00F3ra enged\\u00E9lyezve\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Ment\\u00E9s id\\u0151vel\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ment\\u00E9s id\\u0151 n\\u00E9lk\\u00FCl\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Kedvencek t\\u00F6rl\\u00E9se\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ment\\u00E9s a kedvencek k\\u00F6z\\u00E9\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Kedvencek kezel\\u00E9se\n\n#XFLD: Week \nWEEK=H\\u00E9t\n\n#XFLD:\nMEET_TARGET_HOURS=\\u00D3r\\u00E1k alkalmaz\\u00E1sa\\:\n\n#XBUT\nALL_MISSING=\\u00D6sszes hi\\u00E1nyz\\u00F3 id\\u0151 ({0} \\u00F3ra)\n\n#XBUT: Delete Button Text\nDELETE=T\\u00F6rl\\u00E9s\n\n#XBUT: Copy Button Text\nCOPY=M\\u00E1sol\\u00E1s\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Bejegyz\\u00E9s hozz\\u00E1ad\\u00E1sa\n\n#XFLD: label for duration\nDURATION=Id\\u0151tartam\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u00D6sszid\\u0151tartam\n\n#XFLD: label for status\nSTATUS=St\\u00E1tus\n\n#XFLD: label for start time\nSTART_TIME=Kezd\\u00E9s id\\u0151pontja\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Kedvenc neve\n\n#XFLD: label for end Time\nEND_TIME=Befejez\\u00E9s id\\u0151pontja\n\n#XFLD: label for note\nNOTE=Megjegyz\\u00E9s\n\n#XBUT: Done button\nDONE=K\\u00E9sz\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manu\\u00E1lis\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Bejegyz\\u00E9s feldolgoz\\u00E1sa\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Id\\u0151-hozz\\u00E1rendel\\u00E9s\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=V\\u00E1lassza ki a kedvenceket vagy a munka\\u00E1llom\\u00E1nyt\n\n# XTIT: select worklist\nSELECT_WORKLIST=Munka\\u00E1llom\\u00E1ny kiv\\u00E1laszt\\u00E1sa\n\n# XTIT: Favorite\nFAVORITE=Kedvencek\n\n# XTIT: Worklist\nWORKLIST=Munka\\u00E1llom\\u00E1ny\n\n# XTIT: Add Favorite\nADD_FAVORITE=Kedvenc hozz\\u00E1ad\\u00E1sa\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Kedvencek szerkeszt\\u00E9se\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=T\\u00F6bb bet\\u00F6lt\\u00E9se...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Bet\\u00F6lt\\u00E9s...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Keres\\u00E9s folytat\\u00E1sa a szerveren...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Bet\\u00F6lt\\u00E9s...\n\n#XFLD: BLANK\nEMPTY=\\u00DCres\n\n#XFLD: None\nNONE=Nincs\n\n#XFLD\nNO_WORKLIST=Nem \\u00E1ll rendelkez\\u00E9sre munka\\u00E1llom\\u00E1ny\n\n#XFLD\nNO_FAVORITE=Nem \\u00E1llnak rendelkez\\u00E9sre kedvencek\n\n# XTIT: Select\nSELECT={0} kiv\\u00E1laszt\\u00E1sa\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Kiv\\u00E1laszt\\u00E1s\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Keres\\u00E9s...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u00F3\n\n#XFLD: short label for minutes\nMINUTES_LABEL=p\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u00F3ra\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Percek\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=YYYY. MMM DD.\n\n#XBUT:\nDETAIL=R\\u00E9szletek\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Be\\u00E1ll\\u00EDt\\u00E1sok\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=A nem mentett adatok el lesznek vetve. Biztosan folytatja?\n\n# XTIT: \nUNSAVED_CHANGES=Nem mentett m\\u00F3dos\\u00EDt\\u00E1sok\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=K\\u00E9relem elk\\u00FCldve.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=K\\u00E9rem, adjon meg egy kedvenc nevet az id\\u0151-hozz\\u00E1rendel\\u00E9s beviteli mez\\u0151j\\u00E9ben.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=K\\u00E9rem, t\\u00F6ltse ki a mez\\u0151ket, hogy a kedvencek k\\u00F6z\\u00E9 tudja menteni.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=K\\u00E9rem, adjon meg \\u00E9rv\\u00E9nyes id\\u0151tartamot.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=K\\u00E9rem, \\u00E9rv\\u00E9nyes kezd\\u0151 \\u00E9s z\\u00E1r\\u00F3 d\\u00E1tumot adjon meg.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=A tervezet sikeresen elmentve.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Kedvenc l\\u00E9trehozva.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Kedvencek friss\\u00EDtve.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=T\\u00F6r\\u00F6lve a kedvencekb\\u0151l.\n\n#XBUT:\nHELP=Seg\\u00EDts\\u00E9g\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u00F3ra lett be\\u00EDrva erre a h\\u00E9tre.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Kapcsolja be az el\\u0151zetes kit\\u00F6lt\\u00E9st, ha gyorsan fel szeretn\\u00E9 t\\u00F6lteni a h\\u00E9t \\u00F3r\\u00E1it az utols\\u00F3 sikeres bejegyz\\u00E9s alapj\\u00E1n.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=N\\u00E9h\\u00E1ny bejegyz\\u00E9s helytelen. Vizsg\\u00E1lja meg a hib\\u00E1t, \\u00E9s jav\\u00EDtsa a bejegyz\\u00E9seket.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Id\\u0151bejegyz\\u00E9s a k\\u00F6vetkez\\u0151h\\u00F6z\\: {0} \\u00E9s {1} tov\\u00E1bbi nap\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Id\\u0151bejegyz\\u00E9s feldolgoz\\u00E1sa\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Id\\u0151bejegyz\\u00E9s - {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u00F3ra {1} perc\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u00F3 {1} p\n\n#XBUT: Button to reset\nRESET=Vissza\\u00E1ll\\u00EDt\\u00E1s\n\n#XBUT: Button to update\nUPDATE=Friss\\u00EDt\\u00E9s\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Kedvenc hozz\\u00E1ad\\u00E1sa\n\n#XBUT: Button to create\nCREATE=L\\u00E9trehoz\\u00E1s\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktu\\u00E1lis kedvencn\\u00E9v\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u00DAj kedvencn\\u00E9v\n\n#XTIT: time\nTIME=Id\\u0151pont\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=K\\u00E9relem t\\u00F6r\\u00F6lve\n\n#XTIT:\nWARNING=Figyelmeztet\\u00E9s\n',
	"hcm/mytimesheet/i18n/i18n_it.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Seleziona un contratto d\'impiego\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contratti d\'impiego\n\n#XFLD: label for from time\nFROM=Da\n\n#XFLD: label for to time\nTO=A\n\n#XBUT: Button to cancel\nCANCEL=Annulla\n\n#XBUT: Button to close popover\nCLOSE=Chiudi\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=S\\u00EC\n\n#XBUT: Button to decline\nNO=No\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Salva bozza\n\n# XTIT: \nTIMESHEET_TITLE=Il mio timesheet\n\n#XTIT:\nINTERNAL_ERROR=Errore interno\n\n#XTIT:\nERROR=Errore\n\n#XFLD:\nINTERNAL_ERROR_BODY=Nell\'applicazione si \\u00E8 verificato un errore interno legato al trattamento degli errori.\n\n# XTIT:\nFAV_DIALOG_BOX=Elimina preferiti\n\n# XTIT: \nTIMESHEET=Inserimenti timesheet\n\n#XBUT: Button for quick entry\nQUICK_FILL=Acquisizione rapida\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Applica a\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Dettagli\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Crea inserimento orari\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Crea inserimento per {0} giorni\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Dettagli inserimento\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Dettagli inserimento per {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Crea inserimento per {0}\n\n# XTIT: Month short header\nMONTH_0=Gen\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mag\n# XTIT: Month short header\nMONTH_5=Giu\n# XTIT: Month short header\nMONTH_6=Lug\n# XTIT: Month short header\nMONTH_7=Ago\n# XTIT: Month short header\nMONTH_8=Set\n# XTIT: Month short header\nMONTH_9=Ott\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dic\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Gennaio\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febbraio\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marzo\n# XTIT: Month title for calendar\nMONTH_FULL_3=Aprile\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maggio\n# XTIT: Month title for calendar\nMONTH_FULL_5=Giugno\n# XTIT: Month title for calendar\nMONTH_FULL_6=Luglio\n# XTIT: Month title for calendar\nMONTH_FULL_7=Agosto\n# XTIT: Month title for calendar\nMONTH_FULL_8=Settembre\n# XTIT: Month title for calendar\nMONTH_FULL_9=Ottobre\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembre\n# XTIT: Month title for calendar\nMONTH_FULL_11=Dicembre\n\n# XTIT: Legend missing day\nMISSING_DAY=Azione necessaria\n# XTIT: Legend filled day\nFILLED_DAY=Fatto\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Approvazione in sospeso\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rifiutato\n# XFLD: Legend future working day\nWORKING_DAY=Giorno lavorativo\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Giorno non lavorativo\n# XFLD: Legend selected working day\nSELECTED_DAY=Giorno selezionato\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Giorno non lavorativo selezionato\n# XFLD: Legend current day\nCURRENT_DAY=Giorno corrente\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Totale ore mancanti\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} ore)\n\n#XBUT: Button\nSAVE=Salva\n\n#XBUT: Button \nSUBMIT=Invia\n\n# XMSG\nFILL_ALL=Inserisci {0} ore per\\:\n\n#XFLD\nNO_TASK_TYPE=Nessun tipo di task\n\n#XFLD\nMISSING_DAYS=Giorni mancanti\\: {0}\n\n#XBUT: Button\nHOME=Pagina iniziale\n\n#XTIT: confirmation header\nCONFIRMATION=Conferma\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Conferma eliminazione\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Conferma invio\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Conferma bozza\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato per eliminazione\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato per invio\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Numero di inserimenti\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Numero di ore\n\n#XBUT: Confirm Button\nCONFIRM=Conferma\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} ora\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} ore\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} ora / {1} ore\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} ore / {1} ore\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Obiettivo\\: {0} ore \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} assegnazioni orari\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 assegnazione orari\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nessuna assegnazione\n\n#XMSG: No Recordings\nNO_RECORDING=Nessun record\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} ore approvate\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Salva con tempo\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Salva senza tempo\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Elimina preferiti\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Salva come Preferito\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gestisci Preferiti\n\n#XFLD: Week \nWEEK=Settimana\n\n#XFLD:\nMEET_TARGET_HOURS=Applica ore a\\:\n\n#XBUT\nALL_MISSING=Tutti gli orari mancanti ({0} ore)\n\n#XBUT: Delete Button Text\nDELETE=Elimina\n\n#XBUT: Copy Button Text\nCOPY=Copia\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Aggiungi inserimento\n\n#XFLD: label for duration\nDURATION=Durata\n\n#XFLD: label for total duration\nTOTAL_DURATION=Durata totale\n\n#XFLD: label for status\nSTATUS=Stato\n\n#XFLD: label for start time\nSTART_TIME=Ora di inizio\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nome Preferito\n\n#XFLD: label for end Time\nEND_TIME=Ora di fine\n\n#XFLD: label for note\nNOTE=Nota\n\n#XBUT: Done button\nDONE=Fatto\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuale\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Elabora inserimento\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Assegnazione orari\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Seleziona preferito o lista di lavoro\n\n# XTIT: select worklist\nSELECT_WORKLIST=Seleziona lista di lavoro\n\n# XTIT: Favorite\nFAVORITE=Preferiti\n\n# XTIT: Worklist\nWORKLIST=Lista di lavoro\n\n# XTIT: Add Favorite\nADD_FAVORITE=Aggiungi Preferito\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Elabora Preferiti\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Carica altro...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=In caricamento ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continua ricerca sul server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=In caricamento ...\n\n#XFLD: BLANK\nEMPTY=Vuoto\n\n#XFLD: None\nNONE=Nessun elemento\n\n#XFLD\nNO_WORKLIST=Nessuna lista di lavoro disponibile\n\n#XFLD\nNO_FAVORITE=Nessun preferito disponibile\n\n# XTIT: Select\nSELECT=Seleziona {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Seleziona\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Cerca...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Ore\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuti\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=Dettagli\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Impostazioni\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=I dati non salvati andranno persi. Continuare?\n\n# XTIT: \nUNSAVED_CHANGES=Modifiche non salvate\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Richiesta inviata.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Inserisci un nome di un Preferito nel campo di input Assegnazione orari.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Inserisci valori da archiviare come Preferiti.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Inserisci una durata valida.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Inserisci un\'ora d\'inizio e di fine valide.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Bozza salvata correttamente.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Preferito creato.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Preferito aggiornato.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Preferito eliminato.\n\n#XBUT:\nHELP=Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} ore inserite per questa settimana\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Attiva Precompila per acquisire rapidamente ore della settimana in base all\'ultimo inserimento effettuato.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Alcuni inserimenti sono errati; verifica dettagli errore e correggi gli inserimenti.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Inserimento orari per {0} e {1} pi\\u00F9 giorni\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Elabora inserimento orari\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Inserimento orari per {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} ore {1} minuti\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Resetta\n\n#XBUT: Button to update\nUPDATE=Aggiorna\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Aggiungi Preferito\n\n#XBUT: Button to create\nCREATE=Crea\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nome Preferito attuale\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nuovo nome Preferito\n\n#XTIT: time\nTIME=Ora\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Richiesta eliminata\n\n#XTIT:\nWARNING=Messaggio di avvertimento\n',
	"hcm/mytimesheet/i18n/i18n_iw.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u05D1\\u05D7\\u05E8 \\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E2\\u05D5\\u05D1\\u05D3\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA \\u05E2\\u05D5\\u05D1\\u05D3\\u05D9\\u05DD\n\n#XFLD: label for from time\nFROM=\\u05DE-\n\n#XFLD: label for to time\nTO=\\u05E2\\u05D3\n\n#XBUT: Button to cancel\nCANCEL=\\u05D1\\u05D8\\u05DC\n\n#XBUT: Button to close popover\nCLOSE=\\u05E1\\u05D2\\u05D5\\u05E8\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u05DB\\u05DF\n\n#XBUT: Button to decline\nNO=\\u05DC\\u05D0\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05D8\\u05D9\\u05D5\\u05D8\\u05D4\n\n# XTIT: \nTIMESHEET_TITLE=\\u05D2\\u05D9\\u05DC\\u05D9\\u05D5\\u05DF \\u05D4\\u05E9\\u05E2\\u05D5\\u05EA \\u05E9\\u05DC\\u05D9\n\n#XTIT:\nINTERNAL_ERROR=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05E4\\u05E0\\u05D9\\u05DE\\u05D9\\u05EA\n\n#XTIT:\nERROR=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05E4\\u05E0\\u05D9\\u05DE\\u05D9\\u05EA \\u05D4\\u05E7\\u05E9\\u05D5\\u05E8\\u05D4 \\u05DC\\u05D8\\u05D9\\u05E4\\u05D5\\u05DC \\u05D1\\u05E9\\u05D2\\u05D9\\u05D0\\u05D5\\u05EA \\u05D0\\u05D9\\u05E8\\u05E2\\u05D4 \\u05D1\\u05D9\\u05D9\\u05E9\\u05D5\\u05DD.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u05DE\\u05D7\\u05E7 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n# XTIT: \nTIMESHEET=\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05D1\\u05D2\\u05D9\\u05DC\\u05D9\\u05D5\\u05DF \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u05D4\\u05D6\\u05E0\\u05D4 \\u05DE\\u05D4\\u05D9\\u05E8\\u05D4\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u05D4\\u05D7\\u05DC \\u05E2\\u05DC\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u05E6\\u05D5\\u05E8 \\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0} \\u05D9\\u05DE\\u05D9\\u05DD\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05D6\\u05E0\\u05D4\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\n\n# XTIT: Month short header\nMONTH_0=\\u05D9\\u05E0\\u05D5\\u05D0\\u05E8\n# XTIT: Month short header\nMONTH_1=\\u05E4\\u05D1\\u05E8\\u05D5\\u05D0\\u05E8\n# XTIT: Month short header\nMONTH_2=\\u05DE\\u05E8\\u05E5\n# XTIT: Month short header\nMONTH_3=\\u05D0\\u05E4\\u05E8\\u05D9\\u05DC\n# XTIT: Month short header\nMONTH_4=\\u05DE\\u05D0\\u05D9\n# XTIT: Month short header\nMONTH_5=\\u05D9\\u05D5\\u05E0\\u05D9\n# XTIT: Month short header\nMONTH_6=\\u05D9\\u05D5\\u05DC\\u05D9\n# XTIT: Month short header\nMONTH_7=\\u05D0\\u05D5\\u05D2\\u05D5\\u05E1\\u05D8\n# XTIT: Month short header\nMONTH_8=\\u05E1\\u05E4\\u05D8\\u05DE\\u05D1\\u05E8\n# XTIT: Month short header\nMONTH_9=\\u05D0\\u05D5\\u05E7\\u05D8\\u05D5\\u05D1\\u05E8\n# XTIT: Month short header\nMONTH_10=\\u05E0\\u05D5\\u05D1\\u05DE\\u05D1\\u05E8\n# XTIT: Month short header\nMONTH_11=\\u05D3\\u05E6\\u05DE\\u05D1\\u05E8\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u05D9\\u05E0\\u05D5\\u05D0\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u05E4\\u05D1\\u05E8\\u05D5\\u05D0\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u05DE\\u05E8\\u05E5\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u05D0\\u05E4\\u05E8\\u05D9\\u05DC\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u05DE\\u05D0\\u05D9\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u05D9\\u05D5\\u05E0\\u05D9\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u05D9\\u05D5\\u05DC\\u05D9\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u05D0\\u05D5\\u05D2\\u05D5\\u05E1\\u05D8\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u05E1\\u05E4\\u05D8\\u05DE\\u05D1\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u05D0\\u05D5\\u05E7\\u05D8\\u05D5\\u05D1\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u05E0\\u05D5\\u05D1\\u05DE\\u05D1\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u05D3\\u05E6\\u05DE\\u05D1\\u05E8\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u05E4\\u05E2\\u05D5\\u05DC\\u05D4 \\u05E0\\u05D3\\u05E8\\u05E9\\u05EA\n# XTIT: Legend filled day\nFILLED_DAY=\\u05D1\\u05D5\\u05E6\\u05E2\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u05E0\\u05D3\\u05E8\\u05E9\\u05EA \\u05E4\\u05E2\\u05D9\\u05DC\\u05D5\\u05EA \\u05DE\\u05E6\\u05D3 \\u05D4\\u05DE\\u05D0\\u05E9\\u05E8\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u05E0\\u05D3\\u05D7\\u05D4\n# XFLD: Legend future working day\nWORKING_DAY=\\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u05D9\\u05D5\\u05DD \\u05E9\\u05D0\\u05D9\\u05E0\\u05D5 \\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u05D9\\u05D5\\u05DD \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u05D9\\u05D5\\u05DD \\u05E0\\u05D1\\u05D7\\u05E8 \\u05E9\\u05D0\\u05D9\\u05E0\\u05D5 \\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n# XFLD: Legend current day\nCURRENT_DAY=\\u05D9\\u05D5\\u05DD \\u05E0\\u05D5\\u05DB\\u05D7\\u05D9\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u05E1\\u05D4"\\u05DB \\u05E9\\u05E2\\u05D5\\u05EA \\u05D7\\u05E1\\u05E8\\u05D5\\u05EA\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u05E9\\u05E2\\u05D5\\u05EA)\n\n#XBUT: Button\nSAVE=\\u05E9\\u05DE\\u05D5\\u05E8\n\n#XBUT: Button \nSUBMIT=\\u05D4\\u05D2\\u05E9\n\n# XMSG\nFILL_ALL=\\u05D4\\u05D6\\u05DF {0} \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8\\:\n\n#XFLD\nNO_TASK_TYPE=\\u05D0\\u05D9\\u05DF \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05D9\\u05DE\\u05D4\n\n#XFLD\nMISSING_DAYS=\\u05D9\\u05DE\\u05D9\\u05DD \\u05D7\\u05E1\\u05E8\\u05D9\\u05DD\\: {0}\n\n#XBUT: Button\nHOME=\\u05D3\\u05E3 \\u05D4\\u05D1\\u05D9\\u05EA\n\n#XTIT: confirmation header\nCONFIRMATION=\\u05D0\\u05D9\\u05E9\\u05D5\\u05E8\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05DE\\u05D7\\u05D9\\u05E7\\u05D4\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05D4\\u05D2\\u05E9\\u05D4\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05D8\\u05D9\\u05D5\\u05D8\\u05D4\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5 \\u05DC\\u05DE\\u05D7\\u05D9\\u05E7\\u05D4\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5 \\u05DC\\u05D4\\u05D2\\u05E9\\u05D4\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u05DE\\u05E1\\u05E4\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D5\\u05EA\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u05DE\\u05E1\\u05E4\\u05E8 \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XBUT: Confirm Button\nCONFIRM=\\u05D0\\u05E9\\u05E8\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR=\\u05E9\\u05E2\\u05D4 {0} \n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR=\\u05E9\\u05E2\\u05D4 {0} / {1} \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA / {1} \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u05D9\\u05E2\\u05D3\\: {0} \\u05E9\\u05E2\\u05D5\\u05EA \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA \\u05D6\\u05DE\\u05DF\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D6\\u05DE\\u05DF 1\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u05DC\\u05DC\\u05D0 \\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA\n\n#XMSG: No Recordings\nNO_RECORDING=\\u05D0\\u05D9\\u05DF \\u05E8\\u05E9\\u05D5\\u05DE\\u05D5\\u05EA\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA \\u05D0\\u05D5\\u05E9\\u05E8\\u05D5\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05E2\\u05DD \\u05D6\\u05DE\\u05DF\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05DC\\u05DC\\u05D0 \\u05D6\\u05DE\\u05DF\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u05DE\\u05D7\\u05E7 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05DB\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u05E0\\u05D4\\u05DC \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n#XFLD: Week \nWEEK=\\u05E9\\u05D1\\u05D5\\u05E2\n\n#XFLD:\nMEET_TARGET_HOURS=\\u05D4\\u05D7\\u05DC \\u05E9\\u05E2\\u05D5\\u05EA \\u05DC\\:\n\n#XBUT\nALL_MISSING=\\u05DB\\u05DC \\u05D4\\u05D6\\u05DE\\u05DF \\u05D4\\u05D7\\u05E1\\u05E8 ({0} \\u05E9\\u05E2\\u05D5\\u05EA)\n\n#XBUT: Delete Button Text\nDELETE=\\u05DE\\u05D7\\u05E7\n\n#XBUT: Copy Button Text\nCOPY=\\u05D4\\u05E2\\u05EA\\u05E7\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05D4\\u05D6\\u05E0\\u05D4\n\n#XFLD: label for duration\nDURATION=\\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF \\u05DB\\u05D5\\u05DC\\u05DC\n\n#XFLD: label for status\nSTATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1\n\n#XFLD: label for start time\nSTART_TIME=\\u05E9\\u05E2\\u05EA \\u05D4\\u05EA\\u05D7\\u05DC\\u05D4\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n#XFLD: label for end Time\nEND_TIME=\\u05E9\\u05E2\\u05EA \\u05E1\\u05D9\\u05D5\\u05DD\n\n#XFLD: label for note\nNOTE=\\u05D4\\u05E2\\u05E8\\u05D4\n\n#XBUT: Done button\nDONE=\\u05D1\\u05D5\\u05E6\\u05E2\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u05D9\\u05D3\\u05E0\\u05D9\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u05E2\\u05E8\\u05D5\\u05DA \\u05D4\\u05D6\\u05E0\\u05D4\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E9\\u05E2\\u05D4\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u05D1\\u05D7\\u05E8 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D0\\u05D5 \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u05D1\\u05D7\\u05E8 \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: Favorite\nFAVORITE=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n# XTIT: Worklist\nWORKLIST=\\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u05E2\\u05E8\\u05D5\\u05DA \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u05D8\\u05E2\\u05DF \\u05E2\\u05D5\\u05D3...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u05D8\\u05D5\\u05E2\\u05DF ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u05D4\\u05DE\\u05E9\\u05DA \\u05D7\\u05D9\\u05E4\\u05D5\\u05E9 \\u05D1\\u05E9\\u05E8\\u05EA...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u05D8\\u05D5\\u05E2\\u05DF ...\n\n#XFLD: BLANK\nEMPTY=\\u05E8\\u05D9\\u05E7\n\n#XFLD: None\nNONE=\\u05D0\\u05E3 \\u05D0\\u05D7\\u05D3\n\n#XFLD\nNO_WORKLIST=\\u05D0\\u05D9\\u05DF \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05D6\\u05DE\\u05D9\\u05E0\\u05D4\n\n#XFLD\nNO_FAVORITE=\\u05D0\\u05D9\\u05DF \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\n\n# XTIT: Select\nSELECT=\\u05D1\\u05D7\\u05E8 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u05D1\\u05D7\\u05E8\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u05D7\\u05E4\\u05E9...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u05E9\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u05D3\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u05E9\\u05E2\\u05D5\\u05EA\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u05D3\\u05E7\\u05D5\\u05EA\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u05D4\\u05D2\\u05D3\\u05E8\\u05D5\\u05EA\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u05E0\\u05EA\\u05D5\\u05E0\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05D9\\u05D9\\u05E9\\u05DE\\u05E8\\u05D5 \\u05D9\\u05D5\\u05E1\\u05E8\\u05D5. \\u05D4\\u05D0\\u05DD \\u05D0\\u05EA\\u05D4 \\u05D1\\u05D8\\u05D5\\u05D7 \\u05E9\\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05D4\\u05DE\\u05E9\\u05D9\\u05DA?\n\n# XTIT: \nUNSAVED_CHANGES=\\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D5\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u05D4\\u05D1\\u05E7\\u05E9\\u05D4 \\u05D4\\u05D5\\u05D2\\u05E9\\u05D4.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u05D4\\u05D6\\u05DF \\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D1\\u05E9\\u05D3\\u05D4 \\u05D4\\u05E7\\u05DC\\u05D8 \\u05E9\\u05DC \\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D4\\u05E9\\u05E2\\u05D4.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05DC\\u05D0\\u05D7\\u05E1\\u05D5\\u05DF \\u05DB\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E9\\u05DC\\u05DA.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u05D4\\u05D6\\u05DF \\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF \\u05D7\\u05D5\\u05E7\\u05D9.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u05D4\\u05D6\\u05DF \\u05D6\\u05DE\\u05DF \\u05D4\\u05EA\\u05D7\\u05DC\\u05D4 \\u05D5\\u05D6\\u05DE\\u05DF \\u05E1\\u05D9\\u05D5\\u05DD \\u05D7\\u05D5\\u05E7\\u05D9\\u05D9\\u05DD.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u05D4\\u05D8\\u05D9\\u05D5\\u05D8\\u05D4 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4 \\u05D1\\u05D4\\u05E6\\u05DC\\u05D7\\u05D4.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05D5\\u05E6\\u05E8.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E2\\u05D5\\u05D3\\u05DB\\u05DF.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05DE\\u05D7\\u05E7.\n\n#XBUT:\nHELP=\\u05E2\\u05D6\\u05E8\\u05D4\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u05E9\\u05E2\\u05D5\\u05EA \\u05D4\\u05D5\\u05D6\\u05E0\\u05D5 \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E9\\u05D1\\u05D5\\u05E2 \\u05D6\\u05D4\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u05D4\\u05E4\\u05E2\\u05DC \\u05DE\\u05D9\\u05DC\\u05D5\\u05D9 \\u05DE\\u05E8\\u05D0\\u05E9 \\u05DB\\u05D3\\u05D9 \\u05DC\\u05D4\\u05D6\\u05D9\\u05DF \\u05D1\\u05DE\\u05D4\\u05D9\\u05E8\\u05D5\\u05EA \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8 \\u05D4\\u05E9\\u05D1\\u05D5\\u05E2 \\u05E2\\u05DC \\u05D1\\u05E1\\u05D9\\u05E1 \\u05D4\\u05D4\\u05D6\\u05E0\\u05D4 \\u05D4\\u05DE\\u05D5\\u05E6\\u05DC\\u05D7\\u05EA \\u05D4\\u05D0\\u05D7\\u05E8\\u05D5\\u05E0\\u05D4 \\u05E9\\u05DC\\u05DA.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u05D7\\u05DC\\u05E7 \\u05DE\\u05D4\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05E9\\u05D2\\u05D5\\u05D9\\u05D5\\u05EA. \\u05E1\\u05E7\\u05D5\\u05E8 \\u05D0\\u05EA \\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05D5\\u05EA\\u05E7\\u05DF \\u05D0\\u05EA \\u05D4\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u05D4\\u05D6\\u05E0\\u05EA \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8 {0} \\u05D5-{1} \\u05D9\\u05DE\\u05D9\\u05DD \\u05E0\\u05D5\\u05E1\\u05E4\\u05D9\\u05DD\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u05E2\\u05E8\\u05D5\\u05DA \\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u05E9\\u05E2\\u05D5\\u05EA {1} \\u05D3\\u05E7\\u05D5\\u05EA\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u05E9\\u05E2\\u05D5\\u05EA {1} \\u05D3\\u05E7\\u05D5\\u05EA\n\n#XBUT: Button to reset\nRESET=\\u05D0\\u05E4\\u05E1\n\n#XBUT: Button to update\nUPDATE=\\u05E2\\u05D3\\u05DB\\u05DF\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n#XBUT: Button to create\nCREATE=\\u05E6\\u05D5\\u05E8\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05D5\\u05DB\\u05D7\\u05D9\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D7\\u05D3\\u05E9\n\n#XTIT: time\nTIME=\\u05E9\\u05E2\\u05D4\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u05D4\\u05D1\\u05E7\\u05E9\\u05D4 \\u05E0\\u05DE\\u05D7\\u05E7\\u05D4\n\n#XTIT:\nWARNING=\\u05D0\\u05D6\\u05D4\\u05E8\\u05D4\n',
	"hcm/mytimesheet/i18n/i18n_ja.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u5F93\\u696D\\u54E1\\u5272\\u5F53\\u306E\\u9078\\u629E\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u5F93\\u696D\\u54E1\\u5272\\u5F53\n\n#XFLD: label for from time\nFROM=\\u958B\\u59CB\n\n#XFLD: label for to time\nTO=\\u7D42\\u4E86\n\n#XBUT: Button to cancel\nCANCEL=\\u4E2D\\u6B62\n\n#XBUT: Button to close popover\nCLOSE=\\u9589\\u3058\\u308B\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u306F\\u3044\n\n#XBUT: Button to decline\nNO=\\u3044\\u3044\\u3048\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u30C9\\u30E9\\u30D5\\u30C8\\u4FDD\\u5B58\n\n# XTIT: \nTIMESHEET_TITLE=\\u30BF\\u30A4\\u30E0\\u30B7\\u30FC\\u30C8\n\n#XTIT:\nINTERNAL_ERROR=\\u5185\\u90E8\\u30A8\\u30E9\\u30FC\n\n#XTIT:\nERROR=\\u30A8\\u30E9\\u30FC\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u30A8\\u30E9\\u30FC\\u51E6\\u7406\\u306B\\u95A2\\u9023\\u3059\\u308B\\u5185\\u90E8\\u30A8\\u30E9\\u30FC\\u304C\\u30A2\\u30D7\\u30EA\\u30B1\\u30FC\\u30B7\\u30E7\\u30F3\\u3067\\u767A\\u751F\\u3057\\u307E\\u3057\\u305F\\u3002\n\n# XTIT:\nFAV_DIALOG_BOX=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u524A\\u9664\n\n# XTIT: \nTIMESHEET=\\u30BF\\u30A4\\u30E0\\u30B7\\u30FC\\u30C8\\u5165\\u529B\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u7C21\\u6613\\u5165\\u529B\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u9069\\u7528\\u5148\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u8A73\\u7D30\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u6642\\u9593\\u5165\\u529B\\u767B\\u9332\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE={0} \\u65E5\\u9593\\u306E\\u5165\\u529B\\u767B\\u9332\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u5165\\u529B\\u8A73\\u7D30\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE={0} \\u306E\\u5165\\u529B\\u8A73\\u7D30\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE={0} \\u306E\\u5165\\u529B\\u767B\\u9332\n\n# XTIT: Month short header\nMONTH_0=1 \\u6708\n# XTIT: Month short header\nMONTH_1=2 \\u6708\n# XTIT: Month short header\nMONTH_2=3 \\u6708\n# XTIT: Month short header\nMONTH_3=4 \\u6708\n# XTIT: Month short header\nMONTH_4=5 \\u6708\n# XTIT: Month short header\nMONTH_5=6 \\u6708\n# XTIT: Month short header\nMONTH_6=7 \\u6708\n# XTIT: Month short header\nMONTH_7=8 \\u6708\n# XTIT: Month short header\nMONTH_8=9 \\u6708\n# XTIT: Month short header\nMONTH_9=10 \\u6708\n# XTIT: Month short header\nMONTH_10=11 \\u6708\n# XTIT: Month short header\nMONTH_11=12 \\u6708\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=1 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_1=2 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_2=3 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_3=4 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_4=5 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_5=6 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_6=7 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_7=8 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_8=9 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_9=10 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_10=11 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_11=12 \\u6708\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u30A2\\u30AF\\u30B7\\u30E7\\u30F3\\u5FC5\\u9808\n# XTIT: Legend filled day\nFILLED_DAY=\\u5B8C\\u4E86\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u627F\\u8A8D\\u8005\\u30A2\\u30AF\\u30B7\\u30E7\\u30F3\\u5FC5\\u9808\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u5374\\u4E0B\\u6E08\n# XFLD: Legend future working day\nWORKING_DAY=\\u52E4\\u52D9\\u65E5\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u4F11\\u65E5\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u9078\\u629E\\u65E5\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u9078\\u629E\\u6E08\\u306E\\u4F11\\u65E5\n# XFLD: Legend current day\nCURRENT_DAY=\\u73FE\\u5728\\u65E5\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u5408\\u8A08\\u4E0D\\u8DB3\\u6642\\u9593\\u6570\\:  {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} \\u65E5 ({2} \\u6642\\u9593)\n\n#XBUT: Button\nSAVE=\\u4FDD\\u5B58\n\n#XBUT: Button \nSUBMIT=\\u9001\\u4FE1\n\n# XMSG\nFILL_ALL={0} \\u6642\\u9593\\u3092\\u5165\\u529B\\: \n\n#XFLD\nNO_TASK_TYPE=\\u30BF\\u30B9\\u30AF\\u30BF\\u30A4\\u30D7\\u306A\\u3057\n\n#XFLD\nMISSING_DAYS=\\u4E0D\\u8DB3\\u65E5\\u6570\\: {0}\n\n#XBUT: Button\nHOME=\\u30DB\\u30FC\\u30E0\n\n#XTIT: confirmation header\nCONFIRMATION=\\u78BA\\u8A8D\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u524A\\u9664\\u78BA\\u8A8D\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u9001\\u4FE1\\u78BA\\u8A8D\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u30C9\\u30E9\\u30D5\\u30C8\\u78BA\\u8A8D\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u524A\\u9664\\u5BFE\\u8C61\\u3068\\u3057\\u3066\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u9001\\u4FE1\\u5BFE\\u8C61\\u3068\\u3057\\u3066\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u5165\\u529B\\u6570\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u6642\\u9593\\u6570\n\n#XBUT: Confirm Button\nCONFIRM=\\u78BA\\u8A8D\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} \\u65E5 - {1}  \\u65E5\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} \\u65E5 - {1} \\u65E5\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u6642\\u9593\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u6642\\u9593/{1} \\u6642\\u9593\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u6642\\u9593/{1} \\u6642\\u9593\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u76EE\\u6A19\\:  {0} \\u6642\\u9593 \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u6642\\u9593\\u5272\\u5F53\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u6642\\u9593\\u5272\\u5F53\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u5272\\u5F53\\u306A\\u3057\n\n#XMSG: No Recordings\nNO_RECORDING=\\u30EC\\u30B3\\u30FC\\u30C9\\u306A\\u3057\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u6642\\u9593\\u304C\\u627F\\u8A8D\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u4FDD\\u5B58 (\\u6642\\u9593\\u3042\\u308A)\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u4FDD\\u5B58 (\\u6642\\u9593\\u306A\\u3057)\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u524A\\u9664\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u3068\\u3057\\u3066\\u4FDD\\u5B58\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u7BA1\\u7406\n\n#XFLD: Week \nWEEK=\\u9031\n\n#XFLD:\nMEET_TARGET_HOURS=\\u6642\\u9593\\u9069\\u7528\\u5148\\:\n\n#XBUT\nALL_MISSING=\\u5168\\u4E0D\\u8DB3\\u6642\\u9593 ({0} \\u6642\\u9593)\n\n#XBUT: Delete Button Text\nDELETE=\\u524A\\u9664\n\n#XBUT: Copy Button Text\nCOPY=\\u30B3\\u30D4\\u30FC\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u5165\\u529B\\u8FFD\\u52A0\n\n#XFLD: label for duration\nDURATION=\\u671F\\u9593\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u5408\\u8A08\\u671F\\u9593\n\n#XFLD: label for status\nSTATUS=\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#XFLD: label for start time\nSTART_TIME=\\u958B\\u59CB\\u6642\\u523B\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u540D\\u79F0\n\n#XFLD: label for end Time\nEND_TIME=\\u7D42\\u4E86\\u6642\\u523B\n\n#XFLD: label for note\nNOTE=\\u30E1\\u30E2\n\n#XBUT: Done button\nDONE=\\u5B8C\\u4E86\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u30DE\\u30CB\\u30E5\\u30A2\\u30EB\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u5165\\u529B\\u306E\\u7DE8\\u96C6\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u6642\\u9593\\u5272\\u5F53\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u307E\\u305F\\u306F\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u306E\\u9078\\u629E\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u9078\\u629E\n\n# XTIT: Favorite\nFAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\n\n# XTIT: Worklist\nWORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u8FFD\\u52A0\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u7DE8\\u96C6\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u8FFD\\u52A0\\u30ED\\u30FC\\u30C9...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u30B5\\u30FC\\u30D0\\u3067\\u306E\\u691C\\u7D22\\u3092\\u7D9A\\u884C...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\n\n#XFLD: BLANK\nEMPTY=\\u7A7A\\u767D\n\n#XFLD: None\nNONE=\\u306A\\u3057\n\n#XFLD\nNO_WORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u306A\\u3057\n\n#XFLD\nNO_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306A\\u3057\n\n# XTIT: Select\nSELECT={0} \\u306E\\u9078\\u629E\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u9078\\u629E\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u691C\\u7D22...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u6642\\u9593\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u5206\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u6642\\u9593\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u5206\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=YYYY/MM/DD\n\n#XBUT:\nDETAIL=\\u8A73\\u7D30\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u8A2D\\u5B9A\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u672A\\u4FDD\\u5B58\\u306E\\u30C7\\u30FC\\u30BF\\u306F\\u3059\\u3079\\u3066\\u7834\\u68C4\\u3055\\u308C\\u307E\\u3059\\u3002\\u7D9A\\u884C\\u3057\\u307E\\u3059\\u304B\\u3002\n\n# XTIT: \nUNSAVED_CHANGES=\\u672A\\u4FDD\\u5B58\\u306E\\u5909\\u66F4\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u7533\\u8ACB\\u304C\\u9001\\u4FE1\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u6642\\u9593\\u5272\\u5F53\\u5165\\u529B\\u9805\\u76EE\\u306B\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u540D\\u79F0\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u3068\\u3057\\u3066\\u4FDD\\u5B58\\u3059\\u308B\\u9805\\u76EE\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u6709\\u52B9\\u306A\\u671F\\u9593\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u6709\\u52B9\\u306A\\u958B\\u59CB\\u6642\\u523B\\u304A\\u3088\\u3073\\u7D42\\u4E86\\u6642\\u523B\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u30C9\\u30E9\\u30D5\\u30C8\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u767B\\u9332\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u66F4\\u65B0\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u524A\\u9664\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XBUT:\nHELP=\\u30D8\\u30EB\\u30D7\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=\\u4ECA\\u9031\\u306B\\u3064\\u3044\\u3066 {0}/{1} \\u6642\\u9593\\u304C\\u5165\\u529B\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u4E8B\\u524D\\u5165\\u529B\\u3092\\u6709\\u52B9\\u306B\\u3059\\u308B\\u3068\\u3001\\u524D\\u56DE\\u306E\\u9069\\u5207\\u306A\\u5165\\u529B\\u306B\\u57FA\\u3065\\u3044\\u3066\\u9031\\u306E\\u6642\\u9593\\u3092\\u7C21\\u5358\\u306B\\u5165\\u529B\\u3059\\u308B\\u3053\\u3068\\u304C\\u3067\\u304D\\u307E\\u3059\\u3002\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u5165\\u529B\\u306E\\u4E00\\u90E8\\u304C\\u4E0D\\u9069\\u5207\\u3067\\u3059\\u3002\\u30A8\\u30E9\\u30FC\\u8A73\\u7D30\\u3092\\u78BA\\u8A8D\\u3057\\u3001\\u5165\\u529B\\u3092\\u4FEE\\u6B63\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT={0} \\u65E5\\u9593\\u3068\\u3055\\u3089\\u306B {1} \\u65E5\\u9593\\u306E\\u6642\\u9593\\u5165\\u529B\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u6642\\u9593\\u5165\\u529B\\u7DE8\\u96C6\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE={0} \\u65E5\\u306E\\u6642\\u9593\\u5165\\u529B\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u6642\\u9593 {1} \\u5206\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=\\u30EA\\u30BB\\u30C3\\u30C8\n\n#XBUT: Button to update\nUPDATE=\\u66F4\\u65B0\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u8FFD\\u52A0\n\n#XBUT: Button to create\nCREATE=\\u767B\\u9332\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u73FE\\u5728\\u306E\\u304A\\u6C17\\u306B\\u5165\\u308A\\u540D\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u65B0\\u898F\\u304A\\u6C17\\u306B\\u5165\\u308A\\u540D\n\n#XTIT: time\nTIME=\\u6642\\u9593\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u7533\\u8ACB\\u304C\\u524A\\u9664\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XTIT:\nWARNING=\\u8B66\\u544A\n',
	"hcm/mytimesheet/i18n/i18n_no.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Velg en ansettelseskontrakt\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Ansettelseskontrakter\n\n#XFLD: label for from time\nFROM=Fra\n\n#XFLD: label for to time\nTO=Til\n\n#XBUT: Button to cancel\nCANCEL=Avbryt\n\n#XBUT: Button to close popover\nCLOSE=Lukk\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Ja\n\n#XBUT: Button to decline\nNO=Nei\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Lagre utkast\n\n# XTIT: \nTIMESHEET_TITLE=Min tidsregistrering\n\n#XTIT:\nINTERNAL_ERROR=Intern feil\n\n#XTIT:\nERROR=Feil\n\n#XFLD:\nINTERNAL_ERROR_BODY=En intern feil relatert til feilbehandling har oppst\\u00E5tt i applikasjonen\n\n# XTIT:\nFAV_DIALOG_BOX=Slett Favoritter\n\n# XTIT: \nTIMESHEET=Tidsregistreringsposter\n\n#XBUT: Button for quick entry\nQUICK_FILL=Hurtigregistrering\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Bruk p\\u00E5\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detaljer\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Opprett tidsregistrering\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Registrer timer for {0} dager\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Postdetaljer\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Registreringsdetaljer for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Registrer timer for {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Des\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mars\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Juni\n# XTIT: Month title for calendar\nMONTH_FULL_6=Juli\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktober\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=Desember\n\n# XTIT: Legend missing day\nMISSING_DAY=Aktivitet kreves\n# XTIT: Legend filled day\nFILLED_DAY=Utf\\u00F8rt\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Venter p\\u00E5 godkjenning\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Avvist\n# XFLD: Legend future working day\nWORKING_DAY=Arbeidsdag\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Fridag\n# XFLD: Legend selected working day\nSELECTED_DAY=Valgt dag\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Valgt fridag\n# XFLD: Legend current day\nCURRENT_DAY=Gjeldende dag\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Totalt antall manglende timer\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} timer)\n\n#XBUT: Button\nSAVE=Lagre\n\n#XBUT: Button \nSUBMIT=Send\n\n# XMSG\nFILL_ALL=Registrer {0} timer for\\:\n\n#XFLD\nNO_TASK_TYPE=Ingen oppgavetype\n\n#XFLD\nMISSING_DAYS=Manglende dager\\: {0}\n\n#XBUT: Button\nHOME=Startside\n\n#XTIT: confirmation header\nCONFIRMATION=Bekreftelse\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Bekreft sletting\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Bekreft sending\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Bekreft utkast\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Sammenfatning av tidsdataregistreringer valgt for sletting\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Sammenfatning av tidsdataregistreringer valgt for sending\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Oversikt over valgte tidsdataregistreringer\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Antall poster\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Antall timer\n\n#XBUT: Confirm Button\nCONFIRM=Bekreft\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Time\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} timer\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} time / {1} timer\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} timer / {1} timer\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=M\\u00E5l\\: {0} timer \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} tidstilordninger\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 tidstilordning\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Ingen tilordninger\n\n#XMSG: No Recordings\nNO_RECORDING=Ingen poster\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} godkjente timer\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Lagre med tidspunkt\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Lagre uten tidspunkt\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Slett Favoritter\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Lagre som favoritt\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Administrer favoritter\n\n#XFLD: Week \nWEEK=Uke\n\n#XFLD:\nMEET_TARGET_HOURS=Bruk timer p\\u00E5\\:\n\n#XBUT\nALL_MISSING=All manglende tid ({0} timer)\n\n#XBUT: Delete Button Text\nDELETE=Slett\n\n#XBUT: Copy Button Text\nCOPY=Kopier\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Tilf\\u00F8y post\n\n#XFLD: label for duration\nDURATION=Varighet\n\n#XFLD: label for total duration\nTOTAL_DURATION=Samlet varighet\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Starttidspunkt\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Navn p\\u00E5 favoritt\n\n#XFLD: label for end Time\nEND_TIME=Sluttidspunkt\n\n#XFLD: label for note\nNOTE=Merknad\n\n#XBUT: Done button\nDONE=Utf\\u00F8rt\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuell\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Rediger post\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Tidstilordning\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Velg favoritt eller arbeidsliste\n\n# XTIT: select worklist\nSELECT_WORKLIST=Velg arbeidsliste\n\n# XTIT: Favorite\nFAVORITE=Favoritter\n\n# XTIT: Worklist\nWORKLIST=Arbeidsliste\n\n# XTIT: Add Favorite\nADD_FAVORITE=Tilf\\u00F8y favoritt\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Rediger favoritter\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Last mer...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Laster ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Fortsett s\\u00F8k p\\u00E5 server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Laster ...\n\n#XFLD: BLANK\nEMPTY=Tom\n\n#XFLD: None\nNONE=Ingen\n\n#XFLD\nNO_WORKLIST=Det finnes ingen arbeidsliste\n\n#XFLD\nNO_FAVORITE=Det finnes ingen favoritter\n\n# XTIT: Select\nSELECT=Velg {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Velg\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=S\\u00F8k...\n\n#XFLD: short label for hours\nHOURS_LABEL=t\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Timer\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutter\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=Detaljer\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Innstillinger\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Du vil miste data som ikke er lagret. Er du sikker p\\u00E5 at du vil fortsette?\n\n# XTIT: \nUNSAVED_CHANGES=Ulagrede endringer\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Foresp\\u00F8rsel er sendt\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Oppgi et favorittnavn i inndatafeltet Tidstilordning\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Utf\\u00F8r registreringer for \\u00E5 lagre som din favoritt\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Oppgi en gyldig varighet\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Oppgi en gyldig start- og sluttid\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Utkast er lagret\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favoritt er sendt\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favoritt oppdatert\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favoritt slettet\n\n#XBUT:\nHELP=Hjelp\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} timer registrert for denne uken\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Aktiver "forh\\u00E5ndsdefinisjon" for \\u00E5 fylle ut timer per uke automatisk basert p\\u00E5 din siste registrering\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Noen poster er feil. Kontroller feildetaljer og korriger poster.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Tidsregistrering for {0} og {1} flere dag(er)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Rediger tidsregistrering\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Tidsregistrering for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} timer {1} minutter\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} t {1} m\n\n#XBUT: Button to reset\nRESET=Tilbakestill\n\n#XBUT: Button to update\nUPDATE=Oppdater\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Tilf\\u00F8y favoritt\n\n#XBUT: Button to create\nCREATE=Opprett\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktuelt favorittnavn\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nytt favorittnavn\n\n#XTIT: time\nTIME=Tid\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Foresp\\u00F8rsel er slettet\n\n#XTIT:\nWARNING=Advarsel\n',
	"hcm/mytimesheet/i18n/i18n_pl.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Wybierz umow\\u0119 o prac\\u0119\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Umowy o prac\\u0119\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Anuluj\n\n#XBUT: Button to close popover\nCLOSE=Zamknij\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Tak\n\n#XBUT: Button to decline\nNO=Nie\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Zapisz wersj\\u0119 robocz\\u0105\n\n# XTIT: \nTIMESHEET_TITLE=Rejestracja czasu\n\n#XTIT:\nINTERNAL_ERROR=B\\u0142\\u0105d wewn\\u0119trzny\n\n#XTIT:\nERROR=B\\u0142\\u0105d\n\n#XFLD:\nINTERNAL_ERROR_BODY=W aplikacji wyst\\u0105pi\\u0142 b\\u0142\\u0105d wewn\\u0119trzny zwi\\u0105zany z obs\\u0142ug\\u0105 b\\u0142\\u0119du.\n\n# XTIT:\nFAV_DIALOG_BOX=Usu\\u0144 Ulubione\n\n# XTIT: \nTIMESHEET=Wpisy rejestracji czasu\n\n#XBUT: Button for quick entry\nQUICK_FILL=Szybki wpis\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Zastosuj do\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Szczeg\\u00F3\\u0142y\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Utw\\u00F3rz wpis daty\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Utw\\u00F3rz wpis dla {0} dni\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Szczeg\\u00F3\\u0142y wpisu\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Szczeg\\u00F3\\u0142y wpisu dla {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Utw\\u00F3rz wpis dla {0}\n\n# XTIT: Month short header\nMONTH_0=Sty\n# XTIT: Month short header\nMONTH_1=Lut\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Kwi\n# XTIT: Month short header\nMONTH_4=Maj\n# XTIT: Month short header\nMONTH_5=Cze\n# XTIT: Month short header\nMONTH_6=Lip\n# XTIT: Month short header\nMONTH_7=Sie\n# XTIT: Month short header\nMONTH_8=Wrz\n# XTIT: Month short header\nMONTH_9=Pa\\u017A\n# XTIT: Month short header\nMONTH_10=Lis\n# XTIT: Month short header\nMONTH_11=Gru\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Stycze\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_1=Luty\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marzec\n# XTIT: Month title for calendar\nMONTH_FULL_3=Kwiecie\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Czerwiec\n# XTIT: Month title for calendar\nMONTH_FULL_6=Lipiec\n# XTIT: Month title for calendar\nMONTH_FULL_7=Sierpie\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_8=Wrzesie\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_9=Pa\\u017Adziernik\n# XTIT: Month title for calendar\nMONTH_FULL_10=Listopad\n# XTIT: Month title for calendar\nMONTH_FULL_11=Grudzie\\u0144\n\n# XTIT: Legend missing day\nMISSING_DAY=Wymagana czynno\\u015B\\u0107\n# XTIT: Legend filled day\nFILLED_DAY=Gotowe\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Wymagana czynno\\u015B\\u0107 zatwierdzaj\\u0105cego\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Odrzucone\n# XFLD: Legend future working day\nWORKING_DAY=Dzie\\u0144 roboczy\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Dzie\\u0144 wolny od pracy\n# XFLD: Legend selected working day\nSELECTED_DAY=Wybrany dzie\\u0144\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Wybrany dzie\\u0144 wolny od pracy\n# XFLD: Legend current day\nCURRENT_DAY=Bie\\u017C\\u0105cy dzie\\u0144\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Suma brakuj\\u0105cych godzin\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} godz.)\n\n#XBUT: Button\nSAVE=Zapisz\n\n#XBUT: Button \nSUBMIT=Wy\\u015Blij\n\n# XMSG\nFILL_ALL=Wpisz {0} godz. dla\\:\n\n#XFLD\nNO_TASK_TYPE=Bez typu zadania\n\n#XFLD\nMISSING_DAYS=Brakuj\\u0105ce dni\\: {0}\n\n#XBUT: Button\nHOME=Ekran g\\u0142\\u00F3wny\n\n#XTIT: confirmation header\nCONFIRMATION=Potwierdzenie\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potwierdzanie usuwania\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potwierdzanie przesy\\u0142ania\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potwierdzanie wersji roboczej\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Podsumowanie wpis\\u00F3w czasu wybranych dla usuwania\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Podsumowanie wpis\\u00F3w czasu wybranych dla przesy\\u0142ania\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Podsumowanie wybranych wpis\\u00F3w daty\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Liczba wpis\\u00F3w\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Liczba godzin\n\n#XBUT: Confirm Button\nCONFIRM=Potwierd\\u017A\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} godzina\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} godz.\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} godz./{1} godz.\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} godz. / {1} godz.\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cel\\: {0} godz. \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=Liczba przypisa\\u0144 czasu\\: {0}\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 przypisanie czasu\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Brak przypisa\\u0144\n\n#XMSG: No Recordings\nNO_RECORDING=Brak rekord\\u00F3w\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=Zatwierdzono godzin\\: {0}\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Zapisz z czasem\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Zapisz bez czasu\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Usu\\u0144 Ulubione\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Zapisz jako Ulubione\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Zarz\\u0105dzaj Ulubionymi\n\n#XFLD: Week \nWEEK=Tydzie\\u0144\n\n#XFLD:\nMEET_TARGET_HOURS=Zastosuj godziny do\\:\n\n#XBUT\nALL_MISSING=\\u0141\\u0105czny brakuj\\u0105cy czas({0} godz.)\n\n#XBUT: Delete Button Text\nDELETE=Usu\\u0144\n\n#XBUT: Copy Button Text\nCOPY=Kopiuj\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodaj wpis\n\n#XFLD: label for duration\nDURATION=Czas trwania\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u0141\\u0105czny czas trwania\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Czas rozpocz\\u0119cia\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nazwa ulubionych\n\n#XFLD: label for end Time\nEND_TIME=Czas zako\\u0144czenia\n\n#XFLD: label for note\nNOTE=Notatka\n\n#XBUT: Done button\nDONE=Gotowe\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=R\\u0119czne\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Edytuj wpis\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Przypisanie czasu\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Wyb\\u00F3r Ulubionych lub listy roboczej\n\n# XTIT: select worklist\nSELECT_WORKLIST=Wyb\\u00F3r listy roboczej\n\n# XTIT: Favorite\nFAVORITE=Ulubione\n\n# XTIT: Worklist\nWORKLIST=Lista robocza\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodaj ulubione\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Edytuj ulubione\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Wczytaj wi\\u0119cej...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Wczytywanie...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Kontynuuj szukanie na serwerze...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Wczytywanie...\n\n#XFLD: BLANK\nEMPTY=Puste\n\n#XFLD: None\nNONE=Brak\n\n#XFLD\nNO_WORKLIST=Brak dost\\u0119pnej listy roboczej\n\n#XFLD\nNO_FAVORITE=Brak dost\\u0119pnych Ulubionych\n\n# XTIT: Select\nSELECT=Wybierz {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Wybierz\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Szukaj...\n\n#XFLD: short label for hours\nHOURS_LABEL=godz.\n\n#XFLD: short label for minutes\nMINUTES_LABEL=min\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Godziny\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuty\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=Szczeg\\u00F3\\u0142y\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Ustawienia\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Wszystkie niezapisane dane zostan\\u0105 odrzucone. Czy na pewno chcesz kontynuowa\\u0107?\n\n# XTIT: \nUNSAVED_CHANGES=Niezapami\\u0119tane zmiany\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Wniosek wys\\u0142any.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Wprowad\\u017A nazw\\u0119 ulubionych w polu wej\\u015Bciowym Przypisanie czasu.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Dokonaj wpis\\u00F3w, aby zapisa\\u0107 jako Ulubione.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Wprowad\\u017A prawid\\u0142owy czas trwania.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Wprowad\\u017A prawid\\u0142owy czas rozpocz\\u0119cia i zako\\u0144czenia.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Pomy\\u015Blnie zapisano wersj\\u0119 robocz\\u0105.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Utworzono ulubione.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Zaktualizowano Ulubione.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Usuni\\u0119to ulubione.\n\n#XBUT:\nHELP=Pomoc\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=Wprowadzono {0}/{1} godz. dla tego tygodnia.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Aby szybko wype\\u0142ni\\u0107 godziny na podstawie ostatniego pomy\\u015Blnego wpisu, w\\u0142\\u0105cz wst\\u0119pne wype\\u0142nianie.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Niekt\\u00F3re wpisy s\\u0105 nieprawid\\u0142owe. Sprawd\\u017A szczeg\\u00F3\\u0142y b\\u0142\\u0119du i popraw wpisy.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Wpis daty dla {0} i {1} dni wi\\u0119cej\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edycja wpisu daty\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Wpis daty dla {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} godz. {1} min\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} godz. {1} min\n\n#XBUT: Button to reset\nRESET=Resetuj\n\n#XBUT: Button to update\nUPDATE=Aktualizuj\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodaj ulubione\n\n#XBUT: Button to create\nCREATE=Utw\\u00F3rz\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktualna nazwa Ulubionego\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nowa nazwa Ulubionego\n\n#XTIT: time\nTIME=Czas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Wniosek usuni\\u0119ty\n\n#XTIT:\nWARNING=Ostrze\\u017Cenie\n',
	"hcm/mytimesheet/i18n/i18n_pt.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Selecionar um contrato de emprego\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contratos de emprego\n\n#XFLD: label for from time\nFROM=De\n\n#XFLD: label for to time\nTO=A\n\n#XBUT: Button to cancel\nCANCEL=Anular\n\n#XBUT: Button to close popover\nCLOSE=Fechar\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Sim\n\n#XBUT: Button to decline\nNO=N\\u00E3o\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Gravar esbo\\u00E7o\n\n# XTIT: \nTIMESHEET_TITLE=Minha folha de horas\n\n#XTIT:\nINTERNAL_ERROR=Erro interno\n\n#XTIT:\nERROR=Erro\n\n#XFLD:\nINTERNAL_ERROR_BODY=Ocorreu um erro interno relacionado ao tratamento de erros no aplicativo.\n\n# XTIT:\nFAV_DIALOG_BOX=Excluir favoritos\n\n# XTIT: \nTIMESHEET=Entradas da folha de horas\n\n#XBUT: Button for quick entry\nQUICK_FILL=Entrada r\\u00E1pida\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Aplicar a\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalhes\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Criar registro de tempos\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Criar entrada para {0} dias\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalhes da entrada\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalhes de entrada para {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Criar entrada para {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Fev\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Abr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Ago\n# XTIT: Month short header\nMONTH_8=Set\n# XTIT: Month short header\nMONTH_9=Out\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dez\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janeiro\n# XTIT: Month title for calendar\nMONTH_FULL_1=Fevereiro\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mar\\u00E7o\n# XTIT: Month title for calendar\nMONTH_FULL_3=Abril\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maio\n# XTIT: Month title for calendar\nMONTH_FULL_5=Junho\n# XTIT: Month title for calendar\nMONTH_FULL_6=Julho\n# XTIT: Month title for calendar\nMONTH_FULL_7=Agosto\n# XTIT: Month title for calendar\nMONTH_FULL_8=Setembro\n# XTIT: Month title for calendar\nMONTH_FULL_9=Outubro\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembro\n# XTIT: Month title for calendar\nMONTH_FULL_11=Dezembro\n\n# XTIT: Legend missing day\nMISSING_DAY=A\\u00E7\\u00E3o necess\\u00E1ria\n# XTIT: Legend filled day\nFILLED_DAY=Conclu\\u00EDdo\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Aprova\\u00E7\\u00E3o necess\\u00E1ria\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejeitado\n# XFLD: Legend future working day\nWORKING_DAY=Dia de trabalho\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Dia livre\n# XFLD: Legend selected working day\nSELECTED_DAY=Dia selecionado\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Dia livre n\\u00E3o selecionado\n# XFLD: Legend current day\nCURRENT_DAY=Dia atual\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total de horas em falta\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} horas)\n\n#XBUT: Button\nSAVE=Gravar\n\n#XBUT: Button \nSUBMIT=Enviar\n\n# XMSG\nFILL_ALL=Inserir {0} horas para\\:\n\n#XFLD\nNO_TASK_TYPE=Nenhum tipo de tarefa\n\n#XFLD\nMISSING_DAYS=Dias em falta\\: {0}\n\n#XBUT: Button\nHOME=In\\u00EDcio\n\n#XTIT: confirmation header\nCONFIRMATION=Confirma\\u00E7\\u00E3o\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmar exclus\\u00E3o\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmar envio\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmar esbo\\u00E7o\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Resumo de entradas de tempos selecionado para exclus\\u00E3o\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Resumo de entradas de tempos selecionado para envio\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Resumo de entradas de horas selecionadas\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=N\\u00BA de entradas\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=N\\u00FAmero de horas\n\n#XBUT: Confirm Button\nCONFIRM=Confirmar\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} hora\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} horas\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hora / {1} horas\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} horas / {1} horas\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Te\\u00F3rico\\: {0} horas \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} atribui\\u00E7\\u00F5es de tempo\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 atribui\\u00E7\\u00E3o de tempo\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nenhuma atribui\\u00E7\\u00E3o\n\n#XMSG: No Recordings\nNO_RECORDING=Nenhum registro\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} horas aprovadas\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Gravar com tempo\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Gravar sem tempo\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Excluir favoritos\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Gravar como favorito\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gerenciar favoritos\n\n#XFLD: Week \nWEEK=Semana\n\n#XFLD:\nMEET_TARGET_HOURS=Aplicar horas a\\:\n\n#XBUT\nALL_MISSING=Todas as horas em falta ({0} horas)\n\n#XBUT: Delete Button Text\nDELETE=Excluir\n\n#XBUT: Copy Button Text\nCOPY=Copiar\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Inserir entr.\n\n#XFLD: label for duration\nDURATION=Dura\\u00E7\\u00E3o\n\n#XFLD: label for total duration\nTOTAL_DURATION=Dura\\u00E7\\u00E3o total\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Hora de in\\u00EDcio\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nome do favorito\n\n#XFLD: label for end Time\nEND_TIME=Hora de fim\n\n#XFLD: label for note\nNOTE=Nota\n\n#XBUT: Done button\nDONE=Conclu\\u00EDdo\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Processar entrada\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Atribui\\u00E7\\u00E3o de tempo\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Selecionar favorito ou lista de trabalho\n\n# XTIT: select worklist\nSELECT_WORKLIST=Selecionar lista de trabalho\n\n# XTIT: Favorite\nFAVORITE=Favoritos\n\n# XTIT: Worklist\nWORKLIST=Lista de trabalho\n\n# XTIT: Add Favorite\nADD_FAVORITE=Inserir favorito\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Processar favoritos\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Carregar mais...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Carregando...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuar procura no servidor...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Carregando...\n\n#XFLD: BLANK\nEMPTY=Vazio\n\n#XFLD: None\nNONE=Nenhum\n\n#XFLD\nNO_WORKLIST=Nenhuma lista de trabalho dispon\\u00EDvel\n\n#XFLD\nNO_FAVORITE=Nenhum favorito dispon\\u00EDvel\n\n# XTIT: Select\nSELECT=Selecionar {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Selecionar\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Procurar...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Horas\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutos\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, AAAA\n\n#XBUT:\nDETAIL=Detalhes\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Configura\\u00E7\\u00F5es\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Os dados n\\u00E3o gravados ser\\u00E3o rejeitados. Continuar?\n\n# XTIT: \nUNSAVED_CHANGES=Modifica\\u00E7\\u00F5es n\\u00E3o gravadas\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Solicita\\u00E7\\u00E3o enviada.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Insira um nome de favorito no campo de entrada Atribui\\u00E7\\u00E3o de tempo.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Efetue entradas para gravar como favoritos.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Insira uma dura\\u00E7\\u00E3o v\\u00E1lida.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Insira hora de in\\u00EDcio e hora final v\\u00E1lidas.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Esbo\\u00E7o gravado com \\u00EAxito.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorito criado.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorito atualizado.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorito exclu\\u00EDdo.\n\n#XBUT:\nHELP=Ajuda\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} horas inseridas para essa semana\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Ativar Predefinir para inserir automaticamente as horas para semana com base em sua \\u00FAltima entrada.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Algumas entradas est\\u00E3o incorretas. Verifique detalhes de erro e corrija as entradas.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Entrada de tempos para {0} e {1} mais dia(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editar registro de tempos\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Entrada de tempo para {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} horas e {1} minutos\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Reinicializar\n\n#XBUT: Button to update\nUPDATE=Atualizar\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Ins.favorito\n\n#XBUT: Button to create\nCREATE=Criar\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nome do favorito atual\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nome de novo favorito\n\n#XTIT: time\nTIME=Hora\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Solicita\\u00E7\\u00E3o exclu\\u00EDda\n\n#XTIT:\nWARNING=Advert\\u00EAncia\n',
	"hcm/mytimesheet/i18n/i18n_ro.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Alege\\u0163i un contract de munc\\u0103\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contracte de munc\\u0103\n\n#XFLD: label for from time\nFROM=De la\n\n#XFLD: label for to time\nTO=P\\u00E2n\\u0103 la\n\n#XBUT: Button to cancel\nCANCEL=Anulare\n\n#XBUT: Button to close popover\nCLOSE=\\u00CEnchidere\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Nu\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Salvare versiune preliminar\\u0103\n\n# XTIT: \nTIMESHEET_TITLE=Fi\\u015Fa mea de timp\n\n#XTIT:\nINTERNAL_ERROR=Eroare intern\\u0103\n\n#XTIT:\nERROR=Eroare\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u00CEn aplica\\u0163ie a ap\\u0103rut o eroare intern\\u0103 aferent\\u0103 pt.tratare erori.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u015Etergere favorite\n\n# XTIT: \nTIMESHEET=Intr\\u0103ri fi\\u015F\\u0103 de timp\n\n#XBUT: Button for quick entry\nQUICK_FILL=Intrare rapid\\u0103\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Aplicare la\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalii\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Creare intrare de timp\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Creare intrare pt. {0} zile\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalii pt.intrare\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalii intrare pt. {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Creare intrare pt. {0} \n\n# XTIT: Month short header\nMONTH_0=Ian\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Martie\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Iun\n# XTIT: Month short header\nMONTH_6=Iul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Ianuarie\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februarie\n# XTIT: Month title for calendar\nMONTH_FULL_2=Martie\n# XTIT: Month title for calendar\nMONTH_FULL_3=Aprilie\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Iunie\n# XTIT: Month title for calendar\nMONTH_FULL_6=Iulie\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septembrie\n# XTIT: Month title for calendar\nMONTH_FULL_9=Octombrie\n# XTIT: Month title for calendar\nMONTH_FULL_10=Noiembrie\n# XTIT: Month title for calendar\nMONTH_FULL_11=Decembrie\n\n# XTIT: Legend missing day\nMISSING_DAY=Ac\\u0163iune necesar\\u0103\n# XTIT: Legend filled day\nFILLED_DAY=Efectuat\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Ac\\u0163iune aprobator este necesar\\u0103\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Respins\n# XFLD: Legend future working day\nWORKING_DAY=Zi lucr\\u0103toare\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Zi nelucr\\u0103toare\n# XFLD: Legend selected working day\nSELECTED_DAY=Zi selectat\\u0103\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Zi nelucr\\u0103toare selectat\\u0103\n# XFLD: Legend current day\nCURRENT_DAY=Zi curent\\u0103\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total ore necompletate\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} ore)\n\n#XBUT: Button\nSAVE=Salvare\n\n#XBUT: Button \nSUBMIT=Transmitere\n\n# XMSG\nFILL_ALL=Introduce\\u0163i {0} ore pt. \\:\n\n#XFLD\nNO_TASK_TYPE=Niciun tip de sarcin\\u0103\n\n#XFLD\nMISSING_DAYS=Zile necompletate\\: {0}\n\n#XBUT: Button\nHOME=Pagin\\u0103 ini\\u0163ial\\u0103\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmare\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmare \\u015Ftergere\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmare transmitere\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmare versiune preliminar\\u0103\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Rezumat intr\\u0103ri de timp selectate pt.\\u015Ftergere\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Rezumat intr\\u0103ri de timp selectate pt.transmitere\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Rezumat intr\\u0103ri de timp selectate\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Num\\u0103r de intr\\u0103ri\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Num\\u0103r de ore\n\n#XBUT: Confirm Button\nCONFIRM=Confirmare\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} or\\u0103\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} ore\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} or\\u0103 / {1} ore\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} ore / {1} ore\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0162int\\u0103\\: {0} ore \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} aloc\\u0103ri de timp\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 alocare de timp\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=F\\u0103r\\u0103 aloc\\u0103ri\n\n#XMSG: No Recordings\nNO_RECORDING=F\\u0103r\\u0103 \\u00EEnregistr\\u0103ri\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} ore aprobate\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Salvare cu timp\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Salvare f\\u0103r\\u0103 timp\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u015Etergere favorite\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Salvare ca favorit\\u0103\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gestionare favorite\n\n#XFLD: Week \nWEEK=S\\u0103pt\\u0103m\\u00E2n\\u0103\n\n#XFLD:\nMEET_TARGET_HOURS=Aplicare ore la\\:\n\n#XBUT\nALL_MISSING=Tot timpul lips\\u0103 ({0} ore)\n\n#XBUT: Delete Button Text\nDELETE=\\u015Etergere\n\n#XBUT: Copy Button Text\nCOPY=Copiere\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Ad\\u0103ugare intrare\n\n#XFLD: label for duration\nDURATION=Durat\\u0103\n\n#XFLD: label for total duration\nTOTAL_DURATION=Durat\\u0103 total\\u0103\n\n#XFLD: label for status\nSTATUS=Stare\n\n#XFLD: label for start time\nSTART_TIME=Or\\u0103 de \\u00EEnceput\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nume favorit\\u0103\n\n#XFLD: label for end Time\nEND_TIME=Or\\u0103 de sf\\u00E2r\\u015Fit\n\n#XFLD: label for note\nNOTE=Not\\u0103\n\n#XBUT: Done button\nDONE=Efectuat\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Editare intrare\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Alocare timp\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Selectare favorit\\u0103 sau list\\u0103 de lucru\n\n# XTIT: select worklist\nSELECT_WORKLIST=Selectare list\\u0103 de lucru\n\n# XTIT: Favorite\nFAVORITE=Favorite\n\n# XTIT: Worklist\nWORKLIST=List\\u0103 de lucru\n\n# XTIT: Add Favorite\nADD_FAVORITE=Ad\\u0103ugare favorit\\u0103\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Editare favorite\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u00CEnc\\u0103rcare mai mult...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u00CEnc\\u0103rcare ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuare c\\u0103utare pe server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u00CEnc\\u0103rcare ...\n\n#XFLD: BLANK\nEMPTY=Gol\n\n#XFLD: None\nNONE=Nimic\n\n#XFLD\nNO_WORKLIST=Nicio list\\u0103 de lucru disponibil\\u0103\n\n#XFLD\nNO_FAVORITE=F\\u0103r\\u0103 favorite disponibile\n\n# XTIT: Select\nSELECT=Selectare {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Selectare\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=C\\u0103utare...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Ore\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minute\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, AAAA\n\n#XBUT:\nDETAIL=Detalii\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Set\\u0103ri\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Orice date nesalvate vor fi respinse. Sigur dori\\u0163i s\\u0103 continua\\u0163i?\n\n# XTIT: \nUNSAVED_CHANGES=Modific\\u0103ri nesalvate\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Cerere a fost transmis\\u0103.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Introduce\\u0163i un nume de favorit\\u0103 \\u00EEn c\\u00E2mpul de intrare Alocare timp.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Efectua\\u0163i intr\\u0103ri de arhivat ca favorita dvs.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Introduce\\u0163i o durat\\u0103 valabil\\u0103.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Introduce\\u0163i o or\\u0103 valabil\\u0103 de \\u00EEnceput \\u015Fi de sf\\u00E2r\\u015Fit.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Versiune preliminar\\u0103 a fost salvat\\u0103 cu succes.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorita a fost creat\\u0103.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorita a fost actualizat\\u0103.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorita a fost \\u015Ftears\\u0103.\n\n#XBUT:\nHELP=Ajutor\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} ore introduse pt. aceast\\u0103 s\\u0103pt\\u0103m\\u00E2n\\u0103\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Activa\\u0163i completare preliminar\\u0103 pt.a popula rapid orele pt.s\\u0103pt\\u0103m\\u00E2n\\u0103 bazate pe ultima dvs.intrare reu\\u015Fit\\u0103.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Unele intr\\u0103ri sunt incorecte. Revizui\\u0163i detaliile de eroare \\u015Fi corecta\\u0163i intr\\u0103rile.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Intrare timp pt. {0} \\u015Fi \\u00EEnc\\u0103 {1} zi(le)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editare intrare de timp\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Intrare timp pt. {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} ore {1} minute\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Resetare\n\n#XBUT: Button to update\nUPDATE=Actualizare\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Ad\\u0103ugare favorit\\u0103\n\n#XBUT: Button to create\nCREATE=Creare\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nume curent de favorit\\u0103\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nume nou de favorit\\u0103\n\n#XTIT: time\nTIME=Or\\u0103\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Cerere \\u015Ftears\\u0103\n\n#XTIT:\nWARNING=Avertizare\n',
	"hcm/mytimesheet/i18n/i18n_ru.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0442\\u0440\\u0443\\u0434\\u043E\\u0432\\u043E\\u0439 \\u0434\\u043E\\u0433\\u043E\\u0432\\u043E\\u0440\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u0422\\u0440\\u0443\\u0434\\u043E\\u0432\\u044B\\u0435 \\u0434\\u043E\\u0433\\u043E\\u0432\\u043E\\u0440\\u044B\n\n#XFLD: label for from time\nFROM=\\u0421\n\n#XFLD: label for to time\nTO=\\u041F\\u043E\n\n#XBUT: Button to cancel\nCANCEL=\\u041E\\u0442\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C\n\n#XBUT: Button to close popover\nCLOSE=\\u0417\\u0430\\u043A\\u0440\\u044B\\u0442\\u044C\n\n#XBUT: Button to accept\nOK=\\u041E\\u041A\n\n#XBUT: Button to affirm\nYES=\\u0414\\u0430\n\n#XBUT: Button to decline\nNO=\\u041D\\u0435\\u0442\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A\n\n# XTIT: \nTIMESHEET_TITLE=\\u041C\\u043E\\u0439 \\u0442\\u0430\\u0431\\u0435\\u043B\\u044C\n\n#XTIT:\nINTERNAL_ERROR=\\u0412\\u043D\\u0443\\u0442\\u0440\\u0435\\u043D\\u043D\\u044F\\u044F \\u043E\\u0448\\u0438\\u0431\\u043A\\u0430\n\n#XTIT:\nERROR=\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u0412 \\u043F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0438 \\u0432\\u043E\\u0437\\u043D\\u0438\\u043A\\u043B\\u0430 \\u0432\\u043D\\u0443\\u0442\\u0440\\u0435\\u043D\\u043D\\u044F\\u044F \\u043E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u0432 \\u0441\\u0432\\u044F\\u0437\\u0438 \\u0441 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u043E\\u0439 \\u043E\\u0448\\u0438\\u0431\\u043E\\u043A\n\n# XTIT:\nFAV_DIALOG_BOX=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n# XTIT: \nTIMESHEET=\\u0417\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0432 \\u0442\\u0430\\u0431\\u0435\\u043B\\u0435\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u0411\\u044B\\u0441\\u0442\\u0440\\u044B\\u0439 \\u0432\\u0432\\u043E\\u0434\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u041F\\u0440\\u0438\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C \\u043A\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0434\\u043B\\u044F {0} \\u0434\\u043D.\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\\u0441\\u0442\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0434\\u043B\\u044F {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0434\\u043B\\u044F {0}\n\n# XTIT: Month short header\nMONTH_0=\\u042F\\u043D\\u0432\n# XTIT: Month short header\nMONTH_1=\\u0424\\u0435\\u0432\n# XTIT: Month short header\nMONTH_2=\\u041C\\u0430\\u0440\n# XTIT: Month short header\nMONTH_3=\\u0410\\u043F\\u0440\n# XTIT: Month short header\nMONTH_4=\\u041C\\u0430\\u0439\n# XTIT: Month short header\nMONTH_5=\\u0418\\u044E\\u043D\n# XTIT: Month short header\nMONTH_6=\\u0418\\u044E\\u043B\n# XTIT: Month short header\nMONTH_7=\\u0410\\u0432\\u0433\n# XTIT: Month short header\nMONTH_8=\\u0421\\u0435\\u043D\n# XTIT: Month short header\nMONTH_9=\\u041E\\u043A\\u0442\n# XTIT: Month short header\nMONTH_10=\\u041D\\u043E\\u044F\n# XTIT: Month short header\nMONTH_11=\\u0414\\u0435\\u043A\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u042F\\u043D\\u0432\\u0430\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u0424\\u0435\\u0432\\u0440\\u0430\\u043B\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u041C\\u0430\\u0440\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u0410\\u043F\\u0440\\u0435\\u043B\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u041C\\u0430\\u0439\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u0418\\u044E\\u043D\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u0418\\u044E\\u043B\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u0410\\u0432\\u0433\\u0443\\u0441\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u0421\\u0435\\u043D\\u0442\\u044F\\u0431\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u041E\\u043A\\u0442\\u044F\\u0431\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u041D\\u043E\\u044F\\u0431\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u0414\\u0435\\u043A\\u0430\\u0431\\u0440\\u044C\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u0442\\u0441\\u044F \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435\n# XTIT: Legend filled day\nFILLED_DAY=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u0442\\u0441\\u044F \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435 \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0430\\u044E\\u0449\\u0435\\u0433\\u043E\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\n# XFLD: Legend future working day\nWORKING_DAY=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u041D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u0412\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u0412\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend current day\nCURRENT_DAY=\\u0422\\u0435\\u043A\\u0443\\u0449\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u041E\\u0431\\u0449\\u0435\\u0435 \\u043A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0447\\u0430\\u0441\\u043E\\u0432 \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u0447)\n\n#XBUT: Button\nSAVE=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C\n\n#XBUT: Button \nSUBMIT=\\u041E\\u0442\\u043F\\u0440\\u0430\\u0432\\u0438\\u0442\\u044C\n\n# XMSG\nFILL_ALL=\\u0412\\u0432\\u0435\\u0441\\u0442\\u0438 {0} \\u0447 \\u0434\\u043B\\u044F\\:\n\n#XFLD\nNO_TASK_TYPE=\\u041D\\u0435\\u0442 \\u0442\\u0438\\u043F\\u0430 \\u0437\\u0430\\u0434\\u0430\\u0447\n\n#XFLD\nMISSING_DAYS=\\u0414\\u043D\\u0438 \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F\\: {0}\n\n#XBUT: Button\nHOME=\\u0414\\u043E\\u043C\\u043E\\u0439\n\n#XTIT: confirmation header\nCONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u0435\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043A\\u0443\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u044F\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043A\\u0438\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0447\\u0430\\u0441\\u043E\\u0432\n\n#XBUT: Confirm Button\nCONFIRM=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u0447.\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u0447.\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u0447 / {1} \\u0447\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u0447 / {1} \\u0447\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0426\\u0435\\u043B\\u044C\\: {0} \\u0447. \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u043F\\u0440\\u0438\\u0441\\u0432. \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=\\u041E\\u0434\\u043D\\u043E \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u041D\\u0435\\u0442 \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0439\n\n#XMSG: No Recordings\nNO_RECORDING=\\u041D\\u0435\\u0442 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u0447. \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u043E\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0441\\u043E \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0435\\u043C\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0431\\u0435\\u0437 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0432 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u043C\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u0423\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0438\\u0435 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u043C\n\n#XFLD: Week \nWEEK=\\u041D\\u0435\\u0434\\u0435\\u043B\\u044F\n\n#XFLD:\nMEET_TARGET_HOURS=\\u041F\\u0440\\u0438\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C \\u0447\\u0430\\u0441\\u044B \\u043A\\:\n\n#XBUT\nALL_MISSING=\\u0412\\u0441\\u0435 \\u0432\\u0440\\u0435\\u043C\\u044F \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F ({0} \\u0447)\n\n#XBUT: Delete Button Text\nDELETE=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C\n\n#XBUT: Copy Button Text\nCOPY=\\u0421\\u043A\\u043E\\u043F\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C\n\n#XFLD: label for duration\nDURATION=\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u041E\\u0431\\u0449\\u0430\\u044F \\u043F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\n\n#XFLD: label for status\nSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441\n\n#XFLD: label for start time\nSTART_TIME=\\u0412\\u0440\\u0435\\u043C\\u044F \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u0418\\u043C\\u044F \\u044D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442\\u0430 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\n\n#XFLD: label for end Time\nEND_TIME=\\u0412\\u0440\\u0435\\u043C\\u044F \\u043E\\u043A\\u043E\\u043D\\u0447\\u0430\\u043D\\u0438\\u044F\n\n#XFLD: label for note\nNOTE=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435\n\n#XBUT: Done button\nDONE=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u0412\\u0440\\u0443\\u0447\\u043D\\u0443\\u044E\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435 \\u0438\\u043B\\u0438 \\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\n\n# XTIT: Favorite\nFAVORITE=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n# XTIT: Worklist\nWORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u0435\\u0449\\u0435...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430 ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C \\u043F\\u043E\\u0438\\u0441\\u043A \\u043D\\u0430 \\u0441\\u0435\\u0440\\u0432\\u0435\\u0440\\u0435...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430 ...\n\n#XFLD: BLANK\nEMPTY=\\u041F\\u0443\\u0441\\u0442\\u043E\n\n#XFLD: None\nNONE=\\u041D\\u0435\\u0442\n\n#XFLD\nNO_WORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u0435\\u043D\n\n#XFLD\nNO_FAVORITE=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u043E\n\n# XTIT: Select\nSELECT=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u041F\\u043E\\u0438\\u0441\\u043A...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u0447\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u043C\\u0438\\u043D\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u0427\\u0430\\u0441\\u044B\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u041C\\u0438\\u043D\\u0443\\u0442\\u044B\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u041D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0438\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u0412\\u0441\\u0435 \\u043D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0435 \\u0431\\u0443\\u0434\\u0443\\u0442 \\u043F\\u043E\\u0442\\u0435\\u0440\\u044F\\u043D\\u044B. \\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C?\n\n# XTIT: \nUNSAVED_CHANGES=\\u041D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0438\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0438\\u044F\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043F\\u0435\\u0440\\u0435\\u0434\\u0430\\u043D\\u0430\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0432 \\u043F\\u043E\\u043B\\u0435 \\u0432\\u0432\\u043E\\u0434\\u0430 \\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u0417\\u0430\\u043F\\u043E\\u043B\\u043D\\u0438\\u0442\\u0435 \\u043F\\u043E\\u043B\\u044F \\u0434\\u043B\\u044F \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0438\\u044F \\u0432 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u043C\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u0443\\u044E \\u043F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0435 \\u0432\\u0440\\u0435\\u043C\\u044F \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430 \\u0438 \\u043E\\u043A\\u043E\\u043D\\u0447\\u0430\\u043D\\u0438\\u044F\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u0427\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\n\n#XBUT:\nHELP=\\u0421\\u043F\\u0440\\u0430\\u0432\\u043A\\u0430\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u0447 \\u0432\\u0432\\u0435\\u0434\\u0435\\u043D\\u043E \\u0434\\u043B\\u044F \\u044D\\u0442\\u043E\\u0439 \\u043D\\u0435\\u0434\\u0435\\u043B\\u0438.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u0412\\u043A\\u043B\\u044E\\u0447\\u0438\\u0442\\u044C \\u0430\\u0432\\u0442\\u043E\\u0437\\u0430\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u0438\\u0435 \\u0434\\u043B\\u044F \\u0431\\u044B\\u0441\\u0442\\u0440\\u043E\\u0433\\u043E \\u0437\\u0430\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u0438\\u044F \\u0447\\u0430\\u0441\\u043E\\u0432 \\u0434\\u043B\\u044F \\u043D\\u0435\\u0434\\u0435\\u043B\\u0438 \\u043D\\u0430 \\u043E\\u0441\\u043D\\u043E\\u0432\\u0435 \\u043F\\u043E\\u0441\\u043B\\u0435\\u0434\\u043D\\u0438\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u041D\\u0435\\u043A\\u043E\\u0442\\u043E\\u0440\\u044B\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u043D\\u0435\\u043A\\u043E\\u0440\\u0440\\u0435\\u043A\\u0442\\u043D\\u044B. \\u0418\\u0437\\u0443\\u0447\\u0438\\u0442\\u0435 \\u0441\\u0432\\u0435\\u0434\\u0435\\u043D\\u0438\\u044F \\u043E\\u0431 \\u043E\\u0448\\u0438\\u0431\\u043A\\u0435 \\u0438 \\u0438\\u0441\\u043F\\u0440\\u0430\\u0432\\u044C\\u0442\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F {0} \\u043F\\u043B\\u044E\\u0441 {1} \\u0434\\u043D.\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\\u0438\\u043D.\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\\u0438\\u043D.\n\n#XBUT: Button to reset\nRESET=\\u0421\\u0431\\u0440\\u043E\\u0441\\u0438\\u0442\\u044C\n\n#XBUT: Button to update\nUPDATE=\\u041E\\u0431\\u043D\\u043E\\u0432\\u0438\\u0442\\u044C\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n#XBUT: Button to create\nCREATE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u0422\\u0435\\u043A\\u0443\\u0449\\u0435\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u041D\\u043E\\u0432\\u043E\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\n\n#XTIT: time\nTIME=\\u0412\\u0440\\u0435\\u043C\\u044F\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u0417\\u0430\\u043F\\u0440\\u043E\\u0441 \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\n\n#XTIT:\nWARNING=\\u041F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n',
	"hcm/mytimesheet/i18n/i18n_sh.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Izaberite ugovor o radu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Ugovori o radu\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Odustani\n\n#XBUT: Button to close popover\nCLOSE=Zatvori\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Sa\\u010Duvaj nacrt\n\n# XTIT: \nTIMESHEET_TITLE=Moja lista radnog vremena\n\n#XTIT:\nINTERNAL_ERROR=Interna gre\\u0161ka\n\n#XTIT:\nERROR=Gre\\u0161ka\n\n#XFLD:\nINTERNAL_ERROR_BODY=Interna gre\\u0161ka povezana sa obradom gre\\u0161aka pojavila se u aplikaciji.\n\n# XTIT:\nFAV_DIALOG_BOX=Izbri\\u0161i omiljene\n\n# XTIT: \nTIMESHEET=Unosi liste radnog vremena\n\n#XBUT: Button for quick entry\nQUICK_FILL=Brzi unos\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Primeni na\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalji\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Kreiraj vremenski unos\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Kreirajte unos za {0} dana\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalji unosa\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalji unosa za {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Kreirajte unos za {0} \n\n# XTIT: Month short header\nMONTH_0=Januar\n# XTIT: Month short header\nMONTH_1=Februar\n# XTIT: Month short header\nMONTH_2=Mart\n# XTIT: Month short header\nMONTH_3=April\n# XTIT: Month short header\nMONTH_4=Maj\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Avgust\n# XTIT: Month short header\nMONTH_8=Septembar\n# XTIT: Month short header\nMONTH_9=Oktobar\n# XTIT: Month short header\nMONTH_10=Novembar\n# XTIT: Month short header\nMONTH_11=Decembar\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mart\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Jun\n# XTIT: Month title for calendar\nMONTH_FULL_6=Jul\n# XTIT: Month title for calendar\nMONTH_FULL_7=Avgust\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septembar\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktobar\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembar\n# XTIT: Month title for calendar\nMONTH_FULL_11=Decembar\n\n# XTIT: Legend missing day\nMISSING_DAY=Potrebna je radnja\n# XTIT: Legend filled day\nFILLED_DAY=Izvr\\u0161eno\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Potrebna je radnja davaoca odobrenja\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Odbijeno\n# XFLD: Legend future working day\nWORKING_DAY=Radni dan\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Neradni dan\n# XFLD: Legend selected working day\nSELECTED_DAY=Odabrani dan\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Odabrani neradni dan\n# XFLD: Legend current day\nCURRENT_DAY=Teku\\u0107i dan\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Ukupno sati koji nedostaju\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} sati)\n\n#XBUT: Button\nSAVE=Sa\\u010Duvaj\n\n#XBUT: Button \nSUBMIT=Podnesi\n\n# XMSG\nFILL_ALL=Unesite {0} sati za\\:\n\n#XFLD\nNO_TASK_TYPE=Nema tipa zadatka\n\n#XFLD\nMISSING_DAYS=Dani koji nedostaju\\: {0}\n\n#XBUT: Button\nHOME=Po\\u010Detna stranica\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrda\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdi brisanje\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdi podno\\u0161enje\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdi nacrt\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Rezime vremenskih unosa odabranih za brisanje\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Rezime vremenskih unosa odabranih za podno\\u0161enje\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Rezime odabranih vremenskih unosa\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Broj unosa\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Broj sati\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdi\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} sat\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} sati\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} sat / {1} sati\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} sati / {1} sati\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cilj\\: {0} sati \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} dodele vremena\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 dodela vremena\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nema dodela\n\n#XMSG: No Recordings\nNO_RECORDING=Nema zapisa\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} sati odobreno\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Sa\\u010Duvati sa vremenom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Sa\\u0107uvati bez vremena\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Izbri\\u0161i omiljene\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Sa\\u010Duvaj kao omiljeni\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Upravljaj omiljenima\n\n#XFLD: Week \nWEEK=Nedelja\n\n#XFLD:\nMEET_TARGET_HOURS=Primeni sate na\\:\n\n#XBUT\nALL_MISSING=Sve vreme koje nedostaje ({0} sati)\n\n#XBUT: Delete Button Text\nDELETE=Izbri\\u0161i\n\n#XBUT: Copy Button Text\nCOPY=Kopiraj\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodaj unos\n\n#XFLD: label for duration\nDURATION=Trajanje\n\n#XFLD: label for total duration\nTOTAL_DURATION=Ukupno trajanje\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Vreme po\\u010Detka\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Naziv omiljenog\n\n#XFLD: label for end Time\nEND_TIME=Vreme zavr\\u0161etka\n\n#XFLD: label for note\nNOTE=Bele\\u0161ka\n\n#XBUT: Done button\nDONE=Izvr\\u0161eno\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Ru\\u010Dno\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Uredi unos\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Dodela vremena\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Odaberi omiljene ili radnu listu\n\n# XTIT: select worklist\nSELECT_WORKLIST=Odaberi radnu listu\n\n# XTIT: Favorite\nFAVORITE=Omiljeni\n\n# XTIT: Worklist\nWORKLIST=Radna lista\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodaj omiljene\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Uredi omiljene\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=U\\u010Ditaj vi\\u0161e...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=U\\u010Ditavanje ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Nastavi tra\\u017Eenje na serveru...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=U\\u010Ditavanje ...\n\n#XFLD: BLANK\nEMPTY=Prazno\n\n#XFLD: None\nNONE=Nijedan\n\n#XFLD\nNO_WORKLIST=Radne liste nisu dostupne\n\n#XFLD\nNO_FAVORITE=Omiljeni nisu dostupni\n\n# XTIT: Select\nSELECT=Odaberite {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Odaberi\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Tra\\u017Eenje...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Sati\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuti\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD. MMM YYYY.\n\n#XBUT:\nDETAIL=Detalji\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Pode\\u0161avanja\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Svi nesa\\u010Duvani podaci \\u0107e biti odba\\u010Deni. Da li sigurno \\u017Eelite da nastavite?\n\n# XTIT: \nUNSAVED_CHANGES=Nesa\\u010Duvane promene\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Zahtev je podnet.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Unesite naziv omiljenog u polje unosa dodele vremena.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Napravite unose koje \\u0107ete snimiti kao omiljene.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Unesite va\\u017Ee\\u0107e trajanje.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Unesite va\\u017Ee\\u0107e vreme po\\u010Detka i zavr\\u0161etka.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Nacrt je uspe\\u0161no sa\\u010Duvan.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Omiljeni je kreiran.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Omiljeni je a\\u017Euriran.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Omiljeni je izbrisan.\n\n#XBUT:\nHELP=Pomo\\u0107\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} sati uneti za ovu nedelju\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Uklju\\u010Dite prethodno popunjavanje za brzo popunjavanje sati za nedelju na osnovu poslednjeg uspe\\u0161nog unosa.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Neki unosi su neta\\u010Dni. Proverite detalje gre\\u0161ke i ispravite unose.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Unos vremena za {0} i {1} vi\\u0161e dan(a)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Uredi vremenski unos\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Unos vremena za {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} sati {1} minuti\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} s {1} m\n\n#XBUT: Button to reset\nRESET=Ponovo postavi\n\n#XBUT: Button to update\nUPDATE=A\\u017Euriraj\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodaj omiljene\n\n#XBUT: Button to create\nCREATE=Kreiraj\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Trenutni naziv omiljenog\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Novi naziv omiljenog\n\n#XTIT: time\nTIME=Vreme\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Zahtev izbrisan\n\n#XTIT:\nWARNING=Upozorenje\n',
	"hcm/mytimesheet/i18n/i18n_sk.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Vyberte pracovn\\u00FA zmluvu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Pracovn\\u00E9 zmluvy\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Zru\\u0161i\\u0165\n\n#XBUT: Button to close popover\nCLOSE=Zavrie\\u0165\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u00C1no\n\n#XBUT: Button to decline\nNO=Nie\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Ulo\\u017Ei\\u0165 n\\u00E1vrh\n\n# XTIT: \nTIMESHEET_TITLE=Moja evidencia \\u010Dasu\n\n#XTIT:\nINTERNAL_ERROR=Intern\\u00E1 chyba\n\n#XTIT:\nERROR=Chyba\n\n#XFLD:\nINTERNAL_ERROR_BODY=V aplik\\u00E1cii sa vyskytla intern\\u00E1 chyba s\\u00FAvisiaca so spracovan\\u00EDm chyby.\n\n# XTIT:\nFAV_DIALOG_BOX=Vymaza\\u0165 ob\\u013E\\u00FAben\\u00E9\n\n# XTIT: \nTIMESHEET=Z\\u00E1znamy evidencie \\u010Dasu\n\n#XBUT: Button for quick entry\nQUICK_FILL=R\\u00FDchly z\\u00E1znam\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Pou\\u017Ei\\u0165 na\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detaily\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Vytvori\\u0165 \\u010Dasov\\u00FD z\\u00E1znam\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Vytvori\\u0165 z\\u00E1znam pre {0} dn\\u00ED\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detaily z\\u00E1znamu\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detaily z\\u00E1znamu pre {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Vytvori\\u0165 z\\u00E1znam pre {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=M\\u00E1j\n# XTIT: Month short header\nMONTH_5=J\\u00FAn\n# XTIT: Month short header\nMONTH_6=J\\u00FAl\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janu\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febru\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marec\n# XTIT: Month title for calendar\nMONTH_FULL_3=Apr\\u00EDl\n# XTIT: Month title for calendar\nMONTH_FULL_4=M\\u00E1j\n# XTIT: Month title for calendar\nMONTH_FULL_5=J\\u00FAn\n# XTIT: Month title for calendar\nMONTH_FULL_6=J\\u00FAl\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Okt\\u00F3ber\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Vy\\u017Eaduje sa akcia\n# XTIT: Legend filled day\nFILLED_DAY=Hotovo\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Vy\\u017Eaduje sa akcia schva\\u013Eovate\\u013Ea\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Zamietnut\\u00E9\n# XFLD: Legend future working day\nWORKING_DAY=Pracovn\\u00FD de\\u0148\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Nepracovn\\u00FD de\\u0148\n# XFLD: Legend selected working day\nSELECTED_DAY=Vybran\\u00FD de\\u0148\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Vybran\\u00FD nepracovn\\u00FD de\\u0148\n# XFLD: Legend current day\nCURRENT_DAY=Aktu\\u00E1lny de\\u0148\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=S\\u00FA\\u010Det ch\\u00FDbaj\\u00FAcich hod\\u00EDn\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hod\\u00EDn)\n\n#XBUT: Button\nSAVE=Ulo\\u017Ei\\u0165\n\n#XBUT: Button \nSUBMIT=Odosla\\u0165\n\n# XMSG\nFILL_ALL=Zada\\u0165 {0} hod\\u00EDn pre\\:\n\n#XFLD\nNO_TASK_TYPE=\\u017Diadny typ \\u00FAlohy\n\n#XFLD\nMISSING_DAYS=Ch\\u00FDbaj\\u00FAce dni\\: {0}\n\n#XBUT: Button\nHOME=Domovsk\\u00E1 str\\u00E1nka\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrdenie\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdi\\u0165 odstr\\u00E1nenie\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdi\\u0165 odoslanie\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdi\\u0165 n\\u00E1vrh\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Preh\\u013Ead \\u010Dasov\\u00FDch z\\u00E1znamov vybrat\\u00FDch na odstr\\u00E1nenie\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Preh\\u013Ead \\u010Dasov\\u00FDch z\\u00E1znamov vybrat\\u00FDch na odoslanie\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Preh\\u013Ead vybrat\\u00FDch \\u010Dasov\\u00FDch z\\u00E1znamov\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Po\\u010Det z\\u00E1znamov\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Po\\u010Det hod\\u00EDn\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdi\\u0165\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} hodina\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} hod\\u00EDn\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hodina / {1} hod\\u00EDn\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} hod\\u00EDn / {1} hod\\u00EDn\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cie\\u013E\\: {0} hod\\u00EDn \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} priraden\\u00ED \\u010Dasu\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 priradenie \\u010Dasu\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u017Diadne priradenia\n\n#XMSG: No Recordings\nNO_RECORDING=\\u017Diadne z\\u00E1znamy\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} schv\\u00E1len\\u00FDch hod\\u00EDn\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Ulo\\u017Ei\\u0165 s \\u010Dasom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ulo\\u017Ei\\u0165 bez \\u010Dasu\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Vymaza\\u0165 ob\\u013E\\u00FAben\\u00E9\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ulo\\u017Ei\\u0165 ako ob\\u013E\\u00FAben\\u00FA polo\\u017Eku\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Spr\\u00E1va ob\\u013E\\u00FAben\\u00FDch\n\n#XFLD: Week \nWEEK=T\\u00FD\\u017Ede\\u0148\n\n#XFLD:\nMEET_TARGET_HOURS=Pou\\u017Ei\\u0165 hodiny na\\:\n\n#XBUT\nALL_MISSING=V\\u0161etok ch\\u00FDbaj\\u00FAci \\u010Das ({0} hod\\u00EDn)\n\n#XBUT: Delete Button Text\nDELETE=Odstr\\u00E1ni\\u0165\n\n#XBUT: Copy Button Text\nCOPY=Kop\\u00EDrova\\u0165\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Prida\\u0165 z\\u00E1znam\n\n#XFLD: label for duration\nDURATION=Trvanie\n\n#XFLD: label for total duration\nTOTAL_DURATION=Celkov\\u00E9 trvanie\n\n#XFLD: label for status\nSTATUS=Stav\n\n#XFLD: label for start time\nSTART_TIME=\\u010Cas za\\u010Diatku\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=N\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky\n\n#XFLD: label for end Time\nEND_TIME=\\u010Cas ukon\\u010Denia\n\n#XFLD: label for note\nNOTE=Pozn\\u00E1mka\n\n#XBUT: Done button\nDONE=Hotovo\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manu\\u00E1lne\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Upravi\\u0165 z\\u00E1znam\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Priradenie \\u010Dasu\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Vybra\\u0165 ob\\u013E\\u00FAben\\u00E9 alebo z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: select worklist\nSELECT_WORKLIST=Vybra\\u0165 z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: Favorite\nFAVORITE=Ob\\u013E\\u00FAben\\u00E9\n\n# XTIT: Worklist\nWORKLIST=Z\\u00E1soba pr\\u00E1ce\n\n# XTIT: Add Favorite\nADD_FAVORITE=Prida\\u0165 ob\\u013E\\u00FAben\\u00FA polo\\u017Eku\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Upravi\\u0165 ob\\u013E\\u00FAben\\u00E9\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Na\\u010D\\u00EDta\\u0165 viac...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Na\\u010D\\u00EDtava sa ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Pokra\\u010Dova\\u0165 v h\\u013Eadan\\u00ED na serveri...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Na\\u010D\\u00EDtava sa ...\n\n#XFLD: BLANK\nEMPTY=Pr\\u00E1zdne\n\n#XFLD: None\nNONE=\\u017Diadne\n\n#XFLD\nNO_WORKLIST=Nie je k dispoz\\u00EDcii \\u017Eiadna z\\u00E1soba pr\\u00E1ce\n\n#XFLD\nNO_FAVORITE=Nie s\\u00FA k dispoz\\u00EDcii \\u017Eiadne ob\\u013E\\u00FAben\\u00E9 polo\\u017Eky\n\n# XTIT: Select\nSELECT=Vybra\\u0165 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Vybra\\u0165\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=H\\u013Eadanie...\n\n#XFLD: short label for hours\nHOURS_LABEL=hod\n\n#XFLD: short label for minutes\nMINUTES_LABEL=min\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Hodiny\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Min\\u00FAty\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, RRRR\n\n#XBUT:\nDETAIL=Detaily\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Nastavenia\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=V\\u0161etky neulo\\u017Een\\u00E9 d\\u00E1ta sa zru\\u0161ia. Naozaj chcete pokra\\u010Dova\\u0165?\n\n# XTIT: \nUNSAVED_CHANGES=Neulo\\u017Een\\u00E9 zmeny\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Po\\u017Eiadavka bola odoslan\\u00E1.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Zadajte n\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky do vstupn\\u00E9ho po\\u013Ea priradenia \\u010Dasu.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Vykonajte z\\u00E1znamy, ktor\\u00E9 chcete ulo\\u017Ei\\u0165 ako ob\\u013E\\u00FAben\\u00E9 polo\\u017Eky.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Zadajte platn\\u00FA dobu trvania.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Zadajte platn\\u00FD \\u010Das za\\u010Diatku a ukon\\u010Denia.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=N\\u00E1vrh bol \\u00FAspe\\u0161ne ulo\\u017Een\\u00FD.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Ob\\u013E\\u00FAben\\u00E1 polo\\u017Eka bola vytvoren\\u00E1.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Ob\\u013E\\u00FAben\\u00E1 polo\\u017Eka bola aktualizovan\\u00E1.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Ob\\u013E\\u00FAben\\u00E1 polo\\u017Eka bola vymazan\\u00E1.\n\n#XBUT:\nHELP=N\\u00E1pove\\u010F\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hod\\u00EDn zadan\\u00FDch pre tento t\\u00FD\\u017Ede\\u0148\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Zapnite automatick\\u00E9 vyplnenie, aby sa r\\u00FDchlo doplnili hodiny pre dan\\u00FD t\\u00FD\\u017Ede\\u0148 na z\\u00E1klade posledn\\u00E9ho \\u00FAspe\\u0161n\\u00E9ho z\\u00E1znamu.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Niektor\\u00E9 z\\u00E1znamy s\\u00FA nespr\\u00E1vne. Skontrolujte detaily chyby a opravte z\\u00E1znamy.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u010Casov\\u00FD z\\u00E1znam pre {0} a {1} \\u010Fal\\u0161ie dni\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Upravi\\u0165 \\u010Dasov\\u00FD z\\u00E1znam\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u010Casov\\u00FD z\\u00E1znam pre {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} hod\\u00EDn {1} min\\u00FAt\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} hod {1} min\n\n#XBUT: Button to reset\nRESET=Resetova\\u0165\n\n#XBUT: Button to update\nUPDATE=Aktualizova\\u0165\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Prida\\u0165 ob\\u013E\\u00FAben\\u00FA polo\\u017Eku\n\n#XBUT: Button to create\nCREATE=Vytvori\\u0165\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktu\\u00E1lny n\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nov\\u00FD n\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky\n\n#XTIT: time\nTIME=\\u010Cas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Po\\u017Eiadavka vymazan\\u00E1\n\n#XTIT:\nWARNING=Upozornenie\n',
	"hcm/mytimesheet/i18n/i18n_sl.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Izberite pogodbo o delu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Pogodbe o delu\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Prekinitev\n\n#XBUT: Button to close popover\nCLOSE=Zapiranje\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Vmesno shranjevanje\n\n# XTIT: \nTIMESHEET_TITLE=Moja evidenca delovnega \\u010Dasa\n\n#XTIT:\nINTERNAL_ERROR=Interna napaka\n\n#XTIT:\nERROR=Napaka\n\n#XFLD:\nINTERNAL_ERROR_BODY=Pri\\u0161lo je do interne napake v zvezi z obdelavo napak v aplikaciji.\n\n# XTIT:\nFAV_DIALOG_BOX=Izbri\\u0161i Priljubljene\n\n# XTIT: \nTIMESHEET=Vnosi v evidenci delovnega \\u010Dasa\n\n#XBUT: Button for quick entry\nQUICK_FILL=Hitri vnos\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Uporabi za\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detajli\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Kreiranje vnosa \\u010Dasa\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Kreiranje vnosa za {0} dni\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detajli vnosa\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detajli vnosa za {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Kreiranje vnosa za {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Maj\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Avg\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marec\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Junij\n# XTIT: Month title for calendar\nMONTH_FULL_6=Julij\n# XTIT: Month title for calendar\nMONTH_FULL_7=Avgust\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktober\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Zahtevana akcija\n# XTIT: Legend filled day\nFILLED_DAY=Zaklju\\u010Deno\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Potrebna je akcija odobritelja\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Zavrnjeno\n# XFLD: Legend future working day\nWORKING_DAY=Delovni dan\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Dela prost dan\n# XFLD: Legend selected working day\nSELECTED_DAY=Izbrani dan\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Izbrani dela prost dan\n# XFLD: Legend current day\nCURRENT_DAY=Trenutni dan\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Skupno \\u0161tevilo manjkajo\\u010Dih ur\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} ur)\n\n#XBUT: Button\nSAVE=Shranjevanje\n\n#XBUT: Button \nSUBMIT=Po\\u0161iljanje\n\n# XMSG\nFILL_ALL=Vnesite {0} ur za\\:\n\n#XFLD\nNO_TASK_TYPE=Brez tipa naloge\n\n#XFLD\nMISSING_DAYS=Manjkajo\\u010Di dnevi\\:  {0}\n\n#XBUT: Button\nHOME=Doma\\u010Da stran\n\n#XTIT: confirmation header\nCONFIRMATION=Potrditev\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potrditev brisanja\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potrditev oddaje\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potrditev osnutka\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Povzetek vnosov \\u010Dasa, izbranih za brisanje\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Povzetek vnosov \\u010Dasa, izbranih za oddajo\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Povzetek izbranih vnosov \\u010Dasa\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u0160tevilo vnosov\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u0160tevilo ur\n\n#XBUT: Confirm Button\nCONFIRM=Potrditev\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} ura\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} ur\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} ura/{1} ure\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} ur/ {1} ur\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cilj\\: {0} ur \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u010Dasovnih dodelitev\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=Enkratna dodelitev\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Ni dodelitev\n\n#XMSG: No Recordings\nNO_RECORDING=Ni zapisov\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} odobrenih ur\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Shranjevanje s \\u010Dasom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Shranjevanje brez \\u010Dasa\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Izbri\\u0161i Priljubljene\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Shranjevanje kot priljubljene\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Upravljanje priljubljenih\n\n#XFLD: Week \nWEEK=Teden\n\n#XFLD:\nMEET_TARGET_HOURS=Uporabi ure za\\:\n\n#XBUT\nALL_MISSING=Ves manjkajo\\u010Di \\u010Das ({0} ur)\n\n#XBUT: Delete Button Text\nDELETE=Brisanje\n\n#XBUT: Copy Button Text\nCOPY=Kopiranje\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodajanje vnosa\n\n#XFLD: label for duration\nDURATION=Trajanje\n\n#XFLD: label for total duration\nTOTAL_DURATION=Skupno trajanje\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=\\u010Cas za\\u010Detka\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Ime priljubljene\n\n#XFLD: label for end Time\nEND_TIME=\\u010Cas konca\n\n#XFLD: label for note\nNOTE=Opomba\n\n#XBUT: Done button\nDONE=Zaklju\\u010Deno\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Ro\\u010Dno\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Urejanje vnosa\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Dodelitev \\u010Dasa\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Izbira priljubljene ali delovnega seznama\n\n# XTIT: select worklist\nSELECT_WORKLIST=Izbira delovnega seznama\n\n# XTIT: Favorite\nFAVORITE=Priljubljeni\n\n# XTIT: Worklist\nWORKLIST=Delovni seznam\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodajanje priljubljene\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Urejanje priljubljenih\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Nalo\\u017Ei ve\\u010D ...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Nalaganje ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Nadaljuj iskanje v stre\\u017Eniku ...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Nalaganje ...\n\n#XFLD: BLANK\nEMPTY=Prazno\n\n#XFLD: None\nNONE=Brez\n\n#XFLD\nNO_WORKLIST=Delovni seznam ni na voljo\n\n#XFLD\nNO_FAVORITE=Priljubljene niso na voljo\n\n# XTIT: Select\nSELECT=Izberite {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Izbira\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Iskanje ...\n\n#XFLD: short label for hours\nHOURS_LABEL=u\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Ure\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minute\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=Detajli\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Nastavitve\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Neshranjeni podatki bodo opu\\u0161\\u010Deni. Res \\u017Eelite nadaljevati?\n\n# XTIT: \nUNSAVED_CHANGES=Neshranjene spremembe\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Zahteva je bila poslana.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Vnesite ime priljubljene v polje vnosa Dodelitev \\u010Dasa.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Vnesite tiste, ki jih boste shranili kot priljubljene.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Vnesite veljavno trajanje.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Vnesite veljaven \\u010Das za\\u010Detka in konca\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Osnutek je bil uspe\\u0161no shranjen.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Priljubljena je kreirana.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Priljubljena je posodobljena.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Priljubljena je izbrisana.\n\n#XBUT:\nHELP=Pomo\\u010D\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} ur je vnesenih za ta teden\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Vklju\\u010Dite predhodno polnjenje za hitro izpolnitev tedenskih ur na podlagi va\\u0161ega zadnjega uspe\\u0161nega vnosa.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Nekateri vnosi niso pravilni. Preglejte detajle o napakah in popravite vnose.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Vnos \\u010Dasa za {0} in dodatnih {1} dni\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Urejanje vnosa \\u010Dasa\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Vnos \\u010Dasa za {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} ur {1} minut\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Ponastavitev\n\n#XBUT: Button to update\nUPDATE=A\\u017Euriranje\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodajanje priljubljene\n\n#XBUT: Button to create\nCREATE=Kreiranje\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Ime trenutne priljubljene\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Ime nove priljubljene\n\n#XTIT: time\nTIME=\\u010Cas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Zahteva izbrisana\n\n#XTIT:\nWARNING=Opozorilo\n',
	"hcm/mytimesheet/i18n/i18n_tr.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Personel tayini se\\u00E7\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Personel tayinleri\n\n#XFLD: label for from time\nFROM=Ba\\u015Flang\\u0131\\u00E7\n\n#XFLD: label for to time\nTO=Biti\\u015F\n\n#XBUT: Button to cancel\nCANCEL=\\u0130ptal\n\n#XBUT: Button to close popover\nCLOSE=Kapat\n\n#XBUT: Button to accept\nOK=Tamam\n\n#XBUT: Button to affirm\nYES=Evet\n\n#XBUT: Button to decline\nNO=Hay\\u0131r\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Tasla\\u011F\\u0131 kaydet\n\n# XTIT: \nTIMESHEET_TITLE=Zaman \\u00E7izelgem\n\n#XTIT:\nINTERNAL_ERROR=Dahili hata\n\n#XTIT:\nERROR=Hata\n\n#XFLD:\nINTERNAL_ERROR_BODY=Uygulamada hata i\\u015Flemeye ili\\u015Fkin dahili hata ortaya \\u00E7\\u0131kt\\u0131.\n\n# XTIT:\nFAV_DIALOG_BOX=Favorileri sil\n\n# XTIT: \nTIMESHEET=Zaman \\u00E7izelgesi giri\\u015Fleri\n\n#XBUT: Button for quick entry\nQUICK_FILL=H\\u0131zl\\u0131 giri\\u015F\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Uygula\\:\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Ayr\\u0131nt\\u0131lar\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Zaman giri\\u015Fi olu\\u015Ftur\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE={0} g\\u00FCn i\\u00E7in giri\\u015F olu\\u015Ftur\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Giri\\u015F ayr\\u0131nt\\u0131lar\\u0131\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE={0} i\\u00E7in giri\\u015F ayr\\u0131nt\\u0131lar\\u0131\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE={0} i\\u00E7in giri\\u015F olu\\u015Ftur\n\n# XTIT: Month short header\nMONTH_0=Oca\n# XTIT: Month short header\nMONTH_1=\\u015Eub\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Nis\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Haz\n# XTIT: Month short header\nMONTH_6=Tem\n# XTIT: Month short header\nMONTH_7=A\\u011Fu\n# XTIT: Month short header\nMONTH_8=Eyl\n# XTIT: Month short header\nMONTH_9=Eki\n# XTIT: Month short header\nMONTH_10=Kas\n# XTIT: Month short header\nMONTH_11=Ara\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Ocak\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u015Eubat\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mart\n# XTIT: Month title for calendar\nMONTH_FULL_3=Nisan\n# XTIT: Month title for calendar\nMONTH_FULL_4=May\\u0131s\n# XTIT: Month title for calendar\nMONTH_FULL_5=Haziran\n# XTIT: Month title for calendar\nMONTH_FULL_6=Temmuz\n# XTIT: Month title for calendar\nMONTH_FULL_7=A\\u011Fustos\n# XTIT: Month title for calendar\nMONTH_FULL_8=Eyl\\u00FCl\n# XTIT: Month title for calendar\nMONTH_FULL_9=Ekim\n# XTIT: Month title for calendar\nMONTH_FULL_10=Kas\\u0131m\n# XTIT: Month title for calendar\nMONTH_FULL_11=Aral\\u0131k\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0130\\u015Flem gerekli\n# XTIT: Legend filled day\nFILLED_DAY=Bitti\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Onaylayan i\\u015Flemi gerekli\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Reddedildi\n# XFLD: Legend future working day\nWORKING_DAY=\\u0130\\u015Fg\\u00FCn\\u00FC\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u00C7al\\u0131\\u015F\\u0131lmayan g\\u00FCn\n# XFLD: Legend selected working day\nSELECTED_DAY=Se\\u00E7ilen g\\u00FCn\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Se\\u00E7ilen \\u00E7al\\u0131\\u015F\\u0131lmayan g\\u00FCn\n# XFLD: Legend current day\nCURRENT_DAY=Ge\\u00E7erli g\\u00FCn\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Toplam eksik saat\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} saat)\n\n#XBUT: Button\nSAVE=Kaydet\n\n#XBUT: Button \nSUBMIT=G\\u00F6nder\n\n# XMSG\nFILL_ALL=\\u015Eunun i\\u00E7in {0} saat gir\\:\n\n#XFLD\nNO_TASK_TYPE=G\\u00F6rev t\\u00FCr\\u00FC yok\n\n#XFLD\nMISSING_DAYS=Eksik g\\u00FCnler\\:  {0}\n\n#XBUT: Button\nHOME=Ana sayfa\n\n#XTIT: confirmation header\nCONFIRMATION=Teyit\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Silmeyi teyit et\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=G\\u00F6ndermeyi teyit et\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Tasla\\u011F\\u0131 teyit et\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Silme i\\u00E7in se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=G\\u00F6nderme i\\u00E7in se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Giri\\u015F say\\u0131s\\u0131\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Saat say\\u0131s\\u0131\n\n#XBUT: Confirm Button\nCONFIRM=Teyit et\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} saat\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} saat\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} saat / {1} saat\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} saat / {1} saat\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Hedef\\: {0} saat \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} zaman tayinleri\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 zaman tayini\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Tayin yok\n\n#XMSG: No Recordings\nNO_RECORDING=Kay\\u0131t yok\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} saat onayland\\u0131\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Zamanla kaydet\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Zaman olmadan kaydet\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Favorileri sil\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Favori olarak kaydet\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Favorileri y\\u00F6net\n\n#XFLD: Week \nWEEK=Hafta\n\n#XFLD:\nMEET_TARGET_HOURS=Saatleri uygula\\:\n\n#XBUT\nALL_MISSING=T\\u00FCm eksik zamanlar ({0} saat)\n\n#XBUT: Delete Button Text\nDELETE=Sil\n\n#XBUT: Copy Button Text\nCOPY=Kopyala\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Giri\\u015F ekle\n\n#XFLD: label for duration\nDURATION=S\\u00FCre\n\n#XFLD: label for total duration\nTOTAL_DURATION=Toplam s\\u00FCre\n\n#XFLD: label for status\nSTATUS=Durum\n\n#XFLD: label for start time\nSTART_TIME=Ba\\u015Flang\\u0131\\u00E7 saati\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favori ad\n\n#XFLD: label for end Time\nEND_TIME=Biti\\u015F saati\n\n#XFLD: label for note\nNOTE=Not\n\n#XBUT: Done button\nDONE=Bitti\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Man\\u00FCel\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Giri\\u015Fi d\\u00FCzenle\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Zaman tayini\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Favori veya i\\u015F listesi se\\u00E7\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u0130\\u015F listesi se\\u00E7\n\n# XTIT: Favorite\nFAVORITE=Favoriler\n\n# XTIT: Worklist\nWORKLIST=\\u0130\\u015F listesi\n\n# XTIT: Add Favorite\nADD_FAVORITE=Favori ekle\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Favorileri d\\u00FCzenle\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Daha fazla y\\u00FCkle...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Y\\u00FCkleniyor ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Sunucuda aramaya devam et...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Y\\u00FCkleniyor ...\n\n#XFLD: BLANK\nEMPTY=Bo\\u015F\n\n#XFLD: None\nNONE=Hi\\u00E7biri\n\n#XFLD\nNO_WORKLIST=\\u0130\\u015F listesi mevcut de\\u011Fil\n\n#XFLD\nNO_FAVORITE=Favori mevcut de\\u011Fil\n\n# XTIT: Select\nSELECT={0} se\\u00E7\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Se\\u00E7\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Ara...\n\n#XFLD: short label for hours\nHOURS_LABEL=s\n\n#XFLD: short label for minutes\nMINUTES_LABEL=d\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Saat\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Dakika\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=AAA GG, YYYY\n\n#XBUT:\nDETAIL=Ayr\\u0131nt\\u0131lar\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Ayarlar\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Kaydedilmeyen veriler at\\u0131lacak. Devam etmek istedi\\u011Finizden emin misiniz?\n\n# XTIT: \nUNSAVED_CHANGES=Kaydedilmeyen de\\u011Fi\\u015Fiklikler\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Talep g\\u00F6nderildi.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Zaman tayini giri\\u015F alan\\u0131nda favori ad girin.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Favoriniz olarak saklamak i\\u00E7in giri\\u015F yap\\u0131n.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Ge\\u00E7erli s\\u00FCre girin.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Ge\\u00E7erli ba\\u015Flang\\u0131\\u00E7 ve biti\\u015F saati girin.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Taslak ba\\u015Far\\u0131yla kaydedildi.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favori olu\\u015Fturuldu.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favori g\\u00FCncellendi.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favori silindi.\n\n#XBUT:\nHELP=Yard\\u0131m\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=Bu hafta i\\u00E7in {0}/{1} saat girildi\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Son ba\\u015Far\\u0131l\\u0131 giri\\u015Finizi temel alan haftaya ili\\u015Fkin saatleri toplamak i\\u00E7in \\u00D6n de\\u011Ferleri y\\u00FCkle\'yi a\\u00E7\\u0131n.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Baz\\u0131 giri\\u015Fler do\\u011Fru de\\u011Fil. Hata ayr\\u0131nt\\u0131lar\\u0131n\\u0131 g\\u00F6zden ge\\u00E7irin ve giri\\u015Fleri d\\u00FCzeltin.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT={0} ve fazladan {1} g\\u00FCn i\\u00E7in zaman giri\\u015Fi\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Zaman giri\\u015Fini d\\u00FCzenle\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE={0} i\\u00E7in zaman giri\\u015Fi\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} saat {1} dakika\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} s {1} d\n\n#XBUT: Button to reset\nRESET=S\\u0131f\\u0131rla\n\n#XBUT: Button to update\nUPDATE=G\\u00FCncelle\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Favori ekle\n\n#XBUT: Button to create\nCREATE=Olu\\u015Ftur\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Ge\\u00E7erli favori ad\\u0131\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Yeni favori ad\\u0131\n\n#XTIT: time\nTIME=Zaman\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Talep silindi\n\n#XTIT:\nWARNING=Uyar\\u0131\n',
	"hcm/mytimesheet/i18n/i18n_zh_CN.properties":'\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u9009\\u62E9\\u4EBA\\u4E8B\\u5206\\u914D\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u4EBA\\u4E8B\\u5206\\u914D\n\n#XFLD: label for from time\nFROM=\\u81EA\n\n#XFLD: label for to time\nTO=\\u81F3\n\n#XBUT: Button to cancel\nCANCEL=\\u53D6\\u6D88\n\n#XBUT: Button to close popover\nCLOSE=\\u5173\\u95ED\n\n#XBUT: Button to accept\nOK=\\u786E\\u5B9A\n\n#XBUT: Button to affirm\nYES=\\u662F\n\n#XBUT: Button to decline\nNO=\\u5426\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u4FDD\\u5B58\\u8349\\u7A3F\n\n# XTIT: \nTIMESHEET_TITLE=\\u6211\\u7684\\u5DE5\\u65F6\\u8868\n\n#XTIT:\nINTERNAL_ERROR=\\u5185\\u90E8\\u9519\\u8BEF\n\n#XTIT:\nERROR=\\u9519\\u8BEF\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u5E94\\u7528\\u4E2D\\u53D1\\u751F\\u4E0E\\u9519\\u8BEF\\u5904\\u7406\\u76F8\\u5173\\u7684\\u5185\\u90E8\\u9519\\u8BEF\\u3002\n\n# XTIT:\nFAV_DIALOG_BOX=\\u5220\\u9664\\u6536\\u85CF\\u5939\n\n# XTIT: \nTIMESHEET=\\u5DE5\\u65F6\\u8868\\u6761\\u76EE\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u5FEB\\u6377\\u8F93\\u5165\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u5E94\\u7528\\u4E8E\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u521B\\u5EFA\\u65F6\\u95F4\\u6761\\u76EE\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u9488\\u5BF9 {0} \\u5929\\u521B\\u5EFA\\u6761\\u76EE\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u6761\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE={0} \\u7684\\u6761\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u9488\\u5BF9 {0} \\u521B\\u5EFA\\u6761\\u76EE\n\n# XTIT: Month short header\nMONTH_0=01\n# XTIT: Month short header\nMONTH_1=02\n# XTIT: Month short header\nMONTH_2=03\n# XTIT: Month short header\nMONTH_3=04\n# XTIT: Month short header\nMONTH_4=05\n# XTIT: Month short header\nMONTH_5=06\n# XTIT: Month short header\nMONTH_6=07\n# XTIT: Month short header\nMONTH_7=08\n# XTIT: Month short header\nMONTH_8=09\n# XTIT: Month short header\nMONTH_9=10\n# XTIT: Month short header\nMONTH_10=11\n# XTIT: Month short header\nMONTH_11=12\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=1 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_1=2 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_2=3 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_3=4 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_4=5 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_5=6 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_6=7 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_7=8 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_8=9 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_9=10 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_10=11 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_11=12 \\u6708\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u9700\\u8981\\u91C7\\u53D6\\u63AA\\u65BD\n# XTIT: Legend filled day\nFILLED_DAY=\\u5B8C\\u6210\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u9700\\u8981\\u5BA1\\u6279\\u4EBA\\u64CD\\u4F5C\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u5DF2\\u62D2\\u7EDD\n# XFLD: Legend future working day\nWORKING_DAY=\\u5DE5\\u4F5C\\u65E5\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u975E\\u5DE5\\u4F5C\\u65E5\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u6240\\u9009\\u65E5\\u671F\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u6240\\u9009\\u975E\\u5DE5\\u4F5C\\u65E5\n# XFLD: Legend current day\nCURRENT_DAY=\\u5F53\\u65E5\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u7F3A\\u5C11\\u65F6\\u6570\\u603B\\u8BA1\\uFF1A{0}\n\n#XFLD:\nMONTH_YEAR={0} {1}\\uFF08{2} \\u5C0F\\u65F6\\uFF09\n\n#XBUT: Button\nSAVE=\\u4FDD\\u5B58\n\n#XBUT: Button \nSUBMIT=\\u63D0\\u4EA4\n\n# XMSG\nFILL_ALL=\\u4E3A\\u4EE5\\u4E0B\\u9879\\u8F93\\u5165 {0} \\u5C0F\\u65F6\\uFF1A\n\n#XFLD\nNO_TASK_TYPE=\\u65E0\\u4EFB\\u52A1\\u7C7B\\u578B\n\n#XFLD\nMISSING_DAYS=\\u7F3A\\u5C11\\u5929\\u6570\\uFF1A{0}\n\n#XBUT: Button\nHOME=\\u4E3B\\u5C4F\\u5E55\n\n#XTIT: confirmation header\nCONFIRMATION=\\u786E\\u8BA4\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u786E\\u8BA4\\u5220\\u9664\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u786E\\u8BA4\\u63D0\\u4EA4\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u786E\\u8BA4\\u8349\\u7A3F\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u5F85\\u5220\\u9664\\u7684\\u9009\\u4E2D\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u5F85\\u63D0\\u4EA4\\u7684\\u9009\\u4E2D\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u6240\\u9009\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u6761\\u76EE\\u6570\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u5C0F\\u65F6\\u6570\n\n#XBUT: Confirm Button\nCONFIRM=\\u786E\\u8BA4\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u5C0F\\u65F6\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u5C0F\\u65F6\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u5C0F\\u65F6 / {1} \\u5C0F\\u65F6\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u5C0F\\u65F6 / {1} \\u5C0F\\u65F6\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u76EE\\u6807\\uFF1A{0} \\u5C0F\\u65F6 \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u65F6\\u95F4\\u5206\\u914D\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u9879\\u65F6\\u95F4\\u5206\\u914D\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u65E0\\u5206\\u914D\n\n#XMSG: No Recordings\nNO_RECORDING=\\u65E0\\u8BB0\\u5F55\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u5C0F\\u65F6\\u5DF2\\u83B7\\u6279\\u51C6\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u4FDD\\u5B58\\uFF08\\u6709\\u65F6\\u95F4\\uFF09\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u4FDD\\u5B58\\uFF08\\u65E0\\u65F6\\u95F4\\uFF09\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u5220\\u9664\\u6536\\u85CF\\u5939\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u53E6\\u5B58\\u4E3A\\u6536\\u85CF\\u9879\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u7BA1\\u7406\\u6536\\u85CF\\u5939\n\n#XFLD: Week \nWEEK=\\u5468\n\n#XFLD:\nMEET_TARGET_HOURS=\\u5C06\\u5C0F\\u65F6\\u6570\\u5E94\\u7528\\u4E8E\\uFF1A\n\n#XBUT\nALL_MISSING=\\u7F3A\\u5C11\\u65F6\\u95F4\\u603B\\u8BA1\\uFF08{0} \\u5C0F\\u65F6\\uFF09\n\n#XBUT: Delete Button Text\nDELETE=\\u5220\\u9664\n\n#XBUT: Copy Button Text\nCOPY=\\u590D\\u5236\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u6DFB\\u52A0\\u6761\\u76EE\n\n#XFLD: label for duration\nDURATION=\\u6301\\u7EED\\u65F6\\u95F4\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u603B\\u6301\\u7EED\\u65F6\\u95F4\n\n#XFLD: label for status\nSTATUS=\\u72B6\\u6001\n\n#XFLD: label for start time\nSTART_TIME=\\u5F00\\u59CB\\u65F6\\u95F4\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u6536\\u85CF\\u9879\\u540D\\u79F0\n\n#XFLD: label for end Time\nEND_TIME=\\u7ED3\\u675F\\u65F6\\u95F4\n\n#XFLD: label for note\nNOTE=\\u6CE8\\u91CA\n\n#XBUT: Done button\nDONE=\\u5B8C\\u6210\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u624B\\u52A8\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u7F16\\u8F91\\u6761\\u76EE\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u65F6\\u95F4\\u5206\\u914D\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u9009\\u62E9\\u6536\\u85CF\\u9879\\u6216\\u5DE5\\u4F5C\\u6E05\\u5355\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u9009\\u62E9\\u5DE5\\u4F5C\\u6E05\\u5355\n\n# XTIT: Favorite\nFAVORITE=\\u6536\\u85CF\\u5939\n\n# XTIT: Worklist\nWORKLIST=\\u5DE5\\u4F5C\\u6E05\\u5355\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u6DFB\\u52A0\\u6536\\u85CF\\u9879\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u7F16\\u8F91\\u6536\\u85CF\\u5939\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u52A0\\u8F7D\\u66F4\\u591A...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u52A0\\u8F7D\\u4E2D...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u7EE7\\u7EED\\u5728\\u670D\\u52A1\\u5668\\u4E0A\\u641C\\u7D22...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u52A0\\u8F7D\\u4E2D...\n\n#XFLD: BLANK\nEMPTY=\\u7A7A\n\n#XFLD: None\nNONE=\\u65E0\n\n#XFLD\nNO_WORKLIST=\\u65E0\\u53EF\\u7528\\u5DE5\\u4F5C\\u6E05\\u5355\n\n#XFLD\nNO_FAVORITE=\\u65E0\\u53EF\\u7528\\u6536\\u85CF\\u9879\n\n# XTIT: Select\nSELECT=\\u9009\\u62E9 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u9009\\u62E9\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u641C\\u7D22...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u5C0F\\u65F6\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u5206\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u5C0F\\u65F6\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u5206\\u949F\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=YYYY, MMM DD\n\n#XBUT:\nDETAIL=\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u8BBE\\u7F6E\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u6240\\u6709\\u672A\\u4FDD\\u5B58\\u7684\\u6570\\u636E\\u90FD\\u5C06\\u653E\\u5F03\\u3002\\u662F\\u5426\\u786E\\u5B9A\\u7EE7\\u7EED\\uFF1F\n\n# XTIT: \nUNSAVED_CHANGES=\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u5DF2\\u63D0\\u4EA4\\u7533\\u8BF7\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u8BF7\\u5728\\u201C\\u65F6\\u95F4\\u5206\\u914D\\u201D\\u8F93\\u5165\\u5B57\\u6BB5\\u4E2D\\u8F93\\u5165\\u6536\\u85CF\\u9879\\u540D\\u79F0\\u3002\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u8F93\\u5165\\u5185\\u5BB9\\u4EE5\\u5C06\\u5176\\u53E6\\u5B58\\u4E3A\\u6536\\u85CF\\u9879\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u8BF7\\u8F93\\u5165\\u6709\\u6548\\u6301\\u7EED\\u65F6\\u95F4\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u8F93\\u5165\\u6709\\u6548\\u5F00\\u59CB\\u65F6\\u95F4\\u548C\\u7ED3\\u675F\\u65F6\\u95F4\\u3002\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u5DF2\\u6210\\u529F\\u4FDD\\u5B58\\u8349\\u7A3F\\u3002\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u521B\\u5EFA\\u3002\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u66F4\\u65B0\\u3002\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u5220\\u9664\\u3002\n\n#XBUT:\nHELP=\\u5E2E\\u52A9\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=\\u5DF2\\u4E3A\\u6B64\\u661F\\u671F\\u8F93\\u5165 {0}/{1} \\u5C0F\\u65F6\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u6253\\u5F00\\u9884\\u586B\\u5145\\uFF0C\\u57FA\\u4E8E\\u60A8\\u6700\\u540E\\u6210\\u529F\\u8F93\\u5165\\u7684\\u5185\\u5BB9\\u5FEB\\u901F\\u586B\\u5145\\u8BE5\\u5468\\u7684\\u5C0F\\u65F6\\u6570\\u3002\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u67D0\\u4E9B\\u6761\\u76EE\\u4E0D\\u6B63\\u786E\\u3002\\u8BF7\\u68C0\\u67E5\\u9519\\u8BEF\\u8BE6\\u7EC6\\u4FE1\\u606F\\u5E76\\u66F4\\u6B63\\u6761\\u76EE\\u3002\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT={0} \\u548C {1} \\u5929\\u7684\\u65F6\\u95F4\\u6761\\u76EE\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u7F16\\u8F91\\u65F6\\u95F4\\u6761\\u76EE\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE={0} \\u7684\\u65F6\\u95F4\\u6761\\u76EE\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u5C0F\\u65F6 {1} \\u5206\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=\\u91CD\\u7F6E\n\n#XBUT: Button to update\nUPDATE=\\u66F4\\u65B0\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u6DFB\\u52A0\\u6536\\u85CF\\u9879\n\n#XBUT: Button to create\nCREATE=\\u521B\\u5EFA\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u5F53\\u524D\\u6536\\u85CF\\u5939\\u540D\\u79F0\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u65B0\\u6536\\u85CF\\u5939\\u540D\\u79F0\n\n#XTIT: time\nTIME=\\u65F6\\u95F4\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u5DF2\\u5220\\u9664\\u7533\\u8BF7\n\n#XTIT:\nWARNING=\\u8B66\\u544A\n',
	"hcm/mytimesheet/model/TimeEntry.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.model.TimeEntry");

hcm.mytimesheet.model.TimeEntry = function(time, childName, suggestion, bExisting) {
	this.time = time;
	this.hours = Math.floor(time);
	this.minutes = Math.round((time - Math.floor(time)) * 60);
	this.suggestion = suggestion===undefined ? false : suggestion;
	this.newEntry = !bExisting;
	this.mainItem = null;
	this.subItems = childName;
	this.notes = null;
	this.startTime = "";
	this.endTime = "";
	this.counter = "";
	this.hasNotes = false;
	this.showTime = bExisting;
	this.showError = false;
	this.error = "";
	this.status = "";
	//Introducing statusId for Status color in WeekEntry View
	this.statusId = "";
};

hcm.mytimesheet.model.TimeEntry.prototype.setStartEndTimes = function(
		date, entries, missingTime, workingDay) {
	var lastUndeletedIndex = entries.length-1;
	while(lastUndeletedIndex>=0 && entries[entries.length-1].deleted) {
		lastUndeletedIndex--;
	}
	var startTime = this.createTime(date, lastUndeletedIndex>=0 ?
			entries[lastUndeletedIndex].endTime :
			workingDay.startTime);
	var lunchStart = this.createTime(date, workingDay ? workingDay.lunchStart : "000000");
	var lunchEnd = this.createTime(date, workingDay ? workingDay.lunchEnd : "000000");
	if(startTime.getTime()===lunchStart.getTime()) {
		// the lunch break is before the start time
		startTime.setTime(startTime.getTime() + lunchEnd.getTime()-lunchStart.getTime());
	}
	var endTime = new Date(startTime.getTime() + missingTime*3600000);
	if(startTime.getTime() < lunchStart.getTime()) {
		endTime.setTime(endTime.getTime() + lunchEnd.getTime()-lunchStart.getTime());
	}
	this.startTime = (startTime.getHours()+100).toString().substring(1, 3) + (startTime.getMinutes()+100).toString().substring(1, 3) + "00";
	this.endTime = (endTime.getHours()+100).toString().substring(1, 3) + (endTime.getMinutes()+100).toString().substring(1, 3) + "00";
};

hcm.mytimesheet.model.TimeEntry.prototype.createTime = function(
		date, timeStr) {
	var time = new Date(date.getTime());
	time.setHours(parseInt(timeStr.substring(0, 2), 10), parseInt(timeStr.substring(2, 4), 10));
	return time;
};

hcm.mytimesheet.model.TimeEntry.prototype.setData = function(
		data) {
	if (data.FieldName === "TIME") {
		this.recordNumber = data.RecordNumber;
		this.time = parseFloat(data.FieldValue.trim());
		this.hours = Math.floor(this.time);
		this.minutes = Math
				.round((this.time - this.hours) * 60);
		this.startTime = data.StartTime;
		this.endTime = data.EndTime;
	} else if (data.FieldName === "NOTES") {
		this.notes = data.FieldValueText;
		if (this.notes && this.notes.length > 0) {
			this.hasNotes = true;
		}
	} else if (data.FieldName === "STARTTIME") {
		this.startTime = data.FieldValueText;
	} else if (data.FieldName === "ENDTIME") {
		this.endTime = data.FieldValueText;
	} else if (data.FieldName === "COUNTER") {
		this.counter = data.FieldValueText;
	} else if (data.FieldName === "REASON") {
		this.rejectionReason = data.FieldValueText;
	} else if (data.FieldName === "STATUS") {
		this.status = data.FieldValueText;
		this.statusId = data.FieldValue;
	} else if (data.Level === "0") {// this is the Bold item
		this.mainItem = data.FieldValueText;
		this.mainCode = data.FieldValue;
		this.mainName = data.FieldName;
	} else {
		if (this.subItems) {
			this.subItems += ", " + data.FieldValueText;
			this.childItems.push(data.FieldValueText);
			this.childCodes.push(data.FieldValue);
			this.childNames.push(data.FieldName);
		} else {
			this.subItems = data.FieldValueText;
			this.childItems = [ data.FieldValueText ];
			this.childCodes = [ data.FieldValue ];
			this.childNames = [ data.FieldName ];
		}
	}
};

},
	"hcm/mytimesheet/utils/ConcurrentEmployment.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.ConcurrentEmployment");
/*global hcm:true */
hcm.mytimesheet.utils.ConcurrentEmployment = {

	getCEEnablement: function(self, successHandler) {
		this.initialize(self, successHandler);
		var oModel = new sap.ui.model.json.JSONModel();
		self.oService.getPersonellAssignments(self, function(data) {
			if (data.length > 1) {
				oModel.setData(data);
				self.oCEForm.setModel(oModel);
				self.oCEDialog.open();
			}
			else{
			    self.oApplication.pernr = data[0].Pernr;
			    successHandler();
			}

		});

	},
	initialize: function(self, successHandler) {
	    this.setControllerInstance(self);
		var itemTemplate = new sap.m.RadioButton({
			text: "{AssignmentText}",
			customData: new sap.ui.core.CustomData({
				"key": "Pernr",
				"value": "{Pernr}"
			})
		});
		self.oCESelect = new sap.m.RadioButtonGroup().bindAggregation("buttons", "/", itemTemplate);
		self.oCEForm = new sap.ui.layout.form.Form({
			maxContainerCols: 2,
			class: "sapUiLargeMarginTopBottom",
			layout: new sap.ui.layout.form.ResponsiveGridLayout({
				labelSpanL: 12,
				// emptySpanL: 3,
				labelSpanM: 12,
				// emptySpanM: 2,
				labelSpanS: 12,
				columnsL: 2,
				columnsM: 2
			}),
			formContainers: new sap.ui.layout.form.FormContainer({
				formElements: [
                                       new sap.ui.layout.form.FormElement({
                    						label: new sap.m.Label({
                    							text: self.oBundle.getText("PERSONAL_ASSIGN")
                    						}),
                    						fields: self.oCESelect
                    					})
                               ]
			})
		});
		
		self.oCEDialog = new sap.m.Dialog({
			title:self.oBundle.getText("PERSONAL_ASSIGN_TITLE"),
			class: "sapUiContentPadding sapUiLargeMarginTopBottom",
			content: self.oCEForm,
			buttons: [
			    new sap.m.Button({
					text: self.oBundle.getText("OK"),
					press: function() {
						self.oCEDialog.close();
						self.oApplication.pernr = self.oCESelect.getSelectedButton().data().Pernr;
						successHandler();
					}
				}),
			    new sap.m.Button({
					text: self.oBundle.getText("CANCEL"),
					press: function() {
						self.oCEDialog.close();
						self.oCEDialog.Cancelled = true;  
                        /* eslint-disable sap-browser-api-warning */          
                                window.history.go(-1);    
                        /* eslint-enable sap-browser-api-warning */        
					    //}
					}
				})
			]
		});
		self.oCEDialog.attachAfterClose(function(){
		    if(!self.oApplication.pernr && self.oCEDialog.Cancelled !== true){
		        self.oCEDialog.open();
		    }
		});
	},
	
	setControllerInstance: function(me){
	    this.me = me;    
	},
	
	getControllerInstance: function(){
	    return this.me;  
	}

};
},
	"hcm/mytimesheet/utils/DataManager.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ui.base.EventProvider");
jQuery.sap.require("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.base.EventProvider
	.extend(
		"hcm.mytimesheet.Service", {
			metadata: {
				publicMethods: ["getModel", "getGeneralParameters",
								"getSpendingDataByHierarhyNodesAndPeriod",
								"getGenericLineItemsByHierNodesAndPeriod",
								"getTrendDataByHierarchyNodes", "setBundle"]
			},
			constructor: function() {
				this._nCounter = 0;
				this._busyDialog = new sap.m.BusyDialog();
			},

			_initialize: function(appController) {
				if (!this.oApplication) {
					this.oApplication = appController.oApplicationFacade.oApplicationImplementation;
					this.oConfiguration = appController.oConfiguration;
					this.oConnectionManager = appController.oApplication
						.getConnectionManager();
				}

				if (!this.oBundle) {
					this.oBundle = appController.oApplicationFacade.oApplicationImplementation.getResourceBundle();
				}
				this.oConfiguration.setResourceBundle(this.oBundle);
				this.oDataModel = this.oConnectionManager.getModel();
				this.oDataModel
					.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			},

			processError: function(oError) {
				var message = "";
				var messageDetails = "";
				if (oError.response) {
					var body = oError.response.body;
					try {
						body = JSON.parse(body);
						if (body.error.innererror && body.error.innererror.errordetails) {

							var errors = body.error.innererror.errordetails;
							for (var i = 0; i < errors.length; i++) {
								if (errors[i].code.match("/IWBEP")) {
									continue;
								}
								messageDetails += errors[i].code + " : " + errors[i].message + "\n";
							}

						}
						if (messageDetails === "") {
							messageDetails = body.error.code + " : " + body.error.message.value;
						}
						message = body.error.message.value;
					} catch (e) {
						jQuery.sap.log.warning("Could parse the response", ["parseError"], ["hcm.mytimesheet"]);
					}
				}
				if (message === "") {
					message = this.oBundle.getText("INTERNAL_ERROR");
				}
				if (messageDetails === "") {
					messageDetails = this.oBundle.getText("INTERNAL_ERROR_BODY");
				}
				var oMessage = {
					message: message,
					details: messageDetails,
					type: sap.m.MessageBox.Icon.ERROR
					// 	type: sap.ca.ui.message.Type.ERROR
				};

				try {
					sap.m.MessageBox.show(
						oMessage.message, {
							icon: oMessage.type,
							title: this.oBundle.getText("ERROR"),
							actions: [sap.m.MessageBox.Action.OK],
							details: oMessage.details,
							onClose: function(oAction) {}
						}
					);
				} catch (o) {
					oMessage.type = sap.ca.ui.message.Type.ERROR;
					sap.ca.ui.message.showMessageBox({
						type: sap.ca.ui.message.Type.ERROR,
						message: oMessage.message,
						details: oMessage.details
					});
				}

			},

			getPersonellAssignments: function(appController, fSuccess) {

				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/ConcurrentEmploymentSet",
						null, [],
						true,
						function(oData) {
							fSuccess(oData.results);
						},
						function(oError) {
							self.processError(oError);
						});

			},

			getWorkDays: function(appController, pernr, begda, endda, fSuccess) {
				// 		this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/WorkCalendars",
						null, ["$filter=Pernr eq '" + pernr
								  + "' and StartDate eq '" + begda
								  + "' and EndDate eq '"
								  + endda + "'"],
						true,
						function(oData) {
							fSuccess(oData.results);
							// 	self.hideBusy();
						},
						function(oError) {
							// 	self.hideBusy(true);
							self.processError(oError);
						});

			},

			getFavorites: function(appController, pernr, /*begda, endda,*/ fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel
					.read(
						"/Favorites",
						null, ["$filter=Pernr eq '" + pernr
								  + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			createFavorite: function(appController, favObj, fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				this.oDataModel.create("/Favorites", favObj, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_SUBMIT_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			updateFavorite: function(appController, favObj, fSuccess) {
				this.showBusy();
				var self = this;
				this._initialize(appController);
				var path = "/Favorites(ID='" + favObj.ID.trim() + "',Pernr='" + favObj.Pernr + "')";
				this.oDataModel.update(path, favObj, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_UPDATE_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			deleteFavorite: function(appController, favObj, fSuccess) {
				// this.showBusy();
				var self = this;
				this._initialize(appController);
				var path = "/Favorites(ID='" + favObj.ID.trim() + "',Pernr='" + favObj.Pernr + "')";
				this.oDataModel.remove(path, null, function(oData) {
						self.hideBusy();
						var toastMsg = self.oBundle.getText("FAVORITE_DELETE_SUCCESS");
						sap.m.MessageToast.show(toastMsg, {
							duration: 3000
						});
						fSuccess(oData);
					},
					function(oError) {
						self.processError(oError);
						self.hideBusy();
					});
			},

			getTimeDataList: function(appController, pernr, begda, endda, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);
				this.oDataModel
					.read(
						"/TimeDataList",
						null, ["$filter=Pernr eq '" + pernr
								  + "' and StartDate eq '" + begda
								  + "' and EndDate eq '"
								  + endda + "'"],
						true,
						function(oData) {
							for (var i = 0; i < oData.results.length; i++) {
								oData.results[i].Level = oData.results[i].Level.toString().trim();
							}
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getWorkListCollection: function(appController, pernr, begDa, endDa, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);

				this.oDataModel
					.read(
						"/WorkListCollection",
						null, ["$filter=Pernr eq '" + pernr
								                + "' and StartDate eq '" + begDa + "' and EndDate eq '"
												+ endDa + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getProfileFields: function(appController, pernr, fSuccess) {
				this.showBusy();
				var self = this;

				this._initialize(appController);
				this.oDataModel
					.read(
						"/ProfileFields",
						null, ["$filter=Pernr eq '" + pernr
								                        + "'"],
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getValueHelpList: function(pernr, fieldName,
				top, skip, searchString, fieldRelated, begDa, endDa, fSuccess) {
				this.showBusy();
				var self = this;
				var queryString = ["$filter=Pernr eq '" + pernr
								    + "' and FieldName eq '"
									+ fieldName + "'"];
				queryString[0] += " and StartDate eq '" + encodeURIComponent(begDa) + "'" + " and EndDate eq '" + encodeURIComponent(endDa) + "' "; //adding begin and end dates to the filter

				if (searchString) {
					queryString[0] += "and substringof('" + encodeURIComponent(searchString) + "',FieldValue)";
				}
				if (fieldRelated) {
					queryString[0] += "and FieldRelated eq '" + encodeURIComponent(fieldRelated) + "'";
				}
				queryString[0] += "&$top=" + top + "&$skip=" + skip;
				this._initialize();

				this.oDataModel
					.read(
						"/ValueHelpList",
						null,
						queryString,
						true,
						function(oData) {
							self.hideBusy();
							fSuccess(oData.results);

						},
						function(oError) {
							self.hideBusy(true);
							self.processError(oError);
						});

			},

			getInitialInfos: function(appController, pernr, begda, endda) {

				this._initialize(appController);
				var self = this;
				this.oDataModel
					.read(
						"/InitialInfos",
						null, ["$filter=Pernr eq '" + pernr
								                    + "' and StartDate eq '" + begda
													+ "' and EndDate eq '"
													+ endda + "'"],
						false,
						function(oData) {
							//   oData.results[0].ClockEntry = "T";
							self.oConfiguration.setInitialInfoModel(oData.results[0]);
						},
						function(oError) {
							self.processError(oError);
						});

			},

			submitTimeEntry: function(appController, timeEntryCreated,
				timeEntryUpdated, timeEntryDeleted, fnSuccess,
				fnFailure) {
				this.showBusy();

				this._initialize(appController);
				var self = this;
// //BEGIN OF NOTE 2356935
// 				if(appController.entry){
// 					self.selectedDate = appController.entry.selectedDate;
// 				}
// //END OF NOTE 2356935
				var arrEntry1 = timeEntryCreated
					.concat(timeEntryUpdated);
				var finalEntry = arrEntry1.concat(timeEntryDeleted);

				var mainModel = this.oDataModel;
				// keep posts with errors
				this.errors = [];
				this.responseData = [];

				mainModel
					.refreshSecurityToken(
						function() {
							for (var i = 0; i < finalEntry.length; i++) {
								self.data = finalEntry[i];
								var batch = mainModel
									.createBatchOperation(
										"/TimeEntries",
										"POST",
										self.data);
								var batchchanges = [];
								batchchanges.push(batch);
								mainModel
									.addBatchChangeOperations(batchchanges);
							}

							mainModel
								.submitBatch(
									function(oData /*,oResponse,aErrorResponses*/ ) {
										var hasError = [],
											messageHdr = "",
											message = "",
											errFlag = false;
										self.errors = [];
										for (i = 0; i < oData.__batchResponses.length; i++) {
											message = "";

											if (oData.__batchResponses[i].response) {
												var body = oData.__batchResponses[i].response.body;
												try {
													body = JSON.parse(body);
													if (messageHdr === "") {
														messageHdr = body.error.message.value;
													}
													var errordetails = body.error.innererror.errordetails;
													for (var j = 0; j < errordetails.length; j++) {
														if (errordetails[j].code.match("/IWBEP")) {
															continue;
														}
														message += errordetails[j].code + ":" + errordetails[j].message + "\n";
														if (errordetails[j].severity === "error") {                                 //NOTE 2326142
															errFlag = true;
														}
													}
												} catch (e) {
													jQuery.sap.log.warning("Could parse the response", ["submitTimeEntry"], ["hcm.mytimesheet"]);
												}
												self.errors
													.push({
														counter: finalEntry[i].Counter,
														workdate: finalEntry[i].TimeEntryDataFields.WORKDATE,
														time: finalEntry[i].TimeEntryDataFields.CATSHOURS,
														message: message,
														messageHdr: messageHdr,
														errorFlag: errFlag,
														body: body
													});

											} else if (oData.__batchResponses[i].__changeResponses) {
												hasError[i] = false;
												self.responseData
													.push(oData.__batchResponses[i].__changeResponses[0].data);
											}

										}

										// after submit release busy icon and call success/fail functions
										self.hideBusy(true);
										self._initialize();
										var errorDates = [];
										if (self.errors.length > 0) {
											var messageList = "";
											for (i = 0; i < self.errors.length; i++) {
												var dateStr = self.errors[i].workdate;
												var y = parseInt(dateStr.substr(0, 4), 10);
												var m = parseInt(dateStr.substr(5, 2), 10) - 1;
												var d = parseInt(dateStr.substr(8, 2), 10);

												var dateError = self.formatDateMMMDD(new Date(y, m, d, 0, 0, 0, 0));
												errorDates.push((new Date(y, m, d, 0, 0, 0, 0)).toDateString());

												messageList += dateError + ":- \n" + self.errors[i].message + "\r\n";
											}
											var type;
											if (errFlag) {
												// type = sap.ca.ui.message.Type.ERROR;
												type = sap.m.MessageBox.Icon.ERROR;
											} else {
												// type = sap.ca.ui.message.Type.WARNING;
												type = sap.m.MessageBox.Icon.WARNING;
											}
											if (messageHdr === "") {
												messageHdr = self.oBundle.getText("INTERNAL_ERROR");
											}
											if (self.errors.length === 1 && self.errors[0].message === "") {
												messageList = self.oBundle.getText("INTERNAL_ERROR_BODY");
											}
											var oMessage = {
												message: messageHdr,
												details: messageList,
												type: type
											};

											try {
											 	if (errFlag) {              //NOTE 2293728	
												sap.m.MessageBox.show(
													oMessage.message, {
														icon: oMessage.type,
														title: self.oBundle.getText("ERROR"),
														actions: [sap.m.MessageBox.Action.OK],
														details: oMessage.details
														/*onClose: function(oAction) {
															fnFailure(hasError, errorDates);
														}*/
													}
												); } else {               //BEGIN OF NOTE 2293728
												 sap.m.MessageBox.show(
													oMessage.message, {
														icon: oMessage.type,
														title: self.oBundle.getText("WARNING"),
														actions: [sap.m.MessageBox.Action.OK],
										              	onClose: function(oAction){
														  	if(oAction === self.oBundle.getText("OK")){	
														  		 fnSuccess();                                    //NOTE 2370738
//                                                               var a = [];
//                                                               if( self.data.TimeEntryOperation === "C" ){
//                                                               self.data.TimeEntryOperation = "K";
// //BEGIN OF NOTE 2356935 
//                                                               for( i=0; i < self.selectedDate.length; i++ ) 
//                                                               {
//                                                                  self.data = $.extend(true, {}, self.data);
//                                                                  a[i] = self.data;
//                                                                  a[i].TimeEntryDataFields.WORKDATE = "" + new Date(self.selectedDate[i]).getFullYear() + "-" + ("" + (new Date(self.selectedDate[i]).getMonth() + 101)).substring(1) + "-" + ("" + (new Date(self.selectedDate[i]).getDate() + 100)).substring(1) +"T00:00:00";
//                                                                 }
// //END OF NOTE 2356935                                                                
//                                                               self.submitTimeEntry(self,a,[],[],fnSuccess,fnFailure);                                                              
//                                                               }else if(self.data.TimeEntryOperation === "U"){
//                                                                 self.data.TimeEntryOperation = "L";	
//                                                                 a.push(self.data);
//                                                                 self.submitTimeEntry(self,[],a,[],fnSuccess,fnFailure);                                                              
//                                                               }else if(self.data.TimeEntryOperation === "D"){
//                                                               	self.data.TimeEntryOperation = "M";
//                                                               	a.push(self.data);                                                   //NOTE 2367454
//                                                                 self.submitTimeEntry(self,[],[],a,fnSuccess,fnFailure);                                                              	
//                                                               }
                  
														  		
														  	}
														},
														details: oMessage.details
														/*onClose: function(oAction) {
															fnFailure(hasError, errorDates);
														}*/
													}
												);													
													
												}                       //END OF NOTE 2293728   
												fnFailure(hasError, errorDates);
											} catch (o) {
												if (type === sap.m.MessageBox.Icon.ERROR) {
													oMessage.type = sap.ca.ui.message.Type.ERROR;
												} else {
													oMessage.type = sap.ca.ui.message.Type.WARNING;
												}
												sap.ca.ui.message.showMessageBox({
													type: oMessage.type,
													message: oMessage.message,
													details: oMessage.details
												}, fnFailure(hasError, errorDates));
											}

										} else {
											fnSuccess();
										}
									},
									function(oError) {
										//error function for mainModel.submitBatch
										self.hideBusy(true);
										self.processError(oError);

									});

						}, function(oError) {
							//error function for mainModel.refreshSecurityToken
							self.hideBusy(true);
							self.processError(oError);
						}, true);

			},
			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},

			showBusy: function() {
				this._nCounter++;
				if (this._nCounter === 1) {
					this._busyDialog.open();

				}
			},

			hideBusy: function(forceHide) {
				if (this._nCounter === 0) {
					return;
				}
				this._nCounter = forceHide ? 0 : Math.max(0,
					this._nCounter - 1);
				if (this._nCounter > 0) {
					return;
				}
				this._busyDialog.close();
			}

		});
},
	"hcm/mytimesheet/utils/InitialConfigHelper.js":function(){/*
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
},
	"hcm/mytimesheet/view/S3.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("sap.ca.ui.dialog.factory");
jQuery.sap.require("sap.ca.ui.dialog.Dialog");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("hcm.mytimesheet.utils.InitialConfigHelper");
jQuery.sap.require("sap.ca.ui.model.type.Number");
/*global hcm:true */
sap.ca.scfld.md.controller.BaseFullscreenController
	.extend(
		"hcm.mytimesheet.view.S3", {
			extHookChangeHeaderFooterOptions: null,
			extHookAlterColumns: null,
			extHookChangeObjectBeforePost: null,
			extHookChangeFormatTime: null,                        //NOTE 2356935

			onInit: function() {

				sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
				this.oApplication = this.oApplicationFacade.oApplicationImplementation;
				this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
				this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
				this.oConfiguration.setResourceBundle(this.oBundle);
				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				var self = this;
				sap.ui.Device.orientation.attachHandler(function(oEvent) {
					if (oEvent.landscape) {
						if (sap.ui.Device.system.phone) {
							self.byId("MTS3_SUMMARY_GRID").setDefaultSpan("L6 M12 S12");
							self.byId("MTS3_SUMMARY_GRID").rerender();
						}
					}
				});
				this.oRouter.attachRouteMatched(function(oEvent) {

					if (oEvent.getParameter("name") === "S3") {
						//only invoke if a pernr has been selected
						if (self.oApplication.pernr) {
							self.initializeView();
							self.updateData();
						}
					}
				});

			},

			onAfterRendering: function() {
				var self = this;
				if (!this.oApplication.pernr) {
					try {
						var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
						var oStartUpParameters = sap.ui.component(sComponentId).getComponentData().startupParameters; //Get pernr from the cross app nav
						this.oApplication.pernr = oStartUpParameters.pernr[0];
						this.initializeView();
						this.initializeTable();
						this.updateData();
					} catch (o) {
						hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function() {
							self.initializeView();
							self.initializeTable();
							self.updateData();
						});
					}

				}
			},

			initializeView: function() {
				var curDate = new Date();
				var oModel;
				var s3exchgModel = this.oApplication.getModel("S3exchangeModel");
				if (s3exchgModel) {
					oModel = this.setInitialInfoModelData(s3exchgModel.getProperty("/currentDate"));
					this.oApplication.setModel(null, "S3exchangeModel");
				} else {
					oModel = this.setInitialInfoModelData(curDate);
				}

				// this.updateData();
				this.getView().setModel(oModel);

				//setting the calendar model
				this.byId("WEEKLY_CALENDAR").setModel(oModel);
				this.calendarModel = oModel;
				//Reseting and disabling the Delete Button text 
				this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);

				this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);

				this.setBtnText("copyBtn", this.oApplicationFacade.getResourceBundle().getText("COPY"));
				this.setBtnEnabled("copyBtn", false);

				this.checkboxList = [];
				// new model for data excahnge with s31
				var S31modelexch = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(S31modelexch, "S31modelexch");

			},

			setInitialInfoModelData: function(curDate) {
				var oModel = new sap.ui.model.json.JSONModel({
					phone: sap.ui.Device.system.phone
				});
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
					this.byId("WEEKLY_CALENDAR").setWeeksPerRow(1); //in case of mobile devices 1 week is shown
					this.byId("MTS3_SECOND_INFO").setVisible(false);
					this.byId("MTS3_SUMMARY_GRID").rerender();

				}
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));

				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);
				this.oApplication.setModel(oModel, "TSM_WEEKLY");

				this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(curDate), this.getDateStr(curDate));

				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/start", this.getDateStr(curDate));
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));

				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();

				this.releaseAllowed = InitalInfoModel.ReleaseDirectly === "TRUE";
				oModel.setProperty("/releaseAllowed", this.releaseAllowed);

				this.releaseFuture = (InitalInfoModel.ReleaseFuture === "TRUE");
				oModel.setProperty("/releaseFuture", this.releaseFuture);
				oModel.setProperty("/favoriteAvailable", InitalInfoModel.FavoriteAvailable);
				this.FavoriteAvailable = InitalInfoModel.FavoriteAvailable;
				this.setBtnEnabled("SUBMIT_BTN", false);
				this.clockEntry = (InitalInfoModel.ClockEntry === "TRUE");
				oModel.setProperty("/clockEntry", this.clockEntry);
				this.withTargetHours = InitalInfoModel.WithTargetHours;
				return oModel;
			},
			setWeekOverviews: function(noOfWeeks) {

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var weekData = oModel.getProperty("/days");

				var curDate = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + (7 * noOfWeeks - 1));

				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));
				var first = firstday.getTime();
				// 		var firstday = new Date(first);
				// 		var lastday = new Date(last);
				var firstWeekLastDay, secondWeekFirstDay, i, totalAssignments, recordedHrsTxt, assignments;
				var targetHrsTxt, weekText, weekRange, totalTargetHrs, totalRecordedHrs, totalApprovedHours, approvedHrsTxt, entryArray1, entryArray2;

				//first week only
				//Set the title
				weekRange = [];
				// splitString = firstday.toDateString().split(" ");
				// weekRange[0] = splitString[1] + " " + splitString[2] + " - ";
				weekRange[0] = this.formatDateMMMDD(firstday);

				if (noOfWeeks === 1) {

					// 	splitString = lastday.toDateString().split(" ");formatDateMMMDD
					// 	weekRange[0] += splitString[1] + " " + splitString[2];
					weekRange[1] = this.formatDateMMMDD(lastday);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[0], weekRange[1]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(weekText);
					totalTargetHrs = 0;
					totalRecordedHrs = 0;
					totalApprovedHours = 0;
					totalAssignments = 0;
					entryArray1 = [];
					//find the statuses
					for (i = 0; i < weekData.length; i++) {
						totalTargetHrs += weekData[i].targetHours;
						totalRecordedHrs += weekData[i].recordedHours;
						totalApprovedHours += weekData[i].approvedHours;
						if (weekData[i].entries.length) {
							// 			totalAssignments++;
							entryArray1 = this.pushUniqueElements(weekData[i].entries, entryArray1);
						}
					}
					totalAssignments = entryArray1.length;
					//setting the sum to a max of 2 decimal points
					if (totalTargetHrs !== 0) {
						totalTargetHrs = this.formatTime(totalTargetHrs.toFixed(2));
					}
					if (totalRecordedHrs !== 0) {
						totalRecordedHrs = this.formatTime(totalRecordedHrs.toFixed(2));
					}
					if (totalApprovedHours !== 0) {
						totalApprovedHours = this.formatTime(totalApprovedHours.toFixed(2));
					}

					//setting the data
					if (totalRecordedHrs !== 0) {
						recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs]);
					} else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}
					if (totalAssignments === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments]);
					}

					if (totalApprovedHours === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours]);
					}
					if (totalTargetHrs !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_1").setText(targetHrsTxt);

					this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(approvedHrsTxt);
				} else {
					firstWeekLastDay = first + ((7 * 1 - 1) * 24 * 60 * 60 * 1000);
					firstWeekLastDay = new Date(firstWeekLastDay);
					secondWeekFirstDay = first + 7 * 24 * 60 * 60 * 1000;
					secondWeekFirstDay = new Date(secondWeekFirstDay);
					//set all the hours of each to 0
					firstday.setHours(0, 0, 0, 0);
					firstWeekLastDay.setHours(0, 0, 0, 0);
					secondWeekFirstDay.setHours(0, 0, 0, 0);
					lastday.setHours(0, 0, 0, 0);
					//find and set the 2nd week data

					//set the number
					// 	splitString = firstWeekLastDay.toDateString().split(" ");
					// 	weekRange[0] += splitString[1] + " " + splitString[2];
					weekRange[1] = this.formatDateMMMDD(firstWeekLastDay);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[0], weekRange[1]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(weekText);
					//2nd week
					/*splitString = secondWeekFirstDay.toDateString().split(" ");
					weekRange[1] = splitString[1] + " " + splitString[2] + " - ";
					splitString = lastday.toDateString().split(" ");
					weekRange[1] += splitString[1] + " " + splitString[2];*/

					weekRange[2] = this.formatDateMMMDD(secondWeekFirstDay);
					weekRange[3] = this.formatDateMMMDD(lastday);
					weekText = this.oBundle.getText("WEEK_DATE_RANGE", [weekRange[2], weekRange[3]]);
					this.byId("MTS3_CURRENT_WEEK_INFO_2").setTitle(weekText);

					//1st week
					totalTargetHrs = [0, 0];
					totalRecordedHrs = [0, 0];
					totalApprovedHours = [0, 0];
					totalAssignments = [0, 0];
					entryArray1 = [];
					entryArray2 = [];

					for (i = 0; i < weekData.length; i++) {
						if (weekData[i].date.getTime() < secondWeekFirstDay.getTime()) {
							totalTargetHrs[0] += weekData[i].targetHours;
							totalRecordedHrs[0] += weekData[i].recordedHours;
							totalApprovedHours[0] += weekData[i].approvedHours;
							if (weekData[i].entries.length) {
								// totalAssignments[0]++; 
								entryArray1 = this.pushUniqueElements(weekData[i].entries, entryArray1);
							}
						} else {
							totalTargetHrs[1] += weekData[i].targetHours;
							totalRecordedHrs[1] += weekData[i].recordedHours;
							totalApprovedHours[1] += weekData[i].approvedHours;
							if (weekData[i].entries.length) {
								// totalAssignments[1]++;
								entryArray2 = this.pushUniqueElements(weekData[i].entries, entryArray2);
							}
						}
					}
					totalAssignments[0] = entryArray1.length;
					totalAssignments[1] = entryArray2.length;
					//setting the sum to a max of 2 decimal points
					for (i = 0; i < 2; i++) {
						if (totalTargetHrs[i] !== 0) {
							totalTargetHrs[i] = this.formatTime(totalTargetHrs[i].toFixed(2));
						}
						if (totalRecordedHrs[i] !== 0) {
							totalRecordedHrs[i] = this.formatTime(totalRecordedHrs[i].toFixed(2));
						}
						if (totalApprovedHours[i] !== 0) {
							totalApprovedHours[i] = this.formatTime(totalApprovedHours[i].toFixed(2));
						}
					}
					//setting data for the first week
					if (totalRecordedHrs[0] !== 0) {
						if (totalRecordedHrs[0] === "01:00") { //Note 2115732
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOUR", [totalRecordedHrs[0]]);
						} else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs[0]]);
						}
					} //End Note 2115732
					else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}
					// 	recordedHrsTxt = totalRecordedHrs[0] + " h";
					if (totalAssignments[0] === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments[0] === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments[0]]);
					}

					if (totalApprovedHours[0] === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours[0]]);
					}

					if (totalTargetHrs[0] !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs[0]]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_1").setText(targetHrsTxt);
					this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(approvedHrsTxt);

					//setting data for the second week
					if (totalRecordedHrs[1] !== 0) {
						if (totalRecordedHrs[1] === "01:00") { //Note 2115732
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOUR", [totalRecordedHrs[1]]);
						} else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [totalRecordedHrs[1]]);
						}
					} //End Note 2115732
					else {
						recordedHrsTxt = this.oBundle.getText("NO_RECORDING");
					}

					if (totalAssignments[1] === 1) {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENT");
					} else if (totalAssignments[1] === 0) {
						assignments = this.oBundle.getText("NO_ASSIGNMENT");
					} else {
						assignments = this.oBundle.getText("TOTAL_ASSIGNMENTS", [totalAssignments[1]]);
					}

					if (totalApprovedHours[1] === 0) {
						approvedHrsTxt = " ";
					} else {
						approvedHrsTxt = this.oBundle.getText("TOTAL_APPROVED_HOURS", [totalApprovedHours[1]]);
					}
					if (totalTargetHrs[1] !== 0 && this.withTargetHours) {
						targetHrsTxt = this.oBundle.getText("TOTAL_TARGET_HOURS", [totalTargetHrs[1]]);
					} else {
						targetHrsTxt = "  ";
					}
					this.byId("MTS3_CURRENT_WEEK_INFO_2").setNumber(recordedHrsTxt);
					this.byId("MTS3_TARGET_TIME_2").setText(targetHrsTxt);
					this.byId("MTS3_TXT_ASSIGNMENTS_2").setText(assignments);
					this.byId("MTS3_TXT_APPROVED_HOURS_2").setText(approvedHrsTxt);
				}

			},
			getActualOffset: function(firstDayOffset, currentDay) {
				var constantOffset = 7;
				if (firstDayOffset > currentDay) {
					return currentDay + constantOffset - firstDayOffset;
				} else {
					return currentDay - firstDayOffset;
				}
			},

			pushUniqueElements: function(entries, entryData) {
				if (!entries) {
					return null;
				}
				for (var j = 0; j < entries.length; j++) {
					var str = entries[j].mainName + ":" + entries[j].mainCode + ",";
					for (var i = 0; typeof(entries[j].childNames) !== "undefined" && i < entries[j].childNames.length; i++) {
						str += entries[j].childNames[i] + ":" + entries[j].childCodes[i] + ",";
					}

					if (entryData.length) {
						for (i = 0; i < entryData.length; i++) {
							if (str === entryData[i]) {
								break;
							}
						}
						if (i === entryData.length) {
							entryData.push(str);
						}
					} else {
						entryData.push(str);
					}
				}
				return entryData;
			},
			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},

			formatTime: function(oTime) {
	          var timeString;                                                         //NOTE 2356935
				/**
				 * @ControllerHook Modify the format of the time
				 * This hook method can be used to chnage the format of the time from HH:MM to decimals
				 * It is called while it is changing the format.
				 * @callback hcm.mytimesheet.view.S3~extHookChangeFormatTime
				 * @param {object}  Object
				 * @return {object} Object
				 */	          
			  if(this.extHookChangeFormatTime)	                                      //NOTE 2356935
			  {                                                                       //NOTE 2356935
			  	timeString = extHookChangeFormatTime(oTime);                          //NOTE 2356935
			  } else                                                                  //NOTE 2356935
			  {                                                                       //NOTE 2356935
				var mins = oTime * 60;
				var h = Math.floor(mins / 60).toString();
				if (h.length === 1) {
					h = "0" + h;
				}
				var m = (mins % 60).toFixed(0);
				if (m.length === 1) {
					m = "0" + m;
				}
				timeString = h + ":" + m;                                             //NOTE 2356935
			  }                                                                       //NOTE 2356935
			  return timeString;                                                      //NOTE 2356935
			},

			parseDateYYYYMMdd: function(dateString) {
				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.parse(dateString);
			},
			formatDateYYYYMMdd: function(oDate) {
				if (typeof oDate === "string") {
					oDate = new Date(oDate);
				}

				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.format(oDate);
			},

			getPostData: function(day, entry) {
				var post = {};

				post.day = day;
				post.entry = entry;

				return post;

			},

			openConfirmationPopup: function(oSettings, isSubmit) {
				var self = this;
				var oElements = [];
				for (var i = 0; i < oSettings.additionalInformation.length; i++) {
					oElements.push(new sap.m.Label({
						text: oSettings.additionalInformation[i].label,
						design: "Bold"
					}));
					oElements.push(new sap.m.Text({
						text: oSettings.additionalInformation[i].text
					}));
				}
				var oForm = new sap.ui.layout.form.SimpleForm({
					minWidth: 1024,
					editable: false,
					maxContainerCols: 2,
					layout: "ResponsiveGridLayout",
					labelSpanL: 7,
					labelSpanM: 7,
					labelSpanS: 7,
					emptySpanL: 1,
					emptySpanM: 1,
					emptySpanS: 1,
					columnsL: 1,
					columnsM: 1,
					columnsS: 1,
					content: oElements
				});
				var oConfirmDialog = new sap.m.Dialog({
					title: oSettings.title,
					content: [oForm],
					beginButton: new sap.m.Button({
						text: oSettings.confirmButtonLabel,
						press: function() {
							self.submitTime(isSubmit);
							oConfirmDialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: function() {
							oConfirmDialog.close();
						}
					})
				});
				oConfirmDialog.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
				oConfirmDialog.open();
			},

			//Calculation for Release Entries
			releaseEntriesSummary: function(bUpdatePageData) {

				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItems = oTableRef.getSelectedItems();

				// Deleted Hours Summary
				var deletedHours = 0,
					deletedMinutes = 0,
					deletedTime = 0,
					numberOfItemsSelectedForSubmittion = 0;
				var dayIndex, entryIndex, entry, selectedDate, curDate = new Date();
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				//						var releaseFutureDates = oModel.getProperty("/releaseFuture");
				for (var i = 0; i < selectedItems.length; i++) {
					if (!selectedItems[i].data().header) {
						dayIndex = selectedItems[i].data().day;
						entryIndex = selectedItems[i].data().entry;
						entry = oPageData.days[dayIndex].entries[entryIndex];
						selectedDate = selectedItems[i].data().dateSelected;

						// when new entry line has been selected
						if (!entry) {
							continue;
						}

						if (entry.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(selectedDate, curDate))) { // || entry.statusId === "REJECTED") {
							if (bUpdatePageData) {
								//updating the pagedata with Boolean Release Allowed as true
								this.updatePageData(false, dayIndex, entry, true);
							}
							deletedHours += entry.hours;
							deletedMinutes += entry.minutes;
							deletedTime += entry.time;
							deletedTime = parseFloat(deletedTime.toFixed(2));
							numberOfItemsSelectedForSubmittion++; //count for submitted entries
						}

						if (deletedMinutes > 59) {
							deletedMinutes -= 60;
							deletedHours++;
						}
					}
				}
				var releaseData = [];
				if (this.clockEntry) {
					deletedTime = deletedHours;
					deletedTime += (deletedMinutes / 60);
					deletedTime = parseFloat(deletedTime.toFixed(2));
				}

				releaseData.push(numberOfItemsSelectedForSubmittion);
				releaseData.push(deletedHours);
				releaseData.push(deletedMinutes);
				releaseData.push(deletedTime); // display total decimal time

				return releaseData;
			},

			onSubmit: function() {

				var releaseData = [];
				var oSettings = null,
					totalDurationText;
				releaseData = this.releaseEntriesSummary(false);
				totalDurationText = this.formatTime(releaseData[3].toString());
				/*sap.ca.ui.model.format.NumberFormat.getInstance({
					style: "standard"
				}).format(releaseData[3].toString());*/

				if (!this.clockEntry) {
					var totalDuration = this.oBundle.getText("TOTAL_DURATION");
					oSettings = {
						question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
						//additionalInformation : [],
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: releaseData[0].toString()
						}, {
							label: totalDuration,
							text: totalDurationText
						}],
						showNote: false,
						title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				} else {
					oSettings = {
						question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: this.formatTime(releaseData[0].toString())
						}, {
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
							text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [releaseData[1], releaseData[2]])
						}],
						showNote: false,
						title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}
				// var _this = this;

				// open confirmation popup
				this.openConfirmationPopup(oSettings, true);
				/*sap.ca.ui.dialog.confirmation.open(oSettings, function(response) {
					if (response.isConfirmed === true) {
						_this.submitTime(true);
					}
				});*/

			},

			submitTime: function(submitFlag) {
				var self = this;
				if (submitFlag) {
					this.releaseEntriesSummary(true);
				}

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var newDays = oModel.getData().days;
				this.errors = null;

				var updatedDays = [];
				var deletedDays = [];

				for (var i = 0; i < newDays.length; i++) {

					for (var j = 0; j < newDays[i].entries.length; j++) {

						if (newDays[i].entries[j].deleted && (newDays[i].entries[j].counter !== "" || newDays[i].entries[j].counter === null)) {
							deletedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date), newDays[i].entries[j]));
						} else {
							if (this.oldDays[i]) {
								for (var k = 0; k < this.oldDays[i].entries.length; k++) {
									if (newDays[i].entries[j].counter === this.oldDays[i].entries[k].counter && newDays[i].entries[j].counter !== "") {

										var item1 = newDays[i].entries[j];
										var item2 = this.oldDays[i].entries[k];

										if (item1.time !== item2.time || item1.notes !== item2.notes || item1.mainItem !== item2.mainItem || item1.subItems !== item2.subItems ||
											item1.hours !== item2.hours || item1.minutes !== item2.minutes || item1.startTime !== item2.startTime || item1.endTime !== item2
											.endTime) {

											if (!newDays[i].entries[j].deleted) {

												updatedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date), newDays[i].entries[j]));

											}
										}
									}
								}
							}
						}
						if (newDays[i].entries[j].statusId === "MSAVE" && newDays[i].entries[j].bToBeReleased) {

							updatedDays.push(this.getPostData(this.getDateTimeStr(newDays[i].date),

								newDays[i].entries[j]));

						}

					}
				}
				// lock UI until submit is done to prevent double click
				// sap.ui.getCore().lock();

				var batchUpdate = [];
				var batchDelete = [];

				if (updatedDays.length !== 0) {

					for (i = 0; i < updatedDays.length; i++) {
						updatedDays[i].entry = this.replaceSpecialChar(updatedDays[i].entry);

						batchUpdate.push(self.setPostObject(
							updatedDays[i].entry.counter,
							"U",
							updatedDays[i].day,
							updatedDays[i].entry.time,
							updatedDays[i].entry.mainName,
							updatedDays[i].entry.mainCode,
							updatedDays[i].entry.notes,
							updatedDays[i].entry.startTime,
							updatedDays[i].entry.endTime,
							updatedDays[i].entry.subItems,
							updatedDays[i].entry.childCodes,
							updatedDays[i].entry.childNames));
					}
				}

				if (deletedDays.length !== 0) {

					for (i = 0; i < deletedDays.length; i++) {
						deletedDays[i].entry = this.replaceSpecialChar(deletedDays[i].entry); //Note 1994402: Replacing Special Character

						batchDelete.push(self.setPostObject(
							deletedDays[i].entry.counter,
							"D",
							deletedDays[i].day,
							deletedDays[i].entry.time,
							deletedDays[i].entry.mainName,
							deletedDays[i].entry.mainCode,
							deletedDays[i].entry.notes,
							deletedDays[i].entry.startTime,
							deletedDays[i].entry.endTime,
							deletedDays[i].entry.subItems,
							deletedDays[i].entry.childCodes,
							deletedDays[i].entry.childNames));

					}
				}

				if (batchUpdate.length === 0 && batchDelete.length === 0) {
					// if there is nothing to submit, just act like a cancel
					sap.m.MessageToast.show(self.oConfiguration.getText("SUBMIT_SUCCESS"));

				} else {
					//     var combinedBatch = [];
					// 	combinedBatch = batchUpdate.concat(batchDelete);
					self.oService.submitTimeEntry(self, [], batchUpdate, batchDelete, function() {
						//NOTE 2274962
						if (batchDelete.length !== 0) {
							sap.m.MessageToast.show(self.oConfiguration.getText("DELETE_SUCCESS"));
						} else {
							sap.m.MessageToast.show(self.oConfiguration.getText("SUBMIT_SUCCESS"));
						}
						if (!self.errors) {
							self.updateData();
						}
					}, function(hasError, errorDates) {
						self.updateData();
					});
				}

			},

			setPostObject: function(Counter, TimeEntryOperation, WORKDATE, CATSAMOUNT, Name, Code, notes, startTime,
				endTime, subItems, childCodes, childNames) {
				var timeEntryUpdated = {
					Counter: Counter,
					TimeEntryOperation: TimeEntryOperation,
					TimeEntryDataFields: {
						WORKDATE: WORKDATE,
						CATSAMOUNT: "" + CATSAMOUNT,
						BEGUZ: startTime,
						ENDUZ: endTime
					}
				};

				// always setting to X for second screen
				if (TimeEntryOperation !== "D") {
					timeEntryUpdated.TimeEntryRelease = "X";
				}
				if (this.checkFieldName(Name) === true) { //Note 1959135: Added additional check
					timeEntryUpdated.TimeEntryDataFields[Name] = Code;
				}

				if (subItems && subItems !== "") {
					for (var i = 0; i < childNames.length; i++) {
						if (this.checkFieldName(childNames[i]) === true) { //Note 1959135: Added additional check
							timeEntryUpdated.TimeEntryDataFields[childNames[i]] = childCodes[i];
						}
					}
				}
				if (notes && notes !== "") {
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT_DATA = notes;
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT = "X";
				}

				/**
				 * @ControllerHook Modify the post object
				 * This hook method can be used to modify the object before the post call
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S3~extHookChangeObjectBeforePost
				 * @param {object} Post Object
				 * @return {object} Final Post Object
				 */

				if (this.extHookChangeObjectBeforePost) {
					timeEntryUpdated = this.extHookChangeObjectBeforePost(timeEntryUpdated);
				}

				return timeEntryUpdated;
			},

			checkDate: function(date, curDate) {
				if (date.getFullYear() >= curDate.getFullYear() && date.getMonth() >= curDate.getMonth() && date.getDate() > curDate.getDate()) {
					return true;
				}
				return false;
			},

			checkFieldName: function(fieldName) {
				var checkString = fieldName;
				if (checkString.match("DISPTEXT")) {
					return false;
				}
				if (checkString.match("CPR_OBJTEXT")) {
					return false;
				}
				if (checkString.match("CPR_TEXT")) {
					return false;
				}
				return true;
			},

			replaceAllOccurances: function(iString) {
				if (typeof iString === "undefined") {
					return null;
				}
				var vSearch = "/";
				var vReplace = "-";
				while (iString.indexOf(vSearch) > -1) {
					iString = iString.replace(vSearch, vReplace);
				}
				return iString;
			},
			replaceSpecialChar: function(entry) {
				if (typeof entry.mainName !== "undefined") {
					entry.mainName = this.replaceAllOccurances(entry.mainName);
				}
				if (typeof entry.subItems !== "undefined") {
					entry.subItems = this.replaceAllOccurances(entry.subItems);
				}
				if (typeof entry.childNames !== "undefined") {
					for (var i = 0; i < entry.childNames.length; i++) {
						entry.childNames[i] = this.replaceAllOccurances(entry.childNames[i]);
					}
				}

				return entry;
			},

			onCopy: function() {
				var oModel, oPageData, oViewData;
				var dayIndex;
				var entryIndex;
				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItem = [];
				selectedItem = oTableRef.getSelectedItems();

				dayIndex = selectedItem[0].data().day;
				entryIndex = selectedItem[0].data().entry;

				oModel = this.oApplication.getModel("TSM_WEEKLY");

				oPageData = oModel.getData();
				oPageData.days[dayIndex].entries[entryIndex].counter = "";

				oViewData = {
					entry: oPageData.days[dayIndex].entries[entryIndex],
					pageData: oPageData,
					dayIndex: dayIndex,
					entryIndex: entryIndex
				};

				this.oApplication.getModel("S31modelexch").setProperty("/editeddata", oViewData);
				this.oApplication.getModel("S31modelexch").setProperty("/copySelected", true);

				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", []);

				this.oRouter.navTo("S31", {
					context: oModel.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onItemSelectGotoEdit: function(oEvent) {
				var item = oEvent.getSource();
				var itemData = item.data();
				var oModel, oPageData, oViewData;
				var dayIndex = itemData.day;
				var entryIndex = itemData.entry;

				oModel = this.oApplication.getModel("TSM_WEEKLY");

				oPageData = oModel.getData();

				oViewData = {
					entry: oPageData.days[dayIndex].entries[entryIndex],
					pageData: oPageData,
					dayIndex: dayIndex,
					entryIndex: entryIndex
				};

				this.oApplication.getModel("S31modelexch").setProperty("/editeddata", oViewData);
				this.oApplication.getModel("S31modelexch").setProperty("/editentryview", true);

				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", [itemData.dateSelected]);

				this.oRouter.navTo("S31", {
					context: oModel.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onItemSelect: function(oEvent) {
				this.selectDateOnAllCheckBoxSelection(oEvent.getSource());

				if (oEvent.getSource().getSelectedItems().length === 0) {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);

					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);

					this.setBtnEnabled("copyBtn", false);

				} else {
					var selList = oEvent.getSource().getSelectedItems();
					var isHeader;
					for (var i = 0; i < selList.length; i++) {
						isHeader = selList[i].data().header;
						if (!isHeader) {
							this.findCount(oEvent);
						}

					}

				}

			},

			findCount: function(oEvent) {
				var selList = oEvent.getSource().getSelectedItems();
				var isHeader, selectedDate, curDate = new Date(),
					dayIndex, entryIndex, entry;
				var deleteCount = 0,
					submitCount = 0;
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				for (var i = 0; i < selList.length; i++) {
					isHeader = selList[i].data().header;
					selectedDate = selList[i].data().dateSelected;

					if (!isHeader) {
						deleteCount++;
						dayIndex = selList[i].data().day;
						entryIndex = selList[i].data().entry;
						entry = oPageData.days[dayIndex].entries[entryIndex];
						if (entry.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(selectedDate, curDate))) {
							submitCount++;
						}
					}
				}

				if (submitCount === 0) {
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);
				} else {
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + submitCount + ")");
					this.setBtnEnabled("SUBMIT_BTN", true);
				}

				if (deleteCount === 0) {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);
				} else {
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + deleteCount + ")");
					this.setBtnEnabled("deleteBtn", true);
				}

				//copy function
				if (deleteCount === 1 && oEvent.getSource().getSelectedItems().length === 1) {
					this.setBtnEnabled("copyBtn", true);
				} else {
					this.setBtnEnabled("copyBtn", false);
				}

			},

			onSelect: function(oEvent) {
				var selectedDate = new Date(oEvent.getParameter("date"));
				var didSelect = oEvent.getParameter("didSelect");
				this.selectDate(selectedDate, didSelect);
				// this.scrollTo(oEvent);
			},
			scrollTo: function(index) {
				var list = this.byId("ENTRY_LIST_CONTENTS");
				var item = list.getItems()[index];
				var scroll_to_y = item.$().get(0).offsetTop;
				this.byId("scroller").scrollTo(0, scroll_to_y, 500);
			},
			compareDays: function(a, b) {
				if (parseInt(a.dateStr, 10) > parseInt(b.dateStr, 10)) {
					return 1;
				} else {
					return -1;
				}
			},
			selectDate: function(selectedDate, selectedOrUnselected) {
				var dateStr = selectedDate.toDateString();
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var itemSelected = 0;
				oModel.setProperty("/selected", dateStr);
				//						var valuesPresent = false;
				if (this.entryListContents) {
					var items = this.entryListContents.getItems();
					var itemData;
					for (var i = 0; i < items.length; i++) {
						itemData = items[i].data();
						if (itemData.dateSelected.toDateString() === dateStr && !itemData.header) {
							items[i].setSelected(selectedOrUnselected);
							itemSelected = i;
						}
					}

					var selList = this.byId("ENTRY_LIST_CONTENTS").getSelectedItems();

					if (selList.length === 0) {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
						this.setBtnEnabled("deleteBtn", false);
					} else {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + selList.length + ")");
						this.setBtnEnabled("deleteBtn", true);
					}

					//Submit Button update

					var releaseSummaryInfo = this.releaseEntriesSummary(false);
					if (releaseSummaryInfo[0] === 0) {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
						this.setBtnEnabled("SUBMIT_BTN", false);
					} else {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + releaseSummaryInfo[0] + ")");
						this.setBtnEnabled("SUBMIT_BTN", true);
					}
					//copy button validation
					if (selList.length === 1) {
						this.setBtnEnabled("copyBtn", true);
					} else {
						this.setBtnEnabled("copyBtn", false);
					}
					if (selectedOrUnselected && itemSelected !== 0) {
						this.scrollTo(itemSelected);
					}

				}
			},

			// update calendar Data
			updateData: function() {
				// clean calendar
				var noOfWeeks;                                         //NOTE 2293728
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				oModel.setProperty("/red", "");
				oModel.setProperty("/green", "");
				oModel.setProperty("/grey", "");
				oModel.setProperty("/yellow", "");
				oModel.setProperty("/rejected", "");

				var weeklyCalendar = this.byId("WEEKLY_CALENDAR");
				weeklyCalendar.removeTypesOfAllDates();
				weeklyCalendar.unselectAllDates();
				oModel.setProperty("/activities", null);
				oModel.setProperty("/workingDayList", null);

				var self = this;
//BEGIN OF NOTE 2293728 				
				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 1;
				} else {
				    noOfWeeks = 2;
				}
				var curDate = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
				// var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(new Date(InitalInfoModel.StartDate.substring(0,4)+"-"+InitalInfoModel.StartDate.substring(4,6)+"-"+InitalInfoModel.StartDate.substring(6,8)).getDay(), curDate.getDay()));  //NOTE 2367454
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(new Date(InitalInfoModel.StartDate.substring(0,4)+"/"+InitalInfoModel.StartDate.substring(4,6)+"/"+InitalInfoModel.StartDate.substring(6,8)).getDay(), curDate.getDay()));     //NOTE 2370738
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + (7 * noOfWeeks - 1) );
				// update calendar
				this.oService.getWorkDays(this, this.oApplication.pernr, this.getDateStr(firstday), this.getDateStr(lastday), function(data) {
					self.getTimeSheetCalendar(data);
					if (oModel.getData().activities) {
						self.setWeeklyData(oModel.getData().activities);
					}
				});
				// this.oService.getWorkDays(this, this.oApplication.pernr, oModel.getData().weekStart, oModel.getData().weekEnd, function(data) {
				// 	self.getTimeSheetCalendar(data);
				// 	if (oModel.getData().activities) {
				// 		self.setWeeklyData(oModel.getData().activities);
				// 	}
				// });
				// update list
				this.oService.getTimeDataList(this, this.oApplication.pernr, this.getDateStr(firstday) , this.getDateStr(lastday), function(data) {
					oModel.setProperty("/activities", data);
					if (oModel.getData().workingDayList) {
						self.setWeeklyData(data);
					}
				});				
				// this.oService.getTimeDataList(this, this.oApplication.pernr, oModel.getData().weekStart, oModel.getData().weekEnd, function(data) {
				// 	oModel.setProperty("/activities", data);
				// 	if (oModel.getData().workingDayList) {
				// 		self.setWeeklyData(data);
				// 	}
				// });
//END OF NOTE 2293728				
				//Reseting Delete button on Submit and delete
				this.setBtnText("deleteBtn", self.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);
				this.setBtnText("SUBMIT_BTN", self.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);
				this.setBtnEnabled("copyBtn", false);
			},
			getTimeSheetCalendar: function(data) {

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var now = new Date(),
					grey = [],
					yaction = [],
					done = [],
					maction = [],
					rejected = [];
				var currentSelectedDay = oModel.getData().selected,
					firstWorkingDay = null,
					futureWorkDays = [],
					missingdays = [];
				var hasSelectedDay = false;

				var workingDayList = [];

				// get first day of the week
				var firstDayOff = -1;
				if (data.length > 0) {
					var firstDay = data[0].FirstDayOfWeek;
					if (firstDay === null) {
						firstDayOff = -1;
					} else if (firstDay === "MONDAY") {
						firstDayOff = 1;
					} else if (firstDay === "TUESDAY") {
						firstDayOff = 2;
					} else if (firstDay === "WEDNESDAY") {
						firstDayOff = 3;
					} else if (firstDay === "THURSDAY") {
						firstDayOff = 4;
					} else if (firstDay === "FRIDAY") {
						firstDayOff = 5;
					} else if (firstDay === "SATURDAY") {
						firstDayOff = 6;
					} else if (firstDay === "SUNDAY") {
						firstDayOff = 0;
					}
				}

				for (var i = 0; i < data.length; i++) {
					var dateToWork = data[i].Date;
					var workingDay = data[i].WorkingDay === "TRUE";
					var date = new Date(parseInt(dateToWork.substring(0, 4), 10),
						parseInt(dateToWork.substring(4, 6), 10) - 1, parseInt(dateToWork.substring(6, 8), 10));
					workingDayList.push({
						date: dateToWork,
						workingDay: workingDay,
						targetHours: parseFloat(data[i].TargetHours.trim()),
						startTime: data[i].StartTime,
						endTime: data[i].EndTime
					});

					var status = data[i].Status;

					if (!workingDay) {
						// add to holidays to grey out
						grey.push(date);
					} else {

						if (!firstWorkingDay) {
							firstWorkingDay = dateToWork;
						}
						if (!hasSelectedDay && currentSelectedDay === dateToWork) {
							hasSelectedDay = true;
						}
						if (status === "YACTION") {
							// add missing days as yaction
							missingdays.push(data[i].Date);
							// fill yaction only if earlier then today
							if (now.getTime() > date.getTime()) {
								yaction.push(date);
							} else {
								futureWorkDays.push(date);
							}
						} else if (status === "MACTION") {
							maction.push(date);
						} else if (status === "REJECTED") {
							rejected.push(date);
						} else if (status === "DONE") {
							done.push(date);
						}
					}

				}

				oModel.setProperty("/workingDayList", workingDayList);
				var weeklyCal = this.byId("WEEKLY_CALENDAR");
				// set in calendar only if get meaningful value from service
				if (firstDayOff > 0) {
					weeklyCal.setFirstDayOffset(firstDayOff);
				}
				weeklyCal.toggleDatesType(futureWorkDays, sap.me.CalendarEventType.Type10, true);    //NOTE 2263704
				weeklyCal.toggleDatesType(maction, sap.me.CalendarEventType.Type04, true);
				weeklyCal.toggleDatesType(done, sap.me.CalendarEventType.Type01, true);
				weeklyCal.toggleDatesType(grey, sap.me.CalendarEventType.Type00, true);
				weeklyCal.toggleDatesType(yaction, sap.me.CalendarEventType.Type07, true);
				weeklyCal.toggleDatesType(rejected, sap.me.CalendarEventType.Type06, true);

				// set array of legend to global model
				var aLegend = {
					'yellow': maction,
					'green': done,
					'grey': grey,
					'red': yaction,
					'rejected': rejected,
					'FutureWorkingDays': futureWorkDays
				};

				var oLegendControl = this.byId("LEGEND");
				if (done.length > 0) {
					oLegendControl.setLegendForType01(this.oBundle.getText("FILLED_DAY"));
				} else if (oLegendControl.getLegendForType01()) { //Note 2115732
					oLegendControl.setLegendForType01(null);
				}
				if (maction.length > 0) {
					oLegendControl.setLegendForType04(this.oBundle.getText("FILLED_MANAGER"));
				} else if (oLegendControl.getLegendForType04()) {
					oLegendControl.setLegendForType04(null);
				}
				if (yaction.length > 0) {
					oLegendControl.setLegendForType07(this.oBundle.getText("MISSING_DAY"));
				} else if (oLegendControl.getLegendForType07()) {
					oLegendControl.setLegendForType07(null);
				}
				if (rejected.length > 0) {
					oLegendControl.setLegendForType06(this.oBundle.getText("REJECTED"));
				} else if (oLegendControl.getLegendForType06()) {
					oLegendControl.setLegendForType06(null);
				}
				if (futureWorkDays.length > 0) {
					oLegendControl.setLegendForNormal(this.oBundle.getText("WORKING_DAY"));
				} else if (oLegendControl.getLegendForNormal()) {
					oLegendControl.setLegendForNormal(null);
				}
				if (grey.length > 0) {
					oLegendControl.setLegendForType00(this.oBundle.getText("NON_WORKING_DAY"));
				} else if (oLegendControl.getLegendForType00()) {
					oLegendControl.setLegendForType00(null); //End Note 2115732
				}
				oLegendControl.setLegendForToday(this.oBundle.getText("CURRENT_DAY"));
				oLegendControl.setLegendForSelected(this.oBundle.getText("SELECTED_DAY"));
				oLegendControl.setLegendForSelected00(this.oBundle.getText("SELECTED_NW_DAY"));

				oModel = this.oApplication.getModel("TSM_WEEKLY");
				oModel.setProperty("/legendforS31", aLegend);

			},

			onAddNewEntry: function() {

				var selectedDatesFromCalendar = this.byId("WEEKLY_CALENDAR").getSelectedDates();
				var dateStr;
				for (var i = 0; i < selectedDatesFromCalendar.length; i++) {
					selectedDatesFromCalendar[i] = new Date(selectedDatesFromCalendar[i]);
				}
				/*if(selectedDatesFromCalendar.length !== 0){
				    dateStr = selectedDatesFromCalendar[0].toDateString();
				}
				else{
				    dateStr = this.oApplication.getModel("TSM_WEEKLY").getProperty("/selectedDate").toDateString();
				}*/
				dateStr = this.byId("WEEKLY_CALENDAR").getCurrentDate();
				this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", selectedDatesFromCalendar);
				this.oApplication.getModel("S31modelexch").setProperty("/editentryview", false);

				this.oRouter.navTo("S31", {
					context: dateStr + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
				}, true);

			},

			onCalendarWeekChange: function(oEv) {

				var curDate = new Date(oEv.getParameter("currentDate"));
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var selectedDates = oEv.getSource().getSelectedDates();
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
				}
				var firstday = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR")
					.getFirstDayOffset(), curDate.getDay()));

				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);

				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				// oModel.setProperty("/start", this.getDateStr(curDate));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));

				this.setBtnEnabled("SUBMIT_BTN", false);
				this.lastSelected = oModel.getData().selected;

				this.updateData();
				this.calendarModel = oModel;
				var d, arrayOfDates = [];
				for (var i = 0; i < selectedDates.length; i++) {
					d = new Date(selectedDates[i]);
					if (d.getTime() >= firstday && d.getTime() <= lastday.getTime()) {
						arrayOfDates.push(d);
					}
				}
				if (arrayOfDates.length > 0) {
					oEv.getSource().toggleDatesSelection(arrayOfDates, true);
				}
				//Reseting and disabling the Delete Button text 
				this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
				this.setBtnEnabled("deleteBtn", false);

				this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
				this.setBtnEnabled("SUBMIT_BTN", false);

				this.setBtnEnabled("copyBtn", false);
			},

			getDateStr: function(date) {
				return "" + date.getFullYear() + ("" + (date.getMonth() + 101)).substring(1) + ("" + (date.getDate() + 100)).substring(1);
			},

			getDateTimeStr: function(date) {
				return "" + date.getFullYear() + "-" + ("" + (date.getMonth() + 101)).substring(1) + "-" + ("" + (date.getDate() + 100)).substring(1) +
					"T00:00:00";
			},

			setWeeklyData: function(data) {
				//get the main model for this view
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = {
					days: []
				};
				var lastRecordNumber = null,
					oDayData = null,
					date;
				var recordedHrs, approvedHrs, i, j, bHasEntries, insertPosition, lastDate = null;
				var oEntryData = {};
				var workingDayList = oModel.getData().workingDayList;
				for (i = 0; i < data.length; i++) {

					if (data[i].FieldName === "WORKDATE") {
						if (lastDate === null || data[i].FieldValue !== lastDate) {
							lastDate = data[i].FieldValue;
							date = new Date(parseInt(data[i].FieldValue.substring(0, 4), 10), parseInt(data[i].FieldValue
								.substring(4, 6), 10) - 1, parseInt(data[i].FieldValue.substring(6, 8), 10));
							oDayData = {
								date: date,
								dateStr: data[i].FieldValue,
								dateFormatted: this.convertDateFormat(date),
								targetHours: this.getTargetHours(data[i].FieldValue, workingDayList),
								entries: [],
								workingDay: this.getWorkingDay(data[i].FieldValue, workingDayList)
							};
							oPageData.days.push(oDayData);
							lastRecordNumber = null;
						}
					}
					if (lastRecordNumber === null || data[i].RecordNumber !== lastRecordNumber) {
						lastRecordNumber = data[i].RecordNumber;
						oEntryData = new hcm.mytimesheet.model.TimeEntry(0, "", data[i].Suggested === "TRUE", true);

						oDayData.entries.push(oEntryData);
					}
                    if (data[i].FieldName === "MEINH") {                               //NOTE 2370738
                      oEntryData.timeUnit = data[i].FieldValue;                        //NOTE 2370738
                    }                                                                  //NOTE 2370738
					
					oEntryData.setData(data[i]);
				}

				oPageData.days.sort(this.compareDays);                 

				for (i = 0; i < workingDayList.length; i++) {
					if (workingDayList[i].workingDay) {
						bHasEntries = false;
						insertPosition = oPageData.days.length;
						for (j = 0; j < oPageData.days.length; j++) {
							if (workingDayList[i].date === oPageData.days[j].dateStr) {
								bHasEntries = true;
								break;
							}
							if (workingDayList[i].date < oPageData.days[j].dateStr) {
								insertPosition = j;
								break;
							}
						}
						if (!bHasEntries) {
							// this is a working day which is not in the list, so we
							// need to add a blank entry
							date = new Date(parseInt(workingDayList[i].date.substring(0, 4), 10), parseInt(
								workingDayList[i].date.substring(4, 6), 10) - 1, parseInt(workingDayList[i].date.substring(6, 8),
								10));
							oDayData = {
								date: date,
								dateStr: workingDayList[i].date,
								dateFormatted: this.convertDateFormat(date),
								targetHours: this.getTargetHours(workingDayList[i].date, workingDayList),
								workingDay: workingDayList[i],
								entries: []
							};
							oPageData.days.splice(insertPosition, 0, oDayData);
						}

					}
				}
				for (i = 0; i < oPageData.days.length; i++) {
					//find the recorded hours
					recordedHrs = 0;
					approvedHrs = 0;
					for (j = 0; j < oPageData.days[i].entries.length; j++) {
						recordedHrs += oPageData.days[i].entries[j].time;
						if (oPageData.days[i].entries[j].statusId === "DONE") {
							approvedHrs += oPageData.days[i].entries[j].time;
						}
					}
					oPageData.days[i].recordedHours = recordedHrs;
					oPageData.days[i].approvedHours = approvedHrs;
				}
				this.oldDays = jQuery.extend(true, {}, oPageData.days);
				oModel.setProperty("/days", oPageData.days);

				this.loadListWithoPageData(oPageData);

			},
			TimeEntry: function(time, childName, bExisting) {
				var x = {};
				x.time = time;
				x.hours = Math.floor(time);
				x.minutes = Math.round((time - Math.floor(time)) * 60);
				x.newEntry = !bExisting;
				x.mainItem = null;
				x.subItems = childName;
				x.notes = null;
				x.startTime = "";
				x.endTime = "";
				x.counter = "";
				x.hasNotes = false;
				x.showTime = bExisting;
				x.showError = false;
				x.error = "";
				x.status = "";
				//statusId for Status color in WeekEntry View
				x.statusId = "";
				return x;
			},
			getWorkingDay: function(date, workingDayList) {
				if (workingDayList) {
					for (var i = 0; i < workingDayList.length; i++) {
						if (workingDayList[i].date === date) {
							return workingDayList[i];
						}
					}
				}
				return null;
			},

			getTargetHours: function(date, workingDayList) {
				var workingDay = this.getWorkingDay(date, workingDayList);
				if (workingDay) {
					return workingDay.targetHours;
				}
				return 0;
			},
			convertDateFormat: function(date) {
				return sap.ui.core.format.DateFormat.getDateInstance({
					style: "medium"
				}).format(date);
			},

			YYYYMMDDtoDate: function(date_str) {
				var y = parseInt(date_str.substr(0, 4), 10);
				var m = parseInt(date_str.substr(4, 2), 10) - 1;
				var d = parseInt(date_str.substr(6, 2), 10);

				return new Date(y, m, d, 0, 0, 0, 0);
			},

			loadListWithoModel: function() {
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.loadListWithoPageData(oModel.getData());
			},

			loadListWithoPageData: function(oPageData) {
				if (oPageData.days === null) {
					return;
				}

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var selectedDate = this.convertDateFormat(this.YYYYMMDDtoDate(oModel.getData().selected));
				for (var i = 0; i < oPageData.days.length; i++) {
					var oDay = oPageData.days[i];
					oDay.selected = (selectedDate === oDay.dateFormatted);
				}
				this.loadList(oPageData.days);
			},
			initializeTable: function() {
				this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
				var headerCol = new sap.m.Column({
					hAlign: "Left",
					/*demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",*/
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>COST_ASSIGNMENT}"
					})
				});
				this.entryListContents.addColumn(headerCol);
				if (this.clockEntry) {

					headerCol = new sap.m.Column({
						hAlign: "Center",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>START_TIME}"
						})
					});

					this.entryListContents.addColumn(headerCol);

					headerCol = new sap.m.Column({
						hAlign: "Center",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>END_TIME}"
						})
					});

					this.entryListContents.addColumn(headerCol);

				}

				headerCol = new sap.m.Column({
					hAlign: "Center",
					demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>DURATION}"
					})
				});

				this.entryListContents.addColumn(headerCol);

				headerCol = new sap.m.Column({
					hAlign: "Right",
					demandPopin: true,
					minScreenWidth: "Tablet",
					popinDisplay: "Inline",
					header: new sap.m.Label({
						design: "Bold",
						text: "{i18n>STATUS}"
					})
				});
				/**
				 * @ControllerHook Modify the clumns in the table
				 * This hook method can be used to add and remove columns for the table used to display the entries
				 * It is called after the standard columns are added to the table
				 * @callback hcm.mytimesheet.view.S3~extHookAlterColumns
				 * @param {object} Table Header Object
				 * @return {object} Table Footer Object
				 */

				if (this.extHookAlterColumns) {
					headerCol = this.extHookAlterColumns(headerCol);
				}
				this.entryListContents.addColumn(headerCol);
			},
			loadList: function() {
				// load the main model for the view
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var days = oModel.getData().days;
				var self = this,
					recordedHrsTxt, date, target, recordedHrs;

				this.entryListContents.removeAllItems(); //removes all items from the table
				//Add columns
				for (var i = 0; i < days.length; i++) {
					if (days[i].entries.length) {
						date = days[i].date;
						// 	date = (date.toDateString()).substring(4);
						date = this.formatDateMMMDD(date);

						//new approach
						var oWeekEntryDayHeader = new sap.m.GroupHeaderListItem({
							// 		type: "Inactive"
							title: date,
							upperCase: false
						});
						oWeekEntryDayHeader.addCustomData(new sap.ui.core.CustomData({
							key: "dateSelected",
							value: days[i].date
						}));
						oWeekEntryDayHeader.addCustomData(new sap.ui.core.CustomData({
							key: "header",
							value: true
						}));
						var oObject = new sap.m.ObjectIdentifier({
							title: date
						});
						// 	oWeekEntryDayHeader.addCell(oObject);

						/*if (this.clockEntry) {
						oWeekEntryDayHeader.addCell(new sap.m.Label({
							text: " "
						}));
						oWeekEntryDayHeader.addCell(new sap.m.Label({
							text: " "
						}));
					}*/
						// 	recordedHrsTxt = days[i].recordedHours + " h out of " + days[i].targetHours + " h";
						// target = days[i].targetHours.toFixed(2);
						/*target = sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(days[i].targetHours.toFixed(2));
					recordedHrs = sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(days[i].recordedHours.toFixed(2));*/
						target = this.formatTime(days[i].targetHours.toFixed(2));
						recordedHrs = this.formatTime(days[i].recordedHours.toFixed(2));
						if (parseFloat(target, 10) !== 0 && this.withTargetHours) {
							if (parseFloat(recordedHrs, 10) === 1) { //Note 2115732
								recordedHrsTxt = this.oBundle.getText("WEEKLY_RECORDED_HOUR", [recordedHrs, target]);
							} else {

								recordedHrsTxt = this.oBundle.getText("WEEKLY_RECORDED_HOURS", [recordedHrs, target]);
							}
						} //End Note 2115732
						else {
							recordedHrsTxt = this.oBundle.getText("TOTAL_RECORDED_HOURS", [recordedHrs]);
						}
						oWeekEntryDayHeader.setCount(recordedHrsTxt);
						/*oWeekEntryDayHeader.addCell(new sap.m.Label({
						text: recordedHrsTxt
					}));
					oWeekEntryDayHeader.addCell(new sap.m.Label({
						text: " "
					}));*/
						this.entryListContents.addItem(oWeekEntryDayHeader);

						// set whether this day is selected or not
						// 	oWeekEntryDayHeader.setSelected(days[i].selected);

						// load the items for this day entry
						for (var j = 0; j < days[i].entries.length; j++) {
							var list_item_entry = days[i].entries[j];

							var oSingleListEntry = new sap.m.ColumnListItem({
								type: "Navigation",
								tap: function(oEvent) {
									self.onItemSelectGotoEdit(oEvent);
								}
							});
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "day",
								value: i
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "entry",
								value: j
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "dateformated",
								value: days[i].dateFormatted
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "dateSelected",
								value: days[i].date
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "selectedDate",
								value: days[i].dateStr
							}));
							oSingleListEntry.addCustomData(new sap.ui.core.CustomData({
								key: "header",
								value: false
							}));

							oObject = new sap.m.ObjectIdentifier({
								title: list_item_entry.mainItem,
								text: list_item_entry.subItems,
								badgeNotes: list_item_entry.hasNotes
							});
							if (list_item_entry.showError || list_item_entry.rejectionReason) {
								var cell = new sap.ui.layout.VerticalLayout();
								cell.addContent(oObject);

								if (list_item_entry.showError) {
									cell.addContent(new sap.m.ObjectStatus({
										text: list_item_entry.error,
										state: sap.ui.core.ValueState.Error
									}));
								} else {
									cell.addContent(new sap.m.ObjectStatus({
										text: list_item_entry.rejectionReason,
										state: sap.ui.core.ValueState.Error
									}));
								}
								oSingleListEntry.addCell(cell);
							} else {
								oSingleListEntry.addCell(oObject);
							}
							// 		var hrsMinText = list_item_entry.hours + this.oBundle.getText("HOURS_LABEL") + " " + list_item_entry.minutes + this.oBundle.getText("MINUTES_LABEL");
							//Datetime
							var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
								pattern: "HHmmss"
							});
							var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
								style: "medium"
							});
							var startTimeFormatted;
							var endTimeFormatted;
							var formattedDecimal = this.formatTime(list_item_entry.time.toFixed(2));
							if (this.clockEntry) {
								if (list_item_entry.startTime !== list_item_entry.endTime) { //Note: 2141131 clock time duration field
									startTimeFormatted = timeParser.parse(list_item_entry.startTime);
									oSingleListEntry.addCell(new sap.m.Label({
										text: timeFormatter.format(startTimeFormatted),
										design: "Bold"
									}));
									endTimeFormatted = timeParser.parse(list_item_entry.endTime);
									oSingleListEntry.addCell(new sap.m.Label({
										text: timeFormatter.format(endTimeFormatted),
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										//Checks and adds a dot or comma as required
										text: formattedDecimal,
										design: "Bold"
										/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(list_item_entry.time.toFixed(2))*/
									}));
								} else { //Note: 2141131 clock time duration field
									oSingleListEntry.addCell(new sap.m.Label({
										text: "-",
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										text: "-",
										design: "Bold"
									}));
									oSingleListEntry.addCell(new sap.m.Label({
										text: formattedDecimal,
										design: "Bold"
									}));
								} //Note: 2141131 clock time duration field	

							} else {

								oSingleListEntry.addCell(new sap.m.Label({
									//Checks and adds a dot or comma as required
									text: formattedDecimal,
									design: "Bold"
									/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: 'standard'
								}).format(list_item_entry.time.toFixed(2))*/
								}));
							}

							// Adding the status in the table
							var stateOfStatus;
							if (list_item_entry.statusId === "REJECTED") { //Note:Save should also be in red color         
								stateOfStatus = sap.ui.core.ValueState.Error;
							} else if (list_item_entry.statusId === "MSAVE") {
								stateOfStatus = sap.ui.core.ValueState.NONE;
							} else {
								stateOfStatus = sap.ui.core.ValueState.Success;
							}
							oSingleListEntry.setType("Navigation");
							oSingleListEntry.addCell(new sap.m.ObjectStatus({
								text: list_item_entry.status,
								state: stateOfStatus
							}));

							this.entryListContents.addItem(oSingleListEntry);

						}
					}
					/*if (jQuery.device.is.phone) {
					this.byId("WEEKLY_PAGE").setTitle(
						this.oBundle.getText("SUMMARY", [
									                                 this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().start)),
									                                 this.convertDateFormat(this.parseDateYYYYMMdd(oModel.getData().end))
									                                 ]));
				}*/
					/*if (jQuery.device.is.phone || jQuery.device.is.tablet) {
					var oSwipeContent = new sap.m.Button({
						text: this.oBundle.getText("DELETE"),
						type: "Reject"
					});
					self = this;
					oSwipeContent.attachPress(function() {
						var oData = oModel.getData();
						oData.days[self.dayIndex].entries[self.entryIndex].deleted = true;
						self.loadListWithoModel();
					});
					this.byId("ENTRY_LIST_CONTENTS").setSwipeContent(oSwipeContent);
				}*/

					//Filling the object headers with data

				}
				if (sap.ui.Device.system.phone) {
					this.setWeekOverviews(1);
				} else {
					this.setWeekOverviews(2);
				}

			},

			// code added for delete functionailty
			onDelete: function() {
				var oTableRef = this.byId("ENTRY_LIST_CONTENTS");
				var selectedItems = [];
				selectedItems = oTableRef.getSelectedItems();
				// Deleted Hours Summary
				var deletedHours = 0;
				var deletedMinutes = 0;
				var deletedTime = 0;
				var numberOfItemsGettingDeleted;
				var dayIndex;
				var entryIndex;
				var entry;
				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				var oPageData = oModel.getData();
				var oSettings = null;
				numberOfItemsGettingDeleted = selectedItems.length;
				for (var i = 0; i < selectedItems.length; i++) {
					dayIndex = selectedItems[i].data().day;
					entryIndex = selectedItems[i].data().entry;
					entry = oPageData.days[dayIndex].entries[entryIndex];
					this.updatePageData(true, dayIndex, entry, false);
					if (entry.subItems !== this.oApplicationFacade.getResourceBundle().getText("ADD_NEW")) {
						deletedHours += entry.hours;
						deletedMinutes += entry.minutes;
						deletedTime += entry.time;
						deletedTime = parseFloat(deletedTime.toFixed(2));
					} else {
						numberOfItemsGettingDeleted--;
					}
					if (deletedMinutes > 59) {
						deletedMinutes -= 60;
						deletedHours++;
					}
				}
				if (this.clockEntry) {

					oSettings = {
						question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: numberOfItemsGettingDeleted.toString()
						}, {
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
							text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [deletedHours, deletedMinutes])
						}],
						showNote: false,
						title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				} else {
					var totalDuration = this.oBundle.getText("TOTAL_DURATION");
					oSettings = {
						question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
						additionalInformation: [{
							label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
							text: numberOfItemsGettingDeleted.toString()
						}, {
							label: totalDuration,
							text: this.formatTime(deletedTime.toString())
							/*sap.ca.ui.model.format.NumberFormat.getInstance({
									style: "standard"
								}).format(deletedTime.toString())*/
						}],
						showNote: false,
						title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}

				this.openConfirmationPopup(oSettings, false);

				/*var _this = this;
				sap.ca.ui.dialog.confirmation.open(oSettings, function(response) {
					if (response.isConfirmed === true) {
						_this.submitTime(false);
					}
				});*/
			},
			updatePageData: function(bDeleted, dayIndex, entry, bToBeReleased) {
				if (!entry) {
					return;
				}

				this.entry = entry;
				this.dayIndex = dayIndex;
				if (bDeleted) {
					this.entry.deleted = true;
				}
				if (bToBeReleased) {
					this.entry.bToBeReleased = true;
				}

				// Prepare entry
				this.entry.newEntry = false;
				this.entry.showTime = true;
				if (!this.clockEntry) {
					this.entry.hours = parseInt(this.entry.hours, 10);
					this.entry.minutes = parseInt(this.entry.minutes, 10);
				} else {
					this.entry.startTime = entry.startTime;
					this.entry.endTime = entry.endTime;
					this.entry.hours = entry.hours;
					this.entry.minutes = entry.minutes;
					this.entry.time = entry.time;
				}

				this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;

				/*if (this.dayIndex < 0) {
					// this is a multi-day entry
					var calendar = this.byId("weeklyCalendar");
					var selectedDates = calendar.getSelectedDates();
					for (var i = 0; i < selectedDates.length; i++) {
						var entries = this.getDateEntries(selectedDates[i]);
						entries.push(jQuery.extend(true, {}, this.entry));

					}
				}*/
			},

			selectDateOnAllCheckBoxSelection: function(tblCntrl) {

				var listItems = tblCntrl.getItems();
				var selItems = tblCntrl.getSelectedItems();
				var selectedDates = [];
				var unSelectedDates = [];
				var j = 0;
				for (var i = 0; i < listItems.length; i++) {

					if (selItems[j] && (listItems[i].data().dateSelected === selItems[j].data().dateSelected)) {
						selectedDates.push(selItems[j].data().dateSelected);
						if (j < selItems.length) {
							j++;
						}
					} else {
						unSelectedDates.push(listItems[i].data().dateSelected);
					}

				}

				this.byId("WEEKLY_CALENDAR").toggleDatesSelection(unSelectedDates, false);
				this.byId("WEEKLY_CALENDAR").toggleDatesSelection(selectedDates, true);

				selectedDates = [];
				unSelectedDates = [];
			},

			getHeaderFooterOptions: function() {

				var that = this;
				var objHdrFtr = {
					sI18NFullscreenTitle: "TIMESHEET_TITLE",

					oEditBtn: {
						id: "QUICK_FILL_BTN",
						sI18nBtnTxt: "CREATE",
						onBtnPressed: function(evt) {
							that.onAddNewEntry(evt);
						}
					},

					buttonList: [{
						sId: "copyBtn",
						sI18nBtnTxt: "Copy",
						onBtnPressed: function(evt) {
							that.onCopy(evt);
						}
					}, {
						sId: "deleteBtn",
						sI18nBtnTxt: "DELETE",
						onBtnPressed: function(evt) {
							that.onDelete(evt);
						}
					}, {
						sId: "SUBMIT_BTN",
						sI18nBtnTxt: "SUBMIT",
						onBtnPressed: function(evt) {
							that.onSubmit(evt);
						}
					}]

				};
				var m = new sap.ui.core.routing.HashChanger();
				var oUrl = m.getHash();
				if (oUrl.indexOf("Shell-runStandaloneApp") >= 0) {
					objHdrFtr.bSuppressBookmarkButton = true;
				}
				/**
				 * @ControllerHook Modify the footer buttons
				 * This hook method can be used to add and change buttons for the detail view footer
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S3~extHookChangeHeaderFooterOptions
				 * @param {object} Header Footer Object
				 * @return {object} Header Footer Object
				 */

				if (this.extHookChangeHeaderFooterOptions) {
					objHdrFtr = this.extHookChangeHeaderFooterOptions(objHdrFtr);
				}

				return objHdrFtr;
			}

		});
},
	"hcm/mytimesheet/view/S3.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<sap.ui.core:View controllerName="hcm.mytimesheet.view.S3"\n\txmlns="sap.m" xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.layout="sap.ui.layout" xmlns:sap.me="sap.me"\n\txmlns:sap.ui.core="sap.ui.core">\n\t<Page id="WEEKLY_PAGE" title="{i18n>WEEKENTRY_TITLE}"\n\t\tenableScrolling="false">\n\t\t<content>\n\t\t<sap.ui.layout:FixFlex>\n\t\t\t<sap.ui.layout:fixContent>\n\t\t\t<sap.me:Calendar id="WEEKLY_CALENDAR"\n\t\t\t\tswipeToNavigate="true" design="Approval" singleRow="true"\n\t\t\t\tweeksPerRow="2" hideNavControls="false"\n\t\t\t\tcurrentDate="{ path: \'/start\', formatter:\'.parseDateYYYYMMdd\' }"\n\t\t\t\ttapOnDate="onSelect" enableMultiselection=\'true\' changeCurrentDate="onCalendarWeekChange">\n\t\t\t</sap.me:Calendar>\n\t\t\t</sap.ui.layout:fixContent>\n\t\t\t\n\t\t\t<sap.ui.layout:flexContent>\n\t\t\t<ScrollContainer id="scroller"\n                vertical="true"\n                height="100%"\n                focusable="true"\n                >\n                <content>\n                \n\n\t\t\t\t\t<sap.ui.layout:Grid id="MTS3_SUMMARY_GRID" defaultSpan="L6 M6 S12">\n\t\t\t\t\t\t<sap.ui.layout:content>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t<sap.ui.layout:VerticalLayout id="MTS3_FIRST_INFO"\n\t\t\t\t\t\t\t\twidth="100%">\n\n\t\t\t\t\t\t\t\t<ObjectListItem id="MTS3_CURRENT_WEEK_INFO_1"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_ASSIGNMENTS_1"  state="Error">\n\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t</firstStatus>\n\t\t\t\t\t\t\t\t\t<secondStatus>\n\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_APPROVED_HOURS_1" state="Success">\n\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t</secondStatus>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<attributes>\n    \t\t\t\t\t\t\t\t\t<ObjectAttribute />\n    \t\t\t\t\t\t\t\t\t<ObjectAttribute id="MTS3_TARGET_TIME_1"/>\n\t\t\t\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</sap.ui.layout:VerticalLayout>\n\t\t\t\t\t\t\t<sap.ui.layout:VerticalLayout id="MTS3_SECOND_INFO" \n\t\t\t\t\t\t\t\twidth="100%">\n\n\t\t\t\t\t\t\t\t<ObjectListItem id="MTS3_CURRENT_WEEK_INFO_2">\n\t\t\t\t\t\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_ASSIGNMENTS_2" \n\t\t\t\t\t\t\t\t\t\t\t\tstate="Error">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t\t</firstStatus>\n\t\t\t\t\t\t\t\t\t\t\t<secondStatus>\n\t\t\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_APPROVED_HOURS_2" \n\t\t\t\t\t\t\t\t\t\t\t\t\tstate="Success">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t\t\t</secondStatus>\n\t\t\t\t\t\t\t\t\t<attributes>\n\t\t\t\t\t\t\t\t\t\t<ObjectAttribute />\n\t\t\t\t\t\t\t\t\t\t<ObjectAttribute id="MTS3_TARGET_TIME_2" />\n\t\t\t\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\t\t\t</sap.ui.layout:VerticalLayout>\n\t\t\t\t\t\t</sap.ui.layout:content>\n\t\t\t\t\t</sap.ui.layout:Grid>\n\t\t\t\t\n\t\t\t<Table id="ENTRY_LIST_CONTENTS" mode="MultiSelect" select="onItemSelect">\n\t\t\t\n\t\t\t</Table>\n\t\t\t\n\n        <sap.me:CalendarLegend id="LEGEND" design="Approval">\n\t\t\t</sap.me:CalendarLegend>\n\t\t\t</content>\n\t\t\t</ScrollContainer>\n\t\t\t</sap.ui.layout:flexContent>\n\t\t\t</sap.ui.layout:FixFlex>\n        </content>\n\t</Page>\n</sap.ui.core:View>\n',
	"hcm/mytimesheet/view/S31.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ui.model.odata.datajs");
jQuery.sap.require("hcm.mytimesheet.model.TimeEntry");
jQuery.sap.require("hcm.mytimesheet.utils.DataManager");
jQuery.sap.require("hcm.mytimesheet.utils.ConcurrentEmployment");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.type.Number");
/*global hcm:true */
sap.ca.scfld.md.controller.BaseFullscreenController
	.extend(
		"hcm.mytimesheet.view.S31", {
			//controller hooks
			extHookChangeHeaderFooterOptions: null,
			extHookChangeObjectBeforePost: null,
			onInit: function() {
				sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
				this.RESULTS_TOP = 30;
				this.top = this.RESULTS_TOP;
				this.localSkip = 0;
				this.remoteSkip = 0;
				this.MODEL_SIZE_LIMIT = 1000;
				this.gv_fieldRelated = "";
				this.searchField_begDa = "";
				this.searchField_endDa = "";
				this.pagingEnabled = false;
				this.localTypeList = [];
				this.favoriteDeletedIds = [];
				this.remoteTypeList = [];
				this.resultsTotalCount = 0;
				this.remoteSearchPhrase = "";
				this.favoriteSelected = false;
				this.worklistSelectedObj = {};
				this.worklistItemSelected = false;
				this.continueSearchOnServerActive = false;
				this.initialize();
				this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
				var self = this;
				this.oRouter.attachRouteMatched(function(oEvent) {

					if (oEvent.getParameter("name") === "S31") {
						//only invoke if a pernr has been selected
						if (self.oApplication.pernr) {
							self.initializeView(oEvent.getParameter("arguments").context);
						} else {
							self.context = oEvent.getParameter("arguments").context;
						}
					}

				}, this);
			},

			onAfterRendering: function() {
				var self = this;
				if (!this.oApplication.pernr) {
					hcm.mytimesheet.utils.ConcurrentEmployment.getCEEnablement(this, function() {
						if (self.context) {
							self.initializeView(self.context);
						}
					});

				}
			},

			initializeView: function(context) {
				this.noneText = "(" + this.oBundle.getText("None") + ")";
				if (!this.oApplication.getModel("TSM_WEEKLY")) {
					var curDate = new Date();
					this.setInitialInfoModelData(curDate);
				}
				this.getHderFooterOptions();
				var createScreenModel = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(createScreenModel, "createScreenModel");

				this.worklistItemSelected = false;
				this.worklistSelectedObj = {};
				this.entry = new hcm.mytimesheet.model.TimeEntry(0, "", false, true);
				var firstDayOffSet = parseInt(context[context.indexOf("offset") + 6], 10);
				this.byId("weeklyCalendar").setFirstDayOffset(firstDayOffSet);
				var dateStr = decodeURIComponent(context),
					noOfWeeks;
				dateStr = dateStr.replace("offset", "");
				dateStr = dateStr.slice(0, -1);
				var weeklyModel = this.oApplication.getModel("TSM_WEEKLY");
				var date = new Date(dateStr);
				if (sap.ui.Device.system.phone) {
					this.byId("weeklyCalendar").setWeeksPerRow(1); //in case of mobile devices 1 week is shown
					noOfWeeks = 6;
				} else {
					noOfWeeks = 13;

				}
				var firstday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - this.getActualOffset(firstDayOffSet, date.getDay()));
				var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + noOfWeeks);
				//Getting the weekly model
				if (weeklyModel.getData().createdFromS31) {

					this.clockEntry = weeklyModel.getProperty("/clockEntry");
					createScreenModel.setProperty("/start", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekStart", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekEnd", this.getDateStr(lastday));
					weeklyModel.setProperty("/weekStart", this.getDateStr(firstday));
					weeklyModel.setProperty("/weekEnd", this.getDateStr(lastday));
				} else {
					createScreenModel.setProperty("/start", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekStart", this.getDateStr(firstday));
					createScreenModel.setProperty("/weekEnd", this.getDateStr(lastday));
					this.clockEntry = weeklyModel.getProperty("/clockEntry");
					this.releaseFuture = weeklyModel.getProperty("/releaseFuture");
					//Note 2115732 Correction for pop-up header starts here
					this.releaseAllowed = weeklyModel.getProperty("/releaseAllowed");
					//Note 2115732 Correction for pop-up header starts here
					this.FavoriteAvailable = weeklyModel.getProperty("/favoriteAvailable");
				}
				createScreenModel.setProperty("/clockEntry", this.clockEntry);
				createScreenModel.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
				createScreenModel.setProperty("/editButtonEnabled", false);
				createScreenModel.setProperty("/updateButtonEnabled", false);
				//Initializing the view
				this.initView();
				//call Profile Fields
				this.getProfileFields();
				//call Worklist
				this.getWorkListCollection();
				//call favorites
				this.getFavoritesCollection();

				this.getView().setModel(createScreenModel);

			},

			initialize: function() {
				if (!this.oApplication) {

					this.oApplication = this.oApplicationFacade.oApplicationImplementation;

					this.oConfiguration = new hcm.mytimesheet.utils.InitialConfigHelper();
					this.oService = new hcm.mytimesheet.Service();
					this.oConnectionManager = this.oApplication.oConnectionManager;
					this.oBundle = this.oApplicationFacade.oApplicationImplementation
						.getResourceBundle();
					this.oConfiguration.setResourceBundle(this.oBundle);

				}

			},

			setInitialInfoModelData: function(curDate) {
				var oModel = new sap.ui.model.json.JSONModel();
				var noOfWeeks = 13; //by default 2 weeks are shown
				if (sap.ui.Device.system.phone) {
					noOfWeeks = 6;
					this.byId("weeklyCalendar").setWeeksPerRow(1); //in case of mobile devices 1 week is shown

				}

				var first = curDate.getTime() - (curDate.getDay() * 24 * 60 * 60 * 1000); // First day is the day of the month - the day of the week
				var last = first + (noOfWeeks * 24 * 60 * 60 * 1000); // last day is the first day + 6

				var firstday = new Date(first);
				var lastday = new Date(last);
				this.oApplication.setModel(oModel, "TSM_WEEKLY");

				this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(curDate), this.getDateStr(curDate));
				oModel.setProperty("/showSubmit", false);
				oModel.setProperty("/selected", this.getDateStr(curDate));
				oModel.setProperty("/selectedDate", curDate);
				oModel.setProperty("/year", curDate.getFullYear());
				oModel.setProperty("/start", this.getDateStr(firstday));
				oModel.setProperty("/weekStart", this.getDateStr(firstday));
				oModel.setProperty("/weekEnd", this.getDateStr(lastday));
				oModel.setProperty("/createdFromS31", true);

				var InitalInfoModel = this.oConfiguration.getInitialInfoModel();

				this.releaseAllowed = InitalInfoModel.ReleaseDirectly === "TRUE";
				oModel.setProperty("/releaseAllowed", this.releaseAllowed);

				oModel.setProperty("/releaseFuture", InitalInfoModel.ReleaseFuture);
				this.releaseFuture = InitalInfoModel.ReleaseFuture;
				oModel.setProperty("/favoriteAvailable", InitalInfoModel.FavoriteAvailable);
				this.FavoriteAvailable = InitalInfoModel.FavoriteAvailable;
				this.clockEntry = (InitalInfoModel.ClockEntry === "TRUE");
				oModel.setProperty("/clockEntry", this.clockEntry);
				oModel.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
				return oModel;
			},

			initView: function() {
				var s3Model = this.oApplication.getModel("S31modelexch");
				var weeklyModel = this.oApplication.getModel("TSM_WEEKLY");
				this.byId("timeAssignment").setValue("");
				// this.byId("favName").setValue("");
				var createScreenModel = this.oApplication.getModel("createScreenModel");
				var days = ["Sun", "Mon", "Tue", "Wed", "Thu",
                            "Fri", "Sat"];
				if (!s3Model) {
					s3Model = new sap.ui.model.json.JSONModel();
					s3Model.setProperty("/selectedDates", weeklyModel.getProperty("/selectedDate"));
					s3Model.setProperty("/editentryview", false);
					this.oApplication.setModel(s3Model, "S31modelexch");
				}
				if (!this.FavoriteAvailable) {
					this.byId("timeAssignmentLbl").setText(this.oBundle.getText("SELECT_WORKLIST"));
				}
				var weeklyCal = this.byId("weeklyCalendar");
				weeklyCal.setEnableMultiselection(true);

				// set selected dates from previous screen
				weeklyCal.unselectAllDates();
				/*weeklyCal.toggleDatesSelection(s3Model
          .getData().selectedDates, true);*/
				if (!s3Model.getProperty("/editentryview")) {
					weeklyCal.setEnableMultiselection(true);
					weeklyCal.toggleDatesSelection(s3Model
						.getData().selectedDates, true);
					if (s3Model.getProperty("/copySelected")) {
						this.edit_entry = false;
						this.edit_entry_data = this.clone(s3Model.getData().editeddata);
						this.byId("accountingInfoPanel").setExpanded(true);
						this.editdatafroms3 = s3Model.getData().editeddata;
						this.entry = this.editdatafroms3.entry;
						this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
							style: "standard"
						}).format(this.entry.time);
						createScreenModel.setProperty("/entry", this.entry);
						if (this.isClockEntry()) {
							this.byId("startTime").setValue(this.entry.startTime);
							this.byId("endTime").setValue(this.entry.endTime);
						} else {
							this.byId("decimalTimeEntryValue").setValue(this.entry.time);
						}

						//setting notes
						if (this.entry.hasNotes) {
							this.byId("S31TextArea").setValue(this.entry.notes);
						}
					} else {
						this.edit_entry = false;
						this.byId("decimalTimeEntryValue").setValue("");
						this.byId("startTime").setValue("");
						this.byId("endTime").setValue("");
						//    weeklyCal.setDisabledWeekDays([]);
						this.byId("timeAssignment").setValue("");
					}

				} else {
					weeklyCal.toggleDatesSelection(s3Model
						.getData().selectedDates, true);
					this.edit_entry = true;
					this.edit_entry_data = this.clone(s3Model.getData().editeddata);
					this.byId("accountingInfoPanel").setExpanded(true);
					//    HFoption.sI18NFullscreenTitle = this.oBundle.getText("TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
					weeklyCal.setEnableMultiselection(true);
					this.editdatafroms3 = s3Model.getData().editeddata;
					this.entry = this.editdatafroms3.entry;
					this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
						style: "standard"
					}).format(this.entry.time);
					createScreenModel.setProperty("/entry", this.entry);
					if (this.isClockEntry()) {
						if (this.entry.startTime !== this.entry.endTime) { //Note: 2141131 clock time duration field
							this.byId("startTime").setValue(this.entry.startTime);
							this.byId("endTime").setValue(this.entry.endTime);
						} else { //Note: Begin 2141131 clock time duration field
							this.byId("ClkTimeDecimalTimeEntryValue").setValue(this.entry.time);
						} //Note:End 2141131 clock time duration field			

					} else {
						this.byId("decimalTimeEntryValue").setValue(this.entry.time);
					}
					// disable calendar in edit mode

					/*var selectedDay = weeklyCal.getSelectedDates()
						.toString().substr(0, 3);
					var disableDates = [];
					for (var key in days) {
						if (!(selectedDay === days[key])) {
							disableDates.push(key);
						}
					}
					var disable = selectedDay ? disableDates : null;
					weeklyCal.setDisabledWeekDays(disable);*/

					if (this.entry.hasNotes) {
						this.byId("S31TextArea").setValue(this.entry.notes);
					}
				}

				if (weeklyCal.getSelectedDates().length > 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle.getText(
							"SUBMIT_HEADER_TEXT", [this.formatDateMMMDD(new Date(weeklyCal.getSelectedDates()[0])),
                 weeklyCal.getSelectedDates().length - 1]));

				} else if (weeklyCal.getSelectedDates().length === 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle
						.getText(
							"SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(weeklyCal.getSelectedDates()[0]))]));

				} else {
					this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
					this.setBtnEnabled("SUBMIT_BTN", false);
				}

				if (s3Model.getData().pageData) {
					var legendArray = s3Model.getData().pageData.legendforS31;
					weeklyCal.toggleDatesType(legendArray.yellow, sap.me.CalendarEventType.Type04, true);
					weeklyCal.toggleDatesType(legendArray.green, sap.me.CalendarEventType.Type01, true);
					weeklyCal.toggleDatesType(legendArray.grey, sap.me.CalendarEventType.Type00, true);
					weeklyCal.toggleDatesType(legendArray.red, sap.me.CalendarEventType.Type07, true);
					weeklyCal.toggleDatesType(legendArray.rejected, sap.me.CalendarEventType.Type06, true);
				}

			},
			//deep copy of objects
			clone: function(obj) {
				// Handle the 3 simple types, and null or undefined
				if (obj === null || typeof obj !== "object") {
					return obj;
				}

				// Handle Object
				if (obj instanceof Object) {
					var copy = {};
					var attr = null;
					for (attr in obj) {
						if (obj.hasOwnProperty(attr)) {
							copy[attr] = this.clone(obj[attr]);
						}
					}
					return copy;
				}

				throw new Error("Unable to copy obj! Its type isn't supported.");
			},

			formatDateMMMDD: function(oDate) {
				var month = oDate.getMonth();
				var day = oDate.getDate();

				var dateString = this.oBundle.getText("MONTH_" + month) + " " + day;

				return dateString;
			},
			getActualOffset: function(firstDayOffset, currentDay) {
				var constantOffset = 7;
				if (firstDayOffset > currentDay) {
					return currentDay + constantOffset - firstDayOffset;
				} else {
					return currentDay - firstDayOffset;
				}
			},
			validate: function() {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: 2141131 clock time duration field
				this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false); //Note: 2141131 clock time duration field
				this.dateTimeModified = true;
				this.validateSaveBtnVisibility();
			},
			check_for_changed_data: function() {
				var calendar = this.byId("weeklyCalendar");
				var selectedDates = calendar.getSelectedDates();
				var duration = null;
				if (this.isClockEntry()) {
					var startTime = this.byId('startTime').getValue();
					var endTime = this.byId('endTime').getValue();

				} else {
					duration = this.byId('decimalTimeEntryValue').getValue();
				}
				var note_text = this.byId('S31TextArea').getValue();
				var suggested_cost_assignment_data = this.byId('COST_ASSIGNMENT_RECENTLY_USED_LIST').getValue();

				if (this.edit_entry) {
					//for edit entry check for any changed data
					var edit_entry_data = this.edit_entry_data; //has the original data
					var new_selectedDates = this.getDateStr(new Date(selectedDates[0]));
					var original_date = edit_entry_data.pageData.days[edit_entry_data.dayIndex].dateStr;
					var original_notes = edit_entry_data.entry.notes;
					var original_main_name = edit_entry_data.entry.mainName;
					var original_main_code = edit_entry_data.entry.mainCode;
					var accounting_infos = this.getView().getModel('fordynamictypes').getData().types; //current values
					var itemName;
					var itemCode;
					var selected_accounting_info;
					var startString, endString;
					var index, index2;
					//checking for any change in the time entered
					if (this.isClockEntry()) {
						var original_start_time = edit_entry_data.entry.startTime;
						var original_end_time = edit_entry_data.entry.endTime;
						if (original_start_time !== startTime || original_end_time !== endTime)
							return true;
					} else {
						var original_duration = edit_entry_data.entry.time;
						if (original_duration !== duration)
							return true;
					}

					//checking if there is any change in the accounting infos
					for (index = 0; index < accounting_infos.length; index++) {

						itemName = accounting_infos[index].fieldName;
						//comparing the main item to check for any change
						if (itemName === original_main_name) {
							selected_accounting_info = accounting_infos[index].value;
							startString = accounting_infos[index].value.indexOf('(');
							endString = accounting_infos[index].value.indexOf(')');
							itemCode = accounting_infos[index].value.substring(startString + 1, endString);
							if (itemCode !== original_main_code) {
								return true;
							}
						}
						//checking the child items for any change
						for (index2 = 0; edit_entry_data.entry.childItems && edit_entry_data.entry.childItems[index2]; index2++) {
							if (edit_entry_data.entry.childNames[index2] === itemName) {
								selected_accounting_info = accounting_infos[index].value;
								startString = accounting_infos[index].value.indexOf('(');
								endString = accounting_infos[index].value.indexOf(')');
								itemCode = accounting_infos[index].value.substring(startString + 1, endString);
								if (edit_entry_data.entry.childCodes[index2] !== itemCode) {
									return true;
								}
							}
						}
					}

					if (selectedDates.length > 1 || original_date !== new_selectedDates || original_notes !== note_text) {
						return true;
					}
					//Incase no items have changed
					return false;
				} else {
					//for new entries check for any data entered
					var manual_cost_assignment_data = false;

					var typesArray = this.getView().getModel('fordynamictypes').getData().types;
					if (typesArray) {
						for (var i = 0; i < typesArray.length; i++) {
							if (typesArray[i].value.trim()) {
								manual_cost_assignment_data = true;
							}
						}
					}
					//checking if any of the fields have some value or not
					if (this.isClockEntry()) {
						if (selectedDates.length !== 0 || startTime !== "" || endTime !== "" || suggested_cost_assignment_data !== "" ||
							manual_cost_assignment_data)
							return true;
					} else {
						if (selectedDates.length !== 0 || (duration !== "0" && duration !== "") || suggested_cost_assignment_data !== "" ||
							manual_cost_assignment_data)
							return true;
					}
					return false;
				}
			},

			onTapOnDate: function(oEvent) {
				var dateSelected = oEvent.getSource()
					.getSelectedDates();
				var numberOfDatesSelected = dateSelected.length;
				if (this.edit_entry) {
					var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "YYYYMMdd"
					});

					var editDate = dateParse.parse(this.edit_entry_data.pageData.days[this.edit_entry_data.dayIndex].dateStr);
					for (var i = 0; i < numberOfDatesSelected; i++) {
						var newDate = new Date(dateSelected[i]);
						if (!(newDate.getFullYear() === editDate.getFullYear() && newDate.getMonth() === editDate.getMonth() && newDate.getDate() ===
							editDate.getDate())) {
							oEvent.getSource().toggleDatesSelection([newDate.toDateString()], false);
						}
					}
					this.validateSaveBtnVisibility(oEvent);
					return;
				}
				this.validateSaveBtnVisibility(oEvent);
				if (numberOfDatesSelected > 1) {

					this.byId("createPanel").setHeaderText(
						this.oBundle.getText("SUBMIT_HEADER_TEXT", [
                 this.formatDateMMMDD(new Date(dateSelected[0])),
                 numberOfDatesSelected - 1]));
				} else if (numberOfDatesSelected === 1) {
					this.byId("createPanel").setHeaderText(
						this.oBundle.getText(
							"SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(dateSelected[0]))]));

				} else if (numberOfDatesSelected === 0) {
					this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
				}

			},
			validateSaveBtnVisibility: function() {
				var timeFlag = false;
				//checking the type of time entry and setting the flag true only for valid times
				if (this.isClockEntry()) {
					var startTime = this.byId("startTime").getValue();
					var endTime = this.byId("endTime").getValue();
					var clkTimeDuration = this.byId("ClkTimeDecimalTimeEntryValue").getValue(); //Note: Begin 2141131 clock time duration field
					if ((clkTimeDuration !== "0") && clkTimeDuration !== "") {
						this.clkTimeDurationFilled = true;
					} else {
						this.clkTimeDurationFilled = false;
					}
					if (((startTime && endTime) && startTime !== endTime) || this.clkTimeDurationFilled) { //Note: End 2141131 clock time duration field
						timeFlag = true;
					} else {
						timeFlag = false;
					}

				} else {
					//condition for decimal inputs
					var decimalTimeEntryValue = this.byId("decimalTimeEntryValue").getValue();
					if ((decimalTimeEntryValue !== "0") && decimalTimeEntryValue !== "") {
						//if condition checks if any value has been entered for the decimal input control
						if (this._isValidDecimalNumber(decimalTimeEntryValue)) {
							timeFlag = true;
						} else {
							timeFlag = false;
						}

					} else {
						timeFlag = false;
					}
				}
				var selectedDate = this.byId("weeklyCalendar")
					.getSelectedDates().length;
				//var dateTimeValue = this.byId('DateTimeInputValue')
				//  .getValue();

				var flag = false;
				var typesArray = this.getView().getModel().getData().types;
				if (this.worklistItemSelected) {
					flag = true;
				} else if (typesArray) {
					for (var i = 0; i < typesArray.length; i++) {
						if (typesArray[i].value.trim() || typesArray[i].valueStateText.trim()) {
							flag = true;
							break;
						}
					}
				}

				if (flag && selectedDate && timeFlag) {
					this.setBtnEnabled("SUBMIT_BTN", true);
				} else {
					this.setBtnEnabled("SUBMIT_BTN", false);
				}
			},
			suggestionHelpChange: function(oEvent) {
				oEvent.getSource().setValue("");
				this.validateSaveBtnVisibility(oEvent);
			},

			onFavoriteItemSelection: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);
			},

			onFavValueChange: function() {
				//this.byId("updateBtn").setEnabled(true);
				this.byId("timeAssignment").setValue("");
			},

			onManualItemSelection: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);

			},

			timeAssignmentLiveChange: function() {
				this.byId("timeAssignment").setValue("");
			},

			manualHelpChange: function(oEvent) {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				oEvent.getSource().setValueStateText(
					oEvent.getSource().getValue());
				oEvent.getSource().setValue(
					oEvent.getSource().getValue());
				this.validateSaveBtnVisibility(oEvent);
			},

			onDurationValueChange: function(oEvent) {
				this.validateSaveBtnVisibility(oEvent);
			},

			onDecimalTimeValueChange: function(oEvent) {
				if (this.favoriteSelected) {
					this.byId("timeAssignment").setValue("");
				}
				this.dateTimeModified = true;
				var decimalTimeEntryValue; //Note: Begin 2141131 clock time duration field
				if (!this.isClockEntry()) {
					decimalTimeEntryValue = this.byId("decimalTimeEntryValue").getValue();
				} else {
					decimalTimeEntryValue = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
				} //Note: End 2141131 clock time duration field
				if (this._isValidDecimalNumber(decimalTimeEntryValue)) {
					this.validateSaveBtnVisibility(oEvent);
				} else {
					this.setBtnEnabled("SUBMIT_BTN", false);
				}
			},

			_isValidDecimalNumber: function(number) {
				var numberString = number.toString();
				var decimalIndex = numberString.indexOf(".");
				var commaIndex = numberString.indexOf(",");
				if (decimalIndex > 0 && commaIndex > 0) {
					return false; //to make sure that user has entered either dot/comma but not both
				}
				var seperatorIndex = decimalIndex;
				if (seperatorIndex < 0) {
					seperatorIndex = numberString.indexOf(",");
				}
				var strCheck = "0123456789";
				var integerPart;
				var fractionalPart;
				var index = 0;
				var hasValue = false;
				if (seperatorIndex === -1) {
					integerPart = numberString;
					fractionalPart = "";
				} else {
					integerPart = numberString.slice(0, seperatorIndex);
					fractionalPart = numberString.slice(
						seperatorIndex + 1, numberString.length);
				}
				if (integerPart.length > 5) {
					return false;
				}
				for (index = 0; index < integerPart.length; index++) {
					if (strCheck.indexOf(integerPart[index]) === -1) {
						return false;
					} else {
						hasValue = true;
					}
				}

				if (fractionalPart.length > 2) {
					return false;
				}
				for (index = 0; index < fractionalPart.length; index++) {
					if (strCheck.indexOf(fractionalPart[index]) === -1) {
						return false;
					} else {
						hasValue = true;
					}
				}
				if (hasValue === false) {
					return false;
				}

				return true;
			},

			onNavButton: function() {

				var calendar = this.byId("weeklyCalendar");
				var selectedDate = calendar.getCurrentDate();
				var dateStr = selectedDate;
				selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setProperty("/currentDate", new Date(dateStr));
				this.oApplication.setModel(oModel, "S3exchangeModel");
				this.cleanUpOnBack();
				delete this.entry;
				//navigate to S3
				this.oRouter.navTo("S3", {
					context: selectedDate
				}, true);

			},
			cleanUpOnBack: function() {
				this.byId("timeAssignment").setValue("");
				this.byId("decimalTimeEntryValue").setValue("");
				this.byId("startTime").setValue("");
				this.byId("endTime").setValue("");
				delete this.worklistSelectedObj;
				this.worklistItemSelected = false;
				// this.byId("favName").setValue("");
				this.byId("weeklyCalendar").setDisabledWeekDays([]);
				this.byId("weeklyCalendar").unselectAllDates();
				this.byId("S31TextArea").setValue("");
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: 2141131 clock time duration field
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				for (var i = 0; i < types.length; i++) {
					if (types[i].value !== "" || types[i].valueStateText !== "") {
						types[i].value = "";
						types[i].valueStateText = "";
					}
				}

				this.byId("accountingInfoPanel").setExpanded(false);
				this.getView().getModel().setProperty("/types", types);
				this.oApplication.getModel("accountingInfoModel").setProperty("/types", types);
			},

			getDateStr: function(date) {
				return "" + date.getFullYear() + ("" + (date.getMonth() + 101)).substring(1) + ("" + (date.getDate() + 100)).substring(1);
			},

			getDateTimeStr: function(date) {
				return "" + date.getFullYear() + "-" + ("" + (date.getMonth() + 101)).substring(1) + "-" + ("" + (date.getDate() + 100)).substring(1) +
					"T00:00:00";
			},

			getValueHelpCollection: function(oselectedItem) {

				var self = this;
				var skip = 0;
				var selectedFieldName = (oselectedItem && oselectedItem.fieldName);
				if (this.remoteSearchPhrase) {
					skip = this.remoteSkip;
				} else {
					skip = this.localSkip;
				}
				//NOTE related input help
				var lc_separator = ";;";
				var lv_search_str = "";
				var length = this.getView().getModel('accountingInfoModel').getData().types.length;
				for (var i = 0; i < length; i++) {
					var fieldValue = this.getView().getModel('accountingInfoModel').getData().types[i].valueStateText;
					var fieldName = this.getView().getModel('accountingInfoModel').getData().types[i].fieldName;
					if (fieldValue.length !== 0 && fieldName !== selectedFieldName) {

						var lv_search_str_temp = fieldName + "=" + fieldValue;
						if (lv_search_str) {
							lv_search_str += lc_separator + lv_search_str_temp;
						} else {
							lv_search_str += lv_search_str_temp;
						}
					}
				}
				this.gv_fieldRelated = lv_search_str;

				var calendarRef = this.byId("weeklyCalendar");
				var selectedDates = calendarRef.getSelectedDates();
				if (selectedDates[0]) {
					var len = selectedDates.length;
					this.searchField_begDa = this.getDateStr(new Date(selectedDates[0]));
					this.searchField_endDa = this.getDateStr(new Date(selectedDates[len - 1]));
				} else {
					var oModel = this.oApplication.getModel("TSM_WEEKLY");
					this.searchField_begDa = (oModel.getProperty("/weekStart"));
					this.searchField_endDa = (oModel.getProperty("/weekEnd"));
				}
				this.oService
					.getValueHelpList(this.oApplication.pernr, (selectedFieldName || this.fieldName),

						this.top,
						skip,
						this.remoteSearchPhrase,
						this.gv_fieldRelated,
						this.searchField_begDa,
						this.searchField_endDa,
						function(data) {
							self.remoteSearchActive = false;
							var typeList = [];
							if (self.remoteSearch()) {

								typeList = self.localTypeList;
								self.remoteSearchActive = true;
								self.lastRemoteSearchPhrase = self.remoteSearchPhrase;
							} else {
								typeList = self.localTypeList;
							}

							// Add a "None" item to the list for
							// user to unselect
							// any type
							if (data.length > 0 && typeList.length === 0) {

								typeList.push({
									fieldValueId: self.noneText,
									fieldValue: self.noneText,
									fieldId: ""
								});

							}

							var flag;
							for (var i = 0; i < data.length; i++) {
								//Checking for duplicate values
								flag = 1;
								for (var j = 0; j < typeList.length; j++) {
									var vCheckFieldId = "(" + data[i].FieldId + ")";
									if (typeList[j].fieldValue === data[i].FieldValue && typeList[j].fieldId === vCheckFieldId) {
										flag = 0;
										break;
									}
								}
								if (flag === 1) {
									typeList
										.push({
											fieldValue: data[i].FieldValue,
											fieldId: "(" +
												data[i].FieldId +
												")",
											fieldValueId: data[i].FieldValue +
												" (" +
												data[i].FieldId +
												")"
										});
								}
							}

							function dynamicSort(property) {
								var sortOrder = 1;
								if (property[0] === "-") {
									sortOrder = -1;
									property = property.substr(1);
								}
								return function(a, b) {
									var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
									return result * sortOrder;
								};
							}
							typeList.sort(dynamicSort("fieldId"));
							// Check
							// self.oModel.setProperty("/typeList",
							self.oApplication.getModel("createScreenModel")
								.setProperty("/" + (oselectedItem && oselectedItem.fieldName),
									typeList);
							self.oApplication.getModel("createScreenModel").updateBindings();
							if (self.remoteSearch()) {
								self.remoteResultsLength = data.length;
								self
									.checkRemotePaging(self.remoteResultsLength);
							} else {
								self.localResultsLength = data.length;
								self
									.checkLocalPaging(
										self.localResultsLength,
										oselectedItem && oselectedItem.fieldName);
							}
						});
			},

			remoteSearch: function() {
				if ("remoteSearchPhrase" in this) {
					if (this.remoteSearchPhrase) {
						return this.remoteSearchPhrase;
					}
				}
				return false;
			},

			checkLocalPaging: function(recordCount) {
				//this.typeListControl = this.listOfManualItems[selectedFieldName];
				var typeListArray = this.typeListControl //this.listOfManualItems[selectedFieldName]
					.getItems();
				var typeListArrayLength = typeListArray.length;

				if (typeListArrayLength === 0 || typeListArrayLength >= this.MODEL_SIZE_LIMIT) {
					return;
				}

				if (typeListArray) {
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("TAP_TO_LOAD_MORE_LOADING")) {
						this.typeListControl
							.removeItem(typeListArray[typeListArrayLength - 1]);
					}
				}
				if (recordCount < this.top) {

					if (typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE") ||
						typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
						this.typeListControl
							.removeItem(typeListArray[typeListArrayLength -
								1]);
					}
				} else if (recordCount >= this.top) {
					// If tap to load more item is found in the list, do
					// nothing.
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("TAP_TO_LOAD_MORE")) {
						return;
					} else {
						// If continue search on server item is found in
						// the list, replace
						// with tap to load more item, else, add the tap
						// to load more item
						// to the list.
						if (typeListArray[typeListArrayLength - 1]
							.getTitle() === this.oBundle
							.getText("CONTINUE_SEARCH_ON_SERVER")) {
							typeListArray[typeListArrayLength - 1]
								.setTitle(this.oBundle
									.getText("TAP_TO_LOAD_MORE"));
						} else {

							this.loadMoreItem = new sap.m.StandardListItem({
								title: this.oBundle
									.getText("TAP_TO_LOAD_MORE"),
								active: true
							});

							this.typeListControl
								.addItem(this.loadMoreItem);
						}
					}
				}
			},

			checkRemotePaging: function(recordCount) {
				if (recordCount >= this.top ||
					!this.remoteSearchActive ||
					this.lastRemoteSearchPhrase !== this.remoteSearchPhrase) {
					var typeListArray = this.typeListControl.getItems();
					var typeListArrayLength = typeListArray.length;

					// Add continue search on server item if there is
					// nothing in the list.
					if (typeListArrayLength === 0 ||
						typeListArrayLength >= this.MODEL_SIZE_LIMIT) {
						this.noneTextItem = new sap.m.StandardListItem({
							title: this.noneText,
							active: true
						});

						this.typeListControl.insertItem(this.noneTextItem, 0);
						this.addContinueSearchItem(this.oBundle
							.getText("CONTINUE_SEARCH_ON_SERVER"));

						return;
					}

					// If continue search on server item is found in the
					// list, do nothing.
					if (typeListArray[typeListArrayLength - 1]
						.getTitle() === this.oBundle
						.getText("CONTINUE_SEARCH_ON_SERVER")) {
						return;
					} else {
						// If tap to load more item is found in the
						// list, replace with
						// continue search on server item, else add the
						// continue search on
						// server item.
						if (typeListArray[typeListArrayLength - 1]
							.getTitle() === this.oBundle
							.getText("TAP_TO_LOAD_MORE")) {
							typeListArray[typeListArrayLength - 1]
								.setTitle(this.oBundle
									.getText("CONTINUE_SEARCH_ON_SERVER"));
						} else {
							this
								.addContinueSearchItem(this.oBundle
									.getText("CONTINUE_SEARCH_ON_SERVER"));
						}
					}
				} else {
					typeListArray = this.typeListControl.getItems();
					typeListArrayLength = typeListArray.length;
					if (typeListArray[typeListArrayLength - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER") && recordCount < this.top) {
						this.typeListControl.removeItem(typeListArray[typeListArrayLength - 1]);
					}
				}
			},

			addContinueSearchItem: function() {

				this.continueSearchItem = new sap.m.StandardListItem({
					title: this.oBundle
						.getText("CONTINUE_SEARCH_ON_SERVER"),
					active: true
				});

				this.typeListControl.addItem(this.continueSearchItem);

				// Merge the 2 columns in the column list item directly
				// in the HTML so
				// that the continue search on server words don't wrap
				// in a single column.
				this.continueSearchItem
					.addEventDelegate({
						onAfterRendering: function() {
							$(
								this.continueSearchItem
								.$().context.firstChild)
								.attr("colspan", "2");
						}
					}, this);
			},

			tapToLoadMore: function(selectedItem) {
				/*this.loadMoreItem.setTitle(this.oBundle
        .getText("TAP_TO_LOAD_MORE_LOADING"));*/
				this.localSkip += this.top;
				this.getValueHelpCollection(selectedItem);
			},

			continueSearchOnServer: function(selectedItem) {
				/*this.continueSearchItem
        && this.continueSearchItem
          .setTitle(this.oBundle
            .getText("CONTINUE_SEARCH_ON_SERVER_LOADING"));*/
				this.remoteSearchPhrase = this.searchPhrase;

				if (this.firstRemoteSearch) {
					this.firstRemoteSearch = false;
					this.continueSearchOnServerActive = true;
				} else {
					this.remoteSkip += this.top;
				}

				this.getValueHelpCollection(selectedItem);
				return this.remoteSearchPhrase; //NOTE Search Help Disappearing Issue
			},

			refineSearchResult: function() {
				this.typeBinding = this.typeListControl
					.getBinding("items");
				var filters = [];
				if (this.searchPhrase) {
					filters.push(new sap.ui.model.Filter(
						"fieldValueId", sap.ui.model.FilterOperator.Contains, this.searchPhrase));
					filters.push(new sap.ui.model.Filter(
						"fieldValueId", sap.ui.model.FilterOperator.Contains, this.noneText));
				}
				this.typeBinding.filter(filters);
			},
			onLiveFavChange: function(evt) {
				//removing the titles
				//   var oEvent = evt;
				//             var source = oEvent.getSource();
				//             for (var i = 0; i < source.getItems().length; i++) {
				//             	if (source.getItems()[i].getTitle() === this.oBundle.getText("FAVORITE") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("WORKLIST") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("NO_WORKLIST") ||
				//             		source.getItems()[i].getTitle() === this.oBundle.getText("NO_FAVORITE")
				//             	) {
				//             		this.favDialogHeaders.push(source.removeItem(i));
				//             	}
				//             }
				//             var sValue = oEvent.getParameter("value");
				//             var oFilters = [];
				//             oFilters.push(new sap.ui.model.Filter("name",
				//             		sap.ui.model.FilterOperator.Contains, sValue));
				//             /*if (sValue) {
				//             	oFilters.push(new sap.ui.model.Filter("name",
				//             		sap.ui.model.FilterOperator.Contains, sValue));
				//             } else {
				//             	this.bindFavDialog(this.favoriteDialog);
				//             }*/
				//             if(!sValue){
				//                 try{
				//                     this.favoriteDialog.insertItem(this.favDialogHeaders[0], 0);
				//                     this.favoriteDialog.insertItem(this.favDialogHeaders[1], (this.favDialogHeaders[0].getCount() + 1));
				//                 }
				//                 catch(o){
				//                     jQuery.sap.log.warning("Could not add title", ["onLiveFavChange"], ["hcm.mytimesheet"]);
				//                 }
				//             }
				//             source.getBinding("items").filter(oFilters);

				var sFilterPattern = evt.getParameter("value");
				sFilterPattern = sFilterPattern.toLowerCase();
				var aListItems = evt.getSource().getItems();
				var bVisibility;
				var oGroupItem = null;
				var iCountInGroup = 0;
				// var somethingExist = false;
				for (var i = 0; i < aListItems.length; i++) {
					if (aListItems[i] instanceof sap.m.GroupHeaderListItem) {
						if (oGroupItem) {
							// if (iCountInGroup == 0) {
							//     oGroupItem.setVisible(false);
							// } else {
							// oGroupItem.setVisible(true);
							oGroupItem.setCount(iCountInGroup);
							//}
						}
						oGroupItem = aListItems[i];
						iCountInGroup = 0;
					} else {
						bVisibility = this.applySearchPatternToListItem(aListItems[i], sFilterPattern);
						aListItems[i].setVisible(bVisibility);
						if (bVisibility) {
							iCountInGroup++;
							// somethingExist = true;
						}
					}
				}
				if (oGroupItem) {
					// if (iCountInGroup == 0) {
					//     oGroupItem.setVisible(false);
					// } else {
					// oGroupItem.setVisible(true);
					if (oGroupItem.getTitle() !== this.oBundle.getText("NO_WORKLIST") || oGroupItem.getTitle() !== this.oBundle.getText("NO_WORKLIST")) {
						oGroupItem.setCount(iCountInGroup);
					}

					//}
				}

			},

			applySearchPatternToListItem: function(oItem, sFilterPattern) {
				if (sFilterPattern === "") {
					return true;
				}

				// if nothing found in unformatted data, check UI elements
				if ((oItem.getTitle() && oItem.getTitle().toLowerCase().indexOf(sFilterPattern) !== -1) ||
					(oItem.getDescription() && oItem.getDescription().toLowerCase().indexOf(sFilterPattern) !== -1) ||
					(oItem.getInfo() && oItem.getInfo().toLowerCase().indexOf(sFilterPattern) !== -1)) {
					return true;
				}
				return false;
			},

			onLiveChange: function(oEvent) {

				var sValue = oEvent.getParameter("value");
				var oFilters = [];
				oFilters.push(new sap.ui.model.Filter("fieldValueId",
					sap.ui.model.FilterOperator.Contains, sValue));
				/*oEvent.getSource().getBinding("items").filter(oFilters);
      if (oEvent.getSource().getBinding("items").filter(
        oFilters).getLength() < 1) {
       oEvent.getSource().setNoDataText();
      }*/

				this.searchPhrase = oEvent.getParameter("value");
				this.searchField = oEvent.getSource();
				if (this.searchPhrase) {
					//if (!this.continueSearchOnServerActive) {
					this.refineSearchResult(); //refreshes the filter->adds NONE text and the current search string
					//}
					if (this.searchPhrase !== this.remoteSearchPhrase) {
						this.resetRemoteSearch();
					}
					this.remoteSearchPhrase = this.searchPhrase;
					this.checkRemotePaging(this.remoteResultsLength);
				} else {
					// User has deleted all search phrase, revert to
					// local model
					this.refineSearchResult();
					this.remoteSearchPhrase = "";
					if (this.oApplication.getModel("createScrenModel")) {
						this.oApplication.getModel("createScrenModel").setProperty("typeList",
							this.localTypeList);
					}
					this.remoteSearchActive = false;
					this.checkLocalPaging(this.localResultsLength);
					this.resetRemoteSearch();
				}
			},

			resetRemoteSearch: function() {
				this.firstRemoteSearch = true;
				this.remoteSkip = 0;
				this.remoteTypeList = [];
				this.continueSearchOnServerActive = false;
				this.remoteSearchPhrase = "";
				this.remoteSearchActive = false;
			},

			clearSearchField: function() {
				if ("searchField" in this) {
					this.searchField.setValue("");
					this.typeBinding.filter([]);
				}
			},

			bindFavDialog: function(oSelectDialog1) {
				var combinedList, self = this;
				var oModel = self.oApplication.getModel("createScreenModel");

				var worklistHeader = new sap.m.GroupHeaderListItem({
					title: self.oBundle.getText("WORKLIST"),
					upperCase: false,
					count: oModel.getProperty("/projects").length
				});
				var noWorklistHeader = new sap.m.GroupHeaderListItem({
					title: self.oBundle.getText("NO_WORKLIST"),
					upperCase: false
				});

				if (this.FavoriteAvailable) {
					var favHeader = new sap.m.GroupHeaderListItem({
						title: self.oBundle.getText("FAVORITE"),
						upperCase: false,
						count: oModel.getProperty("/favorites").length
					});
					var noFavHeader = new sap.m.GroupHeaderListItem({
						title: self.oBundle.getText("NO_FAVORITE"),
						upperCase: false
					});
					combinedList = oModel.getProperty("/favorites").concat(oModel.getProperty("/projects"));

				} else {
					combinedList = oModel.getProperty("/projects");

				}
				oModel.setProperty("/combinedFavList", combinedList);

				var itemTemplate = new sap.m.StandardListItem({
					title: "{name}",
					description: "{subText}",
					info: "{info}",
					customData: [{
						key: "items",
						value: "{childs}"
     }, {
						key: "type",
						value: "{type}"
     }, {
						key: "id",
						value: "{id}"
     }, {
						key: "fieldId",
						value: "{fieldName}"
     }, {
						key: "fieldValue",
						value: "{fieldValue}"
     }]
				});

				// set model & bind Aggregation
				oSelectDialog1.setModel(self.oApplication.getModel("createScreenModel"));
				oSelectDialog1.bindAggregation("items", "/combinedFavList", itemTemplate);
				this.favoriteDialog = oSelectDialog1;
				if (this.FavoriteAvailable) {
					if (oModel.getProperty("/favorites").length === 0) {
						oSelectDialog1.insertItem(noFavHeader, 0);
					} else {
						oSelectDialog1.insertItem(favHeader, 0);
					}
					if (oModel.getProperty("/projects").length === 0) {
						oSelectDialog1.insertItem(noWorklistHeader, oModel.getProperty("/favorites").length + 1);
					} else {
						oSelectDialog1.insertItem(worklistHeader, oModel.getProperty("/favorites").length + 1);
					}

				} else {
					if (oModel.getProperty("/projects").length === 0) {
						oSelectDialog1.insertItem(noWorklistHeader, 0);
					} else {
						oSelectDialog1.insertItem(worklistHeader, 0);
					}

				}
			},

			onFavoriteInputHelp: function(oEvent) {
				var self = this,
					DialogHeader;
				this.favDialogHeaders = [];
				if (this.FavoriteAvailable) {
					DialogHeader = this.oBundle.getText("SELECT_FAVORITE");
				} else {
					DialogHeader = this.oBundle.getText("SELECT_WORKLIST");
				}
				var oSelectDialog1 = new sap.m.SelectDialog({
					title: DialogHeader,
					liveChange: [this.onLiveFavChange, this]

				});

				this.bindFavDialog(oSelectDialog1);
				oSelectDialog1.open();

				var input = arguments[0].getSource(),
					type, items, id;
				self = this;
				//Handling on item click event
				oSelectDialog1
					.attachConfirm(function(evt) {

						var selectedItem = evt.getParameter("selectedItem");
						if (selectedItem.data().type) {
							self.favoriteSelected = true;
							self.worklistItemSelected = false;
							type = selectedItem.data().type;
							items = selectedItem.data().items;
							id = selectedItem.data().id;
							var startTime = 0,
								time = 0,
								endTime = 0,
								i, j, typesArray;

							//Set Time Assignment
							//if (selectedItem.getDescription()) {
							if (selectedItem) {
								input.setValue(selectedItem.getTitle());
							}
							//setting the Time if applicable
							if (type === "F") {
								//getting the time if applicable
								for (var index = 0; index < self.favorites.length; index++) {
									if (self.favorites[index].id === id) {
										if (!self.isClockEntry()) {
											time = self.favorites[index].FavoriteDataFields.CATSHOURS;
											time = parseFloat(time, 10).toFixed(2);
											self.byId("decimalTimeEntryValue").setValue(time);
										} else {
											startTime = self.favorites[index].FavoriteDataFields.BEGUZ;
											endTime = self.favorites[index].FavoriteDataFields.ENDUZ;
											if (startTime !== endTime) { //Note: 2141131 clock time duration field
												var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													pattern: "HHmm"
												});
												var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													style: "short"
												});
												startTime = timeParser.parse(startTime);
												startTime = timeFormatter.format(startTime);
												endTime = timeParser.parse(endTime);
												endTime = timeFormatter.format(endTime);
												self.byId("startTime").setValue(self.favorites[index].FavoriteDataFields.BEGUZ);
												self.byId("endTime").setValue(self.favorites[index].FavoriteDataFields.ENDUZ);
												self.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false); //Note: Begin 2141131 clock time duration field
											} else {
												time = self.favorites[index].FavoriteDataFields.CATSHOURS;
												time = parseFloat(time, 10).toFixed(2);
												self.byId("ClkTimeDecimalTimeEntryValue").setValue(time);
											} //Note: End 2141131 clock time duration field
										}
									}
								}
							} else {
								self.byId("decimalTimeEntryValue").setValue("");
								self.byId("startTime").setValue(""); //Note: Begin 2141131 clock time duration field
								self.byId("endTime").setValue("");
								self.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: End 2141131 clock time duration field
							}
							//setting the accounting infos
							typesArray = self.oApplication.getModel("accountingInfoModel").getData().types;
							//setting the accounting infos as initial 
							for (i = 0; i < typesArray.length; i++) {
								typesArray[i].value = "";
							}
							//Set the name
							// typesArray[0].value = selectedItem.getTitle();
							for (j = 0; j < items.length; j++) {
								for (i = 0; i < typesArray.length; i++) {

									if (typesArray[i].fieldName === items[j].name) {
										typesArray[i].value = items[j].value;
										typesArray[i].valueStateText = items[j].value;
										break;
									}
								}
							}

							self.byId("accountingInfoPanel").setExpanded(true);
							self.getView().getModel().setProperty("/types", typesArray);
							self.oApplication.getModel("accountingInfoModel").setProperty("/types", typesArray);
							self.validateSaveBtnVisibility(evt);
						} else {
							self.worklistItemSelected = true;
							self.favoriteSelected = false;
							input.setValue(selectedItem.getTitle());
							items = selectedItem.data().items;
							var fieldId = selectedItem.data().fieldId,
								fieldValue = selectedItem.data().fieldValue;
							typesArray = self.oApplication.getModel("accountingInfoModel").getData().types;
							//setting the accounting infos as initial 
							for (i = 0; i < typesArray.length; i++) {
								typesArray[i].value = "";
							}
							if (!self.worklistSelectedObj) {
								self.worklistSelectedObj = {};
							}
							if (self.checkFieldName(fieldId)) {
								self.worklistSelectedObj[fieldId] = fieldValue;
							}
							for (j = 0; j < items.length; j++) {
								if (self.checkFieldName(items[j].fieldName)) {
									self.worklistSelectedObj[items[j].fieldName] = items[j].fieldValue;
								}
								for (i = 0; i < typesArray.length; i++) {
									if (items[j].fieldName === "LTXA1") {
										self.byId("S31TextArea").setValue(items[j].name);
									}
									var txt = selectedItem.getTitle() + " " + "(" + fieldValue + ")";
									if (typesArray[i].fieldName === fieldId && typesArray[i].value !== txt) {
										typesArray[i].value = txt;
										typesArray[i].valueStateText = fieldValue;
									}
									if (typesArray[i].fieldName === items[j].fieldName) {
										typesArray[i].value = items[j].fieldValue;
										typesArray[i].valueStateText = items[j].name;
										break;
									}
								}
							}

							self.byId("accountingInfoPanel").setExpanded(true);
							self.getView().getModel().setProperty("/types", typesArray);
							self.oApplication.getModel("accountingInfoModel").setProperty("/types", typesArray);
							self.validateSaveBtnVisibility(evt);
						}

						oSelectDialog1.destroy();
						oSelectDialog1 = null;
					});

			},
			//listOfManualItems : {},
			onInputHelp: function() {
				var self = this;
				var selectedLItem = {};

				selectedLItem.name = arguments[0].getSource()
					.getValueStateText();
				selectedLItem.fieldName = arguments[0].getSource()
					.getName();

				var SelectTile = arguments[0].getSource().getParent()
					.getLabel().getText();

				var oSelectDialog1 = new sap.m.SelectDialog({
					title: SelectTile,
					/*noDataText : this.oBundle
         .getText('TAP_TO_LOAD_MORE_LOADING'),*/
					search: [this.onLiveChange, this],
					liveChange: [this.onLiveChange, this]
				});

				var itemTemplate = new sap.m.StandardListItem({
					title: "{fieldValue}",
					description: "{fieldId}",
					active: true
				});

				//self.listOfManualItems[selectedLItem.fieldName] = oSelectDialog1;
				self.typeListControl = oSelectDialog1;
				self.getValueHelpCollection(selectedLItem);

				// set model & bind Aggregation
				oSelectDialog1.setModel(self.oApplication.getModel("createScreenModel"));
				if (selectedLItem.fieldName.indexOf("/") >= 0) {
					selectedLItem.fieldName = selectedLItem.fieldName.split("/").join("-");
				}
				oSelectDialog1.bindAggregation("items", "/" +
					selectedLItem.fieldName, itemTemplate);

				oSelectDialog1.open();

				var input = arguments[0].getSource();

				// attach close listener
				oSelectDialog1
					.attachConfirm(function(evt) {
						var selectedItemEvent = evt
							.getParameter("selectedItem");
						if (selectedItemEvent) {
							self.selectedIndex = evt
								.getParameter("selectedItem")
								.getParent()
								.indexOfItem(evt.getParameter("selectedItem"));

							// when clciked on load more

							if (selectedItemEvent.getTitle() === self.oBundle
								.getText("TAP_TO_LOAD_MORE")) {
								self.tapToLoadMore(selectedLItem);
								oSelectDialog1.open();
								return;
							} else if (selectedItemEvent.getTitle() === self.oBundle
								.getText("CONTINUE_SEARCH_ON_SERVER")) {
								var searchtxt = self.continueSearchOnServer(selectedLItem);
								oSelectDialog1.open(searchtxt);
								return;
							} else if (selectedItemEvent.getTitle() === "(None)") {
								input.setValue("");
								input.setValueStateText("");
							} else {
								input.setValue(selectedItemEvent
									.getTitle() +
									" " +
									selectedItemEvent
									.getDescription());
								input
									.setValueStateText(selectedItemEvent
										.getDescription()
										.replace('(', "")
										.replace(")", ""));
							}
							self.validateSaveBtnVisibility(evt);

						}
						oSelectDialog1.destroy();

						oSelectDialog1 = null;
						self.localTypeList = [];
						self.remoteTypeList = [];
						self.resetRemoteSearch();
						self.top = self.RESULTS_TOP;
						self.remoteSkip = 0;
						self.localSkip = 0;
					});

				oSelectDialog1.attachCancel(function() {
					oSelectDialog1 = null;
					self.localTypeList = [];
					self.remoteTypeList = [];
					self.resetRemoteSearch();
					self.top = self.RESULTS_TOP;
					self.remoteSkip = 0;
					self.localSkip = 0;

				});

			},
			getFavoritesCollection: function() {
				var self = this;
				var FavDataFields, infos;
				if (this.FavoriteAvailable) {
					this.oService
						.getFavorites(
							this,
							this.oApplication.pernr,
							function(data) {

								var favCounter = 0;
								self.favorites = [];

								for (var i = 0; i < data.length; i++) {
									if (data[i].ObjType === "FW") {
										self.favorites[favCounter] = {
											name: data[i].Name,
											type: data[i].ObjType,
											id: data[i].ID,
											FavoriteDataFields: data[i].FavoriteDataFields,
											childs: [],
											info: "",
											active: true,
											subText: data[i].Field_Text
										};
									} else {
										if (parseFloat(data[i].FavoriteDataFields.CATSHOURS)) {
											infos = self.oBundle.getText("TOTAL_RECORDED_HOURS", [data[i].FavoriteDataFields.CATSHOURS]);
											if (infos.indexOf("Target:") >= 0) {
												infos = data[i].FavoriteDataFields.CATSHOURS + " h";
											}
										} else {
											var begda = data[i].FavoriteDataFields.BEGUZ,
												endda = data[i].FavoriteDataFields.ENDUZ;
											var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
												pattern: "HHmm"
											});
											var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
												style: "short"
											});
											begda = timeParser.parse(begda);
											begda = timeFormatter.format(begda);
											endda = timeParser.parse(endda);
											endda = timeFormatter.format(endda);
											infos = self.oBundle.getText("WEEK_DATE_RANGE", [begda, endda]);
											//   this.byId("startTime").setValue(begda);
											//   this.byId("endTime").setValue(endda);
										}
										self.favorites[favCounter] = {
											name: data[i].Name,
											type: data[i].ObjType,
											id: data[i].ID,
											FavoriteDataFields: data[i].FavoriteDataFields,
											childs: [],
											info: infos,
											active: true,
											subText: data[i].Field_Text
										};
									}
									favCounter++;

								}
								for (i = 0; i < favCounter; i++) {
									FavDataFields = self.favorites[i].FavoriteDataFields;
									for (var prop in FavDataFields) {
										if (prop !== "CATSHOURS" && prop !== "PERNR" && prop !== "BEGUZ" && prop !== "ENDUZ") {
											if (FavDataFields[prop] !== "" && typeof(FavDataFields[prop]) !== "undefined" && parseInt(FavDataFields[prop], 10) !== 0) {
												self.favorites[i].childs
													.push({
														name: prop,
														value: FavDataFields[prop]
													});
											}
										}
									}
								}
								self.oApplication.getModel("createScreenModel").setProperty(
									"/favorites", self.favorites);

								if (self.oApplication.getModel("createScreenModel").getProperty("/projects")) {
									if (self.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 &&
										self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
										self.byId("accountingInfoPanel").setExpanded(true);
										self.byId("timeAssignmentLbl").setVisible(false);
										self.byId("timeAssignment").setVisible(false);
									}
								}

							});
				}

			},

			// method added for f4 help
			getWorkListCollection: function() {

				this.workList = [];
				this.workListType = [];
				var self = this;

				var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.searchField_begDa = (oModel.getProperty("/weekStart"));
				this.searchField_endDa = (oModel.getProperty("/weekEnd"));

				this.oService
					.getWorkListCollection(
						this,
						this.oApplication.pernr,
						this.searchField_begDa,
						this.searchField_endDa,
						function(data) {
							// Create new worklist items for
							// every item
							// with
							// Level 0
							var workListCounter = 0;
							for (var i = 0; i < data.length; i++) {
								if (data[i].Level === 0) {
									self.workList[workListCounter] = {
										name: data[i].FieldValueText,
										childs: [],
										fieldName: data[i].FieldName,
										fieldValue: data[i].FieldValue,
										recordNumber: data[i].RecordNumber
									};
									workListCounter++;
								}
							}

							// Add other items with non Level 0
							// FieldText
							// into the
							// previously created Level 0 item.
							for (i = 0; i < data.length; i++) {
								if (data[i].Level !== 0) {
									for (var j = 0; j < self.workList.length; j++) {
										if (self.workList[j].recordNumber === data[i].RecordNumber) {
											self.workList[j].childs
												.push({
													name: data[i].FieldValueText,
													fieldName: data[i].FieldName,
													fieldValue: data[i].FieldValue
												});
										}
									}
								}
							}

							// Populate the HTML view model with
							// the
							// data
							var projects = [];
							for (i = 0; i < self.workList.length; i++) {
								var currentChildItems = [];
								var currentChildNames = [];
								var currentChildCodes = [];
								for (j = 0; j < self.workList[i].childs.length; j++) {
									currentChildItems
										.push(self.workList[i].childs[j].name);
									currentChildNames
										.push(self.workList[i].childs[j].fieldName);
									currentChildCodes
										.push(self.workList[i].childs[j].fieldValue);
								}
								projects
									.push({
										name: self.workList[i].name,
										subText: currentChildItems
											.join(", "),
										type: false,
										childs: self.workList[i].childs,
										fieldName: self.workList[i].fieldName,
										fieldValue: self.workList[i].fieldValue,
										fieldValueId: self.workList[i].name +
											currentChildItems
											.join(", ")
									});

							}
							self.workList = projects;

							self.oApplication.getModel("createScreenModel").setProperty(
								"/projects", self.workList);
							if (self.FavoriteAvailable) {
								if (self.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
									if (self.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 &&
										self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
										self.byId("accountingInfoPanel").setExpanded(true);
										self.byId("timeAssignmentLbl").setVisible(false);
										self.byId("timeAssignment").setVisible(false);
									} else {
										self.byId("timeAssignmentLbl").setVisible(true);
										self.byId("timeAssignment").setVisible(true);
									}
								}
							} else {
								if (self.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
									self.byId("accountingInfoPanel").setExpanded(true);
									self.byId("timeAssignmentLbl").setVisible(false);
									self.byId("timeAssignment").setVisible(false);

								} else {
									self.byId("timeAssignmentLbl").setVisible(true);
									self.byId("timeAssignment").setVisible(true);
								}
							}
						});
			},

			valueHelpDataForamtter: function(fieldName, fieldValue) {
				if (fieldName) {
					return fieldName + " (" + fieldValue + ")";

				}
			},

			durationDateForamtter: function(h, m) {
				return h + ":" + m;
			},

			getProfileFields: function() {
				this.profileFields = [];
				var self = this;
				var accountingInfoModel = new sap.ui.model.json.JSONModel();
				this.oApplication.setModel(accountingInfoModel, "accountingInfoModel");

				this.oService
					.getProfileFields(
						this,
						this.oApplication.pernr,
						function(data) {

							var editdatafroms3 = {},
								i;

							var editentrySelected = self.oApplication
								.getModel("S31modelexch")
								.getData().editentryview;
							var copyEntrySelected = self.oApplication
								.getModel("S31modelexch")
								.getData().copySelected;
							if (editentrySelected || copyEntrySelected) {
								editdatafroms3 = self.oApplication.getModel("S31modelexch")
									.getData().editeddata;
								self.validateSaveBtnVisibility();
							}
							/*if(self.FavoriteAvailable){
           self.profileFields[0] = {
               name : self.oBundle.getText("FAVORITE_NAME"),
               selectedName : self.oBundle.getText("FAVORITE_NAME"),
               fieldName : self.oBundle.getText("FAVORITE_NAME"),
               listType : "Active",
               labelVisible : true,
               typeVisible : true,
               fieldValue : "",
               value : "",
               valueStateText : "",
               ReadOnly : true,
               valueHelp: false,
               editButton: true
              };
           }*/

							for (i = 0; i < data.length; i++) {
								var name = data[i].FieldText;
								var fieldName = data[i].FieldName;
								var selectedName = self.NON_BREAKING_SPACE;
								var fieldValue = "";
								var readOnly = data[i].ReadOnly;
								if (self.editCostAssignment) {
									if (self.selectedMainName === fieldName) {
										fieldValue = self.selectedMainCode;
										selectedName = self.selectedMainItem;
									} else {
										if ("selectedChildItems" in self) {
											for (var j = 0; j < self.selectedChildNames.length; j++) {
												if (self.selectedChildNames[j] === fieldName) {
													fieldValue = self.selectedChildCodes[j];
													selectedName = self.selectedChildItems[j];
												}
											}
										}
									}
								}

								var valurforEntry = "";
								var valurforStateText = "";
								if (editdatafroms3 &&
									editdatafroms3.entry) {
									if (editdatafroms3.entry.childItems) {
										var code = editdatafroms3.entry.childCodes[editdatafroms3.entry.childNames
											.indexOf(fieldName)];
										var item = editdatafroms3.entry.childItems[editdatafroms3.entry.childNames
											.indexOf(fieldName)];
										if (code) {
											valurforEntry = item +
												' (' +
												code +
												')';
										}
										if (item) {
											valurforStateText = code;
										}

										if (!valurforEntry) {
											if (fieldName === editdatafroms3.entry.mainName) {
												valurforEntry = editdatafroms3.entry.mainItem +
													' (' +
													editdatafroms3.entry.mainCode +
													')';
												valurforStateText = editdatafroms3.entry.mainCode;
											}
										}

									} else {

										if (fieldName === editdatafroms3.entry.mainName) {
											valurforEntry = editdatafroms3.entry.mainItem +
												' (' +
												editdatafroms3.entry.mainCode +
												')';
											valurforStateText = editdatafroms3.entry.mainCode;
										}
									}
								}

								self.profileFields
									.push({
										name: name,
										selectedName: selectedName,
										fieldName: fieldName,
										listType: "Active",
										labelVisible: true,
										typeVisible: true,
										fieldValue: fieldValue,
										value: valurforEntry,
										valueStateText: valurforStateText,
										ReadOnly: readOnly.toLowerCase() === "true" ? false : true,
										valueHelp: true
									});

								//marking CPR fields as display only
								if (!self.checkDisplayFieldNames(fieldName)) {
									self.profileFields[i].ReadOnly = false;
								}

							}
							accountingInfoModel.setProperty("/types", self.profileFields);
							self.oApplication.setModel(accountingInfoModel, "accountingInfoModel");
							self.oApplication.getModel("createScreenModel").setProperty("/types", self.profileFields);
							self.getView().setModel(accountingInfoModel, "accountingInfoModel");
							self.validateSaveBtnVisibility();

						});

			},

			checkDisplayFieldNames: function(fieldName) {
				var arr = ["DISPTEXT", "CPR_", "LTXA1"];
				/* The possible fields
    "CPR_OBJTEXT", "CPR_OBJGEXTID", "CPR_TEXT", "CPR_EXTID"];*/
				for (var i = 0; i < arr.length; i++) {
					if (fieldName.match(arr[i])) {
						return false;
					}
				}
				return true;
			},

			onDone: function() {
				// clean in-line error message for the entry
				this.entry.showError = false;
				this.entry.error = "";

				this.resetMainAndChildItems();
				var mainItemFound = true;
				this.entry.notes = this.byId("S31TextArea").getValue();

				mainItemFound = false;
				// logic fetching data directly from input fields
				var inputList = this.byId("manualAccountingInfos")
					.getFormElements();
				var value;
				for (var j = 0; j < inputList.length; j++) {
					var key = inputList[j].getFields()[0].getName();
					//var value = inputList[j].getFields()[0].getValue() &&
					// inputList[j].getFields()[0].getValueStateText();
					if (inputList[j].getFields()[0].getValue().split('').indexOf('(') !== -1) {
						value = inputList[j].getFields()[0].getValueStateText();
					} else {
						value = inputList[j].getFields()[0].getValue();
					}
					if (!value) {
						value = inputList[j].getFields()[0]
							.getValue();
					}
					if (value) {
						if (!mainItemFound) {
							this.entry.mainItem = key;
							this.entry.mainName = key;
							this.entry.mainCode = value;
							mainItemFound = true;
						} else {
							if (!this.entry.childItems) {
								this.initializeChildItems();
								this.childItemsInitialized = true;
							}
							this.entry.childItems.push(key);
							this.entry.childNames.push(key);
							this.entry.childCodes.push(value);
						}
					}
				}

				if ("childItems" in this.entry) {
					if (this.entry.childItems.length > 1) {
						this.entry.subItems = this.entry.childItems
							.join(", ");
					} else if (this.entry.childItems.length === 1) {
						this.entry.subItems = this.entry.childItems[0];
					}
				}

				// Do something only if a mainItem exist.
				if (mainItemFound || this.worklistItemSelected) {
					this.onSubmit();
				} else {
					this.initializeChildItems();
				}
			},

			onSubmit: function() {
				// clean in-line error message for the entry
				this.entry.showError = false;
				this.entry.error = "";
				this.entry.rejectionReason = "";

				// return original data with the new/edited entry
				this.updatePageData();

			},

			updatePageData: function() {
				// Prepare entry
				var calendarRef = this.byId("weeklyCalendar");
				var selectedDates = calendarRef.getSelectedDates();
				//   var oModel = this.oApplication.getModel("TSM_WEEKLY");
				this.entry.selectedDate = selectedDates;
				if (!this.isClockEntry() || this.clkTimeDurationFilled) { //Note:Begin 2141131 clock time duration field
					var lvDuration;
					if (!this.clkTimeDurationFilled) {
						lvDuration = this.byId("decimalTimeEntryValue").getValue();
					} else {
						lvDuration = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
					} //Note:End 2141131 clock time duration field
					if (lvDuration.indexOf(",") > 0) {
						lvDuration = lvDuration.replace(",", ".");
					}
					this.entry.time = lvDuration;
				} else {

					var startTime = this.byId("startTime").getDateValue(),
						endTime = this.byId("endTime").getDateValue();

					this.entry.startTime = this
						.convertTime(startTime);
					this.entry.endTime = this.convertTime(endTime);

					var durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

					this.entry.hours = parseInt(
						(durationInMinutes / 60), 10);
					this.entry.minutes = durationInMinutes % 60;

					this.entry.time = "0.0";
				}

				this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;

				this.submitToOdata();

			},
			convertTime: function(date) {
				var timeFormat = sap.ui.core.format.DateFormat
					.getTimeInstance({
						pattern: "HHmmss"
					});
				return timeFormat.format(date);
			},

			formatAMPM: function(date) {
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? 'PM' : 'AM';
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				minutes = minutes < 10 ? '0' + minutes : minutes;
				var strTime = hours + ':' + minutes + ' ' + ampm;
				return strTime;
			},

			submitToOdata: function() {
				var self = this,
					calendarRef = this.byId('weeklyCalendar'),
					selectedDates = calendarRef.getSelectedDates(),
					oSettings, timeFormatterShort;
				this.errors = null;
				var confirmationDialog = null,
					i = 0,
					startTime, endTime, summaryHoursText, decimalTimeEntryValue, formattedDecimal, popupHeader, popupTitle;
				if (this.isClockEntry() && !this.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
					startTime = this.byId("startTime").getDateValue();
					endTime = this.byId("endTime").getDateValue();
				} //Note:Begin 2141131 clock time duration field				  
				if (!this.isClockEntry() || this.clkTimeDurationFilled) {
					if (this.clkTimeDurationFilled) {
						decimalTimeEntryValue = this.getView().byId("ClkTimeDecimalTimeEntryValue").getValue();
					} else {
						decimalTimeEntryValue = this.getView().byId("decimalTimeEntryValue").getValue();
					} //Note:Begin 2141131 clock time duration 
					if (decimalTimeEntryValue.indexOf(",") > (-1)) {
						decimalTimeEntryValue = decimalTimeEntryValue.replace(",", ".");
					}
					decimalTimeEntryValue = parseFloat(decimalTimeEntryValue);
					decimalTimeEntryValue = decimalTimeEntryValue.toFixed(2);
					formattedDecimal = sap.ca.ui.model.format.NumberFormat.getInstance({
						style: 'standard'
					}).format(decimalTimeEntryValue);
					summaryHoursText = formattedDecimal;
				}
				if (!this.releaseAllowed) {
					popupHeader = this.oBundle
						.getText('DRAFT_CONFIRMATION_SUMMARY');
					popupTitle = this.oConfiguration
						.getText("DRAFT_CONFIRMATION");
				} else {
					popupHeader = this.oBundle.getText('SUBMISSION_CONFIRMATION_SUMMARY');
					popupTitle = this.oConfiguration.getText("SUBMISSION_CONFIRMATION");
				}

				timeFormatterShort = sap.ca.ui.model.format.DateFormat.getTimeInstance({
					style: "short"
				});
				if (this.isClockEntry() && !this.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
					if (this.byId("startTime").getDisplayFormat() === "hh:mm a" || this.byId("startTime").getDisplayFormat() === "h:mm a") {
						startTime = this.formatAMPM(startTime);
						endTime = this.formatAMPM(endTime);
					} else {
						startTime = timeFormatterShort.format(startTime);
						endTime = timeFormatterShort.format(endTime);
					}

					oSettings = {
						question: popupHeader,
						additionalInformation: [
							{
								label: this.oBundle
									.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
								text: selectedDates.length.toString()
       },
							{
								label: this.oBundle
									.getText('START_TIME'),
								text: startTime

       },
							{
								label: this.oBundle
									.getText('END_TIME'),
								text: endTime
       }],
						showNote: false,
						title: popupTitle,
						confirmButtonLabel: this.oBundle.getText("OK")
					};

				} else {

					oSettings = {
						question: popupHeader,
						additionalInformation: [
							{
								label: this.oBundle
									.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
								text: selectedDates.length.toString()
       },
							{
								label: this.oBundle
									.getText('DURATION'),
								text: summaryHoursText
       }],
						showNote: false,
						title: popupTitle,
						confirmButtonLabel: this.oBundle.getText("OK")
					};
				}

				this.openConfirmationPopup(
					oSettings,
					function(response) {

						var batchCreate = [],
							workdate = "";
						var operation = (self.oApplication.getModel("S31modelexch").getData().editentryview) ? "U" : "C";
						if (selectedDates.length !== 0) {

							for (i = 0; i < selectedDates.length; i++) {
								self.entry = self.replaceSpecialChar(self.entry);
								workdate = self.getDateTimeStr(new Date(selectedDates[i]));

								batchCreate
									.push(self
										.setPostObject(
											self.entry.counter,
											operation,
											workdate,
											self.entry.time,
											self.entry.mainName,
											self.entry.mainCode,
											self.entry.notes,
											self.entry.startTime,
											self.entry.endTime,
											self.entry.subItems,
											self.entry.childCodes,
											self.entry.childNames));

							}

						}
						if (batchCreate.length === 0) {
							//   sap.ui.getCore().lock();
							confirmationDialog.close();

						} else {

							self.oService
								.submitTimeEntry(
									self,
									batchCreate, [], [],
									function() {
										var toastMsg;
										if (!self.releaseAllowed) {
											toastMsg = self.oBundle
												.getText("DRAFT_SUCCESS");
										} else {
											toastMsg = self.oBundle.getText("SUBMIT_SUCCESS");
										}

										var calendar = self.byId("weeklyCalendar");
										var selectedDate = calendar.getCurrentDate();
										var dateStr = selectedDate;
										selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
										var oModel = new sap.ui.model.json.JSONModel();
										oModel.setProperty("/currentDate", new Date(dateStr));
										self.oApplication.setModel(oModel, "S3exchangeModel");
										delete self.entry;
										//navigate to S3
										self.cleanUpOnBack();
										self.oRouter.navTo("S3", {
											context: selectedDate
										}, true);
										sap.m.MessageToast.show(toastMsg);

									},
									function(hasError, errorDates) {
										var weeklyCal = self.byId("weeklyCalendar");
										weeklyCal.unselectAllDates();
										weeklyCal.toggleDatesSelection(errorDates, true);
									});
						}
					});

			},

			openConfirmationPopup: function(oSettings, successHandler) {
				var self = this;
				var oElements = [];
				for (var i = 0; i < oSettings.additionalInformation.length; i++) {
					oElements.push(new sap.m.Label({
						text: oSettings.additionalInformation[i].label,
						design: "Bold"
					}));
					oElements.push(new sap.m.Text({
						text: oSettings.additionalInformation[i].text
					}));
				}
				var oForm = new sap.ui.layout.form.SimpleForm({
					minWidth: 1024,
					editable: false,
					maxContainerCols: 2,
					layout: "ResponsiveGridLayout",
					labelSpanL: 7,
					labelSpanM: 7,
					labelSpanS: 7,
					emptySpanL: 1,
					emptySpanM: 1,
					emptySpanS: 1,
					columnsL: 1,
					columnsM: 1,
					columnsS: 1,
					content: oElements
				});
				var oConfirmDialog = new sap.m.Dialog({
					title: oSettings.title,
					content: [oForm],
					beginButton: new sap.m.Button({
						text: oSettings.confirmButtonLabel,
						press: function() {
							successHandler();
							oConfirmDialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: function() {
							oConfirmDialog.close();
						}
					})
				});
				oConfirmDialog.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
				oConfirmDialog.open();
			},

			replaceAllOccurances: function(iString) {
				if (typeof iString === "undefined") {
					return;
				}
				var vSearch = '/';
				var vReplace = '-';
				while (iString.indexOf(vSearch) > -1) {
					iString = iString.replace(vSearch, vReplace);
				}
				return iString;
			},
			replaceSpecialChar: function(entry) {
				if (typeof entry.mainName !== "undefined") {
					entry.mainName = this.replaceAllOccurances(entry.mainName);
				}
				if (typeof entry.subItems !== "undefined") {
					entry.subItems = this.replaceAllOccurances(entry.subItems);
				}
				if (typeof entry.childNames !== "undefined") {
					for (var i = 0; i < entry.childNames.length; i++) {
						entry.childNames[i] = this.replaceAllOccurances(entry.childNames[i]);
					}
				}

				return entry;
			},

			getPostData: function(day, entry) {
				var post = {};
				post.day = day;
				post.entry = entry;
				return post;
			},

			setPostObject: function(Counter, TimeEntryOperation,
				WORKDATE, CATSAMOUNT, Name, Code, notes, startTime,
				endTime, subItems, childCodes, childNames) {
				var timeEntryUpdated = {
					Pernr: this.oApplication.pernr,
					Counter: Counter,
					TimeEntryOperation: TimeEntryOperation,
					TimeEntryDataFields: {
						WORKDATE: WORKDATE,
						CATSAMOUNT: "" + CATSAMOUNT
					}

				};
				if (this.isClockEntry()) {
					timeEntryUpdated.TimeEntryDataFields.BEGUZ = startTime;
					timeEntryUpdated.TimeEntryDataFields.ENDUZ = endTime;
				}

				// always send as blank
				timeEntryUpdated.TimeEntryRelease = " ";

				/*
				 * if(this.releaseAllowed){
				 * timeEntryUpdated.TimeEntryRelease = " "; }else{
				 * timeEntryUpdated.TimeEntryRelease = "X"; }
				 */
				if (Name) {
					if (Name.indexOf("-") >= 0) {
						Name = Name.split("-").join("/");
					}

					if (this.checkFieldName(Name) === true) {
						timeEntryUpdated.TimeEntryDataFields[Name] = Code;
					}
				}
				if (subItems && subItems !== "") {
					for (var i = 0; i < childNames.length; i++) {
						if (childNames[i].indexOf("-") >= 0) {
							childNames[i] = childNames[i].split("-").join("/");
						}
						if (this.checkFieldName(childNames[i]) === true) {
							timeEntryUpdated.TimeEntryDataFields[childNames[i]] = childCodes[i];
						}
					}
				}
				if (this.worklistItemSelected) {
					timeEntryUpdated.TimeEntryDataFields = this.addWorklistFields(timeEntryUpdated.TimeEntryDataFields);
				}
				if (notes && notes !== "") {
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT_DATA = notes;
					timeEntryUpdated.TimeEntryDataFields.LONGTEXT = "X";

				}
				if(timeEntryUpdated.TimeEntryDataFields.hasOwnProperty("SPLIT")){
					timeEntryUpdated.TimeEntryDataFields.SPLIT = parseInt(timeEntryUpdated.TimeEntryDataFields.SPLIT,10);
				}
				/**
				 * @ControllerHook Modify the post object
				 * This hook method can be used to modify the object before the post call
				 * It is called when the decision options for the detail item are fetched successfully
				 * @callback hcm.mytimesheet.view.S31~extHookChangeObjectBeforePost
				 * @param {object} Post Object
				 * @return {object} Final Post Object
				 */

				if (this.extHookChangeObjectBeforePost) {
					timeEntryUpdated = this.extHookChangeObjectBeforePost(timeEntryUpdated);
				}

				return timeEntryUpdated;
			},

			checkFieldName: function(fieldName) {
				var checkString = fieldName;
				if (checkString.match("DISPTEXT")) {
					return false;
				}
				if (checkString.match("CPR_OBJTEXT")) {
					return false;
				}
				if (checkString.match("CPR_TEXT")) {
					return false;
				}
				return true;
			},

			addWorklistFields: function(obj) {
				for (var worklistField in this.worklistSelectedObj) {
					if (obj.hasOwnProperty(worklistField) || obj[worklistField] === "LTXA1" ) {
						continue;
					} else {
						obj[worklistField] = this.worklistSelectedObj[worklistField];
					}
				}
				return obj;
			},

			parseDateYYYYMMdd: function(dateString) {
				var dateParse = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYYMMdd"
				});
				return dateParse.parse(dateString);
			},

			onCancel: function() {
				var calendar = this.byId("weeklyCalendar");
				var selectedDate = calendar.getCurrentDate();
				var dateStr = selectedDate;
				selectedDate = dateStr + "offset" + calendar.getFirstDayOffset();
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setProperty("/currentDate", new Date(dateStr));
				this.oApplication.setModel(oModel, "S3exchangeModel");
				this.cleanUpOnBack();
				delete this.entry;
				//navigate to S3
				this.oRouter.navTo("S3", {
					context: selectedDate
				}, true);

			},

			onReset: function() {
				this.byId("timeAssignment").setValue("");
				this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
				this.byId("decimalTimeEntryValue").setValue("");
				this.byId("startTime").setValue("");
				this.byId("endTime").setValue("");
				this.byId("weeklyCalendar").setDisabledWeekDays([]);
				this.byId("weeklyCalendar").unselectAllDates();
				this.byId("S31TextArea").setValue("");
				this.byId("ClkTimeDecimalTimeEntryValue").setValue(""); //Note: Begin 2141131 clock time duration field
				this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(true);
				this.setBtnEnabled("SUBMIT_BTN", false); //Note: End 2141131 clock time duration field
				delete this.worklistSelectedObj;
				this.worklistSelectedObj = {};
				this.worklistItemSelected = false;
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				for (var i = 0; i < types.length; i++) {
					if (types[i].value !== "" || types[i].valueStateText !== "") {
						types[i].value = "";
						types[i].valueStateText = "";
					}
				}
				//Note: Begin 2141131 clock time duration field
				if (this.isClockEntry() && this.byId("ClkTimeDecimalTimeEntryValue").getVisible()) {
					this.entry.startTime = "000000";
					this.entry.endTime = "000000";
					this.entry.time = "";
				}
				//Note: End 2141131 clock time duration field
				// this.byId("accountingInfoPanel").setExpanded(false);
				this.getView().getModel().setProperty("/types", types);
				this.oApplication.getModel("accountingInfoModel").setProperty("/types", types);

			},

			openEditfavDialog: function() {
				if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
					this.getFavoritesCollection();
				}
				var itemTemplate = new sap.ui.core.Item({
					text: "{name}",
					key: "{id}"
				});
				this.editFavForm = new sap.ui.layout.form.Form({
					maxContainerCols: 2,
					layout: new sap.ui.layout.form.ResponsiveGridLayout({
						labelSpanL: 4,
						emptySpanL: 3,
						labelSpanM: 4,
						emptySpanM: 2,
						columnsL: 1,
						columnsM: 1
					}),
					formContainers: new sap.ui.layout.form.FormContainer({
						formElements: [
                       new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("EXISTING_FAV_NAME")
								}),
								fields: new sap.m.Select().bindAggregation("items", "/favorites", itemTemplate)
							}),
                   new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("NEW_FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateEditFavSaveBtn, this],
									maxLength: 30
								})
							})
               ]
					})
				}).setModel(this.oApplication.getModel("createScreenModel"));

				this.editFavDialog = new sap.m.Dialog({
					title: this.oBundle.getText("EDIT_FAVORITE"),
					content: [
                            this.editFavForm
               ],
					beginButton: new sap.m.Button({
						text: this.oBundle.getText("SAVE"),
						enabled: false,
						press: [this.updateFavorites, this]
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: jQuery.proxy(function() {
							this.editFavDialog.close();
						}, this)
					}),
					afterClose: jQuery.proxy(function() {
						this.editFavDialog.destroy();
					}, this)
				});
				this.editFavDialog.addStyleClass("sapUiContentPadding");
				this.editFavDialog.open();

			},
			validateEditFavSaveBtn: function(event) {
				var newFavName = event.getParameters("value");
				var oldFavName = this.editFavForm.getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedKey();
				if (!newFavName.value || oldFavName === "") {
					this.editFavDialog.getBeginButton().setEnabled(false);
				} else {
					this.editFavDialog.getBeginButton().setEnabled(true);
				}

			},
			openFavDialog: function() {

				var form = new sap.ui.layout.form.Form({
					maxContainerCols: 2,
					layout: new sap.ui.layout.form.ResponsiveGridLayout({
						labelSpanL: 4,
						emptySpanL: 3,
						labelSpanM: 4,
						emptySpanM: 2,
						columnsL: 1,
						columnsM: 1
					}),
					formContainers: new sap.ui.layout.form.FormContainer({
						formElements: [
                       new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateSaveFavSaveBtn, this],
									maxLength: 30
								})
							}),
                   new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									// 	text: this.oBundle.getText("NEW_FAVORITE_NAME")
								}),
								fields: new sap.m.CheckBox({
									text: this.oBundle.getText("SAVE_FAVORITE_WITH_TIME")
								})
							})
               ]
					})
				});
				this.favDialog = new sap.m.Dialog({
					title: this.oBundle.getText("ADD_FAVORITE"),
					type: "Message",
					content: [form],
					beginButton: new sap.m.Button({
						text: this.oBundle.getText("SAVE"),
						enabled: false,
						press: jQuery.proxy(this.addFavorite, this)
					}),
					endButton: new sap.m.Button({
						text: this.oBundle.getText("CANCEL"),
						press: jQuery.proxy(function() {
							this.favDialog.close();
						}, this)
					}),
					afterClose: jQuery.proxy(function() {
						this.favDialog.destroy();
					}, this)
				});
				this.favDialog.addStyleClass("sapUiContentPadding");
				this.favDialog.open();
			},

			validateSaveFavSaveBtn: function(oEvent) {
				var favName = oEvent.getParameter("value");
				if (favName.trim() !== "") {
					this.favDialog.getBeginButton().setEnabled(true);
				} else {
					this.favDialog.getBeginButton().setEnabled(false);
				}
			},

			addFavorite: function() {
				var favObj, self = this;

				//validate entries
				// var name = this.byId("favName").getValue();
				var name = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getValue();
				var withTime = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getSelected();

				favObj = this.setFavoritePostObject(name);
				var toastMsg;
				if (name === "") {
					toastMsg = this.oBundle.getText("FAV_NAME_ERROR");
					sap.m.MessageToast.show(toastMsg);
				} else if (favObj === null) {
					toastMsg = this.oBundle.getText("FAV_DATA_ERROR");
					sap.m.MessageToast.show(toastMsg);
				} else {
					if (withTime) {
						var time = this.byId("decimalTimeEntryValue").getValue();
						var begda = this.byId("startTime").getValue(),
							endda = this.byId("endTime").getValue(); //Note: Begin 2141131 clock time duration field
						if (!this.isClockEntry() || this.clkTimeDurationFilled) {
							if (this.clkTimeDurationFilled) {
								time = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
							} //Note: End 2141131 clock time duration field
							if (time === "" || !this._isValidDecimalNumber(time)) {
								toastMsg = this.oBundle.getText("FAV_TIME_ERROR");
								sap.m.MessageToast.show(toastMsg);
								return;
							} else {
								favObj.FavoriteDataFields.CATSHOURS = time;
							}
						} else {
							if (begda === "" || endda === "" || begda === endda) {
								toastMsg = this.oBundle.getText("FAV_CLOCK_TIME_ERROR");
								sap.m.MessageToast.show(toastMsg);
								return;
							} else {
								favObj.FavoriteDataFields.BEGUZ = begda;
								favObj.FavoriteDataFields.ENDUZ = endda;
							}
						}
					}
					if (!this.oService) {
						this.oService = new hcm.mytimesheet.Service();
					}
					this.oService.createFavorite(this, favObj, function(oData) {
						var newFav = {
							name: oData.Name,
							type: oData.ObjType,
							id: oData.ID,
							FavoriteDataFields: oData.FavoriteDataFields,
							childs: [],
							info: "",
							subText: oData.Field_Text,
							active: true
						};
						var FavDataFields = newFav.FavoriteDataFields;
						var favorites = self.oApplication.getModel("createScreenModel").getProperty("/favorites");
						for (var prop in favObj.FavoriteDataFields) {
							if (prop !== "CATSHOURS" && prop !== "BEGUZ" && prop !== "ENDUZ") {
								FavDataFields[prop] = favObj.FavoriteDataFields[prop];
								newFav.childs
									.push({
										name: prop,
										value: FavDataFields[prop]
									});
							} else {
								if (self.isClockEntry() && !self.clkTimeDurationFilled) { //Note: 2141131 clock time duration field
									var timeParser = sap.ca.ui.model.format.DateFormat.getTimeInstance({
										pattern: "HHmm"
									});
									var timeFormatter = sap.ca.ui.model.format.DateFormat.getTimeInstance({
										style: "short"
									});
									begda = timeParser.parse(begda);
									begda = timeFormatter.format(begda);
									endda = timeParser.parse(endda);
									endda = timeFormatter.format(endda);
								}
								FavDataFields[prop] = favObj.FavoriteDataFields[prop];
								switch (prop) {
									case "CATSHOURS":
										newFav.info = self.oBundle.getText("TOTAL_RECORDED_HOURS", [favObj.FavoriteDataFields.CATSHOURS]);
										break;
									case "BEGUZ":
									case "ENDUZ":
										newFav.info = self.oBundle.getText("WEEK_DATE_RANGE", [begda, endda]);
								}
							}
						}
						if (!oData.Field_Text) {
							var childs = newFav.childs,
								subText = "";
							for (var j = 0; j < childs.length; j++) {
								subText += childs[j].name + ":" + childs[j].value + ",";
							}
							subText = subText.substring(0, subText.length - 1);
							newFav.subText = subText;
						}
						favorites.push(newFav);
						self.byId("timeAssignmentLbl").setVisible(true);
						self.byId("timeAssignment").setVisible(true);
						self.favDialog.close();
						self.oApplication.getModel("createScreenModel").refresh();
					});

				}
			},

			updateFavorites: function() {
				var favObj = {};
				var i;
				// var types = this.getView().getModel().getData().types;
				favObj.Name = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getValue();
				var oldFavName = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedItem().getText();
				var favorites = this.oApplication.getModel("createScreenModel").getProperty("/favorites");
				favObj.Pernr = this.oApplication.pernr;
				for (i = 0; i < favorites.length; i++) {
					if (oldFavName === favorites[i].name) {
						favObj.ID = favorites[i].id;
						favorites[i].name = favObj.Name; //Update the favorite name
						if (oldFavName === this.byId("timeAssignment").getValue()) {
							//update the fav name in the main view , if the fav name being changed in the edit fav dialog is the same as the one selected in the main view
							this.byId("timeAssignment").setValue(favObj.Name);
						}
						break;
					}
				}

				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				this.oService.updateFavorite(this, favObj, jQuery.proxy(function() {
					this.oApplication.getModel("createScreenModel").setProperty("/favorites", favorites);
					this.oApplication.getModel("createScreenModel").refresh();
					this.editFavDialog.close();
				}, this));
			},

			setFavoritePostObject: function(name) {
				var favObj, favName, favoriteDataFields, value;

				favObj = {};
				favoriteDataFields = {};

				//set the FavoriteDataFields
				var types = this.oApplication.getModel("accountingInfoModel").getData().types;
				//set the name
				// favName = this.byId("favName").getValue();
				favName = name;
				var flag = false;
				for (var i = 0; i < types.length; i++) {
					value = "";
					if (types[i].value !== "" && types[i].valueStateText !== "") {
						if (types[i].value !== "") {
							value = types[i].valueStateText;
							flag = true;
						}
						favoriteDataFields[types[i].fieldName] = value;
					}
				}
				if (flag) {
					//set the object
					favObj = {
						Pernr: this.oApplication.pernr,
						Name: favName,
						FavoriteDataFields: favoriteDataFields
					};
				} else {
					favObj = null;
				}
				return favObj;

			},
			handleDelete: function(evt) {
				var self = this;
				var selectedItem = evt.getParameter("listItem");
				var selectedId = selectedItem.getCustomData()[2].getValue();
				if (!this.oService) {
					this.oService = new hcm.mytimesheet.Service();
				}
				var favObj = {
					Name: evt.getParameter("listItem").getTitle(),
					ID: selectedId,
					Pernr: this.oApplication.pernr
				};

				this.oService.deleteFavorite(this, favObj, function() {
					evt.getSource().removeItem(selectedItem);
					self.favoriteDeletedIds.push(selectedId);

				});

			},

			editFavorites: function(oEvent) {
				var self = this;
				var manageBtn = new sap.m.Button({
					text: self.oBundle.getText("DELETE_FAVORITES"),
					press: function(oEvent) {
						self.manageFavorites(oEvent);
						self.oApplication.getModel("createScreenModel").refresh();
						self.actionSheet.close();
					}
				});
				var EditFavBtn = new sap.m.Button({
					text: self.oBundle.getText("EDIT_FAVORITE"),
					press: function(oEvent) {
						self.openEditfavDialog(oEvent);
						self.actionSheet.close();
					}
				});
				var saveAsFavBtn = new sap.m.Button({
					text: self.oBundle.getText("SAVE_AS_FAV"),
					press: function(oEvent) {
						self.openFavDialog();
						self.actionSheet.close();
					}
				});

				var oActionSheet = new sap.m.ActionSheet({

					placement: sap.m.PlacementType.Top,

					showCancelButton: true,

					buttons: [EditFavBtn, manageBtn, saveAsFavBtn]

				});
				oActionSheet.openBy(oEvent.getSource());
				this.actionSheet = oActionSheet;
			},

			//delete favorites
			manageFavorites: function() {

				var self = this;
				var beginBtn = new sap.m.Button({
					text: this.oBundle.getText("OK")
				});
				if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
					this.getFavoritesCollection();
				}
				var itemTemplate = new sap.m.StandardListItem({
					title: "{name}",
					description: "{subText}",
					active: "true",
					info: "{info}",
					customData: [
           new sap.ui.core.CustomData({
							key: "items",
							value: "{childs}"
						}),
           new sap.ui.core.CustomData({
							key: "type",
							value: "{type}"
						}),
           new sap.ui.core.CustomData({
							key: "id",
							value: "{id}"
						})
           ]
				});
				this.favList = new sap.m.List({
					mode: "Delete"
				}).bindAggregation("items", "/favorites", itemTemplate);
				this.favList.attachDelete(function(evt) {
					self.handleDelete(evt);
				});

				var confirmDialog = new sap.m.Dialog({
					title: this.oBundle.getText("FAV_DIALOG_BOX"),
					content: [
                this.favList
                     ],
					beginButton: beginBtn,
					afterClose: jQuery.proxy(function() {
						confirmDialog.destroy();
					}, this)
				});
				confirmDialog.setModel(this.oApplication.getModel("createScreenModel"));
				beginBtn.attachPress(function() {
					if (self.favoriteDeletedIds.length) {
						var ids = [],
							idCounter = 0;
						var favorites = self.oApplication.getModel("createScreenModel").getProperty("/favorites");
						for (idCounter = 0; idCounter < self.favoriteDeletedIds.length; idCounter++) {
							for (var i = 0; i < favorites.length; i++) {
								if (self.favoriteDeletedIds[idCounter] === favorites[i].id) {
									ids.push(i);
									break;
								}
							}
						}
						ids.sort(function(a, b) {
							return b - a;
						});

						for (i = 0; i < ids.length; i++) {
							favorites.splice(ids[i], 1);
						}
						// self.oApplication.getModel("createScreenModel").setProperty("/favorites", favorites);
						self.favoriteDeletedIds = [];
					}
					confirmDialog.close();
				});
				confirmDialog.open();

			},

			isClockEntry: function() {
				return this.clockEntry;
			},

			resetMainAndChildItems: function() {
				if ("mainItem" in this.entry) {
					this.deleteMainItem();
				}
				if ("subItems" in this.entry) {
					this.deleteSubItems();
				}
			},

			deleteMainItem: function() {
				delete this.entry.mainItem;
				delete this.entry.mainName;
				delete this.entry.mainCode;
			},

			deleteSubItems: function() {
				delete this.entry.subItems;
				delete this.entry.childItems;
				delete this.entry.childNames;
				delete this.entry.childCodes;
			},

			initializeChildItems: function() {
				this.entry.childItems = [];
				this.entry.childNames = [];
				this.entry.childCodes = [];
			},
			getHderFooterOptions: function() {
				if (this.oApplication.pernr) {
					var cancelBtnText = this.oApplicationFacade.getResourceBundle().getText("CANCEL");
					var resetBtnText = this.oApplicationFacade.getResourceBundle().getText("RESET");
					var editFavoriteBtnTxt = this.oApplicationFacade.getResourceBundle().getText("FAVORITE");
					var s3Model = this.oApplication.getModel("S31modelexch");
					var submitButtonText;
					if (!this.oApplication.getModel("TSM_WEEKLY").getData().releaseAllowed) {
						submitButtonText = this.oApplicationFacade
							.getResourceBundle().getText("SAVE_DRAFT");
					} else {
						submitButtonText = this.oApplicationFacade
							.getResourceBundle().getText("SUBMIT");
					}
					var screenTitleText;
					if (!s3Model) {

						screenTitleText = this.oApplicationFacade
							.getResourceBundle().getText(
								"TIMESHEET_CREATE_ENTRY_TITLE");
					} else {
						if (s3Model.getProperty("/editentryview")) {
							screenTitleText = this.oApplicationFacade
								.getResourceBundle()
								.getText(
									"TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
						} else {
							screenTitleText = this.oApplicationFacade
								.getResourceBundle().getText(
									"TIMESHEET_CREATE_ENTRY_TITLE");
						}
					}
					var that = this;
					var valueforbutton = {
						sId: "SUBMIT_BTN",
						sI18nBtnTxt: submitButtonText,
						onBtnPressed: function(evt) {
							that.onDone(evt);
						}
					};

					var objHdrFtr = {
						sI18NFullscreenTitle: screenTitleText,

						oEditBtn: valueforbutton,

						buttonList: [

							{
								sId: "cancelBtn",
								sI18nBtnTxt: cancelBtnText,
								onBtnPressed: function(evt) {
									that.onCancel(evt);
								}
       },
							{
								sId: "resetBtn",
								sI18nBtnTxt: resetBtnText,
								onBtnPressed: function() {
									that.onReset();
								}
       }

       ],
						onBack: jQuery.proxy(function() {
							this.onNavButton();
						}, this)
					};
					if (this.oApplication.getModel("TSM_WEEKLY").getData().favoriteAvailable) {
						objHdrFtr.buttonList[2] = {
							sId: "EditFavoriteBtn",
							sI18nBtnTxt: editFavoriteBtnTxt,
							onBtnPressed: function(evt) {
								that.editFavorites(evt);
							}
						};
					}
					var m = new sap.ui.core.routing.HashChanger();
					var oUrl = m.getHash();
					if (oUrl.indexOf("Shell-runStandaloneApp") >= 0) {
						objHdrFtr.bSuppressBookmarkButton = true;
					}

					/**
					 * @ControllerHook Modify the footer buttons
					 * This hook method can be used to add and change buttons for the detail view footer
					 * It is called when the decision options for the detail item are fetched successfully
					 * @callback hcm.mytimesheet.view.S31~extHookChangeHeaderFooterOptions
					 * @param {object} Header Footer Object
					 * @return {object} Header Footer Object
					 */

					if (this.extHookChangeHeaderFooterOptions) {
						objHdrFtr = this.extHookChangeHeaderFooterOptions(objHdrFtr);
					}
					// 	return objHdrFtr;
					this.setHeaderFooterOptions(objHdrFtr);
				}
			}
		});
},
	"hcm/mytimesheet/view/S31.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<sap.ui.core:View controllerName="hcm.mytimesheet.view.S31"\n\txmlns="sap.m" xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.layout="sap.ui.layout" xmlns:sap.me="sap.me"\n\txmlns:sap.ui.core="sap.ui.core">\n\t<Page id="page" title="{i18n>MANUAL_INPUT_EDIT}" showNavButton="true"\n\t\t enableScrolling="true" navButtonPress="onNavButton">\n\t\t<content>\n\t\t\t<sap.me:Calendar id="weeklyCalendar" singleRow="true" \n\t\t\t\tweeksPerRow="2" design="Approval" enableMultiselection="true"\n\t\t\t\tcurrentDate="{ path: \'/start\', formatter:\'.parseDateYYYYMMdd\' }"\n\t\t\t\ttapOnDate="onTapOnDate" changeRange="onChangeRange" hideNavControls="false">\n\t\t\t</sap.me:Calendar>\n\n\n\t\t\t<sap.ui.layout:Grid defaultSpan="L8 M8 S12"\n\t\t\t\tdefaultIndent="L2 M2 S0" width="auto">\n\t\t\t\t<sap.ui.layout:content>\n\t\t\t\t<Panel id = "createPanel" headerText="{i18n>ENTRY_DETAILS}">\n\t\t\t\t<content>\n\t\t\t\t\t<sap.ui.layout.form:Form id="createFormTitle"\n\t\t\t\t\t\tmaxContainerCols="2">\n\t\t\t\t\t\t<sap.ui.layout.form:layout>\n\t\t\t\t\t\t\t<sap.ui.layout.form:ResponsiveGridLayout\n\t\t\t\t\t\t\t\tlabelSpanL="4" emptySpanL="3" \n\t\t\t\t\t\t\t\tlabelSpanM="4" emptySpanM="2" \n\t\t\t\t\t\t\t\tcolumnsL="2" columnsM="2"/>\n\t\t\t\t\t\t</sap.ui.layout.form:layout>\n\t\t\t\t\t\t<sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t<sap.ui.layout.form:FormContainer\n\t\t\t\t\t\t\t\tid="firstContainer" visible="true">\n\t\t\t\t\t\t\t\t<sap.ui.layout.form:formElements>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="timeAssignmentLbl" class="sapUiSmallMarginTop"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>SELECT_FAVORITE}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="timeAssignment" \n\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true" valueHelpRequest="onFavoriteInputHelp" valueHelpOnly="true"\n\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItemSelected=\'onFavoriteItemSelection\'\n\t\t\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement\n\t\t\t\t\t\t\t\t\t\tvisible="{/decimalTimeEntryVisible}">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="decimalInputLbl" class="sapUiSmallMarginTop" text="{i18n>DURATION}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="decimalTimeEntryValue" value="{entry>/time}" type="Text"\n\t\t\t\t\t\t\t\t\t\t\t\tchange="onDecimalTimeValueChange">\n\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement\n\t\t\t\t\t\t\t\t\t\tvisible="{/clockEntry}">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="startTimeLbl" class="sapUiSmallMarginTop" text="{i18n>TIME}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<DateTimeInput id="startTime" type="Time" placeholder="{i18n>FROM}"\n\t\t\t\t\t\t\t\t\t\t\t\tvalueFormat="HHmmss" value="{entry>/startTime}" change="validate">\n\t\t\t\t\t\t\t\t\t\t\t</DateTimeInput>\n\t\t\t\t\t\t\t\t\t\t\t<DateTimeInput id="endTime" type="Time" placeholder="{i18n>TO}"\n\t\t\t\t\t\t\t\t\t\t\t\tvalueFormat="HHmmss" value="{entry>/endTime}" change="validate">\n\t\t\t\t\t\t\t\t\t\t\t</DateTimeInput>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement id="ClkTimeDurationEle"\n\t\t\t\t\t\t\t\t\t\tvisible="false">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="ClkTimeDecimalInputLbl" class="sapUiSmallMarginTop" text="{i18n>DURATION}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="ClkTimeDecimalTimeEntryValue" type="Text"\n\t\t\t\t\t\t\t\t\t\t\t\tchange="onDecimalTimeValueChange">\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<!-- extension point for adding Form Elements in the inputs section in the first form -->\t\n        \t\t                    <sap.ui.core:ExtensionPoint name="extS31FormElementForInputs"></sap.ui.core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label text="{i18n>NOTE}" class="sapUiSmallMarginTop" />\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<TextArea id=\'S31TextArea\' value="{entry>/notes}">\n\n\t\t\t\t\t\t\t\t\t\t\t</TextArea>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t</sap.ui.layout.form:formElements>\n\t\t\t\t\t\t\t</sap.ui.layout.form:FormContainer>\n\t\t\t\t\t\t</sap.ui.layout.form:formContainers>\n\t\t\t\t\t</sap.ui.layout.form:Form>\n\t\t\t\t\t</content>\n\t\t\t\t\t</Panel>\n\t\t\t\t    <Panel id="accountingInfoPanel" expandable="true" expanded="false" headerText="{i18n>COST_ASSIGNMENT}">\n\t\t\t\t\t\t\t\t\t<content>\n\t\t\t\t\t<sap.ui.layout.form:Form id="accountingInfos" \n\t\t\t\t\t\tmaxContainerCols="1">\n\t\t\t\t\t\t<sap.ui.layout.form:layout>\n\t\t\t\t\t\t\t<sap.ui.layout.form:ResponsiveGridLayout \n\t\t\t\t\t\t\t\tlabelSpanL="4" emptySpanL="3" \n\t\t\t\t\t\t\t\tlabelSpanM="4" emptySpanM="2" \n\t\t\t\t\t\t\t\tcolumnsL="1" columnsM="1" />\n\t\t\t\t\t\t</sap.ui.layout.form:layout>\n\t\t\t\t\t\t<sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t<sap.ui.layout.form:FormContainer\n\t\t\t\t\t\t\t\tid="manualAccountingInfos" formElements="{accountingInfoModel>/types}">\n\t\t\t\t\t\t\t\t<sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\tweight="8" linebreak="true"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t</sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t<!-- extension point for additional Form Element for accounting Infos -->\t\n        \t\t                    <sap.ui.core:ExtensionPoint name="extS31FormElementAccountingInfos"></sap.ui.core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tweight="8" linebreak="true">\n\t\t\t\t\t\t\t\t\t\t\t</sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label class="sapUiSmallMarginTop"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{accountingInfoModel>name}">\n\t\t\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tweight="1"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input showValueHelp="{accountingInfoModel>valueHelp}"\n\t\t\t\t\t\t\t\t\tname="{accountingInfoModel>fieldName}"\n\t\t\t\t\t\t\t\t\tvalueStateText="{accountingInfoModel>valueStateText}"\n\t\t\t\t\t\t\t\t\tvalueHelpRequest="onInputHelp"\n\t\t\t\t\t\t\t\t\tliveChange=\'manualHelpChange\'\n\t\t\t\t\t\t\t\t\tsuggestionItemSelected=\'onManualItemSelection\'\n\t\t\t\t\t\t\t\t\tvalue="{accountingInfoModel>value}"\n\t\t\t\t\t\t\t\t\tenabled="{accountingInfoModel>ReadOnly}">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormContainer>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:Form>\n\t\t\t\t\t\t\t\t\t</content>\n\t\t\t\t\t\t\t\t\t\t</Panel>\n\t\t\t\t</sap.ui.layout:content>\n\t\t\t</sap.ui.layout:Grid>\n\t\t\t\n\t\t</content>\n\t</Page>\n</sap.ui.core:View>'
}});
