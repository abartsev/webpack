
async function start () {
   return await Promise.resolve()
}
start().then(() => console.log('await'))

class Util {
    static id = Date.now();
}

console.log(Util.id);

import('lodash').then(_ => {
    console.log('Lodash', _.random(0, 42, true));
    
})