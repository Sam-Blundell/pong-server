const errorNoRoute = (req, res) => {
    res.status(404).send({ msg: '404 Page Not Found' });
};

const errorMethodNotAllowed = (req, res) => {
    res.status(405).send({ msg: '405 Method Not Allowed' });
};

export { errorNoRoute, errorMethodNotAllowed };
