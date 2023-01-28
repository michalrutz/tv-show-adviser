import { BASE_URL_IMG } from "./config";

export function Recommandations ({recs, getShowById}) {

    async function onClickRec(e) {
        console.log("ID:"+e.target.parentElement.id)
        getShowById(e.target.parentElement.id)
    }
 

   return <main>
    <h2>You may also like:</h2>
    <ul>
       {recs.length!==0 ? 
            recs.map( r => {
                return <a href="#wrapper"><li className={"thumb"} id={r.id} key={r.id} onClick={onClickRec} backgroundImage={`url(${BASE_URL_IMG}w500${r.backdrop_path})`}>
                    <img className={"thumb"} src={`${BASE_URL_IMG}w500${r.backdrop_path}`} alt={r.name} />
                </li></a> } 
                ) 
            : ""}
   </ul></main>
}