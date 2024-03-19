
export default function verifyRadio(item){
    let answer = ''

    if(item == 1 || item == 'Yes'){
        answer = 'Yes'
    }
    else if(item == 2 || item == 'No'){
        answer = 'No'
    }
    
    return answer
}
