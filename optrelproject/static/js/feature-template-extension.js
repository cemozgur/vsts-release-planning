/**
* @author Suwichak Fungprasertkul <suwichak@outlook.com>
* @version 1.0
* @license MIT License Copyright (c) 2016 OptRel team
* @description Feature Template extension is for initalizaing the User action within in feature-template-extension.html
*/

var workItemID;
var RPDSDocsExist = false;
var RPDSDocsName = "RPDS";

VSS.init({
  explicitNotifyLoaded: true,
  usePlatformScripts: true
});

VSS.require(["TFS/WorkItemTracking/Services"], function (_WorkItemServices) {

  // Get the WorkItemFormService.  This service allows you to get/set fields/links on the 'active' work item (the work item that currently is displayed in the UI).
  function getWorkItemFormService() {
    return _WorkItemServices.WorkItemFormService.getService();
  }

  // Register a listener for the work item group contribution.
  VSS.register(VSS.getContribution().id, function () {
    return {
      // Called when the active work item is modified
      onFieldChanged: function (args) {
        $(".events").append($("<div/>").text("onFieldChanged - " + JSON.stringify(args)));
      },

      // Called when a new work item is being loaded in the UI
      onLoaded: function (args) {
        getWorkItemFormService().then(function (service) {
          // Get the current values for a few of the common fields
          service.getFieldValue("System.Id").then(
            function (value) {
              workItemID = value;
              $(".events").append($("<div/>").text("onLoaded - " + JSON.stringify(value)));
            });
          // Get data service
          VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
            // Get document by Work Item id
            var id = 0;
            dataService.getDocument(RPDSDocsName, workItemID).then(function (doc) {
              id = doc.id;
            }).then(function (doc) {
              if (id != undefined) {
                RPDSDocsExist = true;
                document.getElementById('minBusinessValue').value = doc.BusinessValue.Min;
                document.getElementById('expectedBusinessValue').value = doc.BusinessValue.Expected;
                document.getElementById('maxBusinessValue').value = doc.BusinessValue.Max;
                document.getElementById('minCost').value = doc.Cost.Min;
                document.getElementById('expectedCost').value = doc.Cost.Expected;
                document.getElementById('maxCost').value = doc.Cost.Max;
                document.getElementById('minEffort').value = doc.Effort.Min;
                document.getElementById('expectedEffort').value = doc.Effort.Expected;
                document.getElementById('maxEffort').value = doc.Effort.Max;
                document.getElementById('minRisk').value = doc.Risk.Min;
                document.getElementById('expectedRisk').value = doc.Risk.Expected;
                document.getElementById('maxRisk').value = doc.Risk.Max;
                document.getElementById('minTimeCriticality').value = doc.timeCriticality.Min;
                document.getElementById('expectedTimeCriticality').value = doc.timeCriticality.Expected;
                document.getElementById('maxTimeCriticality').value = doc.timeCriticality.Max;
                document.getElementById('featureDependency').value = doc.Dependency;
              }
            });
          });

        })
      },

      // Called when the active work item is being unloaded in the UI
      onUnloaded: function (args) {
        $(".events").empty();
        $(".events").append($("<div/>").text("onUnloaded - " + JSON.stringify(args)));
      },

      // Called after the work item has been saved
      onSaved: function (args) {
        $(".events").append($("<div/>").text("onSaved - " + JSON.stringify(args)));
        getWorkItemFormService().then(function (service) {
          //service.setFieldValue("System.Title", "Title set from your group extension!");
        });
      },

      // Called when the work item is reset to its unmodified state (undo)
      onReset: function (args) {
        $(".events").append($("<div/>").text("onReset - " + JSON.stringify(args)));
      },

      // Called when the work item has been refreshed from the server
      onRefreshed: function (args) {
        $(".events").append($("<div/>").text("onRefreshed - " + JSON.stringify(args)));
      }
    }
  });

  VSS.notifyLoadSucceeded();

  // Get work item form service
  $.validator.addMethod("regex", function (value, element, regexpr) {
    return regexpr.test(value);
  });

  $("#saveSetting").submit(function (e) {
    e.preventDefault();
  }).validate({
    errorElement: 'div',
    errorLabelContainer: '#errors',
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      minBusinessValue: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      expectedBusinessValue: {
        required: true,
        number: true,
        range: function () { return [$('#minBusinessValue').val(), $('#maxBusinessValue').val()]; },
        regex: /^\d+(?:\.\d\d?)?$/
      },
      maxBusinessValue: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      minCost: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      expectedCost: {
        required: true,
        number: true,
        range: function () { return [$('#minCost').val(), $('#maxCost').val()]; },
        regex: /^\d+(?:\.\d\d?)?$/
      },
      maxCost: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      minEffort: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      expectedEffort: {
        required: true,
        number: true,
        range: function () { return [$('#minEffort').val(), $('#maxEffort').val()]; },
        regex: /^\d+(?:\.\d\d?)?$/
      },
      maxEffort: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      minRisk: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      expectedRisk: {
        required: true,
        number: true,
        range: function () { return [$('#minRisk').val(), $('#maxRisk').val()]; },
        regex: /^\d+(?:\.\d\d?)?$/
      },
      maxRisk: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      minTimeCriticality: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      expectedTimeCriticality: {
        required: true,
        number: true,
        range: function () { return [$('#minTimeCriticality').val(), $('#maxTimeCriticality').val()]; },
        regex: /^\d+(?:\.\d\d?)?$/
      },
      maxTimeCriticality: {
        required: true,
        number: true,
        regex: /^\d+(?:\.\d\d?)?$/
      },
      featureDependency: {
        regex: /^[0-9,]+$/,
        required: true,
      }
    },
    // Specify validation error messages
    messages: {
      minBusinessValue: {
        required: "- Please enter minimum Business Value </br>",
        number: "- Invalid minimum Business Value value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      expectedBusinessValue: {
        required: "- Please enter expected Business Value </br>",
        number: "- Invalid expected Business Value value (Number only)</br>",
        range: "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      maxBusinessValue: {
        required: "- Please enter maximum Business Value </br>",
        number: "- Invalid maximum Business Value value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      minCost: {
        required: "- Please enter minimum Implementation Cost </br>",
        number: "- Invalid minimum Implementation Cost value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      expectedCost: {
        required: "- Please enter expected Implementation Cost </br>",
        number: "- Invalid expected Implementation Cost value (Number only)</br>",
        range: "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      maxCost: {
        required: "- Please enter maximum Implementation Cost </br>",
        number: "- Invalid maximum Implementation Cost value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      minEffort: {
        required: "- Please enter minimum Effort </br>",
        number: "- Invalid minimum Effort value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      expectedEffort: {
        required: "- Please enter expected Effort </br>",
        number: "- Invalid expected Effort value (Number only)</br>",
        range: "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      maxEffort: {
        required: "- Please enter maximum Effort </br>",
        number: "- Invalid maximum Effort value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      minRisk: {
        required: "- Please enter minimum Risk </br>",
        number: "- Invalid minimum Risk value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      expectedRisk: {
        required: "- Please enter expected Risk </br>",
        number: "- Invalid expected Risk value (Number only)</br>",
        range: "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      maxRisk: {
        required: "- Please enter maximum Risk </br>",
        number: "- Invalid maximum Risk value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      minTimeCriticality: {
        required: "- Please enter minimum Time Criticality </br>",
        number: "- Invalid minimum Time Criticality value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      expectedTimeCriticality: {
        required: "- Please enter expected Time Criticality </br>",
        number: "- Invalid expected Time Criticality value (Number only)</br>",
        range: "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      maxTimeCriticality: {
        required: "- Please enter maximum Time Criticality </br>",
        number: "- Invalid maximum Time Criticality value (Number only)</br>",
        regex: "- Invalid Number Range (Postive Number Only)"
      },
      featureDependency: {
        required: "- Please enter Feature Dependency/Dependencies</br>",
        regex: "- Invalid Feature Dependency/Dependencies value (Number with comma separator only)</br>"

      }
    },
    submitHandler: function (form) {
      // Get data service
      VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
        if (RPDSDocsExist == true) {
          // Get document first
          dataService.getDocument(RPDSDocsName, workItemID).then(function (doc) {
            // Update the document
            doc.BusinessValue.Min = document.getElementById('minBusinessValue').value;
            doc.BusinessValue.Expected = document.getElementById('expectedBusinessValue').value;
            doc.BusinessValue.Max = document.getElementById('maxBusinessValue').value;
            doc.Cost.Min = document.getElementById('minCost').value;
            doc.Cost.Expected = document.getElementById('expectedCost').value;
            doc.Cost.Max = document.getElementById('maxCost').value;
            doc.Effort.Min = document.getElementById('minEffort').value;
            doc.Effort.Expected = document.getElementById('expectedEffort').value;
            doc.Effort.Max = document.getElementById('maxEffort').value;
            doc.Risk.Min = document.getElementById('minRisk').value;
            doc.Risk.Expected = document.getElementById('expectedRisk').value;
            doc.Risk.Max = document.getElementById('maxRisk').value;
            doc.timeCriticality.Min = document.getElementById('minTimeCriticality').value;
            doc.timeCriticality.Expected = document.getElementById('expectedTimeCriticality').value;
            doc.timeCriticality.Max = document.getElementById('maxTimeCriticality').value;
            doc.Dependency = document.getElementById('featureDependency').value;
            dataService.updateDocument(RPDSDocsName, doc).then(function (d) {
            });
          });
        } else {
          // Prepare document first
          var newDoc = {
            id: workItemID,
            BusinessValue: {
              Min: document.getElementById('minBusinessValue').value,
              Expected: document.getElementById('expectedBusinessValue').value,
              Max: document.getElementById('maxBusinessValue').value
            },
            Cost: {
              Min: document.getElementById('minCost').value,
              Expected: document.getElementById('expectedCost').value,
              Max: document.getElementById('maxCost').value
            },
            Effort: {
              Min: document.getElementById('minEffort').value,
              Expected: document.getElementById('expectedEffort').value,
              Max: document.getElementById('maxEffort').value
            },
            Risk: {
              Min: document.getElementById('minRisk').value,
              Expected: document.getElementById('expectedRisk').value,
              Max: document.getElementById('maxRisk').value
            },
            timeCriticality: {
              Min: document.getElementById('minTimeCriticality').value,
              Expected: document.getElementById('expectedTimeCriticality').value,
              Max: document.getElementById('maxTimeCriticality').value
            },
            Dependency: document.getElementById('featureDependency').value
          };
          dataService.createDocument(RPDSDocsName, newDoc).then(function (doc) { });
          RPDSDocsExist = true;
        }
        alert("VSTS Release Planning Extenion: The feature configuration has been saved.");
      });
    }
  });

  $("#clearSetting").click(function () {
    // Get work item form service
    // Get data service
    VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
      dataService.deleteDocument(RPDSDocsName, workItemID).then(function () { });
      RPDSDocsExist = false;
    });
    document.getElementById('saveSetting').reset();
    alert("VSTS Release Planning Extenion: The feature configuration has been cleared.");
  });
  VSS.resize();

});
