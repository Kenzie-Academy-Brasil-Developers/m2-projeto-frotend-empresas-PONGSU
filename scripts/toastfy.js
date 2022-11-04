

const toastfy = async (condition,msg) =>{
    const main = document.querySelector('main')
if (condition == 'ok') {
    main.insertAdjacentHTML('beforeend', `
        <div id='toastfy' class='ok'>
            <h4>${msg}</h4>
        </div>
    `)
}else if (condition == 'fail') {    
    main.insertAdjacentHTML('beforeend', `
        <div id='toastfy' class='fail'>
            <h4>${msg}</h4>
        </div>
    `)
}
setTimeout(() => {
    document.querySelector('#toastfy').remove()
}, 3300);
}