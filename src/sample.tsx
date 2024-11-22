import React = require("react")

type FormProps = {
    disabled: boolean
}

type FormState = {
    name: string
    email: string
}

export class SimpleForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props)
        this.state = { email: "", name: "" }
    }

    render(): React.ReactNode {
        return <form>
            <label>Name</label>
            <input value={this.state.name} />
            <label>E-mail</label>
            <input value={this.state.email} />
            <button>Submit</button>
        </form>
    }
}

export const NumberComponent = (props: { value: number }): React.ReactNode => props.value 
export const StringComponent = (props: { value: string }): React.ReactNode => props.value 
export const BoolComponent = (props: { value: boolean }): React.ReactNode => props.value
export const ArrayComponent = (props: { value: React.ReactNode[] }): React.ReactNode => props.value

export const UndefinedComponent = (): React.ReactNode => undefined
export const NullComponent = (): React.ReactNode => null