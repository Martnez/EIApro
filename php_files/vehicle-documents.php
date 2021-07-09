<?php include "header.php";?>
<?php include "dbcon.php";?>
<?php

    $id = filter_var($_GET['id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $username = filter_var($_GET['username'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);

?>
  <body>
    <input type="text" id="vehicle_id_holder" value="<?php echo $id;?>" hidden />
    <input type="text" id="username_holder" value="<?php echo $username;?>" hidden />
    <div class="dash-container">
      <div class="hover-hamburger" id="hover_hamburger">
        <div class="inner-hamburger">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <div class="nav-overlay" id="overlay"></div>
      <div class="side-bar" id="side_bar">
        <div class="other-hover-hamburger show" id="other_hover_hamburger">
          <div class="inner-hamburger">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <div class="side-bar-content">
          <div class="top-image-holder dash-img">
            <img src="./images/eia_logo.png" alt="" />
          </div>
          <ul class="links">
            <li class="list">
              <a href="http://192.168.0.34:3000/dashboard" class="link">Home</a>
            </li>
            <li class="list">
              <a href="http://192.168.0.34:3000/clients" class="link">Clients</a>
            </li>
            <li class="list">
              <a href="http://192.168.0.34:3000/underwriting" class="link">Underwriting</a>
            </li>
            <li class="list">
              <a href="http://192.168.0.34:3000/claims" class="link">Claims</a>
            </li>
            <li class="list">
              <a href="http://192.168.0.34:3000/vehicles" class="link active">Vehicles</a>
            </li>
            <li class="list">
              <a href="" class="link">Credit</a>
            </li>
            <li class="list">
              <a href="" class="link">Reports</a>
            </li>
          </ul>
          <ul class="links lower">
            <li class="list">
              <a href="http://192.168.0.34:3000/admin" class="link">Admin</a>
            </li>
            <li class="list">
              <a href="http://192.168.0.34:3000/logout" class="link logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="top-bar">
        <div class="user-name-space">
          <div class="user-icon">
            <div class="image-holder">
              <img src="./images/user-img.png" alt="" />
            </div>
            <h3 class="username-dash">Hello <?php echo $username?></h3>
          </div>
        </div>
      </div>
      <div class="time-bar">
        <h3 id="date_value"></h3>
      </div>
      <div class="dash-main">
        <div class="dash-content">
          <div class="client-profile-content">
            <div class="details-display">
              <div class="top-nav-options">
                <a href="http://192.168.0.34:3000/vehicle-view/<?php echo $id?>" class="nav-options-link"
                  >Vehicle Details</a
                >
                <a href="" class="nav-options-link active"
                  >Image Documents</a
                >
              </div>
              <div class="display-panel">
                <h2 class="data-input-title">Vehicle Documents</h2>
                <div class="documents-content">
                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4>Logbook</h4>
                    </div>
                    <div class="doc-info">
                    <?php
                        $title = "logbook";
                        $sql_class = mysqli_query($link,"SELECT * FROM vehicle_documents WHERE vehicle_id = '$id' AND doc_title = '$title'") or die(mysqli_error($link));
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
 	                        $row2 = mysqli_fetch_array($sql_class);
                    ?>
                        <a href="./documents/vehicle-documents/logbook/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                    <?php  
                        }else{
                    ?>
                        <a href="" class="">document not uploaded</a>
                    <?php
                        }
                    ?>
                    </div>
                    
                    <?php
                        $title = "logbook";
                        $sql_class = mysqli_query($link,"SELECT * FROM vehicle_documents WHERE vehicle_id = '$id' AND doc_title = '$title'") or die(mysqli_error($link));
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
                        ?>    
                          <div class="doc-info options">
                            <a href="./view_vehicle_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                              for="upload_logbook"
                              class="doc-option-links upload2"
                              >Update</label
                            >
                            <input type="file" name="ci_id_fileupload" id="upload_logbook" hidden />
                            <a href="./delete_vehicle.php?vehicle_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                          </div>
                        <?php
                        }else{
                        ?>      
                          <div class="doc-info options">
                            <label
                              for="upload_logbook"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" name="logbook_fileupload" id="upload_logbook" hidden />
                          </div>
                        <?php
                        }
                    ?>
                  </div>
                  <h2 class="title" style="margin-top: 3rem">
                    Other documents
                  </h2>

                  
                <?php
                    $title = "others";
                    $query4 = mysqli_query($link, "SELECT * FROM vehicle_documents WHERE vehicle_id = '$id' AND doc_title = '$title'") or die(mysqli_error($link));
                    while ($row4 = mysqli_fetch_array($query4)) {
                ?>

                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4><?php echo $row4['doc_name'];?></h4>
                    </div>
                    <div class="doc-info">
                    <a href="./documents/vehicle-documents/others/<?php echo $row4['unique_name'];?>" class="doc-link" download><?php echo $row4['doc_name'];?></a>
                    </div>
                    <div class="doc-info options">
                      <a href="./view_vehicle_doc.php?file_name=<?php echo $row4['unique_name'];?>&filetype=<?php echo $row4['doc_type'];?>&title=<?php echo $row4['doc_title'];?>" class="doc-option-links">View</a>
                      <a href="./delete_vehicle.php?vehicle_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row4['doc_title'];?>&unique_index=<?php echo $row4['unique_name'];?>" class="doc-option-links upload">Delete</a>
                    </div>
                  </div>

                  <?php
                    }
                ?>
                  <div class="upload-section-other">
                    <label
                      for="upload_vehicle_other"
                      class="doc-option-links upload other"
                      >Upload</label
                    >
                    <input type="file" id="upload_vehicle_other" hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
        var upload_logbook = document.getElementById('upload_logbook');
        var upload_vehicle_other = document.getElementById('upload_vehicle_other');
        var vehicle_id_holder = document.getElementById('vehicle_id_holder').value;
        var username_holder = document.getElementById('username_holder').value;

        upload_logbook.addEventListener("change", function (){
            var title = "logbook";
            uploadFile(title,upload_logbook);
        });
        
        upload_vehicle_other.addEventListener("change", function (){
            var title = "others";
            uploadFile(title,upload_vehicle_other);
        });

        async function uploadFile(title,file_select) {
            let formData = new FormData(); 
            formData.append("file", file_select.files[0]);
            formData.append("vehicle_id", vehicle_id_holder);
            formData.append("name", username_holder);
            formData.append("title", title);
            await fetch('upload_vehicle_docs.php', {
                method: "POST", 
                body: formData
            }); 

            location.reload();
        }
  </script>
    <script src="./js/time.js"></script>
    <script src="./js/nav.js"></script>
  </body>
</html>
