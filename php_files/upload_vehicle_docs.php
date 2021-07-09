<?php 
include "dbcon.php";
	$vehicle_id = filter_var($_POST['vehicle_id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
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

        // echo $vehicle_id;
        // echo $fileName;
		$allowed = array('pdf','png','jpg','jpeg');

		// if (in_array($fileActualExt, $allowed)) {
			if ($fileError === 0) {
				if ($fileSize < 1000000000) {

                    if ($title == "logbook") {
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/vehicle-documents/logbook/'.$fileNameNew;
                    }else{
                        $fileNameNew = uniqid('',true).".".$fileActualExt;
                        $file_destination = './documents/vehicle-documents/others/'.$fileNameNew;
                    }

                    if (move_uploaded_file($fileTmpName, $file_destination)){

                        if ($title == "others") {
                            $sql_reg = mysqli_query($link, "INSERT INTO vehicle_documents(doc_name,doc_type,unique_name,vehicle_id,doc_title) 
                            VALUES('$fileName','$fileActualExt','$fileNameNew','$vehicle_id','$title')") or die (mysqli_error($link));
                        }else{

                            $sql_class = mysqli_query($link,"SELECT * FROM vehicle_documents WHERE vehicle_id = '$vehicle_id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $sql_reg = mysqli_query($link, "UPDATE vehicle_documents SET doc_name = '$fileName', unique_name = '$fileNameNew', doc_type = '$fileActualExt' WHERE vehicle_id = '$vehicle_id' AND doc_title = '$title' ") or die (mysqli_error($link));
                            }else{
                                $sql_reg = mysqli_query($link, "INSERT INTO vehicle_documents(doc_name,doc_type,unique_name,vehicle_id,doc_title) 
                                VALUES('$fileName','$fileActualExt','$fileNameNew','$vehicle_id','$title')") or die (mysqli_error($link));
                            }
                        }

					}
					echo "

					<script>
						window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
					</script>";
				}else{
					echo "

					<script>
						if (confirm('Sorry but the file is too large...')) {
                            window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
						}else{
                            window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
						}
					</script>";
				}
			}else{
				echo "

				<script>
					if (confirm('There was an error uploading the file. Please try again later...')) {
						window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
					}else{
						window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
					}
				</script>";
			}

	}else{
			echo "

			<script>
				if (confirm('Document  was not uploaded, Please try again...')) {
					window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
				}else{
					window.location = 'vehicle-documents.php?id=$vehicle_id&username=$name';
				}
			</script>";
    }
?>