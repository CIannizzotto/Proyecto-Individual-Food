import {NavLink} from 'react-router-dom';
import style from './LandingPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setVisualFilter } from '../../redux/actions/actions';
// import {connect} from 'react-redux';


export default function LandingPage(/*{visualFilter,setVisualFilter}*/) {

const teme = useSelector((state) => state.visualFilter); // Me traigo del reducer el estado visualFilter 
const dispatch = useDispatch(); // me traigo de react-redux el useDispatch para poder despachar actions 

const handleClick = () => {
  dispatch(setVisualFilter()); // hago un dispatch de la action e invierte el valor de teme
};
  
  return (
    
    <div className={teme ? style.landing : style.landingBlack}> {/*Si el tema existe pongo los estilos light caso contrario pongo los estilos dark*/}
          <div className={style.nav}>
          <button className={teme ? style.ligth : style.black} onClick={handleClick}>{teme?'Dark':'Light'}</button> 
          </div>
          <div className={style.container}>
          <NavLink to='/home'><button className={teme ? style.ligth : style.black}>HOME</button></NavLink>
          </div>
    </div>
  );
}

// ----------------------------------------------Asi se haria con connect------------------------------------------------------------------------------------------
// const mapStateToProps = state => {
//   return {
//     visualFilter: state.visualFilter
//   };
// }
// const mapDispatchToProps = {
//   setVisualFilter
// };
// export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);