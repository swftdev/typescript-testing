export function callNTimes(callback: Function, callCount: number){
    for(let i = 0; i < callCount; i++){
        callback()
    }
}