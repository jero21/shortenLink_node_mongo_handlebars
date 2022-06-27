document.addEventListener('click', e => {
    if(e.target.dataset.short) {
        const url = `http://localhost:5000/${e.target.dataset.short}`
        navigator.clipboard
            .writeText(url)
            .then(() => {
                console.log("text copied to clipboard")
            })
            .catch((err) => {
                console.log("something is wrong ", err)
            })
    }
})