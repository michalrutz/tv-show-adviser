export function CreatedBy({created_by}) {

    function authors(created_by) {
        let list =[];
        if(created_by){ 
            for (let index = 0; index < created_by.length; index++) {
                if(index===created_by.length-1 && index>0) { list.push("and"); }
                else if(index!==created_by.length-1 && index>0) { list.push(","); }
                list.push(created_by[index].name);
            }}
        return list;     
    }
    return <div className="detail">
        <p>createdby: <strong>{authors(created_by).join(" ")}</strong></p>
    </div>
}