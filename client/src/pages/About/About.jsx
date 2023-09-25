import style from './About.module.css';
import imgGit from '../../images/githublogo.png';
import imgLink from '../../images/linklogo.png';

export default function About(){
    return (
        <div className={style.contenedor}> 
            <div className={style.posicion}>
                <div className={style.info}>
                    <P1 className={style.about}>I am 24 years old, I am a student of the Full Stack Web Developer career in the <b className={style.henry}>SoyHenry</b><p2 className={style.about}> bootcamp</p2>
                    </P1>  
                    <br /><br />
                    <div className={style.containerRedes}>
                    <a href='https://github.com/CIannizzotto' target='__blank'><button className={style.boton}><img src={imgGit} className={style.img}></img></button></a>                        
                    <a href='https://www.linkedin.com/in/cristian-iannizzotto-47a5b9269/' target='__blank'><button className={style.boton}><img src={imgLink} className={style.img}></img></button></a>
                    </div>
                </div>                 
                <div className={style.title}>
                    <h1 className={style.name}>HI, I AM <b className={style.b}>CRISTIAN IANNIZZOTTO</b>!</h1>     
                </div>           
            </div>
        </div>
    )
}
