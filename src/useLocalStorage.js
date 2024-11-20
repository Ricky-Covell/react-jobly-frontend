const useLocalStorage = (method, itemName, data) => {
    if (!method) return
    if (method !== 'logout' && !itemName) return
    if (method === 'set' && !data) return

    switch(method) {
        case 'get':
            return JSON.parse(localStorage.getItem(itemName)) || {}

        case 'set':
            localStorage.setItem(itemName, JSON.stringify(data))
            break
        case 'logout':
            return localStorage.clear()
    }       
}

export default useLocalStorage