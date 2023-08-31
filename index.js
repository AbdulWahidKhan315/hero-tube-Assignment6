const loadAllCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const res = await response.json();
    const data = res.data;
    const tabContainer = document.getElementById('tab-container');
    data.forEach(res => {
        // console.log(res)
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab"><button onclick="loadData('${res.category_id}')" class="btn btn-sm">${res.category}</button></a>
        `
        tabContainer.appendChild(div);
    })
}

const loadData = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const res = await response.json();
    const data = res.data;
    const oppsSorry = document.getElementById('oops-sorry');
    if(data.length === 0){
        oppsSorry.classList.remove('hidden');
    }else{
        oppsSorry.classList.add('hidden');
    }
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent='';
    data.forEach(res => {
        // console.log(res.length);
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
            <figure><img class="w-[400px] h-[300px]" src="${res?.thumbnail}" alt="Image" /></figure>
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
// loadData('1000')
loadAllCategories();