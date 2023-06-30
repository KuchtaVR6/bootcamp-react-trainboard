const authHeaders = {
    'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
};

export const fetchStations = () => {
    return fetchLNERurl('v1/stations');
};

export const fetchFares = (originId: string, destinationId: string) => {
    const dateTime = '2023-07-13T12:16:27.371Z';
    const numberOfAdults = 2;
    const numberOfChildren = 0;
    return fetchLNERurl(
        `v1/fares?originStation=${originId}&destinationStation=${destinationId}&outboundDateTime=${dateTime}&numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}`,
    );
};

const fetchLNERurl = (subdirectory : string) => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/' + subdirectory, {
        headers : authHeaders,
    });
};
