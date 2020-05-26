interface Disposable {
  dispose(): void;
}

export interface Event<T> {
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

declare global {
  export interface INotebookRendererApi<T> {
    setState(value: T): void;
    getState(): T | undefined;
    postMessage(msg: unknown): void;

    /**
     * Fired before an ouput is destroyed, with its cell URI, or undefined if
     * all cells are about to unmount.
     */
    onWillUnmountCell: Event<string | undefined>;

    /**
     * Fired when a cell is mounted.
     */
    onDidMountCell: Event<HTMLElement>;
  }

  function acquireNotebookRendererApi<T = any>(rendererType?: string): INotebookRendererApi<T>;
}
