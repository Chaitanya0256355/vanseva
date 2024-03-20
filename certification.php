<?php
// Retrieve form data
$recipient_name = isset($_POST['recipient_name']) ? $_POST['recipient_name'] : '';
$course_name = isset($_POST['course_name']) ? $_POST['course_name'] : '';

// Certificate template
$certificate_content = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
            }

            .certificate {
                border: 1px solid #000;
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
            }

            h2 {
                color: #4caf50;
            }
        </style>
    </head>
    <body>
        <div class='certificate'>
            <h2>Certificate of Completion</h2>
            <p>This is to certify that</p>
            <h3>$recipient_name</h3>
            <p>has successfully completed the course</p>
            <h3>$course_name</h3>
        </div>
    </body>
    </html>
";

// Output the certificate
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="Certificate.pdf"');
echo $certificate_content;
?>
