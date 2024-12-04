import { ApiData, Pending } from "./dataLoaders"

interface DataLoaderProps<T> {
    data: ApiData<T>
    onLoaded: (data: ApiData<T>) => void
    onRetry: () => void
}

export function DataLoader<T>(props: DataLoaderProps<T>) {
    if (props.data.kind == 'idle') return <div className="nothing">Nothing to show yet</div>
    if (props.data.kind == 'pending') {
        props.data.loader().then(data => props.onLoaded(data))
        return <div className="loading"></div>
    }
    if (props.data.kind == 'rejected') return <div className="error">
        {props.data.errorMessage || "Something went wrong..."}
        <button onClick={(props.onRetry)}>Retry</button>
    </div>

    return <></>
}