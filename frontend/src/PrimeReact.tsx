// tailwind css
import './global.css';

// primreact css
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css'; 

type PrimeReactPops = {
    children:React.ReactNode
}

export default function PrimeReact({children}:PrimeReactPops) {
    return (children)
}