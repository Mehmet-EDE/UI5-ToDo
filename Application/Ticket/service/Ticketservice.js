var db = openDatabase('mydb', '1.0', 'Test DB', 2048);

db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS ticket(id INTEGER PRIMARY KEY, projead INTEGER,konu VARCHAR(50),başlangıç DATE,bitiş DATE,durum VARCHAR(50),FOREIGN KEY(durum) REFERENCES durum(durum),FOREIGN KEY(projead) REFERENCES proje(project_name))", [], function(tx, result) {
        console.log(result);
    }, function(tx, error) {
        console.log(error.message);
    })
})
db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS durum(id INTEGER PRIMARY KEY,durum VARCHAR(50))", [], function(tx, results) {
        console.log(results);
    }, function(tx, error) {
        alert(error.message)
    })
})

function ticketlisteleme() {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT proje.project_name,personel.ad,personel.soyad,ticketrole.role, durum.durum, ticket.başlangıç, ticket.bitiş,ticket.konu FROM personel,proje,durum,ticket INNER JOIN ticketrole ON proje.proje_id=ticket.projead AND personel.personelno=ticketrole.uid AND durum.id=ticket.durum ", [], function(tx, result) {
                console.table(result.rows)
                resolve(result);
            }, function(tx, error) {
                reject(error.message);
            })
        })
    })
}

function ticketfrom(stringQuerry) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT personel.ad,personel.soyad,ticketrole.role ,ticket.konu, durum.durum, proje.project_name,ticketrole.tid , ticket.başlangıç, ticket.bitiş FROM personel, proje, ticket,durum JOIN ticketrole ON personel.personelno=ticketrole.uid AND ticketrole.tid=ticket.id AND durum.id=ticket.durum AND proje.proje_id=ticket.projead WHERE " + stringQuerry + "", [], function(tx, result) {
                    resolve(result)
                },
                function(tx, error) {
                    reject(error.message)
                })
        })
    })
}

function getUid(id) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("select tid from ticketrole where role='cc' and uid=?", [id], function(tx, result) {
                resolve(result)
            }, function(error) {
                reject(error.message)
            })
        })
    })
}

function getRole(stringQuerry) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM ticketrole JOIN personel ON ticketrole.uid=personel.personelno WHERE " + stringQuerry + "", [], function(tx, result) {
                resolve(result)
            }, function(error) {
                reject(error.message)
            })
        })
    })
}

function getTicket(newstringQuery) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM ticket WHERE " + newstringQuery + "", [], function(tx, result) {
                resolve(result)
            }, function(error) {
                reject(error.message)
            })
        })
    })
}

function projead() {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * from proje", [], function(tx, result) {
                resolve(result);
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}

function getDurum() {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM durum", [], function(tx, result) {
                resolve(result)
            }, function(error) {
                reject(error.message)
            })
        })
    })
}