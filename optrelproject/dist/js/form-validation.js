// Wait for the DOM to be ready
$(function() {

  $.validator.addMethod("regex", function(value, element, regexpr) {
    return regexpr.test(value);
  }, "Please enter a valid pasword.");
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='featureInfo']").validate({
    // Specify validation rules
    errorElement : 'div',
    errorLabelContainer: '#errors',
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      minBusinessValue : {
        required: true,
        number : true
      },
      expectedBusinessValue : {
        required: true,
        number : true,
        range : function() { return [ $('#minBusinessValue').val(), $('#maxBusinessValue').val() ]; }
      },
      maxBusinessValue : {
        required: true,
        number : true
      },
      minCost : {
        required: true,
        number : true
      },
      expectedCost : {
        required: true,
        number : true,
        range : function() { return [ $('#minCost').val(), $('#maxCost').val() ]; }
      },
      maxCost : {
        required: true,
        number : true
      },
      minEffort : {
        required: true,
        number : true
      },
      expectedEffort : {
        required: true,
        number : true,
        range : function() { return [ $('#minEffort').val(), $('#maxEffort').val() ]; }
      },
      maxEffort : {
        required: true,
        number : true
      },
      minRisk : {
        required: true,
        number : true
      },
      expectedRisk : {
        required: true,
        number : true,
        range : function() { return [ $('#minRisk').val(), $('#maxRisk').val() ]; }
      },
      maxRisk : {
        required: true,
        number : true
      },
      minTimeCriticality : {
        required: true,
        number : true
      },
      expectedTimeCriticality : {
        required: true,
        number : true,
        range : function() { return [ $('#minTimeCriticality').val(), $('#maxTimeCriticality').val() ]; }
      },
      maxTimeCriticality : {
        required: true,
        number : true
      },
      featureDependency : {
        regex: /^[0-9,]+$/,
        required: true
      }
    },
    // Specify validation error messages
    messages: {
      minBusinessValue : {
        required: "- Please enter minimum Business Value </br>",
        number: "- Invalid minimum Business Value value (Number only)</br>"
      },
      expectedBusinessValue : {
        required: "- Please enter expected Business Value </br>",
        number: "- Invalid expected Business Value value (Number only)</br>",
        range : "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>"

      },
      maxBusinessValue : {
        required: "- Please enter maximum Business Value </br>",
        number: "- Invalid maximum Business Value value (Number only)</br>"
      },
      minCost : {
        required: "- Please enter minimum Implementation Cost </br>",
        number: "- Invalid minimum Implementation Cost value (Number only)</br>"
      },
      expectedCost : {
        required: "- Please enter expected Implementation Cost </br>",
        number: "- Invalid expected Implementation Cost value (Number only)</br>",
        range : "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>"

      },
      maxCost : {
        required: "- Please enter maximum Implementation Cost </br>",
        number: "- Invalid maximum Implementation Cost value (Number only)</br>"
      },
      minEffort : {
        required: "- Please enter minimum Effort </br>",
        number: "- Invalid minimum Effort value (Number only)</br>"
      },
      expectedEffort : {
        required: "- Please enter expected Effort </br>",
        number: "- Invalid expected Effort value (Number only)</br>",
        range : "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>"

      },
      maxEffort : {
        required: "- Please enter maximum Effort </br>",
        number: "- Invalid maximum Effort value (Number only)</br>"
      },
      minRisk : {
        required: "- Please enter minimum Risk </br>",
        number: "- Invalid minimum Risk value (Number only)</br>"
      },
      expectedRisk : {
        required: "- Please enter expected Risk </br>",
        number: "- Invalid expected Risk value (Number only)</br>",
        range : "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>"

      },
      maxRisk : {
        required: "- Please enter maximum Risk </br>",
        number: "- Invalid maximum Risk value (Number only)</br>"
      },
      minTimeCriticality : {
        required: "- Please enter minimum Time Criticality </br>",
        number: "- Invalid minimum Time Criticality value (Number only)</br>"
      },
      expectedTimeCriticality : {
        required: "- Please enter expected Time Criticality </br>",
        number: "- Invalid expected Time Criticality value (Number only)</br>",
        range : "- Invalid Range; Expected Value must be within Minimum and Maximum Range, Maximum Value must more than or equal than Expected Value and/or Minimum Value must less or equal than Expected Value </br>"

      },
      maxTimeCriticality : {
        required: "- Please enter maximum Time Criticality </br>",
        number: "- Invalid maximum Time Criticality value (Number only)</br>"
      },
      featureDependency : {
        required: "- Please enter Feature Dependency/Dependencies</br>",
        regex: "- Invalid Feature Dependency/Dependencies value (Number with comma separator only)</br>"
      }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});
