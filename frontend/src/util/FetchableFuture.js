import Future from './Future';

export default class FetchableFuture {
    static bind(reactComponentInstance, members) {
        reactComponentInstance.state = Object.entries(members).reduce((memo, [member, initialValue]) => {
            memo[member] = new FetchableFuture(reactComponentInstance, initialValue);
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
        return new Promise(resolve => {
            this.__internals.reactComponentInstance.setState((state) => {
                const future = state[this.__internals.member];
                if (!future || !future instanceof FetchableFuture) {
                    return undefined;
                }

                mutator(future);

                return { [this.__internals.member]: future.clone() };
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

    get error() {
        return this._future.error;
    }

    set error(error) {
        this._future.error = error;
    }

    clone() {
        const instance = new FetchableFuture();
        instance.__internals = { ...this.__internals, future: this.__internals.future.clone() };
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

}
