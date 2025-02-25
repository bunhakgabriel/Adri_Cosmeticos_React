import Typist from "react-typist-component";

import './Typewriter.css'

const Typerwriter = ({ texto }) => {
    return (
        <Typist typingDelay={100}>
            <span id="text-typewriter">{texto}</span>
        </Typist>
    )
}

export default Typerwriter;