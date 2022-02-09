import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }

    // componentDidMount() {
    //     console.log("componentDidMount")
    // }

    // UNSAFE_componentWillMount() {
    //      console.log("componentWillMount")
    // }

    componentDidUpdate() {
        console.log("Actualización");

        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación")

                if (SECURITY_CODE === this.state.value) {
                    this.setState({ error: false, loading: false })
                } else {
                    this.setState({ error: true, loading: false })
                }
                console.log("terminando la validación")
            }, 3000);
        }
    }

    render() {
        //otra forma de llamar a los estados en vez de colocar this.state.value, etc ...
        // const { error, loading, value } = this.state;

        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el p&aacute;rrafo de seguridad.</p>

                {(this.state.error && !this.state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <input
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value });
                    }}
                />
                <button
                    onClick={() =>
                        this.setState({ loading: true })
                    }
                >
                    Comprobar
                </button>
            </div >
        );
    }
}

export { ClassState };