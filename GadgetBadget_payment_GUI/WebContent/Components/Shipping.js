//hide alert
$(document).ready(function() {

	$("#alertSuccess").hide();
	$("#alertError").hide();
	$("#hidshipmentIDSave").val("");
	$("#SHIPMENT")[0].reset();
});

$(document).on("click", "#btnSave", function(event) {

	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	// If valid------------------------
	var type = ($("#shipmentID").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "ShippingAPI",
		type : type,
		data : $("#SHIPMENT").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onItemSaveComplete(response.responseText, status);
		
			$("#alertSuccess").fadeTo(2000, 500).slideUp(500, function() {
				$("#alertSuccess").slideUp(500);
			});
		}
	});

});

function onItemSaveComplete(response, status) {
	
	if (status == "success") {
		
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") {
			
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#ShipmentGrid").html(resultSet.data);
			
		} else if (resultSet.status.trim() == "error") {
			
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error") {
		
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
		
	} else {
		
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#shipmentID").val("");
	$("#SHIPMENT")[0].reset();
}

$(document).on("click", ".btnRemove", function(event) {
	
	$.ajax({
		url : "ShippingAPI",
		type : "DELETE",
		data : "shipmentID=" + event.target.value,
		dataType : "text",
		complete : function(response, status) {
			onItemDeleteComplete(response.responseText, status);
			//window.location.reload(true);
			$("#alertSuccess").fadeTo(2000, 500).slideUp(500, function() {
				$("#alertSuccess").slideUp(500);
			});
		}
	});
});

function onItemDeleteComplete(response, status) {
	
	if (status == "success") {
		
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") {
			
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#ShimpentGrid").html(resultSet.data);
			
		} else if (resultSet.status.trim() == "error") {
			
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
		
	} else if (status == "error") {
		
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
		
	} else {
		
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// UPDATE==========================================
$(document).on("click",".btnUpdate",function(event)
		{
			$("#shipmentID").val($(this).closest("tr").find('td:eq(0)').text());
			$("#firstName").val($(this).closest("tr").find('td:eq(1)').text());
			$("#lastName").val($(this).closest("tr").find('td:eq(2)').text());
			$("#address").val($(this).closest("tr").find('td:eq(3)').text());
			$("#city").val($(this).closest("tr").find('td:eq(4)').text());
			$("#country").val($(this).closest("tr").find('td:eq(5)').text());
			$("#zipcode").val($(this).closest("tr").find('td:eq(6)').text());
			$("#phoneno").val($(this).closest("tr").find('td:eq(7)').text());		
		});


// CLIENTMODEL=========================================================================
function validateItemForm() {
	
	// First Name
	if ($("#firstName").val().trim() == "") {
		return "Please insert First Name.";
	}
	
	// Last Name
	if ($("#lastName").val().trim() == "") {
		return "Please insert Last Name.";
	}
	
	// Address
	if ($("#address").val().trim() == "") {
		return "Please insert total Address.";
	}
	
	// City
	if ($("#city").val().trim() == "") {
		return "Please insert total City.";
	}
	
	
	// Country
	if ($("#country").val().trim() == "") {
		return "Please insert total Country.";
	}
	
	// Zipcode
	if ($("#zipcode").val().trim() == "") {
		return "Please insert Zip code.";
	}
	
	// Phone number
	if ($("#phoneno").val().trim() == "") {
		return "Please insert phone number.";
	}
	
	return true;
}
