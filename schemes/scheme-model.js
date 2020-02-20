const db = require("../db-config")

function find(){
    return db("schemes")
        .select()
}

function findById(id){
    return db("schemes")
        .where({id})
        .select()
}

function findSteps(id){
    return db("steps")
        .join("schemes", "steps.scheme_id","schemes.id" )
        .where("scheme_id", id)
        .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
        .orderBy("step_number")
}

function add(scheme){
    return db("schemes")
            .insert(scheme)
            .then(ids => {
            return findById(ids[0]);
            })
}

function update(changes, id){
    return db("schemes")
        .where({id})
        .update(changes)
        .then(e => {
            return findById(id).first();
        })
}

function remove(id){
    return db("schemes")
        .where({id})
        .delete()
}

module.exports = {
    find,findById, findSteps, add, update, remove
}