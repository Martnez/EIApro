<?php

    $claim_id = filter_var($_GET['claim_id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $name = filter_var($_GET['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $unique_index = filter_var($_GET['unique_index'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $title = filter_var($_GET['title'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $policy = filter_var($_GET['policy'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $cover = filter_var($_GET['cover'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);

    include "dbcon.php";
    $sql_reg = mysqli_query($link, "DELETE FROM claim_documents WHERE unique_name = '$unique_index'") or die (mysqli_error($link));
    
    if ($title == "policy_abstract") {
        $file_pointer = "./documents/claim-documents/policy-abstract/".$unique_index;
    }else if ($title == "claim_form") {
        $file_pointer = "./documents/claim-documents/claim-form/".$unique_index;
    }else if ($title == "assessment_report") {
        $file_pointer = "./documents/claim-documents/assessment-report/".$unique_index;
    }else if ($title == "dv_ra") {
        $file_pointer = "./documents/claim-documents/dv_ra/".$unique_index;
    }else if ($title == "adjusters_report") {
        $file_pointer = "./documents/claim-documents/adjusters-report/".$unique_index;
    }else if ($title == "dosh_form") {
        $file_pointer = "./documents/claim-documents/dosh-form/".$unique_index;
    }else if ($title == "medical_report") {
        $file_pointer = "./documents/claim-documents/medical-report/".$unique_index;
    }else if ($title == "medical_receipt") {
        $file_pointer = "./documents/claim-documents/medical-recepit/".$unique_index;
    }else{
        $file_pointer = "./documents/claim-documents/others/".$unique_index;
    }

    if (unlink(dirname(__FILE__) . $file_pointer)) { 
        echo "
        <script>
            window.location = 'claim-documents.php?id=$claim_id&username=$name&policy=$policy&cover=$cover';
        </script>";
    } 
    else { 
        echo "
    
        <script>
            if (confirm('Failed to delete Document')) {
                window.location = 'claim-documents.php?id=$claim_id&username=$name&policy=$policy&cover=$cover';
            }else{
                window.location = 'claim-documents.php?id=$claim_id&username=$name&policy=$policy&cover=$cover';
            }
        </>";
    }
?>