import { CreatedBy } from "./CreatedBy"

export function Show ({show}) {
    console.log("SHOW successfuly passed to Show Component")
    return (<article>
        {show ? <>
            <h1>{show.name}</h1>
            <div className="details">
            <CreatedBy created_by={show.created_by}/>
            <p>
                <span className="detail">RATING: </span><strong>{show.vote_average/2}</strong>/5, 
                <span className="detail"> VOTES: <strong>{show.vote_count}</strong></span>
            </p>
            <p><span className="detail">language: </span><strong>{show.original_language}</strong></p>
            </div>
            <p className="overview">{show.overview ? show.overview : "This show has no description yet."}</p>
            </>
        : ""} 
        </article>)           

}