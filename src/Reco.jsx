import { BASE_URL_IMG } from "./config";

export function Reco ({recs, getShowById}) {

    async function onClickRec(e) {
        console.log("ID:"+e.target.id)
        getShowById(e.target.id)
    }
 
   return (<>
        {recs.length!==0 ? 
            recs.map( reco => {
                return(
                <a href="#wrapper" key={reco.id}  className={"thumbWrapperWrapper"}>
                    <div className="cover" id={reco.id} onClick={onClickRec} ></div>
                    <div className={"thumbWrapper"}  key={reco.id} >
                        <div className="thumbTitel"><p href="#wrapper">{reco.name}</p></div>
                        <img className={"thumb"} src={`${BASE_URL_IMG}w500${reco.backdrop_path}`} alt={reco.name} />
                    </div>
                </a>) 
                } ) 
            : ""}    
    </>)
}