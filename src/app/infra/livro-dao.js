class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultado) => {
                    if(erro) {
                        console.log(erro);
                        return reject('Não foi possível listar os livros!');
                    }

                    return resolve(resultado);
                }
            )
        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO livros (
                titulo,
                preco,
                descricao
                ) values (?,?,?)`
                ,
                    [
                        livro.titulo,
                        livro.preco,
                        livro.descricao
                    ]
                , function(err) {
                    if(err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }

                    return resolve();
                }
            );
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ?`
            , [ id ]
            , function(err) {
                if(err) {
                    console.log(err);
                    return reject('Não foi possível excluir o livro!');
                }

                return resolve();
            });
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM livros WHERE id = ?`
            , [ id ]
            , function(err, resultado) {
                if(err) {
                    console.log(err)
                    return reject('Não foi possível pesquisar o livro!');
                }

                return resolve(resultado);
            })
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`UPDATE livros SET titulo = ?, descricao = ?, preco = ? WHERE id = ?`
            , [ livro.titulo, livro.descricao, livro.preco, livro.id ]
            , function(err) {
                if(err) {
                    console.log(err);
                    return reject('Não foi possível editar o livro!');
                }

                return resolve();
            });
        });
    }
}

module.exports = LivroDao;