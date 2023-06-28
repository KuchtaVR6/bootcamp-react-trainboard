export const fetchStations = () => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};

export const fetchFares = (originId: string, destinationId: string) => {
    const dateTime = '2023-07-13T12:16:27.371Z';
    const numberOfAdults = 2;
    const numberOfChildren = 0;
    return fetch(
        `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${originId}&destinationStation=${destinationId}&outboundDateTime=${dateTime}&numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}` , {
            headers: {
                'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
            },
        });
};
