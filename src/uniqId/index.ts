const uniqIdPlugin = {
    install(app) {
        app.config.globalProperties.uniqId = function() {
            if (this._uid !== undefined) {
                return this._uid;
            }
            throw new Error("_uid property does not exist");
        };
    }
};

export default uniqIdPlugin;