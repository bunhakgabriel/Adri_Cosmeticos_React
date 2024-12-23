import Typist from "react-typist-component";

const Typerwriter = ({ texto, style }) => {
    return (
        <Typist typingDelay={100}>
            <span style={ style }>{texto}</span>
        </Typist>
    )
}

export default Typerwriter;