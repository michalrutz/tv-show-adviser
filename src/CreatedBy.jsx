export function CreatedBy({created_by}) {
    return <div>
        { created_by ? created_by.map( a => <p key={a.name}>{a.name}</p>) : ""}
    </div>
}