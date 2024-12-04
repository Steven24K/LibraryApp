export type ApiData<T> = {
    kind: "fullfilled",
    data: T
} |
{
    kind: "rejected",
    errorMessage?: string
} |
{
    kind: "pending",
    loader: () => Promise<ApiData<T>>
} | {
    kind: "idle"
}

export const Idle = <T>(): ApiData<T> => ({ kind: 'idle' })
export const Pending = <T>(_loader: () => Promise<ApiData<T>>): ApiData<T> => ({ kind: 'pending', loader: _loader })


export const FullFilled = <T>(v: T): ApiData<T> => ({ kind: 'fullfilled', data: v })
export const Rejected = <T>(msg = ""): ApiData<T> => ({ kind: 'rejected', errorMessage: msg })