import React from "react";

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: true,
            loading: false,
        };
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el p&aacute;rrafo de seguridad.</p>

                {this.state.error && (
                    <p>Error: el código es incorrecto</p>
                )}

                {this.state.loading &&(
                    <p>Cargando...</p>
                )}

                <input
                    placeholder="Código de seguridad" />
                <button
                    onClick={() => 
                        this.setState(prevState => ({ loading: true}))
                    }
                >
                    Comprobar
                </button>
            </div >
        );
    }
}

export { ClassState };