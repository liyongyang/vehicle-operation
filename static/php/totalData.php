<?php
$con = mysql_connect("101.200.44.68", "root", "fyl123456");
mysql_select_db("operation");
$str = $_GET[vehicle_id];
// echo "vehicle_id";
$vehicle_id = preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2','UTF-8', pack('H4', '\\1'))", $str);
$sql = ("select * from total where vehicle_id = '$vehicle_id' ORDER BY `day`");
$r = mysql_query($sql);
$arr = array(); //开始转换
while ($row = mysql_fetch_assoc($r)) {
  $arr[] = $row;
}
echo json_encode(array("total" => $arr));
mysql_close($con);
