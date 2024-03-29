import axios from "axios"
import { useEffect, useState } from "react"
import { API_KEY, BASE_URL, BASE_URL_IMG } from "./config"
import { Reco } from "./Reco"
import { Show } from "./Show"

export function App () {
    const [show, setShow] = useState()
    const [search, setSearch] = useState("")
    const [sugestion, setSugestion] = useState({})
    const [recommenadations, setRecommandations] = useState([])
    const [feedback, setFeedback] = useState(true);

    async function getPopularShows () {     //get top 20 popular shows
        const minNumOfVotes = "vote_count.gte=2000" //minimal number of votes
        let year = new Date().getFullYear()
        const month = new Date().getMonth()
        if ( month === 0 ){ year = year -2 } else { year = year -1 }
        const lastYear = "air_date.gte="+year

        const top = await axios.get(`${BASE_URL}discover/tv${API_KEY}&${minNumOfVotes}&sort_by=vote_average.desc&page=1&${lastYear}`)

        if (top.data.results.length!==0) {  //check if the array is empty
            getShowById(top.data.results[0].id)
        }
    };

    useEffect(()=> { getPopularShows() },[]); // z klamrami nie zwraca funkcji i nie ma error

    async function getShowById(id) {
        let newShow =  await axios.get(`${BASE_URL}tv/${id}aggregate_credits${API_KEY}`);
        if(newShow.data.length!==0){
            setShow(newShow.data);
            getRecommandations(newShow.data.id)
            setSearch("");
            setSugestion({})
            setFeedback(true)
            console.log("SUCCESSFUL REQUEST by SHOW's ID")
        }    
    }
    async function getRecommandations(id) {
        const resRecommendations = await axios.get(`${BASE_URL}tv/${id}//recommendations${API_KEY}`);
        setRecommandations(resRecommendations.data.results.slice(0,6));
        return resRecommendations;     
    }

    async function onChangeSearch (e) {
        setSearch(e.target.value)    
        let query = e.target.value.trim().toLowerCase().replace(" ", "%20" ); //clean the query
        if(query!==""){
            console.log("QUERY:"+query);
            const shows = await axios.get(`${BASE_URL}search/tv${API_KEY}&query=${query}`); //send request
            if( shows.data.results.length===0){
                setFeedback(false);
                setSugestion({});   console.log("no results!");
    
            } else { //assign the data of the best match
                setFeedback(true);

                setSugestion(shows.data.results[0])
            }
        } else{
            setFeedback(true);
            setSugestion({});
        }       
    }

    function onSubmitSearach(e) {
        e.preventDefault();
        if (Object.hasOwn(sugestion,"name") === false){
            console.log("OBJECT has NO NAME")
        }
        //commit sugestion
        else {
            getShowById(sugestion.id);
        }
    }

    return (<>
    <div id="wrapper" style={{ 
        backgroundImage: show ?
            `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(15,20,10,0.6) 60%, rgba(5,5,0,0.9) 80% 100%),
            url(${BASE_URL_IMG}original${show.backdrop_path})` : 
            "black" }}>
        <header>
                <form onSubmit={onSubmitSearach}>
                <label htmlFor="search"></label>
                <input id="search" type="text" name="search"
                    onChange={(e)=>onChangeSearch(e)} 
                    value={search}
                    autoFocus autoComplete="off"
                    style={feedback ? {borderColor:"white"} : {borderColor: "rgba(150, 0, 0, 0.6)", animation:"none"}}
                />
                { feedback ? "": <p className="sugestion">no match found</p>}
                { sugestion.name && sugestion.name.length>2 
                    ? <p className="sugestion">Looking for <strong>{sugestion.name}</strong>?</p> 
                    : ""}
                { !Object.hasOwn(sugestion,"name") && feedback
                    ? <p className="sugestion">What are you looking for?</p> 
                    : ""}
                </form>
        </header>
        <main>
               <Show show={show}/>
        </main>
        <aside>
            <h2>You may also like</h2>
            <div className="gallery">
                <Reco recs={recommenadations} getShowById={getShowById}/>
            </div>
        </aside>
        <footer>
            <p>made by <strong>Michal Rucinski</strong></p>
            <p>all photos from www.themoviedb.org</p>
        </footer>
    </div>
    
    </>
    )
}

