<?php

if($_POST["submit"]) {
    $recipient="bokifrog@gmail.com";
    $subject="Form to email message";
    $sender=$_POST["sender"];
    $senderEmail=$_POST["senderEmail"];
    $message=$_POST["message"];

    $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

    mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

    $thankYou="<p>Thank you! Your message has been sent.</p>";
}

?><!DOCTYPE html>

<html>
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="css/bokiHomePage.css">

<style>
textarea {
  display : block;

  padding : 10px;
  margin  : 10px 0 0 -10px;
  width   : 440px;
  height  : 460px;

  resize  : none;
  overflow: auto;
}
</style>

<head>
    <meta charset="utf-8">
    <title>Contact form to email</title>
</head>

<body>

    <?=$thankYou ?>
	
	<center>
	  <p>Let's get in touch to discuss your next project.</p>
	  <form method="post" action="contact.php">
	    <input class="input section border" type="text" placeholder="Name" required name="sender">
        <input class="input section border" type="text" placeholder="Email" required name="senderEmail">
		<label for="msg">Your message:</label>
		<textarea id="msg" required name="message"></textarea>
        <input type="submit" value="Send">
	    <input type="reset" value="Reset">
      </form>
	</center>

</body>

</html>