import React, { Component } from 'react'
const storeContext = React.createContext({})
interface PropsState {
    [propName: string]: any
}
interface Props {
    store: {
        state: PropsState,
        mutations: {
            [propName: string]: (state: PropsState, rest: any) => PropsState
        },
        actions: {
            [propName: string]: (context: Props, ...rest: any[]) => PropsState
        }
    },
    [propName: string]: any
}
export class Provider extends Component<Props, PropsState> {
    constructor(props: Props) {
        super(props)
        this.state = this.props.store.state
    }
    commit = (eventName: string, payload: any): void => {
        const func = this.props.store.mutations[eventName](this.state, payload)
        this.setState(func)
    }
    dispatch = (eventName: string, payload: any) => {
    }
    render() {
        return (
            <storeContext.Provider value={{
                state: this.state,
                $commit: this.commit,
                $dispatch: this.dispatch
            }
            }>
                {this.props.children}
            </storeContext.Provider>
        )
    }
}
export const withStore = (Com: any) =>
    React.forwardRef((props: any, ref: any) =>
        <storeContext.Consumer>{
            (storeValue) => <Com {...storeValue} {...props} ref={ref} />
        }
        </storeContext.Consumer>
)




