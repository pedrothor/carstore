import styles from '../navbar/Navbar.module.css'
import logo from '../../assets/carstore_logo.png'
import { Link } from 'react-router-dom'

export default function Navbar(){
    
    return (
        <nav className={styles.navbar}>
            <img src={logo} />
            <div className={styles.itemsNavbar}>
                <ul>
                    <li><Link to='/'><h4>Cars</h4></Link></li>
                    <li><Link to='/units'><h4>Units</h4></Link></li>
                    <li><Link to='/employees'><h4>Employees</h4></Link></li>
                </ul>
            </div>
        </nav>
    )
}