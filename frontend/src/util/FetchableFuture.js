import Future from './Future';

export default class FetchableFuture {
    static bind(reactComponentInstance, members) {
        reactComponentInstance.state = Object.entries(members).reduce((memo, [member, initialValue]) => {
            memo[member] = new FetchableFuture(reactComponentInstance, initialValue, member);
            return memo;
        }, reactComponentInstance.state || {});
    }

    constructor(reactComponentInstance, initialValue, member) {
        this.__internals = {
            reactComponentInstance,
            member,
            future: new Future(initialValue),
            setter() {
                return { [member]: this.clone() };
            },
        };
    }

    async _setState(mutator) {
        const { member } = this.__internals;
        return new Promise(resolve => {
            this.__internals.reactComponentInstance.setState((state) => {
                const future = state[member];
                if (!future || !future instanceof FetchableFuture) {
                    return undefined;
                }

                mutator(future);

                return { [member]: future.clone() };
            }, resolve);
        });
    }

    /**
     * Shortcut to get the current future
     * @return {Future}
     * @private
     */
    get _future() {
        return this.__internals.future;
    }

    get value() {
        return this._future.value;
    }

    set value(value) {
        this._future.value = value;
    }

    get loading() {
        return this._future.loading;
    }

    set loading(loading) {
        this._future.loading = loading;
    }

    get loaded() {
        return this._future.loaded;
    }

    set loaded(loaded) {
        return this._future.loaded = loaded;
    }

    get error() {
        return this._future.error;
    }

    set error(error) {
        this._future.error = error;
    }

    clone() {
        const instance = new FetchableFuture();
        instance.__internals = { ...this.__internals, future: this.__internals.future.clone() };
        return instance;
    }

    async fetch(fetcher) {
        try {
            this._setState(future => {
                future.loading = true;
            });

            const { data } = await (typeof fetcher === 'function' ? fetcher() : fetcher);

            this._setState(future => {
                future.value = data;
            });
        } catch (e) {
            this._setState(future => {
                future.error = e;
            });
        }
    }

    valueOf() {
        return this._future.valueOf();
    }
}
