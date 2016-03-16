<?php
require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => '702969809659629569-yiNcJT7TZtoGPrwaINGxTXbHnk9xIc7',
    'oauth_access_token_secret' => 'cz0NWKJ74luIeIuU7qlVJSzXUI5Yg1hpOa71vdqSDdIHj',
    'consumer_key' => 'bBl5FCvE2xB6iImeweCV2qpVg',
    'consumer_secret' => 'rfdkO2oeus43JOsYvQCmxKuPiFSFTvb9MJtzmeNhVETgHtkDSz'
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";

$query = '?q=';
if(isset($_GET['q']) && $_GET['q']!='' ) {

    $query .= $_GET['q'];

} else {
    $query .= 'something';
}

//echo $query;
$twitter = new TwitterAPIExchange($settings);
$results = $twitter->setGetfield($query)->buildOauth($url, $requestMethod)->performRequest();
echo $results;
?>
