var db = openDatabase('mydb', '1.0', 'Test DB', 2048)
db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS personel(personelno INTEGER PRIMARY KEY,ad VARCHAR (50),soyad VARCHAR(50),foto VARCHAR(50),password VARCHAR(50),mailprs VARCHAR(50),rolerow BYTE)"),
        function(tx, result) {
            alert(result);
        },
        function(tx, error) {
            alert(error.message);
        }
})


function kayıtol(ad, soyad, mail, foto) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO personel (ad,soyad,foto,password,mailprs,rolerow) VALUES(?,?,?,'123456',?,0)", [ad, soyad, foto, mail],
                function(tx, result) {
                    resolve(result)
                },
                function(tx, error) {
                    reject(error.message)
                })
        })
    })
}

function login(mail, sifre) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT personelno,mailprs,password,rolerow FROM personel WHERE mailprs=? and password=?", [mail, sifre],
                function(tx, result) {
                    resolve(result)
                },
                function(tx, error) {
                    reject(error.message)
                })
        })
    })
}

function deleteEmployee(id) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("DELETE FROM personel WHERE personelno=?", [id], function(result) {
                resolve(result);
            }, function(error) {
                reject(error.message);
            })
        })
    })
}

function controlLogin(mail) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT count(mailprs) FROM personel WHERE mailprs=?", [mail], function(tx, result) {
                resolve(result)
            }, function(tx, error) {
                reject(error.message)
            })
        })
    })
}