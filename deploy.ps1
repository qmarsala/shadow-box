$darkpassword = [Environment]::GetEnvironmentVariables("User")["DarkPassword"]
$darkusername = [Environment]::GetEnvironmentVariables("User")["DarkUserName"]
$darkclipath = [Environment]::GetEnvironmentVariables("User")["DarkCliPath"]
$localprojectpath = [Environment]::GetEnvironmentVariables("User")["LocalProjectPath"]
& $darkclipath --canvas qmarsala-shadow-box --password $darkpassword --user $darkusername $localprojectpath