<?php
    $filename = filter_var($_GET['file_name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $filetype = filter_var($_GET['filetype'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $title = filter_var($_GET['title'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);


    if ($title == "ci_id") {
        $file = "./documents/client-documents/ci_id/".$filename;
    }else if ($title == "pin_cert") {
        $file = "./documents/client-documents/pin_certificate/".$filename;
    }else{
        $file = "./documents/client-documents/others/".$filename;
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