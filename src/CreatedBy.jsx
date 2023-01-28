export function CreatedBy({created_by}) {

    function authors(created_by) {
        let list =[];
        if(created_by){ 
            for (let index = 0; index < created_by.length; index++) {
                if(index===created_by.length-1 && index>0) { list.push("and"); }
                list.push(created_by[index].name);
            }}
        return list;     
    }
    console.log(authors(created_by));

    return <div className="detail">
        <p>createdby: <strong>{authors(created_by).join(" ")}</strong></p>
    </div>
}