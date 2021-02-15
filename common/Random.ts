// SFC32 Pseudo Random Number Generator
// Copied from https://github.com/bryc/code/blob/master/jshash/PRNGs.md

// Useful for seeding prng
function splitmix32(a) {
    return () => {
        a |= 0
        a = a + 0x9e3779b9 | 0
        let t = a ^ a >>> 15
        t = Math.imul(t, 0x85ebca6b)
        t = t ^ t >>> 13
        t = Math.imul(t, 0xc2b2ae35)
        return (t ^ t >>> 16) | 0
    }
}

class Random {
    a = 0
    b = 0
    c = 0
    d = 0
    cnt = 0

    constructor(seed: number) {
        const seeder = splitmix32(seed)
        this.a = 0
        this.b = seeder() | 0
        this.c = seeder() | 0
        this.d = 0
        for(let i = 0; i < 12; i++)
            this.next()
    }

    // Returns signed int32
    private next(): number {
        this.cnt++
        let a = this.a | 0
        let b = this.b | 0
        let c = this.c | 0
        let d = this.d | 0

        const t = (a + b | 0) + d | 0
        d = d + 1 | 0
        a = b ^ b >>> 9
        b = c + (c << 3) | 0
        c = c << 21 | c >>> 11
        c = c + t | 0

        this.a = a
        this.b = b
        this.c = c
        this.d = d
        return t | 0
    }

    // Returns signed int32 within bound
    // If no argument is given, returns without any bound
    // Else if max === undefined, returns [0..min-1] inclusive
    // Else, returns [min..max] inclusive
    nextInt(min: number, max: number): number {
        if(min === undefined && max === undefined) {
            return this.next() | 0
        } else {
            if(max === undefined) {
                max = min - 1
                min = 0
            }
            max |= 0
            min |= 0
            if(max < min)
                throw 'Illegal number bound'
            if(min == max)
                return min

            return ((this.next() >>> 0) % ((max - min + 1) >>> 0) + (min >>> 0)) | 0
        }
    }

    // Returns float32 in [0..1]
    nextFloat(): number {
        return (this.next() >>> 0) / 4294967296
    }
}

export default Random