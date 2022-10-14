export const tryCatch = (fun: () => void, block: string, PERS_STORY: string) => {
    try {fun();} catch (err) {console.trace('%c ' + PERS_STORY + ' error in ' + block + ': ' + err, 'background: #222; color: #AD7150');}
}