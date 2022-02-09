import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    console.log(state.value)

    React.useEffect(() => {
        console.log("Empezando el efecto")
        if (!!state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        loading: false,
                        error: false,
                        confirmed: true,
                    });
                } else {
                    setState({
                        ...state,
                        error: true,
                        loading: false,
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
                        // setError(false); otra solución
                        setState({
                            ...state,
                            value: event.target.value,
                        })
                    }}
                />
                <button
                    onClick={() => {
                        // setError(false); Solución para quitar estado de error una vez haya sido mostrado
                        setState({
                            ...state,
                            loading: true,
                        });
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
                        setState({
                            ...state,
                            deleted: true,
                        })
                    }}
                >
                    Eliminar
                </button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            value: '',
                        })
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
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: '',
                        })
                    }}
                >
                    Resetear, volvear atrás
                </button>
            </React.Fragment>
        )
    }
}

export { UseState };