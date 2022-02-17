import React from "react";

const SECURITY_CODE = 'paradigma';

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const reducerObject = (state, payload) => ({
    'RESET': ({
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }),
    'DELETE': ({
        ...state,
        deleted: true
    }),
    'CONFIRM': ({
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    }),
    'ERROR': {
        ...state,
        error: true,
        loading: false
    },
    'CHECK': {
        ...state,
        loading: true
    },
    'WRITE': {
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

    console.log(state)

    React.useEffect(() => {
        console.log("Empezando el efecto")
        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (state.value === SECURITY_CODE) {
                    dispatch({
                        type: 'CONFIRM',
                    });
                } else {
                    dispatch({
                        type: 'ERROR'
                    });
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
                    onChange={(event) => {
                        dispatch({ type: 'WRITE', payload: event.target.value });
                        // setError(false); otra solución
                        // onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        dispatch({ type: 'CHECK' })
                        // setError(false); Solución para quitar estado de error una vez haya sido mostrado
                        // onCheck();
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. Estas seguro/a </p>
                <button
                    onClick={() => {
                        dispatch({ type: 'DELETE' });
                        // onDelete();
                    }}
                >
                    Eliminar
                </button>
                <button
                    onClick={() => {
                        dispatch({ type: 'RESET' });
                        // onReset();
                    }}
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
                    onClick={() => {
                        dispatch({ type: 'RESET' });
                        // onReset();
                    }}
                >
                    Resetear, volvear atrás
                </button>
            </React.Fragment>
        )
    }
}
export { UseReducer };