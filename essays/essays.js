const essays = [
    // title, src
    ["Happiness in a small room", "coding"]
    , ["Wealth in Poverty, the Christmas Irony", "christmas"]
    , ["Statutes over Statues: Destroying Racial Injustice", "erace"]
    , ["Giants of Africa", "nigeria_n"]
]

onload = ()=>{
    essays.forEach(essay=>{
        const paper = add(make("article"))
        paper.id = essay[1]
        add(make("h3"), paper).textContent = essay[0]
        add(make("iframe"), paper).src = essay[1]+".html"
    })
}