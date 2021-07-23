$(document).ready(function () {
    // Setup - add a text input to each footer cell
    // $("#example tfoot th").each(function () {
    //   var title = $("#example thead th").eq($(this).index()).text();
    //   $(this).html(
    //     '<input class="input-space" type="text" placeholder="' + title + '" />'
    //   );
    // });
  
    // DataTable
    var table = $("#example").DataTable();
  
    // Apply the search
    table.columns().every(function () {
      var that = this;
  
      $("input", this.header()).on("keyup change", function () {
        that.search(this.value).draw();
      });
    });
  });