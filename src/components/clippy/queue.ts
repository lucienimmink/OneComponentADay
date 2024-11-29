export class Queue {
    private active = false;
    private onEmptyCallback: any;
    private _queue: ((complete: any) => void)[];
    constructor() {
        this._queue = [];
    }
    public createCallback = (onEmptyCallback: any) => {
        this.onEmptyCallback = onEmptyCallback;
    };

    public enqueue(func: (complete: any) => void) {
        this._queue.push(func);

        if (this._queue.length === 1 && !this.active) {
            this.progressQueue();
        }
    }

    public clear = () => {
        this._queue = [];
    };

    private progressQueue = () => {
        if (!this._queue.length) {
            this.onEmptyCallback();
            return;
        }
        const f = this._queue.shift();
        this.active = true;

        const completeFunction = this.next.bind(this);
        if (f) f(completeFunction);
    };

    private next = () => {
        this.active = false;
        this.progressQueue();
    };
}
