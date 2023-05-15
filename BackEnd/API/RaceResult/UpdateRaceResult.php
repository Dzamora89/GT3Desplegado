<?php
//Header

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Authorization and Requested with TODO for later on
include_once '../../config/database.php';
include_once '../../Model/RaceResult.php';
include_once '../../Model/ChampionshipEntry.php';
include_once '../../Model/Driver.php';
// Instate the DB and Connection
$database = new Database();
$db = $database->connect();
$driver = new Driver($db);
$championshipEntry = new ChampionshipEntry($db);
$raceResult = new RaceResult($db);


// Get de raw posted data
$raceResult->raceResultCarID = $_POST['raceresultCarID'];
$raceResult->raceresultRaceID = $_POST['raceresultRaceID'];
$raceResult->raceResultDriverID = $_POST['raceResultDriverID'];
$raceResult->raceresultGap = $_POST['raceresultGap'];
$raceResult->raceresultLaps = $_POST['raceresultLaps'];
$raceResult->raceresultPointsScored = $_POST['raceresultPointsScored'];
$raceResult->raceresultEloChanged = $_POST['raceresultEloChanged'];
$raceResult->raceresultPosition = $_POST['raceresultPosition'];
$raceResult->raceResultID = $_POST['raceresultID'];


$championshipEntry->championshipEntryChampionshipID = $_POST['championshipID'];
$championshipEntry->championshipEntryDriverID = $_POST['raceResultDriverID'];

$driver->driverID = $_POST['raceResultDriverID'];




//Create the race
if ($raceResult->updateRaceResult()) {
    echo json_encode(array('message' => 'RaceResult Updated'));
    $championshipEntry->updateTheChampionship($_POST['raceresultPointsScored']);
    $driver->updateElo($_POST['driverELO']);
} else {
    echo json_encode(
        array('message' => 'RaceResult Not Updated')
    );
}