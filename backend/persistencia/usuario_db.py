from backend.modelos.usuario import Usuario
from backend.persistencia.config_db import ConfigDB

# DB do usuario aplicando singleton. Salva mudanças no banco de dados.
class UsuarioDB():

    _instance = None
    _lista_de_usuarios : list = []

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = UsuarioDB()
            cls._instance.popular_do_banco()
        return cls._instance

    @classmethod
    def popular_do_banco(cls):

        res = ConfigDB.executa_sql("SELECT id, nome, email, senha, data_de_nascimento, bio, nickname FROM Usuarios", False)

        for r in res:
            j : Usuario = Usuario(
                nome=r[1],
                email=r[2],
                senha=r[3],
                data_de_nascimento=r[4],
                bio=r[5],
                nickname=r[6]
            )
            cls.get_instance()._lista_de_usuarios.append(j)

    @classmethod
    def listar_todos_os_usuarios(cls):
        return  cls.get_instance()._lista_de_usuarios
    
    @classmethod
    def inserir_usuario_no_banco(cls, usuario: Usuario):
        sqlite_insert = """INSERT INTO Usuarios (nome, email, senha, data_de_nascimento, bio, nickname) VALUES (?, ?, ?);"""
        valores = (usuario._nome, usuario._email, usuario._senha, usuario._data_de_nascimento, usuario._bio, usuario._nickname)
        ConfigDB.executa_sql(sqlite_insert, valores)
        
        cls.get_instance()._lista_de_usuarios.append(usuario)
    
    @classmethod
    def editar_usuario_no_banco(cls, nickname: str, email: str, nome: str, data_de_nascimento: str, bio: str):
        lista_filtrada : list[Usuario] = [x for x in  cls.get_instance()._lista_de_usuarios if x._nickname == nickname]
        if(len(lista_filtrada) == 0):
            return False
        else:
            usuario_alvo : Usuario = lista_filtrada[0]
            usuario_alvo._email = email
            usuario_alvo._nome = nome
            usuario_alvo._data_de_nascimento = data_de_nascimento
            usuario_alvo._bio = bio

            sqlite_update = """UPDATE Usuarios SET nome = ?, email = ?, data_de_nascimento = ?, bio = ? where nickname = ?"""
            valores = (usuario_alvo._nome, usuario_alvo._email, usuario_alvo._data_de_nascimento, usuario_alvo._bio, usuario_alvo._nickname)
            ConfigDB.executa_sql(sqlite_update, valores)

            return True
        
    @classmethod
    def edita_senha_no_banco(cls, nova_senha: str, nickname: str):
        lista_filtrada : list[Usuario] = [x for x in  cls.get_instance()._lista_de_usuarios if x._senha == nova_senha]
        if(len(lista_filtrada) == 0):
            return False
        else:
            usuario_alvo : Usuario = lista_filtrada[0]
            usuario_alvo._senha = nova_senha

            sqlite_update = """UPDATE Usuarios SET senha = ? where nickname = ?"""
            valores = (usuario_alvo._senha, usuario_alvo._nickname)
            ConfigDB.executa_sql(sqlite_update, valores)

            return True

    @classmethod
    def remover_usuario_do_banco(cls, nickname: str):
        cls.get_instance()._lista_de_usuarios = [p for p in  cls.get_instance()._lista_de_usuarios if p._nickname != nickname]
        valor = (nickname,)
        sqlite_delete = """DELETE FROM Usuarios where nickname = ?"""
        ConfigDB.executa_sql(sqlite_delete, valor)