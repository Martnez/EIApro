<?php
    $filename = filter_var($_GET['file_name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $filetype = filter_var($_GET['filetype'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $title = filter_var($_GET['title'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);


    if ($title == "policy_abstract") {
        $file = "./documents/claim-documents/policy-abstract/".$filename;
    }else if ($title == "claim_form") {
        $file = "./documents/claim-documents/claim-form/".$filename;
    }else if ($title == "assessment_report") {
        $file = "./documents/claim-documents/assessment-report/".$filename;
    }else if ($title == "dv_ra") {
        $file = "./documents/claim-documents/dv_ra/".$filename;
    }else if ($title == "adjusters_report") {
        $file = "./documents/claim-documents/adjusters-report/".$filename;
    }else if ($title == "dosh_form") {
        $file = "./documents/claim-documents/dosh-form/".$filename;
    }else if ($title == "medical_report") {
        $file = "./documents/claim-documents/medical-report/".$filename;
    }else if ($title == "medical_receipt") {
        $file = "./documents/claim-documents/medical-recepit/".$filename;
    }else{
        $file = "./documents/claim-documents/others/".$filename;
    }


    $file_name = $filename;

        if ($filetype == 'pdf') {
            header('Content-type: application/pdf');
            header('Content-Disposition: inline; filename="' . $file_name . '"');
            header('Content-Transfer-Encoding: binary');
            header('Content-Length: ' . filesize($file));
            header('Accept-Ranges: bytes');
        
            @readfile($file);
        }else{
            $im = file_get_contents($file);
            header("Content-type: image/jpeg");
            echo $im;
        }
?>