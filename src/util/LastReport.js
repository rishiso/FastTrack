export function lastPlaceReport(placeReports) {
    if (placeReports.length == 0) {
        return "N/A";
    }
    const curTime = new Date().getTime();
    const latestReport = placeReports[0];

    if (curTime - latestReport.time <= 3600000) {
        return(Math.floor((curTime - latestReport.time)/60000)  + " min");
    }
    return "N/A";
}

export function recentUserReport(userReports) {
    if (userReports.length == 0) {
        return false;
    }

    const curTime = new Date().getTime();
    const latestReport = userReports[0];

    return (curTime - latestReport.time <= 1800000);
}