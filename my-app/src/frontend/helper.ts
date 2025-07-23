export function floatConvert(val: any) {
    return parseFloat(val).toFixed(2)
}

export function sanitisePath(str: any) {
    let finString = "Home" + decodeURIComponent(str)
    let finWordArr = finString.split("/")
    for (let k = 0; k < finWordArr.length; k++) {
        finWordArr[k] = finWordArr[k].charAt(0).toUpperCase() + finWordArr[k].slice(1)
    }
    let finArr = [];
    for (let k = 0; k < finWordArr.length; k++) {
        if (finWordArr[k] === "Home" || finWordArr[k] === "Store") {
            finArr[k] = { title: finWordArr[k], href: "/" }
        } else {
            let h: any = "/store/" + finWordArr[k]
            finArr[k] = { title: finWordArr[k], href: h }
        }
    }

    return finArr
}