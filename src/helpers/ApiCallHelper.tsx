import { fetchFaresParameters,StationInfo } from '../components/MainPage';

const authHeaders = {
    'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
};

export const fetchStations = () => {
    return fetchLNERurl('v1/stations');
};

const getStationId = (station: StationInfo | undefined): string => {
    if (!station) {
        throw new Error('Abort: Station not selected.');
    }
    if (station.crs && station.crs.length > 0) {
        return station.crs;
    } else if (station.nlc && station.nlc.length > 0) {
        return station.nlc;
    } else {
        throw new Error('Abort: Station invalid.');
    }
};

export const fetchFares = (params: fetchFaresParameters) => {
    // const dateTime = '2023-07-13T12:16:27.371Z';
    // const numberOfAdults = 2;
    // const numberOfChildren = 0;
    return fetchLNERurl(
        `v1/fares?originStation=${getStationId(params.departureStation)}&destinationStation=${getStationId(params.destinationStation)}&outboundDateTime=${params.selectedDateTimeString}&numberOfAdults=${params.selectedNumberOfAdults}&numberOfChildren=${params.selectedNumberOfChildren}`,
    );
};

const fetchLNERurl = (subdirectory : string) => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/' + subdirectory, {
        headers : authHeaders,
    });
};
