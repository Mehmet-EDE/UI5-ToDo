var db = openDatabase('mydb', '1.0', 'Test DB', 2048)

function listele() {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT personelno, ad,soyad,mailprs,foto FROM personel", [],
                function(tx, result) {
                    resolve(result);
                },
                function(tx, error) {
                    reject(error.message)
                })
        })
    })
}

function editEmployee(ad, soyad, mail, foto, id) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("UPDATE personel SET ad=?,soyad=?,mailprs=?,foto=? WHERE personelno=?", [ad, soyad, mail, foto, id],
                function(tx, result) {
                    resolve(result);
                },
                function(tx, error) {
                    reject(error.message);
                })
        })
    })
}