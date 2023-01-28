import { BASE_URL_IMG } from "./config";

export function Reco ({recs, getShowById}) {

    async function onClickRec(e) {
        console.log("ID:"+e.target.parentElement.id)
        getShowById(e.target.parentElement.id)
    }
 
   return (<>
        {recs.length!==0 ? 
            recs.map( reco => {
                return<a href="#wrapper" className={"thumb"} id={reco.id} key={reco.id} onClick={onClickRec}>
                    <img className={"thumb"} src={`${BASE_URL_IMG}w500${reco.backdrop_path}`} alt={reco.name} />
                </a> } 
                ) 
            : ""}    
    </>)
}