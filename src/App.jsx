import axios from "axios"
import { useEffect, useState } from "react"
import { API_KEY, BASE_URL, BASE_URL_IMG } from "./config"
import { Show } from "./Show"

export function App () {
    const [show, setShow] = useState()
    const [search, setSearch] = useState("")
    const [sugestion, setSugestion] = useState({})

    async function getPopularShows () {
        //get top 20 popular shows
        const top = await axios.get(`${BASE_URL}tv/popular${API_KEY}`);
        if (top.data.results.length!==0) {
            setShow(top.data.results[0]); 
        }
    };

    useEffect(()=> {getPopularShows()} ,[]); // z klamrami nie zwraca funkcji i nie ma error

    async function onChangeSearch (e) {
        const value = e.target.value;
        setSearch(value)
        let query = value.toLowerCase();
        //search API
        try {
            const shows = await axios.get(`${BASE_URL}search/tv${API_KEY}&query=${query}`);
            if( shows.data.results.length===0){ console.log("no results!"); setSugestion({})}
            else {
                console.log(shows.data);
                const similar = await axios.get(`${BASE_URL}tv/${shows.data.results[0].id}${API_KEY}&query=${query}`);
                console.log("SIMILAR"+similar);
                setSugestion(shows.data.results[0])
            }   
        } catch (error) {
            console.log("error:"+error);  
        }
        
    }

    function onSubmitSearach(e) {
        e.preventDefault();
        if (Object.hasOwn(sugestion,"name") === false){
            console.log("NO")
        }
        //commit sugestion
        else {
            setShow(sugestion);
            setSearch("");
            setSugestion({})
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
                    autoFocus
                />
                { sugestion.name && sugestion.name.length>2 ? <p className="sugestion">Looking for <strong>{sugestion.name}</strong>?</p> : <p className="sugestion">What tv-show you're looking for?</p>}    
                </form>
        </header>
        <main>
            <Show show={show}>
            </Show>
        </main>
        <aside>
            - LIST OF VIDEOS
        </aside>
        <footer>
            <div><p>made by <strong>Michal Rucinski</strong></p></div>
            <div><p>all photos from www.themoviedb.org</p></div>
        </footer>
    </div>
    
    </>
    )
}

