const noRouteError = (req, res) => {
    res.status(404).send({ msg: '404 Page Not Found' });
};

export default noRouteError;
