let emptyArr = [];
const loadAllCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const res = await response.json();
    const data = res.data;
    const tabContainer = document.getElementById('tab-container');
    data.forEach(res => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab"><button id="red-btn" onclick="loadData('${res.category_id}')" class="btn btn-sm redBtn">${res.category}</button></a> 
        `
        tabContainer.appendChild(div);
    })
}

const loadData = async (id,isSort) => {
    
    emptyArr.push(id);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const res = await response.json();
    const data = res.data;
    // sorting the data if the isSort is true.....
    if(isSort){
        data.sort((a,b)=>{
            const viewA = parseFloat(a.others.views)
            const viewB = parseFloat(b.others.views)
            if(viewA<viewB) return 1;
            else if(viewA>viewB) return -1;
            return 0;
        })
    }
    // if there is no data then it will show oops sorry......
    const oppsSorry = document.getElementById('oops-sorry');
    if(data.length === 0){
        oppsSorry.classList.remove('hidden');
    }else{
        oppsSorry.classList.add('hidden');
    }
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent='';
    
    data.forEach(res => {
        const postedDate = res?.others?.posted_date;
        const timeInNumber = parseInt(postedDate);
        let showhrsAndhrs ='';
        const hours = Math.floor(timeInNumber / 3600);
        const minutes = Math.floor((timeInNumber - (hours*3600)) /60);
        isNaN(timeInNumber)?showhrsAndhrs='' : showhrsAndhrs=`<div class="w-44 bg-black absolute right-1 bottom-1 p-1 rounded-lg text-white">
        <p>${hours}hrs ${minutes} min ago</p>
    </div>`

        // verified or blue tik condition here......
        let url = ''
        if(res?.authors[0]?.verified === true){
            url='<img src="./images/fi_10629607.svg" alt="image" />'
        }else{
            url='';
        }
        // dynamically addding card........
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <div class="relative">
                <figure><img class="w-[400px] h-[300px]" src="${res?.thumbnail}" alt="Image" /></figure>
                ${showhrsAndhrs}
            </div>
            <div class="card-body">
                <div class="flex gap-3">
                    <div>
                        <img class="w-14 h-14 rounded-full" src="${res?.authors[0]?.profile_picture}" alt="Image" />
                    </div>
                    <div>   
                        <h3 class="text-xl font-bold">${res?.title}</h3>
                        <div class="flex gap-2 items-center mt-4 text-gray-500">
                            <p>${res?.authors[0]?.profile_name}</p>
                            <p>${url}</p>
                            
                        </div>
                        <p class="mt-4 text-gray-400">${res?.others?.views} Viwes</p>

                    </div>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(div);
    })
}
let emptyNewArr = emptyArr
const blogBtnHandler = () =>{
    window.location.href = "blog.html";
}

const sortByViewHandler=()=>{
    let newId = emptyNewArr[emptyNewArr.length - 1];
    loadData(newId,true)
}
loadData('1000')
loadAllCategories();