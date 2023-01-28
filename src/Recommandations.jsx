import { BASE_URL_IMG } from "./config";

export function Recommandations ({recs}) {

    function onClickRec(e) {
        console.log(e.target.parentElement.id)
    }

   return <ul>
       {recs.length!==0 ? 
            recs.map( r => {
                return <li id={r.id} key={r.id} onClick={onClickRec}>
                    {r.name}
                    <img src={`${BASE_URL_IMG}w500${r.backdrop_path}`} alt={r.name} />
                </li> } 
                ) 
            : ""}
   </ul>
}