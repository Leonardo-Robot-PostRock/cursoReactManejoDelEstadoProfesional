import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    console.log(value)

    React.useEffect(() => {
        console.log("Empezando el efecto")
        if (!!loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")
                if (value !== SECURITY_CODE) {
                    setError(true)
                }
                else {
                    setError(false)
                }
                setLoading(false);



                console.log("terminando la validación")
            }, 3000);
        }
        console.log("terminando el efecto")
    }, [loading])

    return (
        <div>
            <h2>Eliminar UseState</h2>
            <p>Por favor escribe el p&aacute;rrafo de seguridad.</p>
            {(error && !loading) && (
                <p>Error: el c&oacute;digo es incorrecto</p>
            )}

            {loading && (
                <p>Cargando...</p>
            )}

            <input
                placeholder="Código de seguridad"
                value={value}
                onChange={(event) => {
                    // setError(false); otra solución
                    setValue(event.target.value)
                }}
            />
            <button
                onClick={() => {
                    // setError(false); Solución para quitar estado de error una vez haya sido mostrado
                    setLoading(true);
                }}
            >Comprobar</button>
        </div>
    );
}

export { UseState };