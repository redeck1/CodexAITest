export const requestLogger = (req, res, next) => {
    res.on("finish", () => {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
        const url = decodeURIComponent(req.url);

        const logData = `${time} ${req.method} ${url} -> ${res.statusCode} ${
            res.statusMessage || ""
        }`;
        console.log(logData);
    });

    next();
};
