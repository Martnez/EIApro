<?php 
include "dbcon.php";
	$claim_id = filter_var($_POST['claim_id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
	$name = filter_var($_POST['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
	$title = filter_var($_POST['title'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);

	if ($_FILES['file']['size'] >0) {

		$file = $_FILES['file'];

		$fileName = $_FILES['file']['name'];
		$fileTmpName = $_FILES['file']['tmp_name'];
		$fileError = $_FILES['file']['error'];
		$fileSize = $_FILES['file']['size'];
		$fileExt = explode('.', $fileName);
		$fileActualExt = strtolower(end($fileExt));

        echo $claim_id;
        echo $fileName;
		$allowed = array('pdf','png','jpg','jpeg');

		// if (in_array($fileActualExt, $allowed)) {
			if ($fileError === 0) {
				if ($fileSize < 1000000000) {

                    if ($title == "policy_abstract") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/policy-abstract/'.$fileNameNew;
                    }else if ($title == "claim_form") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/claim-form/'.$fileNameNew;
                    }else if ($title == "assessment_report") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/assessment-report/'.$fileNameNew;
                    }else if ($title == "dv_ra") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/dv_ra/'.$fileNameNew;
                    }else if ($title == "adjusters_report") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/adjusters-report/'.$fileNameNew;
                    }else if ($title == "dosh_form") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/dosh-form/'.$fileNameNew;
                    }else if ($title == "medical_report") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/medical-report/'.$fileNameNew;
                    }else if ($title == "medical_receipt") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/medical-recepit/'.$fileNameNew;
                    }else{
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/claim-documents/others/'.$fileNameNew;
                    }

                    if (move_uploaded_file($fileTmpName, $file_destination)){

                        if ($title == "claim_other") {
                            $sql_reg = mysqli_query($link, "INSERT INTO claim_documents(doc_name,doc_type,unique_name,claim_id,doc_title) 
                            VALUES('$fileName','$fileActualExt','$fileNameNew','$claim_id','$title')") or die (mysqli_error($link));
                        }else{

                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$claim_id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $sql_reg = mysqli_query($link, "UPDATE claim_documents SET doc_name = '$fileName', unique_name = '$fileNameNew', doc_type = '$fileActualExt' WHERE claim_id = '$claim_id' AND doc_title = '$title' ") or die (mysqli_error($link));
                            }else{
                                $sql_reg = mysqli_query($link, "INSERT INTO claim_documents(doc_name,doc_type,unique_name,claim_id,doc_title) 
                                VALUES('$fileName','$fileActualExt','$fileNameNew','$claim_id','$title')") or die (mysqli_error($link));
                            }
                        }

					}
					echo "

					<script>
						window.location = 'claim-documents.php?id=$claim_id&username=$name';
					</script>";
				}else{
					echo "

					<script>
						if (confirm('Sorry but the file is too large...')) {
                            window.location = 'claim-documents.php?id=$claim_id&username=$name';
						}else{
                            window.location = 'claim-documents.php?id=$claim_id&username=$name';
						}
					</script>";
				}
			}else{
				echo "

				<script>
					if (confirm('There was an error uploading the file. Please try again later...')) {
						window.location = 'claim-documents.php?id=$claim_id&username=$name';
					}else{
						window.location = 'claim-documents.php?id=$claim_id&username=$name';
					}
				</script>";
			}

	}else{
			echo "

			<script>
				if (confirm('Image  was not uploaded, Please try again...')) {
					window.location = 'claim-documents.php?id=$claim_id&username=$name';
				}else{
					window.location = 'claim-documents.php?id=$claim_id&username=$name';
				}
			</script>";
    }
?>