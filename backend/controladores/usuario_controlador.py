from backend.persistencia.usuario_db import UsuarioDB
from backend.modelos.usuario import Usuario, Admin
from backend.controladores.autenticacao_controlador import AutenticacaoControlador
import hashlib

# Controlador do usuario.
class UsuarioControlador:

    @classmethod
    def pegar_lista_de_usuarios (cls):
        return UsuarioDB.get_instance().listar_todos_os_usuarios()

    @classmethod
    def filtrar_lista_de_usuarios(cls):
        usuarios = cls.pegar_lista_de_usuarios()
        
        usuarios_dto = []
        for usuario in usuarios:

            usuarios_dto.append({
                "nickname": usuario._nickname,
                "bio" : usuario._bio,
            })

        lista_filtrada : [] = usuarios_dto

        return lista_filtrada

    @classmethod
    def listar_todos_os_usuarios(cls):
        return cls.filtrar_lista_de_usuarios()
    
    @classmethod
    def adicionar_usuario(cls, nome: str, email: str, senha: str, data_de_nascimento: str = None, bio: str = None, nickname: str = None, tipo: str = "usuario"):
        senha = hashlib.md5(senha.encode('utf-8')).hexdigest()

        # Escolhe classe de acordo com tipo
        if tipo == "admin":
            usuario = Admin(nome, email, senha, data_de_nascimento, bio, nickname)
        else:
            usuario = Usuario(nome, email, senha, data_de_nascimento, bio, nickname)

        UsuarioDB.get_instance().inserir_usuario_no_banco(usuario)

    @classmethod
    def editar_usuario_por_nickname(cls, nickname: str, email: str):
        UsuarioDB.get_instance().editar_usuario_no_banco(nickname, email)

    @classmethod
    def editar_senha_do_usuario(cls, nickname: str, nova_senha: str):
        nova_senha = hashlib.md5(nova_senha.encode('utf-8'))
        nova_senha = nova_senha.hexdigest()
        UsuarioDB.get_instance().edita_senha_no_banco(nickname, nova_senha)

    @classmethod
    def remover_usuario_por_nickname(cls, nickname: str):
        UsuarioDB.get_instance().remover_usuario_do_banco(nickname)
    
    @classmethod
    def pegar_usuario_por_nickname(cls, nickname: str):
        usuarios = UsuarioDB.get_instance().listar_todos_os_usuarios()
        for usuario in usuarios:
            if usuario._nickname == nickname:
                return usuario
        return None
    
    @classmethod
    def adicionar_admin(cls, nome: str, email: str, senha: str, data_de_nascimento: str, bio: str, nickname: str, token: str):
        # Verifica se o token é de um admin
        if not AutenticacaoControlador.usuario_e_admin(token):
            raise Exception("Apenas administradores podem criar novos administradores.")
        senha = hashlib.md5(senha.encode('utf-8')).hexdigest()
        admin = Admin(nome, email, senha, data_de_nascimento, bio, nickname)
        UsuarioDB.get_instance().inserir_usuario_no_banco(admin)
        return {"message": "Administrador criado com sucesso"}