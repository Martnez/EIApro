





 
<?php


    $vehicle_id = filter_var($_GET['vehicle_id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $name = filter_var($_GET['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $unique_index = filter_var($_GET['unique_index'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $title = filter_var($_GET['title'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);

    include "dbcon.php";
    $sql_reg = mysqli_query($link, "DELETE FROM vehicle_documents WHERE unique_name = '$unique_index'") or die (mysqli_error($link));
    
    
    if ($title == "logbook") {
        $file_pointer = "./documents/vehicle-documents/logbook/".$unique_index;
    }else{
        $file_pointer = "./documents/vehicle-documents/others/".$unique_index;
    }

    if (unlink(dirname(__FILE__) . $file_pointer)) { 
        echo "
        <script>
            window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
        </script>";
    } 
    else { 
        echo "
    
        <script>
            if (confirm('Failed to delete Document')) {
                window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
            }else{
                window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
            }
        </>";
    }
?>