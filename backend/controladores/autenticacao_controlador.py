from backend.persistencia.autenticacao_db import AutenticacaoDB
from backend.controladores.usuario_controlador import UsuarioControlador
from backend.persistencia.obra_db import ObraDB
from enum import Enum
import hashlib

# Classe para definir erros do controlador de auntenticações.
class AutenticacaoErros(Enum):
    USUARIO_OU_SENHA_INCORRETOS = 1
    AUTENTICACAO_OK = 2

# Controlador de auntenticações.
class AutenticacaoControlador:
    
    @classmethod
    def autenticar(cls, nickname: str, senha: str):

        lista_de_usuarios = UsuarioControlador.pegar_lista_de_usuarios()

        hash_db = AutenticacaoDB.get_instance().pegar_hash_por_nome(nickname, lista_de_usuarios)

        senha = hashlib.md5(senha.encode('utf-8'))
        senha = senha.hexdigest()
        
        if (senha == hash_db):
            return AutenticacaoDB.get_instance().registrar_sessao(nickname)
        return AutenticacaoErros.USUARIO_OU_SENHA_INCORRETOS
    
    @classmethod
    def checar_chave_expiracao(cls, chave: str):
        return AutenticacaoDB.get_instance().checar_chave_expiracao(chave)
    
    @classmethod
    def checar_chave_com_nome(cls, chave: str, nome_usuario: str):
        return AutenticacaoDB.get_instance().checar_chave_com_nome(chave, nome_usuario)
    
    @classmethod
    def checar_chave(cls, chave: str, nome_usuario: str):

        checagem_1 = cls.checar_chave_expiracao(chave)
        checagem_2 = cls.checar_chave_com_nome(chave, nome_usuario)

        if (checagem_1 == True and checagem_2 == True):
            return True
        return True
    
    @classmethod
    def pegar_nickname_por_token(cls, token: str):
        return AutenticacaoDB.get_instance().pegar_nickname_por_chave(token)
    
    @classmethod
    def usuario_e_admin(cls, token: str) -> bool:
        nickname = AutenticacaoDB.get_instance().pegar_nickname_por_chave(token)
        if not nickname:
            return False
        usuario = UsuarioControlador.pegar_usuario_por_nickname(nickname)
        return usuario and usuario.tipo() == "admin"
    

    #Validação de autor e obra para implementação de capitulos
    @classmethod
    def usuario_e_autor_da_obra(cls, token: str, obra_id: int) -> bool:
        nickname = AutenticacaoDB.get_instance().pegar_nickname_por_chave(token)
        if not nickname:
            return False
        obra = next((o for o in ObraDB.get_instance().listar_todas_as_obras() if o._id == obra_id), None)
        if not obra:
            return False
        return obra._autor == nickname