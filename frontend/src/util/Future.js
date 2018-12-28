export default class Future {
    constructor(value, { loaded = false, loading = false, error = false } = { loaded: false, loading: false, error: false }) {
        this.__internals = { value, loaded, loading, error };
    }

    get value() {
        return this.__internals.value;
    }

    set value(value) {
        this.__internals = {
            value: value,
            loaded: true,
            loading: false,
            error: false,
        };
    }

    get loading() {
        return this.__internals.loading;
    }

    set loading(loading) {
        this.__internals = {
            value: undefined,
            loaded: false,
            loading: loading,
            error: false,
        };
    }

    get loaded() {
        return this.__internals.loaded;
    }

    set loaded(loaded) {
        this.__internals = {
            value: undefined,
            loaded: loaded,
            loading: false,
            error: false,
        };
    }

    get error() {
        return this.__internals.error;
    }

    set error(error) {
        this.__internals = {
            value: undefined,
            loaded: false,
            loading: false,
            error: true,
            errorDetail: error,
        };
    }

    clone() {
        const instance = new Future();
        instance.__internals = { ...this.__internals };
        return instance;
    }

    valueOf() {
        return { ...this.__internals };
    }
}
