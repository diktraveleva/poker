<?php
// fetch the options row
$options = array();
	$squery = $mysqli->query("SELECT * FROM options ORDER BY id ASC");
	if (@$squery->num_rows == 0) {
		return false;
	} else {
	while ($row = $squery->fetch_assoc()) {
		$options[$row["option_name"]] = $row["option_value"];
	}  
}
