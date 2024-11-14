//import Dexie from "dexie";
import Dexie from "dexie";
import { getDirTerms } from "./rest";
//import { getWebWorkerDB } from 'dexie-worker';

// Define a function-based Dexie instance
  const db = new Dexie("LC_store");
  db.version(1).stores({
    jl_cats: "id, name, slug, description, parent, extra_meta, count, term_meta"
  });

// Initialize with Web Worker DB insance
//const db = getWebWorkerDB(db, {workerUrl: '/dexieWorker.js'});
//export default db;

//console.log('getWebWorkerDB', getWebWorkerDB);
let queryCount =3;
export async function populateDb({querySize = 3}){
let PageNum = 1;

console.log('qs', queryCount === querySize)
let taxfields = "id,count,extra_meta,term_meta,description,parent,name,slug";
  async function getCats(){

    const catsFilterArr = {
        _fields : taxfields,
        per_page: querySize,
        page: PageNum,
        orderby:'count',
        order: 'desc',
        parent: 120
      }
    const eCats = await getDirTerms('categories', {...catsFilterArr});
    if(eCats){
        queryCount = eCats.length;
        PageNum++
        if(eCats?.length > 0){
            db.jl_cats
        .bulkPut(eCats)
        .then(() => {
          console.log(`Done putting ${eCats.length} in the db`);
          
        })
        .catch((e) => {
          if (e.name === 'BulkError') {
            // Explicitly catching the bulkPut() operation makes those successful
            // additions commit despite that there were errors.
            console.error(
              'Some raindrops did not succeed. However, ' +
                100000 -
                e.failures.length +
                ' raindrops was added successfully'
            );
          } else {
            throw e; // We're only handling BulkError here.
          }
        });
        }
    }

}

while (queryCount === querySize){
    await getCats();
  }
  
}

