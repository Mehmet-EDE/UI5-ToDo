var db = openDatabase('mydb', '1.0', 'Test DB', 2048)

function ticketekle(tarih1, tarih2, proje_ad, projekonu) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO ticket(projead ,konu ,başlangıç ,bitiş ,durum) VALUES(?,?,?,?,1)", [proje_ad, projekonu, tarih1, tarih2], function(tx, result) {
                resolve(result);
            }, function(tx, error) {
                reject(error.message);
            })
        })
    })
}

db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS ticketrole(id INTEGER PRIMARY KEY,tid INTEGER,role VARCHAR(50), uid INTEGER,FOREIGN KEY(tid) REFERENCES ticket(id), FOREIGN KEY(uid) REFERENCES personel(personelno))")
})

function ticketrole(rowId, role, uid) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO ticketrole(tid,role,uid) VALUES(?,?,?)", [rowId, role, uid], function(result) {
                resolve(result);
            }, function(tx, error) {
                reject(error.message);
            })
        })
    })
}

function editTicket(a) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM ticket where id=?", [a], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}

function getTicketRole(a) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT ticketrole.uid, personel.ad, personel.soyad, ticketrole.role FROM personel JOIN ticketrole ON ticketrole.uid=personel.personelno WHERE ticketrole.tid=?", [a], function(tx, result) {
                resolve(result)
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
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}

function updateTicket(tarih1, tarih2, projeadı, projekonu, durum, urlDeger) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("UPDATE ticket SET projead=?, konu=?, başlangıç=?,bitiş=?,durum=? WHERE id=?", [projeadı, projekonu, tarih1, tarih2, durum, urlDeger], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}

function deleteRoles(urlDeger) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("DELETE FROM ticketrole WHERE role='cc' AND tid=?", [urlDeger], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}

function updateRoles(role, uid, urlDeger) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO ticketrole(role,uid,tid) VALUES(?,?,?)", [role, uid, urlDeger], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}

function addStatus(ekle) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO durum(durum) VALUES(?)", [ekle], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}