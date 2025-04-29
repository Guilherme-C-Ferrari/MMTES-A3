from backend.persistencia.autenticacao_db import AutenticacaoDB
from backend.controladores.usuario_controlador import UsuarioControlador
from enum import Enum
import hashlib

# Classe para definir erros do controlador de auntenticações.
class AutenticacaoErros(Enum):
    USUARIO_OU_SENHA_INCORRETOS = 1
    AUTENTICACAO_OK = 2

# Controlador de auntenticações.
class AutenticacaoControlador:
    
    @classmethod
    def autenticar(cls, nome: str, senha: str):

        lista_de_usuarios = UsuarioControlador.pegar_lista_de_usuarios()

        hash_db = AutenticacaoDB.get_instance().pegar_hash_por_nome(nome, lista_de_usuarios)

        senha = hashlib.md5(senha.encode('utf-8'))
        senha = senha.hexdigest()
        
        if (senha == hash_db):
            return AutenticacaoDB.get_instance().registrar_sessao(nome)
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