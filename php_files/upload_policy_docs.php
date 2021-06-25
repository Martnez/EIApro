<?php 
include "dbcon.php";
	$policy_id = filter_var($_POST['policy_id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
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

        // echo $policy_id;
        // echo $fileName;
		$allowed = array('pdf','png','jpg','jpeg');

		// if (in_array($fileActualExt, $allowed)) {
			if ($fileError === 0) {
				if ($fileSize < 1000000000) {

                    if ($title == "quotation") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/underwriting-documents/quotation/'.$fileNameNew;
                    }else if ($title == "risk_note") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/underwriting-documents/risk-note/'.$fileNameNew;
                    }else if ($title == "dec_form") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/underwriting-documents/dec-form/'.$fileNameNew;
                    }else if ($title == "policy_schedule") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/underwriting-documents/policy-schedule/'.$fileNameNew;
                    }else if ($title == "endorsement") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/underwriting-documents/endorsement/'.$fileNameNew;
                    }else{
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/underwriting-documents/others/'.$fileNameNew;
                    }

                    if (move_uploaded_file($fileTmpName, $file_destination)){

                        if ($title == "policy_other") {
                            $sql_reg = mysqli_query($link, "INSERT INTO policy_documents(doc_name,doc_type,unique_name,policy_id,doc_title) 
                            VALUES('$fileName','$fileActualExt','$fileNameNew','$policy_id','$title')") or die (mysqli_error($link));
                        }else{

                            $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$policy_id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $sql_reg = mysqli_query($link, "UPDATE policy_documents SET doc_name = '$fileName', unique_name = '$fileNameNew', doc_type = '$fileActualExt' WHERE policy_id = '$policy_id' AND doc_title = '$title' ") or die (mysqli_error($link));
                            }else{
                                $sql_reg = mysqli_query($link, "INSERT INTO policy_documents(doc_name,doc_type,unique_name,policy_id,doc_title) 
                                VALUES('$fileName','$fileActualExt','$fileNameNew','$policy_id','$title')") or die (mysqli_error($link));
                            }
                        }

					}
					echo "

					<script>
						window.location = 'policy-documents.php?id=$policy_id&username=$name';
					</script>";
				}else{
					echo "

					<script>
						if (confirm('Sorry but the file is too large...')) {
                            window.location = 'policy-documents.php?id=$policy_id&username=$name';
						}else{
                            window.location = 'policy-documents.php?id=$policy_id&username=$name';
						}
					</script>";
				}
			}else{
				echo "

				<script>
					if (confirm('There was an error uploading the file. Please try again later...')) {
						window.location = 'policy-documents.php?id=$policy_id&username=$name';
					}else{
						window.location = 'policy-documents.php?id=$policy_id&username=$name';
					}
				</script>";
			}

	}else{
			echo "

			<script>
				if (confirm('Image  was not uploaded, Please try again...')) {
					window.location = 'policy-documents.php?id=$policy_id&username=$name';
				}else{
					window.location = 'policy-documents.php?id=$policy_id&username=$name';
				}
			</script>";
    }
?>