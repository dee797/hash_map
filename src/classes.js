class HashMap {
    // each bucket is an inner array; hash maps in
    // many languages start with a default size of 16 buckets
    constructor() {
        this.buckets = [[],[],[],[],
                        [],[],[],[],
                        [],[],[],[],
                        [],[],[],[]];
    }

    get capacity() {
        return this.buckets.length;
    }

    #loadFactor = 0.75;


    hash(key) {
        let hashCode = 0;
           
        // Use modulo for each iteration to ensure that the hashCode
        // value stays within the size of the buckets list
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    } 


    // finds a bucket w the index that matches the hashCode number, 
    // then returns that bucket
    bucket(key) {
        const hashCode = this.hash(key);

        if (hashCode < 0 || hashCode >= this.capacity) {
            throw new Error("Trying to access index out of bound");
          }

        return this.buckets[hashCode];
    }


    /* parses the given bucket and returns an exisiting entry
    that matches the key; otherwise, if no such entry exists,
    return null */
    entry(bucket, key) {
        for (const item of bucket) {
            if (item.key === key) return item;
        }
        return null;
    }
    

    /* if an entry is found from the entry func call, then that
    entry's value is overwritten in the if statement.
    otherwise, if no entry is found, the key value pair is added
    to the bucket */
    set(key, value) {
        let bucket = this.bucket(key);
        const entry = this.entry(bucket, key);

        if (entry) {
            entry.value = value;
            return;
        }

        // double this.buckets.length when needed
        if (this.length + 1 > this.capacity * this.#loadFactor) {
            const currentCapacity = this.capacity
            for (let i = 0; i < currentCapacity; i++) {
                this.buckets.push([]);
            }
            bucket = this.bucket(key);
        }

        bucket.push({ key, value });
    }


    get(key) {
        const bucket = this.bucket(key);
        const entry = this.entry(bucket, key);
        if (entry) return entry.value;
        return null;
    }


    has(key) {
        const bucket = this.bucket(key);
        const entry = this.entry(bucket, key);
        if (entry) return true;
        return false;
    }


    remove(key) {
        const bucket = this.bucket(key);
        const entry = this.entry(bucket, key);
        if (entry) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    bucket.splice(i, 1);
                    break;
                }
            }
            return true;
        }
        return false;
    }


    get length() {
        let keyCount = 0;
        for (const bucket of this.buckets) keyCount += bucket.length;
        return keyCount;
    }


    clear() {
        this.buckets = [[],[],[],[],
                        [],[],[],[],
                        [],[],[],[],
                        [],[],[],[]];
    }


    keys() {
        const keyArray = [];
        for (const bucket of this.buckets) {
            for (const item of bucket) {
                keyArray.push(item.key);
            }
        }
        return keyArray;
    }


    values() {
        const valuesArray = [];
        for (const bucket of this.buckets) {
            for (const item of bucket) {
                valuesArray.push(item.value);
            }
        }
        return valuesArray;
    }


    entries() {
        const entriesArray = [];
        for (const bucket of this.buckets) {
            for (const item of bucket) {
                entriesArray.push([item.key, item.value]);
            }
        }
        return entriesArray;
    }
}

export default HashMap;