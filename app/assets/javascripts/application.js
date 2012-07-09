// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require jquery.sticky
//= require jquery.dotdotdot-1.5.1
//= require cocoon
//= require autocomplete-rails
//= require dataTables/jquery.dataTables
//= require dataTables_numhtml_sort.js
//= require dataTables_numhtml_detect.js
//= require dataTables/jquery.dataTables.bootstrap
//= require bootstrap
//= require variables.js
//= require_self

  function truncate() {
	  $(".caption_cat").dotdotdot({
		  height: 126,
		  after: ".more_info",
		  watch: 'window',
		  });
		
	  $(".equipment_title").dotdotdot({
		  height: 54, // must match .equipment_title height
		  watch: 'window'
		  });

	  $(".equipment_title").each(function(){
		  $(this).trigger("isTruncated", function( isTruncated ) {
		    if ( isTruncated ) {
		     	$(this).children(".equipment_title_link").tooltip();
		    }
		  });
	  });
	};

$(document).ready(function() {
// For DataTables and Bootstrap
	$('.datatable').dataTable({
	  "sDom": "<'row'<'span4'l><'span5'f>r>t<'row'<'span3'i><'span6'p>>",
	  "sPaginationType": "bootstrap",
		"sScrollX": "100%",
		"aoColumnDefs": [
		      { "bSortable": false, "aTargets": [ "no_sort" ] }
		    ]
	});
	
	$('.history_table').dataTable({
	  "sDom": "<'row'<l><f>r>t<'row'<'span3'i><p>>",
		"bLengthChange": false,
	  "sPaginationType": "bootstrap",
		"aoColumnDefs": [
		      { "bSortable": false, "aTargets": [ "no_sort" ] }
		    ]
	});

// For fading out flash notices
	$(".alert .close").click( function() {
	     $(this).parent().addClass("fade");
	});

// make the sidebar follow you down the page
	$("#sidebarbottom").sticky({topSpacing: 50, bottomSpacing: 200});

// perform truncate, which is also defined outside of document ready
// it needs to be both places due to a webkit bug not loading named 
// JS functions in (document).ready() until AFTER displaying all the things
	$(".caption_cat").dotdotdot({
		height: 126,
		after: ".more_info",
		watch: 'window',
		});

	$(".equipment_title").dotdotdot({
		height: 54, // must match .equipment_title height
		watch: 'window'
	});

	$(".equipment_title").each(function(){
		$(this).trigger("isTruncated", function( isTruncated ) {
		  if ( isTruncated ) {
		   	$(this).children(".equipment_title_link").tooltip();
		  }
		});
	});

	$(".btn#modal").tooltip();

  $('#modal').click(function() {
    $('#userModal div.modal-body').load(new_user, {from_cart : true }); // new_user defined in variables.js.erb
  });

});
// to disable selection of dates in the past with datepicker
$.datepicker.setDefaults({
   minDate: new Date()
});

// auto-submit cart dates #only-cart-dates
//  $(document).on('change', '.submitchange', function() {
//    $.ajax({ // we can probably use .get() instead of .ajax(), but this is more flexible going forward since it's essentially the same
//      type: "GET",
//      url: update_cart_path.value, // defined in _cart_dates in hidden field
//      data: { 'reserver_id': reserver_id.value,
//              'start_date_cart': cart_start_date_cart.value,
//              'due_date_cart': cart_due_date_cart.value },
//     dataType: "script"
//    });
//  });

$(".btn.btn-primary").bind('ajax:success', function(){
    alert("Test!");
  });
  
// auto-submit cart dates #only-cart-reserver
//  $(document).on('blur', '.submittable', function() {  // we need a different watch function than 'blur', which seems to break frequently
//    $.ajax({ // we can probably use .get() instead of .ajax(), but this is more flexible going forward since it's essentially the same
//      type: "GET",
//      url: update_cart_path.value, // defined in _cart_dates in hidden field
//      data: { 'reserver_id': reserver_id.value,
//              'start_date_cart': cart_start_date_cart.value,
//              'due_date_cart': cart_due_date_cart.value },
//      dataType: "script"
//    });
//  });
  
// old code to submit cart dates #only-dates and #only-reserver
//  $(document).on('change', '.submitchange', function() {
//      $('#cart_dates').load( update_cart_path.value, // defined in _cart_dates in hidden field
//// params need to be passed
//        { 'reserver_id': reserver_id.value,
//          'start_date_cart': cart_start_date_cart.value,
//          'due_date_cart': cart_due_date_cart.value }
//      );
//  });
//// auto-submit cart dates #only-cart-reserver
//  $(document).on('blur', '.submittable', function() { 
//      $('#cart_dates').load( update_cart_path.value, 
//// params need to be passed
//        { 'reserver_id': reserver_id.value,
//          'start_date_cart': cart_start_date_cart.value,
//          'due_date_cart': cart_due_date_cart.value }
//      );
//  });

// general submit on change class
  $(document).on('change', '.autosubmitme', function() {
    $(this).parents('form:first').submit();
  });

// general submit on click class
  $(document).on('click', '.autosubmitmeclick', function() {
    $(this).parents('form:first').submit();
  });

