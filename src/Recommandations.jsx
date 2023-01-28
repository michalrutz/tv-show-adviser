import { BASE_URL_IMG } from "./config";

export function Recommandations ({recs, getShowById}) {

    async function onClickRec(e) {
        console.log("ID:"+e.target.parentElement.id)
        getShowById(e.target.parentElement.id)
    }
 

   return <main><ul>
       {recs.length!==0 ? 
            recs.map( r => {
                return <li id={r.id} key={r.id} onClick={onClickRec}>
                    <img style={{className:"thumb"}} src={`${BASE_URL_IMG}w500${r.backdrop_path}`} alt={r.name} />
                </li> } 
                ) 
            : ""}
   </ul></main>
}