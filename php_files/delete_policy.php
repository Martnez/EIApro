<?php

    $policy_id = filter_var($_GET['policy_id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $name = filter_var($_GET['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $unique_index = filter_var($_GET['unique_index'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $title = filter_var($_GET['title'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);

    include "dbcon.php";
    $sql_reg = mysqli_query($link, "DELETE FROM policy_documents WHERE unique_name = '$unique_index'") or die (mysqli_error($link));
    
    if ($title == "quotation") {
        $file_pointer = "./documents/underwriting-documents/quotation/".$unique_index;
    }else if ($title == "risk_note") {
        $file_pointer = "./documents/underwriting-documents/risk-note/".$unique_index;
    }else if ($title == "dec_form") {
        $file_pointer = "./documents/underwriting-documents/dec-form/".$unique_index;
    }else if ($title == "policy_schedule") {
        $file_pointer = "./documents/underwriting-documents/policy_schedule/".$unique_index;
    }else if ($title == "endorsement") {
        $file_pointer = "./documents/underwriting-documents/endorsement/".$unique_index;
    }else{
        $file_pointer = "./documents/underwriting-documents/others/".$unique_index;
    }

    if (unlink(dirname(__FILE__) . $file_pointer)) { 
        echo "
        <script>
            window.location = 'policy-documents.php?id=$policy_id&username=$name';
        </script>";
    } 
    else { 
        echo "
    
        <script>
            if (confirm('Failed to delete Document')) {
                window.location = 'policy-documents.php?id=$policy_id&username=$name';
            }else{
                window.location = 'policy-documents.php?id=$policy_id&username=$name';
            }
        </>";
    }
?>