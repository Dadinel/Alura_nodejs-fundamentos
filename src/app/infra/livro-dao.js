class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista(callback) {
        this._db.all(
            'SELECT * FROM livros',
            (erro, resultado) => {
                callback(erro, resultado);
            }
        )
    }
}

module.exports = LivroDao;