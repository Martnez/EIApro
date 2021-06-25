<?php include "header.php";?>
<?php include "dbcon.php";?>
<?php

    $id = filter_var($_GET['id'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $username = filter_var($_GET['username'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $policy = filter_var($_GET['policy'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $cover = filter_var($_GET['cover'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
?>
  <body>
    <input type="text" id="claim_id_holder" value="<?php echo $id;?>" hidden />
    <input type="text" id="username_id_holder" value="<?php echo $username;?>" hidden />
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
              <a href="http://192.168.0.34:3000/claims" class="link active">Claims</a>
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
                <a href="http://192.168.0.34:3000/claim-view/<?php echo $id?>" class="nav-options-link"
                  >Claim Details</a
                >
                <a href="" class="nav-options-link active"
                  >Image Documents</a
                >
              </div>
              <div class="display-panel">
                <h2 class="data-input-title">Claim Documents</h2>
                <div class="documents-content">
                    
                <?php 
                    if ($policy == "Motor vehicles") {
                ?>
                    <div class="documents-holder">
                        <div class="doc-info">
                            <h4>Policy Abstract</h4>
                        </div>
                        <div class="doc-info">
                        <?php
                            $title = "policy_abstract";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                                $file_location = "policy-abstract"
                        ?>
                        <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                        <?php  
                            }else{
                        ?>
                            <a href="" class="">document not uploaded</a>
                        <?php
                            }
                        ?>
                        </div>
                        
                        <?php
                            $title = "policy_abstract";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                        ?>
                        <div class="doc-info options">
                            <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                            for="upload_policy_abstract"
                            class="doc-option-links upload2"
                            >Update</label
                            >
                            <input type="file" id="upload_policy_abstract" hidden />
                            <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                        </div>
                        <?php  
                            }else{
                        ?>
                        <div class="doc-info options">
                            
                            <label
                            for="upload_policy_abstract"
                            class="doc-option-links upload2"
                            >Upload</label
                            >
                            <input type="file" id="upload_policy_abstract" hidden />
                            
                        </div>
                        <?php
                            }
                        ?>
                    </div>

                    <div class="documents-holder">
                        <div class="doc-info">
                            <h4>Claim Form</h4>
                        </div>
                        <div class="doc-info">
                        <?php
                            $title = "claim_form";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                                $file_location = "claim-form";
                        ?>
                            <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                        <?php  
                            }else{
                        ?>
                            <a href="" class="">document not uploaded</a>
                        <?php
                            }
                        ?>
                        </div>
                        
                        <?php
                            $title = "claim_form";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                        ?>
                        <div class="doc-info options">
                            <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                            for="upload_claim_form"
                            class="doc-option-links upload2"
                            >Update</label
                            >
                            <input type="file" id="upload_claim_form" hidden />
                            <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                        </div>
                        <?php  
                            }else{
                        ?>
                        <div class="doc-info options">
                            
                            <label
                            for="upload_claim_form"
                            class="doc-option-links upload2"
                            >Upload</label
                            >
                            <input type="file" id="upload_claim_form" hidden />
                            
                        </div>
                        <?php
                            }
                        ?>
                    </div>
                    <div class="documents-holder">
                        <div class="doc-info">
                            <h4>Assessment Report</h4>
                        </div>
                        <div class="doc-info">
                        <?php
                            $title = "assessment_report";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                                $file_location = "assessment-report";
                        ?>
                            <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                        <?php  
                            }else{
                        ?>
                            <a href="" class="">document not uploaded</a>
                        <?php
                            }
                        ?>
                        </div>
                        
                        <?php
                            $title = "assessment_report";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                        ?>
                        <div class="doc-info options">
                            <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                            for="upload_assessment_report"
                            class="doc-option-links upload2"
                            >Update</label
                            >
                            <input type="file" id="upload_assessment_report" hidden />
                            <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                        </div>
                        <?php  
                            }else{
                        ?>
                        <div class="doc-info options">
                            <label
                            for="upload_assessment_report"
                            class="doc-option-links upload2"
                            >Upload</label
                            >
                            <input type="file" id="upload_assessment_report" hidden />
                            
                        </div>
                        <?php
                            }
                        ?>
                        </div>
                    <div class="documents-holder">
                        <div class="doc-info">
                            <h4>D.V. / R.A.</h4>
                        </div>
                        <div class="doc-info">
                        <?php
                            $title = "dv_ra";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                                $file_location = "dv_ra";
                        ?>
                            <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                        <?php  
                            }else{
                        ?>
                            <a href="" class="">document not uploaded</a>
                        <?php
                            }
                        ?>
                        </div>
                        
                        <?php
                            $title = "dv_ra";
                            $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                            $data_match = mysqli_num_rows($sql_class);
                        
                            if ($data_match > 0) {
                                $row2 = mysqli_fetch_array($sql_class);
                        ?>
                        <div class="doc-info options">
                            <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                            <label
                            for="upload_dv_ra"
                            class="doc-option-links upload2"
                            >Update</label
                            >
                            <input type="file" id="upload_dv_ra" hidden />
                            <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                        </div>
                        <?php  
                            }else{
                        ?>
                        <div class="doc-info options">
                            <label
                            for="upload_dv_ra"
                            class="doc-option-links upload2"
                            >Upload</label
                            >
                            <input type="file" id="upload_dv_ra" hidden />
                            
                        </div>
                        <?php
                            }
                        ?>
                        </div>
                <?php
                    }else{
                        if ($cover == "Work Injury Benefit") {
                        ?>
                        <div class="documents-holder">
                            <div class="doc-info">
                                <h4>Claim Form</h4>
                            </div>
                            <div class="doc-info">
                            <?php
                                $title = "claim_form";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                                    $file_location = "claim-form";
                            ?>
                                <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                            <?php  
                                }else{
                            ?>
                                <a href="" class="">document not uploaded</a>
                            <?php
                                }
                            ?>
                            </div>
                            
                            <?php
                                $title = "claim_form";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                            ?>
                            <div class="doc-info options">
                                <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                                <label
                                for="upload_claim_form"
                                class="doc-option-links upload2"
                                >Update</label
                                >
                                <input type="file" id="upload_claim_form" hidden />
                                <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                            </div>
                            <?php  
                                }else{
                            ?>
                            <div class="doc-info options">
                                
                                <label
                                for="upload_claim_form"
                                class="doc-option-links upload2"
                                >Upload</label
                                >
                                <input type="file" id="upload_claim_form" hidden />
                                
                            </div>
                            <?php
                                }
                            ?>
                        </div>
                        <div class="documents-holder">
                            <div class="doc-info">
                                <h4>D.V. Document</h4>
                            </div>
                            <div class="doc-info">
                            <?php
                                $title = "dv_ra";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                                    $file_location = "dv_ra";
                            ?>
                                <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                            <?php  
                                }else{
                            ?>
                                <a href="" class="">document not uploaded</a>
                            <?php
                                }
                            ?>
                            </div>
                            
                            <?php
                                $title = "dv_ra";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                            ?>
                            <div class="doc-info options">
                                <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                                <label
                                for="upload_dv_ra"
                                class="doc-option-links upload2"
                                >Update</label
                                >
                                <input type="file" id="upload_dv_ra" hidden />
                                <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                            </div>
                            <?php  
                                }else{
                            ?>
                            <div class="doc-info options">
                                
                                <label
                                for="upload_dv_ra"
                                class="doc-option-links upload2"
                                >Upload</label
                                >
                                <input type="file" id="upload_dv_ra" hidden />
                                
                            </div>
                            <?php
                                }
                            ?>
                        </div>
                        <div class="documents-holder">
                            <div class="doc-info">
                                <h4>Dosh Form</h4>
                            </div>
                            <div class="doc-info">
                            <?php
                                $title = "dosh_form";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                                    $file_location = "dosh-form";
                            ?>
                                <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                            <?php  
                                }else{
                            ?>
                                <a href="" class="">document not uploaded</a>
                            <?php
                                }
                            ?>
                            </div>
                            
                            <?php
                                $title = "dosh_form";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                            ?>
                            <div class="doc-info options">
                                <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                                <label
                                for="upload_dosh_form"
                                class="doc-option-links upload2"
                                >Update</label
                                >
                                <input type="file" id="upload_dosh_form" hidden />
                                <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                            </div>
                            <?php  
                                }else{
                            ?>
                            <div class="doc-info options">
                                
                                <label
                                for="upload_dosh_form"
                                class="doc-option-links upload2"
                                >Upload</label
                                >
                                <input type="file" id="upload_dosh_form" hidden />
                                
                            </div>
                            <?php
                                }
                            ?>
                        </div>
                        <div class="documents-holder">
                            <div class="doc-info">
                                <h4>Medical Report</h4>
                            </div>
                            <div class="doc-info">
                            <?php
                                $title = "medical_report";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                                    $file_location = "medical-report";
                            ?>
                                <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                            <?php  
                                }else{
                            ?>
                                <a href="" class="">document not uploaded</a>
                            <?php
                                }
                            ?>
                            </div>
                            
                            <?php
                                $title = "medical_report";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                            ?>
                            <div class="doc-info options">
                                <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                                <label
                                for="upload_medical_report"
                                class="doc-option-links upload2"
                                >Update</label
                                >
                                <input type="file" id="upload_medical_report" hidden />
                                <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                            </div>
                            <?php  
                                }else{
                            ?>
                            <div class="doc-info options">
                                
                                <label
                                for="upload_medical_report"
                                class="doc-option-links upload2"
                                >Upload</label
                                >
                                <input type="file" id="upload_medical_report" hidden />
                                
                            </div>
                            <?php
                                }
                            ?>
                        </div>
                        <div class="documents-holder">
                            <div class="doc-info">
                                <h4>Medical Receipts</h4>
                            </div>
                            <div class="doc-info">
                            <?php
                                $title = "medical_receipt";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                                    $file_location = "medical-receipt";
                            ?>
                                <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                            <?php  
                                }else{
                            ?>
                                <a href="" class="">document not uploaded</a>
                            <?php
                                }
                            ?>
                            </div>
                            
                            <?php
                                $title = "medical_receipt";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                            ?>
                            <div class="doc-info options">
                                <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                                <label
                                for="upload_medical_receipt"
                                class="doc-option-links upload2"
                                >Update</label
                                >
                                <input type="file" id="upload_medical_receipt" hidden />
                                <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                            </div>
                            <?php  
                                }else{
                            ?>
                            <div class="doc-info options">
                                
                                <label
                                for="upload_medical_receipt"
                                class="doc-option-links upload2"
                                >Upload</label
                                >
                                <input type="file" id="upload_medical_receipt" hidden />
                                
                            </div>
                            <?php
                                }
                            ?>
                        </div>
                        <?php
                        }else{
                        ?>
                        <div class="documents-holder">
                            <div class="doc-info">
                                <h4>Claim Form</h4>
                            </div>
                            <div class="doc-info">
                            <?php
                                $title = "claim_form";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                                    $file_location = "claim-form";
                            ?>
                                <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                            <?php  
                                }else{
                            ?>
                                <a href="" class="">document not uploaded</a>
                            <?php
                                }
                            ?>
                            </div>
                            
                            <?php
                                $title = "claim_form";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                            ?>
                            <div class="doc-info options">
                                <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                                <label
                                for="upload_claim_form"
                                class="doc-option-links upload2"
                                >Update</label
                                >
                                <input type="file" id="upload_claim_form" hidden />
                                <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                            </div>
                            <?php  
                                }else{
                            ?>
                            <div class="doc-info options">
                                
                                <label
                                for="upload_claim_form"
                                class="doc-option-links upload2"
                                >Upload</label
                                >
                                <input type="file" id="upload_claim_form" hidden />
                                
                            </div>
                            <?php
                                }
                            ?>
                        </div>
                        <div class="documents-holder">
                            <div class="doc-info">
                                <h4>Adjuster's Report</h4>
                            </div>
                            <div class="doc-info">
                            <?php
                                $title = "adjusters_report";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                                    $file_location = "adjusters-report";
                            ?>
                                <a href="./documents/claim-documents/<?php echo $file_location;?>/<?php echo $row2['unique_name'];?>" class="doc-link" download><?php echo $row2['doc_name'];?></a>
                            <?php  
                                }else{
                            ?>
                                <a href="" class="">document not uploaded</a>
                            <?php
                                }
                            ?>
                            </div>
                            
                            <?php
                                $title = "adjusters_report";
                                $sql_class = mysqli_query($link,"SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'");
                                $data_match = mysqli_num_rows($sql_class);
                            
                                if ($data_match > 0) {
                                    $row2 = mysqli_fetch_array($sql_class);
                            ?>
                            <div class="doc-info options">
                                <a href="./view_claim_doc.php?file_name=<?php echo $row2['unique_name'];?>&filetype=<?php echo $row2['doc_type'];?>&title=<?php echo $row2['doc_title'];?>" class="doc-option-links">View</a>
                                <label
                                for="upload_adjusters_report"
                                class="doc-option-links upload2"
                                >Update</label
                                >
                                <input type="file" id="upload_adjusters_report" hidden />
                                <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row2['doc_title'];?>&unique_index=<?php echo $row2['unique_name'];?>" class="doc-option-links upload">Delete</a>
                            </div>
                            <?php  
                                }else{
                            ?>
                            <div class="doc-info options">
                                
                                <label
                                for="upload_adjusters_report"
                                class="doc-option-links upload2"
                                >Upload</label
                                >
                                <input type="file" id="upload_adjusters_report" hidden />
                                
                        </div>
                        <?php
                            }
                        ?>
                        </div>

                        <?php
                        }
                    }
                ?>
                  
                  
                  <h2 class="title" style="margin-top: 3rem">
                    Other documents
                  </h2>
                  
                <?php
                    $title = "claim_other";
                    $query4 = mysqli_query($link, "SELECT * FROM claim_documents WHERE claim_id = '$id' AND doc_title = '$title'") or die(mysqli_error($link));
                    while ($row4 = mysqli_fetch_array($query4)) {
                ?>

                  <div class="documents-holder">
                    <div class="doc-info">
                      <h4><?php echo $row4['doc_name'];?></h4>
                    </div>
                    <div class="doc-info">
                    <a href="./documents/claim-documents/others/<?php echo $row4['unique_name'];?>" class="doc-link" download><?php echo $row4['doc_name'];?></a>
                    </div>
                    <div class="doc-info options">
                      <a href="./view_claim_doc.php?file_name=<?php echo $row4['unique_name'];?>&filetype=<?php echo $row4['doc_type'];?>&title=<?php echo $row4['doc_title'];?>" class="doc-option-links">View</a>
                      <a href="./delete_claim.php?policy=<?php echo $policy;?>&cover=<?php echo $cover;?>&claim_id=<?php echo $id;?>&name=<?php echo $username;?>&title=<?php echo $row4['doc_title'];?>&unique_index=<?php echo $row4['unique_name'];?>" class="doc-option-links upload">Delete</a>
                    </div>
                  </div>

                  <?php
                    }
                ?>
                  <div class="upload-section-other">
                    <label
                      for="upload_claim_other"
                      class="doc-option-links upload other"
                      >Upload</label
                    >
                    <input type="file" id="upload_claim_other" hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
        //CLaim Motor Documents
        var upload_policy_abstract = document.getElementById('upload_policy_abstract');
        var upload_claim_form = document.getElementById('upload_claim_form');
        var upload_assessment_report = document.getElementById('upload_assessment_report');
        var upload_dv_ra = document.getElementById('upload_dv_ra');
        var upload_claim_other = document.getElementById('upload_claim_other');
        var upload_claim_other = document.getElementById('upload_claim_other');

        //Claim Non-Motor Documents
        var upload_adjusters_report = document.getElementById('upload_adjusters_report');
        var upload_dosh_form = document.getElementById('upload_dosh_form');
        var upload_medical_report = document.getElementById('upload_medical_report');
        var upload_medical_receipt = document.getElementById('upload_medical_receipt');

        //Other valuations
        var claim_id_holder = document.getElementById('claim_id_holder').value;
        var username_id_holder = document.getElementById('username_id_holder').value;

        if (upload_policy_abstract != null) { 
            upload_policy_abstract.addEventListener("change", function (){
                var title = "policy_abstract";
                uploadFile(title,upload_policy_abstract);
            });
        }


        if (upload_claim_form != null){
            upload_claim_form.addEventListener("change", function (){
                var title = "claim_form";
                uploadFile(title,upload_claim_form);
            });
        }
        
        if (upload_assessment_report != null){
            upload_assessment_report.addEventListener("change", function (){
                var title = "assessment_report";
                uploadFile(title,upload_assessment_report);
            });
        }

        if (upload_dv_ra != null){
            upload_dv_ra.addEventListener("change", function (){
                var title = "dv_ra";
                uploadFile(title,upload_dv_ra);
            });
        }
        
        if (upload_claim_other != null){
            upload_claim_other.addEventListener("change", function (){
                var title = "claim_other";
                uploadFile(title,upload_claim_other);
            });
        }

        /// Non Motor Event Listeners
        if (upload_dosh_form != null){
            upload_dosh_form.addEventListener("change", function (){
                var title = "dosh_form";
                uploadFile(title,upload_dosh_form);
            });
        }

        if (upload_medical_report != null){
            upload_medical_report.addEventListener("change", function (){
                var title = "medical_report";
                uploadFile(title,upload_medical_report);
            });
        }

        if (upload_medical_receipt != null){
            upload_medical_receipt.addEventListener("change", function (){
                var title = "medical_receipt";
                uploadFile(title,upload_medical_receipt);
            });
        }
        

        async function uploadFile(title,file_select) {
            let formData = new FormData(); 
            formData.append("file", file_select.files[0]);
            formData.append("claim_id", claim_id_holder);
            formData.append("name", username_id_holder);
            formData.append("title", title);
            await fetch('upload_claim_docs.php', {
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
