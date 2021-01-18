var db = openDatabase('mydb', '1.0', 'Test DB', 2048)
db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS proje (proje_id INTEGER PRIMARY KEY,project_name VARCHAR (50))")
})

function projelistele() {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT proje_id,project_name FROM proje", [], function(tx, result) {
                resolve(result);
            }, function(tx, error) {
                reject(error.message);
            })
        })
    })
}

function addprojecttbl(a) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO proje(project_name) VALUES(?)", [a], function(tx, result) {
                resolve(result);
            }, function(tx, error) {
                reject(error.message);
            })
        })
    })
}

function join(a) {
    // SELECT tid FROM ticket JOIN ticketrole ON WHERE ticketrole.uid = 2 and ticketrole.role = "cc"
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM ticketrole JOIN personel ON ticketrole.uid=personel.personelno;", [], function(tx, result) {
                resolve(result);
            }, function(tx, error) {
                reject(error.message);
            })
        })
    })
}

function editProject(a, deger) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("UPDATE proje SET project_name=? WHERE proje_id=?", [a, deger], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}

function deleteProject(deger) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("DELETE FROM proje WHERE proje_id=?", [deger], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}