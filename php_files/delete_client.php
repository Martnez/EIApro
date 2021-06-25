<?php

    $client_id = filter_var($_GET['client_id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $name = filter_var($_GET['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $unique_index = filter_var($_GET['unique_index'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $title = filter_var($_GET['title'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);

    include "dbcon.php";
    $sql_reg = mysqli_query($link, "DELETE FROM client_documents WHERE unique_name = '$unique_index'") or die (mysqli_error($link));
    
    
    if ($title == "ci_id") {
        $file_pointer = "./documents/client-documents/ci_id/".$unique_index;
    }else if ($title == "pin_cert") {
        $file_pointer = "./documents/client-documents/pin_certificate/".$unique_index;
    }else{
        $file_pointer = "./documents/client-documents/others/".$unique_index;
    }

    if (unlink(dirname(__FILE__) . $file_pointer)) { 
        echo "
        <script>
            window.location = 'client-documents.php?id=$client_id&username=$name';
        </script>";
    } 
    else { 
        echo "
    
        <script>
            if (confirm('Failed to delete Document')) {
                window.location = 'client-documents.php?id=$client_id&username=$name';
            }else{
                window.location = 'client-documents.php?id=$client_id&username=$name';
            }
        </>";
    }
?>