import hashlib
from backend.modelos.usuario import Usuario, Admin
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
        # Adicionado campo 'tipo' (admin ou usuario)
        res = ConfigDB.executa_sql("SELECT id, nome, email, senha, data_de_nascimento, bio, nickname, tipo FROM Usuarios", False)

        for r in res:
            tipo = r[7] if len(r) > 7 and r[7] else "usuario"
            if tipo == "admin":
                usuario = Admin(r[1], r[2], r[3], r[4], r[5], r[6])
            else:
                usuario = Usuario(r[1], r[2], r[3], r[4], r[5], r[6])
                cls.get_instance()._lista_de_usuarios.append(usuario)
            #Cria o admin padrão automaticamente se ele não existir
            cls.get_instance().criar_admin_padrao()


    @classmethod
    def listar_todos_os_usuarios(cls):
        return  cls.get_instance()._lista_de_usuarios
    
    @classmethod
    def inserir_usuario_no_banco(cls, usuario: Usuario):
        sqlite_insert = """INSERT INTO Usuarios (nome, email, senha, data_de_nascimento, bio, nickname) VALUES (?, ?, ?, ?, ?, ?);"""
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
            usuario_alvo._nickname = nickname
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

    @classmethod
    def criar_admin_padrao(cls):
        nickname_admin = "admin"
        senha_admin = hashlib.md5("admin123".encode('utf-8')).hexdigest()

        ja_existe = any(u for u in cls._lista_de_usuarios if u.get_nickname() == nickname_admin)

        if not ja_existe:
            admin = Admin(
            nome="Administrador Padrão",
            email="admin@sistema.com",
            senha=senha_admin,
            data_de_nascimento="2000-01-01",
            bio="Conta administrativa padrão do sistema.",
            nickname=nickname_admin
        )
        cls.inserir_usuario_no_banco(admin)
       