<?php include "header.php";?>
<?php include "dbcon.php";?>
<?php

    $id = filter_var($_GET['id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $username = filter_var($_GET['username'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
?>
  <body>
  <input type="text" id="policy_id_holder" value="<?php echo $id;?>" hidden />
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
              <a href="http://192.168.0.34:3000/underwriting" class="link active">Underwriting</a>
            </li>
            <li class="list">
              <a href="http://192.168.0.34:3000/claims" class="link">Claims</a>
            </li>
            <li class="list">
              <a href="http://192.168.0.34:3000/vehicles" class="link">Vehicles</a>
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
                <a href="http://192.168.0.34:3000/policyView/<?php echo $id?>" class="nav-options-link"
                  >Policy Details</a
                >
                <a href="" class="nav-options-link active"
                  >Image Documents</a
                >
                <a href="http://192.168.0.34:3000/credit/<?php echo $id?>" class="nav-options-link"
                  >Credit Collection</a
                >
                <a href="http://192.168.0.34:3000/insurancePay/<?php echo $id?>" class="nav-options-link"
                  >Insurance Payment</a
                >
              </div>
              <div class="display-panel">
                <h2 class="data-input-title">Underwriting Documents</h2>
                <div class="documents-content">
                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4>Quotation</h4>
                    </div>
                    <div class="doc-info">
                    <?php
                        $title = "quotation";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
 	                        $row2 = mysqli_fetch_array($sql_class);
                           $file_location = "quotation";
                   ?>
                       <a href="./documents/underwriting-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                    <?php  
                        }else{
                    ?>
                        <a href="" class="">document not uploaded</a>
                    <?php
                        }
                    ?>
                    </div>
                    <?php
                        $title = "quotation";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
                        ?>
                          <div class="doc-info options">
                            <a href="./view_policy_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                              for="upload_quotation"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_quotation" hidden />
                            <a href="./delete_policy.php?policy_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                          </div>
                        <?php
                        }else{
                        ?>
                          <div class="doc-info options">
                            <label
                              for="upload_quotation"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_quotation" hidden />
                          </div>
                        <?php
                        }
                    ?>
                  </div>
                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4>Risk Note</h4>
                    </div>
                    <div class="doc-info">
                    <?php
                        $title = "risk_note";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
 	                        $row2 = mysqli_fetch_array($sql_class);
                           $file_location = "risk-note";
                   ?>
                       <a href="./documents/underwriting-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                    <?php  
                        }else{
                    ?>
                        <a href="" class="">document not uploaded</a>
                    <?php
                        }
                    ?>
                    </div>
                    
                    <?php
                        $title = "risk_note";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
                        ?>
                          <div class="doc-info options">
                            <a href="./view_policy_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                              for="upload_risk_note"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_risk_note" hidden />
                            <a href="./delete_policy.php?policy_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                          </div>
                        <?php
                        }else{
                        ?>
                          <div class="doc-info options">
                            <label
                              for="upload_risk_note"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_risk_note" hidden />
                          </div>
                        <?php
                        }
                    ?>
                  </div>
                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4>Declaration Form</h4>
                    </div>
                    <div class="doc-info">
                    <?php
                        $title = "dec_form";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
                            $row3 = mysqli_fetch_array($sql_class);
                            $file_location = "dec-form";
                    ?>
                        <a href="./documents/underwriting-documents/<?php echo $file_location;?>/<?php echo $row3['unique_name'];?>" class="doc-link" download><?php echo $row3['doc_name'];?></a>
                    <?php  
                        }else{
                    ?>
                        <a href="" class="">document not uploaded</a>
                    <?php
                        }
                    ?>
                    </div>
                    
                    <?php
                        $title = "dec_form";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
                        ?>
                          <div class="doc-info options">
                            <a href="./view_policy_doc.php?file_name=<?php echo $row3['unique_name'];?>&filetype=<?php echo $row3['doc_type'];?>&title=<?php echo $row3['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                              for="upload_dec_form"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_dec_form" hidden />
                            <a href="./delete_policy.php?policy_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row3['doc_title'];?>&unique_index=<?php echo $row3['unique_name'];?>" class="doc-option-links upload">Delete</a>
                          </div>
                        <?php
                        }else{
                        ?>
                          <div class="doc-info options">
                            <label
                              for="upload_dec_form"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_dec_form" hidden />
                          </div>
                        <?php
                        }
                    ?>
                  </div>
                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4>Policy Schedule</h4>
                    </div>
                    <div class="doc-info">
                    <?php
                        $title = "policy_schedule";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
 	                        $row2 = mysqli_fetch_array($sql_class);
                           $file_location = "policy-schedule";
                   ?>
                       <a href="./documents/underwriting-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                    <?php  
                        }else{
                    ?>
                        <a href="" class="">document not uploaded</a>
                    <?php
                        }
                    ?>
                    </div>
                    
                    <?php
                        $title = "policy_schedule";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match2 = mysqli_num_rows($sql_class);
                    
                        if ($data_match2 > 0) {
                        ?>
                          <div class="doc-info options">
                            <a href="./view_policy_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                              for="upload_policy_schedule"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_policy_schedule" hidden />
                            <a href="./delete_policy.php?policy_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                          </div>
                        <?php
                        }else{
                        ?>
                          <div class="doc-info options">
                            <label
                              for="upload_policy_schedule"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_policy_schedule" hidden />
                          </div>
                        <?php
                        }
                    ?>
                  </div>
                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4>Endorsement</h4>
                    </div>
                    <div class="doc-info">
                    <?php
                        $title = "endorsement";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
 	                        $row2 = mysqli_fetch_array($sql_class);
                           $file_location = "endorsement";
                   ?>
                       <a href="./documents/underwriting-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                    <?php  
                        }else{
                    ?>
                        <a href="" class="">document not uploaded</a>
                    <?php
                        }
                    ?>
                    </div>
                    <?php
                        $title = "endorsement";
                        $sql_class = mysqli_query($link,"SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'");
                        $data_match = mysqli_num_rows($sql_class);
                    
                        if ($data_match > 0) {
                        ?>
                          <div class="doc-info options">
                            <a href="./view_policy_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                              for="upload_endorsement"
                              class="doc-option-links upload2"
                              >Upload</label
                            >
                            <input type="file" id="upload_endorsement" hidden />
                            <a href="./delete_policy.php?policy_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                          </div>
                        <?php
                        }else{
                        ?>
                        <div class="doc-info options">
                          <label
                            for="upload_endorsement"
                            class="doc-option-links upload2"
                            >Update</label
                          >
                          <input type="file" id="upload_endorsement" hidden />
                        </div>
                        <?php
                        }
                    ?>
                  </div>
                  <h2 class="title" style="margin-top: 3rem">
                    Other documents
                  </h2>

                  
                <?php
                    $title = "policy_other";
                    $query4 = mysqli_query($link, "SELECT * FROM policy_documents WHERE policy_id = '$id' AND doc_title = '$title'") or die(mysqli_error($link));
                    while ($row4 = mysqli_fetch_array($query4)) {
                ?>

                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4><?php echo $row4['doc_name'];?></h4>
                    </div>
                    <div class="doc-info">
                    <a href="./documents/underwriting-documents/others/<?php echo $row4['unique_name'];?>" class="doc-link" download><?php echo $row4['doc_name'];?></a>
                    </div>
                    <div class="doc-info options">
                      <a href="./view_policy_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                      <a href="./delete_policy.php?policy_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row4['doc_title'];?>&unique_index=<?php echo $row4['unique_name'];?>" class="doc-option-links upload">Delete</a>
                    </div>
                  </div>

                  <?php
                    }
                ?>
                  <div class="upload-section-other">
                    <label
                      for="upload_policy_other"
                      class="doc-option-links upload other"
                      >Upload</label
                    >
                    <input type="file" id="upload_policy_other" hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
        var upload_quotation = document.getElementById('upload_quotation');
        var upload_risk_note = document.getElementById('upload_risk_note');
        var upload_dec_form = document.getElementById('upload_dec_form');
        var upload_policy_schedule = document.getElementById('upload_policy_schedule');
        var upload_endorsement = document.getElementById('upload_endorsement');
        var upload_policy_other = document.getElementById('upload_policy_other');
        var policy_id_holder = document.getElementById('policy_id_holder').value;
        var username_holder = document.getElementById('username_holder').value;

        upload_quotation.addEventListener("change", function (){
            var title = "quotation";
            uploadFile(title,upload_quotation);
        });
        upload_risk_note.addEventListener("change", function (){
            var title = "risk_note";
            uploadFile(title,upload_risk_note);
        });
        upload_dec_form.addEventListener("change", function (){
            var title = "dec_form";
            uploadFile(title,upload_dec_form);
        });
        upload_policy_schedule.addEventListener("change", function (){
            var title = "policy_schedule";
            uploadFile(title,upload_policy_schedule);
        });
        upload_endorsement.addEventListener("change", function (){
            var title = "endorsement";
            uploadFile(title,upload_endorsement);
        });
        upload_policy_other.addEventListener("change", function (){
            var title = "policy_other";
            uploadFile(title,upload_policy_other);
        });

        async function uploadFile(title,file_select) {
            let formData = new FormData(); 
            formData.append("file", file_select.files[0]);
            formData.append("policy_id", policy_id_holder);
            formData.append("name", username_holder);
            formData.append("title", title);
            await fetch('upload_policy_docs.php', {
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
