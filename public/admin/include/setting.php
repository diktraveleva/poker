<?php
$setting_query = "SELECT * FROM options";
$setting_result = $mysqli->query($setting_query);
$options_row = $setting_result->fetch_assoc();
