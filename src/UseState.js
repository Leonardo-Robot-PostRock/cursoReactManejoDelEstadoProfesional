import React from "react";

function UseState({ name }) {
    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log("Empezando el efecto")

        if (!!loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

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
            {error && (
                <p>Error: el c&oacute;digo es incorrecto</p>
            )}
            {loading && (
                <p>Cargando...</p>
            )}

            <input placeholder="Código de seguridad" />
            <button
                onClick={() => setLoading(true)}
            >Comprobar</button>
        </div>
    );
}

export { UseState };