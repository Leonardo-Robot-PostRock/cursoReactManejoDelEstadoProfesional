import React from "react";

const SECURITY_CODE = 'paradigma';

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    delete: 'DELETE',
    reset: 'RESET',
    write: 'WRITE',
    check: 'CHECK'
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: ({
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    }),
    [actionTypes.reset]: ({
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }),
    [actionTypes.delete]: ({
        ...state,
        deleted: true
    }),
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    }
});


const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        dispatch({ type: actionTypes.confirm })
    }

    const onError = () => {
        dispatch({ type: actionTypes.error })
    }

    // const onWrite = (event) => {
    //     dispatch({ type: actionTypes.write, payload: event.target.value })
    // }
    // const onWrite = (target) => {
    //     dispatch({ type: actionTypes.write, payload: target.value })
    // }

    const onWrite = ({ target: { value } }) => {
        dispatch({
            type: actionTypes.write,
            payload: value
        })
    }

    const onCheck = () => {
        dispatch({ type: actionTypes.check })
    }

    const onDelete = () => {
        dispatch({ type: actionTypes.delete })
    }

    const onReset = () => {
        dispatch({ type: actionTypes.reset })
    }

    console.log(state)

    React.useEffect(() => {
        console.log("Empezando el efecto")
        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log("terminando la validación")
            }, 3000);
        }
        console.log("terminando el efecto")
    }, [state.loading]);

    if (!state.confirmed && !state.deleted) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor escribe el p&aacute;rrafo de seguridad.</p>

                {(state.error && !state.loading) && (
                    <p>Error: el c&oacute;digo es incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={onWrite}
                // onChange={(event) => {
                //     onWrite(event.target.value);
                // }}
                />
                <button
                    onClick={onCheck}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. Estas seguro/a </p>
                <button
                    onClick={onDelete}
                >
                    Eliminar
                </button>
                <button
                    onClick={onReset}
                >
                    Volver
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >
                    Resetear, volvear atrás
                </button>
            </React.Fragment>
        )
    }
}
export { UseReducer };