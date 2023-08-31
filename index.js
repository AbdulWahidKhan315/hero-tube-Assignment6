const loadAllCategories = async () =>{
    const response =await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const res = await response.json();
    const data = res.data;
    const tabContainer = document.getElementById('tab-container');
    data.forEach(res=>{
        console.log(res)
        const div = document.createElement('div');
        div.innerHTML=`
        <a class="tab"><button class="btn btn-sm">${res.category}</button></a>
        `
        tabContainer.appendChild(div);
    })
}
loadAllCategories();