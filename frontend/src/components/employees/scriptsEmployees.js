
export default function convertToTitle(item) {
    if (item !== undefined){
        return item[0].toUpperCase() + item.slice(1)
    }
}