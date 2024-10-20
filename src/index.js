class HashMap {
    // each bucket is represented by an inner array; hash maps in
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
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
          
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
        const bucket = this.bucket(key);
        const entry = this.entry(bucket, key);

        // double this.buckets.length when needed
        if (this.length + 1 > this.capacity * this.#loadFactor) {
            for (let i = 0; i < this.capacity * 2; i++) {
                this.buckets.push([]);
            }
        }

        if (entry) {
            entry.value = value;
            return;
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
                if (bucket[i].value === key) {
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
}

