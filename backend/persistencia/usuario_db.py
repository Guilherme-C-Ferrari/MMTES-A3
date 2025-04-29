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

        res = ConfigDB.executa_sql("SELECT id, nome, email, senha FROM Usuarios", False)

        for r in res:
            j : Usuario = Usuario(
                nome=r[1],
                email=r[2],
                senha=r[3]
            )
            cls.get_instance()._lista_de_usuarios.append(j)

    @classmethod
    def listar_todos_os_usuarios(cls):
        return  cls.get_instance()._lista_de_usuarios
    
    @classmethod
    def inserir_usuario_no_banco(cls, usuario: Usuario):
        sqlite_insert = """INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?);"""
        valores = (usuario._nome, usuario._email, usuario._senha)
        ConfigDB.executa_sql(sqlite_insert, valores)
        
        cls.get_instance()._lista_de_usuarios.append(usuario)
    
    @classmethod
    def editar_usuario_no_banco(cls, nome: str, email: str):
        lista_filtrada : list[Usuario] = [x for x in  cls.get_instance()._lista_de_usuarios if x._nome == nome]
        if(len(lista_filtrada) == 0):
            return False
        else:
            usuario_alvo : Usuario = lista_filtrada[0]
            usuario_alvo._email = email

            sqlite_update = """UPDATE Usuarios SET email = ? where nome = ?"""
            valores = (usuario_alvo._email, usuario_alvo._nome)
            ConfigDB.executa_sql(sqlite_update, valores)

            return True
        
    @classmethod
    def edita_senha_no_banco(cls, nome: str, nova_senha: str):
        lista_filtrada : list[Usuario] = [x for x in  cls.get_instance()._lista_de_usuarios if x._senha == nova_senha]
        if(len(lista_filtrada) == 0):
            return False
        else:
            usuario_alvo : Usuario = lista_filtrada[0]
            usuario_alvo._senha = nova_senha

            sqlite_update = """UPDATE Usuarios SET senha = ? where nome = ?"""
            valores = (usuario_alvo._senha, usuario_alvo._nome)
            ConfigDB.executa_sql(sqlite_update, valores)

            return True

    @classmethod
    def remover_usuario_do_banco(cls, nome: str):
        cls.get_instance()._lista_de_usuarios = [p for p in  cls.get_instance()._lista_de_usuarios if p._nome != nome]
        valor = (nome,)
        sqlite_delete = """DELETE FROM Usuarios where nome = ?"""
        ConfigDB.executa_sql(sqlite_delete, valor)