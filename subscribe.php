<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email address from the form
    $email = $_POST["email"];

    // Validate email (you can add more validation if needed)
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Send email
        $to = "your-email@example.com"; // RDG Travels email address
        $subject = "New subscriber";
        $message = "A new user subscribed to the newsletter: $email";
        $headers = "From: $email";

        // Send email
        mail($to, $subject, $message, $headers);

        // Redirect back to the page or display a success message
        header("Location: thank-you.html");
        exit;
    } else {
        // Handle invalid email address
        echo "Invalid email address";
    }
}
?>