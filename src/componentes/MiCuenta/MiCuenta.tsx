import {Navbar} from "../nav-bar/Navbar";
import type {Theme} from "../../types/types";

interface Props {
    theme: Theme;
    onToggle: () => void;
}

export function MiCuenta({theme, onToggle}:Props) {
    return(
        <> <Navbar theme={theme} onToggle = {onToggle} />
        </>
       
    )
}